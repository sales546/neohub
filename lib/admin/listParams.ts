export const PAGE_SIZE = 25;

type QueryValue = string | string[] | undefined;
export type SearchParamsInput = Record<string, QueryValue>;

function first(sp: SearchParamsInput, key: string): string {
  const value = sp[key];
  if (Array.isArray(value)) return String(value[0] || "");
  return String(value || "");
}

export type ListParams = {
  q: string;
  page: number;
  sort: string;
  dir: "asc" | "desc";
  get: (key: string) => string;
};

export function parseListParams(
  sp: SearchParamsInput,
  options?: { defaultSort?: string; defaultDir?: "asc" | "desc"; allowSort?: string[] },
): ListParams {
  const get = (key: string) => first(sp, key).trim();
  const page = Math.max(1, Number.parseInt(get("page") || "1", 10) || 1);
  const q = get("q").slice(0, 80);
  const allow = options?.allowSort || [];
  const requested = get("sort");
  const sort = allow.includes(requested) ? requested : options?.defaultSort || allow[0] || "created_at";
  const dir = get("dir") === "asc" ? "asc" : options?.defaultDir || "desc";
  return { q, page, sort, dir, get };
}

export function sanitizeSearchTerm(q: string): string {
  return q.replace(/[%_,()]/g, " ").replace(/\s+/g, " ").trim();
}

export function ilikeOr(q: string, columns: string[]): string | null {
  const term = sanitizeSearchTerm(q);
  if (!term) return null;
  const pattern = `%${term}%`;
  return columns.map((column) => `${column}.ilike.${pattern}`).join(",");
}

export function rangeFrom(key: string): string | null {
  const days = key === "7d" ? 7 : key === "30d" ? 30 : 0;
  if (!days) return null;
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString();
}

export function withParams(
  basePath: string,
  current: Record<string, string | number | undefined | null>,
  updates: Record<string, string | number | undefined | null> = {},
): string {
  const next: Record<string, string> = {};
  for (const [key, value] of Object.entries({ ...current, ...updates })) {
    if (value == null) continue;
    const text = String(value).trim();
    if (!text || text === "all") continue;
    next[key] = text;
  }
  if (updates.page === 1) delete next.page;
  const query = new URLSearchParams(next).toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function pageCount(total: number, pageSize = PAGE_SIZE): number {
  return Math.max(1, Math.ceil(Math.max(0, total) / pageSize));
}
