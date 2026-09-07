import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getSeedPostsSorted, SEED_BLOG_CATEGORIES } from "./seed-posts";
import type { BlogCategory, BlogPost, BlogPostCard } from "./types";

const CARD_FIELDS =
  "id, slug, title, excerpt, cover_image_url, cover_image_alt, author, tags, categories, published_at, updated_at, reading_time_min";

function toCard(post: BlogPost): BlogPostCard {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    cover_image_url: post.cover_image_url,
    cover_image_alt: post.cover_image_alt,
    author: post.author,
    tags: post.tags || [],
    categories: post.categories || [],
    published_at: post.published_at,
    updated_at: post.updated_at,
    reading_time_min: post.reading_time_min,
  };
}

export async function getBlogPosts(options?: {
  limit?: number;
  category?: string;
}): Promise<BlogPostCard[]> {
  const limit = options?.limit ?? 24;
  const category = options?.category;

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      let query = supabase
        .from("blog_post")
        .select(CARD_FIELDS)
        .eq("status", "published")
        .is("deleted_at", null)
        .order("published_at", { ascending: false })
        .limit(limit);

      if (category) {
        query = query.contains("categories", [category]);
      }

      const { data, error } = await query;
      if (!error && data?.length) {
        return data as BlogPostCard[];
      }
    }
  }

  let posts = getSeedPostsSorted().map(toCard);
  if (category) {
    posts = posts.filter((p) => (p.categories || []).includes(category));
  }
  return posts.slice(0, limit);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const normalized = slug.trim().toLowerCase();

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("blog_post")
        .select("*")
        .eq("status", "published")
        .is("deleted_at", null)
        .ilike("slug", normalized)
        .maybeSingle();

      if (!error && data) {
        return data as BlogPost;
      }
    }
  }

  return getSeedPostsSorted().find((p) => p.slug === normalized) || null;
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("blog_category")
        .select("slug, label")
        .order("label", { ascending: true });

      if (!error && data?.length) {
        return data as BlogCategory[];
      }
    }
  }

  return SEED_BLOG_CATEGORIES;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts({ limit: 100 });
  return posts.map((p) => p.slug);
}

export function formatBlogDate(iso: string | null | undefined) {
  if (!iso) return { day: "", month: "", full: "" };
  const date = new Date(iso);
  return {
    day: date.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: date.toLocaleDateString("en-IN", { month: "short" }),
    full: date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

export function htmlToPlainText(html: string, maxLength = 160) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}…`;
}
