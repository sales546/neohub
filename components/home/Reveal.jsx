"use client";

import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slide } from "@/components/animate-ui/primitives/effects/slide";

const softSpring = { type: "spring", stiffness: 120, damping: 22 };

/** Fade-in when scrolled into view. */
export function RevealFade({ children, delay = 0, className, ...props }) {
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
