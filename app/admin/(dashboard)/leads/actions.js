"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin";

export async function updateLeadStatus(formData) {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  const status = formData.get("status");
  if (!id || !status) return;

  await supabase
    .from("leads")
    .update({ status, is_spam: status === "spam" })
    .eq("id", id);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}
