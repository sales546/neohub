"use client";

import { HighlightText } from "@/components/animate-ui/primitives/texts/highlight";
import { RevealFade, RevealSlide } from "@/components/home/Reveal";

/**
 * Section eyebrow + heading with Animate UI highlight + slide.
 * Drop into legacy heading-box markup.
 */
export default function AnimatedSectionHeading({
  eyebrow,
  title,
  align = "center",
  className = "col-md-6 col-sm-9 col-11 heading-box m-auto text-center mb-lg-5 mb-4",
}) {
  return (
    <div className={className} style={align === "left" ? { margin: 0 } : undefined}>
      {eyebrow ? (
        <RevealFade delay={0}>
          <p className="section-kicker">
            <HighlightText
              text={eyebrow}
              inView
              inViewOnce
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgba(255,91,46,0.28) 0%, rgba(255,91,46,0.28) 100%)",
                padding: "0 0.15em",
                borderRadius: "2px",
              }}
            />
          </p>
        </RevealFade>
      ) : null}
      {title ? (
        <RevealSlide delay={100} offset={22}>
          <h2 className="about-main-heading align-self-center">{title}</h2>
        </RevealSlide>
      ) : null}
    </div>
  );
}
