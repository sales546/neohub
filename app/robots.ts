import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neohubspaces.in';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/',
        '/api/',
        '/admin/',
        '/search',
        '/*?*' // Prevents crawling pages with query parameters to save budget and avoid duplicates
      ]
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
