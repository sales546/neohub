import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { softDeleteBlogPost } from "./actions";

export default async function AdminBlogsPage() {
  const { supabase } = await requireAdmin();
  const { data: posts } = await supabase
    .from("blog_post")
    .select("id, title, slug, status, published_at, updated_at")
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>Blogs</h1>
          <p>Create and publish SEO-ready articles.</p>
        </div>
        <Link className="nh-btn nh-btn-primary" href="/admin/blogs/new">New post</Link>
      </div>

      <div className="nh-card">
        {!posts?.length ? (
          <p className="nh-empty">No blog posts yet.</p>
        ) : (
          <div className="nh-table-wrap">
          <table className="nh-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.title}</strong>
                    <div style={{ color: "#64748b", fontSize: 13 }}>/blog/{post.slug}</div>
                  </td>
                  <td>
                    <span className={`nh-badge ${post.status === "published" ? "is-published" : "is-draft"}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>{new Date(post.updated_at).toLocaleString("en-IN")}</td>
                  <td>
                    <div className="nh-actions">
                      <Link className="nh-btn nh-btn-secondary" href={`/admin/blogs/${post.id}`}>Edit</Link>
                      <a className="nh-btn nh-btn-secondary" href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">View</a>
                      <form action={softDeleteBlogPost}>
                        <input type="hidden" name="id" value={post.id} />
                        <button className="nh-btn nh-btn-danger" type="submit">Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </>
  );
}
