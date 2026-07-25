import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import BlogPostBody from "@/components/blog/BlogPostBody";
import BlogCard from "@/components/blog/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import {
  formatBlogDate,
  getAllBlogSlugs,
  getBlogPostBySlug,
  getBlogPosts,
  htmlToPlainText,
} from "@/lib/blog/queries";
import { getBlogPostingSchema, getBreadcrumbSchema, getFAQPageSchema } from "@/lib/seo/schema";
import { BASE_URL, buildOgImageUrl, constructMetadata } from "@/lib/seo/metadata";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function extractFaqs(html: string) {
  const faqs: Array<{ question: string; answer: string }> = [];
  const regex = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const question = htmlToPlainText(match[1], 200);
    const answer = htmlToPlainText(match[2], 400);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs.slice(0, 6);
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return constructMetadata({
      title: "Blog post not found",
      description: "This NeoHub blog article could not be found.",
      canonical: `/blog/${slug}`,
      noIndex: true,
    });
  }

  const title = post.meta_title || post.title;
  const description =
    post.meta_description || post.excerpt || htmlToPlainText(post.body_html, 155);
  const cover = post.og_image_url || post.cover_image_url;
  const canonicalPath = post.canonical_url || `/blog/${post.slug}`;
  const ogImage =
    cover ||
    buildOgImageUrl(title, post.excerpt || "NeoHub coworking insights · Lucknow");

  const canonical =
    canonicalPath.startsWith("http") && !canonicalPath.startsWith(BASE_URL)
      ? `/blog/${post.slug}`
      : canonicalPath.replace(BASE_URL, "") || `/blog/${post.slug}`;

  return constructMetadata({
    title,
    description,
    canonical,
    absoluteTitle: true,
    ogImage,
    ogSubtitle: post.excerpt || "NeoHub coworking insights · Lucknow",
    ogType: "article",
    noIndex: Boolean(post.noindex),
    keywords: post.tags || [],
    publishedTime: post.published_at || undefined,
    modifiedTime: post.updated_at || undefined,
    authors: [post.author || "NeoHub Team"],
    imageAlt: post.cover_image_alt || post.title,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = (await getBlogPosts({ limit: 4 })).filter((p) => p.slug !== post.slug).slice(0, 3);
  const date = formatBlogDate(post.published_at);
  const description =
    post.meta_description || post.excerpt || htmlToPlainText(post.body_html, 155);
  const image = post.og_image_url || post.cover_image_url;
  const postUrl = `${BASE_URL}/blog/${post.slug}`;
  const faqs = extractFaqs(post.body_html);

  return (
    <>
      <JsonLd
        data={getBlogPostingSchema({
          title: post.title,
          description,
          url: postUrl,
          image,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          author: post.author,
          keywords: post.tags,
          articleSection: post.categories,
        })}
      />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: post.title, item: `/blog/${post.slug}` },
        ])}
      />
      {faqs.length ? <JsonLd data={getFAQPageSchema(faqs)} /> : null}

      <PageBanner title="Blog" breadcrumbLabel="Article" />

      <article className="neo-blog-detail">
        <div className="container">
          <div className="neo-blog-detail-grid">
            <div className="neo-blog-detail-main">
              <p className="neo-blog-kicker">
                <Link href="/blog">Blog</Link>
                {post.categories?.[0] ? <span> / {post.categories[0]}</span> : null}
              </p>
              <h1>{post.title}</h1>
              <div className="neo-blog-detail-meta">
                <span>By {post.author || "NeoHub Team"}</span>
                {date.full ? <span>{date.full}</span> : null}
                {post.reading_time_min ? <span>{post.reading_time_min} min read</span> : null}
              </div>

              {post.cover_image_url ? (
                <figure className="neo-blog-cover">
                  <img
                    src={post.cover_image_url}
                    alt={post.cover_image_alt || post.title}
                  />
                </figure>
              ) : null}

              {post.excerpt ? <p className="neo-blog-lead">{post.excerpt}</p> : null}

              <BlogPostBody html={post.body_html} />

              <div className="neo-blog-cta">
                <h2>Ready to see NeoHub in person?</h2>
                <p>Tour Cyber Heights, Bhavya Corporate Tower, or Experion and get current seat availability.</p>
                <div className="neo-blog-cta-actions">
                  <Link className="slider-btn btn" href="/contact">
                    <span>Book a tour</span>
                  </Link>
                  <a
                    className="hero-secondary-btn"
                    href="https://wa.me/917000481286?text=Hi%20NeoHub%2C%20I%20read%20your%20blog%20and%20want%20workspace%20options."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0f172a", borderColor: "#e2e8f0" }}
                  >
                    WhatsApp NeoHub
                  </a>
                </div>
              </div>
            </div>

            <aside className="neo-blog-sidebar">
              <div className="neo-blog-sidebar-card">
                <h3>Need seats this month?</h3>
                <p>Workstations from ₹5,500/mo + GST. Cabins from ₹20,000/mo + GST. Conference from ₹500/hr.</p>
                <Link href="/contact" className="neo-blog-card-link">
                  Get a quote
                </Link>
              </div>

              {related.length ? (
                <div className="neo-blog-sidebar-card">
                  <h3>Related articles</h3>
                  <ul className="neo-blog-related-list">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>

          {related.length ? (
            <section className="neo-blog-more">
              <h2>More from NeoHub</h2>
              <div className="row">
                {related.map((item) => (
                  <div key={item.slug} className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mt-3 mb-3">
                    <BlogCard post={item} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
