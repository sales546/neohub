"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BlogCard from "@/components/blog/BlogCard";

const PAGE_SIZE = 12;

export default function BlogInfiniteGrid({ posts = [] }) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(PAGE_SIZE, posts.length)
  );
  const sentinelRef = useRef(null);
  const hasMore = visibleCount < posts.length;

  const loadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + PAGE_SIZE, posts.length));
  }, [posts.length]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { root: null, rootMargin: "480px 0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, loadMore, visibleCount]);

  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      <div className="neo-blog-grid">
        {visiblePosts.map((post, index) => (
          <BlogCard
            key={post.id || post.slug}
            post={post}
            preload={index === 0}
          />
        ))}
      </div>

      <div className="neo-blog-load-more">
        <p className="sr-only" role="status" aria-live="polite">
          {hasMore
            ? `Showing ${visibleCount} of ${posts.length} articles`
            : `Showing all ${posts.length} articles`}
        </p>
        {hasMore ? (
          <>
            <div
              ref={sentinelRef}
              className="neo-blog-load-more-sentinel"
              aria-hidden="true"
            />
            <button type="button" className="neo-btn-outline" onClick={loadMore}>
              Load more articles
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}
