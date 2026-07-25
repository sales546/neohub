import { buildWhatsAppUrl } from "./siteData";
import { validateLeadForm } from "./formValidation";

export async function submitLead({ type, payload, formStartedAt, sourcePath }) {
  // Defense in depth — never send invalid payloads even if a caller skipped UI checks
  const validation = validateLeadForm(payload, { type, formStartedAt });
  if (validation.spamSilent) {
    return {
      ok: true,
      message: "Thank you! Our team will contact you within 24 hours.",
    };
  }
  if (!validation.ok) {
    const firstFieldError = Object.values(validation.errors || {})[0];
    throw new Error(validation.formError || firstFieldError || "Invalid form data.");
  }

  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      payload: validation.cleaned,
      formStartedAt: formStartedAt || null,
      sourcePath: sourcePath || (typeof window !== "undefined" ? window.location.pathname : null),
      submittedAt: new Date().toISOString(),
    }),
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
