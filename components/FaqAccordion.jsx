"use client";

import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div id="accordion">
      <div className="accordion" id="accordionExample">
        {items.map((item, index) => (
          <div className="accordion-item" key={index}>
            <div className="accordion-header" id={`heading${index}`}>
              <a
                className={`accordion-button${openIndex !== index ? " collapsed" : ""}`}
                role="button"
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
                aria-controls={`collapse${index}`}
              >
                {item.question}
              </a>
            </div>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse${openIndex === index ? " show" : ""}`}
              aria-labelledby={`heading${index}`}
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
