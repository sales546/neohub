import BlogEditorForm from "@/components/admin/BlogEditorForm";
import { requireAdmin } from "@/lib/admin";
import { saveBlogPost } from "../actions";

export default async function NewBlogPage() {
  await requireAdmin();
  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>New blog post</h1>
          <p>Write HTML body with clear H2s and FAQ sections for SEO/AIO.</p>
        </div>
      </div>
      <BlogEditorForm action={saveBlogPost} />
    </>
  );
}
