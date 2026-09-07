import Link from "next/link";
import { localities } from "@/lib/siteData";

export default function HomeLocalities() {
  return (
    <section className="home-section home-localities">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-kicker">Areas We Serve</p>
          <h2 className="about-main-heading">Coworking access across Lucknow</h2>
          <p className="section-lead">
            Three premium hubs at Cyber Heights, Bhavya Corporate Tower &amp; Experion — convenient across these neighbourhoods.
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
