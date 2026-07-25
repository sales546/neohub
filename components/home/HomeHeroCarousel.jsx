"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HomeSliderForm from "@/components/HomeSliderForm";

const SLIDES = [
  "/assets/slider1_0fe6417c.webp",
  "/assets/slider2_72c0b9ec.webp",
  "/assets/slider3_2d262f91.webp",
];

export default function HomeHeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="neo-hero" aria-label="NeoHub hero">
      <div className="neo-hero-media" aria-hidden="true">
        {SLIDES.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            className={index === active ? "is-active" : undefined}
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        ))}
        <div className="neo-hero-overlay" />
      </div>

      <div className="neo-hero-layout">
        <div className="neo-hero-copy">
          <p className="neo-hero-eyebrow">Welcome to NeoHub Coworking</p>
          <h1>NeoHub — Premium Coworking in Gomti Nagar, Lucknow</h1>
          <p className="neo-hero-lead">
            Private cabins, dedicated workstations, and conference rooms across Cyber Heights,
            Bhavya, and Experion — built for startups and growing teams.
          </p>
          <div className="neo-hero-actions">
            <Link href="/spaces" className="neo-hero-btn">
              Explore Spaces
            </Link>
            <a
              href="https://wa.me/917000481286?text=Hi%20NeoHub%2C%20I%20would%20like%20to%20book%20a%20tour"
              target="_blank"
              rel="noopener noreferrer"
              className="neo-hero-btn neo-hero-btn--ghost"
            >
              Book a Tour
            </a>
          </div>
          <div className="neo-hero-dots" role="tablist" aria-label="Hero slides">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={`Show slide ${index + 1}`}
                className={index === active ? "is-active" : undefined}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>

        <div className="neo-hero-form">
          <div className="neo-form-card slider-touch-form-box">
            <h3>Start Working at NeoHub</h3>
            <p className="neo-form-subtitle">Book a tour — we&apos;ll respond within 24 hours.</p>
            <HomeSliderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
