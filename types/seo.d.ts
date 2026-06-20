export interface SeoMetadataProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  keywords?: string[] | string;
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
