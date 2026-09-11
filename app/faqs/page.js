import PageBanner from "@/components/PageBanner";
import FaqAccordion from "@/components/FaqAccordion";
import FAQSchema from "@/components/seo/FAQSchema";
import { constructMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "NeoHub FAQs | Hours, Pricing & Membership in Lucknow",
  description:
    "Answers on NeoHub hours, desk and cabin pricing, meeting rooms, parking, and virtual office / GST address options in Gomti Nagar.",
  canonical: "/faqs",
  absoluteTitle: true,
  ogSubtitle: "Pricing, amenities & membership answers",
  keywords: ["neohub faq", "coworking pricing lucknow", "coworking membership questions"],
});

const faqData = [
  {
    question: "What is a coworking space?",
    answer: "A coworking space is a shared office environment where freelancers, remote workers, startups, and corporate teams work alongside each other. At NeoHub Lucknow, we offer plug-and-play flexible workstations, private office cabins, and conference rooms, saving you the administrative overhead of maintaining a traditional office.",
  },
  {
    question: "Are coworking memberships at NeoHub Lucknow flexible?",
    answer: "Yes! We offer highly flexible plans. You can rent dedicated workstations, hot desks, or private cabins on a month-to-month basis with zero long-term lease commitments. This allows startups and corporate teams to scale their seating count easily as they grow.",
  },
  {
    question: "What amenities are included in NeoHub plans?",
    answer: "Every workspace membership includes access to high-speed dual-fiber internet backup, power backup, unlimited premium tea and coffee, secure printing, conference room access credits, daily housekeeping, and professional reception support.",
  },
  {
    question: "Can non-members book conference rooms at NeoHub?",
    answer: "Yes! You can reserve our high-tech meeting rooms and conference halls on an hourly or daily basis, even if you are not a permanent coworking member. Booking is simple and can be done online or via WhatsApp.",
  },
  {
    question: "Do you offer lockable private cabins for teams?",
    answer: "Yes, we provide fully secure, sound-insulated private cabins designed for teams of 4 to 30+ members. This is ideal for companies that need privacy for their operations while enjoying the benefits of shared office facilities.",
  },
  {
    question: "Where is NeoHub Coworking Space located in Lucknow?",
    answer:
      "NeoHub has three coworking centres in Gomti Nagar: (1) Levana Cyber Heights, 2nd Floor, TC-212, opposite Indira Gandhi Pratishthan — +91 70004 81286; (2) Bhavya Corporate Tower, 4th Floor — +91 70004 81286, open 24 hours; (3) Experion, 6th Floor, 611 — opens 9 am Mon. See our Contact page for directions.",
  },
  {
    question: "What are the operating hours of NeoHub?",
    answer:
      "Bhavya Corporate Tower (primary) is open 24 hours. Cyber Heights (Levana) is 9:00 AM–5:00 PM. Experion is 9:00 AM–10:00 PM. Confirm current hours when you book a tour; private cabin members can request extended access options.",
  },
  {
    question: "Do you serve teams from Hazratganj, Aliganj, and Indira Nagar?",
    answer:
      "Yes. NeoHub’s physical centres are in Gomti Nagar (Vibhuti Khand). We regularly serve professionals commuting from Hazratganj, Aliganj, Indira Nagar, and nearby Lucknow areas with flexible desks, cabins, and meeting rooms.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <FAQSchema items={faqData} />
      <PageBanner title="NeoHub FAQs — Coworking in Gomti Nagar" breadcrumbLabel="FAQs" />

      <section id="faq-page">
        <div className="container">
          <div className="col-md-8 col-lg-7 heading-box m-auto text-center mb-lg-5 mb-4">
            <h2 className="about-main-heading">Answers before you book a tour</h2>
            <p>
              Membership, hours, and meeting-room rules across Cyber Heights, Bhavya, and Experion.
              Still deciding on a desk vs a cabin? Read{" "}
              <Link href="/blog/coworking-space-pricing-lucknow-2026">Lucknow coworking pricing for 2026</Link>.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 faq-image pb-4">
              <img src="/assets/faq_3e32fb3d.webp" alt="Frequently Asked Questions" />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <FaqAccordion items={faqData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
