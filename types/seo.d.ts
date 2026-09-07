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

/**
 * UN/CEFACT Common Codes. schema.org `unitCode` only accepts these — a
 * human-readable string like "Month + GST" makes the offer invalid and Google
 * discards the pricing data.
 */
export type BillingUnitCode = "MON" | "HUR" | "DAY" | "ANN";

export interface ServicePricingInfo {
  name: string;
  price: string;
  currency: string;
  /** Human-readable billing period shown in the UI, e.g. "Month + GST". */
  unit: string;
  /** Machine-readable billing period for structured data. */
  unitCode: BillingUnitCode;
  /** How many `unitCode` periods the price covers. Defaults to 1. */
  unitQuantity?: number;
  /** Whether the listed price already includes GST. Defaults to false. */
  taxIncluded?: boolean;
  /** Extra line shown under the billed unit, e.g. "per cabin, typically 4–8 seats". */
  note?: string;
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
