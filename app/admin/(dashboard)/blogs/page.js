import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { softDeleteBlogPost } from "./actions";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminSortHeader from "@/components/admin/AdminSortHeader";
import { PAGE_SIZE, ilikeOr, parseListParams } from "@/lib/admin/listParams";
import { formatAdminDate } from "@/lib/admin/formatDate";

const FILTERS = [
  {
    name: "status",
    label: "Status",
    options: [
      { value: "all", label: "All statuses" },
      { value: "published", label: "Published" },
      { value: "draft", label: "Draft" },
    ],
  },
];

export default async function AdminBlogsPage({ searchParams }) {
  const sp = await searchParams;
  const { supabase } = await requireAdmin();
  const params = parseListParams(sp, {
    defaultSort: "updated_at",
    allowSort: ["updated_at", "title", "status"],
  });
  const status = params.get("status");
  const current = { q: params.q, status, sort: params.sort, dir: params.dir };

  let query = supabase
    .from("blog_post")
    .select("id, title, slug, status, published_at, updated_at, focus_keyword, meta_title, meta_description", {
      count: "exact",
    })
    .is("deleted_at", null);

  if (status) query = query.eq("status", status);
  const search = ilikeOr(params.q, ["title", "slug", "focus_keyword"]);
  if (search) query = query.or(search);

  const from = (params.page - 1) * PAGE_SIZE;
  const { data: posts, count } = await query
    .order(params.sort, { ascending: params.dir === "asc" })
    .range(from, from + PAGE_SIZE - 1);

  const total = count || 0;

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>Blogs</h1>
          <p>Create and publish SEO-ready articles for Lucknow search.</p>
        </div>
        <Link className="nh-btn nh-btn-primary" href="/admin/blogs/new">
          New post
        </Link>
      </div>

      <AdminDataTable
        searchPlaceholder="Search title, slug, focus keyword"
        filters={FILTERS}
        total={total}
        page={params.page}
        basePath="/admin/blogs"
        current={current}
        empty="No blog posts yet."
        filtered={Boolean(params.q || status)}
      >
        <table className="nh-table">
          <thead>
            <tr>
              <AdminSortHeader
                label="Title"
                column="title"
                currentSort={params.sort}
                currentDir={params.dir}
                basePath="/admin/blogs"
                current={current}
              />
              <AdminSortHeader
                label="Status"
                column="status"
                currentSort={params.sort}
                currentDir={params.dir}
                basePath="/admin/blogs"
                current={current}
              />
              <AdminSortHeader
                label="Updated"
                column="updated_at"
                currentSort={params.sort}
                currentDir={params.dir}
                basePath="/admin/blogs"
                current={current}
              />
              <th />
            </tr>
          </thead>
          <tbody>
            {(posts || []).map((post) => (
              <tr key={post.id}>
                <td>
                  <strong>{post.title}</strong>
                  <div className="nh-cell-muted">/blog/{post.slug}</div>
                  {post.focus_keyword ? (
                    <div className="nh-cell-muted">{post.focus_keyword}</div>
                  ) : (
                    <div className="nh-cell-danger">No focus keyword</div>
                  )}
                </td>
                <td>
                  <span className={`nh-badge ${post.status === "published" ? "is-published" : "is-draft"}`}>
                    {post.status}
                  </span>
                  {!post.meta_title || !post.meta_description ? (
                    <div className="nh-cell-muted">Meta incomplete</div>
                  ) : null}
                </td>
                <td className="nh-num">{formatAdminDate(post.updated_at)}</td>
                <td>
                  <div className="nh-actions">
                    <Link className="nh-btn nh-btn-secondary nh-btn-compact" href={`/admin/blogs/${post.id}`}>
                      Edit
                    </Link>
                    <a
                      className="nh-btn nh-btn-secondary nh-btn-compact"
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                    <form action={softDeleteBlogPost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button className="nh-btn nh-btn-danger nh-btn-compact" type="submit">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminDataTable>
    </>
  );
}
