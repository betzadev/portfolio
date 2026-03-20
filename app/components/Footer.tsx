"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        textAlign: "center",
        paddingBottom: "2rem",
        paddingTop: "1rem",
        color: "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        lineHeight: 1.75,
      }}
    >
      <p>
        {t("footer.credit")}{" "}
        <a
          href="https://github.com/betzadev"
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          {t("footer.name")}
        </a>
      </p>
    </footer>
  );
};
