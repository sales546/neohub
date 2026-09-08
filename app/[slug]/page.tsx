import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import FaqAccordion from '@/components/FaqAccordion';
import PageBanner from '@/components/PageBanner';
import NeoHubLocations from '@/components/NeoHubLocations';
import { getBuildingSchema, getServiceSchema } from '@/lib/seo/schema';
import { FAQItem, ServicePricingInfo } from '@/types/seo';
import { neoHubAddresses, workspaceGuideLinks } from '@/lib/siteData';
import { isSeoLandingSlug, seoLandings, SEO_LANDING_SLUGS } from '@/lib/content/seoLandings';
import SeoLandingView from '@/components/seo/SeoLandingView';

const CYBER_HEIGHTS_DEST =
  'Levana Cyber Heights, TC-212, Vibhuti Khand, Gomti Nagar, Lucknow';

function directionsEmbed(origin: string) {
  return `https://maps.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(CYBER_HEIGHTS_DEST)}&output=embed`;
}

const relatedWorkspaceLinks = [
  { href: '/private-cabins', label: 'Private cabins' },
  { href: '/dedicated-desk', label: 'Dedicated desks' },
  { href: '/hot-desk', label: 'Hot desks' },
  { href: '/virtual-office', label: 'Virtual office' },
  { href: '/meeting-rooms', label: 'Meeting rooms' },
  { href: '/conference-hall', label: 'Conference halls' },
];

// Slugs data
const localities = ['gomti-nagar', 'vibhuti-khand', 'hazratganj', 'aliganj', 'indira-nagar'] as const;
const localitiesWithLocations = ['gomti-nagar', 'vibhuti-khand'] as const;
const services = ['private-cabins', 'dedicated-desk', 'hot-desk', 'virtual-office', 'meeting-rooms', 'conference-hall'] as const;

type LocalitySlug = typeof localities[number];
type ServiceSlug = typeof services[number];

/**
 * Commute detail for localities NeoHub serves but does not have a building in.
 * Distances and times are planning estimates to Levana Cyber Heights, Vibhuti
 * Khand; metro facts reflect the operational Red Line (CCS Airport–Munshipulia),
 * which has no station in Gomti Nagar, Vibhuti Khand or Aliganj.
 */
interface LocalityCommute {
  distance: string;
  driveOffPeak: string;
  drivePeak: string;
  route: string;
  metro: string;
  bus: string;
  /** Origin for a keyless Google Maps directions link. */
  directionsOrigin: string;
}

// Locality Content Map
const localityData: Record<LocalitySlug, {
  name: string;
  metaTitle: string;
  metaDescription: string;
  slogan: string;
  description: string;
  landmarks: string[];
  mapEmbedUrl: string;
  commute?: LocalityCommute;
  faqs: FAQItem[];
}> = {
  'gomti-nagar': {
    name: 'Gomti Nagar',
    metaTitle: 'Coworking Space in Gomti Nagar Lucknow | Premium Offices',
    metaDescription: 'Looking for a coworking space in Gomti Nagar, Lucknow? Rent flexible workstations, hot desks, and private cabins at Levana Cyber Heights. Near Indira Gandhi Pratishthan.',
    slogan: 'Premium Coworking Spaces in Gomti Nagar\'s Main Business Hub',
    description: 'NeoHub Gomti Nagar offers modern startups, corporate teams, and freelancers a plug-and-play shared office ecosystem. Situated on the 2nd Floor of Levana Cyber Heights in Vibhuti Khand, our space provides prime visibility, walking distance proximity to top cafes and premium hotels, and unmatched business networking opportunities.',
    landmarks: ['Indira Gandhi Pratishthan', 'Levana Cyber Heights', 'Taj Mahal Palace Lucknow', 'One Awadh Center Mall'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d444.89040154230764!2d81.00968106592566!3d26.867826200000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3f2ba4b28db%3A0x5fa240616cd71f28!2sNeohub%20-%20Levana%20-%20Co-Working%20Spaces!5e0!3m2!1sen!2sin!4v1755697550688!5m2!1sen!2sin',
    faqs: [
      {
        question: 'Where is NeoHub located in Gomti Nagar?',
        answer: 'NeoHub operates three centres in Gomti Nagar: Levana Cyber Heights (2nd Floor, TC-212, opposite Indira Gandhi Pratishthan), Bhavya Corporate Tower (4th Floor, Vijaipur Colony), and Experion (6th Floor, 611). All three sit in Vibhuti Khand.'
      },
      {
        question: 'What are NeoHub’s hours in Gomti Nagar?',
        answer: 'Bhavya Corporate Tower is open 24 hours. Cyber Heights reception runs 9:00 AM–5:00 PM. Experion runs 9:00 AM–10:00 PM. Private cabin members can request extended access — confirm hours when you book a tour.'
      },
      {
        question: 'How much does a dedicated desk cost in Gomti Nagar?',
        answer: 'Dedicated workstations start at ₹5,500 per seat per month + GST at Cyber Heights and Bhavya, and ₹6,500 per seat per month + GST at Experion.'
      },
      {
        question: 'Do you have private cabins in Gomti Nagar?',
        answer: 'Yes. Lockable private cabins start at ₹20,000 per cabin per month + GST at Cyber Heights and Bhavya, and ₹25,000 per cabin per month + GST at Experion. Those figures are for the cabin, not per seat — typical layouts hold 4–8 people.'
      },
      {
        question: 'Can I book a meeting room by the hour?',
        answer: 'Yes. Conference rooms start at ₹500/hour at Cyber Heights and Bhavya, and ₹600/hour at Experion. Non-members can book as well as members.'
      },
      {
        question: 'Is parking available at the Gomti Nagar centres?',
        answer: 'Yes. Levana Cyber Heights provides member and visitor parking. Ask on the tour which basement or ground-level bays apply to your centre.'
      },
      {
        question: 'Can a Gomti Nagar startup use NeoHub as a GST address?',
        answer: 'Yes. Virtual office plans from our Gomti Nagar address start at ₹12,000/year for a business address, or ₹18,000/year for the GST-registration kit. A virtual office is not a Google Business Profile — we do not include a GBP listing.'
      }
    ]
  },
  'vibhuti-khand': {
    name: 'Vibhuti Khand',
    metaTitle: 'Shared Office Space in Vibhuti Khand Lucknow | NeoHub',
    metaDescription: 'Premium shared office space in Vibhuti Khand, Lucknow. Lockable private team cabins and dedicated desks with dual-fiber internet backup and corporate reception support.',
    slogan: 'Corporate-Grade Shared Workspaces in Vibhuti Khand',
    description: 'Vibhuti Khand is Lucknow\'s prime commercial IT and financial district. NeoHub\'s facility inside Levana Cyber Heights is engineered for high-performance teams, bringing gigabit fiber connectivity, professional boardrooms, and standard power backup systems to ensure your business remains online 24/7.',
    landmarks: ['Indira Gandhi Pratishthan', 'RML Mehrotra Hospital', 'Cyber Heights Office Tower'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7118.350186674988!2d80.99691699357909!3d26.866177600000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3f5fe2ec023%3A0xa994cce33170b957!2sNEOHUB%20-%20Bhavya%20Tower!5e0!3m2!1sen!2sin!4v1755697317962!5m2!1sen!2sin',
    faqs: [
      {
        question: 'Why choose a coworking space in Vibhuti Khand?',
        answer: 'Vibhuti Khand is Lucknow’s commercial IT and finance corridor. A NeoHub address here puts you next to Indira Gandhi Pratishthan, Grade-A towers, and client-ready meeting inventory without a three-year lease.'
      },
      {
        question: 'Which NeoHub buildings are in Vibhuti Khand?',
        answer: 'All three: Levana Cyber Heights (130+ seats), Bhavya Corporate Tower (500 seats, 24 hours), and Experion (300+ seats). Combined inventory is 900+ seats in the same district.'
      },
      {
        question: 'Is there 24-hour coworking in Vibhuti Khand?',
        answer: 'Yes. Bhavya Corporate Tower is open 24 hours. Cyber Heights and Experion follow daytime hours (9 AM–5 PM and 9 AM–10 PM). Confirm access cards on the tour if your team works late.'
      },
      {
        question: 'What does a private cabin cost in Vibhuti Khand?',
        answer: 'Cabins start at ₹20,000 per cabin per month + GST at Cyber Heights and Bhavya, and ₹25,000 per cabin per month + GST at Experion. That is the cabin package, typically 4–8 seats — not a per-seat rate.'
      },
      {
        question: 'How do I reach NeoHub from other parts of Lucknow?',
        answer: 'Indira Nagar is 10–20 minutes off-peak. Hazratganj is 15–25 minutes. Aliganj is 25–35 minutes. See our locality pages for driving, metro and bus notes.'
      },
      {
        question: 'Can I tour more than one Vibhuti Khand centre in one visit?',
        answer: 'Yes. Tell us your headcount on WhatsApp and we will sequence Cyber Heights, Bhavya and Experion so you compare floor plates in a single afternoon.'
      }
    ]
  },
  'hazratganj': {
    name: 'Hazratganj',
    metaTitle: 'Coworking Office Space Hazratganj Lucknow | Flexible Desks',
    metaDescription: 'Find flexible coworking office spaces near Hazratganj, Lucknow. NeoHub’s Gomti Nagar centres offer premium shared cabins and hot desks with easy commuting links from Hazratganj.',
    slogan: 'Served from NeoHub Gomti Nagar — easy access from Hazratganj',
    description: 'NeoHub does not operate a separate Hazratganj building. Teams from Hazratganj are served from our Gomti Nagar centres (Cyber Heights, Bhavya, Experion) with flexible desks, private cabins, and meeting rooms — a short commute from Lucknow’s heritage commercial core.',
    landmarks: ['Hazratganj Metro Station', 'Sahara Ganj Mall', 'Lucknow GPO', 'General Post Office'],
    mapEmbedUrl: directionsEmbed('Hazratganj, Lucknow, Uttar Pradesh'),
    commute: {
      distance: 'About 8–9 km by road',
      driveOffPeak: '15–25 minutes',
      drivePeak: '30–45 minutes',
      route: 'Mahatma Gandhi Marg to Rana Pratap Marg, then 1090 Chauraha and Lohia Path into Vibhuti Khand. From the northern side of Hazratganj, Ashok Marg via Sikandar Bagh and Nishatganj is the usual alternative.',
      metro: 'Hazratganj has its own station on the Lucknow Metro Red Line. Ride towards Munshipulia and get off at Indira Nagar, then take an auto or e-rickshaw for the last 2.5–3 km — there is no metro station in Gomti Nagar or Vibhuti Khand.',
      bus: 'City bus route PMI-07(A) runs the 1090 – Lohia Hospital – Indira Gandhi Pratishthan corridor. The Indira Gandhi Pratishthan stop is a 1–4 minute walk from our building.',
      directionsOrigin: 'Hazratganj, Lucknow, Uttar Pradesh'
    },
    faqs: [
      {
        question: 'Does NeoHub have an office inside Hazratganj?',
        answer: 'No. NeoHub does not operate a building in Hazratganj. Our three centres are all in Gomti Nagar — Levana Cyber Heights and Bhavya Corporate Tower in Vibhuti Khand, plus Experion — roughly 8–9 km from Hazratganj. Hazratganj-based teams book desks, cabins and meeting rooms at those centres, or use us purely as a registered business address.'
      },
      {
        question: 'How long does it take to get from Hazratganj to NeoHub?',
        answer: 'Allow 15–25 minutes by car outside peak hours, and 30–45 minutes during the weekday morning and evening rush. The Indira Gandhi Pratishthan crossing and the Vibhuti Khand service lanes are known office-hour bottlenecks, and delays are longer on event days at Indira Gandhi Pratishthan.'
      },
      {
        question: 'What is the best route from Hazratganj to NeoHub?',
        answer: 'Most members take Mahatma Gandhi Marg onto Rana Pratap Marg, then run through 1090 Chauraha and along Lohia Path into Vibhuti Khand. If you are starting from the northern end of Hazratganj, Ashok Marg via Sikandar Bagh and Nishatganj is usually the better option.'
      },
      {
        question: 'Can I reach NeoHub by metro from Hazratganj?',
        answer: 'Partly. Hazratganj is on the operational Red Line, so you can ride towards Munshipulia and alight at Indira Nagar. Gomti Nagar and Vibhuti Khand have no metro station, so the final 2.5–3 km from Indira Nagar station needs an auto or e-rickshaw — usually 10–15 minutes.'
      },
      {
        question: 'Is there a bus from Hazratganj to NeoHub?',
        answer: 'Yes. City bus route PMI-07(A) covers the 1090 – Lohia Hospital – Indira Gandhi Pratishthan corridor, and the Indira Gandhi Pratishthan stop is a 1–4 minute walk from Levana Cyber Heights. You will usually need an auto or e-rickshaw between interior Hazratganj and the bus corridor.'
      },
      {
        question: 'Can I register my Hazratganj business at a NeoHub address?',
        answer: 'Yes. Our virtual office plans run from our Gomti Nagar address: ₹12,000 per year for a business address, or ₹18,000 per year for the plan that supports GST registration. Both are billed annually plus GST.'
      }
    ]
  },
  'aliganj': {
    name: 'Aliganj',
    metaTitle: 'Shared Coworking Space Aliganj Lucknow | Virtual Office',
    metaDescription: 'Coworking near Aliganj, Lucknow — NeoHub serves Aliganj teams from Gomti Nagar with meeting rooms, dedicated desks, and private cabins.',
    slogan: 'Served from NeoHub Gomti Nagar — convenient for Aliganj teams',
    description: 'NeoHub’s physical hubs are in Gomti Nagar. Startups and SMEs from Aliganj use our Cyber Heights, Bhavya, and Experion centres for Grade-A desks, cabins, and meeting rooms — without long leases or utility overheads.',
    landmarks: ['Aliganj Post Office', 'Kapoorthala Commercial Complex', 'Chandra Shekhar Azad Park'],
    mapEmbedUrl: directionsEmbed('Aliganj, Lucknow, Uttar Pradesh'),
    commute: {
      distance: 'About 10–12 km by road',
      driveOffPeak: '25–35 minutes',
      drivePeak: '40–60 minutes',
      route: 'Out of Kapoorthala or Kursi Road, across to Badshah Nagar and Indira Nagar, then along Faizabad (Ayodhya) Road through Polytechnic Chauraha into Vibhuti Khand. The first leg changes noticeably depending on whether you start from Kapoorthala, Sector B or the Engineering College side.',
      metro: 'Aliganj has no metro station. The nearest usable Red Line stations — IT Chauraha, Badshah Nagar, Indira Nagar and Munshipulia — all need a road trip first, so most Aliganj members find driving the whole way quicker.',
      bus: 'Buses and shared autos run from Aliganj towards Kapoorthala, IT Chauraha, Badshah Nagar and Indira Nagar. The practical pattern is a bus or auto to Indira Nagar or Polytechnic, then a short auto ride to Indira Gandhi Pratishthan.',
      directionsOrigin: 'Aliganj, Lucknow, Uttar Pradesh'
    },
    faqs: [
      {
        question: 'Does NeoHub have a centre in Aliganj?',
        answer: 'No. All three NeoHub centres are in Gomti Nagar — Levana Cyber Heights and Bhavya Corporate Tower in Vibhuti Khand, plus Experion. Aliganj is roughly 10–12 km away, and Aliganj teams either commute in for desks and cabins or use us as a registered business address only.'
      },
      {
        question: 'How far is NeoHub from Aliganj?',
        answer: 'About 10–12 km by road, depending on whether you start from Kapoorthala, Sector B or the Engineering College side. Budget 25–35 minutes outside peak hours and 40–60 minutes during the weekday rush.'
      },
      {
        question: 'What is the best route from Aliganj to Gomti Nagar?',
        answer: 'Head out via Kapoorthala or Kursi Road, cross to Badshah Nagar and Indira Nagar, then take Faizabad (Ayodhya) Road through Polytechnic Chauraha into Vibhuti Khand. Kisan Path is an outer bypass rather than a shortcut — it is only worth using during unusual congestion or diversions.'
      },
      {
        question: 'Is there a metro station in Aliganj?',
        answer: 'No. The operational Lucknow Metro Red Line runs from CCS Airport to Munshipulia and has no Aliganj station. The closest options are IT Chauraha, Badshah Nagar, Indira Nagar and Munshipulia, each requiring a road journey first. Since Gomti Nagar has no metro station either, driving is normally the simpler choice from Aliganj.'
      },
      {
        question: 'Can I get to NeoHub from Aliganj by bus?',
        answer: 'There is no reliable single-seat bus from every part of Aliganj. In practice members take a bus or shared auto to Indira Nagar or Polytechnic on Faizabad Road, then a short auto or e-rickshaw ride to the Indira Gandhi Pratishthan stop, which is a 1–4 minute walk from our building.'
      },
      {
        question: 'Do you offer virtual office registration for Aliganj businesses?',
        answer: 'Yes. We provide a business address from our Gomti Nagar centre at ₹12,000 per year, or ₹18,000 per year for the plan that supports GST registration. Both are annual and exclude GST.'
      }
    ]
  },
  'indira-nagar': {
    name: 'Indira Nagar',
    metaTitle: 'Coworking Desk Spaces Indira Nagar Lucknow | NeoHub',
    metaDescription: 'Coworking near Indira Nagar, Lucknow — NeoHub serves Indira Nagar professionals from Gomti Nagar with desks, cabins, and conference rooms.',
    slogan: 'Served from NeoHub Gomti Nagar — short commute from Indira Nagar',
    description: 'NeoHub’s centres are in Gomti Nagar (Cyber Heights, Bhavya, Experion). Professionals from Indira Nagar use our desks, cabins, and meeting rooms with a short commute — high-speed internet and professional facilities without managing a private lease.',
    landmarks: ['Indira Nagar Metro Station', 'Bhootnath Market', 'Shalimar Metropolis Mall'],
    mapEmbedUrl: directionsEmbed('Indira Nagar, Lucknow, Uttar Pradesh'),
    commute: {
      distance: 'About 3–5 km by road',
      driveOffPeak: '10–20 minutes',
      drivePeak: '20–35 minutes',
      route: 'Indira Nagar Main Road or the Bhootnath side onto Faizabad (Ayodhya) Road, through Polytechnic Chauraha and into Vibhuti Khand. From the eastern sectors, going via Munshipulia and the Ring Road onto Faizabad Road is often quicker.',
      metro: 'Indira Nagar has its own Red Line station, one stop before Munshipulia. Gomti Nagar has no metro station, so the final 2.5–3 km is a 10–15 minute auto or e-rickshaw ride — which makes Indira Nagar station the closest practical metro stop to our building.',
      bus: 'City bus route 16 runs the Indira Nagar and Faizabad Road corridor through Polytechnic in Vibhuti Khand, and route 103 also stops at Polytechnic. From there it is a short auto ride, or stay on to the Indira Gandhi Pratishthan stop.',
      directionsOrigin: 'Indira Nagar, Lucknow, Uttar Pradesh'
    },
    faqs: [
      {
        question: 'Is NeoHub located in Indira Nagar?',
        answer: 'No, but it is the closest of the localities we serve. NeoHub operates from Gomti Nagar — Levana Cyber Heights and Bhavya Corporate Tower in Vibhuti Khand, plus Experion — roughly 3–5 km from Indira Nagar depending on your sector.'
      },
      {
        question: 'How long is the commute from Indira Nagar to NeoHub?',
        answer: 'Usually 10–20 minutes by car outside peak hours, and 20–35 minutes during the weekday rush. It is the shortest commute of any locality we serve outside Gomti Nagar itself.'
      },
      {
        question: 'Which metro station is closest to NeoHub?',
        answer: 'Indira Nagar station on the Red Line is the closest practical metro stop to Levana Cyber Heights, at roughly 2.5–3 km. Neither Gomti Nagar nor Vibhuti Khand has a metro station, so plan on an auto or e-rickshaw for the last leg. Note that Gomti Nagar railway station is a mainline station, not a metro stop.'
      },
      {
        question: 'Can I take a bus from Indira Nagar to NeoHub?',
        answer: 'Yes. City bus route 16 covers the Indira Nagar and Faizabad Road corridor and stops at Polytechnic in Vibhuti Khand; route 103 also serves Polytechnic. The Indira Gandhi Pratishthan stop is a 1–4 minute walk from our building.'
      },
      {
        question: 'What is the best driving route from Indira Nagar?',
        answer: 'Take Indira Nagar Main Road or the Bhootnath side onto Faizabad (Ayodhya) Road, then continue through Polytechnic Chauraha into Vibhuti Khand. If you are in the eastern sectors, Munshipulia and the Ring Road onto Faizabad Road is often faster.'
      },
      {
        question: 'Is parking available for members commuting from Indira Nagar?',
        answer: 'Yes. Levana Cyber Heights provides parking for office members and guests, so driving in from Indira Nagar and the surrounding sectors is straightforward.'
      }
    ]
  }
};

// Service Content Map
const serviceData: Record<ServiceSlug, {
  name: string;
  metaTitle: string;
  metaDescription: string;
  pricingDescription: string;
  features: string[];
  pricing: ServicePricingInfo[];
  faqs: FAQItem[];
}> = {
  'private-cabins': {
    name: 'Premium Private Cabins',
    metaTitle: 'Private Cabin Office Spaces Lucknow | NeoHub Gomti Nagar',
    metaDescription: 'Rent lockable private cabins for teams in Gomti Nagar, Lucknow. Soundproof office cabins, high-speed fiber backup, biometric locks, and meeting room credits.',
    pricingDescription: 'Secure, sound-insulated private cabins designed for startups and corporate branches requiring high data privacy and dedicated assets.',
    features: ['Biometric Access Control', 'Dedicated High-Speed Bandwidth', 'Free Printing Credits', 'Access to Reception Support', 'Unlimited Tea & Coffee'],
    pricing: [
      { name: 'Private Cabin — Cyber Heights / Bhavya', price: '20000', currency: 'INR', unit: 'Month + GST', unitCode: 'MON', note: 'Per cabin (typically 4–8 seats), not per seat' },
      { name: 'Private Cabin — Experion', price: '25000', currency: 'INR', unit: 'Month + GST', unitCode: 'MON', note: 'Per cabin (typically 4–8 seats), not per seat' }
    ],
    faqs: [
      {
        question: 'Are the private cabins lockable?',
        answer: 'Yes. Every cabin is lockable with biometric access or unique keys. Only authorised members of that cabin can enter.'
      },
      {
        question: 'Is ₹20,000 per seat or per cabin?',
        answer: 'Per cabin, per month + GST. Typical layouts hold 4–8 people. A per-seat quote for a larger team is calculated on the tour from the actual floor plan.'
      },
      {
        question: 'What team sizes do cabins support?',
        answer: 'Standard cabins start around 4 seats. Enterprise suites at Cyber Heights and Bhavya can be configured for 5–50+ with custom networking if you need a larger contiguous room.'
      },
      {
        question: 'Which centres offer private cabins?',
        answer: 'All three Gomti Nagar centres — Cyber Heights, Bhavya Corporate Tower, and Experion. Bhavya is the 500-seat centre if you need room to grow without changing buildings.'
      },
      {
        question: 'Is there a lock-in period?',
        answer: 'Cabin memberships are month-to-month unless you ask for a longer hold to lock a specific layout. Confirm the current notice period on the proposal.'
      },
      {
        question: 'Are meeting rooms included with a cabin?',
        answer: 'Members get access to book conference inventory. Hourly rates start at ₹500 at Cyber Heights and Bhavya, and ₹600 at Experion. Larger workshops use the conference hall packages.'
      }
    ]
  },
  'dedicated-desk': {
    name: 'Dedicated Desks',
    metaTitle: 'Dedicated Desks in Gomti Nagar, Lucknow | NeoHub',
    metaDescription: 'Book dedicated coworking desks in Gomti Nagar, Lucknow. Get your own fixed workspace, ergonomic seating, secure lockers, and gigabit fiber backup.',
    pricingDescription: 'Your own fixed desk in a vibrant shared space. Ideal for freelancers, remote developers, and growing startup teams.',
    features: ['Personal Assigned Desk', 'Ergonomic Office Chair', 'Secure Storage Lockers', 'High-Speed Dual Fiber Internet', 'Daily Housekeeping Services'],
    pricing: [
      { name: 'Workstation — Cyber Heights / Bhavya', price: '5500', currency: 'INR', unit: 'Month + GST', unitCode: 'MON', note: 'Per reserved seat / month' },
      { name: 'Workstation — Experion', price: '6500', currency: 'INR', unit: 'Month + GST', unitCode: 'MON', note: 'Per reserved seat / month' }
    ],
    faqs: [
      {
        question: 'Do I get a locker with my dedicated desk?',
        answer: 'Yes. Every monthly dedicated desk membership includes a personal locker at no extra charge.'
      },
      {
        question: 'Is the ₹5,500 rate per seat?',
        answer: 'Yes. Dedicated desks are billed per reserved seat per month + GST: ₹5,500 at Cyber Heights and Bhavya, ₹6,500 at Experion.'
      },
      {
        question: 'Can I keep the same desk every day?',
        answer: 'Yes. A dedicated desk is yours — it is not hot-desked overnight. That is the difference from the ₹350/day hot-desk pass.'
      },
      {
        question: 'Can a small team sit together?',
        answer: 'Yes. We cluster neighbouring dedicated desks for 2–4 person pods. If you need acoustic privacy every day, a private cabin is the better next step.'
      },
      {
        question: 'What is included besides the desk?',
        answer: 'Ergonomic chair, dual-fiber internet, housekeeping, pantry tea/coffee, reception support, and the ability to book meeting rooms by the hour.'
      },
      {
        question: 'How fast can I start?',
        answer: 'Most dedicated desks can be assigned within a few days of a confirmed tour, subject to current inventory at that centre.'
      }
    ]
  },
  'hot-desk': {
    name: 'Flexible Hot Desks',
    metaTitle: 'Hot Desking Lucknow | Flexible Shared Workstations',
    metaDescription: 'Affordable hot desking plans at NeoHub Lucknow. Rent flexible shared workstations in Gomti Nagar with fast Wi-Fi and unlimited tea/coffee.',
    pricingDescription: 'Plug-and-play flex desks in our premium open lounge area. Choose any available desk and start working instantly.',
    features: ['Flexible Seating Arrangement', 'Gigabit Wi-Fi Connectivity', 'Access to Shared Amenities', 'Complimentary Beverages', 'Networking Events Access'],
    pricing: [
      { name: 'Daily Hot Desk Pass', price: '350', currency: 'INR', unit: 'Day', unitCode: 'DAY' },
      { name: 'Monthly Hot Desk Membership', price: '3500', currency: 'INR', unit: 'Month', unitCode: 'MON' }
    ],
    faqs: [
      {
        question: 'Can I book a hot desk daily?',
        answer: 'Yes. Daily visitor passes start at ₹350 per day, with full Wi-Fi and pantry access for that day.'
      },
      {
        question: 'What is the monthly hot-desk rate?',
        answer: '₹3,500 per month for a flexible seat in the open lounge. You pick any available desk rather than a reserved workstation.'
      },
      {
        question: 'When should I upgrade to a dedicated desk?',
        answer: 'If you are in more than 12–15 days a month, the ₹5,500 dedicated desk is usually cheaper and keeps your storage in one place.'
      },
      {
        question: 'Do I need to book in advance?',
        answer: 'Walk-ins are possible on quiet days. For Monday mornings or month-end, message us on WhatsApp so we hold a seat.'
      },
      {
        question: 'Which centre should I use for a day pass?',
        answer: 'Cyber Heights is the usual first stop. If that floor is full we will point you to Bhavya or Experion in the same corridor.'
      },
      {
        question: 'Is printing included on a day pass?',
        answer: 'Light printing is available at reception. Heavy print jobs should be flagged when you book so we can confirm credits.'
      }
    ]
  },
  'virtual-office': {
    name: 'Virtual Offices',
    metaTitle: 'Virtual Office Lucknow | GST Registration Address',
    metaDescription: 'Get a premium business address in Gomti Nagar, Lucknow for GST registration and company registration. Professional mail handling and call forwarding.',
    pricingDescription: 'Establish a corporate presence with a premium address at Levana Cyber Heights, complete with mail forwarding and GST registration compliance.',
    features: ['Premium Business Address', 'GST Registration Support', 'Company Registry Support', 'Professional Mail Handling', 'Meeting Room Access Credits'],
    pricing: [
      { name: 'Annual GST Registration Plan', price: '18000', currency: 'INR', unit: 'Year', unitCode: 'ANN' },
      { name: 'Business Address Only', price: '12000', currency: 'INR', unit: 'Year', unitCode: 'ANN' }
    ],
    faqs: [
      {
        question: 'What documents are provided for GST registration?',
        answer: 'The GST plan includes a documentation kit: landlord NOC, utility bill, rent agreement, and ownership papers your CA typically needs to file a GST address.'
      },
      {
        question: 'What is the difference between ₹12,000 and ₹18,000?',
        answer: '₹12,000/year is a business address with mail handling. ₹18,000/year is the GST-registration kit. Both are billed annually plus GST.'
      },
      {
        question: 'Does a virtual office include a Google Business Profile?',
        answer: 'No. Google requires a staffed location with your own signage. A mailing address alone is not eligible for a GBP. We do not sell or include Google listings with virtual office plans.'
      },
      {
        question: 'Can I use the address for company incorporation?',
        answer: 'Yes. The business-address plan supports company registry filings. Share the exact document list your ROC consultant needs before we issue papers.'
      },
      {
        question: 'Do I get meeting room credits?',
        answer: 'Virtual office plans include limited meeting-room access so you can take client meetings in Gomti Nagar without maintaining a full desk. Confirm the current credit on the proposal.'
      },
      {
        question: 'Where is the registered address?',
        answer: 'Levana Cyber Heights, TC-212, 2nd Floor, Vibhuti Khand, Gomti Nagar, Lucknow 226010. Mail is handled at that centre.'
      },
      {
        question: 'How long does onboarding take?',
        answer: 'Most address kits are issued within a few working days after KYC. GST filing timelines then depend on your CA, not on NeoHub.'
      }
    ]
  },
  'meeting-rooms': {
    name: 'High-Tech Meeting Rooms',
    metaTitle: 'Meeting Room Rent Lucknow | Conference Rooms Gomti Nagar',
    metaDescription: 'Book high-tech meeting rooms and presentation spaces in Gomti Nagar, Lucknow. LED screens, video conferencing, whiteboard, and beverage support.',
    pricingDescription: 'Professional meeting rooms to host clients, conduct interviews, or collaborate with team members, equipped with presentation displays.',
    features: ['High-Definition Smart Screens', 'Video Conferencing Gear', 'Whiteboards and Markers', 'Complimentary Water & Beverages', 'High-Speed Wi-Fi'],
    pricing: [
      { name: 'Conference Booking — Cyber Heights / Bhavya', price: '500', currency: 'INR', unit: 'Hour', unitCode: 'HUR' },
      { name: 'Conference Booking — Experion', price: '600', currency: 'INR', unit: 'Hour', unitCode: 'HUR' }
    ],
    faqs: [
      {
        question: 'Can I book a meeting room for just one hour?',
        answer: 'Yes. Bookings start at one hour. ₹500/hour at Cyber Heights and Bhavya, ₹600/hour at Experion.'
      },
      {
        question: 'What capacity do the rooms hold?',
        answer: 'Compact meeting cabins seat 4–8. Larger conference layouts seat 8–20. Tell us headcount when you book so we assign the right room.'
      },
      {
        question: 'What AV is included?',
        answer: 'HD displays or projector, video-conferencing setup, whiteboard, and Wi-Fi. Arrive 10 minutes early to test screen mirroring.'
      },
      {
        question: 'Can non-members book?',
        answer: 'Yes. External teams book hourly rooms for client visits in Gomti Nagar even if their registered office is elsewhere.'
      },
      {
        question: 'Is there a full-day option?',
        answer: 'Yes. For workshops use a half-day or full-day conference hall package rather than stacking hourly slots — from ₹7,500 for four hours.'
      },
      {
        question: 'Can I book the same day?',
        answer: 'Sometimes, if the calendar is open. For investor or client meetings, reserve at least 24 hours ahead.'
      }
    ]
  },
  'conference-hall': {
    name: 'Corporate Conference Halls',
    metaTitle: 'Conference Hall for Rent Lucknow | Corporate Events Space',
    metaDescription: 'Host corporate workshops and events in Lucknow. Rent a corporate conference hall in Gomti Nagar with projector screens and sound systems.',
    pricingDescription: 'Large conference halls designed for corporate workshops, team gatherings, seminars, and product launches with complete technical layouts.',
    features: ['Projector Screens & Audio Systems', 'Adjustable Lighting Controls', 'Dedicated Event Coordinator', 'Catering Coordination Services', 'Separate Guest Lobby'],
    pricing: [
      { name: 'Half-Day Conference Hall Rent', price: '7500', currency: 'INR', unit: '4 Hours', unitCode: 'HUR', unitQuantity: 4 },
      { name: 'Full-Day Conference Hall Rent', price: '12000', currency: 'INR', unit: '8 Hours', unitCode: 'HUR', unitQuantity: 8 }
    ],
    faqs: [
      {
        question: 'Is catering available for corporate events?',
        answer: 'Yes. We coordinate coffee breaks and buffet lunches through partner vendors. Share dietary notes when you book.'
      },
      {
        question: 'What does the hall cost?',
        answer: '₹7,500 for a 4-hour half-day, or ₹12,000 for an 8-hour full day. AV and an event coordinator are included; catering is extra.'
      },
      {
        question: 'How many people can it hold?',
        answer: 'Layouts vary by centre. Tell us seated vs standing headcount and we will confirm the right floor before you send invites.'
      },
      {
        question: 'Is there a guest lobby?',
        answer: 'Yes. Guests check in at reception rather than walking onto the coworking floor.'
      },
      {
        question: 'Can startups use it for a product launch?',
        answer: 'Yes. Projector, audio, and lighting controls are part of the hall package. We can sequence a cabin hold the same week if you need a private prep room.'
      },
      {
        question: 'How far in advance should I book?',
        answer: 'A week is comfortable. Month-end and festival weeks fill faster — message us as soon as the date is firm.'
      }
    ]
  }
};

// SSG slugs compiler
export async function generateStaticParams() {
  const allSlugs = [
    ...localities.map(slug => ({ slug })),
    ...services.map(slug => ({ slug })),
    ...SEO_LANDING_SLUGS.map(slug => ({ slug })),
  ];
  return allSlugs;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  if (localities.includes(slug as LocalitySlug)) {
    const data = localityData[slug as LocalitySlug];
    return constructMetadata({
      title: data.metaTitle,
      description: data.metaDescription,
      canonical: `/${slug}`,
      absoluteTitle: true,
      ogSubtitle: data.slogan,
      keywords: [`coworking in ${data.name}`, `office space in ${data.name}`, `best desk ${data.name}`],
    });
  }

  if (services.includes(slug as ServiceSlug)) {
    const data = serviceData[slug as ServiceSlug];
    return constructMetadata({
      title: data.metaTitle,
      description: data.metaDescription,
      canonical: `/${slug}`,
      absoluteTitle: true,
      ogSubtitle: `${data.name} at NeoHub · Gomti Nagar, Lucknow`,
      keywords: [data.name, `${data.name} lucknow`, `${data.name} gomti nagar`],
    });
  }

  if (isSeoLandingSlug(slug)) {
    const data = seoLandings[slug];
    return constructMetadata({
      title: data.metaTitle,
      description: data.metaDescription,
      canonical: `/${slug}`,
      absoluteTitle: true,
      ogSubtitle: data.slogan,
      keywords: data.keywords,
    });
  }

  return constructMetadata({
    title: "Page not found",
    description: "The page you requested is not available on NeoHub.",
    canonical: `/${slug}`,
    noIndex: true,
  });
}

// Unified Render Component
export default async function ProgrammaticPage({ params }: PageProps) {
  const { slug } = await params;

  const isLocality = localities.includes(slug as LocalitySlug);
  const isService = services.includes(slug as ServiceSlug);
  const isLanding = isSeoLandingSlug(slug);

  if (!isLocality && !isService && !isLanding) {
    notFound();
  }

  if (isLanding) {
    const landing = seoLandings[slug];
    const centre = landing.centreId
      ? neoHubAddresses.find((c) => c.id === landing.centreId)
      : undefined;
    return (
      <SeoLandingView
        landing={landing}
        extraSchema={centre ? getBuildingSchema(centre) : undefined}
      />
    );
  }

  // 1. Render Locality Landing Page
  if (isLocality) {
    const data = localityData[slug as LocalitySlug];
    const breadcrumbItems = [
      { name: 'Home', item: '/' },
      { name: 'Localities', item: '/spaces' },
      { name: data.name, item: `/${slug}` }
    ];

    return (
      <>
        <PageBanner title={`Coworking in ${data.name}`} breadcrumbLabel={data.name} />
        <BreadcrumbSchema items={breadcrumbItems} />
        <FAQSchema items={data.faqs} />

        <div className="seo-page">
          <div className="container">
            <div className="seo-page-inner">
              <div className="seo-hero">
                <span className="seo-eyebrow">NeoHub Lucknow</span>
                <h2 className="seo-title">{data.slogan}</h2>
                <p className="seo-lead">{data.description}</p>
              </div>

              <div className="seo-card">
                <h2 className="seo-card-title">Strategic Proximity &amp; Near Landmarks</h2>
                <div className="seo-landmarks-grid">
                  {data.landmarks.map((landmark, i) => (
                    <div key={i} className="seo-landmark-item">{landmark}</div>
                  ))}
                </div>
              </div>

              {data.commute ? (
                <>
                  <div className="seo-card">
                    <h2 className="seo-card-title">Commute from {data.name} to NeoHub Gomti Nagar</h2>
                    <p className="seo-lead" style={{ textAlign: 'left', margin: '0 0 20px' }}>
                      NeoHub does not have a building in {data.name}. The map below is a driving route to Levana Cyber Heights in Vibhuti Khand — not a centre inside {data.name}.
                    </p>
                    <dl className="seo-commute-grid">
                      <div className="seo-commute-item">
                        <dt>Distance</dt>
                        <dd>{data.commute.distance}</dd>
                      </div>
                      <div className="seo-commute-item">
                        <dt>Drive (off-peak / peak)</dt>
                        <dd>{data.commute.driveOffPeak} / {data.commute.drivePeak}</dd>
                      </div>
                      <div className="seo-commute-item">
                        <dt>Typical driving route</dt>
                        <dd>{data.commute.route}</dd>
                      </div>
                      <div className="seo-commute-item">
                        <dt>Metro</dt>
                        <dd>{data.commute.metro}</dd>
                      </div>
                      <div className="seo-commute-item">
                        <dt>Bus</dt>
                        <dd>{data.commute.bus}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="seo-section">
                    <h2 className="seo-card-title">Driving directions from {data.name}</h2>
                    <div className="seo-map-wrap">
                      <iframe
                        src={data.mapEmbedUrl}
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Driving directions from ${data.name} to NeoHub Gomti Nagar`}
                      ></iframe>
                    </div>
                  </div>
                </>
              ) : localitiesWithLocations.includes(slug as typeof localitiesWithLocations[number]) ? (
                <div className="seo-card">
                  <NeoHubLocations showMaps title={`NeoHub Centres in ${data.name}`} />
                </div>
              ) : null}

              <div className="seo-card">
                <h2 className="seo-card-title">Workspaces you can book</h2>
                <ul className="seo-related-list">
                  {relatedWorkspaceLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                  {workspaceGuideLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="seo-card">
                <h2 className="seo-card-title">Frequently Asked Questions</h2>
                <FaqAccordion items={data.faqs} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 2. Render Service Landing Page
  if (isService) {
    const data = serviceData[slug as ServiceSlug];
    const serviceSchema = getServiceSchema(data.name, data.pricingDescription, data.pricing);
    const breadcrumbItems = [
      { name: 'Home', item: '/' },
      { name: 'Spaces', item: '/spaces' },
      { name: data.name, item: `/${slug}` }
    ];

    return (
      <>
        <PageBanner title={data.name} breadcrumbLabel={data.name} />
        <JsonLd data={serviceSchema} />
        <BreadcrumbSchema items={breadcrumbItems} />
        <FAQSchema items={data.faqs} />

        <div className="seo-page">
          <div className="container">
            <div className="seo-page-inner">
              <div className="seo-hero">
                <span className="seo-eyebrow">Office Solutions</span>
                <h2 className="seo-title">{data.name} in Gomti Nagar</h2>
                <p className="seo-lead">{data.pricingDescription}</p>
              </div>

              <div className="seo-pricing-grid">
                {data.pricing.map((priceItem, i) => (
                  <div key={i} className="seo-price-card">
                    <span className="seo-price-badge">Lucknow Rate</span>
                    <h3 className="seo-price-name">{priceItem.name}</h3>
                    <p className="seo-price-amount">₹{parseInt(priceItem.price).toLocaleString()}</p>
                    <p className="seo-price-unit">per {priceItem.unit}</p>
                    {priceItem.note ? <p className="seo-price-note">{priceItem.note}</p> : null}
                    <a
                      href={`https://wa.me/917000481286?text=Hi%20NeoHub%20I%20am%20interested%20in%20${encodeURIComponent(priceItem.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="seo-cta-btn"
                    >
                      Book Instant Tour
                    </a>
                  </div>
                ))}
              </div>

              <div className="seo-card">
                <h2 className="seo-card-title">What is Included in Your Membership</h2>
                <div className="seo-features-grid">
                  {data.features.map((feature, i) => (
                    <div key={i} className="seo-feature-item">
                      <span className="seo-feature-check" aria-hidden="true">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {slug === 'virtual-office' ? (
                <div className="seo-card">
                  <h2 className="seo-card-title">GST registration vs company address</h2>
                  <div className="seo-intent-grid">
                    <div className="seo-intent-card">
                      <h3>GST registration kit — ₹18,000/year</h3>
                      <p>
                        Use this when you need a Gomti Nagar address to file GST. The kit covers the landlord NOC,
                        utility bill, rent agreement and ownership papers your CA typically asks for.
                      </p>
                      <p>
                        <Link href="/gst-registration-lucknow">GST registration virtual office →</Link>
                      </p>
                    </div>
                    <div className="seo-intent-card">
                      <h3>Business address only — ₹12,000/year</h3>
                      <p>
                        Use this for company incorporation, mail handling and a professional letterhead address
                        without the GST document pack. Meeting-room credits are available on both plans.
                      </p>
                      <p>
                        <Link href="/company-registration-lucknow">Company registration address →</Link>
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="seo-card">
                <h2 className="seo-card-title">Related workspaces</h2>
                <ul className="seo-related-list">
                  {relatedWorkspaceLinks
                    .filter((link) => link.href !== `/${slug}`)
                    .map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  <li>
                    <Link href="/gomti-nagar">Coworking in Gomti Nagar</Link>
                  </li>
                  <li>
                    <Link href="/blog/coworking-space-pricing-lucknow-2026">
                      Coworking pricing in Lucknow (2026)
                    </Link>
                  </li>
                  {(slug === "meeting-rooms" || slug === "conference-hall") ? (
                    <li>
                      <Link href="/blog/meeting-rooms-conference-booking-gomti-nagar">
                        Meeting room booking in Gomti Nagar
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>

              <div className="seo-card">
                <h2 className="seo-card-title">Frequently Asked Questions</h2>
                <FaqAccordion items={data.faqs} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
