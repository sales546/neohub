"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { BASE_URL } from "@/lib/seo/metadata";
import { submitIndexNow } from "@/lib/seo/indexnow";
import { indexNowTargets } from "@/lib/seo/growth";
import { getSearchConsoleSnapshot, isSearchConsoleConfigured } from "@/lib/seo/searchConsole";

export async function pingIndexNow() {
  const { supabase } = await requireAdmin();
  const { data: posts } = await supabase
    .from("blog_post")
    .select("slug, status")
    .is("deleted_at", null)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(20);
  const result = await submitIndexNow(indexNowTargets(posts || []), new URL(BASE_URL).host);
  revalidatePath("/admin/growth");
  redirect(result.ok || result.status === 202 ? "/admin/growth?ping=ok" : "/admin/growth?ping=fail");
}

export async function refreshSearchData() {
  await requireAdmin();
  if (!isSearchConsoleConfigured()) {
    redirect("/admin/growth");
  }
  await getSearchConsoleSnapshot({ forceRefresh: true });
  revalidatePath("/admin/growth");
  revalidatePath("/admin");
  redirect("/admin/growth?search=refreshed");
}
