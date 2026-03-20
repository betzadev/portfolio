"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export const ExperienceSection = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const jobs = translations[language].experience.jobs;

  return (
    <section id="experience" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <h2 className="numbered-heading" data-number="02.">
        {t("experience.title")}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0",
          minHeight: "280px",
        }}
      >
        {/* Tab list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderLeft: "2px solid var(--surface-2)",
            minWidth: "148px",
            flexShrink: 0,
          }}
        >
          {jobs.map((job, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={job.company}
                onClick={() => setActiveTab(index)}
                style={{
                  textAlign: "left",
                  padding: "0.65rem 1.25rem",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono)",
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  background: isActive ? "var(--accent-tint)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  marginLeft: "-2px",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {job.company}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, paddingLeft: "1.75rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h3
                style={{
                  color: "var(--heading)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                  lineHeight: 1.3,
                }}
              >
                {jobs[activeTab].role}{" "}
                <a
                  href={jobs[activeTab].url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--accent)", textDecoration: "none" }}
                >
                  @ {jobs[activeTab].company}
                </a>
              </h3>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.78rem",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "1.25rem",
                }}
              >
                {jobs[activeTab].range}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {jobs[activeTab].bullets.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      color: "var(--text)",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                    }}
                  >
                    <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "0.2rem", fontSize: "0.8rem" }}>▹</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
