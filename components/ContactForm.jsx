"use client";

import { useEffect, useState } from "react";
import { submitLead, openWhatsAppForLead, formatTourWhatsApp } from "@/lib/submitLead";
import {
  recordClientSubmission,
  validateEmail,
  validateLeadForm,
  validateName,
  validatePhone,
  validateSubject,
} from "@/lib/formValidation";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  website: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(EMPTY);
  const [formStartedAt, setFormStartedAt] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormStartedAt(new Date().toISOString());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (error) setError("");
    if (status) setStatus("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const validators = {
      name: () => validateName(value),
      phone: () => validatePhone(value),
      email: () => validateEmail(value, { required: true }),
      subject: () => validateSubject(value, { required: true }),
    };
    const message = validators[name]?.() || "";
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    const result = validateLeadForm(formData, { type: "contact", formStartedAt });

    if (result.spamSilent) {
      setStatus("Thank you! Our team will contact you within 24 hours.");
      setFormData(EMPTY);
      setFormStartedAt(new Date().toISOString());
      return;
    }

    if (!result.ok) {
      setFieldErrors(result.errors);
      setError(result.formError || "Please fix the form and try again.");
      return;
    }

    setLoading(true);
    setFieldErrors({});

    try {
      const apiResult = await submitLead({
        type: "contact",
        payload: result.cleaned,
        formStartedAt,
        sourcePath: "/contact",
      });
      recordClientSubmission();
      setStatus(apiResult.message);
      openWhatsAppForLead(formatTourWhatsApp(result.cleaned));
      setFormData(EMPTY);
      setFormStartedAt(new Date().toISOString());
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="neo-form" onSubmit={handleSubmit} aria-label="Contact form" noValidate>
      <div className="neo-form-grid">
        <div className={`neo-form-field${fieldErrors.name ? " neo-form-field--error" : ""}`}>
          <label htmlFor="contact-name">Full name</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            maxLength={80}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
          {fieldErrors.name ? (
            <span id="contact-name-error" className="neo-field-error">{fieldErrors.name}</span>
          ) : null}
        </div>

        <div className={`neo-form-field${fieldErrors.email ? " neo-form-field--error" : ""}`}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            maxLength={160}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          />
          {fieldErrors.email ? (
            <span id="contact-email-error" className="neo-field-error">{fieldErrors.email}</span>
          ) : null}
        </div>

        <div className={`neo-form-field neo-form-field--full${fieldErrors.phone ? " neo-form-field--error" : ""}`}>
          <label htmlFor="contact-phone">Phone</label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            inputMode="tel"
            placeholder="+91 70004 81286"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="tel"
            maxLength={20}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
          />
          {fieldErrors.phone ? (
            <span id="contact-phone-error" className="neo-field-error">{fieldErrors.phone}</span>
          ) : null}
        </div>

        <div className={`neo-form-field neo-form-field--full${fieldErrors.subject ? " neo-form-field--error" : ""}`}>
          <label htmlFor="contact-subject">How can we help?</label>
          <textarea
            id="contact-subject"
            name="subject"
            rows={4}
            placeholder="Tell us about your workspace needs..."
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={1000}
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
          />
          {fieldErrors.subject ? (
            <span id="contact-subject-error" className="neo-field-error">{fieldErrors.subject}</span>
          ) : null}
        </div>

        <div className="neo-hp" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
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
