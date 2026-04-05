"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitch } from "./LanguageSwitch";
import { translations } from "../i18n/translations";

const navItems = [
  { key: "about", href: "#about", number: "01." },
  { key: "experience", href: "#experience", number: "02." },
  { key: "projects", href: "#projects", number: "03." },
  { key: "education", href: "#education", number: "04." },
  { key: "certifications", href: "#certifications", number: "05." },
  { key: "contact", href: "#contact", number: "06." },
];

export const Sidebar = () => {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["about", "experience", "projects", "education", "certifications", "contact"];
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const contactDetails = translations[language].contact.details;

  const accentColor = "var(--accent)";
  const mutedColor = "var(--text-muted)";
  const headingColor = "var(--heading)";
  const textColor = "var(--text)";

  // Social Icons mapping
  const socialIcons = [
    {
        name: "Email",
        href: `mailto:${contactDetails?.email}`,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
    },
    {
        name: "LinkedIn",
        href: `https://linkedin.com/in/${contactDetails?.linkedin}`,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
    },
    {
        name: "GitHub",
        href: `https://github.com/${contactDetails?.github}`,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
    },
    {
        name: "Instagram",
        href: `https://instagram.com/${(contactDetails as any)?.instagram}`,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    {
        name: "Phone",
        href: `tel:${contactDetails?.phone}`,
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
    }
  ];

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="portfolio-sidebar"
        style={{ 
            overflowY: 'hidden', 
            maxHeight: '100vh', 
            paddingRight: '1rem',
            paddingTop: '3rem', 
            paddingBottom: '2rem',
            paddingLeft: '3rem'
        }}
      >
        {/* Container for content */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          {/* Header Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.1 }
              }
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
              }}
              style={{
                color: headingColor,
                fontSize: "2rem",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: "0.25rem",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              {t("hero.name")}
            </motion.h1>
            
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              style={{
                color: textColor,
                fontSize: "1rem",
                fontWeight: 500,
                marginBottom: "1.2rem",
              }}
            >
              {t("hero.tagline")}
            </motion.h2>


            {/* Social Icons Row */}
            <motion.div 
              style={{ marginBottom: "2rem", display: 'flex', gap: '1.25rem', alignItems: 'center' }}
            >
               {socialIcons.map((item) => (
                   <motion.a 
                    variants={{
                      hidden: { opacity: 0, scale: 0.5, y: 10 },
                      visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
                    }}
                    whileHover={{ y: -4, scale: 1.15, color: accentColor }}
                    whileTap={{ scale: 0.95 }}
                    key={item.name} 
                    href={item.href} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label={item.name}
                    style={{ color: mutedColor, display: "inline-block" }}
                   >
                       {item.icon}
                   </motion.a>
               ))}
            </motion.div>

          </motion.div>

          {/* Navigation */}
          <nav style={{ marginTop: "0.5rem", flex: 1 }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              {navItems.map((item, i) => {
                const isActive = activeSection === item.key;
                return (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: isActive ? headingColor : mutedColor,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = headingColor)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? headingColor : mutedColor)}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          height: "1px",
                          width: isActive ? "40px" : "20px",
                          background: isActive ? headingColor : mutedColor,
                          transition: "width 0.3s, background 0.3s",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        {t(`nav.${item.key}`)}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

             {/* Footer Toggles */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ marginTop: "auto", paddingBottom: "1rem" }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <LanguageSwitch />
                    <ThemeToggle />
                </div>
            </motion.div>
        </div>
      </motion.aside>

      {/* ── Mobile Top Bar ── */}
      <div
        className="portfolio-mobile-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingBottom: "1rem",
          paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
          paddingRight: "max(1.5rem, env(safe-area-inset-right))",
          background: "var(--background)",
          borderBottom: "1px solid var(--surface-2)",
        }}
      >
        <span style={{ color: headingColor, fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.9rem" }}>
          {t("hero.name")}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <LanguageSwitch />
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: accentColor, background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--background)",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <ul style={{ listStyle: "none", textAlign: "center", display: "flex", flexDirection: "column", gap: "2rem", width: "100%", padding: "0 2rem" }}>
            {navItems.map((item, i) => (
              <motion.li
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <p style={{ color: accentColor, fontFamily: "var(--font-mono)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                  {item.number}
                </p>
                <button
                  onClick={() => handleNavClick(item.href)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: headingColor, fontSize: "1.4rem", fontWeight: 600 }}
                >
                  {t(`nav.${item.key}`)}
                </button>
              </motion.li>
            ))}
          </ul>
           {/* Mobile Contact Icons */}
           <div style={{ marginTop: "2rem", display: 'flex', gap: '1.5rem', alignItems: 'center', color: mutedColor }}>
              {socialIcons.map((item) => (
                   <a 
                    key={item.name} 
                    href={item.href} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label={item.name}
                    style={{ color: mutedColor }}
                   >
                       {item.icon}
                   </a>
               ))}
           </div>
        </motion.div>
      )}
    </>
  );
};