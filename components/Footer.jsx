import Link from "next/link";

const quickLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "#", label: "Pricing" },
  { href: "/spaces", label: "Spaces" },
  { href: "/blog", label: "Blogs" },
  { href: "#", label: "Support" },
  { href: "#", label: "Term & Condition" },
  { href: "#", label: "Privacy Policy" },
  { href: "/faqs", label: "FAQ's" },
  { href: "/contact", label: "Contact Us" },
];

const locations = [
  "Gomti Nagar",
  "Vibhuti Khand",
  "Hazratganj",
  "Aliganj",
  "Indira Nagar",
];

export default function Footer() {
  return (
    <>
      <div className="clearfix"></div>

      <div id="footer" className="position-relative">
        <div id="footer_box" className="darkbox position-relative" style={{ backgroundColor: "#000" }}>
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
                      <i className="fa fa-phone"></i>
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
                      <i className="fas fa-envelope"></i>
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
                        <a href="#">{location}</a>
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

      {/* Copyright */}
      <div className="copyright" style={{ backgroundColor: "#000" }}>
        <div className="container">
          <div className="copyright-box row">
            <div className="col-12 copyright-text text-center">
              <p className="footer-copy"></p>
            </div>
          </div>
          <a href="#" id="return-to-top"></a>
        </div>
      </div>
    </>
  );
}
