import { requireAdmin } from "@/lib/admin";
import { updateLeadStatus } from "./actions";

export default async function AdminLeadsPage() {
  const { supabase } = await requireAdmin();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>Leads</h1>
          <p>Tour bookings and contact messages with spam filtering.</p>
        </div>
      </div>

      <div className="nh-card">
        {!leads?.length ? (
          <p className="nh-empty">No leads yet.</p>
        ) : (
          <div className="nh-table-wrap">
          <table className="nh-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Details</th>
                <th>Source</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <strong>{lead.name}</strong>
                    <div style={{ color: "#64748b", fontSize: 13 }}>{lead.phone}</div>
                    {lead.email ? <div style={{ color: "#64748b", fontSize: 13 }}>{lead.email}</div> : null}
                  </td>
                  <td>
                    <div>{lead.company || "—"}</div>
                    <div style={{ color: "#64748b", fontSize: 13, maxWidth: 280 }}>
                      {lead.subject || lead.preferred_date || "—"}
                    </div>
                    {lead.is_spam ? (
                      <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 4 }}>
                        spam: {(lead.spam_reasons || []).join(", ") || "flagged"}
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <div>{lead.type}</div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>{lead.source_path || "—"}</div>
                    <div style={{ color: "#64748b", fontSize: 12 }}>
                      {new Date(lead.created_at).toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td>
                    <span className={`nh-badge ${lead.status === "new" ? "is-new" : ""} ${lead.status === "spam" ? "is-spam" : ""}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <form action={updateLeadStatus} className="nh-actions">
                      <input type="hidden" name="id" value={lead.id} />
                      <select name="status" defaultValue={lead.status} style={{ borderRadius: 10, padding: "8px 10px", border: "1px solid #e2e8f0" }}>
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="qualified">qualified</option>
                        <option value="closed">closed</option>
                        <option value="spam">spam</option>
                      </select>
                      <button className="nh-btn nh-btn-secondary" type="submit">Save</button>
                    </form>
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
