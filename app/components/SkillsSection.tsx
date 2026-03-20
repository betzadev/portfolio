"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const SkillCard = ({ title, description, skills, delay }: { title: string, description: string, skills: string[], delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="bg-[var(--color-lavender-blush)] dark:bg-[var(--color-midnight-violet)] p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-[var(--color-pearl-aqua)]/20"
  >
    <h3 className="text-2xl font-bold mb-2 text-[var(--color-accent)]">{title}</h3>
    <p className="text-[var(--color-foreground)] opacity-80 mb-6">{description}</p>
    <ul className="space-y-2">
      {skills.map((skill, index) => (
        <li key={index} className="flex items-center text-[var(--color-foreground)] font-mono">
            <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] mr-3" />
            {skill}
        </li>
      ))}
    </ul>
  </motion.div>
);

export const SkillsSection = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 px-6 bg-[var(--color-background)] relative overflow-hidden">
             <div className="max-w-6xl mx-auto">
                <motion.h2 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-16 text-center text-[var(--color-foreground)]"
                >
                    {t('skills.title')}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <SkillCard 
                        title={t('skills.programming')}
                        description={t('skills.programming_desc')}
                        skills={['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS']}
                        delay={0}
                    />
                    <SkillCard 
                        title={t('skills.design')}
                        description={t('skills.design_desc')}
                        skills={['Figma', 'UI/UX Design', 'Prototyping', 'Design Systems', 'Wireframing']}
                        delay={0.2}
                    />
                     <SkillCard 
                        title={t('skills.tools')}
                        description={t('skills.content_desc')}
                        skills={['Adobe Illustrator', 'Vector Graphics', 'Content Creation', 'Branding', 'Layout Design']}
                        delay={0.4}
                    />
                </div>
             </div>
        </section>
    );
};
