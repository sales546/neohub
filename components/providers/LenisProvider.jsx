"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

/**
 * Site-wide Lenis smooth scroll for public pages.
 * Skips when prefers-reduced-motion is set.
 * Nested horizontal carousels (Owl) are excluded via prevent().
 */
export default function LenisProvider({ children, options }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) {
    return children;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: true,
        anchors: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        prevent: (node) =>
          Boolean(
            node.closest(
              ".owl-carousel, .owl-stage-outer, .owl-stage, [data-lenis-prevent], .modal, .offcanvas"
            )
          ),
        ...options,
      }}
    >
      {children}
    </ReactLenis>
  );
}
