/**
 * Legacy WordPress / marketplace URLs still indexed in Search Console.
 * Exact paths win over prefixes. Keep this list in sync with vercel.json.
 */
export const redirectMap: Record<string, string> = {
  "/index.html": "/",
  "/about-us.html": "/about-us",
  "/spaces.html": "/spaces",
  "/gallery.html": "/gallery",
  "/faqs.html": "/faqs",
  "/contact.html": "/contact",
  "/blog.html": "/blog",
  "/about": "/about-us",
  "/about/": "/about-us",
  "/contact-us": "/contact",
  "/contact/": "/contact",
  "/blog/": "/blog",
  "/home-1": "/",
  "/home-1/": "/",
  "/home": "/",
  "/home/": "/",
  "/space-offerings": "/spaces",
  "/space-offerings/": "/spaces",
  "/shop": "/spaces",
  "/shop/": "/spaces",
  "/product": "/spaces",
  "/product/": "/spaces",
  "/product-category": "/spaces",
  "/product-category/": "/spaces",
  "/product-tag": "/spaces",
  "/product-tag/": "/spaces",
  "/product-brand": "/spaces",
  "/product-brand/": "/spaces",
  "/category": "/blog",
  "/category/": "/blog",
  "/workspace": "/spaces",
  "/workspace/": "/spaces",
  "/workspace/coworking-space": "/hot-desk",
  "/workspace/coworking-space/": "/hot-desk",
  "/workspace/dedicated-desk": "/dedicated-desk",
  "/workspace/dedicated-desk/": "/dedicated-desk",
  "/workspace/meeting-rooms": "/meeting-rooms",
  "/workspace/meeting-rooms/": "/meeting-rooms",
  "/workspace/private-offices": "/private-cabins",
  "/workspace/private-offices/": "/private-cabins",
  "/locations/monarch-tower": "/gomti-nagar",
  "/locations/monarch-tower/": "/gomti-nagar",
  "/all-locations": "/gomti-nagar",
  "/all-locations/": "/gomti-nagar",
  "/cyber-heights": "/levana-cyber-heights",
  "/levana": "/levana-cyber-heights",
  "/bhavya": "/bhavya-corporate-tower",
  "/bhavya-tower": "/bhavya-corporate-tower",
  "/virtual-office-gst": "/gst-registration-lucknow",
  "/virtual-office-gst-registration": "/gst-registration-lucknow",
  "/virtual-office-company-registration": "/company-registration-lucknow",
};

/** Catch-all prefixes. Checked only after an exact redirectMap miss. */
export const redirectPrefixes: { prefix: string; destination: string }[] = [
  { prefix: "/shop/", destination: "/spaces" },
  { prefix: "/product/", destination: "/spaces" },
  { prefix: "/product-category/", destination: "/spaces" },
  { prefix: "/product-tag/", destination: "/spaces" },
  { prefix: "/product-brand/", destination: "/spaces" },
  { prefix: "/category/", destination: "/blog" },
  { prefix: "/workspace/", destination: "/spaces" },
];

export function resolveLegacyRedirect(pathname: string): string | null {
  const exact = redirectMap[pathname];
  if (exact) return exact;
  for (const rule of redirectPrefixes) {
    if (pathname.startsWith(rule.prefix)) return rule.destination;
  }
  return null;
}
