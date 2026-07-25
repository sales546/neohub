"use client";

import { useEffect, useState } from "react";
import { submitLead, openWhatsAppForLead, formatTourWhatsApp } from "@/lib/submitLead";
import {
  recordClientSubmission,
  validateCompany,
  validateDate,
  validateEmail,
  validateLeadForm,
  validateName,
  validatePhone,
} from "@/lib/formValidation";

const EMPTY = {
  name: "",
  company: "",
  phone: "",
  date: "",
  email: "",
  website: "",
};

export default function HomeSliderForm() {
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
      email: () => validateEmail(value, { required: false }),
      company: () => validateCompany(value),
      date: () => validateDate(value),
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

    const result = validateLeadForm(formData, { type: "tour", formStartedAt });

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
        type: "tour",
        payload: result.cleaned,
        formStartedAt,
        sourcePath: "/",
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

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form className="neo-form" onSubmit={handleSubmit} aria-label="Booking form" noValidate>
      <div className="neo-form-grid neo-form-grid--compact">
        <div className={`neo-form-field${fieldErrors.name ? " neo-form-field--error" : ""}`}>
          <label htmlFor="hero-name">Full name</label>
          <input
            id="hero-name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            maxLength={80}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "hero-name-error" : undefined}
          />
          {fieldErrors.name ? (
            <span id="hero-name-error" className="neo-field-error">{fieldErrors.name}</span>
          ) : null}
        </div>

        <div className={`neo-form-field${fieldErrors.company ? " neo-form-field--error" : ""}`}>
          <label htmlFor="hero-company">Company</label>
          <input
            id="hero-company"
            type="text"
            name="company"
            placeholder="Company name"
            value={formData.company}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="organization"
            maxLength={120}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "hero-company-error" : undefined}
          />
          {fieldErrors.company ? (
            <span id="hero-company-error" className="neo-field-error">{fieldErrors.company}</span>
          ) : null}
        </div>

        <div className={`neo-form-field${fieldErrors.phone ? " neo-form-field--error" : ""}`}>
          <label htmlFor="hero-phone">Phone</label>
          <input
            id="hero-phone"
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
            aria-describedby={fieldErrors.phone ? "hero-phone-error" : undefined}
          />
          {fieldErrors.phone ? (
            <span id="hero-phone-error" className="neo-field-error">{fieldErrors.phone}</span>
          ) : null}
        </div>

        <div className={`neo-form-field${fieldErrors.date ? " neo-form-field--error" : ""}`}>
          <label htmlFor="hero-date">Preferred date</label>
          <input
            id="hero-date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            min={today}
            aria-invalid={Boolean(fieldErrors.date)}
            aria-describedby={fieldErrors.date ? "hero-date-error" : undefined}
          />
          {fieldErrors.date ? (
            <span id="hero-date-error" className="neo-field-error">{fieldErrors.date}</span>
          ) : null}
        </div>

        <div className={`neo-form-field neo-form-field--full${fieldErrors.email ? " neo-form-field--error" : ""}`}>
          <label htmlFor="hero-email">Email <span className="neo-optional">(optional)</span></label>
          <input
            id="hero-email"
            type="email"
            name="email"
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            maxLength={160}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "hero-email-error" : undefined}
          />
          {fieldErrors.email ? (
            <span id="hero-email-error" className="neo-field-error">{fieldErrors.email}</span>
          ) : null}
        </div>

        <div className="neo-hp" aria-hidden="true">
          <label htmlFor="hero-website">Website</label>
          <input
            id="hero-website"
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
        {loading ? "Submitting..." : "Submit Now"}
      </button>
      {error ? <div className="form-status-message form-status-message--error" role="alert">{error}</div> : null}
      {status ? <div className="form-status-message" role="status" aria-live="polite">{status}</div> : null}
    </form>
  );
}
