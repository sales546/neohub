import { BreadcrumbItem, FAQItem, ServicePricingInfo } from '@/types/seo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neohubspaces.in';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    'name': 'NeoHub Coworking Space',
    'url': BASE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': `${BASE_URL}/assets/logo_67f6779b.png`,
      'width': '190',
      'height': '60'
    },
    'sameAs': [
      'https://www.facebook.com/NeoHubLucknow',
      'https://www.instagram.com/NeoHubLucknow',
      'https://www.linkedin.com/company/neohub-coworking-space/'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-70004-81286',
      'contactType': 'customer support',
      'areaServed': 'IN',
      'availableLanguage': ['en', 'hi']
    }
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CoworkingSpace',
    '@id': `${BASE_URL}/#local-business`,
    'name': 'NeoHub Coworking Space Lucknow',
    'description': 'Lucknow\'s premium destination for high-performance teams, freelancers, and businesses. Offering flexible workspaces, dedicated hot desks, fully secure private cabins, and high-tech conference rooms with dual gigabit internet backup.',
    'url': BASE_URL,
    'telephone': '+91-70004-81286',
    'priceRange': '₹5500 - ₹25000',
    'image': [
      `${BASE_URL}/assets/lobby.png`,
      `${BASE_URL}/assets/workstations.png`,
      `${BASE_URL}/assets/private-office.png`
    ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Levana Cyber Heights, TC-212, 2nd Floor, Vibhuti Khand, Gomti Nagar',
      'addressLocality': 'Lucknow',
      'addressRegion': 'Uttar Pradesh',
      'postalCode': '226010',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '26.8639',
      'longitude': '81.0008'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      'opens': '09:00',
      'closes': '21:00'
    },
    'amenityFeature': [
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'High-Speed Fiber Internet Backup',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Uninterrupted Power Backup',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Unlimited Tea and Coffee',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Secure Biometric Access',
        'value': true
      },
      {
        '@type': 'LocationFeatureSpecification',
        'name': 'Conference Rooms',
        'value': true
      }
    ]
  };
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${BASE_URL}${item.item}`
    }))
  };
}

export function getFAQPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };
}

export function getBlogPostingSchema(post: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  author?: string | null;
  keywords?: string[];
  articleSection?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.description,
    'image': post.image ? [post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`] : undefined,
    'datePublished': post.datePublished || undefined,
    'dateModified': post.dateModified || post.datePublished || undefined,
    'author': {
      '@type': 'Organization',
      'name': post.author || 'NeoHub Team',
      'url': BASE_URL
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'NeoHub Coworking Space',
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_URL}/assets/logo_67f6779b.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': post.url
    },
    'url': post.url,
    'keywords': post.keywords?.join(', '),
    'articleSection': post.articleSection?.join(', '),
    'inLanguage': 'en-IN'
  };
}

export function getBlogListSchema(posts: Array<{ title: string; url: string; datePublished?: string | null }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'NeoHub Coworking Insights',
    'description': 'Guides on coworking spaces, private cabins, pricing, and flexible offices in Gomti Nagar, Lucknow.',
    'url': `${BASE_URL}/blog`,
    'publisher': {
      '@type': 'Organization',
      'name': 'NeoHub Coworking Space'
    },
    'blogPost': posts.map((post) => ({
      '@type': 'BlogPosting',
      'headline': post.title,
      'url': post.url,
      'datePublished': post.datePublished || undefined
    }))
  };
}

export function getServiceSchema(
  serviceName: string,
  description: string,
  pricing: ServicePricingInfo[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceName,
    'description': description,
    'provider': {
      '@type': 'CoworkingSpace',
      'name': 'NeoHub Coworking Space Lucknow',
      'url': BASE_URL
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Lucknow'
    },
    'offers': pricing.map(p => ({
      '@type': 'Offer',
      'name': p.name,
      'price': p.price,
      'priceCurrency': p.currency,
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': p.price,
        'priceCurrency': p.currency,
        'referenceQuantity': {
          '@type': 'QuantitativeValue',
          'value': '1',
          'unitCode': p.unit // e.g., "MON" (month)
        }
      }
    }))
  };
}
