"use client";

import { useState } from "react";
import HomeSliderForm from "@/components/HomeSliderForm";
import { buildPlanWhatsAppUrl } from "@/lib/siteData";

export default function HomeHero() {
  return (
    <section id="slider" className="home-hero-static">
      <div className="home-hero-bg">
        <img src="/assets/slider1_0fe6417c.jpg" alt="NeoHub coworking space in Gomti Nagar, Lucknow" />
      </div>
      <div className="container home-hero-layout">
        <div className="hero-banner-copy text-md-start text-center">
          <h6 className="slide-small-heading">Premium Coworking · Gomti Nagar, Lucknow</h6>
          <h1 className="slide-heading-one">
            Your Team&apos;s Workspace at Levana Cyber Heights
          </h1>
          <p className="slider-para">
            Private cabins, dedicated desks, and meeting rooms with gigabit fiber, 24/7 access,
            and a professional business address — ready from day one.
          </p>
          <div className="hero-cta-row">
            <a className="slider-btn btn hero-cta-btn" href={buildPlanWhatsAppUrl("workspace tour")}>
              Book a Free Tour
            </a>
            <a className="hero-secondary-btn" href="/spaces">
              View Plans &amp; Spaces
            </a>
          </div>
          <div className="hero-trust-row">
            <span>120+ members</span>
            <span aria-hidden="true">·</span>
            <span>40+ teams hosted</span>
            <span aria-hidden="true">·</span>
            <span>4.8/5 satisfaction</span>
          </div>
        </div>

        <div className="hero-banner-form">
          <div className="slider-touch-form-box neo-form-card">
            <h3>Start Working at NeoHub</h3>
            <p className="neo-form-subtitle">Book a tour — we&apos;ll respond within 24 hours.</p>
            <HomeSliderForm />
          </div>
        </div>
      </div>
    </section>
  );
}
