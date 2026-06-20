import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { getServiceSchema } from '@/lib/seo/schema';
import { FAQItem, ServicePricingInfo } from '@/types/seo';

// Slugs data
const localities = ['gomti-nagar', 'vibhuti-khand', 'hazratganj', 'aliganj', 'indira-nagar'] as const;
const services = ['private-cabins', 'dedicated-desk', 'hot-desk', 'virtual-office', 'meeting-rooms', 'conference-hall'] as const;

type LocalitySlug = typeof localities[number];
type ServiceSlug = typeof services[number];

// Locality Content Map
const localityData: Record<LocalitySlug, {
  name: string;
  metaTitle: string;
  metaDescription: string;
  slogan: string;
  description: string;
  landmarks: string[];
  mapEmbedUrl: string;
  faqs: FAQItem[];
}> = {
  'gomti-nagar': {
    name: 'Gomti Nagar',
    metaTitle: 'Coworking Space in Gomti Nagar Lucknow | Premium Offices',
    metaDescription: 'Looking for a coworking space in Gomti Nagar, Lucknow? Rent flexible workstations, hot desks, and private cabins at Levana Cyber Heights. Near Indira Gandhi Pratishthan.',
    slogan: 'Premium Coworking Spaces in Gomti Nagar\'s Main Business Hub',
    description: 'NeoHub Gomti Nagar offers modern startups, corporate teams, and freelancers a plug-and-play shared office ecosystem. Situated on the 2nd Floor of Levana Cyber Heights in Vibhuti Khand, our space provides prime visibility, walking distance proximity to top cafes and premium hotels, and unmatched business networking opportunities.',
    landmarks: ['Indira Gandhi Pratishthan', 'Levana Cyber Heights', 'Taj Mahal Palace Lucknow', 'One Awadh Center Mall'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.026770932204!2d81.000788!3d26.863868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be296aaaaaaab%3A0x6b402ef465baee0f!2sLevana%20Cyber%20Heights!5e0!3m2!1sen!2sin!4v1716949392211!5m2!1sen!2sin',
    faqs: [
      {
        question: 'Where is NeoHub located in Gomti Nagar?',
        answer: 'We are located at Levana Cyber Heights, TC-212, 2nd Floor, Vibhuti Khand, Gomti Nagar, Lucknow. It is situated right opposite Indira Gandhi Pratishthan, making it highly accessible.'
      },
      {
        question: 'What are the timing hours for Gomti Nagar hub?',
        answer: 'Our physical reception desk is operational Monday to Saturday from 9:00 AM to 9:00 PM. Permanent private cabin members have extended operational access options.'
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
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.026770932204!2d81.000788!3d26.863868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be296aaaaaaab%3A0x6b402ef465baee0f!2sLevana%20Cyber%20Heights!5e0!3m2!1sen!2sin!4v1716949392211!5m2!1sen!2sin',
    faqs: [
      {
        question: 'Why choose a coworking space in Vibhuti Khand?',
        answer: 'Vibhuti Khand serves as the financial epicenter of Lucknow. Establishing your office here gives you a premium corporate address, excellent public transport links, and proximity to major commercial banks and government hubs.'
      }
    ]
  },
  'hazratganj': {
    name: 'Hazratganj',
    metaTitle: 'Coworking Office Space Hazratganj Lucknow | Flexible Desks',
    metaDescription: 'Find flexible coworking office spaces near Hazratganj, Lucknow. NeoHub offers premium shared cabins and hot desks with fast commuting links from Hazratganj Metro Station.',
    slogan: 'Professional Workspaces with Direct Connectivity to Hazratganj',
    description: 'For teams looking to stay close to Lucknow\'s heritage commercial core, NeoHub provides high-speed, well-connected virtual and shared office access. Positioned within minutes of Hazratganj, our Gomti Nagar hub serves as the perfect operations facility while offering meeting rooms for client presentations near the downtown center.',
    landmarks: ['Hazratganj Metro Station', 'Sahara Ganj Mall', 'Lucknow GPO', 'General Post Office'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.026770932204!2d81.000788!3d26.863868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be296aaaaaaab%3A0x6b402ef465baee0f!2sLevana%20Cyber%20Heights!5e0!3m2!1sen!2sin!4v1716949392211!5m2!1sen!2sin',
    faqs: [
      {
        question: 'Do you have physical spaces inside Hazratganj?',
        answer: 'Our primary premium workspace facility is located at Levana Cyber Heights, Gomti Nagar. We provide virtual office addresses and corporate packages that offer quick commuting access for Hazratganj-based businesses.'
      }
    ]
  },
  'aliganj': {
    name: 'Aliganj',
    metaTitle: 'Shared Coworking Space Aliganj Lucknow | Virtual Office',
    metaDescription: 'Establish your office near Aliganj, Lucknow. Rent meeting rooms, dedicated desks, and virtual office addresses at NeoHub. Modern infrastructure for local businesses.',
    slogan: 'Connect Your Aliganj Enterprise to Lucknow\'s Premium Coworking Space',
    description: 'NeoHub enables startups and small businesses in Aliganj to upgrade to a Grade-A office infrastructure. Avoid the hassles of lease overheads and high utility bills. Get corporate hot desks and private cabins with instant setup, tea/coffee access, and gigabit internet backups.',
    landmarks: ['Aliganj Post Office', 'Kapoorthala Commercial Complex', 'Chandra Shekhar Azad Park'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.026770932204!2d81.000788!3d26.863868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be296aaaaaaab%3A0x6b402ef465baee0f!2sLevana%20Cyber%20Heights!5e0!3m2!1sen!2sin!4v1716949392211!5m2!1sen!2sin',
    faqs: [
      {
        question: 'Do you offer virtual office registration for Aliganj businesses?',
        answer: 'Yes, we provide premium business address registration services (GST and company registry business options) out of our Cyber Heights location, serving teams across Aliganj.'
      }
    ]
  },
  'indira-nagar': {
    name: 'Indira Nagar',
    metaTitle: 'Coworking Desk Spaces Indira Nagar Lucknow | NeoHub',
    metaDescription: 'Searching for a coworking space near Indira Nagar, Lucknow? Join NeoHub Coworking Space. Dedicated desks, hot desks, and client conference rooms near Shalimar Metropolis.',
    slogan: 'Premium Workplace Infrastructure Close to Indira Nagar',
    description: 'Located adjacent to Indira Nagar, NeoHub at Cyber Heights offers a highly convenient office environment for residents of Indira Nagar. Avoid long daily commutes. Access high-speed internet, ergonomic desks, and professional meeting rooms just around the corner.',
    landmarks: ['Indira Nagar Metro Station', 'Bhootnath Market', 'Shalimar Metropolis Mall'],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.026770932204!2d81.000788!3d26.863868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be296aaaaaaab%3A0x6b402ef465baee0f!2sLevana%20Cyber%20Heights!5e0!3m2!1sen!2sin!4v1716949392211!5m2!1sen!2sin',
    faqs: [
      {
        question: 'Is parking available for members commuting from Indira Nagar?',
        answer: 'Yes! Levana Cyber Heights provides dedicated parking spaces for office members and guests commuting from Indira Nagar and other Lucknow locations.'
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
      { name: 'Private Cabin (4-6 Seats)', price: '9000', currency: 'INR', unit: 'Seat/Month' },
      { name: 'Private Suite (10-15 Seats)', price: '8500', currency: 'INR', unit: 'Seat/Month' }
    ],
    faqs: [
      {
        question: 'Are the private cabins lockable?',
        answer: 'Yes, all private cabin suites are completely lockable and secured with biometric locks or unique physical keys, ensuring access only to authorized personnel.'
      }
    ]
  },
  'dedicated-desk': {
    name: 'Dedicated Desks',
    metaTitle: 'Dedicated Coworking Desks Lucknow | Gomti Nagar Shared Offices',
    metaDescription: 'Book dedicated coworking desks in Gomti Nagar, Lucknow. Get your own fixed workspace, ergonomic seating, secure lockers, and gigabit fiber backup.',
    pricingDescription: 'Your own fixed desk in a vibrant shared space. Ideal for freelancers, remote developers, and growing startup teams.',
    features: ['Personal Assigned Desk', 'Ergonomic Office Chair', 'Secure Storage Lockers', 'High-Speed Dual Fiber Internet', 'Daily Housekeeping Services'],
    pricing: [
      { name: 'Monthly Dedicated Seat', price: '6000', currency: 'INR', unit: 'Month' }
    ],
    faqs: [
      {
        question: 'Do I get a locker with my dedicated desk?',
        answer: 'Yes, every monthly dedicated desk membership includes a secure, personal key locker at no extra charge.'
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
      { name: 'Daily Hot Desk Pass', price: '350', currency: 'INR', unit: 'Day' },
      { name: 'Monthly Hot Desk Membership', price: '3500', currency: 'INR', unit: 'Month' }
    ],
    faqs: [
      {
        question: 'Can I book a hot desk daily?',
        answer: 'Yes! We offer daily visitor hot desk passes starting at just ₹350 per day, allowing you to walk in and work with full access to high-speed internet and beverages.'
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
      { name: 'Annual GST Registration Plan', price: '18000', currency: 'INR', unit: 'Year' },
      { name: 'Business Address Only', price: '12000', currency: 'INR', unit: 'Year' }
    ],
    faqs: [
      {
        question: 'What documents are provided for GST registration?',
        answer: 'We provide a complete documentation kit including the Landlord NOC, Utility Bills, Rent Agreement, and ownership papers required to register a GST address.'
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
      { name: 'Hourly Meeting Room booking', price: '500', currency: 'INR', unit: 'Hour' },
      { name: 'Full-Day Booking Rate', price: '4000', currency: 'INR', unit: 'Day' }
    ],
    faqs: [
      {
        question: 'Can I book a meeting room for just one hour?',
        answer: 'Yes! Our meeting rooms are available for booking starting from 1 hour, or as full-day packages to suit your event schedule.'
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
      { name: 'Half-Day Conference Hall Rent', price: '7500', currency: 'INR', unit: '4 Hours' },
      { name: 'Full-Day Conference Hall Rent', price: '12000', currency: 'INR', unit: '8 Hours' }
    ],
    faqs: [
      {
        question: 'Is catering available for corporate events?',
        answer: 'Yes, we can organize catering services, coffee breaks, and buffet lunches through partner vendors to match your corporate event needs.'
      }
    ]
  }
};

// SSG slugs compiler
export async function generateStaticParams() {
  const allSlugs = [
    ...localities.map(slug => ({ slug })),
    ...services.map(slug => ({ slug }))
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
      keywords: [`coworking in ${data.name}`, `office space in ${data.name}`, `best desk ${data.name}`]
    });
  }

  if (services.includes(slug as ServiceSlug)) {
    const data = serviceData[slug as ServiceSlug];
    return constructMetadata({
      title: data.metaTitle,
      description: data.metaDescription,
      canonical: `/${slug}`,
      keywords: [data.name, `${data.name} lucknow`, `${data.name} gomti nagar`]
    });
  }

  return {};
}

// Unified Render Component
export default async function ProgrammaticPage({ params }: PageProps) {
  const { slug } = await params;

  const isLocality = localities.includes(slug as LocalitySlug);
  const isService = services.includes(slug as ServiceSlug);

  if (!isLocality && !isService) {
    notFound();
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
      <div className="bg-[#110b29] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <BreadcrumbSchema items={breadcrumbItems} />
        <FAQSchema items={data.faqs} />

        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-12">
            <span className="text-[#FF5B2E] text-sm font-semibold tracking-widest uppercase">NeoHub Lucknow</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 leading-tight">{data.slogan}</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{data.description}</p>
          </div>

          {/* Landmarks flex grid */}
          <div className="bg-[#1c1145] p-8 rounded-xl border border-gray-800 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-[#FF5B2E]">Strategic Proximity & Near Landmarks</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.landmarks.map((landmark, i) => (
                <div key={i} className="bg-[#110b29] p-4 rounded-lg text-center border border-gray-900 font-medium">
                  {landmark}
                </div>
              ))}
            </div>
          </div>

          {/* Map Embed Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[#FF5B2E]">Find Us in {data.name}</h2>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
              <iframe
                src={data.mapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`NeoHub Coworking Space Map - ${data.name}`}
              ></iframe>
            </div>
          </div>

          {/* FAQ Accordions */}
          <div className="bg-[#1c1145] p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6 text-[#FF5B2E]">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {data.faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-800 pb-4 last:border-b-0">
                  <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
      <div className="bg-[#110b29] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <JsonLd data={serviceSchema} />
        <BreadcrumbSchema items={breadcrumbItems} />
        <FAQSchema items={data.faqs} />

        <div className="max-w-4xl mx-auto">
          {/* Header section */}
          <div className="text-center mb-12">
            <span className="text-[#FF5B2E] text-sm font-semibold tracking-widest uppercase">Office Solutions</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-2 mb-4 leading-tight">{data.name} in Gomti Nagar</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{data.pricingDescription}</p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {data.pricing.map((priceItem, i) => (
              <div key={i} className="bg-[#1c1145] p-8 rounded-xl border border-gray-800 text-center relative overflow-hidden flex flex-col justify-between">
                <span className="absolute top-0 right-0 bg-[#FF5B2E] text-white text-xs px-4 py-1 font-bold rounded-bl-lg">Lucknow Rate</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">{priceItem.name}</h3>
                  <p className="text-5xl font-extrabold text-[#FF5B2E] mb-2">₹{parseInt(priceItem.price).toLocaleString()}</p>
                  <p className="text-sm text-gray-400 mb-6">per {priceItem.unit}</p>
                </div>
                <a
                  href={`https://wa.me/917000481286?text=Hi%20NeoHub%20I%20am%20interested%20in%20${encodeURIComponent(priceItem.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent hover:bg-[#FF5B2E] border-2 border-[#FF5B2E] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
                >
                  Book Instant Tour
                </a>
              </div>
            ))}
          </div>

          {/* Service Features */}
          <div className="bg-[#1c1145] p-8 rounded-xl border border-gray-800 mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[#FF5B2E]">What is Included in Your Membership</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {data.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[#FF5B2E] text-xl">✓</span>
                  <span className="text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordions */}
          <div className="bg-[#1c1145] p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6 text-[#FF5B2E]">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {data.faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-800 pb-4 last:border-b-0">
                  <h3 className="text-lg font-medium text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
