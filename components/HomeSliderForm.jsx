"use client";

import { useState } from "react";
import { submitLead, openWhatsAppForLead, formatTourWhatsApp } from "@/lib/submitLead";

export default function HomeSliderForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    date: "",
    email: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");

    try {
      const result = await submitLead({ type: "tour", payload: formData });
      setStatus(result.message);
      openWhatsAppForLead(formatTourWhatsApp(formData));
      setFormData({ name: "", company: "", phone: "", date: "", email: "" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="neo-form" onSubmit={handleSubmit} aria-label="Booking form" noValidate>
      <div className="neo-form-grid neo-form-grid--compact">
        <div className="neo-form-field">
          <label htmlFor="hero-name">Full name</label>
          <input id="hero-name" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="neo-form-field">
          <label htmlFor="hero-company">Company</label>
          <input id="hero-company" type="text" name="company" placeholder="Company name" value={formData.company} onChange={handleChange} />
        </div>
        <div className="neo-form-field">
          <label htmlFor="hero-phone">Phone</label>
          <input id="hero-phone" type="tel" name="phone" inputMode="tel" placeholder="+91 70004 81286" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="neo-form-field">
          <label htmlFor="hero-date">Preferred date</label>
          <input id="hero-date" type="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="neo-form-field neo-form-field--full">
          <label htmlFor="hero-email">Email</label>
          <input id="hero-email" type="email" name="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} />
        </div>
      </div>
      <button type="submit" className="neo-form-submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Now"}
      </button>
      {error ? <div className="form-status-message form-status-message--error" role="alert">{error}</div> : null}
      {status ? <div className="form-status-message" role="status" aria-live="polite">{status}</div> : null}
    </form>
  );
}
