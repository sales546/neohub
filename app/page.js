import Link from "next/link";
import AboutTabs from "@/components/AboutTabs";
import HomeGallery from "@/components/HomeGallery";
import ClientPartners from "@/components/ClientPartners";
import HomeHeroCarousel from "@/components/home/HomeHeroCarousel";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import {
  trustStats,
  pricingPlans,
  aboutHighlights,
  buildPlanWhatsAppUrl,
  workspaceGuideLinks,
} from "@/lib/siteData";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogPosts } from "@/lib/blog/queries";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  // Kept under ~58 chars so Google does not truncate it in results.
  title: "Coworking Space in Gomti Nagar, Lucknow | NeoHub",
  description:
    "Boost your productivity at NeoHub, Lucknow's leading coworking space in Levana Cyber Heights, Gomti Nagar. Flexible hot desking, dedicated workstations, private office cabins, and high-tech meeting rooms.",
  canonical: "/",
  absoluteTitle: true,
  ogSubtitle: "Levana Cyber Heights · Gomti Nagar · Lucknow",
  keywords: [
    "shared office space lucknow",
    "office space in gomti nagar",
    "private cabins lucknow",
    "conference rooms lucknow",
    "levana cyber heights office",
  ],
});

const services = [
  { icon: "/assets/Fast-Internet_6e6687e1.png", title: "Fast Internet", desc: "Dual-fiber gigabit internet with automated failover and enterprise-grade security protocols." },
  { icon: "/assets/24-Hr-Access_c185eeab.png", title: "24 Hr Access", desc: "Work at your own pace with secure biometric access cards available around the clock." },
  { icon: "/assets/HD-Projector_373f8602.png", title: "HD Projector", desc: "Ultra-HD projection screens and wireless smart TV casting for premium client presentations." },
  { icon: "/assets/Cleaning-Services_be12d1fb.png", title: "Cleaning Services", desc: "Continuous cleaning and sanitization services to ensure a clean, germ-free workspace." },
  { icon: "/assets/Car-Parking_c348be3d.png", title: "Car Parking", desc: "Ample reserved and visitor parking spaces in the Cyber Heights basement and ground level." },
  { icon: "/assets/Office-Equipment_9b486f0c.png", title: "Office Equipment", desc: "High-speed printing, scanning, shredding facilities, and general stationery support." },
  { icon: "/assets/Personal-Lockers_ee033c9d.png", title: "Personal Lockers", desc: "Secure, digital-locking storage compartments for your personal files and valuables." },
  { icon: "/assets/Coffee-Machine_31854002.png", title: "Coffee Machine", desc: "Unlimited premium ground coffee, assorted teas, and filtered drinking water at the pantry." },
];

const aboutTabs = [
  { title: "Our Mission", content: "To provide professionals, freelancers, and businesses in Lucknow with a world-class, flexible workspace ecosystem that drives efficiency, collaboration, and innovation." },
  { title: "Our Vision", content: "To build Uttar Pradesh's most dynamic business network by connecting ambitious local entrepreneurs and scaling businesses in a premier environment." },
  { title: "Our Commitment", content: "We are committed to delivering 100% operational uptime, lightning-fast redundant internet connectivity, premium meeting environments, and top-tier hospitality." },
];

const spacesCarousel = [
  {
    title: "Premium Private Cabins",
    href: "/private-cabins",
    desc: "Secure, lockable cabins tailored for startups and businesses requiring high privacy and dedicated bandwidth.",
    image: "/assets/spaces-private-cabins.webp",
    alt: "Private office spaces at NeoHub Lucknow",
    info: [["Capacity", "4–15 seats"], ["Status", "Available"], ["Access", "24/7"], ["Type", "Private Cabin"], ["WiFi", "Gigabit"], ["From", "₹20,000/mo"]],
  },
  {
    title: "Flexible Hot Desking",
    href: "/hot-desk",
    desc: "On-demand workspace access by the day or month, giving you the freedom to work from any open seat in the hub.",
    image: "/assets/spaces-hot-desking.webp",
    alt: "Hot desking coworking tables at NeoHub Gomti Nagar",
    info: [["Pass", "Daily / Monthly"], ["Status", "Available"], ["Access", "24/7"], ["Type", "Hot Desk"], ["WiFi", "Gigabit"], ["From", "Enquire"]],
  },
  {
    title: "Event & Workshop Spaces",
    href: "/contact",
    desc: "Versatile event layouts with AV systems and projector screens to host meetups, workshops, and company announcements.",
    image: "/assets/spaces-events.webp",
    alt: "Coworking office break rooms and wellness amenities",
    info: [["Layout", "Flexible"], ["Status", "On request"], ["AV", "Included"], ["Type", "Event Space"], ["WiFi", "Gigabit"], ["Booking", "Enquire"]],
  },
  {
    title: "Private Meeting Cabins",
    href: "/meeting-rooms",
    desc: "Acoustic-insulated compact cabins designed for focused team discussions, video calls, or executive interviews.",
    image: "/assets/spaces-meeting-cabins.webp",
    alt: "Startup team workspaces in Lucknow",
    info: [["Seats", "4–8"], ["Status", "Available"], ["Access", "Hourly"], ["Type", "Meeting Cabin"], ["WiFi", "Gigabit"], ["Booking", "Enquire"]],
  },
  {
    title: "Dedicated Workstations",
    href: "/dedicated-desk",
    desc: "Your own reserved desk in a shared environment, complete with lockable drawers and premium ergonomic chairs.",
    image: "/assets/spaces-workstations.webp",
    alt: "Dedicated desks and ergonomic workstations",
    info: [["Desk", "Reserved"], ["Status", "Available"], ["Access", "24/7"], ["Type", "Workstation"], ["WiFi", "Gigabit"], ["From", "₹5,500/mo"]],
  },
  {
    title: "State-of-the-Art Conference Rooms",
    href: "/conference-hall",
    desc: "High-tech meeting rooms equipped with smart TVs, video conferencing gear, writeable boards, and tea/coffee services.",
    image: "/assets/spaces-conference.webp",
    alt: "High-tech corporate meeting rooms",
    info: [["Seats", "8–20"], ["Status", "Available"], ["AV", "HD Projector"], ["Type", "Conference"], ["WiFi", "Gigabit"], ["From", "₹500/hr"]],
  },
  {
    title: "Shared Coworking Desks",
    href: "/hot-desk",
    desc: "Flexible, plug-and-play seating options in our open-plan area, perfect for freelancers and digital nomads.",
    image: "/assets/spaces-coworking.webp",
    alt: "Shared coworking areas and hot desks",
    info: [["Seating", "Open plan"], ["Status", "Available"], ["Access", "24/7"], ["Type", "Coworking"], ["WiFi", "Gigabit"], ["From", "Enquire"]],
  },
  {
    title: "Enterprise Office Suites",
    href: "/private-cabins",
    desc: "Fully furnished, private suites configured for team sizes of 5 to 50+ members with custom server and networking options.",
    image: "/assets/spaces-enterprise.webp",
    alt: "Business opportunities and networking lounges",
    info: [["Teams", "5–50+"], ["Status", "Available"], ["Access", "24/7"], ["Type", "Enterprise"], ["WiFi", "Dedicated"], ["From", "Custom"]],
  },
];

const whyChooseItems = [
  { icon: "/assets/icon-img1_1286cda7.png", title: "Flexible Workspaces", desc: "Choose from hot desks, dedicated workstations, or private cabins with simple month-to-month terms." },
  { icon: "/assets/icon-img2_7cb8ae1d.png", title: "Top-Notch Amenities", desc: "Enjoy complimentary premium tea/coffee, professional reception support, and modern printing stations." },
  { icon: "/assets/icon-img3_bb74d0b2.png", title: "Cost-Effective Solutions", desc: "Save up to 40% compared to traditional office setups with zero upfront capital expenditure." },
  { icon: "/assets/icon-img4_254541b0.png", title: "Gigabit Connectivity", desc: "Stay online 24/7 with dual-carrier high-speed fiber internet and automatic failover backups." },
  { icon: "/assets/icon-img5_30808ac6.png", title: "Prime Business Location", desc: "Position your business at Levana Cyber Heights, Gomti Nagar—Lucknow's commercial landmark." },
  { icon: "/assets/icon-img6_0b074c5f.png", title: "Vibrant Community", desc: "Network and grow alongside fellow creators, developers, and entrepreneurs in our regular events." },
];

const counterIcons = [
  "/assets/icon1_8ad8abbc.png",
  "/assets/icon2_6f181832.png",
  "/assets/icon3_b0096398.png",
  "/assets/icon4_18a9771f.png",
];

const counterStats = trustStats.map((stat, index) => ({
  ...stat,
  icon: counterIcons[index] || counterIcons[0],
}));

const aboutHighlightIcons = [
  "/assets/count-img1_7f169963.png",
  "/assets/count-img2_1b7c2edd.png",
];

const SpaceSvg = () => (
  <svg width="1200" height="600" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M950.998 570.988C1197.08 500.592 1200 0 1200 0V590C1200 595.523 1195.52 600 1190 600H0V561.539C0 561.539 704.916 641.384 950.998 570.988Z" fill="#FF5B2E" />
  </svg>
);

export const revalidate = 60;

export default async function HomePage() {
  const latestPosts = await getBlogPosts({ limit: 3 });

  return (
    <>
      <HomeHeroCarousel />

      <ClientPartners />

      {/* Services */}
      <section id="services-sec" className="position-relative">
        <div className="container">
          <div className="col-md-6 col-sm-9 col-11 heading-box m-auto text-center mb-lg-5 mb-4">
            <p className="section-kicker">Our Services</p>
            <h2 className="about-main-heading align-self-center">Empowering Your Productivity with Our Benefits</h2>
          </div>
          <div className="row">
            {services.map((svc, i) => (
              <div key={i} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 services-content-outer mb-4 aos-init" data-aos="flip-left">
                <div className="service-box-outer">
                  <div className="services-content-box align-self-center text-center">
                    <div className="services-img-box">
                      <img src={svc.icon} className="mx-auto d-block" alt={svc.title} width="400" height="400" />
                    </div>
                    <h3 className="service-title"><Link href="/spaces">{svc.title}</Link></h3>
                    <p>{svc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-sec" className="position-relative" style={{ backgroundSize: "100% 100%", backgroundPosition: "bottom" }}>
        <div className="container">
          <div className="our-about-box text-md-start text-center">
            <div className="row">
              <div className="col-md-6 align-self-center text-md-start text-center pe-lg-5 pe-md-2 aos-init" data-aos="fade-right">
                <div className="col-md-12 col-sm-9 col-11 heading-box m-auto pb-2">
                  <p className="section-kicker">About Us</p>
                  <h2 className="about-main-heading">Lucknow&apos;s Premium Destination for High-Performance Teams</h2>
                  <p className="about-paragraph">NeoHub provides custom enterprise suites, hot desks, dedicated workstations, and meeting rooms in Gomti Nagar. Focus entirely on your vision while we handle your operations.</p>
                </div>
                <AboutTabs tabs={aboutTabs} />
                <div className="about-button-box pt-xl-4 pt-lg-4 pt-md-3 pt-3 pb-md-0 pb-4">
                  <Link className="about-btn btn" href="/about-us">Explore More</Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 aos-init mb-md-0 mb-5" data-aos="fade-left" style={{ position: "relative" }}>
                <div className="About-image">
                  <div className="about-main-img-one" style={{ visibility: "visible", animationDuration: "2s", animationName: "zoomInUp" }}>
                    <img src="/assets/image_33ea1c1c.png" alt="About NeoHub" />
                  </div>
                  <div className="about-counter-box d-flex">
                    {aboutHighlights.map((item, index) => (
                      <div key={item.label} className="about-box text-start">
                        <div className="about-icon-img">
                          <img src={aboutHighlightIcons[index]} alt="" aria-hidden="true" />
                        </div>
                        <p className="about-inner-title">
                          <span className="about-counter-value">{item.value}</span>
                          <span>{item.suffix}</span>
                        </p>
                        <p className="about-inner-paragraph">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Carousel */}
      <section id="spaces-sec" className="position-relative">
        <div className="container">
          <div className="col-md-6 col-sm-9 col-11 heading-box m-auto text-center mb-lg-5 mb-4">
            <p className="section-kicker">Our Spaces</p>
            <h2 className="about-main-heading align-self-center">Empowering Your Productivity with Our Services</h2>
          </div>
          <div className="owl-carousel">
            {spacesCarousel.map((space, i) => (
              <div key={i} className="service-content ms-md-2 ms-sm-0 me-sm-2 me-2">
                <div className="row">
                  <div className="col-lg-4 col-md-6 pe-md-0 mb-2">
                    <div className="service-active-content-box">
                      <div className="service-active-inner-box">
                        <h3 className="pt-2"><Link href={space.href}>{space.title}</Link></h3>
                        <p className="service-active-text pb-xl-4 pb-2">{space.desc}</p>
                        <div className="spaces-information-outer-box pb-2">
                          {space.info.map(([label, value], j) => (
                            <div key={j} className="spaces-information">
                              <p className="spaces-information-title">{label}</p>
                              <p className="spaces-information-text">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="spaces-button-box pt-md-4 pt-4 pb-2">
                          <a className="spaces-btn btn" href={buildPlanWhatsAppUrl(space.title)} target="_blank" rel="noopener noreferrer">Book Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6 ps-md-0 ps-sm-3">
                    <div className="spaces-image-main-box">
                      <div className="spaces-image"><img src={space.image} alt={space.alt} /></div>
                      <div className="bg-img-space"><SpaceSvg /></div>
                      <div className="slide-info"><span className="active-slide">0{i + 1}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="spaces-bg-outer-box">
          <div className="spaces-bg-clor"></div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose" className="position-relative" style={{ backgroundSize: "100% 100%", backgroundPosition: "bottom" }}>
        <div className="why-choose-main-box">
          <div className="container">
            <div className="row pb-lg-5 pb-4" style={{ justifyContent: "space-between" }}>
              <div className="col-xl-6 col-lg-6 col-md-6 heading-box text-md-start text-center pe-lg-5 aos-init" data-aos="fade-right">
                <p className="section-kicker">Why Choose Us</p>
                <h2 className="about-main-heading align-self-center">Lucknow&apos;s Premium Destination for High-Performance Teams</h2>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-6 text-md-start text-center align-self-center ps-lg-4 aos-init" data-aos="fade-left">
                <p className="about-main-paragraph align-self-center">
                  To provide professionals, freelancers, and businesses in Lucknow with a world-class, flexible workspace ecosystem that drives efficiency, collaboration, and innovation.
                </p>
              </div>
            </div>
            <div className="row why-choose-grid-box">
              <div className="col-xl-6 col-lg-6 col-md-6 why-choose-head-image-box order-lg-1 order-md-1 order-2 aos-init pt-md-0 pt-4" data-aos="fade-right">
                <div className="why-choose-image"><img src="/assets/image_ecf3979e.png" alt="Why choose NeoHub" /></div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 why-choose-head-content-box align-self-center text-md-start text-center order-lg-2 order-md-2 order-1 aos-init" data-aos="fade-left">
                <div className="why-choose-us-progress-box">
                  {whyChooseItems.map((item, i) => (
                    <div key={i} className="why-choose-us-outer-box">
                      <div className="row" style={{ justifyContent: "center" }}>
                        <div className="col-md-2 col-sm-2 col-2" style={{ width: "fit-content" }}>
                          <div className="why-choose-us-icon-img"><img src={item.icon} alt="" aria-hidden="true" /></div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-9 ps-0 text-start">
                          <div className="why-choose-us-box">
                            <h3 className="why-choose-us-title pb-1">{item.title}</h3>
                            <p className="why-choose-us-text">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Stats */}
      <section id="counter-sec" className="position-relative">
        <div className="container">
          <div className="our-counter-box text-md-start text-center">
            <div className="counter-counter-box row" style={{ backgroundSize: "100% 100%", backgroundPosition: "bottom" }}>
              <div className="owl-carousel">
                {counterStats.map((stat, i) => (
                  <div key={i} className="counter-outer-box aos-init" data-aos="flip-left">
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-md-2 col-sm-2 col-2 align-self-center" style={{ width: "fit-content" }}>
                        <div className="counter-icon-img"><img src={stat.icon} alt={stat.label} /></div>
                      </div>
                      <div className="col-md-8 col-sm-7 col-7 ps-0">
                        <div className="counter-box">
                          <h3><span className="counter-value">{stat.value}</span><span>{stat.suffix}</span></h3>
                          <p className="counter-title">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing_plans">
        <div className="container">
          <div className="col-md-6 col-sm-9 col-11 heading-box m-auto text-center mb-lg-5 mb-4">
            <p className="section-kicker">Our Pricing</p>
            <h2 className="about-main-heading align-self-center">Our Pricing plans</h2>
          </div>
          <div className="owl-carousel">
            {pricingPlans.map((plan, i) => (
              <div key={i} className="text-center pricing-plans position-relative aos-init" data-aos="flip-up">
                <div className="pricing-plans-outer-box position-relative">
                  <div className="pricing-plans-box">
                    <p className="pricing-plan-tag align-self-center">{plan.tag}</p>
                    <div className="pricing-plan-icon"><img src={plan.icon} alt="" aria-hidden="true" /></div>
                    <h3>{plan.name}</h3>
                    <div className="price-plan">
                      <p className="dollar">₹</p>
                      <span className="price">{plan.price}</span>
                      <p className="monthly align-self-end">{plan.unit || "/Monthly"}</p>
                    </div>
                    <div className="pricing-package text-center"><p>{plan.desc}</p></div>
                    <div className="plan-button-box pt-xl-3 pt-lg-4 pt-md-3 pt-3">
                      <a className="plan-btn btn" href={buildPlanWhatsAppUrl(plan.name)} target="_blank" rel="noopener noreferrer">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomeTestimonials />

      <HomeGallery />

      {/* Blog Preview */}
      <section id="blog" className="neo-home-blog">
        <div className="container">
          <div className="neo-home-blog-head">
            <div>
              <p className="section-kicker">News &amp; Blogs</p>
              <h2 className="blog-main-heading">Our latest news &amp; blogs</h2>
            </div>
            <p className="neo-home-blog-lede">
              Practical notes on desks, cabins, and meeting rooms in Gomti Nagar — written for teams comparing Lucknow workspace options.
            </p>
          </div>
          <div className="home-blog-grid">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} compact titleAs="h3" />
            ))}
          </div>
          <nav className="neo-guide-links" aria-label="Workspace guides">
            <h3 className="neo-guide-links-title">Workspace guides</h3>
            <ul>
              {workspaceGuideLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
