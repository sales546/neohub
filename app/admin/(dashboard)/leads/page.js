import { requireAdmin } from "@/lib/admin";
import { updateLeadStatus } from "./actions";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminSortHeader from "@/components/admin/AdminSortHeader";
import { PAGE_SIZE, ilikeOr, parseListParams, rangeFrom } from "@/lib/admin/listParams";
import { formatAdminDate } from "@/lib/admin/formatDate";

const FILTERS = [
  {
    name: "status",
    label: "Status",
    options: [
      { value: "all", label: "All statuses" },
      { value: "new", label: "New" },
      { value: "contacted", label: "Contacted" },
      { value: "qualified", label: "Qualified" },
      { value: "closed", label: "Closed" },
      { value: "spam", label: "Spam" },
    ],
  },
  {
    name: "type",
    label: "Type",
    options: [
      { value: "all", label: "All types" },
      { value: "tour", label: "Tour" },
      { value: "contact", label: "Contact" },
    ],
  },
  {
    name: "range",
    label: "When",
    options: [
      { value: "all", label: "Any time" },
      { value: "7d", label: "Last 7 days" },
      { value: "30d", label: "Last 30 days" },
    ],
  },
];

export default async function AdminLeadsPage({ searchParams }) {
  const sp = await searchParams;
  const { supabase } = await requireAdmin();
  const params = parseListParams(sp, {
    defaultSort: "created_at",
    allowSort: ["created_at", "name", "status"],
  });
  const status = params.get("status");
  const type = params.get("type");
  const range = params.get("range");
  const current = {
    q: params.q,
    status,
    type,
    range,
    sort: params.sort,
    dir: params.dir,
  };

  let query = supabase.from("leads").select("*", { count: "exact" });
  if (status === "spam") {
    query = query.eq("status", "spam");
  } else {
    query = query.eq("is_spam", false);
    if (status) query = query.eq("status", status);
  }
  if (type) query = query.eq("type", type);
  const since = rangeFrom(range);
  if (since) query = query.gte("created_at", since);
  const search = ilikeOr(params.q, ["name", "phone", "email", "company"]);
  if (search) query = query.or(search);

  const from = (params.page - 1) * PAGE_SIZE;
  const { data: leads, count } = await query
    .order(params.sort, { ascending: params.dir === "asc" })
    .range(from, from + PAGE_SIZE - 1);

  const total = count || 0;
  const filtered = Boolean(params.q || status || type || range);

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>Leads</h1>
          <p>Tour bookings and contact messages. Spam is hidden unless you filter for it.</p>
        </div>
      </div>

      <AdminDataTable
        searchPlaceholder="Search name, phone, email, company"
        filters={FILTERS}
        total={total}
        page={params.page}
        basePath="/admin/leads"
        current={current}
        empty="No leads yet. Tour and contact forms will appear here."
        filtered={filtered}
      >
        <table className="nh-table">
          <thead>
            <tr>
              <AdminSortHeader
                label="Lead"
                column="name"
                currentSort={params.sort}
                currentDir={params.dir}
                basePath="/admin/leads"
                current={current}
              />
              <th>Details</th>
              <th>Source</th>
              <AdminSortHeader
                label="Status"
                column="status"
                currentSort={params.sort}
                currentDir={params.dir}
                basePath="/admin/leads"
                current={current}
              />
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(leads || []).map((lead) => (
              <tr key={lead.id}>
                <td>
                  <strong>{lead.name}</strong>
                  <div className="nh-cell-muted">{lead.phone}</div>
                  {lead.email ? <div className="nh-cell-muted">{lead.email}</div> : null}
                </td>
                <td>
                  <div>{lead.company || "—"}</div>
                  <div className="nh-cell-muted nh-cell-clamp">{lead.subject || lead.preferred_date || "—"}</div>
                  {lead.is_spam ? (
                    <div className="nh-cell-danger">
                      spam: {(lead.spam_reasons || []).join(", ") || "flagged"}
                    </div>
                  ) : null}
                </td>
                <td>
                  <div>{lead.type}</div>
                  <div className="nh-cell-muted">{lead.source_path || "—"}</div>
                  <div className="nh-cell-muted">{formatAdminDate(lead.created_at)}</div>
                </td>
                <td>
                  <span className={`nh-badge is-${lead.status}`}>{lead.status}</span>
                </td>
                <td>
                  <form action={updateLeadStatus} className="nh-actions">
                    <input type="hidden" name="id" value={lead.id} />
                    <select name="status" defaultValue={lead.status} className="nh-inline-select">
                      <option value="new">new</option>
                      <option value="contacted">contacted</option>
                      <option value="qualified">qualified</option>
                      <option value="closed">closed</option>
                      <option value="spam">spam</option>
                    </select>
                    <button className="nh-btn nh-btn-secondary nh-btn-compact" type="submit">
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminDataTable>
    </>
  );
}
