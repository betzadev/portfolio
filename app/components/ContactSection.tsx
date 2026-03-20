"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";

export const ContactSection = () => {
  const { t, language } = useLanguage();
  const email = translations[language].contact.details?.email || "";

  return (
    <section
      id="contact"
      style={{
        paddingTop: "6rem",
        paddingBottom: "8rem",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            marginBottom: "1rem",
          }}
        >
          06. {t("contact.overline")}
        </p>

        <h2
          style={{
            fontSize: "2.5rem",
            color: "var(--heading)",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}
        >
          {t("contact.title")}
        </h2>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            marginBottom: "3rem",
          }}
        >
          {t("contact.description")}
        </p>

        <a
          href={`mailto:${email}`}
          style={{
            display: "inline-block",
            color: "var(--accent)",
            backgroundColor: "transparent",
            border: "1px solid var(--accent)",
            borderRadius: "4px",
            padding: "1.25rem 1.75rem",
            fontSize: "0.9rem",
            fontFamily: "var(--font-mono)",
            lineHeight: 1,
            textDecoration: "none",
            cursor: "pointer",
            transition: "all 0.25s cubic-bezier(0.645,0.045,0.355,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-tint)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {t("contact.cta")}
        </a>
      </motion.div>
    </section>
  );
};