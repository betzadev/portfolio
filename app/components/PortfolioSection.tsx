"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

// Placeholder project data
const projects = [
  {
    id: 1,
    title: { en: "E-Commerce Dashboard", es: "Dashboard E-Commerce" },
    category: "React / Next.js",
    color: "var(--color-pearl-aqua)"
  },
  {
    id: 2,
    title: { en: "Fintech Mobile App UI", es: "UI App Fintech" },
    category: "Figma / UX",
    color: "var(--color-blush-rose)"
  },
  {
    id: 3,
    title: { en: "Brand Identity: 'Lumina'", es: "Identidad de Marca: 'Lumina'" },
    category: "Illustrator / Branding",
    color: "var(--color-carrot-orange)"
  },
  {
    id: 4,
    title: { en: "Crypto Portfolio Tracker", es: "Tracker Portafolio Crypto" },
    category: "TypeScript / API",
    color: "var(--color-secondary)"
  }
];

export const PortfolioSection = () => {
    const { t, language } = useLanguage();

    return (
        <section className="py-20 px-6 bg-[var(--color-background)]">
            <div className="max-w-6xl mx-auto">
                 <motion.h2 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center text-[var(--color-foreground)]"
                >
                    {t('portfolio.title')}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-xl"
                        >
                            {/* Background Color Placeholder */}
                            <div 
                                className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundColor: project.color }}
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                            
                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                                <span className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">{project.category}</span>
                                <h3 className="text-3xl font-bold">{project.title[language]}</h3>
                                <div className="mt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="inline-block px-4 py-2 border border-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-colors">
                                        {t('portfolio.view_project')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
