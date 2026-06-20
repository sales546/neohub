import PageBanner from "@/components/PageBanner";

export const metadata = {
  title: "Terms of Service | NeoHub Coworking Space Lucknow",
  description: "Terms of service for workspace memberships and bookings at NeoHub Coworking Space, Lucknow.",
};

export default function TermsPage() {
  return (
    <>
      <PageBanner title="Terms of Service" />
      <section className="seo-page">
        <div className="container seo-page-inner">
          <p className="seo-lead" style={{ textAlign: "left", maxWidth: "100%" }}>
            Last updated: June 2026
          </p>

          <div className="seo-card" style={{ textAlign: "left" }}>
            <h2 className="seo-card-title">1. Workspace services</h2>
            <p>
              NeoHub provides coworking memberships, private cabins, dedicated desks, hot desks, meeting rooms,
              and related amenities at Levana Cyber Heights, Gomti Nagar, Lucknow, subject to availability.
            </p>

            <h2 className="seo-card-title">2. Bookings and payments</h2>
            <p>
              Pricing shared on this website is indicative and may vary by seat count, tenure, and add-on services.
              Confirmed bookings require signed agreement and applicable advance payment as communicated by our team.
            </p>

            <h2 className="seo-card-title">3. Member conduct</h2>
            <p>
              Members must use the space professionally, respect other occupants, follow building security rules,
              and avoid disruptive or unlawful activity. NeoHub may suspend access for violations.
            </p>

            <h2 className="seo-card-title">4. Cancellations</h2>
            <p>
              Cancellation and refund terms depend on your membership or meeting-room agreement. Please refer to
              your signed contract or contact our team for specific policy details.
            </p>

            <h2 className="seo-card-title">5. Limitation of liability</h2>
            <p>
              NeoHub is not liable for indirect losses arising from service interruptions beyond reasonable control,
              including utility outages, third-party network issues, or force majeure events.
            </p>

            <h2 className="seo-card-title">6. Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href="mailto:contact@neohubspaces.in">contact@neohubspaces.in</a> ·{" "}
              <a href="tel:+917000481286">+91 70004 81286</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
