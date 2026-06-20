"use client";

import { useState } from "react";

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div id="accordion" className="faq-accordion">
      <div className="accordion" id="accordionExample">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const headerId = `faq-header-${index}`;

          return (
            <div className="accordion-item" key={index}>
              <h3 className="accordion-header" id={headerId}>
                <button
                  type="button"
                  className={`accordion-button${!isOpen ? " collapsed" : ""}`}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  {item.question}
                </button>
              </h3>
              <div
                id={panelId}
                className={`accordion-collapse collapse${isOpen ? " show" : ""}`}
                role="region"
                aria-labelledby={headerId}
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
