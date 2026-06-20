"use client";

import { useState } from "react";

const amenityOptions = [
  "Fast Internet",
  "24 Hr Access",
  "HD Projector",
  "Cleaning Services",
  "Car Parking",
  "Office Equipment",
  "Personal Lockers",
  "Coffee Machine",
];

export default function HomeSliderForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    date: "",
    email: "",
    amenity: "Fast Internet",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Thank you! We will contact you shortly.");
    setFormData({ name: "", company: "", phone: "", date: "", email: "", amenity: "Fast Internet" });
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Booking form" noValidate>
      <div className="row slider-form-box" style={{ gap: "10px 0px", justifyContent: "space-between" }}>
        <div className="col-lg-6 get-box">
          <p><input size="40" maxLength="400" aria-required="true" placeholder="Name" type="text" name="name" value={formData.name} onChange={handleChange} required /></p>
        </div>
        <div className="col-lg-6 get-box">
          <p><input size="40" maxLength="400" aria-required="true" placeholder="Company Name" type="text" name="company" value={formData.company} onChange={handleChange} required /></p>
        </div>
        <div className="col-lg-6 get-box">
          <p><input size="40" maxLength="400" aria-required="true" placeholder="Phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></p>
        </div>
        <div className="col-lg-6 get-box">
          <p><input aria-required="true" placeholder="Date" type="date" name="date" value={formData.date} onChange={handleChange} required /></p>
        </div>
        <div className="col-lg-12 get-box">
          <p><input size="40" maxLength="400" aria-required="true" placeholder="Mail Address" type="email" name="email" value={formData.email} onChange={handleChange} required /></p>
        </div>
        <div className="col-lg-12 get-box">
          <p>
            <select aria-required="true" name="amenity" value={formData.amenity} onChange={handleChange}>
              {amenityOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </p>
        </div>
        <div className="submit-box d-flex pt-2">
          <div className="submit btn">
            <p><input type="submit" value="Submit Now" /></p>
          </div>
        </div>
      </div>
      {status && (
        <div style={{ padding: "10px", marginTop: "10px", color: "#28a745", textAlign: "center" }}>{status}</div>
      )}
    </form>
  );
}
