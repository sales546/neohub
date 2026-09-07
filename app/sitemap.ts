import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog/queries';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neohubspaces.in';

/** Rebuild sitemap on request so a newly published post appears without a redeploy. */
export const dynamic = 'force-dynamic';

/**
 * Real content-updated dates, not build time. Google discounts `lastmod`
 * entirely once it sees the value move on every deploy while the page copy is
 * unchanged — so bump the entry here when a page's content actually changes.
 */
const CONTENT_UPDATED: Record<string, string> = {
  '': '2026-09-07',
  '/about-us': '2026-07-25',
  '/spaces': '2026-09-07',
  '/gallery': '2026-07-25',
  '/faqs': '2026-07-25',
  '/contact': '2026-09-07',
  '/privacy-policy': '2026-07-25',
  '/terms': '2026-07-25',
  '/gomti-nagar': '2026-09-07',
  '/vibhuti-khand': '2026-09-07',
  '/hazratganj': '2026-09-07',
  '/aliganj': '2026-09-07',
  '/indira-nagar': '2026-09-07',
  '/private-cabins': '2026-09-07',
  '/dedicated-desk': '2026-09-07',
  '/hot-desk': '2026-09-07',
  '/virtual-office': '2026-09-07',
  '/meeting-rooms': '2026-09-07',
  '/conference-hall': '2026-09-07'
};

const FALLBACK_UPDATED = '2026-07-25';

function updatedAt(path: string): Date {
  return new Date(CONTENT_UPDATED[path] ?? FALLBACK_UPDATED);
}

const staticRoutes = [
  { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/about-us', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/spaces', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/gallery', priority: 0.5, changeFrequency: 'monthly' as const },
  { url: '/faqs', priority: 0.6, changeFrequency: 'monthly' as const },
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticSitemap = staticRoutes.map(route => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: updatedAt(route.url),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

  const localitySitemap = localities.map(loc => ({
    url: `${BASE_URL}/${loc}`,
    lastModified: updatedAt(`/${loc}`),
    changeFrequency: 'monthly' as const,
    priority: 0.85
  }));

  const serviceSitemap = services.map(svc => ({
    url: `${BASE_URL}/${svc}`,
    lastModified: updatedAt(`/${svc}`),
    changeFrequency: 'monthly' as const,
    priority: 0.85
  }));

  let blogSitemap: MetadataRoute.Sitemap = [];
  let blogIndexUpdated = updatedAt('/blog');

  try {
    const posts = await getBlogPosts({ limit: 100 });

    blogSitemap = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.published_at || FALLBACK_UPDATED),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }));

    // The index genuinely changes when a post is published or edited.
    const newest = blogSitemap.reduce<Date | null>((latest, entry) => {
      const d = entry.lastModified as Date;
      return !latest || d > latest ? d : latest;
    }, null);
    if (newest) blogIndexUpdated = newest;
  } catch {
    blogSitemap = [];
  }

  const blogIndex = {
    url: `${BASE_URL}/blog`,
    lastModified: blogIndexUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.8
  };

  return [...staticSitemap, blogIndex, ...localitySitemap, ...serviceSitemap, ...blogSitemap];
}
