import { seoLandings } from "@/lib/content/seoLandings";
import { DEFAULT_SEO_KEYWORDS } from "@/lib/seo/metadata";
import type { HealthPost } from "@/lib/seo/siteHealth";
import type { GscQueryRow } from "@/lib/seo/searchConsole";

export type KeywordIntent = "tour" | "informational" | "commercial";
export type KeywordCoverage = "gap" | "draft" | "covered";

export type PlaybookRow = {
  keyword: string;
  intent: KeywordIntent;
  coverage: KeywordCoverage;
  landingHref: string | null;
  landingLabel: string | null;
  postId: string | null;
  postTitle: string | null;
  suggestedTitle: string;
  reason: string;
  score: number;
  gsc: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  } | null;
};

const TOUR_HINTS = [
  "coworking",
  "desk",
  "cabin",
  "office space",
  "meeting room",
  "hot desk",
  "near ",
  "gomti",
  "hazratganj",
  "aliganj",
  "indira nagar",
  "tour",
];
const INFO_HINTS = ["pricing", " vs ", "gst", "registration", "how ", "what ", "24 hour", "virtual office"];
const COMMERCIAL_HINTS = ["best ", "rent", "managed office", "serviced"];

const CALENDAR_KEYWORDS: { keyword: string; landingHref?: string }[] = [
  { keyword: "coworking near hazratganj lucknow" },
  { keyword: "coworking space in aliganj" },
  { keyword: "coworking space in indira nagar lucknow" },
  { keyword: "hot desk lucknow" },
  { keyword: "private cabin gomti nagar" },
  { keyword: "dedicated desk lucknow" },
  { keyword: "conference hall lucknow" },
  { keyword: "meeting rooms gomti nagar" },
  { keyword: "gst registration lucknow", landingHref: "/gst-registration-lucknow" },
  { keyword: "company registration lucknow", landingHref: "/company-registration-lucknow" },
  { keyword: "virtual office lucknow", landingHref: "/virtual-office" },
  { keyword: "office space for rent lucknow", landingHref: "/office-space-for-rent-lucknow" },
  { keyword: "managed office gomti nagar", landingHref: "/managed-office-gomti-nagar" },
  { keyword: "24 hour coworking lucknow", landingHref: "/bhavya-corporate-tower" },
  { keyword: "coworking space pricing lucknow" },
  { keyword: "startup office lucknow" },
];

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

export function classifyIntent(keyword: string): KeywordIntent {
  const value = normalize(keyword);
  if (INFO_HINTS.some((hint) => value.includes(hint))) return "informational";
  if (COMMERCIAL_HINTS.some((hint) => value.includes(hint))) return "commercial";
  if (TOUR_HINTS.some((hint) => value.includes(hint))) return "tour";
  return "commercial";
}

export function titleFromKeyword(keyword: string): string {
  const clean = keyword.replace(/\s+/g, " ").trim();
  return clean.replace(/\b\w/g, (char) => char.toUpperCase());
}

function postCovers(post: HealthPost, keyword: string): boolean {
  const needle = normalize(keyword);
  const hay = normalize(
    [post.focus_keyword, post.title, post.slug.replace(/-/g, " ")].filter(Boolean).join(" "),
  );
  if (!needle || !hay) return false;
  if (hay.includes(needle)) return true;
  const words = needle.split(" ").filter((word) => word.length > 3);
  if (words.length < 2) return false;
  return words.filter((word) => hay.includes(word)).length >= Math.ceil(words.length * 0.7);
}

function landingForKeyword(keyword: string, presetHref?: string): { href: string; label: string } | null {
  if (presetHref) {
    const slug = presetHref.replace(/^\//, "");
    const landing = seoLandings[slug];
    return { href: presetHref, label: landing?.name || presetHref };
  }
  const needle = normalize(keyword);
  for (const landing of Object.values(seoLandings)) {
    const blob = normalize([landing.name, landing.slug.replace(/-/g, " "), ...(landing.keywords || [])].join(" "));
    if (landing.keywords.some((item) => normalize(item) === needle) || blob.includes(needle)) {
      return { href: `/${landing.slug}`, label: landing.name };
    }
  }
  return null;
}

export function buildKeywordPlaybook(
  posts: HealthPost[],
  gscQueries: GscQueryRow[] = [],
): PlaybookRow[] {
  const seeds = new Map<string, { landingHref?: string }>();

  for (const keyword of DEFAULT_SEO_KEYWORDS) {
    seeds.set(normalize(keyword), {});
  }
  for (const landing of Object.values(seoLandings)) {
    for (const keyword of landing.keywords) {
      seeds.set(normalize(keyword), { landingHref: `/${landing.slug}` });
    }
  }
  for (const item of CALENDAR_KEYWORDS) {
    const key = normalize(item.keyword);
    if (!seeds.has(key)) seeds.set(key, { landingHref: item.landingHref });
  }
  for (const post of posts) {
    const keyword = normalize(post.focus_keyword || "");
    if (keyword && !seeds.has(keyword)) seeds.set(keyword, {});
  }
  for (const row of gscQueries) {
    const keyword = normalize(row.query);
    if (keyword && !seeds.has(keyword)) seeds.set(keyword, {});
  }

  const gscByQuery = new Map(gscQueries.map((row) => [normalize(row.query), row]));
  const rows: PlaybookRow[] = [];

  for (const [keyword, seed] of seeds) {
    const published = posts.filter((post) => post.status === "published" && postCovers(post, keyword));
    const drafts = posts.filter((post) => post.status === "draft" && postCovers(post, keyword));
    const coverage: KeywordCoverage = published.length ? "covered" : drafts.length ? "draft" : "gap";
    const match = published[0] || drafts[0] || null;
    const landing = landingForKeyword(keyword, seed.landingHref);
    const intent = classifyIntent(keyword);
    const gsc = gscByQuery.get(keyword) || null;

    let score = 0;
    if (coverage === "gap") score += 40;
    if (coverage === "draft") score += 24;
    if (intent === "tour") score += 16;
    if (intent === "commercial") score += 12;
    if (!landing && coverage !== "covered") score += 10;
    if (landing && coverage === "gap") score += 8;
    if (gsc) {
      if (gsc.impressions >= 50 && gsc.ctr < 0.03) score += 22;
      if (gsc.position >= 8 && gsc.position <= 20) score += 18;
      score += Math.min(12, Math.round(gsc.impressions / 40));
    }

    const reasonParts: string[] = [];
    if (coverage === "gap") reasonParts.push("No published post targets this query.");
    if (coverage === "draft") reasonParts.push("A draft already exists — finish and publish it.");
    if (coverage === "covered") reasonParts.push("A post already maps to this keyword.");
    if (landing && coverage === "gap") reasonParts.push(`Landing lives at ${landing.href}; a blog would support it.`);
    if (gsc?.impressions) {
      reasonParts.push(
        `Search Console: ${gsc.impressions} impressions, ${(gsc.ctr * 100).toFixed(1)}% CTR, avg position ${gsc.position.toFixed(1)}.`,
      );
    }

    rows.push({
      keyword,
      intent,
      coverage,
      landingHref: landing?.href || null,
      landingLabel: landing?.label || null,
      postId: match?.id || null,
      postTitle: match?.title || null,
      suggestedTitle: titleFromKeyword(keyword),
      reason: reasonParts.join(" "),
      score,
      gsc: gsc
        ? {
            clicks: gsc.clicks,
            impressions: gsc.impressions,
            ctr: gsc.ctr,
            position: gsc.position,
          }
        : null,
    });
  }

  rows.sort((a, b) => b.score - a.score || a.keyword.localeCompare(b.keyword));
  return rows;
}

export function writeBlogHref(row: PlaybookRow): string {
  const params = new URLSearchParams({
    keyword: row.keyword,
    title: row.suggestedTitle,
  });
  return `/admin/blogs/new?${params.toString()}`;
}

export function kitHref(keyword: string): string {
  return `/admin/growth?kit=${encodeURIComponent(keyword)}#campaign-kit`;
}
