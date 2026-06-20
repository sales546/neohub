"use client";

import { useState, useEffect, useCallback } from "react";
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

const WHATSAPP_TOUR_URL =
  "https://wa.me/917000481286?text=Hi%20NeoHub%2C%20I%20would%20like%20to%20book%20a%20tour%20of%20your%20coworking%20space.";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const openMenu = useCallback(() => setMobileMenuOpen(true), []);
  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    window.openNav = openMenu;
    window.closeNav = closeMenu;
    return () => {
      delete window.openNav;
      delete window.closeNav;
    };
  }, [openMenu, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, closeMenu]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header id="masthead" className="site-header">
      <div className="eco-box">
        <span className="loader"></span>
      </div>

      <div
        id="header_navigation"
        data-sticky="true"
        className={isSticky ? "stickynavbar" : ""}
      >
        <div className="container">
          <div className="header-main-outer-box">
            <div className="row header-outer-box">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-5 col-12 logo-main-box align-self-center ps-sm-4 ps-0">
                <div className="logo">
                  <Link href="/" rel="home" aria-label="NeoHub Home">
                    <img src="/assets/logo_67f6779b.png" alt="NeoHub" />
                  </Link>
                  <div className="logo-text"></div>
                </div>
              </div>

              <div className="col-xl-10 col-lg-9 col-md-8 col-sm-7 col-12 header-main-box align-self-center">
                <div className="headerbar">
                  <div className="menubar right_menu">
                    <div className="toggle-nav mobile-menu">
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label="Open navigation menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={openMenu}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openMenu();
                          }
                        }}
                      >
                        <i className="fas fa-bars" aria-hidden="true"></i>
                      </span>
                    </div>

                    <div
                      className={`mobile-nav-backdrop${mobileMenuOpen ? " is-open" : ""}`}
                      onClick={closeMenu}
                      aria-hidden="true"
                    />

                    <div
                      id="mySidenav"
                      className="nav sidenav"
                      style={mobileMenuOpen ? { width: "300px" } : {}}
                    >
                      <nav
                        id="site-navigation"
                        className="main-navigation"
                        aria-label="Primary navigation"
                      >
                        <a
                          href="#"
                          className="closebtn mobile-menu"
                          aria-label="Close navigation menu"
                          onClick={(e) => {
                            e.preventDefault();
                            closeMenu();
                          }}
                        >
                          <i className="fas fa-times" aria-hidden="true"></i>
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
                            <li className="menu-item d-lg-none mt-3 px-3">
                              <a
                                href={WHATSAPP_TOUR_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="header-cta-btn w-100 text-center"
                              >
                                Book a Tour
                              </a>
                            </li>
                          </ul>
                        </div>
                      </nav>
                    </div>

                    <div className="d-none d-lg-flex align-items-center justify-content-end">
                      <a
                        href={WHATSAPP_TOUR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="header-cta-btn"
                      >
                        Book a Tour
                      </a>
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
