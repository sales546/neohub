"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", key: "home" },
  { href: "/about-us", label: "About Us", key: "about" },
  { href: "/spaces", label: "Spaces", key: "spaces" },
  { href: "/blog", label: "Blog", key: "blog" },
  { href: "/gallery", label: "Gallery", key: "gallery" },
  { href: "/contact", label: "Contact Us", key: "contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Expose openNav/closeNav globally for compatibility with existing CSS/JS
  useEffect(() => {
    window.openNav = () => setMobileMenuOpen(true);
    window.closeNav = () => setMobileMenuOpen(false);
    return () => {
      delete window.openNav;
      delete window.closeNav;
    };
  }, []);

  return (
    <header id="masthead" className="site-header">
      <div className="eco-box">
        <span className="loader"></span>
      </div>

      <div id="header_navigation" data-sticky="true">
        <div className="container">
          <div className="header-main-outer-box">
            <div className="row header-outer-box">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-12 logo-main-box align-self-center ps-sm-4 ps-0">
                <div className="logo">
                  <Link href="/" rel="home">
                    <img src="/assets/logo_67f6779b.png" alt="NeoHub" />
                  </Link>
                  <div className="logo-text"></div>
                </div>
              </div>

              <div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-12 header-main-box align-self-center">
                <div className="headerbar">
                  <div className="menubar right_menu">
                    <div className="toggle-nav mobile-menu">
                      <span onClick={() => setMobileMenuOpen(true)}>
                        <i className="fas fa-bars"></i>
                      </span>
                    </div>
                    <div
                      id="mySidenav"
                      className="nav sidenav"
                      style={mobileMenuOpen ? { width: "300px" } : {}}
                    >
                      <nav id="site-navigation" className="main-navigation">
                        <a
                          href="#"
                          className="closebtn mobile-menu"
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </a>
                        <div className="menu clearfix">
                          <ul id="menu-primary-menu" className="clearfix mobile_nav">
                            {navLinks.map((link) => {
                              const isActive = pathname === link.href;
                              return (
                                <li
                                  key={link.key}
                                  className={`${link.key} menu-item${isActive ? " current-menu-item current_page_item" : ""}`}
                                >
                                  <Link
                                    href={link.href}
                                    {...(isActive ? { "aria-current": "page" } : {})}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
