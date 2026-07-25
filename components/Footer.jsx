import Link from "next/link";

const quickLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/spaces", label: "Pricing & Spaces" },
  { href: "/blog", label: "Blogs" },
  { href: "/faqs", label: "FAQs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

const locations = [
  { href: "/gomti-nagar", label: "Gomti Nagar" },
  { href: "/vibhuti-khand", label: "Vibhuti Khand" },
  { href: "/hazratganj", label: "Hazratganj" },
  { href: "/aliganj", label: "Aliganj" },
  { href: "/indira-nagar", label: "Indira Nagar" },
];

const WHATSAPP_TOUR_URL =
  "https://wa.me/917000481286?text=Hi%20NeoHub%2C%20I%20would%20like%20to%20book%20a%20tour%20of%20your%20coworking%20space.";

export default function Footer() {
  return (
    <footer className="neo-footer">
      <div className="neo-footer-glow" aria-hidden="true" />
      <div className="neo-footer-grid-bg" aria-hidden="true" />

      <div className="neo-footer-cta-band">
        <div className="neo-footer-cta-inner">
          <div>
            <p className="neo-footer-cta-kicker">Ready when you are</p>
            <h2>Tour a NeoHub space in Gomti Nagar today</h2>
          </div>
          <div className="neo-footer-cta-actions">
            <a href={WHATSAPP_TOUR_URL} target="_blank" rel="noopener noreferrer" className="neo-footer-cta-btn">
              Book a free tour
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h12m0 0l-5-5m5 5l-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="tel:+917000481286" className="neo-footer-cta-btn neo-footer-cta-btn--ghost">
              Call +91 70004 81286
            </a>
          </div>
        </div>
      </div>

      <div className="neo-footer-main">
        <div className="neo-footer-grid">
          <div className="neo-footer-brand">
            <Link href="/" className="neo-footer-logo" aria-label="NeoHub Home">
              <img
                src="/assets/footer-logo_707a880a.png"
                alt="NeoHub"
                width={200}
                height={28}
                loading="lazy"
              />
            </Link>
            <p>
              Premium coworking across Cyber Heights, Bhavya, and Experion — private cabins,
              workstations, and conference rooms built for teams that move fast.
            </p>
            <div className="neo-footer-contacts">
              <a href="tel:+917000481286" className="neo-footer-contact">
                <span className="neo-footer-contact-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 2c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>
                  <small>Call</small>
                  +91 70004 81286
                </span>
              </a>
              <a href="mailto:contact@neohubspaces.in" className="neo-footer-contact">
                <span className="neo-footer-contact-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zm0 0l8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  <small>Email</small>
                  contact@neohubspaces.in
                </span>
              </a>
            </div>
          </div>

          <div className="neo-footer-col">
            <h4>Explore</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="neo-footer-col">
            <h4>Near you</h4>
            <ul className="neo-footer-chips">
              {locations.map((location) => (
                <li key={location.href}>
                  <Link href={location.href}>{location.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="neo-footer-bar">
        <div className="neo-footer-bar-inner">
          <p>© {new Date().getFullYear()} NeoHub Spaces · Lucknow</p>
          <nav aria-label="Legal">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
