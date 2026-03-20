"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import type { Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } as any },
};

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="flex flex-col justify-center min-h-screen pt-24 lg:pt-0 pb-16"
      aria-label="Hero"
    >
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.p
          variants={item}
          className="mb-5 text-base"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          {t("hero.greeting")}
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          style={{ color: "var(--heading)" }}
        >
          {t("hero.name")}
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-4xl md:text-6xl font-bold mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          {t("hero.tagline")}
        </motion.h2>

        <motion.p
          variants={item}
          className="text-base max-w-md leading-relaxed mb-12"
          style={{ color: "var(--text-muted)" }}
        >
          {t("hero.description")}
        </motion.p>

        <motion.div variants={item} className="flex gap-4 flex-wrap">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block px-7 py-4 text-sm font-semibold rounded border transition-all duration-200 hover:-translate-y-1"
            style={{
              color: "var(--accent)",
              borderColor: "var(--accent)",
              background: "transparent",
              fontFamily: "var(--font-mono)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent-tint)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {t("hero.cta")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
