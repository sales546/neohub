import Link from "next/link";
import { localities } from "@/lib/siteData";

export default function HomeLocalities() {
  return (
    <section className="home-section home-localities">
      <div className="container">
        <div className="section-heading text-center">
          <h6>Areas We Serve</h6>
          <h3 className="about-main-heading">Coworking access across Lucknow</h3>
          <p className="section-lead">
            One premium hub at Cyber Heights — convenient for teams across these neighbourhoods.
          </p>
        </div>
        <div className="home-locality-grid">
          {localities.map((loc) => (
            <Link key={loc.href} href={loc.href} className="home-locality-card">
              <strong>{loc.label}</strong>
              <span>{loc.blurb}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
