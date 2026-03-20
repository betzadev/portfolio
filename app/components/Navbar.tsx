"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitch } from "./LanguageSwitch";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "motion/react";

export const Navbar = () => {
    const { t } = useLanguage();

  return (
    <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full flex justify-between items-center p-6 z-50 text-[var(--color-foreground)] backdrop-blur-sm"
    >
      <div className="text-xl font-bold tracking-widest uppercase">
        {/* Placeholder for Logo or Name */}
        PORTFOLIO
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </motion.nav>
  );
};
