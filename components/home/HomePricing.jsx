import Link from "next/link";
import { pricingPlans, buildPlanWhatsAppUrl } from "@/lib/siteData";
import SiteImage from "@/components/SiteImage";

export default function HomePricing() {
  return (
    <section id="pricing_plans" className="home-section">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-kicker">Our Pricing</p>
          <h2 className="about-main-heading">Flexible plans for every team size</h2>
          <p className="section-lead">Transparent pricing across Cyber Heights, Bhavya &amp; Experion. Rates + GST.</p>
        </div>
        <div className="home-pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              key={plan.slug}
              className={`home-pricing-card${plan.tag ? " is-featured" : ""}`}
            >
              {plan.tag ? <span className="home-pricing-badge">{plan.tag}</span> : null}
              <div className="pricing-plan-icon">
                <SiteImage src={plan.icon} alt="" width={48} height={48} sizes="48px" />
              </div>
              <h3>{plan.name}</h3>
              <div className="home-pricing-amount">
                <span>₹{plan.price}</span>
                <small>{plan.unit || "/month"}</small>
              </div>
              <p>{plan.desc}</p>
              <div className="home-pricing-actions">
                <a className="seo-cta-btn" href={buildPlanWhatsAppUrl(plan.name)} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
                <Link className="home-pricing-link" href={`/${plan.slug}`}>
                  Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
