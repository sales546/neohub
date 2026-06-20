import { testimonials } from "@/lib/siteData";

export default function HomeTestimonials() {
  return (
    <section id="testimonial" className="home-section home-section--muted">
      <div className="container">
        <div className="section-heading text-center">
          <h6>Testimonials</h6>
          <h3 className="testimonial-main-heading">Trusted by teams across Lucknow</h3>
          <p className="section-lead">
            Rated 4.8/5 by members for connectivity, hospitality, and professional meeting spaces.
          </p>
        </div>
        <div className="home-testimonial-grid">
          {testimonials.map((t) => (
            <article key={t.name} className="testimonial-content-main-box home-testimonial-card">
              <div className="home-testimonial-head">
                <img width="56" height="56" src={t.image} alt={t.name} />
                <div>
                  <h5 className="testimonial-title-box">{t.name}</h5>
                  <p className="testimonial-contents">{t.role}</p>
                </div>
                <div className="testi-rating" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}><i className="fas fa-star" aria-hidden="true"></i></span>
                  ))}
                </div>
              </div>
              <p className="testimonial-para-content-box">{t.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
