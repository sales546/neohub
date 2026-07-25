import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neohubspaces.in';
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sitemap.xml'],
      disallow: ['/_next/', '/api/', '/admin/', '/search'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
