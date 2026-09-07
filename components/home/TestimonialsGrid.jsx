"use client";

import { useEffect, useRef, useState } from "react";
import SiteImage from "@/components/SiteImage";

export default function TestimonialsGrid({ items = [] }) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`neo-voice-motion${visible ? " is-visible" : ""}`}
    >
      <ul className="neo-voice-list">
        {items.map((t, index) => (
          <li
            key={t.id || `${t.name}-${index}`}
            className="neo-voice-item"
            style={{ "--neo-voice-i": index }}
          >
            {t.companyLogo ? (
              <div className="neo-voice-logo">
                <SiteImage
                  src={t.companyLogo}
                  alt={t.companyLogoAlt || t.role || ""}
                  width={120}
                  height={36}
                  sizes="120px"
                />
              </div>
            ) : null}

            <blockquote>
              <p>
                <span className="neo-voice-q" aria-hidden="true">
                  &ldquo;
                </span>
                {t.text}
                <span className="neo-voice-q" aria-hidden="true">
                  &rdquo;
                </span>
              </p>
            </blockquote>

            <footer>
              <strong>{t.name}</strong>
              {t.role ? <span>{t.role}</span> : null}
            </footer>
          </li>
        ))}
      </ul>
    </div>
  );
}
