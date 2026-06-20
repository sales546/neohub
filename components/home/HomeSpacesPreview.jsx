import { spacePreviews, buildPlanWhatsAppUrl } from "@/lib/siteData";
import Link from "next/link";

export default function HomeSpacesPreview() {
  return (
    <section id="spaces-sec" className="home-section">
      <div className="container">
        <div className="section-heading text-center">
          <h6>Our Spaces</h6>
          <h3 className="about-main-heading">Workspaces designed for focus and collaboration</h3>
        </div>
        <div className="home-spaces-grid">
          {spacePreviews.map((space) => (
            <article key={space.href} className="home-space-card">
              <Link href={space.href} className="home-space-image">
                <img src={space.image} alt={space.title} loading="lazy" />
              </Link>
              <div className="home-space-body">
                <p className="home-space-meta">{space.meta}</p>
                <h4><Link href={space.href}>{space.title}</Link></h4>
                <a className="home-pricing-link" href={buildPlanWhatsAppUrl(space.title)} target="_blank" rel="noopener noreferrer">
                  Enquire on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link className="hero-secondary-btn" href="/spaces">View all spaces</Link>
        </div>
      </div>
    </section>
  );
}
