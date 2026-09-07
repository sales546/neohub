"use client";

import { partnerLogos } from "@/lib/siteData";
import SiteImage from "@/components/SiteImage";

function PartnerCard({ partner }) {
  return (
    <article className="partner-card" title={partner.alt}>
      <div className="partner-card-logo">
        <SiteImage
          src={partner.src}
          alt=""
          width={140}
          height={56}
          sizes="140px"
        />
      </div>
      <div className="partner-card-meta">
        <span className="partner-card-dot" aria-hidden="true" />
        <p className="partner-card-name">{partner.name}</p>
      </div>
    </article>
  );
}

function MarqueeRow({ items, direction = "left", duration = 42 }) {
  const track = [...items, ...items];

  return (
    <div
      className={`partners-marquee partners-marquee--${direction}`}
      style={{ "--partners-duration": `${duration}s` }}
    >
      <div className="partners-marquee-track">
        {track.map((partner, index) => (
          <PartnerCard key={`${direction}-${partner.src}-${index}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

export default function ClientPartners() {
  const midpoint = Math.ceil(partnerLogos.length / 2);
  const rowOne = partnerLogos.slice(0, midpoint);
  const rowTwo = partnerLogos.slice(midpoint);

  return (
    <section id="partners" className="partners-section" aria-label="Our clients">
      <div className="partners-glow" aria-hidden="true" />

      <div className="container">
        <div className="partners-intro text-center">
          <p className="section-kicker">Our Clients</p>
          <h2 className="about-main-heading">Trusted by growing teams</h2>
          <p className="partners-intro-copy">
            Enterprise and startup teams working from NeoHub spaces in Gomti Nagar.
          </p>
        </div>
      </div>

      <div className="partners-carousel" aria-hidden="true">
        <MarqueeRow items={rowOne} direction="left" duration={38} />
        <MarqueeRow items={rowTwo} direction="right" duration={44} />
      </div>

      {/* Accessible static list for screen readers / reduced motion */}
      <ul className="partners-a11y-list">
        {partnerLogos.map((partner) => (
          <li key={partner.src}>{partner.name}</li>
        ))}
      </ul>

      <div className="partners-static container">
        <ul className="partners-grid">
          {partnerLogos.map((partner) => (
            <li key={partner.src}>
              <PartnerCard partner={partner} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
