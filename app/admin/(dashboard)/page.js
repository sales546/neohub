import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { IconBlogs, IconGrowth, IconLeads, IconPlus, IconQuotes } from "@/components/admin/AdminIcons";
import TodaysMoveCard from "@/components/admin/TodaysMoveCard";
import { loadGrowthSnapshot } from "@/lib/seo/growth";
import { formatAdminDate } from "@/lib/admin/formatDate";

export default async function AdminHomePage() {
  const { supabase } = await requireAdmin();

  const [{ count: newLeads }, { count: totalLeads }, growth, { data: recent }] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new").eq("is_spam", false),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("is_spam", false),
    loadGrowthSnapshot(supabase),
    supabase
      .from("leads")
      .select("id, name, phone, type, status, created_at, company")
      .eq("is_spam", false)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const { health, move } = growth;

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>Overview</h1>
          <p>Triage enquiries, then ship the next Gomti Nagar post or campaign kit.</p>
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

      <TodaysMoveCard move={move} />

      <div className="nh-admin-grid nh-admin-grid--overview">
        <div className="nh-stat-card nh-stat-card--accent">
          <span>New leads</span>
          <strong>{newLeads || 0}</strong>
          <p className="nh-stat-hint">Needs a call · {totalLeads || 0} in inbox</p>
        </div>
        <div className="nh-stat-card">
          <span>Drafts waiting</span>
          <strong>{health.drafts}</strong>
          <p className="nh-stat-hint">Unpublished posts</p>
        </div>
        <div className="nh-stat-card">
          <span>Missing meta</span>
          <strong>{health.missingMeta}</strong>
          <p className="nh-stat-hint">Published posts to fix</p>
        </div>
        <div className="nh-stat-card">
          <span>SEO health</span>
          <strong>{health.score}</strong>
          <p className="nh-stat-hint">
            {health.lastPublishedAt ? `Last publish ${formatAdminDate(health.lastPublishedAt)}` : "No published posts"}
          </p>
        </div>
      </div>

      <div className="nh-quick-grid nh-quick-grid--four">
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
        <Link className="nh-quick-card" href="/admin/growth">
          <IconGrowth />
          <strong>SEO & keywords</strong>
          <span>Health score, content gaps, IndexNow, campaign kits.</span>
          <em>Open growth →</em>
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
          <Link className="nh-btn nh-btn-secondary nh-btn-compact" href="/admin/leads">
            All leads
          </Link>
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
                      {lead.company ? <div className="nh-cell-muted">{lead.company}</div> : null}
                    </td>
                    <td>{lead.phone}</td>
                    <td>{lead.type}</td>
                    <td>
                      <span className={`nh-badge is-${lead.status}`}>{lead.status}</span>
                    </td>
                    <td className="nh-num">{formatAdminDate(lead.created_at)}</td>
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
