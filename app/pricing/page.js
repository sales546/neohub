import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import { constructMetadata } from "@/lib/seo/metadata";
import { neoHubAddresses, siteContact } from "@/lib/siteData";

export const metadata = constructMetadata({
  title: "NeoHub Pricing Lucknow | Desks, Cabins & Meeting Rooms",
  description:
    "Published NeoHub rates in Gomti Nagar: desks from ₹5,500/mo, cabins from ₹20,000/mo, meeting rooms from ₹500/hr — all + GST where noted.",
  canonical: "/pricing",
  absoluteTitle: true,
  ogSubtitle: "Cyber Heights · Bhavya · Experion · published rates",
  keywords: [
    "neohub pricing lucknow",
    "coworking price gomti nagar",
    "meeting room rate lucknow",
  ],
});

const cyber = neoHubAddresses.find((c) => c.id === "levana");
const bhavya = neoHubAddresses.find((c) => c.id === "bhavya");
const experion = neoHubAddresses.find((c) => c.id === "experion");

const rows = [
  {
    product: "Dedicated desk",
    cyber: `₹${cyber.pricing.workstation}/mo + GST`,
    bhavya: `₹${bhavya.pricing.workstation}/mo + GST`,
    experion: `₹${experion.pricing.workstation}/mo + GST`,
  },
  {
    product: "Private cabin",
    cyber: `from ₹${cyber.pricing.cabin}/cabin/mo + GST`,
    bhavya: `from ₹${bhavya.pricing.cabin}/cabin/mo + GST`,
    experion: `from ₹${experion.pricing.cabin}/cabin/mo + GST`,
  },
  {
    product: "Meeting / conference",
    cyber: `₹${cyber.pricing.conference}/hr`,
    bhavya: `₹${bhavya.pricing.conference}/hr`,
    experion: `₹${experion.pricing.conference}/hr`,
  },
  {
    product: "Virtual office address",
    cyber: "₹12,000/year",
    bhavya: "Gomti Nagar address",
    experion: "—",
  },
  {
    product: "GST registration kit",
    cyber: "₹18,000/year",
    bhavya: "—",
    experion: "—",
  },
  {
    product: "Half-day conference package",
    cyber: "from ₹7,500 / 4 hours",
    bhavya: "from ₹7,500 / 4 hours",
    experion: "Ask on tour",
  },
];

const breadcrumbItems = [
  { name: "Home", item: "/" },
  { name: "Pricing", item: "/pricing" },
];

export default function PricingPage() {
  return (
    <>
      <PageBanner title="NeoHub Pricing — Gomti Nagar Centres" breadcrumbLabel="Pricing" />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="seo-page">
        <div className="container">
          <div className="seo-page-inner">
            <div className="seo-hero">
              <span className="seo-eyebrow">Published rates</span>
              <h2 className="seo-title">Desks, cabins, and rooms across three centres</h2>
              <p className="seo-lead">
                Starting prices at Levana Cyber Heights, Bhavya Corporate Tower, and Experion in
                Vibhuti Khand. Cabin figures are per cabin (typically 4–8 seats), not per seat.
                GST is extra where noted. Call {siteContact.phone} to confirm the floor you want
                before you sign.
              </p>
            </div>

            <div className="seo-card">
              <div className="seo-compare-wrap">
                <table className="seo-compare-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>
                        <Link href="/levana-cyber-heights">Cyber Heights</Link>
                      </th>
                      <th>
                        <Link href="/bhavya-corporate-tower">Bhavya</Link>
                      </th>
                      <th>
                        <Link href="/experion">Experion</Link>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr key={row.product}>
                        <td>{row.product}</td>
                        <td>{row.cyber}</td>
                        <td>{row.bhavya}</td>
                        <td>{row.experion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="seo-price-note" style={{ marginTop: 16 }}>
                Virtual office and GST kits use a Gomti Nagar address with mail handling. They are
                not centre-specific Experion listings and do not include a Google Business Profile.
                Half-day conference rates for Experion are confirmed on the tour — we do not
                publish a third-centre figure here.
              </p>
            </div>

            <div className="seo-cta-row">
              <Link href="/contact" className="seo-cta-btn">
                Book a free tour
              </Link>
              <Link href="/meeting-rooms" className="seo-cta-btn seo-cta-btn-ghost">
                Meeting rooms
              </Link>
              <Link href="/spaces" className="seo-cta-btn seo-cta-btn-ghost">
                All workspaces
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
