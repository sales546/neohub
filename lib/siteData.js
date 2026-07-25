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
    shortName: "Cyber Heights",
    seats: "130+",
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
    pricing: {
      workstation: "5,500",
      cabin: "20,000",
      conference: "500",
    },
  },
  {
    id: "bhavya",
    name: "NEOHUB — Bhavya Corporate Tower",
    shortName: "Bhavya Corporate Tower",
    seats: "500",
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
    // Assumed same as Cyber Heights until confirmed (Botanya column was struck in notes)
    pricing: {
      workstation: "5,500",
      cabin: "20,000",
      conference: "500",
    },
  },
  {
    id: "experion",
    name: "Neohub Coworking — Experion",
    shortName: "Experion",
    seats: "300+",
    rating: null,
    address: "6th Floor, Experion, 611, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh",
    phone: null,
    phoneTel: null,
    hours: "Opens 9 am Mon",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Neohub+Coworking+Experion+611+Vibhuti+Khand+Gomti+Nagar+Lucknow",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Neohub+Coworking+Experion+611+Vibhuti+Khand+Gomti+Nagar+Lucknow&z=15&ie=UTF8&output=embed",
    pricing: {
      workstation: "6,500",
      cabin: "25,000",
      conference: "600",
    },
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
  { value: "900", suffix: "+", label: "Seats Across Spaces" },
  { value: "15", suffix: "+", label: "Enterprise Clients" },
  { value: "3", suffix: "", label: "Premium Locations" },
  { value: "4.8", suffix: "/5", label: "Member Satisfaction" },
];

export const aboutHighlights = [
  { value: "3", suffix: "", label: "Premium hubs in Gomti Nagar" },
  { value: "900", suffix: "+", label: "Seats across locations" },
];

/** Starting / Cyber Heights rates shown on homepage (+ GST). */
export const pricingPlans = [
  {
    slug: "private-cabins",
    icon: "/assets/icon3_c99efff8.png",
    name: "Private Cabin",
    price: "20,000",
    tag: "",
    unit: "/month + GST",
    desc: "Lockable private cabins for teams. From ₹20,000/mo at Cyber Heights & Bhavya; ₹25,000/mo at Experion (+ GST).",
  },
  {
    slug: "dedicated-desk",
    icon: "/assets/icon2_09453942.png",
    name: "Workstation",
    price: "5,500",
    tag: "Popular",
    unit: "/month + GST",
    desc: "Your reserved workstation with storage and full amenities. From ₹5,500/mo at Cyber Heights; ₹6,500/mo at Experion (+ GST).",
  },
  {
    slug: "meeting-rooms",
    icon: "/assets/icon1_011513e6.png",
    name: "Conference Booking",
    price: "500",
    tag: "",
    unit: "/hr",
    desc: "Book conference rooms by the hour. ₹500/hr at Cyber Heights & Bhavya; ₹600/hr at Experion.",
  },
];

/** Clients featured on the homepage partners strip (logo assets). */
export const partnerLogos = [
  { src: "/assets/image1_2ff040a7.png", alt: "Zomato (Eternal)" },
  { src: "/assets/image2_af4b6da2.png", alt: "Infoedge" },
  { src: "/assets/image3_3fe5ea43.png", alt: "Tata Play" },
  { src: "/assets/image4_86546124.png", alt: "Eclat Health Solutions" },
  { src: "/assets/image5_26f56b87.png", alt: "EKA Mobility" },
  { src: "/assets/image6_86f48442.png", alt: "Cars24" },
];

/** Full client roster from NeoHub operations notes. */
export const clientNames = [
  "Tata Communications Transformation Services",
  "IndiaMART",
  "Sterlite Technologies",
  "My-CPE One",
  "EKA Mobility",
  "Infoedge",
  "Tata Play",
  "Zomato (Eternal)",
  "WoodRock",
  "OYO",
  "PSS",
  "Ceranon",
  "Cars24",
  "Eclat Health Solutions",
  "Excelon Solution",
];

export const testimonials = [
  {
    image: "/assets/testimg3_98d93f4b.png",
    name: "Gyanendra Pratap Singh",
    role: "Eclat Health Solutions",
    rating: 5,
    text: "NeoHub gives our team a professional base in Gomti Nagar with reliable infrastructure and meeting rooms that are always client-ready.",
  },
  {
    image: "/assets/testimg2_9ded9eee.png",
    name: "Suraj Singh",
    role: "Zomato",
    rating: 5,
    text: "The workstations and conference facilities make day-to-day operations smooth. NeoHub is a strong coworking partner for our Lucknow team.",
  },
  {
    image: "/assets/testimg1_4d709d5b.png",
    name: "Vikas",
    role: "Infoedge",
    rating: 5,
    text: "We get the privacy of cabin space with the flexibility of a managed coworking setup. Support from the NeoHub team has been consistent.",
  },
  {
    image: "/assets/testimg4_89125531.png",
    name: "Manwar",
    role: "Tata Play",
    rating: 5,
    text: "From dedicated desks to conference bookings, NeoHub covers everything our team needs without the overhead of a traditional office lease.",
  },
  {
    image: "/assets/testimg3_98d93f4b.png",
    name: "Vikramjeet Singh",
    role: "EKA Mobility",
    rating: 5,
    text: "Scaling our seating across NeoHub locations has been straightforward. The spaces are professional, well-connected, and ready for growth.",
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
    href: "/blog/best-coworking-space-in-gomti-nagar-lucknow",
    image: "/assets/blog1.jpg",
    date: "18",
    month: "Jul",
    title: "Best Coworking Space in Gomti Nagar, Lucknow: What to Check Before You Book",
  },
  {
    href: "/blog/dedicated-desk-vs-private-cabin-lucknow",
    image: "/assets/space-private.jpg",
    date: "15",
    month: "Jul",
    title: "Dedicated Desk vs Private Cabin in Lucknow: Which Workspace Fits Your Team?",
  },
  {
    href: "/blog/coworking-space-pricing-lucknow-2026",
    image: "/assets/space-desk.jpg",
    date: "12",
    month: "Jul",
    title: "Coworking Space Pricing in Lucknow (2026): Workstations, Cabins & Conference Rooms",
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
