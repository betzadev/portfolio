"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export const AboutSection = () => {
  const { t, language } = useLanguage();
  const skillList = translations[language].about.skills;

  return (
    <section
      id="about"
      style={{ paddingTop: "6rem", paddingBottom: "4rem" }}
    >
      <h2 className="numbered-heading" data-number="01.">
        {t("about.title")}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <p style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.75 }}>
          {t("about.p1")}
        </p>
        <p style={{ color: "var(--text)", fontSize: "0.95rem", lineHeight: 1.75 }}>
          {t("about.p2")}
        </p>
        
        <div style={{ marginTop: "1rem" }}>
            <h3 style={{ color: "var(--heading)", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>
            {t("about.p3")}
            </h3>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {skillList.map((skill: string, i: number) => {
                const parts = skill.split(":");
                const label = parts.length > 1 ? parts[0] + ":" : null;
                const value = parts.length > 1 ? parts.slice(1).join(":") : skill;

                return (
                    <li key={i} style={{ position: "relative", paddingLeft: "1.2rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                        <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>▹</span>
                        {label ? (
                           <>
                             <strong style={{ color: "var(--heading)", marginRight: "0.4rem" }}>{label}</strong>
                             <span>{value}</span>
                           </>
                        ) : (
                             <span>{skill}</span>
                        )}
                    </li>
                );
            })}
            </ul>
        </div>
      </motion.div>
    </section>
  );
};