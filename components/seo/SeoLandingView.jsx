import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import FaqAccordion from "@/components/FaqAccordion";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import JsonLd from "@/components/seo/JsonLd";

export default function SeoLandingView({ landing, extraSchema }) {
  const breadcrumbItems = [
    { name: "Home", item: "/" },
    { name: landing.kind === "building" ? "Centres" : "Guides", item: "/spaces" },
    { name: landing.name, item: `/${landing.slug}` },
  ];

  return (
    <>
      <PageBanner title={landing.bannerTitle} breadcrumbLabel={landing.name} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema items={landing.faqs} />
      {extraSchema ? <JsonLd data={extraSchema} /> : null}

      <div className="seo-page">
        <div className="container">
          <div className="seo-page-inner">
            <div className="seo-hero">
              <span className="seo-eyebrow">
                {landing.kind === "building" ? "NeoHub centre" : "NeoHub Lucknow"}
              </span>
              <h2 className="seo-title">{landing.slogan}</h2>
              <p className="seo-lead">{landing.description}</p>
            </div>

            {landing.pricing?.length ? (
              <div className="seo-pricing-grid">
                {landing.pricing.map((row) => (
                  <div key={row.name} className="seo-price-card">
                    <span className="seo-price-badge">Published rate</span>
                    <h3 className="seo-price-name">{row.name}</h3>
                    <p className="seo-price-amount">{row.value}</p>
                    {row.note ? <p className="seo-price-note">{row.note}</p> : null}
                    <a
                      href={`https://wa.me/917000481286?text=Hi%20NeoHub%20I%20am%20interested%20in%20${encodeURIComponent(landing.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="seo-cta-btn"
                    >
                      Book a tour
                    </a>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="seo-card">
              <h2 className="seo-card-title">What this page is</h2>
              <div className="seo-features-grid">
                {landing.highlights.map((item) => (
                  <div key={item} className="seo-feature-item">
                    <span className="seo-feature-check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {landing.mapEmbedUrl ? (
              <div className="seo-section">
                <h2 className="seo-card-title">{landing.mapTitle || "Map"}</h2>
                <div className="seo-map-wrap">
                  <iframe
                    src={landing.mapEmbedUrl}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={landing.mapTitle || `${landing.name} map`}
                  />
                </div>
              </div>
            ) : null}

            <div className="seo-card">
              <h2 className="seo-card-title">Related pages</h2>
              <ul className="seo-related-list">
                {landing.related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="seo-card">
              <h2 className="seo-card-title">Frequently Asked Questions</h2>
              <FaqAccordion items={landing.faqs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
