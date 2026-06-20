import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neohubspaces.in';

const staticRoutes = [
  { url: '', priority: 1.0, changeFrequency: 'daily' as const },
  { url: '/about-us', priority: 0.8, changeFrequency: 'weekly' as const },
  { url: '/spaces', priority: 0.9, changeFrequency: 'daily' as const },
  { url: '/blog', priority: 0.7, changeFrequency: 'daily' as const },
  { url: '/gallery', priority: 0.5, changeFrequency: 'monthly' as const },
  { url: '/faqs', priority: 0.6, changeFrequency: 'weekly' as const },
  { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/privacy-policy', priority: 0.4, changeFrequency: 'yearly' as const },
  { url: '/terms', priority: 0.4, changeFrequency: 'yearly' as const }
];

const localities = [
  'gomti-nagar',
  'vibhuti-khand',
  'hazratganj',
  'aliganj',
  'indira-nagar'
];

const services = [
  'private-cabins',
  'dedicated-desk',
  'hot-desk',
  'virtual-office',
  'meeting-rooms',
  'conference-hall'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticSitemap = staticRoutes.map(route => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const localitySitemap = localities.map(loc => ({
    url: `${BASE_URL}/${loc}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85
  }));

  const serviceSitemap = services.map(svc => ({
    url: `${BASE_URL}/${svc}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85
  }));

  return [...staticSitemap, ...localitySitemap, ...serviceSitemap];
}
