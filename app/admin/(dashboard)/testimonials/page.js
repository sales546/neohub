import { requireAdmin } from "@/lib/admin";
import { deleteTestimonial, saveTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const { supabase } = await requireAdmin();
  const { data: items } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

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
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div className="nh-field">
            <label htmlFor="sort_order">Sort order</label>
            <input id="sort_order" name="sort_order" type="number" defaultValue={0} />
          </div>
          <label style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 700 }}>
            <input type="hidden" name="is_published" value="false" />
            <input type="checkbox" name="is_published" value="true" defaultChecked /> Published
          </label>
          <button className="nh-btn nh-btn-primary" type="submit">Add testimonial</button>
        </form>

        <div className="nh-card">
          <h2>All testimonials</h2>
          {!items?.length ? (
            <p className="nh-empty">No testimonials yet.</p>
          ) : (
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
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                      <div style={{ color: "#64748b", fontSize: 13 }}>{item.role}</div>
                    </td>
                    <td style={{ maxWidth: 360 }}>{item.text}</td>
                    <td>
                      <span className={`nh-badge ${item.is_published ? "is-published" : "is-draft"}`}>
                        {item.is_published ? "published" : "hidden"}
                      </span>
                    </td>
                    <td>
                      <form action={deleteTestimonial}>
                        <input type="hidden" name="id" value={item.id} />
                        <button className="nh-btn nh-btn-danger" type="submit">Delete</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
