import Link from "next/link";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Page not found",
  description: "The page you requested is not available on NeoHub. Explore coworking spaces, pricing, or contact us in Gomti Nagar, Lucknow.",
  canonical: "/404",
  noIndex: true,
  absoluteTitle: false,
});

export default function NotFound() {
  return (
    <section className="seo-page" style={{ padding: "80px 0 100px" }}>
      <div className="container seo-page-inner" style={{ textAlign: "center", maxWidth: 640 }}>
        <p style={{ color: "#ff5b2e", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          404
        </p>
        <h1 style={{ marginBottom: 12 }}>This page isn’t available</h1>
        <p className="seo-lead" style={{ margin: "0 auto 28px" }}>
          The link may be outdated. Explore NeoHub coworking in Gomti Nagar, or book a tour with our team.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <Link href="/" className="neo-form-submit" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link href="/spaces" className="neo-form-submit" style={{ textDecoration: "none", background: "#0f172a" }}>
            Spaces & pricing
          </Link>
          <Link href="/contact" className="neo-form-submit" style={{ textDecoration: "none", background: "#334155" }}>
            Contact / book tour
          </Link>
        </div>
      </div>
    </section>
  );
}
