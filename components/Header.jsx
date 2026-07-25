"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", key: "home" },
  { href: "/about-us", label: "About", key: "about" },
  { href: "/spaces", label: "Spaces", key: "spaces" },
  { href: "/blog", label: "Blog", key: "blog" },
  { href: "/gallery", label: "Gallery", key: "gallery" },
  { href: "/contact", label: "Contact", key: "contact" },
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
    const handleScroll = () => setIsSticky(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`neo-header${isSticky ? " is-sticky" : ""}${mobileMenuOpen ? " is-menu-open" : ""}`}>
      <div className="neo-header-shell">
        <div className="neo-header-inner">
          <Link href="/" className="neo-header-logo" aria-label="NeoHub Home">
            <img src="/assets/logo_67f6779b.png" alt="NeoHub" width={168} height={40} />
          </Link>

          <nav className="neo-header-nav" aria-label="Primary">
            <ul className="neo-header-links">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className={isActive ? "is-active" : undefined}
                      {...(isActive ? { "aria-current": "page" } : {})}
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="neo-header-actions">
            <a href="tel:+917000481286" className="neo-header-phone" aria-label="Call NeoHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6.6 10.8c1.6 3.1 3.5 5 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 2c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                  fill="currentColor"
                />
              </svg>
              <span>+91 70004 81286</span>
            </a>
            <a
              href={WHATSAPP_TOUR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-header-cta"
            >
              <span>Book a Tour</span>
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
          </div>

          <button
            type="button"
            className={`neo-header-menu-btn${mobileMenuOpen ? " is-open" : ""}`}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="neo-mobile-drawer"
            onClick={() => (mobileMenuOpen ? closeMenu() : openMenu())}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`neo-header-backdrop${mobileMenuOpen ? " is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="neo-mobile-drawer"
        className={`neo-header-drawer${mobileMenuOpen ? " is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="neo-header-drawer-orb" aria-hidden="true" />
        <div className="neo-header-drawer-top">
          <p className="neo-header-drawer-kicker">Explore NeoHub</p>
          <button
            type="button"
            className="neo-header-close"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="neo-header-drawer-links">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.key} style={{ "--i": index }}>
                  <Link
                    href={link.href}
                    className={isActive ? "is-active" : undefined}
                    onClick={closeMenu}
                    {...(isActive ? { "aria-current": "page" } : {})}
                  >
                    <span className="neo-header-drawer-index">0{index + 1}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="neo-header-drawer-foot">
          <a href="tel:+917000481286" className="neo-header-drawer-phone">
            +91 70004 81286
          </a>
          <a
            href={WHATSAPP_TOUR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-header-cta neo-header-cta--block"
            onClick={closeMenu}
          >
            <span>Book a Tour</span>
          </a>
        </div>
      </aside>
    </header>
  );
}
