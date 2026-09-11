import Link from "next/link";

export default function TodaysMoveCard({ move }) {
  if (!move) {
    return (
      <section className="nh-move">
        <div>
          <p className="nh-move-kicker">Today’s move</p>
          <h2>All clear</h2>
          <p>No urgent SEO gaps. Keep leads moving and publish the next Gomti Nagar post when you have proof to add.</p>
        </div>
        <div className="nh-actions">
          <Link className="nh-btn nh-btn-primary" href="/admin/growth">
            Open growth
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="nh-move">
      <div>
        <p className="nh-move-kicker">Today’s move</p>
        <h2>{move.title}</h2>
        <p>{move.reason}</p>
      </div>
      <div className="nh-actions">
        <Link className="nh-btn nh-btn-primary" href={move.writeHref}>
          {move.writeHref.includes("/blogs/new") ? "Write draft" : "Open"}
        </Link>
        <Link className="nh-btn nh-btn-secondary" href={move.kitHref}>
          Campaign kit
        </Link>
        {move.fixHref ? (
          <Link className="nh-btn nh-btn-secondary" href={move.fixHref}>
            {move.fixLabel || "Fix issue"}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
