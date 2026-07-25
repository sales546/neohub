import fs from "fs";
import path from "path";
import { SEED_BLOG_POSTS } from "../lib/blog/seed-posts";

function esc(s: string | null | undefined) {
  if (s == null) return "NULL";
  return `'${String(s).replace(/'/g, "''")}'`;
}

function pgArr(a: string[] = []) {
  if (!a.length) return "'{}'";
  const inner = a
    .map((x) => `"${String(x).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(",");
  return `'${"{"}${inner}${"}"}'`;
}

const values = SEED_BLOG_POSTS.map(
  (p) => `(
  ${esc(p.slug)},
  ${esc(p.title)},
  ${esc(p.excerpt)},
  ${esc(p.body_html)},
  ${esc(p.cover_image_url)},
  ${esc(p.cover_image_alt)},
  ${esc(p.author)},
  ${pgArr(p.tags)},
  ${pgArr(p.categories)},
  'published',
  ${esc(p.published_at)}::timestamptz,
  ${esc(p.meta_title)},
  ${esc(p.meta_description)},
  ${esc(p.og_image_url)},
  ${esc(p.focus_keyword)},
  false,
  ${p.reading_time_min ?? "NULL"}
)`
).join(",\n");

const slugList = SEED_BLOG_POSTS.map((p) => esc(p.slug.toLowerCase())).join(", ");

const sql = `-- Seed NeoHub professional blog posts (re-runnable)
DELETE FROM public.blog_post WHERE lower(slug) IN (${slugList});

INSERT INTO public.blog_post (
  slug, title, excerpt, body_html, cover_image_url, cover_image_alt, author,
  tags, categories, status, published_at,
  meta_title, meta_description, og_image_url, focus_keyword, noindex, reading_time_min
) VALUES
${values};
`;

const out = path.join(process.cwd(), "supabase/migrations/20260725124154_seed_blog_posts.sql");
fs.writeFileSync(out, sql);
console.log(`Wrote seed SQL for ${SEED_BLOG_POSTS.length} posts -> ${out}`);
