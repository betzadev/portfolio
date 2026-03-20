"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export const HeroParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Parallax Effects
        gsap.to(bgRef.current, {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });

        gsap.to(shapesRef.current, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        });
        
        gsap.to(textRef.current, {
             yPercent: 50,
             opacity: 0,
             ease: "none",
             scrollTrigger: {
                 trigger: containerRef.current,
                 start: "top top",
                 end: "bottom top",
                 scrub: true,
             }
        });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background Layer */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-lavender-blush)] dark:to-[var(--color-midnight-violet)] z-0" 
      />

      {/* Shapes Layer (Abstract Parallax Elements) */}
      <div ref={shapesRef} className="absolute inset-0 z-10 pointer-events-none opacity-60">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-pearl-aqua)] rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[var(--color-blush-rose)] rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[var(--color-carrot-orange)] rounded-full mix-blend-multiply filter blur-3xl opacity-60" />
      </div>

      {/* Content Layer */}
      <div ref={textRef} className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[var(--color-accent)] text-xl md:text-2xl font-semibold mb-4 tracking-widest uppercase"
        >
            {t('hero.role')}
        </motion.h2>
        
        <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold mb-6 text-[var(--color-foreground)]"
        >
            {t('hero.title')}
        </motion.h1>
        
        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-2xl text-[var(--color-foreground)] max-w-2xl mx-auto leading-relaxed"
        >
            {t('hero.description')}
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12"
        >
             <button className="px-8 py-3 rounded-full bg-[var(--color-highlight)] text-white font-bold text-lg hover:bg-[var(--color-accent)] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                 {t('portfolio.title')}
             </button>
        </motion.div>
      </div>
    </div>
  );
};
