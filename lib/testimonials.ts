import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { testimonials as seedTestimonials } from "@/lib/siteData";

export type Testimonial = {
  id?: string;
  name: string;
  role: string | null;
  text: string;
  image: string | null;
  rating: number;
};

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
        return data as Testimonial[];
      }
    }
  }

  return seedTestimonials.map((t) => ({
    name: t.name,
    role: t.role,
    text: t.text,
    image: t.image,
    rating: t.rating,
  }));
}
