"use client";

import { useState } from "react";
import { submitLead, openWhatsAppForLead, formatTourWhatsApp } from "@/lib/submitLead";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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
      const result = await submitLead({ type: "contact", payload: formData });
      setStatus(result.message);
      openWhatsAppForLead(formatTourWhatsApp(formData));
      setFormData({ name: "", email: "", phone: "", subject: "" });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="neo-form" onSubmit={handleSubmit} aria-label="Contact form" noValidate>
      <div className="neo-form-grid">
        <div className="neo-form-field">
          <label htmlFor="contact-name">Full name</label>
          <input id="contact-name" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="neo-form-field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" name="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="neo-form-field neo-form-field--full">
          <label htmlFor="contact-phone">Phone</label>
          <input id="contact-phone" type="tel" name="phone" inputMode="tel" placeholder="+91 70004 81286" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="neo-form-field neo-form-field--full">
          <label htmlFor="contact-subject">How can we help?</label>
          <textarea id="contact-subject" name="subject" rows={4} placeholder="Tell us about your workspace needs..." value={formData.subject} onChange={handleChange} required />
        </div>
      </div>
      <button type="submit" className="neo-form-submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>
      <p className="neo-form-privacy">
        By submitting, you agree to our <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      {error ? <div className="form-status-message form-status-message--error" role="alert">{error}</div> : null}
      {status ? <div className="form-status-message" role="status" aria-live="polite">{status}</div> : null}
    </form>
  );
}
