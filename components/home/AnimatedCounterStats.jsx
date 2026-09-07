"use client";

import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import { RevealSlide } from "@/components/home/Reveal";

function parseStatValue(value) {
  const n = Number.parseFloat(String(value).replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function AnimatedCounterStats({ stats = [], icons = [] }) {
  return (
    <div className="owl-carousel">
      {stats.map((stat, i) => {
        const number = parseStatValue(stat.value);
        const decimals = String(stat.value).includes(".") ? 1 : 0;

        return (
          <div key={stat.label || i} className="counter-outer-box">
            <RevealSlide delay={i * 80} offset={20}>
              <div className="row" style={{ justifyContent: "center" }}>
                <div
                  className="col-md-2 col-sm-2 col-2 align-self-center"
                  style={{ width: "fit-content" }}
                >
                  <div className="counter-icon-img">
                    <img
                      src={icons[i] || icons[0]}
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="col-md-8 col-sm-7 col-7 ps-0">
                  <div className="counter-box">
                    <h3>
                      <span className="counter-value">
                        <CountingNumber
                          number={number}
                          fromNumber={0}
                          inView
                          inViewOnce
                          decimalPlaces={decimals}
                          transition={{ stiffness: 80, damping: 28 }}
                        />
                      </span>
                      <span>{stat.suffix}</span>
                    </h3>
                    <p className="counter-title">{stat.label}</p>
                  </div>
                </div>
              </div>
            </RevealSlide>
          </div>
        );
      })}
    </div>
  );
}
