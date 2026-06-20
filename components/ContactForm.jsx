"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with your backend/API
    setStatus("Thank you! We will get back to you shortly.");
    setFormData({ name: "", email: "", phone: "", subject: "" });
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Contact form" noValidate>
      <div className="row" style={{ gap: "20px 0px", justifyContent: "space-between" }}>
        <div className="col-lg-12 get-box">
          <p>
            <input
              size="40"
              maxLength="400"
              aria-required="true"
              placeholder="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </p>
        </div>
        <div className="col-lg-12 get-box">
          <p>
            <input
              size="40"
              maxLength="400"
              aria-required="true"
              placeholder="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </p>
        </div>
        <div className="col-lg-12 get-box">
          <p>
            <input
              size="40"
              maxLength="400"
              aria-required="true"
              placeholder="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </p>
        </div>
        <div className="col-lg-12 get-box">
          <p>
            <textarea
              cols="40"
              rows="10"
              maxLength="2000"
              aria-required="true"
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </p>
        </div>
        <div className="submit-box d-flex">
          <div className="submit btn">
            <p>
              <input type="submit" value="Send Message" />
            </p>
          </div>
        </div>
      </div>
      {status && (
        <div className="form-status-message" style={{ padding: "10px", marginTop: "10px", color: "#28a745" }}>
          {status}
        </div>
      )}
    </form>
  );
}
