import AboutTabs from "@/components/AboutTabs";
import HomeSliderForm from "@/components/HomeSliderForm";

export const metadata = {
  title: "NeoHub Coworking Space Lucknow | Premium Shared Office Gomti Nagar",
  description: "Boost your productivity at NeoHub, Lucknow's leading coworking space in Levana Cyber Heights, Gomti Nagar. Flexible hot desking, dedicated workstations, private office cabins, and high-tech meeting rooms.",
  keywords: ["coworking space in lucknow", "shared office space lucknow", "office space in gomti nagar", "private cabins lucknow", "conference rooms lucknow", "levana cyber heights office"],
};

const sliderImages = [
  "/assets/slider1_0fe6417c.jpg",
  "/assets/slider2_72c0b9ec.jpg",
  "/assets/slider3_2d262f91.jpg",
];

const partnerLogos = [
  { src: "/assets/image1_2ff040a7.png", alt: "Partner 1" },
  { src: "/assets/image2_af4b6da2.png", alt: "Partner 2" },
  { src: "/assets/image3_3fe5ea43.png", alt: "Partner 3" },
  { src: "/assets/image4_86546124.png", alt: "Partner 4" },
  { src: "/assets/image5_26f56b87.png", alt: "Partner 5" },
  { src: "/assets/image6_86f48442.png", alt: "Partner 6" },
];

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
  { title: "Premium Private Cabins", desc: "Secure, lockable cabins tailored for startups and businesses requiring high privacy and dedicated bandwidth.", image: "/assets/Private-Spaces_dfb4e03e.png", alt: "Private office spaces at NeoHub Lucknow" },
  { title: "Flexible Hot Desking", desc: "On-demand workspace access by the day or month, giving you the freedom to work from any open seat in the hub.", image: "/assets/Hot-Desking_ade72a77.png", alt: "Hot desking coworking tables at NeoHub Gomti Nagar" },
  { title: "Event & Workshop Spaces", desc: "Versatile event layouts with AV systems and projector screens to host meetups, workshops, and company announcements.", image: "/assets/Wellness-Campaigns_180e8285.png", alt: "Coworking office break rooms and wellness amenities" },
  { title: "Private Meeting Cabins", desc: "Acoustic-insulated compact cabins designed for focused team discussions, video calls, or executive interviews.", image: "/assets/Debate-Benefits_fe3d6cf8.png", alt: "Startup team workspaces in Lucknow" },
  { title: "Dedicated Workstations", desc: "Your own reserved desk in a shared environment, complete with lockable drawers and premium ergonomic chairs.", image: "/assets/Customized-Desks_f656af2d.png", alt: "Dedicated desks and ergonomic workstations" },
  { title: "State-of-the-Art Conference Rooms", desc: "High-tech meeting rooms equipped with smart TVs, video conferencing gear, writeable boards, and tea/coffee services.", image: "/assets/Conference-Rooms_feaacc5e.png", alt: "High-tech corporate meeting rooms" },
  { title: "Shared Coworking Desks", desc: "Flexible, plug-and-play seating options in our open-plan area, perfect for freelancers and digital nomads.", image: "/assets/Co-Working-Areas_81ff66f9.png", alt: "Shared coworking areas and hot desks" },
  { title: "Enterprise Office Suites", desc: "Fully furnished, private suites configured for team sizes of 5 to 50+ members with custom server and networking options.", image: "/assets/B2B-Opportunities_96b28b64.png", alt: "Business opportunities and networking lounges" },
];

const whyChooseItems = [
  { icon: "/assets/icon-img1_1286cda7.png", title: "Flexible Workspaces", desc: "Choose from hot desks, dedicated workstations, or private cabins with simple month-to-month terms." },
  { icon: "/assets/icon-img2_7cb8ae1d.png", title: "Top-Notch Amenities", desc: "Enjoy complimentary premium tea/coffee, professional reception support, and modern printing stations." },
  { icon: "/assets/icon-img3_bb74d0b2.png", title: "Cost-Effective Solutions", desc: "Save up to 40% compared to traditional office setups with zero upfront capital expenditure." },
  { icon: "/assets/icon-img4_254541b0.png", title: "Gigabit Connectivity", desc: "Stay online 24/7 with dual-carrier high-speed fiber internet and automatic failover backups." },
  { icon: "/assets/icon-img5_30808ac6.png", title: "Prime Business Location", desc: "Position your business at Levana Cyber Heights, Gomti Nagar—Lucknow's commercial landmark." },
  { icon: "/assets/icon-img6_0b074c5f.png", title: "Vibrant Community", desc: "Network and grow alongside fellow creators, developers, and entrepreneurs in our regular events." },
];

const counterStats = [
  { icon: "/assets/icon1_8ad8abbc.png", value: "969", suffix: "+", label: "Successful Deals" },
  { icon: "/assets/icon2_6f181832.png", value: "128", suffix: "+", label: "Total Properties" },
  { icon: "/assets/icon3_b0096398.png", value: "969", suffix: "+", label: "Award Won" },
  { icon: "/assets/icon4_18a9771f.png", value: "93", suffix: "%", label: "Satisfaction Rate" },
];

const pricingPlans = [
  { icon: "/assets/icon3_c99efff8.png", name: "Private Office", price: "9,000", tag: "", desc: "At NeoHub, we provide premium workstations, redundant high-speed internet, executive conference rooms, and private offices to keep your team working productively." },
  { icon: "/assets/icon2_09453942.png", name: "Dedicated Desk", price: "6,000", tag: "Best", desc: "Get your own dedicated desk at NeoHub Lucknow. A reserved workstation in a professional, collaborative environment with secure storage and 24/7 access to all shared spaces." },
  { icon: "/assets/icon1_011513e6.png", name: "Membership", price: "3,500", tag: "", desc: "Enjoy flexible hot-desking options perfect for freelancers and remote professionals. Gain entry to dynamic common areas, high-speed internet, and a thriving local community." },
];

const testimonials = [
  { image: "/assets/testimg4_89125531.png", name: "Julia Anderson", role: "Co-Founder, TechStart Lucknow", rating: 5, text: "Switching to NeoHub has been a game-changer for our remote development team. The high-speed fiber backups are flawless, and the community here has helped us collaborate on multiple B2B projects." },
  { image: "/assets/testimg3_98d93f4b.png", name: "Rohan Sharma", role: "Creative Director, Pixel Media", rating: 5, text: "The dedicated desks at NeoHub provide the perfect balance of a private setup and a lively office atmosphere. Having unlimited premium tea and coffee alongside continuous housekeeping makes the work hours a breeze." },
  { image: "/assets/testimg2_9ded9eee.png", name: "Priya Patel", role: "Independent Consultant", rating: 5, text: "The meeting cabins and conference rooms at Levana Cyber Heights are top-notch. Our corporate clients are always impressed by the professional reception setup and the seamless presentation systems." },
  { image: "/assets/testimg1_4d709d5b.png", name: "Amit Verma", role: "Founder, EduTech Ventures", rating: 5, text: "Highly flexible and cost-effective workspace. We scaled our team from 3 to 15 members in just three months without any lease issues. NeoHub handles everything, allowing us to focus on our business growth." },
];

const blogPreviews = [
  { image: "/assets/image7_6ac1b0f1.png", date: "11", month: "Apr", title: "How Modern Coworking Spaces are Accelerating Lucknow's Startup Growth." },
  { image: "/assets/image6_5720d7a6.png", date: "11", month: "Apr", title: "5 Critical Productivity Hacks for Teams Working in Shared Office Environments." },
  { image: "/assets/image5-1_6a8d661c.png", date: "11", month: "Apr", title: "Choosing Between Dedicated Workstations and Private Cabins: A Detailed Guide." },
];

const QuoteSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="74.2" height="53" viewBox="0 0 74.2 53">
    <path d="M0,115.875A19.87,19.87,0,0,1,19.875,96H21.2a5.3,5.3,0,1,1,0,10.6H19.875a9.281,9.281,0,0,0-9.275,9.275V117.2H21.2a10.61,10.61,0,0,1,10.6,10.6v10.6A10.61,10.61,0,0,1,21.2,149H10.6A10.61,10.61,0,0,1,0,138.4V115.875Zm42.4,0A19.87,19.87,0,0,1,62.275,96H63.6a5.3,5.3,0,1,1,0,10.6H62.275A9.281,9.281,0,0,0,53,115.875V117.2H63.6a10.61,10.61,0,0,1,10.6,10.6v10.6A10.61,10.61,0,0,1,63.6,149H53a10.61,10.61,0,0,1-10.6-10.6V115.875Z" transform="translate(0 -96)" opacity="0.06" />
  </svg>
);

const SpaceSvg = () => (
  <svg width="1200" height="600" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M950.998 570.988C1197.08 500.592 1200 0 1200 0V590C1200 595.523 1195.52 600 1190 600H0V561.539C0 561.539 704.916 641.384 950.998 570.988Z" fill="#FF5B2E" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* Hero Slider */}
      <section id="slider">
        <div className="slider-main-outer-box main-wrapper-carousel">
          <div className="owl-carousel">
            {sliderImages.map((img, i) => (
              <div key={i} className="slider-inner-bg-image-outer-box">
                <div className="container slider-content-main-box" style={{ justifyContent: "center" }}>
                  <div className="row slider-content-box position-relative">
                    <div className="col-xl-5 col-lg-5 col-md-5 col-12 slider-main-form-box position-relative ms-2"></div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-12 slider-content-column text-md-start text-center ps-lg-5 ps-md-3 pt-sm-0 pt-4">
                      <div className="slider-box text-sm-start text-center">
                        <h6 className="slide-small-heading">Welcome To NeoHub Coworking</h6>
                        <h1 className="slide-heading-one">Comfortable Coworking Meeting Spaces</h1>
                        <p className="slider-para animated fadeInUp delay-1s">
                          To provide professionals, freelancers, and businesses in Lucknow with a world-class, flexible workspace ecosystem that drives efficiency, collaboration, and innovation.
                        </p>
                        <div className="slider-button-box pt-xl-4 pt-lg-4 pt-md-4 pt-sm-3 pb-3 pt-0 d-sm-flex d-block">
                          <a className="slider-btn btn" href="/spaces"><span>Explore More</span></a>
                        </div>
                      </div>
                      <div className="slide-info">
                        <span className="active-slide">0{i + 1}</span> /0<span className="total-slides">{sliderImages.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slider-inner-bg-image">
                  <img src={img} alt={`NeoHub coworking space slide ${i + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Form */}
        <div className="container slider-form-box-outer mt-md-5 mt-4">
          <div className="col-lg-5 col-md-6 slider-box-shadow-box-shadow">
            <div className="slider-touch-form-box">
              <h3 className="text-center pb-lg-4 pb-2">Start Working at NeoHub Coworking Space</h3>
              <HomeSliderForm />
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="position-relative">
        <div className="container">
          <div className="partners-head-content-box align-self-center text-center">
            <div className="patnerimage-box">
              <div className="owl-carousel">
                {partnerLogos.map((logo, i) => (
                  <div key={i} className="patner-image">
                    <img src={logo.src} alt={logo.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services-sec" className="position-relative">
        <div className="container">
          <div className="col-md-6 col-sm-9 col-11 heading-box m-auto text-center mb-lg-5 mb-4">
            <h6>Our Services</h6>
            <h3 className="about-main-heading align-self-center">Empowering Your Productivity with Our Benefits</h3>
          </div>
          <div className="row">
            {services.map((svc, i) => (
              <div key={i} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 services-content-outer mb-4 aos-init" data-aos="flip-left">
                <div className="service-box-outer">
                  <div className="services-content-box align-self-center text-center">
                    <div className="services-img-box">
                      <img src={svc.icon} className="mx-auto d-block" alt={svc.title} width="400" height="400" />
                    </div>
                    <h5 className="service-title"><a href="#">{svc.title}</a></h5>
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
                  <h6>About Us</h6>
                  <h3 className="about-main-heading">Lucknow&apos;s Premium Destination for High-Performance Teams</h3>
                  <p className="about-paragraph">NeoHub provides custom enterprise suites, hot desks, dedicated workstations, and meeting rooms in Gomti Nagar. Focus entirely on your vision while we handle your operations.</p>
                </div>
                <AboutTabs tabs={aboutTabs} />
                <div className="about-button-box pt-xl-4 pt-lg-4 pt-md-3 pt-3 pb-md-0 pb-4">
                  <a className="about-btn btn" href="/about-us">Explore More</a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 aos-init mb-md-0 mb-5" data-aos="fade-left" style={{ position: "relative" }}>
                <div className="About-image">
                  <div className="about-main-img-one" style={{ visibility: "visible", animationDuration: "2s", animationName: "zoomInUp" }}>
                    <img src="/assets/image_33ea1c1c.png" alt="About NeoHub" />
                  </div>
                  <div className="about-counter-box d-flex">
                    <div className="about-box text-start">
                      <div className="about-icon-img"><img src="/assets/count-img1_7f169963.png" alt="" /></div>
                      <h3 className="about-inner-title"><span className="about-counter-value">17</span><span>+</span></h3>
                      <h5 className="about-inner-paragraph">Locations in city center</h5>
                    </div>
                    <div className="about-box text-start">
                      <div className="about-icon-img"><img src="/assets/count-img2_1b7c2edd.png" alt="" /></div>
                      <h3 className="about-inner-title"><span className="about-counter-value">25</span><span>+</span></h3>
                      <h5 className="about-inner-paragraph">Year Of Experience</h5>
                    </div>
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
            <h6>Our Spaces</h6>
            <h3 className="about-main-heading align-self-center">Empowering Your Productivity with Our Services</h3>
          </div>
          <div className="owl-carousel">
            {spacesCarousel.map((space, i) => (
              <div key={i} className="service-content ms-md-2 ms-sm-0 me-sm-2 me-2">
                <div className="row">
                  <div className="col-lg-4 col-md-6 pe-md-0 mb-2">
                    <div className="service-active-content-box">
                      <div className="service-active-inner-box">
                        <h4 className="pt-2"><a href="#">{space.title}</a></h4>
                        <p className="service-active-text pb-xl-4 pb-2">{space.desc}</p>
                        <div className="spaces-information-outer-box pb-2">
                          {[["Size", "580 Sq Ft"], ["Status", "Available"], ["Bathrooms", "02"], ["Type", "Flat"], ["WiFi", "50 Mb/s"], ["Price", "₹5,999.00"]].map(([label, value], j) => (
                            <div key={j} className="spaces-information">
                              <p className="spaces-information-title">{label}</p>
                              <p className="spaces-information-text">{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="spaces-button-box pt-md-4 pt-4 pb-2">
                          <a className="spaces-btn btn" href="#">Book Now</a>
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
                <h6>Why Choose Us</h6>
                <h3 className="about-main-heading align-self-center">Lucknow&apos;s Premium Destination for High-Performance Teams</h3>
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
                          <div className="why-choose-us-icon-img"><img src={item.icon} alt="" /></div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-9 ps-0 text-start">
                          <div className="why-choose-us-box">
                            <h5 className="why-choose-us-title pb-1">{item.title}</h5>
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
            <h6>Our Pricing</h6>
            <h3 className="about-main-heading align-self-center">Our Pricing plans</h3>
          </div>
          <div className="owl-carousel">
            {[...pricingPlans, ...pricingPlans, ...pricingPlans].map((plan, i) => (
              <div key={i} className="text-center pricing-plans position-relative aos-init" data-aos="flip-up">
                <div className="pricing-plans-outer-box position-relative">
                  <div className="pricing-plans-box">
                    <p className="pricing-plan-tag align-self-center">{plan.tag}</p>
                    <div className="pricing-plan-icon"><img src={plan.icon} alt="" /></div>
                    <h5>{plan.name}</h5>
                    <div className="price-plan">
                      <p className="dollar">₹</p>
                      <h2 className="price">{plan.price}</h2>
                      <p className="monthly align-self-end">/Monthly</p>
                    </div>
                    <div className="pricing-package text-center"><p>{plan.desc}</p></div>
                    <div className="plan-button-box pt-xl-3 pt-lg-4 pt-md-3 pt-3">
                      <a className="plan-btn btn" href="#">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonial" className="position-relative">
        <div className="container pt-xl-5 pb-xl-5">
          <div className="row pb-lg-5 pb-4" style={{ justifyContent: "space-between" }}>
            <div className="col-xl-6 col-lg-6 col-md-6 heading-box text-md-start text-center pe-lg-5">
              <h6>Our Testimonials</h6>
              <h3 className="testimonial-main-heading">What&apos;s Say Clients</h3>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-6 text-md-start text-center align-self-center ps-lg-4">
              <p className="testimonial-main-paragraph align-self-center">
                At NeoHub, we go beyond desks and chairs. We offer a high-performance workspace ecosystem designed to support your operational needs and elevate your client experience.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="our-testimonial-box position-relative pb-lg-4">
                <div className="owl-carousel owl-carousel-box">
                  {testimonials.map((t, i) => (
                    <div key={i} className="testimonial-content-main-box">
                      <div className="testimonial-content-box position-relative">
                        <div className="content-box text-start align-self-center">
                          <div className="testimonial-quote-box d-flex position-relative">
                            <div className="testimonial-client-image">
                              <img width="60" height="60" src={t.image} alt={t.name} />
                            </div>
                            <div className="testimonial-client-content ps-md-2 ps-sm-3 ps-2 align-self-center">
                              <h5 className="testimonial-title-box">{t.name}</h5>
                              <p className="testimonial-contents">{t.role}</p>
                            </div>
                            <div className="testi-rating text-center align-self-center">
                              {Array.from({ length: t.rating }).map((_, j) => (
                                <span key={j}><i className="fas fa-star"></i></span>
                              ))}
                            </div>
                            <div className="quote-img"><QuoteSvg /></div>
                          </div>
                        </div>
                        <div className="testimonial-para-content-box pt-sm-3 pt-1 pe-lg-5 pe-3" style={{ position: "relative" }}>
                          {t.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-bg-outer-box">
          <div className="testimonial-bg-clor"></div>
        </div>
      </section>

      {/* Gallery Promo */}
      <section id="Our_gallery" style={{ position: "relative" }}>
        <div className="container position-relative">
          <div className="col-12 gallery-outer pb-xl-4">
            <div id="gallery">
              <div className="gallery-head-outer-box">
                <div className="gallery-head-box heading-box text-md-start text-center">
                  <h6>Promo</h6>
                  <h3 className="blog-main-heading align-self-center">
                    Join Co-Working Space Today and Elevate Your Work Experience!
                  </h3>
                  <div className="gallery-button-box">
                    <a className="gallery-btn btn mt-lg-4 mt-0" href="#">Book Now</a>
                  </div>
                </div>
              </div>
              {[1, 2, 3, 4, 5].map((n) => (
                <img key={n} src={`/assets/galleryimg${n}_${["3b163f91", "cf31ca9e", "d90d3227", "426fab93", "5319e1bc"][n - 1]}.png`} alt="NeoHub gallery" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section id="blog" className="position-relative">
        <div className="container">
          <div className="row pb-lg-5 pb-4" style={{ justifyContent: "space-between" }}>
            <div className="col-xl-6 col-lg-6 col-md-6 heading-box text-md-start text-center pe-lg-5">
              <h6>News &amp; Blogs</h6>
              <h3 className="blog-main-heading">Our Latest News &amp; Blogs</h3>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-6 text-md-start text-center align-self-center ps-lg-4">
              <p className="blog-main-paragraph align-self-center">
                At NeoHub, we go beyond desks and chairs. We offer a high-performance workspace ecosystem designed to support your operational needs and elevate your client experience.
              </p>
            </div>
          </div>
          <div className="our-blog-box">
            <div className="row blog-content-box">
              <div className="owl-carousel">
                {blogPreviews.map((post, i) => (
                  <div key={i} className="blog-image-box" style={{ position: "relative" }}>
                    <div className="blog-img-box position-relative">
                      <div className="post-img"><img src={post.image} alt={post.title} /></div>
                      <div className="blog-date-admin-box">
                        <a className="date-item align-self-center">
                          <div className="date">{post.date}</div>
                          <div className="month">{post.month}</div>
                        </a>
                      </div>
                    </div>
                    <div className="blog-contents-box text-lg-start text-start">
                      <div className="d-flex justify-content-lg-start justify-content-sm-start justify-content-start">
                        <div className="blog-admin-box">
                          <a style={{ textAlign: "center" }} href="#">
                            <div className="d-flex">
                              <i className="fa fa-user"></i>
                              <span className="ms-2 news-author">By NeoHub Team</span>
                            </div>
                          </a>
                        </div>
                        <div className="post-comments align-self-center ps-3">
                          <i className="fas fa-comments"></i><span className="ms-2">0 Comment</span>
                        </div>
                      </div>
                      <h5 className="pt-2"><a href="#">{post.title}</a></h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
