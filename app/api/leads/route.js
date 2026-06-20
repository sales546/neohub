import { NextResponse } from "next/server";

function sanitize(value, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[+]?[\d\s-]{8,15}$/.test(phone);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const type = sanitize(body.type, 40);
    const payload = body.payload || {};

    const name = sanitize(payload.name, 120);
    const email = sanitize(payload.email, 160);
    const phone = sanitize(payload.phone, 20);
    const company = sanitize(payload.company, 120);
    const subject = sanitize(payload.subject, 1000);
    const date = sanitize(payload.date, 20);
    const amenity = sanitize(payload.amenity, 80);

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!phone || !validatePhone(phone)) {
      return NextResponse.json({ error: "A valid phone number is required." }, { status: 400 });
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const lead = {
      type: type || "contact",
      name,
      email,
      phone,
      company,
      subject,
      date,
      amenity,
      submittedAt: body.submittedAt || new Date().toISOString(),
    };

    // Ready for CRM/email webhook integration via env var
    if (process.env.LEADS_WEBHOOK_URL) {
      await fetch(process.env.LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch(() => null);
    }

    console.info("[NeoHub Lead]", JSON.stringify(lead));

    return NextResponse.json({
      ok: true,
      message: "Thank you! Our team will contact you within 24 hours.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
