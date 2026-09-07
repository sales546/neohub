import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirectMap } from "@/lib/seo/redirects";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

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
