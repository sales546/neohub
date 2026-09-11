import type { Metadata } from "next";
import type { SeoMetadataProps } from "@/types/seo";

export const SITE_NAME = "NeoHub Coworking Space";
export const SITE_NAME_SHORT = "NeoHub Lucknow";
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neohubspaces.in";

const GOOGLE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ||
  "Hkp9pTIL4WF-gDlNCXWAVB0Yg7i0jmOBs6N3MkKPu_M";
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_VERIFICATION;

export const DEFAULT_SEO_KEYWORDS = [
  "coworking space in lucknow",
  "coworking space gomti nagar",
  "best coworking space in lucknow",
  "shared office in lucknow",
  "office space in lucknow",
  "startup office lucknow",
  "coworking near gomti nagar",
  "meeting rooms lucknow",
  "private office lucknow",
  "virtual office lucknow",
  "premium workstations lucknow",
];

const defaultKeywords = DEFAULT_SEO_KEYWORDS;

function toAbsoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) return BASE_URL;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) return pathOrUrl;
  return `${BASE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

/** Dynamic 1200×630 social preview image */
export function buildOgImageUrl(title: string, subtitle?: string) {
  const params = new URLSearchParams({
    title: title.replace(/\s+/g, " ").trim().slice(0, 90),
  });
  if (subtitle) {
    params.set("subtitle", subtitle.replace(/\s+/g, " ").trim().slice(0, 120));
  }
  return `${BASE_URL}/api/og?${params.toString()}`;
}

function brandTitle(title: string, absoluteTitle?: boolean) {
  const clean = title.replace(/\s+/g, " ").trim();
  if (absoluteTitle || /neohub/i.test(clean)) return clean;
  return `${clean} | ${SITE_NAME_SHORT}`;
}

/** Clip at a word boundary. Never cut mid-word; keep a full sentence ≤160 chars. */
export function clipMetaDescription(text: string, max = 160): string {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const window = clean.slice(0, max + 1);
  const lastSpace = window.lastIndexOf(" ");
  const clipped = (lastSpace > 0 ? window.slice(0, lastSpace) : clean.slice(0, max)).trim();
  return clipped.replace(/[.,;:\-]+$/g, "").trim();
}

export function constructMetadata({
  title,
  description,
  canonical,
  ogImage,
  ogSubtitle = "Premium coworking in Gomti Nagar, Lucknow",
  ogType = "website",
  absoluteTitle = false,
  noIndex = false,
  keywords = [],
  publishedTime,
  modifiedTime,
  authors,
  imageAlt,
}: SeoMetadataProps): Metadata {
  const pageUrl = canonical ? toAbsoluteUrl(canonical) : BASE_URL;
  const displayTitle = brandTitle(title, absoluteTitle);
  const shortTitle = displayTitle.replace(new RegExp(`\\s*\\|\\s*${SITE_NAME_SHORT}$`, "i"), "");
  const desc = clipMetaDescription(description);

  const assembledKeywords = Array.isArray(keywords)
    ? [...defaultKeywords, ...keywords]
    : typeof keywords === "string"
      ? [...defaultKeywords, keywords]
      : defaultKeywords;

  const imageUrl = ogImage
    ? toAbsoluteUrl(ogImage)
    : buildOgImageUrl(title.replace(/\s*\|\s*NeoHub.*$/i, "").trim() || title, ogSubtitle);

  const ogImages = [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: imageAlt || `${displayTitle} — social preview`,
      type: imageUrl.includes("/api/og") ? "image/png" : undefined,
    },
  ];

  return {
    metadataBase: new URL(BASE_URL),
    title:
      absoluteTitle || /neohub/i.test(title)
        ? { absolute: displayTitle }
        : shortTitle,
    description: desc,
    keywords: assembledKeywords,
    authors: authors?.map((name) => ({ name })) || [{ name: "NeoHub Team" }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: displayTitle,
      description: desc,
      url: pageUrl,
      siteName: SITE_NAME,
      images: ogImages,
      locale: "en_IN",
      type: ogType,
      ...(ogType === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors: authors || ["NeoHub Team"],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: desc,
      images: [imageUrl],
      creator: "@NeoHubLucknow",
      site: "@NeoHubLucknow",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      ...(GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : {}),
      ...(BING_VERIFICATION ? { other: { "msvalidate.01": BING_VERIFICATION } } : {}),
    },
    other: {
      "ai-crawlers": noIndex ? "noindex" : "index, follow",
    },
  };
}

/** Site-wide defaults for the root layout */
export function rootMetadata(): Metadata {
  // Kept under ~58 chars so Google does not truncate it in results.
  const title = "Coworking Space in Gomti Nagar, Lucknow | NeoHub";
  const description =
    "Private cabins, desks from ₹5,500/mo, and meeting rooms from ₹500/hr across Cyber Heights, Bhavya & Experion in Gomti Nagar.";

  return {
    ...constructMetadata({
      title,
      description,
      canonical: "/",
      absoluteTitle: true,
      ogSubtitle: "Bhavya · Cyber Heights · Experion · Gomti Nagar",
      keywords: [
        "shared office space lucknow",
        "office space in gomti nagar",
        "private cabins lucknow",
        "conference rooms lucknow",
        "bhavya corporate tower coworking",
      ],
    }),
    title: {
      default: title,
      template: `%s | ${SITE_NAME_SHORT}`,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "48x48" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
  };
}
