import { BreadcrumbItem, FAQItem, ServicePricingInfo } from "@/types/seo";
import { neoHubAddresses, siteContact } from "@/lib/siteData";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neohubspaces.in";

/** Primary centre = Cyber Heights / Levana (isPrimary or first). */
function getPrimaryCentre() {
  return neoHubAddresses.find((a) => a.isPrimary) || neoHubAddresses[0];
}

export function getOrganizationSchema() {
  const primary = getPrimaryCentre();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "NeoHub Coworking Space",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/assets/logo_67f6779b.png`,
      width: "190",
      height: "60",
    },
    sameAs: [
      "https://www.facebook.com/NeoHubLucknow",
      "https://www.instagram.com/NeoHubLucknow",
      "https://www.linkedin.com/company/neohub-coworking-space/",
      primary.googleMapsUrl,
    ].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteContact.phoneTel,
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
      email: siteContact.email,
    },
  };
}

function centreHours(centre: (typeof neoHubAddresses)[number]) {
  const hours = centre.hours || "";
  if (/24/i.test(hours)) {
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    };
  }
  // Experion Google: 9 am–10 pm; Cyber Heights Google: 9 am–5 pm
  const closes = /10\s*pm/i.test(hours) ? "22:00" : "17:00";
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes,
  };
}

function centreToPlace(centre: (typeof neoHubAddresses)[number]) {
  const latLng = centre.googleMapsUrl?.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  const latitude = latLng?.[1] || "26.8661776";
  const longitude = latLng?.[2] || "80.9969169";

  return {
    "@type": "CoworkingSpace",
    "@id": `${BASE_URL}/#location-${centre.id}`,
    name: centre.name,
    url: `${BASE_URL}/contact`,
    telephone: centre.phoneTel || siteContact.phoneTel,
    image: `${BASE_URL}/assets/slider1_0fe6417c.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: centre.address.split(",").slice(0, 3).join(",").trim() || centre.address,
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226010",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    openingHoursSpecification: centreHours(centre),
  };
}

export function getLocalBusinessSchema() {
  const primary = getPrimaryCentre();
  const primaryPlace = centreToPlace(primary);
  const departments = neoHubAddresses
    .filter((c) => c.id !== primary.id)
    .map((c) => centreToPlace(c));

  return {
    "@context": "https://schema.org",
    "@type": "CoworkingSpace",
    "@id": `${BASE_URL}/#local-business`,
    name: "NeoHub Coworking Space Lucknow",
    alternateName: primary.name,
    description:
      "Premium coworking in Gomti Nagar, Lucknow — private cabins, dedicated workstations, hot desks, and conference rooms across Cyber Heights, Bhavya Corporate Tower, and Experion.",
    url: BASE_URL,
    telephone: primary.phoneTel || siteContact.phoneTel,
    email: siteContact.email,
    priceRange: "₹5500 - ₹25000",
    image: [
      `${BASE_URL}/assets/slider1_0fe6417c.webp`,
      `${BASE_URL}/assets/blog-covers/neohub-gomti-nagar-hub.webp`,
      `${BASE_URL}/assets/blog-covers/neohub-private-cabin.webp`,
    ],
    address: primaryPlace.address,
    geo: primaryPlace.geo,
    openingHoursSpecification: primaryPlace.openingHoursSpecification,
    hasMap: primary.googleMapsUrl,
    areaServed: [
      { "@type": "City", name: "Lucknow" },
      { "@type": "AdministrativeArea", name: "Gomti Nagar" },
      { "@type": "AdministrativeArea", name: "Vibhuti Khand" },
      { "@type": "AdministrativeArea", name: "Hazratganj" },
      { "@type": "AdministrativeArea", name: "Aliganj" },
      { "@type": "AdministrativeArea", name: "Indira Nagar" },
    ],
    department: departments,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "High-Speed Fiber Internet Backup", value: true },
      { "@type": "LocationFeatureSpecification", name: "Uninterrupted Power Backup", value: true },
      { "@type": "LocationFeatureSpecification", name: "Unlimited Tea and Coffee", value: true },
      { "@type": "LocationFeatureSpecification", name: "Secure Biometric Access", value: true },
      { "@type": "LocationFeatureSpecification", name: "Conference Rooms", value: true },
    ],
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
  };
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.item}`,
    })),
  };
}

export function getFAQPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image
      ? [post.image.startsWith("http") ? post.image : `${BASE_URL}${post.image}`]
      : undefined,
    datePublished: post.datePublished || undefined,
    dateModified: post.dateModified || post.datePublished || undefined,
    author: {
      "@type": "Organization",
      name: post.author || "NeoHub Team",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NeoHub Coworking Space",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/logo_67f6779b.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
    url: post.url,
    keywords: post.keywords?.join(", "),
    articleSection: post.articleSection?.join(", "),
    inLanguage: "en-IN",
  };
}

export function getBlogListSchema(
  posts: Array<{ title: string; url: string; datePublished?: string | null }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "NeoHub Coworking Insights",
    description:
      "Guides on coworking spaces, private cabins, pricing, and flexible offices in Gomti Nagar, Lucknow.",
    url: `${BASE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "NeoHub Coworking Space",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: post.url,
      datePublished: post.datePublished || undefined,
    })),
  };
}

export function getServiceSchema(
  serviceName: string,
  description: string,
  pricing: ServicePricingInfo[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    provider: {
      "@type": "CoworkingSpace",
      name: "NeoHub Coworking Space Lucknow",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Lucknow",
    },
    offers: pricing.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: p.currency,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.price,
        priceCurrency: p.currency,
        valueAddedTaxIncluded: p.taxIncluded ?? false,
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: String(p.unitQuantity ?? 1),
          unitCode: p.unitCode,
        },
      },
    })),
  };
}
