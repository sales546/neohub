import { spacePreviews, buildPlanWhatsAppUrl } from "@/lib/siteData";
import Link from "next/link";
import SiteImage from "@/components/SiteImage";

export default function HomeSpacesPreview() {
  return (
    <section id="spaces-sec" className="home-section">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-kicker">Our Spaces</p>
          <h2 className="about-main-heading">Workspaces designed for focus and collaboration</h2>
        </div>
        <div className="home-spaces-grid">
          {spacePreviews.map((space) => (
            <article key={space.href} className="home-space-card">
              <Link href={space.href} className="home-space-image">
                <SiteImage
                  src={space.image}
                  alt={space.title}
                  width={640}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </Link>
              <div className="home-space-body">
                <p className="home-space-meta">{space.meta}</p>
                <h3><Link href={space.href}>{space.title}</Link></h3>
                <a className="home-pricing-link" href={buildPlanWhatsAppUrl(space.title)} target="_blank" rel="noopener noreferrer">
                  Enquire on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link className="neo-btn-outline" href="/spaces">View all spaces</Link>
        </div>
      </div>
    </section>
  );
}
