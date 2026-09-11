import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import AdminCopyButton from "@/components/admin/AdminCopyButton";
import AdminDataTable from "@/components/admin/AdminDataTable";
import CampaignKitPanel from "@/components/admin/CampaignKitPanel";
import TodaysMoveCard from "@/components/admin/TodaysMoveCard";
import { parseListParams } from "@/lib/admin/listParams";
import { formatAdminDate } from "@/lib/admin/formatDate";
import { buildCampaignKit } from "@/lib/seo/campaignKit";
import { loadGrowthSnapshot } from "@/lib/seo/growth";
import { kitHref, writeBlogHref } from "@/lib/seo/keywordPlaybook";
import { pingIndexNow, refreshSearchData } from "./actions";

const FILTERS = [
  {
    name: "coverage",
    label: "Coverage",
    options: [
      { value: "all", label: "All keywords" },
      { value: "gap", label: "Gaps" },
      { value: "draft", label: "Drafts" },
      { value: "covered", label: "Covered" },
    ],
  },
  {
    name: "intent",
    label: "Intent",
    options: [
      { value: "all", label: "All intents" },
      { value: "tour", label: "Tour" },
      { value: "commercial", label: "Commercial" },
      { value: "informational", label: "Informational" },
    ],
  },
];

function notice(sp) {
  if (sp.ping === "ok") return "IndexNow accepted the URL ping.";
  if (sp.ping === "fail") return "IndexNow ping did not succeed. Try again in a few minutes.";
  if (sp.search === "refreshed") return "Search Console snapshot refreshed.";
  return null;
}

export default async function AdminGrowthPage({ searchParams }) {
  const sp = await searchParams;
  const { supabase } = await requireAdmin();
  const params = parseListParams(sp);
  const coverage = params.get("coverage");
  const intent = params.get("intent");
  const kitKey = params.get("kit");
  const { health, playbook, move, search } = await loadGrowthSnapshot(supabase);
  const message = notice({ ping: params.get("ping"), search: params.get("search") });

  const filteredRows = playbook.filter((row) => {
    if (coverage && row.coverage !== coverage) return false;
    if (intent && row.intent !== intent) return false;
    if (
      params.q &&
      !`${row.keyword} ${row.suggestedTitle}`.toLowerCase().includes(params.q.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const pageSize = 25;
  const page = params.page;
  const total = filteredRows.length;
  const slice = filteredRows.slice((page - 1) * pageSize, page * pageSize);
  const current = { q: params.q, coverage, intent, kit: kitKey };
  const kitRow = kitKey ? playbook.find((row) => row.keyword === kitKey.toLowerCase()) : null;
  const kit = kitKey ? buildCampaignKit({ keyword: kitKey, title: kitRow?.suggestedTitle }) : null;

  const worst = health.issues[0];
  const topGap = playbook.find((row) => row.coverage !== "covered");
  const whyNote = topGap
    ? [
        `Query: ${topGap.keyword}`,
        topGap.reason,
        "Name Cyber Heights, Bhavya, and Experion. End with +91 70004 81286 and /contact.",
      ].join("\n")
    : "Keep publishing Gomti Nagar proof: rates, floor names, and a tour CTA.";

  return (
    <>
      <div className="nh-admin-topbar">
        <div>
          <h1>SEO & keywords</h1>
          <p>First-party health plus a Lucknow coworking playbook. Live rankings appear after Search Console is connected.</p>
        </div>
        <div className="nh-actions">
          <form action={pingIndexNow}>
            <button className="nh-btn nh-btn-primary" type="submit">
              Ping IndexNow
            </button>
          </form>
          {search.configured ? (
            <form action={refreshSearchData}>
              <button className="nh-btn nh-btn-secondary" type="submit">
                Refresh search data
              </button>
            </form>
          ) : null}
        </div>
      </div>

      {message ? <p className="nh-flash">{message}</p> : null}

      <TodaysMoveCard move={move} />

      {kit ? <CampaignKitPanel kit={kit} /> : null}

      <div className="nh-growth-metrics">
        <div className="nh-stat-card nh-stat-card--accent">
          <span>Health score</span>
          <strong>{health.score}</strong>
          <p className="nh-stat-hint">
            {health.issues.length} {health.issues.length === 1 ? "issue" : "issues"} · {health.published} live posts
          </p>
        </div>
        <div className="nh-stat-card">
          <span>Keyword gaps</span>
          <strong>{playbook.filter((row) => row.coverage === "gap").length}</strong>
          <p className="nh-stat-hint">No published post yet</p>
        </div>
        <div className="nh-gsc-card">
          {search.configured && search.totals ? (
            <>
              <p className="nh-move-kicker">Search Console · 28 days</p>
              <div className="nh-gsc-nums">
                <div>
                  <span>Clicks</span>
                  <strong>{Math.round(search.totals.clicks)}</strong>
                </div>
                <div>
                  <span>Impressions</span>
                  <strong>{Math.round(search.totals.impressions)}</strong>
                </div>
                <div>
                  <span>CTR</span>
                  <strong>{(search.totals.ctr * 100).toFixed(1)}%</strong>
                </div>
                <div>
                  <span>Avg position</span>
                  <strong>{search.totals.position.toFixed(1)}</strong>
                </div>
              </div>
              <p className="nh-stat-hint">
                {search.fetchedAt ? `Fetched ${formatAdminDate(search.fetchedAt)}` : ""}
                {search.stale ? " · cached / stale" : ""}
                {search.error ? ` · ${search.error}` : ""}
              </p>
            </>
          ) : (
            <>
              <p className="nh-move-kicker">Search Console</p>
              <h2>Live search data appears after Search Console is connected.</h2>
              <p>
                Add <code>GSC_PROPERTY</code> and <code>GSC_SERVICE_ACCOUNT_JSON</code>, then invite the service
                account on the neohubspaces.in property. Until then, use health issues and keyword gaps below.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="nh-boost">
        <article className="nh-boost-card">
          <h3>Fix the worst issue</h3>
          <p>{worst ? `${worst.title} — ${worst.detail}` : "No blocking SEO issues."}</p>
          {worst ? (
            <Link className="nh-btn nh-btn-secondary nh-btn-compact" href={worst.href}>
              Open post
            </Link>
          ) : null}
        </article>
        <article className="nh-boost-card">
          <h3>Ship the highest gap</h3>
          <p>{topGap ? topGap.reason : "Playbook is covered."}</p>
          {topGap ? (
            <Link className="nh-btn nh-btn-secondary nh-btn-compact" href={writeBlogHref(topGap)}>
              Write “{topGap.suggestedTitle}”
            </Link>
          ) : null}
        </article>
        <article className="nh-boost-card">
          <h3>Why this ranks locally</h3>
          <p>Three lines you can paste into a brief or Slack.</p>
          <AdminCopyButton text={whyNote} label="Copy note" />
        </article>
      </div>

      <div className="nh-card">
        <div className="nh-card-head">
          <h2>SEO issues</h2>
          <span className="nh-cell-muted">{health.issues.length} to review</span>
        </div>
        {!health.issues.length ? (
          <p className="nh-empty">No on-page issues on published or draft posts.</p>
        ) : (
          <div className="nh-table-wrap">
            <table className="nh-table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Item</th>
                  <th>Detail</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {health.issues.slice(0, 12).map((issue) => (
                  <tr key={issue.id}>
                    <td>
                      <span className={`nh-badge is-${issue.severity}`}>{issue.severity}</span>
                    </td>
                    <td>
                      <strong>{issue.title}</strong>
                    </td>
                    <td>{issue.detail}</td>
                    <td>
                      <Link className="nh-btn nh-btn-secondary nh-btn-compact" href={issue.href}>
                        Fix
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="nh-admin-topbar nh-admin-topbar--tight">
        <div>
          <h2 className="nh-section-title">Keyword playbook</h2>
          <p>Covered vs gap against NeoHub landings and focus keywords. Write a post or open a campaign kit.</p>
        </div>
      </div>

      <AdminDataTable
        searchPlaceholder="Search keywords"
        filters={FILTERS}
        total={total}
        page={page}
        pageSize={pageSize}
        basePath="/admin/growth"
        current={current}
        empty="No keywords in the playbook."
        filtered={Boolean(params.q || coverage || intent)}
      >
        <table className="nh-table">
          <thead>
            <tr>
              <th>Keyword</th>
              <th>Intent</th>
              <th>Coverage</th>
              <th>Search</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {slice.map((row) => (
              <tr key={row.keyword}>
                <td>
                  <strong>{row.keyword}</strong>
                  <div className="nh-cell-muted">{row.reason}</div>
                </td>
                <td>
                  <span className="nh-badge">{row.intent}</span>
                </td>
                <td>
                  <span className={`nh-badge is-${row.coverage}`}>{row.coverage}</span>
                  {row.landingHref ? (
                    <div>
                      <a className="nh-inline-link" href={row.landingHref} target="_blank" rel="noreferrer">
                        {row.landingLabel || row.landingHref}
                      </a>
                    </div>
                  ) : null}
                </td>
                <td className="nh-num">
                  {row.gsc ? (
                    <>
                      {row.gsc.impressions} imp
                      <div className="nh-cell-muted">
                        {(row.gsc.ctr * 100).toFixed(1)}% · pos {row.gsc.position.toFixed(1)}
                      </div>
                    </>
                  ) : (
                    <span className="nh-cell-muted">—</span>
                  )}
                </td>
                <td>
                  <div className="nh-actions">
                    {row.coverage === "draft" && row.postId ? (
                      <Link className="nh-btn nh-btn-secondary nh-btn-compact" href={`/admin/blogs/${row.postId}`}>
                        Finish draft
                      </Link>
                    ) : (
                      <Link className="nh-btn nh-btn-primary nh-btn-compact" href={writeBlogHref(row)}>
                        Write blog
                      </Link>
                    )}
                    <Link className="nh-btn nh-btn-secondary nh-btn-compact" href={kitHref(row.keyword)}>
                      Kit
                    </Link>
                    {row.landingHref ? (
                      <a className="nh-btn nh-btn-secondary nh-btn-compact" href={row.landingHref} target="_blank" rel="noreferrer">
                        Landing
                      </a>
                    ) : null}
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
