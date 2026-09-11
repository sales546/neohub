import BlogEditorForm from "@/components/admin/BlogEditorForm";
import { requireAdmin } from "@/lib/admin";
import { buildCampaignKit } from "@/lib/seo/campaignKit";
import { saveBlogPost } from "../actions";

export default async function NewBlogPage({ searchParams }) {
  await requireAdmin();
  const sp = await searchParams;
  const keyword = String(sp.keyword || "").trim();
  const title = String(sp.title || "").trim();
  const defaults = keyword ? buildCampaignKit({ keyword, title }).draftPost : title ? { title } : null;

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>New blog post</h1>
          <p>
            {keyword
              ? `Draft seeded for “${keyword}”. Tighten the HTML, add local proof, then publish.`
              : "Write HTML body with clear H2s and FAQ sections for SEO/AIO."}
          </p>
        </div>
      </div>
      <BlogEditorForm action={saveBlogPost} defaults={defaults} />
    </>
  );
}
