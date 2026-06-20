export const WHATSAPP_NUMBER = "917000481286";

export const siteContact = {
  phone: "+91 70004 81286",
  phoneTel: "+917000481286",
  email: "contact@neohubspaces.in",
  address:
    "2nd Floor, Levana Cyber Heights, TC-212, opposite Indira Gandhi Pratishthan, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d444.89040154230764!2d81.00968106592566!3d26.867826200000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3f2ba4b28db%3A0x5fa240616cd71f28!2sNeohub%20-%20Levana%20-%20Co-Working%20Spaces!5e0!3m2!1sen!2sin!4v1755697550688!5m2!1sen!2sin",
  googleMapsUrl:
    "https://www.google.com/maps/place/Neohub+-+Levana+-+Co-Working+Spaces/@26.8678262,81.0096811,17z/data=!3m1!4b1!4m6!3m5!1s0x399be3f2ba4b28db:0x5fa240616cd71f28!8m2!3d26.8678262!4d81.0096811",
};

/** Verified NeoHub coworking centres in Lucknow (Google listings). */
export const neoHubAddresses = [
  {
    id: "levana",
    name: "Neohub - Levana - Co-Working Spaces",
    rating: "4.8 · 22 reviews",
    address:
      "2nd Floor, Levana Cyber Heights, TC-212, opposite Indira Gandhi Pratishthan, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    phone: "+91 70004 81286",
    phoneTel: "+917000481286",
    hours: "Opens 9 am",
    googleMapsUrl:
      "https://www.google.com/maps/place/Neohub+-+Levana+-+Co-Working+Spaces/@26.8678262,81.0096811,17z/data=!3m1!4b1!4m6!3m5!1s0x399be3f2ba4b28db:0x5fa240616cd71f28!8m2!3d26.8678262!4d81.0096811",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d444.89040154230764!2d81.00968106592566!3d26.867826200000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3f2ba4b28db%3A0x5fa240616cd71f28!2sNeohub%20-%20Levana%20-%20Co-Working%20Spaces!5e0!3m2!1sen!2sin!4v1755697550688!5m2!1sen!2sin",
    isPrimary: true,
  },
  {
    id: "bhavya",
    name: "NEOHUB — Bhavya Corporate Tower",
    rating: "4.8 · 16 reviews",
    address:
      "4th Floor, Bhavya Corporate Tower, Vijaipur Colony, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
    phone: "+91 88539 03826",
    phoneTel: "+918853903826",
    hours: "Open 24 hours",
    googleMapsUrl:
      "https://www.google.com/maps/place/NEOHUB+-+Bhavya+Tower/@26.8661776,80.9969169,17z/data=!3m1!4b1!4m6!3m5!1s0x399be3f5fe2ec023:0xa994cce33170b957!8m2!3d26.8661776!4d80.9969169",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7118.350186674988!2d80.99691699357909!3d26.866177600000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3f5fe2ec023%3A0xa994cce33170b957!2sNEOHUB%20-%20Bhavya%20Tower!5e0!3m2!1sen!2sin!4v1755697317962!5m2!1sen!2sin",
  },
  {
    id: "experion",
    name: "Neohub Coworking — Experion",
    rating: null,
    address: "6th Floor, Experion, 611, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh",
    phone: null,
    phoneTel: null,
    hours: "Opens 9 am Mon",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Neohub+Coworking+Experion+611+Vibhuti+Khand+Gomti+Nagar+Lucknow",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Neohub+Coworking+Experion+611+Vibhuti+Khand+Gomti+Nagar+Lucknow&z=15&ie=UTF8&output=embed",
  },
];

export const localities = [
  { href: "/gomti-nagar", label: "Gomti Nagar", blurb: "Main business hub" },
  { href: "/vibhuti-khand", label: "Vibhuti Khand", blurb: "Corporate district" },
  { href: "/hazratganj", label: "Hazratganj", blurb: "Heritage commercial core" },
  { href: "/aliganj", label: "Aliganj", blurb: "North Lucknow access" },
  { href: "/indira-nagar", label: "Indira Nagar", blurb: "Short commute" },
];

export const trustStats = [
  { value: "120", suffix: "+", label: "Active Members" },
  { value: "40", suffix: "+", label: "Teams Hosted" },
  { value: "15", suffix: "+", label: "Meeting Rooms / Month" },
  { value: "4.8", suffix: "/5", label: "Member Satisfaction" },
];

export const aboutHighlights = [
  { value: "1", suffix: "", label: "Premium hub in Gomti Nagar" },
  { value: "12", suffix: "+", label: "Workspace configurations" },
];

export const pricingPlans = [
  {
    slug: "private-cabins",
    icon: "/assets/icon3_c99efff8.png",
    name: "Private Office",
    price: "9,000",
    tag: "",
    desc: "Lockable cabins for teams needing privacy, dedicated bandwidth, and a corporate address at Cyber Heights.",
  },
  {
    slug: "dedicated-desk",
    icon: "/assets/icon2_09453942.png",
    name: "Dedicated Desk",
    price: "6,000",
    tag: "Popular",
    desc: "Your reserved desk with storage, 24/7 access, and full access to meeting rooms and pantry amenities.",
  },
  {
    slug: "hot-desk",
    icon: "/assets/icon1_011513e6.png",
    name: "Hot Desk",
    price: "3,500",
    tag: "",
    desc: "Flexible monthly membership for freelancers and remote professionals in our open lounge workspace.",
  },
];

export const testimonials = [
  {
    image: "/assets/testimg3_98d93f4b.png",
    name: "Rohan Sharma",
    role: "Creative Director, Pixel Media Lucknow",
    rating: 5,
    text: "The dedicated desks provide the perfect balance of focus and community. Reliable internet and a professional address have made client meetings effortless.",
  },
  {
    image: "/assets/testimg2_9ded9eee.png",
    name: "Priya Patel",
    role: "Independent Consultant, Gomti Nagar",
    rating: 5,
    text: "Meeting rooms at Levana Cyber Heights are always presentation-ready. Our corporate clients consistently praise the professional setup.",
  },
  {
    image: "/assets/testimg1_4d709d5b.png",
    name: "Amit Verma",
    role: "Founder, EduTech Ventures",
    rating: 5,
    text: "We scaled from 3 to 12 members without lease headaches. NeoHub handles operations so we can focus on product growth.",
  },
  {
    image: "/assets/testimg4_89125531.png",
    name: "Ananya Gupta",
    role: "Co-Founder, TechStart Lucknow",
    rating: 5,
    text: "Dual-fiber internet and backup power give our dev team confidence. The community here has opened multiple B2B opportunities.",
  },
];

export const spacePreviews = [
  {
    title: "Premium Private Cabins",
    href: "/private-cabins",
    image: "/assets/Private-Spaces_dfb4e03e.png",
    meta: "4–15 seats · Lockable",
  },
  {
    title: "Dedicated Workstations",
    href: "/dedicated-desk",
    image: "/assets/Customized-Desks_f656af2d.png",
    meta: "Fixed desk · Storage included",
  },
  {
    title: "Flexible Hot Desking",
    href: "/hot-desk",
    image: "/assets/Hot-Desking_ade72a77.png",
    meta: "Daily or monthly passes",
  },
  {
    title: "Conference Rooms",
    href: "/meeting-rooms",
    image: "/assets/Conference-Rooms_feaacc5e.png",
    meta: "AV setup · Hourly booking",
  },
];

export const blogPreviews = [
  {
    href: "/blog",
    image: "/assets/image7_6ac1b0f1.png",
    date: "12",
    month: "Jun",
    title: "How Modern Coworking Spaces are Accelerating Lucknow's Startup Growth.",
  },
  {
    href: "/blog",
    image: "/assets/image6_5720d7a6.png",
    date: "05",
    month: "Jun",
    title: "5 Productivity Hacks for Teams in Shared Office Environments.",
  },
  {
    href: "/blog",
    image: "/assets/image5-1_6a8d661c.png",
    date: "28",
    month: "May",
    title: "Dedicated Desk vs Private Cabin: Which Fits Your Team?",
  },
];

export const homeGalleryImages = [
  { src: "/assets/galleryimg1_3b163f91.png", alt: "NeoHub coworking lounge at Levana Cyber Heights" },
  { src: "/assets/galleryimg2_cf31ca9e.png", alt: "Open coworking area with natural light" },
  { src: "/assets/galleryimg3_d90d3227.png", alt: "Professional meeting room setup" },
  { src: "/assets/galleryimg4_426fab93.png", alt: "Private cabin workspace for teams" },
  { src: "/assets/galleryimg5_5319e1bc.png", alt: "Conference room with AV equipment" },
];

export const galleryImages = [
  { src: "/assets/galleryimg1_3b163f91.png", alt: "NeoHub workspace gallery" },
  { src: "/assets/galleryimg2_cf31ca9e.png", alt: "NeoHub coworking area" },
  { src: "/assets/galleryimg3_d90d3227.png", alt: "NeoHub meeting room" },
  { src: "/assets/galleryimg4_426fab93.png", alt: "NeoHub private cabins" },
  { src: "/assets/galleryimg5_5319e1bc.png", alt: "NeoHub conference room" },
  { src: "/assets/galleryimg6_41584ce5.png", alt: "NeoHub lounge area" },
  { src: "/assets/galleryimg7_ffa21c49.png", alt: "NeoHub workstations" },
  { src: "/assets/galleryimg8_6c48ff7a.png", alt: "NeoHub office interior" },
  { src: "/assets/galleryimg9_ff9b2219.png", alt: "NeoHub hot desking" },
  { src: "/assets/galleryimg10_b69e6146.png", alt: "NeoHub premium office" },
];

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildPlanWhatsAppUrl(planName) {
  return buildWhatsAppUrl(
    `Hi NeoHub, I am interested in the ${planName} plan at Levana Cyber Heights. Please share availability and a tour slot.`
  );
}
