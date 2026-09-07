import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirectMap } from "@/lib/seo/redirects";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();

  // Collapse apex → www in one hop whenever this request actually reaches the app
  // (HTTP→HTTPS on the same host is still enforced by Vercel before this runs).
  if (host === "neohubspaces.in") {
    const dest = new URL(request.url);
    dest.protocol = "https:";
    dest.hostname = "www.neohubspaces.in";
    dest.port = "";
    return NextResponse.redirect(dest, 308);
  }

  // Checked before the static-asset guard below: the legacy WordPress URLs in
  // redirectMap contain a ".html" extension and would otherwise be skipped.
  if (redirectMap[pathname]) {
    url.pathname = redirectMap[pathname];
    return NextResponse.redirect(url, 301);
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (pathname !== pathname.toLowerCase() && !pathname.startsWith("/admin")) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // Auth session refresh + /admin gate
  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
