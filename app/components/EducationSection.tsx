"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import { AnimatedTitle } from "./AnimatedTitle";

export const EducationSection = () => {
  const { t, language } = useLanguage();
  const educationList: any[] = (translations as any)[language]?.education?.degrees || [];

  return (
    <section id="education" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <AnimatedTitle numberStr="04." title={t("education.title")} />

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {educationList && educationList.map((edu: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              padding: "1.5rem",
              background: "var(--surface)",
              borderRadius: "4px",
              boxShadow: "0 10px 30px -15px rgba(2,12,27,0.7)",
              borderLeft: "2px solid var(--accent)",
            }}
          >
             <h3 style={{ color: "var(--heading)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                {edu.degree}
              </h3>
            <p style={{ color: "var(--text)", fontSize: "0.95rem", fontWeight: 500 }}>
              {edu.institution}
            </p>
             <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "var(--font-mono)", marginTop: "0.5rem" }}>
              {edu.year}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};