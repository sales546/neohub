import { siteContact, buildPlanWhatsAppUrl } from "@/lib/siteData";

export default function HomeLocation() {
  return (
    <section className="home-section home-location">
      <div className="container">
        <div className="home-location-grid">
          <div className="home-location-copy">
            <h6>Visit Us</h6>
            <h3 className="about-main-heading">Find NeoHub at Levana Cyber Heights</h3>
            <p className="section-lead">
              Schedule a walkthrough of our private cabins, open desks, and meeting rooms in Gomti Nagar.
            </p>
            <ul className="home-location-list">
              <li>
                <strong>Address</strong>
                <span>{siteContact.address}</span>
              </li>
              <li>
                <strong>Phone</strong>
                <a href={`tel:${siteContact.phoneTel}`}>{siteContact.phone}</a>
              </li>
              <li>
                <strong>Email</strong>
                <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
              </li>
            </ul>
            <div className="hero-cta-row">
              <a className="seo-cta-btn" href={buildPlanWhatsAppUrl("office tour")} target="_blank" rel="noopener noreferrer">
                Book a Tour
              </a>
              <a className="hero-secondary-btn" href={siteContact.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </div>
          </div>
          <div className="seo-map-wrap">
            <iframe
              src={siteContact.mapEmbedUrl}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NeoHub Coworking Space location map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
