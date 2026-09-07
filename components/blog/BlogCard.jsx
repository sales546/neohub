import Link from "next/link";
import { formatBlogDate } from "@/lib/blog/format-date";
import SiteImage from "@/components/SiteImage";

export default function BlogCard({
  post,
  compact = false,
  titleAs: TitleTag = "h2",
  preload = false,
}) {
  const date = formatBlogDate(post.published_at);

  return (
    <article className={`blog-image-box neo-blog-card${compact ? " neo-blog-card--compact" : ""}`}>
      <div className="blog-img-box">
        <Link href={`/blog/${post.slug}`} className="post-img">
          <SiteImage
            src={post.cover_image_url || "/assets/blog-covers/neohub-gomti-nagar-hub.webp"}
            alt={post.cover_image_alt || post.title}
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, 400px"
            preload={preload}
            loading={preload ? undefined : "lazy"}
            decoding="async"
          />
        </Link>
        {date.day ? (
          <div className="blog-date-admin-box">
            <span className="date-item">
              <span className="date">{date.day}</span>
              <span className="month">{date.month}</span>
            </span>
          </div>
        ) : null}
      </div>

      <div className="blog-contents-box">
        <div className="neo-blog-card-meta">
          <span className="news-author">By {post.author || "NeoHub Team"}</span>
          {post.reading_time_min ? (
            <span className="neo-blog-card-readtime">{post.reading_time_min} min read</span>
          ) : null}
        </div>

        <TitleTag className="neo-blog-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </TitleTag>

        {!compact && post.excerpt ? <p className="neo-blog-card-excerpt">{post.excerpt}</p> : null}

        <Link href={`/blog/${post.slug}`} className="neo-blog-card-link">
          Read article
        </Link>
      </div>
    </article>
  );
}
