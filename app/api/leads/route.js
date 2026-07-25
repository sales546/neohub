import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

function sanitize(value, max = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function hashIp(ip) {
  if (!ip) return null;
  const salt = process.env.LEAD_IP_HASH_SALT || process.env.NEXT_PUBLIC_SITE_URL || "neohub";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 48);
}

function clientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "";
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
    const honeypot = sanitize(payload.website || payload.company_url || body.honeypot, 200);
    const formStartedAt = sanitize(body.formStartedAt || payload.formStartedAt, 40);
    const sourcePath = sanitize(body.sourcePath || payload.sourcePath, 200);

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Lead service unavailable. Please contact us on WhatsApp." },
        { status: 503 }
      );
    }

    const { data, error } = await supabase.rpc("submit_public_lead", {
      p_type: type || "contact",
      p_name: name,
      p_email: email,
      p_phone: phone,
      p_company: company,
      p_subject: subject,
      p_preferred_date: date,
      p_amenity: amenity,
      p_source_path: sourcePath || null,
      p_ip_hash: hashIp(clientIp(request)),
      p_user_agent: sanitize(request.headers.get("user-agent") || "", 300),
      p_honeypot: honeypot || null,
      p_form_started_at: formStartedAt || null,
    });

    if (error) {
      const message = error.message || "Unable to submit your request.";
      const status = /too many/i.test(message) ? 429 : /required|valid/i.test(message) ? 400 : 400;
      return NextResponse.json({ error: message }, { status });
    }

    if (process.env.LEADS_WEBHOOK_URL && data?.ok) {
      await fetch(process.env.LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type || "contact",
          name,
          email,
          phone,
          company,
          subject,
          date,
          amenity,
          id: data.id,
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => null);
    }

    return NextResponse.json({
      ok: true,
      message: data?.message || "Thank you! Our team will contact you within 24 hours.",
    });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
