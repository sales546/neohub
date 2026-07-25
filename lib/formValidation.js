const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const NAME_RE = /^[a-zA-Z][a-zA-Z .'-]{1,79}$/;
const LINK_RE = /(https?:\/\/|www\.|<script|\[url=|javascript:)/i;
const REPEATED_RE = /(.)\1{6,}/;
const DISPOSABLE_EMAIL_RE =
  /@(mailinator|guerrillamail|tempmail|10minutemail|yopmail|trashmail|sharklasers|discard\.email)\./i;

const RATE_KEY = "neohub_lead_submits_v1";
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 3;
const MIN_FORM_SECONDS = 3;

export function digitsOnly(value = "") {
  return String(value).replace(/\D/g, "");
}

export function normalizePhone(value = "") {
  return String(value).trim().replace(/[^\d+\s()-]/g, "");
}

function trim(value, max) {
  const text = typeof value === "string" ? value.trim() : "";
  return max ? text.slice(0, max) : text;
}

function isPastDate(isoDate) {
  if (!isoDate) return false;
  const selected = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(selected.getTime())) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today;
}

function isTooFarDate(isoDate) {
  if (!isoDate) return false;
  const selected = new Date(`${isoDate}T00:00:00`);
  const limit = new Date();
  limit.setHours(0, 0, 0, 0);
  limit.setFullYear(limit.getFullYear() + 1);
  return selected > limit;
}

export function validateName(value) {
  const name = trim(value, 80);
  if (!name) return "Please enter your full name.";
  if (name.length < 2) return "Name must be at least 2 characters.";
  if (LINK_RE.test(name) || REPEATED_RE.test(name)) return "Please enter a valid name.";
  if (!NAME_RE.test(name)) return "Use letters only in your name (spaces and . ' - allowed).";
  return "";
}

export function validatePhone(value) {
  const phone = normalizePhone(value);
  const digits = digitsOnly(phone);
  if (!digits) return "Please enter your phone number.";
  if (digits.length < 10) return "Enter a valid 10-digit mobile number.";
  if (digits.length > 15) return "Phone number is too long.";
  // Prefer Indian mobiles: 10 digits starting 6–9, or 91 + 10 digits
  if (digits.length === 10 && !/^[6-9]\d{9}$/.test(digits)) {
    return "Enter a valid Indian mobile number.";
  }
  if (digits.length === 12 && digits.startsWith("91") && !/^91[6-9]\d{9}$/.test(digits)) {
    return "Enter a valid Indian mobile number.";
  }
  if (digits.length === 11 && digits.startsWith("0") && !/^0[6-9]\d{9}$/.test(digits)) {
    return "Enter a valid Indian mobile number.";
  }
  if (![10, 11, 12, 13].includes(digits.length) && digits.length < 10) {
    return "Enter a valid phone number.";
  }
  return "";
}

export function validateEmail(value, { required = false } = {}) {
  const email = trim(value, 160).toLowerCase();
  if (!email) return required ? "Please enter your email address." : "";
  if (!EMAIL_RE.test(email)) return "Please enter a valid email address.";
  if (DISPOSABLE_EMAIL_RE.test(email)) return "Please use a work or personal email address.";
  if (email.length > 160) return "Email address is too long.";
  return "";
}

export function validateCompany(value) {
  const company = trim(value, 120);
  if (!company) return "";
  if (LINK_RE.test(company) || REPEATED_RE.test(company)) {
    return "Please enter a valid company name (no links).";
  }
  if (company.length < 2) return "Company name is too short.";
  return "";
}

export function validateSubject(value, { required = true } = {}) {
  const subject = trim(value, 1000);
  if (!subject) return required ? "Please tell us how we can help." : "";
  if (subject.length < 10) return "Please write at least 10 characters.";
  if (LINK_RE.test(subject)) return "Links are not allowed in the message.";
  if (REPEATED_RE.test(subject)) return "Please enter a clearer message.";
  const words = subject.split(/\s+/).filter(Boolean);
  if (words.length < 2) return "Please add a bit more detail about your requirement.";
  return "";
}

export function validateDate(value) {
  const date = trim(value, 20);
  if (!date) return "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Please choose a valid date.";
  if (isPastDate(date)) return "Preferred date cannot be in the past.";
  if (isTooFarDate(date)) return "Please choose a date within the next 12 months.";
  return "";
}

export function isHoneypotFilled(payload = {}) {
  const traps = [payload.website, payload.company_url, payload.url, payload.fax];
  return traps.some((v) => typeof v === "string" && v.trim() !== "");
}

export function isSubmittedTooFast(formStartedAt, minSeconds = MIN_FORM_SECONDS) {
  if (!formStartedAt) return true;
  const started = Date.parse(formStartedAt);
  if (Number.isNaN(started)) return true;
  return Date.now() - started < minSeconds * 1000;
}

export function getClientSubmitCount() {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(RATE_KEY);
    if (!raw) return 0;
    const stamps = JSON.parse(raw).filter((t) => Date.now() - t < RATE_WINDOW_MS);
    return stamps.length;
  } catch {
    return 0;
  }
}

export function isClientRateLimited() {
  return getClientSubmitCount() >= RATE_MAX;
}

export function recordClientSubmission() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(RATE_KEY);
    const stamps = (raw ? JSON.parse(raw) : []).filter((t) => Date.now() - t < RATE_WINDOW_MS);
    stamps.push(Date.now());
    window.localStorage.setItem(RATE_KEY, JSON.stringify(stamps));
  } catch {
    // ignore storage failures
  }
}

/**
 * Validate public lead forms (tour / contact).
 * @returns {{ ok: boolean, errors: Record<string,string>, formError?: string, spamSilent?: boolean, cleaned?: object }}
 */
export function validateLeadForm(payload, { type = "contact", formStartedAt } = {}) {
  const errors = {};
  const name = trim(payload.name, 80);
  const email = trim(payload.email, 160).toLowerCase();
  const phone = normalizePhone(payload.phone);
  const company = trim(payload.company, 120);
  const subject = trim(payload.subject, 1000);
  const date = trim(payload.date, 20);
  const amenity = trim(payload.amenity, 80);

  // Silent spam path — honeypot filled
  if (isHoneypotFilled(payload)) {
    return { ok: false, errors: {}, spamSilent: true };
  }

  if (isClientRateLimited()) {
    return {
      ok: false,
      errors: {},
      formError: "Too many requests from this browser. Please try WhatsApp or call us.",
    };
  }

  if (isSubmittedTooFast(formStartedAt)) {
    return {
      ok: false,
      errors: {},
      formError: "Please take a moment to complete the form before submitting.",
    };
  }

  const nameErr = validateName(name);
  if (nameErr) errors.name = nameErr;

  const phoneErr = validatePhone(phone);
  if (phoneErr) errors.phone = phoneErr;

  const emailRequired = type === "contact";
  const emailErr = validateEmail(email, { required: emailRequired });
  if (emailErr) errors.email = emailErr;

  const companyErr = validateCompany(company);
  if (companyErr) errors.company = companyErr;

  if (type === "contact") {
    const subjectErr = validateSubject(subject, { required: true });
    if (subjectErr) errors.subject = subjectErr;
  } else {
    const subjectErr = validateSubject(subject, { required: false });
    if (subjectErr) errors.subject = subjectErr;
  }

  const dateErr = validateDate(date);
  if (dateErr) errors.date = dateErr;

  if (amenity && LINK_RE.test(amenity)) {
    errors.amenity = "Please choose a valid option.";
  }

  if (Object.keys(errors).length) {
    return {
      ok: false,
      errors,
      formError: "Please fix the highlighted fields and try again.",
    };
  }

  return {
    ok: true,
    errors: {},
    cleaned: {
      name,
      email: email || "",
      phone,
      company,
      subject,
      date,
      amenity,
      website: "",
    },
  };
}

export function validateAdminLogin({ email, password }) {
  const errors = {};
  const emailErr = validateEmail(email, { required: true });
  if (emailErr) errors.email = emailErr;
  const pass = typeof password === "string" ? password : "";
  if (!pass) errors.password = "Please enter your password.";
  else if (pass.length < 8) errors.password = "Password must be at least 8 characters.";
  return {
    ok: Object.keys(errors).length === 0,
    errors,
    formError: Object.keys(errors).length ? "Please fix the highlighted fields." : "",
  };
}

export function fieldClass(base, hasError) {
  return hasError ? `${base} neo-form-field--error` : base;
}
