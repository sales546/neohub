export interface SeoMetadataProps {
  title: string;
  description: string;
  canonical?: string;
  /** Absolute URL or site path. Defaults to dynamic /api/og preview. */
  ogImage?: string;
  /** Subtitle shown on the generated OG image */
  ogSubtitle?: string;
  ogType?: "website" | "article";
  /** When true, title is used as-is (no "| NeoHub Lucknow" template) */
  absoluteTitle?: boolean;
  noIndex?: boolean;
  keywords?: string[] | string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  imageAlt?: string;
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePricingInfo {
  name: string;
  price: string;
  currency: string;
  unit: string;
}

export interface LocalitySEOData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  landmark: string;
  mapEmbedUrl: string;
}

export interface ServiceSEOData {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  pricing: ServicePricingInfo[];
  features: string[];
}
