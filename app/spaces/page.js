import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SiteImage from "@/components/SiteImage";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Coworking Spaces & Meeting Rooms in Lucknow | NeoHub",
  description:
    "Cabins, dedicated desks, hot desks, meeting rooms, and virtual office plans across three Gomti Nagar centres. See live rates and book a tour.",
  canonical: "/spaces",
  absoluteTitle: true,
  ogSubtitle: "Cabins · Workstations · Conference rooms in Lucknow",
  keywords: ["coworking spaces lucknow", "meeting rooms gomti nagar", "private cabin pricing"],
});

const spacesData = [
  {
    title: "Enterprise Office Suites",
    href: "/private-cabins",
    image: "/assets/spaces-enterprise.webp",
    description: "Fully furnished, private suites configured for team sizes of 5 to 50+ members with custom server and networking options.",
  },
  {
    title: "Shared Coworking Desks",
    href: "/hot-desk",
    image: "/assets/spaces-coworking.webp",
    description: "Flexible, plug-and-play seating options in our open-plan area, perfect for freelancers and digital nomads.",
  },
  {
    title: "State-of-the-Art Conference Rooms",
    href: "/conference-hall",
    image: "/assets/spaces-conference.webp",
    description: "High-tech meeting rooms equipped with smart TVs, video conferencing gear, writeable boards, and tea/coffee services.",
  },
  {
    title: "Dedicated Workstations",
    href: "/dedicated-desk",
    image: "/assets/spaces-workstations.webp",
    description: "Your own reserved desk in a shared environment, complete with lockable drawers and premium ergonomic chairs.",
  },
  {
    title: "Private Meeting Cabins",
    href: "/meeting-rooms",
    image: "/assets/spaces-meeting-cabins.webp",
    description: "Acoustic-insulated compact cabins designed for focused team discussions, video calls, or executive interviews.",
  },
  {
    title: "Event & Workshop Spaces",
    href: "/contact",
    image: "/assets/spaces-events.webp",
    description: "Versatile event layouts with AV systems and projector screens to host meetups, workshops, and company announcements.",
  },
  {
    title: "Virtual Office & Business Address",
    href: "/virtual-office",
    image: "/assets/spaces-hot-desking.webp",
    description: "A premium Gomti Nagar business address for GST and company registration, with mail handling, call forwarding, and meeting room credits.",
  },
  {
    title: "GST registration address",
    href: "/gst-registration-lucknow",
    image: "/assets/spaces-hot-desking.webp",
    description: "₹18,000/year kit: NOC, utility bill, rent agreement and ownership papers for Lucknow GST filing. Google listing is not included.",
  },
  {
    title: "Company registration address",
    href: "/company-registration-lucknow",
    image: "/assets/spaces-hot-desking.webp",
    description: "₹12,000/year Gomti Nagar registered-office address for MCA incorporation and mail handling, without the GST document pack.",
  },
  {
    title: "Office space for rent in Lucknow",
    href: "/office-space-for-rent-lucknow",
    image: "/assets/spaces-enterprise.webp",
    description: "Lockable cabins and managed floors in Vibhuti Khand instead of a 3-year bare-shell lease on MagicBricks.",
  },
  {
    title: "Managed office in Gomti Nagar",
    href: "/managed-office-gomti-nagar",
    image: "/assets/spaces-private-cabins.webp",
    description: "A private office with furniture, fibre and reception already run — Cyber Heights, Bhavya or Experion.",
  },
  {
    title: "Levana Cyber Heights",
    href: "/levana-cyber-heights",
    image: "/assets/spaces-coworking.webp",
    description: "130+ seats on the 2nd floor of Cyber Heights, opposite Indira Gandhi Pratishthan. Desks from ₹5,500/mo + GST.",
  },
  {
    title: "Bhavya Corporate Tower",
    href: "/bhavya-corporate-tower",
    image: "/assets/spaces-workstations.webp",
    description: "500 seats, open 24 hours, 4th Floor Vijaipur Colony. The largest NeoHub floor in Lucknow.",
  },
  {
    title: "Experion",
    href: "/experion",
    image: "/assets/spaces-meeting-cabins.webp",
    description: "300+ seats on the 6th floor of Experion. Desks from ₹6,500/mo + GST. Open 9 AM–10 PM.",
  },
  {
    title: "Premium Private Cabins",
    href: "/private-cabins",
    image: "/assets/spaces-private-cabins.webp",
    description: "Secure, lockable cabins tailored for startups and businesses requiring high privacy and dedicated bandwidth.",
  },
];

export default function SpacesPage() {
  return (
    <>
      <PageBanner title="Workspaces & Centres in Gomti Nagar" breadcrumbLabel="Spaces" />

      <div id="spaces-page" className="position-relative">
        <section className="position-relative">
          <div className="container">
            <div className="col-md-8 col-lg-7 heading-box m-auto text-center mb-lg-5 mb-4">
              <h2 className="about-main-heading">Cabins, desks, meeting rooms, and virtual office</h2>
              <p>
                Cabins, desks, meeting rooms, and virtual office plans across Cyber Heights, Bhavya,
                and Experion. Published rates are on{" "}
                <Link href="/pricing">NeoHub pricing</Link>
                {" "}and{" "}
                <Link href="/blog/coworking-space-pricing-lucknow-2026">
                  coworking space pricing in Lucknow (2026)
                </Link>
                . Hourly rooms are covered in{" "}
                <Link href="/blog/meeting-rooms-conference-booking-gomti-nagar">
                  meeting room booking in Gomti Nagar
                </Link>
                .
              </p>
            </div>
            <div className="row">
              {spacesData.map((space) => (
                <div key={space.title} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 spaces-content-outer mb-4">
                  <div className="spaces-img-outer-box">
                    <div className="spaces-image-box">
                      <Link href={space.href}>
                        <SiteImage
                          src={space.image}
                          className="space-image"
                          alt={space.title}
                          width={640}
                          height={420}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="spaces-box-outer">
                    <div className="spaces-content-box">
                      <div className="spaces-text-box align-self-center text-center">
                        <h3 className="spaces-title mb-2">
                          <Link href={space.href}>{space.title}</Link>
                        </h3>
                        <p>{space.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
