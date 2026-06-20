import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata = {
  title: "Premium Shared Spaces & Meeting Rooms in Lucknow | NeoHub",
  description: "Discover our private office cabins, dedicated desks, flexible hot desking, meeting cabins, and high-tech conference rooms at Levana Cyber Heights, Gomti Nagar.",
};

const spacesData = [
  {
    title: "Enterprise Office Suites",
    href: "/private-cabins",
    image: "/assets/B2B-Opportunities_96b28b64.png",
    description: "Fully furnished, private suites configured for team sizes of 5 to 50+ members with custom server and networking options.",
  },
  {
    title: "Shared Coworking Desks",
    href: "/hot-desk",
    image: "/assets/Co-Working-Areas_81ff66f9.png",
    description: "Flexible, plug-and-play seating options in our open-plan area, perfect for freelancers and digital nomads.",
  },
  {
    title: "State-of-the-Art Conference Rooms",
    href: "/conference-hall",
    image: "/assets/Conference-Rooms_feaacc5e.png",
    description: "High-tech meeting rooms equipped with smart TVs, video conferencing gear, writeable boards, and tea/coffee services.",
  },
  {
    title: "Dedicated Workstations",
    href: "/dedicated-desk",
    image: "/assets/Customized-Desks_f656af2d.png",
    description: "Your own reserved desk in a shared environment, complete with lockable drawers and premium ergonomic chairs.",
  },
  {
    title: "Private Meeting Cabins",
    href: "/meeting-rooms",
    image: "/assets/Debate-Benefits_fe3d6cf8.png",
    description: "Acoustic-insulated compact cabins designed for focused team discussions, video calls, or executive interviews.",
  },
  {
    title: "Event & Workshop Spaces",
    href: "/contact",
    image: "/assets/Wellness-Campaigns_180e8285.png",
    description: "Versatile event layouts with AV systems and projector screens to host meetups, workshops, and company announcements.",
  },
  {
    title: "Flexible Hot Desking",
    href: "/hot-desk",
    image: "/assets/Hot-Desking_ade72a77.png",
    description: "On-demand workspace access by the day or month, giving you the freedom to work from any open seat in the hub.",
  },
  {
    title: "Premium Private Cabins",
    href: "/private-cabins",
    image: "/assets/Private-Spaces_dfb4e03e.png",
    description: "Secure, lockable cabins tailored for startups and businesses requiring high privacy and dedicated bandwidth.",
  },
];

export default function SpacesPage() {
  return (
    <>
      <PageBanner title="Spaces" />

      <div id="spaces-page" className="position-relative">
        <section className="position-relative">
          <div className="container">
            <div className="row">
              {spacesData.map((space) => (
                <div key={space.title} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 spaces-content-outer mb-4">
                  <div className="spaces-img-outer-box">
                    <div className="spaces-image-box">
                      <Link href={space.href}>
                        <img src={space.image} className="space-image" alt={space.title} loading="lazy" />
                      </Link>
                    </div>
                  </div>
                  <div className="spaces-box-outer">
                    <div className="spaces-content-box">
                      <div className="spaces-text-box align-self-center text-center">
                        <h5 className="spaces-title mb-2">
                          <Link href={space.href}>{space.title}</Link>
                        </h5>
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
