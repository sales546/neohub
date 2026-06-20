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
    'priceRange': '₹3500 - ₹9000',
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
