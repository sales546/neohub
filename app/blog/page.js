import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import BlogInfiniteGrid from "@/components/blog/BlogInfiniteGrid";
import JsonLd from "@/components/seo/JsonLd";
import { getBlogPosts } from "@/lib/blog/queries";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBlogListSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const revalidate = 60;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.neohubspaces.in";

export const metadata = constructMetadata({
  title: "Coworking Blog & Office Insights",
  description:
    "Practical guides on coworking spaces, private cabins, workstation pricing, and meeting rooms in Gomti Nagar, Lucknow — written for startups and growing teams.",
  canonical: "/blog",
  ogSubtitle: "Guides for startups & growing teams in Lucknow",
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
      <PageBanner title="Blog" breadcrumbLabel="Blog" as="p" />

      <div id="full-width-blog" className="neo-blog-list-page">
        <div className="container">
          <div className="neo-blog-list-intro text-center">
            <h1 className="about-main-heading">Coworking insights for Lucknow teams</h1>
            <p>
              Straight answers on workspace types, pricing, meeting rooms, and multi-location seating
              across Gomti Nagar — written for founders, facility managers, and growing companies.
            </p>
          </div>

          <BlogInfiniteGrid posts={posts} />

          <div className="text-center pb-5">
            <Link className="neo-blog-list-cta" href="/contact">
              Ask NeoHub about workspace options
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
