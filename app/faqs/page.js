import PageBanner from "@/components/PageBanner";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "Frequently Asked Questions | NeoHub Coworking Space Lucknow",
  description: "Get answers to FAQs about membership plans, pricing, amenities, high-speed internet, conference rooms, and private cabins at NeoHub Lucknow in Gomti Nagar.",
};

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
    answer: "We are located at Levana Cyber Heights, TC-212, 2nd Floor, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010. Our office is situated in the main business district, right opposite Indira Gandhi Pratishthan.",
  },
  {
    question: "What are the operating hours of NeoHub?",
    answer: "Our coworking space operates from 9:00 AM to 9:00 PM, Monday through Saturday. Dedicated office cabin clients can also request custom access cards depending on their team requirements.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageBanner title="FAQ's" />

      <section id="faq-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 faq-image pb-4">
              <img src="/assets/faq_3e32fb3d.png" alt="Frequently Asked Questions" />
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
