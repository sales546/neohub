import { getPublishedTestimonials } from "@/lib/testimonials";
import TestimonialsGrid from "@/components/home/TestimonialsGrid";

export default async function HomeTestimonials() {
  const testimonials = await getPublishedTestimonials();
  if (!testimonials?.length) return null;

  return (
    <section id="testimonial" className="neo-voice" aria-labelledby="neo-voice-heading">
      <div className="container">
        <header className="neo-voice-bar">
          <div className="neo-voice-bar-copy">
            <p className="neo-voice-eyebrow">Member feedback</p>
            <h2 id="neo-voice-heading" className="neo-voice-heading">
              What working at NeoHub feels like
            </h2>
          </div>
          <p className="neo-voice-stat">
            <strong>4.8/5</strong>
            <span>avg. member rating</span>
          </p>
        </header>

        <TestimonialsGrid
          items={testimonials.map((t) => ({
            id: t.id,
            name: t.name,
            role: t.role,
            text: t.text,
            companyLogo: t.companyLogo,
            companyLogoAlt: t.companyLogoAlt,
          }))}
        />
      </div>
    </section>
  );
}
