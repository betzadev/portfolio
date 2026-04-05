"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  const isEN = language === "en";

  return (
    <button
      onClick={(e) => {
        const newLang = isEN ? "es" : "en";
        const evt = new CustomEvent("playLanguageJump", {
           detail: { onComplete: () => setLanguage(newLang) }
        });
        window.dispatchEvent(evt);
      }}
      aria-label="Switch Language"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        width: "58px",
        height: "28px",
        borderRadius: "999px",
        padding: "3px",
        background: "var(--surface)",
        border: "1px solid var(--surface-2)",
        cursor: "pointer",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Sliding pill */}
      <motion.div
        animate={{ x: isEN ? 0 : 30 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          position: "absolute",
          left: "3px",
          width: "23px",
          height: "22px",
          borderRadius: "999px",
          background: "var(--accent)",
          zIndex: 1,
          flexShrink: 0,
        }}
      />
      {/* Labels — placed above pill via zIndex */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0 5px",
          position: "relative",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            fontWeight: 700,
            color: isEN ? "var(--navy)" : "var(--text-muted)",
            lineHeight: 1,
            letterSpacing: "0.03em",
          }}
        >
          EN
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.58rem",
            fontWeight: 700,
            color: !isEN ? "var(--navy)" : "var(--text-muted)",
            lineHeight: 1,
            letterSpacing: "0.03em",
          }}
        >
          ES
        </span>
      </div>
    </button>
  );
};
