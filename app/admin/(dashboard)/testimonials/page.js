import { requireAdmin } from "@/lib/admin";
import { deleteTestimonial, saveTestimonial } from "./actions";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { PAGE_SIZE, ilikeOr, parseListParams } from "@/lib/admin/listParams";

const FILTERS = [
  {
    name: "published",
    label: "Visibility",
    options: [
      { value: "all", label: "All" },
      { value: "yes", label: "Published" },
      { value: "no", label: "Hidden" },
    ],
  },
];

export default async function AdminTestimonialsPage({ searchParams }) {
  const sp = await searchParams;
  const { supabase } = await requireAdmin();
  const params = parseListParams(sp, {
    defaultSort: "sort_order",
    defaultDir: "asc",
    allowSort: ["sort_order", "created_at", "name"],
  });
  const published = params.get("published");
  const current = {
    q: params.q,
    published,
    sort: params.sort,
    dir: params.dir,
  };

  let query = supabase.from("testimonials").select("*", { count: "exact" });
  if (published === "yes") query = query.eq("is_published", true);
  if (published === "no") query = query.eq("is_published", false);
  const search = ilikeOr(params.q, ["name", "role", "text"]);
  if (search) query = query.or(search);

  const from = (params.page - 1) * PAGE_SIZE;
  const { data: items, count } = await query
    .order(params.sort, { ascending: params.dir === "asc" })
    .order("created_at", { ascending: false })
    .range(from, from + PAGE_SIZE - 1);

  const total = count || 0;

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>Testimonials</h1>
          <p>Manage homepage social proof.</p>
        </div>
      </div>

      <div className="nh-stack">
        <form action={saveTestimonial} className="nh-card nh-stack">
          <h2>Add testimonial</h2>
          <div className="nh-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required />
          </div>
          <div className="nh-field">
            <label htmlFor="role">Role / company</label>
            <input id="role" name="role" />
          </div>
          <div className="nh-field">
            <label htmlFor="text">Quote</label>
            <textarea id="text" name="text" required />
          </div>
          <div className="nh-field">
            <label htmlFor="image">Image path</label>
            <input id="image" name="image" defaultValue="/assets/testimg1_4d709d5b.png" />
          </div>
          <div className="nh-field">
            <label htmlFor="rating">Rating</label>
            <select id="rating" name="rating" defaultValue="5">
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="nh-field">
            <label htmlFor="sort_order">Sort order</label>
            <input id="sort_order" name="sort_order" type="number" defaultValue={0} />
          </div>
          <label className="nh-check">
            <input type="hidden" name="is_published" value="false" />
            <input type="checkbox" name="is_published" value="true" defaultChecked /> Published
          </label>
          <button className="nh-btn nh-btn-primary" type="submit">
            Add testimonial
          </button>
        </form>

        <AdminDataTable
          searchPlaceholder="Search name or quote"
          filters={FILTERS}
          total={total}
          page={params.page}
          basePath="/admin/testimonials"
          current={current}
          empty="No testimonials yet."
          filtered={Boolean(params.q || published)}
        >
          <table className="nh-table">
            <thead>
              <tr>
                <th>Person</th>
                <th>Quote</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {(items || []).map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    <div className="nh-cell-muted">{item.role}</div>
                  </td>
                  <td className="nh-cell-clamp-wide">{item.text}</td>
                  <td>
                    <span className={`nh-badge ${item.is_published ? "is-published" : "is-draft"}`}>
                      {item.is_published ? "published" : "hidden"}
                    </span>
                  </td>
                  <td>
                    <form action={deleteTestimonial}>
                      <input type="hidden" name="id" value={item.id} />
                      <button className="nh-btn nh-btn-danger nh-btn-compact" type="submit">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </AdminDataTable>
      </div>
    </>
  );
}
