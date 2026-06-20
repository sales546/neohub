"use client";

import { useState } from "react";

export default function AboutTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="about-tab-content-main-box pt-lg-4 pt-md-2 pb-2">
      <div className="about-tab-outer align-self-center">
        <ul className="nav nav-pills" role="tablist">
          {tabs.map((tab, index) => (
            <li key={index} className="nav-item" role="presentation">
              <button
                className={`nav-link${activeTab === index ? " active" : ""}`}
                type="button"
                role="tab"
                aria-selected={activeTab === index}
                onClick={() => setActiveTab(index)}
              >
                <div className="pricing-plan-tab-content">
                  <h5>{tab.title}</h5>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-pane fade${activeTab === index ? " show active" : ""}`}
            role="tabpanel"
          >
            <p>{tab.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
