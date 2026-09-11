/**
 * Google Search Console adapter.
 *
 * Setup (when you are ready for live query data):
 * 1. Create a Google Cloud service account with Search Console API enabled.
 * 2. Add that service account email as a user on the Search Console property.
 * 3. Set Vercel env:
 *    - GSC_PROPERTY = sc-domain:neohubspaces.in  (or https://www.neohubspaces.in/)
 *    - GSC_SERVICE_ACCOUNT_JSON = {client_email, private_key, ...}
 *
 * Without those env vars this module returns `{ configured: false }` and the
 * Growth dashboard stays on first-party health + the keyword playbook.
 */

import { createSign } from "crypto";
import { requireAdmin } from "@/lib/admin";

export type GscQueryRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type GscPageRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type SearchConsoleSnapshot = {
  configured: boolean;
  stale?: boolean;
  fetchedAt: string | null;
  totals: { clicks: number; impressions: number; ctr: number; position: number } | null;
  queries: GscQueryRow[];
  pages: GscPageRow[];
  error?: string;
};

const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CACHE_MS = 6 * 60 * 60 * 1000;

type ServiceAccount = {
  client_email?: string;
  private_key?: string;
};

function emptySnapshot(partial?: Partial<SearchConsoleSnapshot>): SearchConsoleSnapshot {
  return {
    configured: false,
    fetchedAt: null,
    totals: null,
    queries: [],
    pages: [],
    ...partial,
  };
}

function readCredentials(): { property: string; account: ServiceAccount } | null {
  const property = String(process.env.GSC_PROPERTY || "").trim();
  const raw = String(process.env.GSC_SERVICE_ACCOUNT_JSON || "").trim();
  if (!property || !raw) return null;
  try {
    const account = JSON.parse(raw) as ServiceAccount;
    if (!account.client_email || !account.private_key) return null;
    account.private_key = account.private_key.replace(/\\n/g, "\n");
    return { property, account };
  } catch {
    return null;
  }
}

export function isSearchConsoleConfigured(): boolean {
  return Boolean(readCredentials());
}

function b64url(value: object): string {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

function signJwt(email: string, privateKey: string): string {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64url({ alg: "RS256", typ: "JWT" })}.${b64url({
    iss: email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  return `${unsigned}.${signer.sign(privateKey, "base64url")}`;
}

async function accessToken(account: ServiceAccount): Promise<string> {
  const assertion = signJwt(account.client_email!, account.private_key!);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    throw new Error(`Google token exchange failed (${res.status})`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Google token response missing access_token");
  return json.access_token;
}

function isoDate(daysAgo: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);
  return date.toISOString().slice(0, 10);
}

type AnalyticsRow = { keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number };

async function queryAnalytics(
  token: string,
  property: string,
  dimensions: string[],
  rowLimit: number,
): Promise<AnalyticsRow[]> {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      startDate: isoDate(28),
      endDate: isoDate(1),
      dimensions,
      rowLimit,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Search Console query failed (${res.status}): ${text.slice(0, 180)}`);
  }
  const json = (await res.json()) as { rows?: AnalyticsRow[] };
  return json.rows || [];
}

function mapQuery(row: AnalyticsRow): GscQueryRow {
  return {
    query: String(row.keys?.[0] || ""),
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    ctr: Number(row.ctr || 0),
    position: Number(row.position || 0),
  };
}

function mapPage(row: AnalyticsRow): GscPageRow {
  return {
    page: String(row.keys?.[0] || ""),
    clicks: Number(row.clicks || 0),
    impressions: Number(row.impressions || 0),
    ctr: Number(row.ctr || 0),
    position: Number(row.position || 0),
  };
}

async function readCache(supabase): Promise<SearchConsoleSnapshot | null> {
  const { data, error } = await supabase
    .from("seo_snapshots")
    .select("fetched_at, payload")
    .eq("source", "gsc")
    .order("fetched_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data?.payload) return null;
  const age = Date.now() - new Date(data.fetched_at).getTime();
  if (age > CACHE_MS) return { ...(data.payload as SearchConsoleSnapshot), stale: true, fetchedAt: data.fetched_at };
  return { ...(data.payload as SearchConsoleSnapshot), stale: false, fetchedAt: data.fetched_at };
}

async function writeCache(supabase, snapshot: SearchConsoleSnapshot): Promise<void> {
  await supabase.from("seo_snapshots").insert({
    source: "gsc",
    fetched_at: snapshot.fetchedAt,
    payload: snapshot,
  });
}

export async function fetchSearchConsoleLive(): Promise<SearchConsoleSnapshot> {
  const creds = readCredentials();
  if (!creds) return emptySnapshot();

  const token = await accessToken(creds.account);
  const [totalsRows, queryRows, pageRows] = await Promise.all([
    queryAnalytics(token, creds.property, [], 1),
    queryAnalytics(token, creds.property, ["query"], 50),
    queryAnalytics(token, creds.property, ["page"], 25),
  ]);
  const total = totalsRows[0];
  return {
    configured: true,
    stale: false,
    fetchedAt: new Date().toISOString(),
    totals: total
      ? {
          clicks: Number(total.clicks || 0),
          impressions: Number(total.impressions || 0),
          ctr: Number(total.ctr || 0),
          position: Number(total.position || 0),
        }
      : { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    queries: queryRows.map(mapQuery).filter((row) => row.query),
    pages: pageRows.map(mapPage).filter((row) => row.page),
  };
}

export async function getSearchConsoleSnapshot(options?: {
  forceRefresh?: boolean;
}): Promise<SearchConsoleSnapshot> {
  const creds = readCredentials();
  if (!creds) return emptySnapshot();

  const { supabase } = await requireAdmin();
  if (!options?.forceRefresh) {
    const cached = await readCache(supabase).catch(() => null);
    if (cached && !cached.stale) return { ...cached, configured: true };
  }

  try {
    const live = await fetchSearchConsoleLive();
    await writeCache(supabase, live).catch(() => undefined);
    return live;
  } catch (error) {
    const cached = await readCache(supabase).catch(() => null);
    if (cached) {
      return {
        ...cached,
        configured: true,
        stale: true,
        error: error instanceof Error ? error.message : "Search Console refresh failed",
      };
    }
    return emptySnapshot({
      configured: true,
      error: error instanceof Error ? error.message : "Search Console request failed",
    });
  }
}
