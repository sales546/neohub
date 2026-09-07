import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { SEED_BLOG_POSTS } from "../lib/blog/seed-posts";

function loadEnvLocal() {
  const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
  const env: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || !t.includes("=")) continue;
    const i = t.indexOf("=");
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

const env = loadEnvLocal();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase URL or service role key in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function toRow(post: (typeof SEED_BLOG_POSTS)[number]) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body_html: post.body_html,
    cover_image_url: post.cover_image_url,
    cover_image_alt: post.cover_image_alt,
    author: post.author,
    tags: post.tags,
    categories: post.categories,
    status: "published" as const,
    published_at: post.published_at,
    meta_title: post.meta_title,
    meta_description: post.meta_description,
    og_image_url: post.og_image_url,
    focus_keyword: post.focus_keyword,
    noindex: false,
    reading_time_min: post.reading_time_min,
    deleted_at: null,
  };
}

async function main() {
  for (const post of SEED_BLOG_POSTS) {
    const row = toRow(post);
    const { data: existing, error: lookupError } = await supabase
      .from("blog_post")
      .select("id, slug")
      .eq("slug", post.slug)
      .maybeSingle();

    if (lookupError) {
      console.error("Lookup failed:", post.slug, lookupError.message);
      process.exit(1);
    }

    if (existing?.id) {
      const { error } = await supabase.from("blog_post").update(row).eq("id", existing.id);
      if (error) {
        console.error("Update failed:", post.slug, error.message);
        process.exit(1);
      }
      console.log("Updated", post.slug);
    } else {
      const { error } = await supabase.from("blog_post").insert(row);
      if (error) {
        console.error("Insert failed:", post.slug, error.message);
        process.exit(1);
      }
      console.log("Inserted", post.slug);
    }
  }

  const { count, error: countError } = await supabase
    .from("blog_post")
    .select("slug", { count: "exact", head: true })
    .eq("status", "published")
    .is("deleted_at", null);

  if (countError) {
    console.error("Count failed:", countError.message);
    process.exit(1);
  }
  console.log("Published posts now:", count);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
