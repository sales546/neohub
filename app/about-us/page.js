import PageBanner from "@/components/PageBanner";
import AboutTabs from "@/components/AboutTabs";
import { trustStats, aboutHighlights } from "@/lib/siteData";

export const metadata = {
  title: "About Us | NeoHub Coworking Space Gomti Nagar Lucknow",
  description: "Learn about the mission, vision, and core values of NeoHub Lucknow. We are dedicated to providing the best flexible workspace solutions at Levana Cyber Heights.",
};

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

const tabsData = [
  {
    title: "Our Mission",
    content: "To provide professionals, freelancers, and businesses in Lucknow with a world-class, flexible workspace ecosystem that drives efficiency, collaboration, and innovation.",
  },
  {
    title: "Our Vision",
    content: "To build Uttar Pradesh's most dynamic business network by connecting ambitious local entrepreneurs and scaling businesses in a premier environment.",
  },
  {
    title: "Our Commitment",
    content: "We are committed to delivering 100% operational uptime, lightning-fast redundant internet connectivity, premium meeting environments, and top-tier hospitality.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" />

      <div className="about-page">
        <section id="about-sec" className="position-relative" style={{ backgroundSize: "100% 100%", backgroundPosition: "bottom" }}>
          <div className="container">
            <div className="our-about-box text-md-start text-center">
              <div className="row">
                <div className="col-md-6 align-self-center text-md-start text-center pe-lg-5 pe-md-2 aos-init" data-aos="fade-right">
                  <div className="col-md-12 col-sm-9 col-11 heading-box m-auto pb-2">
                    <h6>About Us</h6>
                    <h3 className="about-main-heading">
                      Discover Our Mission to Create Innovative and Inspiring Workspaces
                    </h3>
                    <p className="about-paragraph">
                      NeoHub provides custom enterprise suites, hot desks, dedicated workstations, and meeting rooms in Gomti Nagar. Focus entirely on your vision while we handle your operations.
                    </p>
                  </div>

                  <AboutTabs tabs={tabsData} />

                  <div className="about-button-box pt-xl-4 pt-lg-4 pt-md-3 pt-3 pb-md-0 pb-4">
                    <a className="about-btn btn" href="/about-us">
                      Explore More
                    </a>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 aos-init mb-md-0 mb-5" data-aos="fade-left" style={{ position: "relative" }}>
                  <div className="About-image">
                    <div className="about-main-img-one" style={{ visibility: "visible", animationDuration: "2s", animationName: "zoomInUp" }}>
                      <img src="/assets/image_33ea1c1c.png" alt="About NeoHub" />
                    </div>

                    <div className="about-counter-box d-flex">
                      {aboutHighlights.map((item) => (
                        <div key={item.label} className="about-box text-start">
                          <h3 className="about-inner-title">
                            <span className="about-counter-value">{item.value}</span>
                            <span>{item.suffix}</span>
                          </h3>
                          <h5 className="about-inner-paragraph">{item.label}</h5>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="counter-sec" className="position-relative">
          <div className="container">
            <div className="our-counter-box text-md-start text-center">
              <div className="counter-stats-grid">
                {counterStats.map((stat, index) => (
                  <div key={index} className="counter-outer-box aos-init" data-aos="flip-left">
                    <div className="counter-stat-inner">
                      <div className="counter-icon-img">
                        <img src={stat.icon} alt={stat.label} />
                      </div>
                      <div className="counter-box">
                        <h3>
                          <span className="counter-value">{stat.value}</span>
                          <span>{stat.suffix}</span>
                        </h3>
                        <p className="counter-title">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
