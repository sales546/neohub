"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminJumpSearch from "@/components/admin/AdminJumpSearch";
import { ADMIN_NAV_GROUPS, headerMeta } from "@/components/admin/adminNav";
import {
  IconClose,
  IconExternal,
  IconLogout,
  IconMenu,
} from "@/components/admin/AdminIcons";

function navActive(pathname, item) {
  return item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function AdminShell({ email, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const meta = headerMeta(pathname);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  async function signOut() {
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.replace("/admin/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <div className="nh-admin-shell">
      {navOpen ? (
        <button
          type="button"
          className="nh-admin-backdrop"
          aria-label="Close menu"
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <aside className={`nh-admin-sidebar ${navOpen ? "is-open" : ""}`} aria-label="Admin navigation">
        <div className="nh-admin-brand">
          <img src="/assets/footer-logo_707a880a.png" alt="NeoHub" width={120} height={28} />
          <span className="nh-admin-pill">Admin</span>
        </div>

        <nav className="nh-admin-nav">
          {ADMIN_NAV_GROUPS.map((group) => (
            <div key={group.id} className="nh-admin-nav-group">
              <p className="nh-admin-nav-label">{group.label}</p>
              {group.items.map((item) => {
                const active = navActive(pathname, item);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={active ? "is-active" : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="nh-admin-sidebar-foot">
          <a className="nh-admin-site-link" href="/" target="_blank" rel="noreferrer">
            <IconExternal />
            <span>View website</span>
          </a>
          <div className="nh-admin-user">
            <div className="nh-admin-avatar" aria-hidden="true">
              {(email || "A").slice(0, 1).toUpperCase()}
            </div>
            <div className="nh-admin-user-meta">
              <strong>Signed in</strong>
              <span title={email}>{email}</span>
            </div>
          </div>
          <button
            type="button"
            className="nh-btn nh-btn-logout"
            onClick={signOut}
            disabled={signingOut}
          >
            <IconLogout />
            {signingOut ? "Signing out…" : "Log out"}
          </button>
        </div>
      </aside>

      <div className="nh-admin-main">
        <header className="nh-admin-header">
          <div className="nh-admin-header-left">
            <button
              type="button"
              className="nh-admin-menu-btn"
              aria-label={navOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((v) => !v)}
            >
              {navOpen ? <IconClose /> : <IconMenu />}
            </button>
            <div>
              <p className="nh-admin-kicker">{meta.kicker}</p>
              <p className="nh-admin-header-title">{meta.title}</p>
            </div>
          </div>

          <div className="nh-admin-header-actions">
            <Suspense fallback={null}>
              <AdminJumpSearch />
            </Suspense>
            <span className="nh-admin-header-email" title={email}>
              {email}
            </span>
            <button
              type="button"
              className="nh-btn nh-btn-logout nh-btn-logout--header"
              onClick={signOut}
              disabled={signingOut}
            >
              <IconLogout />
              <span>{signingOut ? "Signing out…" : "Log out"}</span>
            </button>
          </div>
        </header>

        <div className="nh-admin-content">{children}</div>
      </div>
    </div>
  );
}
