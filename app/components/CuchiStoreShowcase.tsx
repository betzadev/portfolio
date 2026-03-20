"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

const IMAGES = [
  "/cuchistorescreenshots/website1.jpg",
  "/cuchistorescreenshots/postig.jpg",
  "/cuchistorescreenshots/story.jpg",
  "/cuchistorescreenshots/perfilig.jpg",
  "/cuchistorescreenshots/website2.jpg"
];

export const CuchiStoreShowcase = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % IMAGES.length);
  const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        margin: "0 auto",
        background: "var(--surface)",
        borderRadius: "1rem",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid var(--surface-2)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at bottom, var(--accent-tint) 0%, transparent 60%)" }} />

      {IMAGES.map((img, i) => {
        const diff = (i - index + IMAGES.length) % IMAGES.length;
        let offset = diff;
        if (offset > Math.floor(IMAGES.length / 2)) {
          offset -= IMAGES.length;
        }

        const isActive = offset === 0;
        const isOuter = Math.abs(offset) > 1;

        return (
          <motion.div
            key={img}
            animate={{
              x: offset * 140,
              y: isActive ? 0 : 20,
              scale: isActive ? 1 : isOuter ? 0.75 : 0.85,
              opacity: isActive ? 1 : isOuter ? 0.5 : 0.8,
              rotate: offset * 6,
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            style={{
              width: "220px",
              height: "440px",
              position: "absolute",
              zIndex: isActive ? 10 : isOuter ? 0 : 5,
              borderRadius: "1.5rem",
              border: isActive ? "4px solid var(--accent)" : "4px solid #1a1a2e",
              boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
              overflow: "hidden",
              background: "#000",
              cursor: "pointer",
            }}
            onClick={() => setIndex(i)}
          >
            <div style={{ position: "absolute", inset: 0, background: isActive ? "transparent" : "rgba(0,0,0,0.25)", zIndex: 2, pointerEvents: "none" }} />
            <img src={img} alt={`UI View ${i+1}`} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </motion.div>
        );
      })}

      {/* Navigation Buttons */}
      <button onClick={prev} style={{ position: "absolute", left: "1.5rem", zIndex: 20, background: "var(--surface-2)", border: "1px solid rgba(255,255,255,0.1)", width: "45px", height: "45px", borderRadius: "50%", color: "var(--text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", backdropFilter: "blur(4px)" }}>
        ❮
      </button>

      <button onClick={next} style={{ position: "absolute", right: "1.5rem", zIndex: 20, background: "var(--surface-2)", border: "1px solid rgba(255,255,255,0.1)", width: "45px", height: "45px", borderRadius: "50%", color: "var(--text)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", backdropFilter: "blur(4px)" }}>
        ❯
      </button>

      {/* Dots */}
      <div style={{ position: "absolute", bottom: "1.5rem", display: "flex", gap: "0.6rem", zIndex: 20 }}>
        {IMAGES.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: index === i ? "16px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: index === i ? "var(--accent)" : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

