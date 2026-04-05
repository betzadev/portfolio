"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import { AnimatedTitle } from "./AnimatedTitle";

export const CertificationsSection = () => {
  const { t, language } = useLanguage();
  const certifications: any[] = (translations as any)[language]?.certifications?.items || [];

  return (
    <section id="certifications" style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
      <AnimatedTitle numberStr="05." title={t("certifications.title")} />

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {certifications && certifications.map((cert: any, index: number) => (
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
            }}
          >
            <div style={{ marginBottom: "0.5rem" }}>
               <h3 style={{ color: "var(--heading)", fontSize: "1.1rem", fontWeight: 600 }}>
                {cert.title}
              </h3>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
              {cert.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};