"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function readingTime(html) {
  const words = String(html || "")
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function saveBlogPost(formData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id") || null;
  const title = String(formData.get("title") || "").trim();
  const slug = slugify(formData.get("slug") || title);
  const excerpt = String(formData.get("excerpt") || "").trim();
  const body_html = String(formData.get("body_html") || "").trim();
  const cover_image_url = String(formData.get("cover_image_url") || "").trim() || null;
  const status = String(formData.get("status") || "draft");
  const author = String(formData.get("author") || "NeoHub Team").trim();
  const meta_title = String(formData.get("meta_title") || "").trim() || null;
  const meta_description = String(formData.get("meta_description") || "").trim() || null;
  const focus_keyword = String(formData.get("focus_keyword") || "").trim() || null;

  if (!title || !slug || !body_html) {
    throw new Error("Title, slug, and body are required.");
  }

  const payload = {
    title,
    slug,
    excerpt,
    body_html,
    cover_image_url,
    cover_image_alt: title,
    og_image_url: cover_image_url,
    author,
    status,
    meta_title,
    meta_description,
    focus_keyword,
    reading_time_min: readingTime(body_html),
    published_at: status === "published" ? new Date().toISOString() : null,
    deleted_at: null,
  };

  if (id) {
    const { data: existing } = await supabase.from("blog_post").select("status, published_at").eq("id", id).single();
    if (existing?.status === "published" && status === "published") {
      payload.published_at = existing.published_at;
    }
    await supabase.from("blog_post").update(payload).eq("id", id);
  } else {
    await supabase.from("blog_post").insert(payload);
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/admin/growth");
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blogs");
}

export async function softDeleteBlogPost(formData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  if (!id) return;
  await supabase.from("blog_post").update({ deleted_at: new Date().toISOString(), status: "draft" }).eq("id", id);
  revalidatePath("/admin/blogs");
  revalidatePath("/admin/growth");
  revalidatePath("/admin");
  revalidatePath("/blog");
}
