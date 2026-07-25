import Link from "next/link";

const quickLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/spaces", label: "Pricing & Spaces" },
  { href: "/blog", label: "Blogs" },
  { href: "/faqs", label: "FAQ's" },
  { href: "/contact", label: "Contact Us" },
];

const locations = [
  { href: "/gomti-nagar", label: "Gomti Nagar" },
  { href: "/vibhuti-khand", label: "Vibhuti Khand" },
  { href: "/hazratganj", label: "Hazratganj" },
  { href: "/aliganj", label: "Aliganj" },
  { href: "/indira-nagar", label: "Indira Nagar" },
];

export default function Footer() {
  return (
    <footer className="neo-footer">
      <div className="neo-footer-main">
        <div className="neo-footer-grid">
          <div className="neo-footer-brand">
            <img
              src="/assets/footer-logo_707a880a.png"
              alt="NeoHub"
              width={200}
              height={28}
              loading="lazy"
            />
            <p>
              NeoHub is Lucknow&apos;s premier coworking space — flexible workstations,
              private cabins, and conference rooms at Cyber Heights, Bhavya, and Experion
              in Gomti Nagar.
            </p>
            <div className="neo-footer-contacts">
              <a href="tel:+917000481286" className="neo-footer-contact">
                <span className="neo-footer-contact-label">Call</span>
                <span>+91 70004 81286</span>
              </a>
              <a href="mailto:contact@neohubspaces.in" className="neo-footer-contact">
                <span className="neo-footer-contact-label">Email</span>
                <span>contact@neohubspaces.in</span>
              </a>
            </div>
          </div>

          <div className="neo-footer-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="neo-footer-col">
            <h4>Locations</h4>
            <ul>
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
          <p>© {new Date().getFullYear()} NeoHub Spaces. All rights reserved.</p>
          <nav aria-label="Legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
