"use client";

import React from "react";
import { motion } from "motion/react";

interface AnimatedTitleProps {
  numberStr: string;
  title: string;
}

export const AnimatedTitle = ({ numberStr, title }: AnimatedTitleProps) => {
  return (
    <motion.h2
      className="numbered-heading"
      data-number={numberStr}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span style={{ display: "flex", flexWrap: "wrap", columnGap: "0.4rem" }}>
        {/* For a slight staggered effect on words */}
        {title.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h2>
  );
};
