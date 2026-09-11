export type HealthPost = {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  updated_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  cover_image_url: string | null;
  noindex: boolean | null;
};

export type HealthIssue = {
  id: string;
  postId: string | null;
  href: string;
  title: string;
  detail: string;
  severity: "high" | "medium" | "low";
};

export type SiteHealth = {
  score: number;
  published: number;
  drafts: number;
  missingMeta: number;
  issues: HealthIssue[];
  lastPublishedAt: string | null;
};

function titleLen(value: string | null | undefined): number {
  return String(value || "").trim().length;
}

export function analyzeSiteHealth(posts: HealthPost[]): SiteHealth {
  const live = posts.filter((post) => post.status === "published");
  const drafts = posts.filter((post) => post.status === "draft");
  const issues: HealthIssue[] = [];
  const keywordOwners = new Map<string, HealthPost[]>();

  for (const post of live) {
    const keyword = String(post.focus_keyword || "").trim().toLowerCase();
    if (keyword) {
      const list = keywordOwners.get(keyword) || [];
      list.push(post);
      keywordOwners.set(keyword, list);
    }

    if (post.noindex) {
      issues.push({
        id: `noindex-${post.id}`,
        postId: post.id,
        href: `/admin/blogs/${post.id}`,
        title: post.title,
        detail: "Published but marked noindex — it will not appear in Google.",
        severity: "high",
      });
    }
    if (!titleLen(post.meta_title)) {
      issues.push({
        id: `meta-title-${post.id}`,
        postId: post.id,
        href: `/admin/blogs/${post.id}`,
        title: post.title,
        detail: "Missing meta title.",
        severity: "high",
      });
    } else if (titleLen(post.meta_title) > 60) {
      issues.push({
        id: `meta-title-long-${post.id}`,
        postId: post.id,
        href: `/admin/blogs/${post.id}`,
        title: post.title,
        detail: `Meta title is ${titleLen(post.meta_title)} characters (keep under 60).`,
        severity: "low",
      });
    }
    if (!titleLen(post.meta_description)) {
      issues.push({
        id: `meta-desc-${post.id}`,
        postId: post.id,
        href: `/admin/blogs/${post.id}`,
        title: post.title,
        detail: "Missing meta description.",
        severity: "high",
      });
    } else if (titleLen(post.meta_description) > 160) {
      issues.push({
        id: `meta-desc-long-${post.id}`,
        postId: post.id,
        href: `/admin/blogs/${post.id}`,
        title: post.title,
        detail: `Meta description is ${titleLen(post.meta_description)} characters (keep under 160).`,
        severity: "low",
      });
    }
    if (!titleLen(post.focus_keyword)) {
      issues.push({
        id: `keyword-${post.id}`,
        postId: post.id,
        href: `/admin/blogs/${post.id}`,
        title: post.title,
        detail: "No focus keyword — search intent is unclear.",
        severity: "medium",
      });
    }
    if (!post.cover_image_url) {
      issues.push({
        id: `cover-${post.id}`,
        postId: post.id,
        href: `/admin/blogs/${post.id}`,
        title: post.title,
        detail: "Missing cover image for social and listing cards.",
        severity: "medium",
      });
    }
  }

  for (const [keyword, owners] of keywordOwners) {
    if (owners.length < 2) continue;
    issues.push({
      id: `dup-${keyword}`,
      postId: owners[0].id,
      href: `/admin/blogs/${owners[0].id}`,
      title: keyword,
      detail: `Focus keyword is used on ${owners.length} published posts.`,
      severity: "medium",
    });
  }

  for (const post of drafts) {
    const ageDays = post.updated_at
      ? Math.floor((Date.now() - new Date(post.updated_at).getTime()) / 86400000)
      : 0;
    issues.push({
      id: `draft-${post.id}`,
      postId: post.id,
      href: `/admin/blogs/${post.id}`,
      title: post.title,
      detail: ageDays > 14 ? `Draft sitting for ${ageDays} days.` : "Unpublished draft.",
      severity: ageDays > 14 ? "medium" : "low",
    });
  }

  const severityWeight = { high: 12, medium: 6, low: 2 };
  const penalty = issues.reduce((sum, issue) => sum + severityWeight[issue.severity], 0);
  const score = Math.max(0, Math.min(100, 100 - penalty));
  const missingMeta = live.filter(
    (post) => !titleLen(post.meta_title) || !titleLen(post.meta_description) || !titleLen(post.focus_keyword),
  ).length;
  const lastPublishedAt = live
    .map((post) => post.published_at)
    .filter(Boolean)
    .sort()
    .at(-1) || null;

  const severityRank = { high: 0, medium: 1, low: 2 };
  issues.sort((a, b) => severityRank[a.severity] - severityRank[b.severity]);

  return {
    score,
    published: live.length,
    drafts: drafts.length,
    missingMeta,
    issues,
    lastPublishedAt,
  };
}
