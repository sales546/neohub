import Link from "next/link";
import AdminCopyButton from "@/components/admin/AdminCopyButton";

export default function CampaignKitPanel({ kit }) {
  if (!kit) return null;

  const googleText = [...kit.google.headlines, ...kit.google.descriptions, kit.google.path].join("\n");
  const metaText = `${kit.meta.hook}\n\n${kit.meta.primary}\n\n${kit.meta.cta}`;
  const writeHref = `/admin/blogs/new?keyword=${encodeURIComponent(kit.keyword)}&title=${encodeURIComponent(kit.title)}`;

  return (
    <section className="nh-kit" id="campaign-kit">
      <div className="nh-card-head">
        <div>
          <p className="nh-move-kicker">Campaign kit</p>
          <h2>{kit.title}</h2>
        </div>
        <div className="nh-actions">
          <Link className="nh-btn nh-btn-primary" href={writeHref}>
            Create draft post
          </Link>
          <Link className="nh-btn nh-btn-secondary" href="/admin/growth">
            Close
          </Link>
        </div>
      </div>

      <div className="nh-kit-grid">
        <div className="nh-kit-preview">
          <img src={kit.ogImage} alt={`${kit.title} social preview`} width={1200} height={630} />
          <p>OG / ad still from the existing NeoHub image route. Use Higgsfield in Cursor if you need video or lifestyle shots.</p>
        </div>

        <div className="nh-stack">
          <div>
            <h3>Why this</h3>
            <ul className="nh-kit-why">
              {kit.why.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Blog outline</h3>
            <ol className="nh-kit-outline">
              {kit.outline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="nh-kit-copy-grid">
        <article>
          <div className="nh-card-head">
            <h3>Google Search ad</h3>
            <AdminCopyButton text={googleText} />
          </div>
          <p className="nh-cell-muted">{kit.google.path}</p>
          <ul>
            {kit.google.headlines.map((line) => (
              <li key={line}>
                <strong>{line}</strong>
              </li>
            ))}
            {kit.google.descriptions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
        <article>
          <div className="nh-card-head">
            <h3>Meta / Instagram</h3>
            <AdminCopyButton text={metaText} />
          </div>
          <p>
            <strong>{kit.meta.hook}</strong>
          </p>
          <p>{kit.meta.primary}</p>
          <p className="nh-kit-cta">{kit.meta.cta}</p>
        </article>
        <article>
          <div className="nh-card-head">
            <h3>Sponsor / directory blurb</h3>
            <AdminCopyButton text={kit.sponsor} />
          </div>
          <p>{kit.sponsor}</p>
        </article>
      </div>
    </section>
  );
}
