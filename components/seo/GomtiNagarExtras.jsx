import Link from "next/link";
import { neoHubAddresses, siteContact } from "@/lib/siteData";

export default function GomtiNagarExtras() {
  return (
    <>
      <dl className="seo-rate-strip" aria-label="Published starting rates">
        <div className="seo-rate-chip">
          <dt>Dedicated desks</dt>
          <dd>from ₹5,500/mo + GST</dd>
        </div>
        <div className="seo-rate-chip">
          <dt>Private cabins</dt>
          <dd>from ₹20,000/cabin/mo + GST</dd>
        </div>
        <div className="seo-rate-chip">
          <dt>Meeting rooms</dt>
          <dd>
            from ₹500/hr ·{" "}
            <Link href="/meeting-rooms">see rooms</Link>
          </dd>
        </div>
      </dl>

      <div className="seo-card">
        <h2 className="seo-card-title">Compare the three Gomti Nagar centres</h2>
        <p className="seo-lead" style={{ textAlign: "left", margin: "0 0 16px" }}>
          Only Bhavya is 24 hours. Cyber Heights reception is 9 AM–5 PM. Experion is 9 AM–10 PM.
          Desk rates below are published starting prices; cabin prices are per cabin, not per seat.
        </p>
        <div className="seo-compare-wrap">
          <table className="seo-compare-table">
            <thead>
              <tr>
                <th>Centre</th>
                <th>Seats</th>
                <th>Hours</th>
                <th>Desk from</th>
                <th>Maps</th>
              </tr>
            </thead>
            <tbody>
              {neoHubAddresses.map((centre) => (
                <tr key={centre.id}>
                  <td>
                    <Link href={centre.pagePath}>{centre.shortName}</Link>
                  </td>
                  <td>{centre.seats}</td>
                  <td>{centre.hours}</td>
                  <td>₹{centre.pricing.workstation}/mo + GST</td>
                  <td>
                    <a href={centre.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      Open Maps
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="seo-card">
        <h2 className="seo-card-title">Who it&apos;s for</h2>
        <div className="seo-intent-grid">
          <div className="seo-intent-card">
            <h3>Startups</h3>
            <p>
              Start on a dedicated desk, then take a lockable cabin in the same Vibhuti Khand block
              when the team grows — no three-year lease.
            </p>
          </div>
          <div className="seo-intent-card">
            <h3>Growing teams</h3>
            <p>
              Cabins from ₹20,000/cabin/mo + GST (₹25,000 at Experion). Tour Cyber Heights, Bhavya,
              and Experion in one afternoon.
            </p>
          </div>
          <div className="seo-intent-card">
            <h3>Freelancers &amp; remote staff</h3>
            <p>
              A reserved desk from ₹5,500/mo + GST, hourly meeting rooms for client days, and a
              Gomti Nagar pin clients already know.
            </p>
          </div>
        </div>
      </div>

      <div className="seo-card">
        <h2 className="seo-card-title">Virtual office &amp; GST address</h2>
        <p>
          Need a Gomti Nagar registered address rather than a desk? Virtual office plans start at
          ₹12,000/year for a business address, or ₹18,000/year for the GST-registration kit. Mail
          handling is included. A virtual office is not a Google Business Profile.
        </p>
        <p>
          <Link href="/virtual-office">Virtual office in Lucknow →</Link>
        </p>
      </div>

      <p className="seo-lead" style={{ textAlign: "left" }}>
        Call{" "}
        <a href={`tel:${siteContact.phoneTel}`}>{siteContact.phone}</a> or{" "}
        <Link href="/contact">book a tour</Link>. See{" "}
        <Link href="/pricing">published pricing</Link> and{" "}
        <Link href="/meeting-rooms">meeting rooms</Link> for hourly rates.
      </p>
    </>
  );
}
