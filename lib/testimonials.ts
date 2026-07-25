import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { partnerLogos, testimonials as seedTestimonials } from "@/lib/siteData";

export type Testimonial = {
  id?: string;
  name: string;
  role: string | null;
  text: string;
  image: string | null;
  rating: number;
  companyLogo?: string | null;
  companyLogoAlt?: string | null;
};

function normalizeCompany(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Extra aliases → logo path (tight crops / dummy marks). */
const LOGO_ALIASES: Record<string, { src: string; alt: string }> = {
  infoedge: {
    src: "/assets/clients/infoedge-tight.png",
    alt: "Infoedge",
  },
  "eka mobility": {
    src: "/assets/clients/eka-mobility-tight.png",
    alt: "EKA Mobility",
  },
  eka: {
    src: "/assets/clients/eka-mobility-tight.png",
    alt: "EKA Mobility",
  },
  "startup founder": {
    src: "/assets/clients/startup-studio.png",
    alt: "Startup Studio",
  },
  startup: {
    src: "/assets/clients/startup-studio.png",
    alt: "Startup Studio",
  },
  "startup studio": {
    src: "/assets/clients/startup-studio.png",
    alt: "Startup Studio",
  },
};

/** Match testimonial company/role to a known client logo. */
export function resolveCompanyLogo(role?: string | null) {
  if (!role) return null;
  const needle = normalizeCompany(role);
  if (!needle) return null;

  if (LOGO_ALIASES[needle]) return LOGO_ALIASES[needle];

  const match = partnerLogos.find((logo) => {
    const name = normalizeCompany(logo.name);
    const alt = normalizeCompany(logo.alt);
    return (
      name === needle ||
      alt === needle ||
      name.includes(needle) ||
      needle.includes(name) ||
      alt.includes(needle) ||
      needle.includes(alt)
    );
  });

  if (!match) return null;
  return { src: match.src, alt: match.alt || match.name };
}

function withCompanyLogo(t: Testimonial): Testimonial {
  const logo = resolveCompanyLogo(t.role);
  return {
    ...t,
    companyLogo: logo?.src || null,
    companyLogoAlt: logo?.alt || t.role || null,
  };
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, role, text, image, rating")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!error && data?.length) {
        return (data as Testimonial[]).map(withCompanyLogo);
      }
    }
  }

  return seedTestimonials.map((t) =>
    withCompanyLogo({
      name: t.name,
      role: t.role,
      text: t.text,
      image: t.image,
      rating: t.rating,
    })
  );
}
