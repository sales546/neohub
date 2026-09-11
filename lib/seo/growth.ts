import { BASE_URL } from "@/lib/seo/metadata";
import { analyzeSiteHealth, type HealthPost, type SiteHealth } from "@/lib/seo/siteHealth";
import {
  buildKeywordPlaybook,
  kitHref,
  writeBlogHref,
  type PlaybookRow,
} from "@/lib/seo/keywordPlaybook";
import { getSearchConsoleSnapshot, type SearchConsoleSnapshot } from "@/lib/seo/searchConsole";

export type TodaysMove = {
  keyword: string;
  title: string;
  reason: string;
  writeHref: string;
  kitHref: string;
  fixHref: string | null;
  fixLabel: string | null;
};

export type GrowthSnapshot = {
  posts: HealthPost[];
  health: SiteHealth;
  playbook: PlaybookRow[];
  move: TodaysMove | null;
  search: SearchConsoleSnapshot;
};

const POST_FIELDS =
  "id, title, slug, status, published_at, updated_at, meta_title, meta_description, focus_keyword, cover_image_url, noindex, excerpt";

export function pickTodaysMove(health: SiteHealth, playbook: PlaybookRow[]): TodaysMove | null {
  const urgent = health.issues.find((issue) => issue.severity === "high");
  const gap = playbook.find((row) => row.coverage !== "covered") || null;
  if (!gap && !urgent) return null;

  if (urgent && (!gap || gap.coverage === "covered")) {
    return {
      keyword: urgent.title,
      title: `Fix ${urgent.title}`,
      reason: urgent.detail,
      writeHref: urgent.href,
      kitHref: "/admin/growth",
      fixHref: urgent.href,
      fixLabel: "Open post",
    };
  }

  if (!gap) return null;
  return {
    keyword: gap.keyword,
    title: gap.coverage === "draft" ? `Finish “${gap.postTitle}”` : `Write “${gap.suggestedTitle}”`,
    reason: gap.reason,
    writeHref: gap.coverage === "draft" && gap.postId ? `/admin/blogs/${gap.postId}` : writeBlogHref(gap),
    kitHref: kitHref(gap.keyword),
    fixHref: urgent?.href || null,
    fixLabel: urgent ? "Also fix SEO issue" : null,
  };
}

export async function loadGrowthSnapshot(supabase, options?: { refreshSearch?: boolean }): Promise<GrowthSnapshot> {
  const [{ data: posts }, search] = await Promise.all([
    supabase
      .from("blog_post")
      .select(POST_FIELDS)
      .is("deleted_at", null)
      .order("updated_at", { ascending: false }),
    getSearchConsoleSnapshot({ forceRefresh: Boolean(options?.refreshSearch) }),
  ]);

  const list = (posts || []) as HealthPost[];
  const health = analyzeSiteHealth(list);
  const playbook = buildKeywordPlaybook(list, search.queries || []);
  return {
    posts: list,
    health,
    playbook,
    move: pickTodaysMove(health, playbook),
    search,
  };
}

export function indexNowTargets(posts: { slug: string; status: string }[]): string[] {
  const urls = [
    `${BASE_URL}/`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/spaces`,
    `${BASE_URL}/pricing`,
    `${BASE_URL}/meeting-rooms`,
    `${BASE_URL}/gomti-nagar`,
    `${BASE_URL}/contact`,
  ];
  for (const post of posts.filter((item) => item.status === "published").slice(0, 20)) {
    urls.push(`${BASE_URL}/blog/${post.slug}`);
  }
  return urls;
}
