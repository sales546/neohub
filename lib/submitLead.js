import { buildWhatsAppUrl } from "./siteData";

export async function submitLead({ type, payload }) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, payload, submittedAt: new Date().toISOString() }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Unable to submit your request. Please try WhatsApp.");
  }

  return data;
}

export function openWhatsAppForLead(message) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

export function formatTourWhatsApp(formData) {
  return [
    "Hi NeoHub, I would like to book a workspace tour.",
    `Name: ${formData.name}`,
    formData.company ? `Company: ${formData.company}` : null,
    `Phone: ${formData.phone}`,
    formData.email ? `Email: ${formData.email}` : null,
    formData.date ? `Preferred date: ${formData.date}` : null,
    formData.amenity ? `Interested in: ${formData.amenity}` : null,
    formData.subject ? `Message: ${formData.subject}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
