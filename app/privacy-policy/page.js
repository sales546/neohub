import PageBanner from "@/components/PageBanner";

export const metadata = {
  title: "Privacy Policy | NeoHub Coworking Space Lucknow",
  description: "Privacy policy for NeoHub Coworking Space at Levana Cyber Heights, Gomti Nagar, Lucknow.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner title="Privacy Policy" />
      <section className="seo-page">
        <div className="container seo-page-inner">
          <p className="seo-lead" style={{ textAlign: "left", maxWidth: "100%" }}>
            Last updated: June 2026
          </p>

          <div className="seo-card" style={{ textAlign: "left" }}>
            <h2 className="seo-card-title">1. Information we collect</h2>
            <p>
              When you submit a tour request, contact form, or WhatsApp enquiry, we may collect your name,
              company, phone number, email address, preferred visit date, and workspace requirements.
            </p>

            <h2 className="seo-card-title">2. How we use your information</h2>
            <p>
              We use this information to respond to enquiries, schedule tours, share pricing and availability,
              and improve our services at NeoHub, Levana Cyber Heights, Gomti Nagar, Lucknow.
            </p>

            <h2 className="seo-card-title">3. Sharing and storage</h2>
            <p>
              We do not sell your personal data. Lead information may be stored in our CRM or shared with
              authorised NeoHub team members solely for customer support and sales follow-up.
            </p>

            <h2 className="seo-card-title">4. Your choices</h2>
            <p>
              You may request access, correction, or deletion of your personal information by emailing{" "}
              <a href="mailto:contact@neohubspaces.in">contact@neohubspaces.in</a> or calling{" "}
              <a href="tel:+917000481286">+91 70004 81286</a>.
            </p>

            <h2 className="seo-card-title">5. Contact</h2>
            <p>
              NeoHub Coworking Space<br />
              Levana Cyber Heights, TC-212, 2nd Floor, Vibhuti Khand, Gomti Nagar, Lucknow, UP 226010
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
