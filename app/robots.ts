import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neohubspaces.in';
  return {
    rules: {
      userAgent: '*',
      // /api/og renders every page's og:image, so it must stay crawlable
      // despite the broader /api/ disallow. Google resolves the conflict by
      // longest matching path, so the more specific Allow wins.
      allow: ['/', '/sitemap.xml', '/api/og'],
      disallow: ['/_next/', '/api/', '/admin/', '/search'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
