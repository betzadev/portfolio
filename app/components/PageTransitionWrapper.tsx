"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${language}-${theme}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
