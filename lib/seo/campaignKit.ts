import { seoLandings } from "@/lib/content/seoLandings";
import { classifyIntent, titleFromKeyword } from "@/lib/seo/keywordPlaybook";

export type CampaignKit = {
  keyword: string;
  title: string;
  ogImage: string;
  why: string[];
  outline: string[];
  internalLinks: { href: string; label: string }[];
  google: { headlines: string[]; descriptions: string[]; path: string };
  meta: { hook: string; primary: string; cta: string };
  sponsor: string;
  draftPost: {
    title: string;
    slug: string;
    excerpt: string;
    body_html: string;
    meta_title: string;
    meta_description: string;
    focus_keyword: string;
  };
};

const PHONE = "+91 70004 81286";
const CENTRES = "Levana Cyber Heights, Bhavya Corporate Tower, and Experion";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function clip(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function landingFor(keyword: string) {
  const needle = keyword.toLowerCase();
  return Object.values(seoLandings).find((landing) => {
    const blob = [landing.name, landing.slug, ...(landing.keywords || [])].join(" ").toLowerCase();
    return landing.keywords.some((item) => item.toLowerCase() === needle) || blob.includes(needle);
  });
}

export function buildCampaignKit(input: { keyword: string; title?: string }): CampaignKit {
  const keyword = input.keyword.replace(/\s+/g, " ").trim();
  const title = (input.title || titleFromKeyword(keyword)).replace(/\s+/g, " ").trim();
  const intent = classifyIntent(keyword);
  const landing = landingFor(keyword);
  const slug = slugify(title);
  const ogImage = `/api/og?title=${encodeURIComponent(clip(title, 90))}&subtitle=${encodeURIComponent("Gomti Nagar · Lucknow coworking")}`;

  const internalLinks = [
    { href: "/spaces", label: "Spaces" },
    { href: "/pricing", label: "Published pricing" },
    { href: "/contact", label: "Book a tour" },
    landing ? { href: `/${landing.slug}`, label: landing.name } : { href: "/gomti-nagar", label: "Gomti Nagar coworking" },
    { href: "/virtual-office", label: "Virtual office" },
  ];

  const outline = [
    `What teams searching “${keyword}” actually need in Lucknow`,
    `How NeoHub covers this at ${CENTRES}`,
    "Desks, cabins, and meeting rooms — published rates without marketplace fluff",
    landing ? `Walkthrough of ${landing.name}` : "Which of the three Gomti Nagar floors fits the commute",
    "GST, virtual office, and what is not included",
    "How to tour: call, WhatsApp, or the contact form",
  ];

  const why = [
    intent === "tour"
      ? "This is a tour-intent query — the page should end in a booking, not a definition."
      : intent === "informational"
        ? "Answer the comparison first, then route the reader to a NeoHub floor."
        : "Commercial intent: lead with published rates and a Gomti Nagar pin, not generic coworking copy.",
    landing
      ? `A landing already exists at /${landing.slug}. The blog should support it with proof, FAQs, and internal links.`
      : "No dedicated landing owns this query yet — a focused post can carry the ranking until a landing is justified.",
    `Name Cyber Heights, Bhavya, and Experion. Use ${PHONE}. Do not invent city-wide coverage.`,
  ];

  const headlines = [
    clip(`NeoHub · ${titleFromKeyword(keyword)}`, 30),
    clip("Coworking in Gomti Nagar", 30),
    clip("Tour Cyber Heights today", 30),
  ];
  const descriptions = [
    clip(
      `Desks from ₹5,500/mo + GST. Cabins from ₹20,000. Three floors in Vibhuti Khand. Call ${PHONE}.`,
      90,
    ),
    clip(
      `Hot desks, private cabins, meeting rooms. Bhavya · Cyber Heights · Experion. Book a Lucknow tour.`,
      90,
    ),
  ];

  const hook = `Looking for ${keyword}? NeoHub is in Vibhuti Khand — not a pan-India coworking chain.`;
  const primary = `Three floors in Gomti Nagar (${CENTRES}). Dedicated desks from ₹5,500/seat/month + GST, cabins from ₹20,000/cabin, meeting rooms from ₹500/hour. Tour with ${PHONE}.`;
  const cta = "Book a Gomti Nagar tour";
  const sponsor = `NeoHub coworking, Gomti Nagar — ${keyword}. Desks from ₹5,500/mo + GST at Cyber Heights, Bhavya Corporate Tower (24h), and Experion. Tour: ${PHONE} · neohubspaces.in`;

  const excerpt = clip(
    `A Lucknow-specific guide to ${keyword}: NeoHub floors in Vibhuti Khand, published rates, and how to book a tour.`,
    180,
  );
  const metaTitle = clip(`${title} | NeoHub Lucknow`, 60);
  const metaDescription = clip(
    `${titleFromKeyword(keyword)} at NeoHub, Gomti Nagar. Desks from ₹5,500/mo + GST, cabins from ₹20,000. Tour Cyber Heights, Bhavya, or Experion — ${PHONE}.`,
    155,
  );

  const body_html = `
<h2>${outline[0]}</h2>
<p>Most ${keyword} searches in Lucknow are from teams comparing a cabin, a dedicated desk, or a virtual-office address — not a 3-year bare-shell lease. NeoHub answers that product in Vibhuti Khand, Gomti Nagar.</p>
<h2>${outline[1]}</h2>
<p>We operate at ${CENTRES}. Bhavya is the 24-hour floor. Cyber Heights is the original 130+ seat pin opposite Indira Gandhi Pratishthan. Experion sits a rate step above (desks from ₹6,500, cabins from ₹25,000).</p>
<h2>${outline[2]}</h2>
<ul>
<li>Dedicated desks from ₹5,500/seat/month + GST (₹6,500 at Experion)</li>
<li>Private cabins from ₹20,000/cabin/month + GST (typically 4–8 seats)</li>
<li>Meeting rooms from ₹500/hour</li>
</ul>
<h2>${outline[3]}</h2>
<p>${landing ? landing.description : "Pick the floor that already sits on the commute. Do not choose Experion because the copy sounds more premium — tour both if travel time is similar."}</p>
<h2>${outline[4]}</h2>
<p>Address-only plans start at ₹12,000/year. The GST document kit is ₹18,000/year. A virtual office is not a Google Business Profile. Confirm the printed centre address before you file.</p>
<h2>${outline[5]}</h2>
<p>Call or WhatsApp ${PHONE}, or use the contact form. Plan 20–35 minutes for a walkthrough. Ask which Maps pin matches the lift you will actually use.</p>
<p>Related: ${internalLinks.map((link) => `<a href="${link.href}">${link.label}</a>`).join(" · ")}</p>
`.trim();

  return {
    keyword,
    title,
    ogImage,
    why,
    outline,
    internalLinks,
    google: {
      headlines,
      descriptions,
      path: "www.neohubspaces.in/contact",
    },
    meta: { hook, primary, cta },
    sponsor,
    draftPost: {
      title,
      slug,
      excerpt,
      body_html,
      meta_title: metaTitle,
      meta_description: metaDescription,
      focus_keyword: keyword,
    },
  };
}
