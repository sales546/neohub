import { neoHubAddresses } from "@/lib/siteData";
import type { FAQItem } from "@/types/seo";

export type LandingKind = "building" | "intent";

export type SeoLanding = {
  slug: string;
  kind: LandingKind;
  name: string;
  bannerTitle: string;
  metaTitle: string;
  metaDescription: string;
  slogan: string;
  description: string;
  keywords: string[];
  centreId?: string;
  mapEmbedUrl?: string;
  mapTitle?: string;
  highlights: string[];
  pricing?: { name: string; value: string; note: string }[];
  related: { href: string; label: string }[];
  faqs: FAQItem[];
};

const relatedWorkspaces = [
  { href: "/private-cabins", label: "Private cabins" },
  { href: "/dedicated-desk", label: "Dedicated desks" },
  { href: "/hot-desk", label: "Hot desks" },
  { href: "/virtual-office", label: "Virtual office" },
  { href: "/meeting-rooms", label: "Meeting rooms" },
  { href: "/conference-hall", label: "Conference halls" },
  { href: "/pricing", label: "Published pricing" },
  { href: "/blog/coworking-space-pricing-lucknow-2026", label: "Coworking pricing in Lucknow (2026)" },
  {
    href: "/blog/meeting-rooms-conference-booking-gomti-nagar",
    label: "Meeting rooms in Gomti Nagar",
  },
];

const relatedBuildings = [
  { href: "/levana-cyber-heights", label: "Levana Cyber Heights" },
  { href: "/bhavya-corporate-tower", label: "Bhavya Corporate Tower" },
  { href: "/experion", label: "Experion" },
  {
    href: "/blog/neohub-locations-cyber-heights-bhavya-experion",
    label: "How the three NeoHub floors compare",
  },
];

function centre(id: string) {
  const found = neoHubAddresses.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown centre ${id}`);
  return found;
}

export const seoLandings: Record<string, SeoLanding> = {
  "levana-cyber-heights": {
    slug: "levana-cyber-heights",
    kind: "building",
    name: "Levana Cyber Heights",
    bannerTitle: "NeoHub at Levana Cyber Heights, Gomti Nagar",
    metaTitle: "NeoHub Levana Cyber Heights | Coworking in Vibhuti Khand",
    metaDescription:
      "130+ seats on the 2nd floor of Levana Cyber Heights, opposite Indira Gandhi Pratishthan. Desks from ₹5,500/mo + GST. Reception 9 AM–5 PM.",
    slogan: "The original NeoHub floor in Cyber Heights",
    description:
      "Levana Cyber Heights is NeoHub’s first Gomti Nagar floor — 2nd Floor, TC-212, opposite Indira Gandhi Pratishthan. 130+ seats, reception 9:00 AM–5:00 PM, and the standard tour building for teams comparing Cyber Heights with Bhavya and Experion. Call +91 70004 81286.",
    keywords: [
      "levana cyber heights coworking",
      "cyber heights gomti nagar office",
      "neohub cyber heights",
    ],
    centreId: "levana",
    mapEmbedUrl: centre("levana").mapEmbedUrl,
    mapTitle: "NeoHub at Levana Cyber Heights, Gomti Nagar",
    highlights: [
      "130+ seats on the 2nd floor of Levana Cyber Heights",
      "Dedicated desks from ₹5,500/seat/month + GST",
      "Private cabins from ₹20,000/cabin/month + GST (typically 4–8 seats)",
      "Meeting rooms from ₹500/hour",
      "Reception 9:00 AM–5:00 PM; parking in the Cyber Heights complex",
      "Walking distance to Indira Gandhi Pratishthan and One Awadh Center Mall",
    ],
    pricing: [
      { name: "Dedicated desk", value: "₹5,500/seat/mo + GST", note: "Reserved workstation with storage" },
      { name: "Private cabin", value: "₹20,000/cabin/mo + GST", note: "Per cabin, typically 4–8 seats — not per seat" },
      { name: "Meeting room", value: "₹500/hour", note: "Members and non-members" },
    ],
    related: [
      ...relatedWorkspaces,
      { href: "/bhavya-corporate-tower", label: "Bhavya Corporate Tower (24 hours)" },
      { href: "/experion", label: "Experion" },
      { href: "/gomti-nagar", label: "All Gomti Nagar centres" },
    ],
    faqs: [
      {
        question: "Where is NeoHub inside Levana Cyber Heights?",
        answer:
          "2nd Floor, TC-212, Levana Cyber Heights, opposite Indira Gandhi Pratishthan, Vibhuti Khand, Gomti Nagar, Lucknow 226010. Phone +91 70004 81286. Email contact@neohubspaces.in.",
      },
      {
        question: "How many seats are at Cyber Heights?",
        answer: "130+ seats across hot desks, dedicated desks and lockable cabins.",
      },
      {
        question: "What are the hours at Cyber Heights?",
        answer:
          "Reception runs 9:00 AM–5:00 PM. Cabin members can request extended access — confirm on the tour. For 24-hour access use Bhavya Corporate Tower.",
      },
      {
        question: "Is this the same building as Regus or Showffice?",
        answer:
          "Cyber Heights hosts more than one operator. NeoHub’s floor is the 2nd-floor TC-212 pin. Tour the entrance you will actually use; do not rely on a marketplace map that names the tower only.",
      },
      {
        question: "Can I take a GST virtual office at this address?",
        answer:
          "Yes. Address-only plans start at ₹12,000/year and the GST kit at ₹18,000/year. A virtual office is not a Google Business Profile.",
      },
      {
        question: "How do I get here from Hazratganj or Indira Nagar?",
        answer:
          "Plan 20–35 minutes by car from Hazratganj via Shaheed Path / Gomti Nagar extension, or from Indira Nagar via Faizabad Road into Vibhuti Khand. See the commute pages for route notes.",
      },
    ],
  },
  "bhavya-corporate-tower": {
    slug: "bhavya-corporate-tower",
    kind: "building",
    name: "Bhavya Corporate Tower",
    bannerTitle: "NeoHub at Bhavya Corporate Tower (24 Hours)",
    metaTitle: "NeoHub Bhavya Corporate Tower | 24-Hour Coworking Lucknow",
    metaDescription:
      "NeoHub’s largest Lucknow floor — 500 seats, open 24 hours, 4th Floor Bhavya Corporate Tower, Vibhuti Khand. Cabins, desks, meeting rooms.",
    slogan: "500 seats, open 24 hours, in Vijaipur Colony",
    description:
      "Bhavya Corporate Tower is NeoHub’s largest Lucknow floor and the only centre in the network that is staffed for 24-hour access. 4th Floor, Vijaipur Colony, Vibhuti Khand, Gomti Nagar. Call +91 70004 81286.",
    keywords: [
      "bhavya corporate tower coworking",
      "24 hour coworking lucknow",
      "neohub bhavya tower",
    ],
    centreId: "bhavya",
    mapEmbedUrl: centre("bhavya").mapEmbedUrl,
    mapTitle: "NeoHub at Bhavya Corporate Tower, Vibhuti Khand",
    highlights: [
      "500 seats — the largest NeoHub floor in Lucknow",
      "Open 24 hours with card/staffed night access",
      "Dedicated desks from ₹5,500/seat/month + GST",
      "Private cabins from ₹20,000/cabin/month + GST (typically 4–8 seats)",
      "Meeting rooms from ₹500/hour",
      "Best fit when you need 20+ contiguous seats without changing pin code",
    ],
    pricing: [
      { name: "Dedicated desk", value: "₹5,500/seat/mo + GST", note: "Same published start as Cyber Heights" },
      { name: "Private cabin", value: "₹20,000/cabin/mo + GST", note: "Per cabin, not per seat" },
      { name: "Meeting room", value: "₹500/hour", note: "Book by the hour" },
    ],
    related: [
      ...relatedWorkspaces,
      { href: "/levana-cyber-heights", label: "Levana Cyber Heights" },
      { href: "/experion", label: "Experion" },
      { href: "/vibhuti-khand", label: "Coworking in Vibhuti Khand" },
    ],
    faqs: [
      {
        question: "Is NeoHub at Bhavya Tower really 24 hours?",
        answer:
          "Yes. This is the only NeoHub centre advertised as 24 hours. Night access is card or staffed — confirm the exact process on the tour rather than assuming an unmanned lobby.",
      },
      {
        question: "What is the exact address?",
        answer:
          "4th Floor, Bhavya Corporate Tower, Vijaipur Colony, Vibhuti Khand, Gomti Nagar, Lucknow 226010. Phone +91 70004 81286. Email contact@neohubspaces.in.",
      },
      {
        question: "How many seats are at Bhavya?",
        answer: "500 seats. Use this floor when Cyber Heights’ 130+ inventory is too small for the headcount you want to grow into.",
      },
      {
        question: "Are cabin rates per seat or per cabin?",
        answer:
          "Per cabin. ₹20,000/month + GST is the cabin package (typically 4–8 people), not ₹20,000 per person.",
      },
      {
        question: "Is this the same Google listing as Cyber Heights?",
        answer:
          "No. Search for NEOHUB at Bhavya Corporate Tower. Each NeoHub centre has its own Maps pin, address and hours.",
      },
      {
        question: "Can visitors reach the 4th floor after hours?",
        answer:
          "Members with night access can. Visitors should book a daytime tour first. Reception will brief you on tower security.",
      },
    ],
  },
  experion: {
    slug: "experion",
    kind: "building",
    name: "Experion",
    bannerTitle: "NeoHub at Experion, Gomti Nagar",
    metaTitle: "NeoHub Experion Gomti Nagar | Coworking & Cabins",
    metaDescription:
      "300+ seats on the 6th floor of Experion, Vibhuti Khand. Desks from ₹6,500/mo + GST. Open 9 AM–10 PM. Book a tour.",
    slogan: "300+ seats on the 6th floor of Experion",
    description:
      "Experion is NeoHub’s third Vibhuti Khand floor — 6th Floor, 611, Gomti Nagar, Lucknow 226010. Published rates sit a step above Cyber Heights and Bhavya (₹6,500 desks, ₹25,000 cabins). Hours 9:00 AM–10:00 PM. Call +91 70004 81286.",
    keywords: [
      "experion gomti nagar coworking",
      "neohub experion lucknow",
      "coworking experion vibhuti khand",
    ],
    centreId: "experion",
    mapEmbedUrl: centre("experion").mapEmbedUrl,
    mapTitle: "NeoHub at Experion, Vibhuti Khand",
    highlights: [
      "300+ seats on the 6th floor",
      "Dedicated desks from ₹6,500/seat/month + GST",
      "Private cabins from ₹25,000/cabin/month + GST (typically 4–8 seats)",
      "Meeting rooms from ₹600/hour",
      "Open 9:00 AM–10:00 PM (not 24 hours)",
      "Choose this floor when it is already on your commute, not because it is “premium-er” copy",
    ],
    pricing: [
      { name: "Dedicated desk", value: "₹6,500/seat/mo + GST", note: "Higher published start than Cyber Heights / Bhavya" },
      { name: "Private cabin", value: "₹25,000/cabin/mo + GST", note: "Per cabin, typically 4–8 seats" },
      { name: "Meeting room", value: "₹600/hour", note: "Hourly, members and non-members" },
    ],
    related: [
      ...relatedWorkspaces,
      { href: "/levana-cyber-heights", label: "Levana Cyber Heights" },
      { href: "/bhavya-corporate-tower", label: "Bhavya Corporate Tower" },
      { href: "/gomti-nagar", label: "All Gomti Nagar centres" },
    ],
    faqs: [
      {
        question: "Where is NeoHub inside Experion?",
        answer:
          "6th Floor, Experion, 611, Vibhuti Khand, Gomti Nagar, Lucknow 226010. Phone +91 70004 81286. Email contact@neohubspaces.in.",
      },
      {
        question: "Why is Experion priced higher than Cyber Heights?",
        answer:
          "Published dedicated desks start at ₹6,500 vs ₹5,500, and cabins at ₹25,000 vs ₹20,000, all + GST. Tour both if the commute is similar; do not assume the higher number means more seats in the cabin.",
      },
      {
        question: "Is Experion 24 hours?",
        answer: "No. Hours are 9:00 AM–10:00 PM. For 24-hour access book Bhavya Corporate Tower.",
      },
      {
        question: "How many seats are at Experion?",
        answer: "300+ seats. Between Cyber Heights (130+) and Bhavya (500).",
      },
      {
        question: "Can I use Experion for a virtual office?",
        answer:
          "GST and company-registration addresses are issued from the NeoHub Gomti Nagar network. Confirm the printed address on the agreement — it must match the centre named on your documents.",
      },
      {
        question: "Does Experion have its own Google listing?",
        answer:
          "Yes. Search for Neohub Coworking Experion — it is a separate centre from Cyber Heights and Bhavya Tower.",
      },
    ],
  },
  "office-space-for-rent-lucknow": {
    slug: "office-space-for-rent-lucknow",
    kind: "intent",
    name: "Office space for rent in Lucknow",
    bannerTitle: "Office space for rent in Lucknow",
    metaTitle: "Office Space for Rent in Lucknow | Cabins & Managed Floors",
    metaDescription:
      "Rent office space in Lucknow without a 3-year lock-in. NeoHub private cabins and managed floors in Vibhuti Khand / Gomti Nagar from ₹20,000/cabin/month + GST. Three buildings, one operator.",
    slogan: "Grade-A office space in Gomti Nagar without a traditional lease",
    description:
      "Most “office space for rent in Lucknow” ads on MagicBricks and 99acres are raw floors in Hazratganj, Gomti Nagar or the Faizabad Road belt. NeoHub is the other product: a lockable cabin or a managed floor inside Levana Cyber Heights, Bhavya Corporate Tower or Experion, with furniture, fibre, GST-ready billing and meeting rooms already in the building. You are not signing a 3-year bare-shell lease.",
    keywords: [
      "office space for rent lucknow",
      "office on rent gomti nagar",
      "rented office lucknow",
    ],
    highlights: [
      "Cabins from ₹20,000/month + GST (the cabin, typically 4–8 seats)",
      "Managed inventory in three Vibhuti Khand towers — not a classifieds listing",
      "No interior fit-out, no 3-year lock-in, no separate internet vendor",
      "Meeting rooms and a conference hall in the same operator network",
      "Virtual office if you only need the address, not the floor",
    ],
    related: [
      ...relatedBuildings,
      { href: "/private-cabins", label: "Private cabins" },
      { href: "/managed-office-gomti-nagar", label: "Managed office in Gomti Nagar" },
      { href: "/gomti-nagar", label: "Coworking in Gomti Nagar" },
      {
        href: "/blog/why-startups-choose-coworking-over-traditional-offices-lucknow",
        label: "Why startups choose coworking over a traditional office",
      },
    ],
    faqs: [
      {
        question: "Is a NeoHub cabin the same as renting an office in Lucknow?",
        answer:
          "It is office space you control (lock, seats, your team) without taking the whole floor. If you need 40+ people on one plate, ask for a managed suite rather than stacking cabins.",
      },
      {
        question: "Where are the buildings?",
        answer:
          "All three are in Vibhuti Khand, Gomti Nagar: Levana Cyber Heights, Bhavya Corporate Tower and Experion. We do not rent space in Hazratganj or Aliganj — those pages are commute guides.",
      },
      {
        question: "What does a cabin actually cost?",
        answer:
          "From ₹20,000/cabin/month + GST at Cyber Heights and Bhavya, ₹25,000 at Experion. That is per cabin, not per seat. A 5-seat cabin is about ₹4,000/seat before GST.",
      },
      {
        question: "Can I put this address on MagicBricks as my office?",
        answer:
          "Members use the centre address for GST, MCA and letterheads as allowed by the agreement. Listing a virtual-office address as a staffed office on a property portal is how listings get suspended — don’t.",
      },
      {
        question: "Do you broker third-party offices?",
        answer: "No. We operate three floors. If you need a full tower plate we are the wrong product.",
      },
      {
        question: "How fast can I move in?",
        answer:
          "A cabin can be live in days if inventory is free. Bare-shell offices in Lucknow typically take weeks of interiors. Tour first: +91 70004 81286.",
      },
    ],
  },
  "managed-office-gomti-nagar": {
    slug: "managed-office-gomti-nagar",
    kind: "intent",
    name: "Managed office in Gomti Nagar",
    bannerTitle: "Managed office in Gomti Nagar",
    metaTitle: "Managed Office in Gomti Nagar, Lucknow | NeoHub",
    metaDescription:
      "Managed office in Gomti Nagar: lockable cabins and team floors at Cyber Heights, Bhavya and Experion with furniture, fibre, reception and GST billing. From ₹20,000/cabin/month + GST.",
    slogan: "A private office with the building already run for you",
    description:
      "A managed office in Gomti Nagar is a lockable room or suite where NeoHub runs internet, housekeeping, reception and meeting-room inventory. It sits between a hot desk and a 5,000 sq ft lease. We operate this product in three Vibhuti Khand towers — not as a pan-India serviced-office brand, and not as a co-working marketplace page.",
    keywords: [
      "managed office gomti nagar",
      "serviced office lucknow",
      "managed office space lucknow",
    ],
    highlights: [
      "Your door, your seats, shared building services",
      "Cyber Heights (130+), Bhavya (500, 24h), Experion (300+)",
      "Cabins typically 4–8 seats; ask for a contiguous suite above that",
      "Dual-fibre internet and power backup in the operator stack",
      "Same GST invoice as the rest of the NeoHub network",
    ],
    related: [
      ...relatedBuildings,
      { href: "/private-cabins", label: "Private cabins" },
      { href: "/office-space-for-rent-lucknow", label: "Office space for rent in Lucknow" },
      { href: "/dedicated-desk", label: "Dedicated desks" },
      {
        href: "/blog/why-startups-choose-coworking-over-traditional-offices-lucknow",
        label: "Why startups choose coworking over a traditional office",
      },
    ],
    faqs: [
      {
        question: "How is a managed office different from coworking?",
        answer:
          "Coworking here includes hot desks and dedicated desks in a shared room. A managed office is a lockable cabin or suite. Same operator, different noise and privacy.",
      },
      {
        question: "Do you offer full-floor managed offices?",
        answer:
          "Bhavya’s 500-seat inventory is where larger contiguous holds are realistic. Tell us headcount; we will not invent a 100-seat suite on a 130-seat floor.",
      },
      {
        question: "Is this the same as Regus in Cyber Heights?",
        answer:
          "Regus is a different operator in the same tower. Compare on a tour: cabin lock, hourly room rate, and which Maps pin matches the lift you will use.",
      },
      {
        question: "What is included besides the room?",
        answer:
          "Furniture, housekeeping, reception, fibre, power backup, and paid meeting rooms in the same network. Pantry and parking rules follow the tower.",
      },
      {
        question: "Can a managed office include a Google Business Profile?",
        answer:
          "Only if your own staff work at that building with signage. We do not sell “GBP included” with a mailing address.",
      },
      {
        question: "Lock-in?",
        answer:
          "Month-to-month and longer holds are both used. Confirm the current minimum on the proposal — do not copy a marketplace page.",
      },
    ],
  },
  "gst-registration-lucknow": {
    slug: "gst-registration-lucknow",
    kind: "intent",
    name: "GST registration virtual office in Lucknow",
    bannerTitle: "GST registration address in Lucknow",
    metaTitle: "GST Registration Virtual Office in Lucknow | NeoHub",
    metaDescription:
      "GST registration kit for Lucknow: Gomti Nagar virtual office at ₹18,000/year with NOC, utility bill, rent agreement and ownership papers. Call +91 70004 81286. GBP is not included.",
    slogan: "A Gomti Nagar address that your CA can actually file with",
    description:
      "This page is only the GST-registration kit — ₹18,000/year — not the ₹12,000 address-only plan and not a staffed cabin. NeoHub supplies a Vibhuti Khand / Gomti Nagar address plus the landlord NOC, utility bill, rent agreement and ownership papers a Lucknow CA typically attaches to a GST application. We do not include a Google Business Profile. Hub page: /virtual-office.",
    keywords: [
      "gst registration lucknow virtual office",
      "gst address gomti nagar",
      "virtual office for gst lucknow",
    ],
    highlights: [
      "₹18,000/year + applicable tax for the GST document kit",
      "Gomti Nagar / Vibhuti Khand address on the agreement",
      "NOC, utility bill, rent agreement, ownership papers as used by local CAs",
      "Meeting-room credits available — you are not buying a desk",
      "Not a Google Business Profile and not a company-incorporation-only plan",
    ],
    pricing: [
      {
        name: "GST registration kit",
        value: "₹18,000/year",
        note: "Document pack for GST filing. GBP is not included.",
      },
      {
        name: "Address only (no GST pack)",
        value: "₹12,000/year",
        note: "Use the company-registration page if you do not need GST papers.",
      },
    ],
    related: [
      { href: "/virtual-office", label: "All virtual office plans" },
      { href: "/company-registration-lucknow", label: "Company registration address" },
      { href: "/gomti-nagar", label: "Coworking in Gomti Nagar" },
      { href: "/contact", label: "Book a call" },
    ],
    faqs: [
      {
        question: "Will this address get my GST approved?",
        answer:
          "We provide the documents the portal asks for. Approval is the GST officer’s decision. We do not sell “guaranteed GST”.",
      },
      {
        question: "Is Google Business Profile included?",
        answer:
          "No. Google requires a staffed location and signage. A mailing address is not a GBP. Anyone advertising otherwise is selling a policy risk.",
      },
      {
        question: "Which building appears on the papers?",
        answer:
          "The agreement names a NeoHub Gomti Nagar centre. Confirm the printed address before you file — Cyber Heights, Bhavya and Experion are different pins.",
      },
      {
        question: "Can I visit the centre?",
        answer:
          "Yes, by appointment. A virtual office is not a hot desk; visiting without a booking is a reception conversation, not a workspace.",
      },
      {
        question: "What if I only need MCA / company incorporation?",
        answer: "Use the ₹12,000 address-only plan on the company-registration page. Do not buy the GST kit for that job.",
      },
      {
        question: "Phone number on GST forms?",
        answer: "Use +91 70004 81286 and contact@neohubspaces.in — the same NAP as the rest of this site.",
      },
    ],
  },
  "company-registration-lucknow": {
    slug: "company-registration-lucknow",
    kind: "intent",
    name: "Company registration address in Lucknow",
    bannerTitle: "Company registration address in Lucknow",
    metaTitle: "Company Registration Virtual Office in Lucknow | NeoHub",
    metaDescription:
      "Registered office address in Gomti Nagar for company incorporation: ₹12,000/year, mail handling, letterhead address. GST kit is a separate ₹18,000 plan. Call +91 70004 81286.",
    slogan: "A registered office address — not a GST kit, not a desk",
    description:
      "Use this page when you need a Lucknow registered-office address for MCA incorporation, letterheads and mail — ₹12,000/year. It is not the GST document pack (that is ₹18,000 on /gst-registration-lucknow) and it is not a cabin. Mail is handled at the named Gomti Nagar centre. Google Business Profile is not included.",
    keywords: [
      "company registration lucknow virtual office",
      "registered office address gomti nagar",
      "mca address lucknow",
    ],
    highlights: [
      "₹12,000/year for a business / registered-office address",
      "Mail handling at the named Gomti Nagar centre",
      "Meeting-room credits on request — you are not buying seats",
      "Upgrade to the GST kit only if you are actually filing GST",
      "Same NAP as the live site: +91 70004 81286, contact@neohubspaces.in",
    ],
    pricing: [
      {
        name: "Business address only",
        value: "₹12,000/year",
        note: "Incorporation, mail, letterhead. No GST document pack.",
      },
      {
        name: "GST registration kit",
        value: "₹18,000/year",
        note: "Separate product — see the GST registration page.",
      },
    ],
    related: [
      { href: "/virtual-office", label: "All virtual office plans" },
      { href: "/gst-registration-lucknow", label: "GST registration kit" },
      { href: "/office-space-for-rent-lucknow", label: "If you need a real cabin" },
      { href: "/contact", label: "Talk to NeoHub" },
    ],
    faqs: [
      {
        question: "Can I use this address for MCA incorporation?",
        answer:
          "Yes, as a registered-office address under the virtual-office agreement. Your CS/CA should read the NOC before filing.",
      },
      {
        question: "Is this cheaper than the GST plan because it is incomplete?",
        answer:
          "It is a different product. ₹12,000 is address + mail. ₹18,000 adds the GST paper set. Buy the one that matches the filing.",
      },
      {
        question: "Will you answer calls as my company?",
        answer:
          "Call forwarding and reception handling are scoped on the agreement. Do not assume a full virtual-PBX receptionist unless it is written down.",
      },
      {
        question: "Can I put a signboard and create a Google listing?",
        answer:
          "No. Signage and GBP require a staffed occupation of that floor. Virtual office customers do not get a listing.",
      },
      {
        question: "Where is mail collected?",
        answer: "At the NeoHub centre named on your agreement in Vibhuti Khand, Gomti Nagar.",
      },
      {
        question: "How do I switch to a cabin later?",
        answer:
          "Tour Cyber Heights, Bhavya or Experion. The virtual-office fee does not convert into a desk credit automatically — ask on the call.",
      },
    ],
  },
};

export const SEO_LANDING_SLUGS = Object.keys(seoLandings);

export function isSeoLandingSlug(slug: string): slug is keyof typeof seoLandings {
  return Object.prototype.hasOwnProperty.call(seoLandings, slug);
}
