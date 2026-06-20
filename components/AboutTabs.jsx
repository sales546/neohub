"use client";

import { useState } from "react";

export default function AboutTabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="about-tab-content-main-box pt-lg-4 pt-md-2 pb-2">
      <div className="about-tab-outer align-self-center">
        <ul className="nav nav-pills about-tab-buttons" role="tablist" aria-label="About NeoHub">
          {tabs.map((tab, index) => {
            const tabId = `about-tab-${index}`;
            const panelId = `about-panel-${index}`;

            return (
              <li key={index} className="nav-item" role="presentation">
                <button
                  id={tabId}
                  className={`about-tab-btn${activeTab === index ? " active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={panelId}
                  tabIndex={activeTab === index ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="pricing-plan-tab-content">
                    <h5>{tab.title}</h5>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="tab-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            id={`about-panel-${index}`}
            className={`tab-pane fade${activeTab === index ? " show active" : ""}`}
            role="tabpanel"
            aria-labelledby={`about-tab-${index}`}
            hidden={activeTab !== index}
          >
            <p>{tab.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
