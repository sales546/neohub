"use client";

import { useEffect, useState } from "react";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slide } from "@/components/animate-ui/primitives/effects/slide";

const softSpring = { type: "tween", duration: 0.42, ease: [0.16, 1, 0.3, 1] };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/** Fade-in when scrolled into view. */
export function RevealFade({ children, delay = 0, className, ...props }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <Fade
      inView
      inViewOnce
      inViewMargin="-40px"
      delay={delay}
      transition={softSpring}
      className={className}
      {...props}
    >
      {children}
    </Fade>
  );
}

/** Slide + fade-style entrance (Animate UI Slide). */
export function RevealSlide({
  children,
  delay = 0,
  direction = "up",
  offset = 28,
  className,
  ...props
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <Slide
      inView
      inViewOnce
      inViewMargin="-40px"
      delay={delay}
      direction={direction}
      offset={offset}
      transition={softSpring}
      className={className}
      {...props}
    >
      {children}
    </Slide>
  );
}
