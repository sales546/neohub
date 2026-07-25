import { notFound } from "next/navigation";
import BlogEditorForm from "@/components/admin/BlogEditorForm";
import { requireAdmin } from "@/lib/admin";
import { saveBlogPost } from "../actions";

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: post } = await supabase
    .from("blog_post")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (!post) notFound();

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>Edit post</h1>
          <p>{post.title}</p>
        </div>
      </div>
      <BlogEditorForm action={saveBlogPost} post={post} />
    </>
  );
}
