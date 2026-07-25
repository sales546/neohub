import type { Metadata } from "next";
import type { SeoMetadataProps } from "@/types/seo";

export const SITE_NAME = "NeoHub Coworking Space";
export const SITE_NAME_SHORT = "NeoHub Lucknow";
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neohubspaces.in";

const defaultKeywords = [
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
  const desc = description.replace(/\s+/g, " ").trim().slice(0, 160);

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
    other: {
      "ai-crawlers": noIndex ? "noindex" : "index, follow",
      ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
        ? { "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
        : {}),
      ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : {}),
    },
  };
}

/** Site-wide defaults for the root layout */
export function rootMetadata(): Metadata {
  const title = "NeoHub Coworking Space Lucknow | Premium Shared Office Gomti Nagar";
  const description =
    "Boost productivity at NeoHub — Lucknow's premium coworking across Bhavya Corporate Tower, Cyber Heights, and Experion in Gomti Nagar. Hot desks, private cabins, and conference rooms.";

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
