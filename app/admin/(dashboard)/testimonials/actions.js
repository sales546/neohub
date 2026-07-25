"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

export async function saveTestimonial(formData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  const payload = {
    name: String(formData.get("name") || "").trim(),
    role: String(formData.get("role") || "").trim() || null,
    text: String(formData.get("text") || "").trim(),
    image: String(formData.get("image") || "").trim() || null,
    rating: Number(formData.get("rating") || 5),
    sort_order: Number(formData.get("sort_order") || 0),
    is_published: formData.getAll("is_published").includes("true"),
  };

  if (!payload.name || !payload.text) return;

  if (id) {
    await supabase.from("testimonials").update(payload).eq("id", id);
  } else {
    await supabase.from("testimonials").insert(payload);
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(formData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  if (!id) return;
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
