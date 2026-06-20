import { trustStats } from "@/lib/siteData";

export default function HomeStats() {
  return (
    <section id="counter-sec" className="home-section home-section--muted">
      <div className="container">
        <div className="section-heading text-center">
          <h6>NeoHub at a Glance</h6>
          <h3 className="about-main-heading">Built for high-performance teams in Lucknow</h3>
        </div>
        <div className="counter-stats-grid">
          {trustStats.map((stat) => (
            <div key={stat.label} className="counter-outer-box">
              <div className="counter-stat-inner">
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
    </section>
  );
}
