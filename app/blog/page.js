import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { getBlogPosts } from "@/lib/blog/queries";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBlogListSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const revalidate = 300;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://neohubspaces.in";

export const metadata = constructMetadata({
  title: "Coworking Blog & Office Insights",
  description:
    "Practical guides on coworking spaces, private cabins, workstation pricing, and meeting rooms in Gomti Nagar, Lucknow — written for startups and growing teams.",
  canonical: "/blog",
  keywords: [
    "coworking blog lucknow",
    "office space tips gomti nagar",
    "dedicated desk guide",
    "private cabin lucknow",
  ],
});

export default async function BlogPage() {
  const posts = await getBlogPosts({ limit: 24 });

  const listSchema = getBlogListSchema(
    posts.map((post) => ({
      title: post.title,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.published_at,
    }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
  ]);

  return (
    <>
      <JsonLd data={listSchema} />
      <JsonLd data={breadcrumbSchema} />
      <PageBanner title="Blog" breadcrumbLabel="Blog" />

      <div id="full-width-blog" className="neo-blog-list-page">
        <div className="container">
          <div className="neo-blog-list-intro text-center">
            <h1 className="about-main-heading">Coworking insights for Lucknow teams</h1>
            <p>
              Straight answers on workspace types, pricing, meeting rooms, and multi-location seating
              across Gomti Nagar — written for founders, facility managers, and growing companies.
            </p>
          </div>

          <div className="content_page row pt-4 pb-5">
            {posts.map((post) => (
              <div key={post.id || post.slug} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mt-3 mb-3">
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          <div className="text-center pb-5">
            <Link className="hero-secondary-btn" href="/contact" style={{ color: "#0f172a", borderColor: "#e2e8f0" }}>
              Ask NeoHub about workspace options
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
