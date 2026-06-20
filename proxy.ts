import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { redirectMap } from '@/lib/seo/redirects';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 1. Skip system files, API routes, and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || // static files (e.g., logo.png, style.css)
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. Handle standard redirect mappings (legacy pages, typos)
  if (redirectMap[pathname]) {
    url.pathname = redirectMap[pathname];
    return NextResponse.redirect(url, 301);
  }

  // 3. Enforce lowercase paths to prevent duplicate indexing (e.g. /Spaces -> /spaces)
  if (pathname !== pathname.toLowerCase()) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
