"use client";

import { HighlightText } from "@/components/animate-ui/primitives/texts/highlight";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import { RevealFade, RevealSlide } from "@/components/home/Reveal";

export default function TestimonialsHeader() {
  return (
    <header className="neo-voice-bar">
      <div className="neo-voice-bar-copy">
        <RevealFade>
          <p className="neo-voice-eyebrow">
            <HighlightText
              text="Member feedback"
              inView
              inViewOnce
              transition={{ duration: 0.85, ease: "easeOut" }}
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgba(255,91,46,0.28) 0%, rgba(255,91,46,0.28) 100%)",
                padding: "0 0.12em",
                borderRadius: "2px",
              }}
            />
          </p>
        </RevealFade>
        <RevealSlide delay={80} offset={20}>
          <h2 id="neo-voice-heading" className="neo-voice-heading">
            What working at NeoHub feels like
          </h2>
        </RevealSlide>
      </div>
      <RevealFade delay={120}>
        <p className="neo-voice-stat">
          <strong>
            <CountingNumber
              number={4.8}
              fromNumber={0}
              inView
              inViewOnce
              decimalPlaces={1}
              transition={{ stiffness: 90, damping: 30 }}
            />
            /5
          </strong>
          <span>avg. member rating</span>
        </p>
      </RevealFade>
    </header>
  );
}