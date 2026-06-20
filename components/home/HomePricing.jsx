import Link from "next/link";
import { pricingPlans, buildPlanWhatsAppUrl } from "@/lib/siteData";

export default function HomePricing() {
  return (
    <section id="pricing_plans" className="home-section">
      <div className="container">
        <div className="section-heading text-center">
          <h6>Our Pricing</h6>
          <h3 className="about-main-heading">Flexible plans for every team size</h3>
          <p className="section-lead">Transparent monthly pricing at Levana Cyber Heights, Gomti Nagar.</p>
        </div>
        <div className="home-pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              key={plan.slug}
              className={`home-pricing-card${plan.tag ? " is-featured" : ""}`}
            >
              {plan.tag ? <span className="home-pricing-badge">{plan.tag}</span> : null}
              <div className="pricing-plan-icon">
                <img src={plan.icon} alt="" aria-hidden="true" />
              </div>
              <h4>{plan.name}</h4>
              <div className="home-pricing-amount">
                <span>₹{plan.price}</span>
                <small>/month</small>
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
