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
    <>
      <div className="clearfix"></div>

      <div id="footer" className="position-relative">
        <div id="footer_box" className="darkbox position-relative" style={{ backgroundColor: "#0b0f19" }}>
          <div className="container">
            <div className="row footer-content">
              {/* Footer Column 1 - Brand */}
              <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12 footer1">
                <div className="footer-logo-wrapper">
                  <img
                    width="235"
                    height="26"
                    src="/assets/footer-logo_707a880a.png"
                    alt="NeoHub"
                    style={{ maxWidth: "100%", height: "auto" }}
                    loading="lazy"
                  />
                </div>
                <div className="footer-description">
                  <p>
                    NeoHub is Lucknow&apos;s premier coworking space, offering flexible
                    workstations, premium private cabins, and state-of-the-art
                    conference rooms. Located at Levana Cyber Heights, Gomti Nagar, we
                    build environments that fuel focus, collaboration, and growth.
                  </p>
                </div>
                <div className="footer-call-outer-box d-sm-flex d-block mt-3">
                  <div className="footer-call-box d-flex mt-3">
                    <div className="call-icon pe-3 align-self-center">
                      <i className="fas fa-phone" aria-hidden="true"></i>
                    </div>
                    <div className="call-content-box align-self-center text-start">
                      <div className="call-title">Call Anytime</div>
                      <div className="call-number">
                        <a href="tel:+917000481286">+91 70004 81286</a>
                      </div>
                    </div>
                  </div>
                  <div className="footer-call-box d-flex mt-3">
                    <div className="call-icon pe-3 align-self-center">
                      <i className="fas fa-envelope" aria-hidden="true"></i>
                    </div>
                    <div className="call-content-box align-self-center text-start">
                      <div className="call-title">Email Address</div>
                      <div className="call-number">
                        <a href="mailto:contact@neohubspaces.in">
                          contact@neohubspaces.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Column 2 - Quick Links */}
              <div className="col-xl-4 col-lg-4 col-md-5 col-sm-7 col-12 footer2 mt-lg-0 mt-5">
                <h4 className="widget-title">Quick Links</h4>
                <div className="menu-quick-links-container">
                  <ul className="menu">
                    {quickLinks.map((link, index) => (
                      <li key={index} className="menu-item">
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Column 3 - Locations */}
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-4 col-12 footer3 mt-lg-0 mt-5">
                <h4 className="widget-title">Locations</h4>
                <div className="menu-locations-container">
                  <ul className="menu">
                    {locations.map((location, index) => (
                      <li key={index} className="menu-item">
                        <Link href={location.href}>{location.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Column 4 - Hidden/empty */}
              <div className="footer_hide footer4"></div>
            </div>
          </div>
        </div>

        <div className="footer-svg-box"></div>
      </div>

      {/* Legal links + return-to-top anchor */}
      <div className="copyright" style={{ backgroundColor: "#070a13", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <nav className="footer-legal-links" aria-label="Legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <a href="#" id="return-to-top"></a>
        </div>
      </div>
    </>
  );
}
