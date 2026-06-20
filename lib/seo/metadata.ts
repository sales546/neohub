import { Metadata } from 'next';
import { SeoMetadataProps } from '@/types/seo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neohubspaces.in';

const defaultKeywords = [
  'coworking space in lucknow',
  'coworking space gomti nagar',
  'best coworking space in lucknow',
  'shared office in lucknow',
  'office space in lucknow',
  'startup office lucknow',
  'coworking near gomti nagar',
  'coworking in gomti nagar',
  'meeting rooms lucknow',
  'private office lucknow',
  'virtual office lucknow',
  'premium workstations lucknow'
];

export function constructMetadata({
  title,
  description,
  canonical,
  ogImage = '/assets/og-default.png',
  ogType = 'website',
  noIndex = false,
  keywords = []
}: SeoMetadataProps): Metadata {
  const pageUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const assembledKeywords = Array.isArray(keywords) 
    ? [...defaultKeywords, ...keywords]
    : typeof keywords === 'string'
      ? [...defaultKeywords, keywords]
      : defaultKeywords;

  return {
    title: {
      default: `${title} | NeoHub Lucknow`,
      template: `%s | NeoHub Lucknow`
    },
    description,
    keywords: assembledKeywords.join(', '),
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title: `${title} | NeoHub Lucknow`,
      description,
      url: pageUrl,
      siteName: 'NeoHub Coworking Space',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${title} - NeoHub Lucknow`
        }
      ],
      locale: 'en_IN',
      type: ogType
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | NeoHub Lucknow`,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`],
      creator: '@NeoHubLucknow'
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    other: {
      // AI Crawlers optimization instructions
      'ai-crawlers': noIndex ? 'noindex' : 'index, follow',
      'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || ''
    }
  };
}
