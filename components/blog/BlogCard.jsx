import Link from "next/link";
import { formatBlogDate } from "@/lib/blog/queries";

export default function BlogCard({ post }) {
  const date = formatBlogDate(post.published_at);

  return (
    <article className="blog-image-box neo-blog-card" style={{ position: "relative" }}>
      <div className="blog-img-box position-relative">
        <Link href={`/blog/${post.slug}`} className="post-img">
          <img
            src={post.cover_image_url || "/assets/blog-covers/neohub-gomti-nagar-hub.jpg"}
            alt={post.cover_image_alt || post.title}
            loading="lazy"
            width={800}
            height={500}
          />
        </Link>
        {date.day ? (
          <div className="blog-date-admin-box">
            <span className="date-item align-self-center">
              <span className="date">{date.day}</span>
              <span className="month">{date.month}</span>
            </span>
          </div>
        ) : null}
      </div>

      <div className="blog-contents-box text-lg-start text-start">
        <div className="d-flex justify-content-lg-start justify-content-sm-start justify-content-start neo-blog-card-meta">
          <div className="blog-admin-box">
            <span className="news-author">By {post.author || "NeoHub Team"}</span>
          </div>
          {post.reading_time_min ? (
            <div className="post-comments align-self-center ps-3">
              <span>{post.reading_time_min} min read</span>
            </div>
          ) : null}
        </div>

        <h2 className="neo-blog-card-title pt-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {post.excerpt ? <p className="neo-blog-card-excerpt">{post.excerpt}</p> : null}

        <Link href={`/blog/${post.slug}`} className="neo-blog-card-link">
          Read article
        </Link>
      </div>
    </article>
  );
}
