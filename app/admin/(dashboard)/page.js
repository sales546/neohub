import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { IconBlogs, IconLeads, IconPlus, IconQuotes } from "@/components/admin/AdminIcons";

export default async function AdminHomePage() {
  const { supabase } = await requireAdmin();

  const [{ count: newLeads }, { count: totalLeads }, { count: blogs }, { count: testimonials }] =
    await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new").eq("is_spam", false),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("is_spam", false),
      supabase.from("blog_post").select("*", { count: "exact", head: true }).is("deleted_at", null),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
    ]);

  const { data: recent } = await supabase
    .from("leads")
    .select("id, name, phone, type, status, created_at, company")
    .eq("is_spam", false)
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>Overview</h1>
          <p>Track new enquiries and keep blogs & testimonials fresh for neohubspaces.in.</p>
        </div>
        <div className="nh-actions">
          <Link className="nh-btn nh-btn-primary" href="/admin/blogs/new">
            <IconPlus /> New blog
          </Link>
          <Link className="nh-btn nh-btn-secondary" href="/admin/leads">
            View leads
          </Link>
        </div>
      </div>

      <div className="nh-admin-grid">
        <div className="nh-stat-card nh-stat-card--accent">
          <span>New leads</span>
          <strong>{newLeads || 0}</strong>
        </div>
        <div className="nh-stat-card">
          <span>All leads</span>
          <strong>{totalLeads || 0}</strong>
        </div>
        <div className="nh-stat-card">
          <span>Blog posts</span>
          <strong>{blogs || 0}</strong>
        </div>
        <div className="nh-stat-card">
          <span>Testimonials</span>
          <strong>{testimonials || 0}</strong>
        </div>
      </div>

      <div className="nh-quick-grid">
        <Link className="nh-quick-card" href="/admin/leads">
          <IconLeads />
          <strong>Review leads</strong>
          <span>Update status for tours and contact messages.</span>
          <em>Open inbox →</em>
        </Link>
        <Link className="nh-quick-card" href="/admin/blogs">
          <IconBlogs />
          <strong>Edit blogs</strong>
          <span>Publish SEO posts for Gomti Nagar & Lucknow search.</span>
          <em>Manage posts →</em>
        </Link>
        <Link className="nh-quick-card" href="/admin/testimonials">
          <IconQuotes />
          <strong>Testimonials</strong>
          <span>Keep homepage social proof accurate and published.</span>
          <em>Edit quotes →</em>
        </Link>
      </div>

      <div className="nh-card">
        <div className="nh-card-head">
          <h2>Recent leads</h2>
          <Link className="nh-btn nh-btn-secondary" href="/admin/leads">All leads</Link>
        </div>
        {!recent?.length ? (
          <p className="nh-empty">No leads yet. Tour and contact forms will appear here.</p>
        ) : (
          <div className="nh-table-wrap">
            <table className="nh-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <strong>{lead.name}</strong>
                      {lead.company ? (
                        <div style={{ color: "#64748b", fontSize: 13 }}>{lead.company}</div>
                      ) : null}
                    </td>
                    <td>{lead.phone}</td>
                    <td>{lead.type}</td>
                    <td>
                      <span className={`nh-badge is-${lead.status}`}>{lead.status}</span>
                    </td>
                    <td>{new Date(lead.created_at).toLocaleString("en-IN")}</td>
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
