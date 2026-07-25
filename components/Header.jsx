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
    const handleScroll = () => setIsSticky(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`neo-header${isSticky ? " is-sticky" : ""}`}>
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
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={WHATSAPP_TOUR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-header-cta"
          >
            Book a Tour
          </a>
        </nav>

        <button
          type="button"
          className="neo-header-menu-btn"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="neo-mobile-drawer"
          onClick={openMenu}
        >
          <span />
          <span />
          <span />
        </button>
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
        <div className="neo-header-drawer-top">
          <Link href="/" className="neo-header-logo" onClick={closeMenu}>
            <img src="/assets/logo_67f6779b.png" alt="NeoHub" width={140} height={34} />
          </Link>
          <button
            type="button"
            className="neo-header-close"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="neo-header-drawer-links">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className={isActive ? "is-active" : undefined}
                    onClick={closeMenu}
                    {...(isActive ? { "aria-current": "page" } : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <a
          href={WHATSAPP_TOUR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="neo-header-cta neo-header-cta--block"
          onClick={closeMenu}
        >
          Book a Tour
        </a>
      </aside>
    </header>
  );
}
