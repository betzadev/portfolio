"use client";

import { useEffect } from "react";

export const LanternCursor = () => {
  useEffect(() => {
    // Create the lantern overlay element
    const overlay = document.createElement("div");
    overlay.id = "lantern-overlay";
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      transition: opacity 0.3s ease;
      background: radial-gradient(
        circle 200px at 50% 50%,
        transparent 0%,
        transparent 30%,
        rgba(4, 16, 28, 0.55) 60%,
        rgba(4, 16, 28, 0.85) 100%
      );
    `;
    document.body.appendChild(overlay);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        overlay.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      overlay.style.opacity = "0";
    };

    // Smooth follow animation
    const animate = () => {
      // Smooth lerp
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;

      // Check theme for lantern color
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const darkColor = isLight ? "rgba(248, 248, 255, 0.6)" : "rgba(4, 16, 28, 0.75)";
      const edgeColor = isLight ? "rgba(248, 248, 255, 0.92)" : "rgba(4, 16, 28, 0.95)";

      overlay.style.background = `radial-gradient(
        circle 280px at ${currentX}px ${currentY}px,
        transparent 0%,
        transparent 20%,
        ${darkColor} 55%,
        ${edgeColor} 100%
      )`;

      rafId = requestAnimationFrame(animate);
    };

    animate();

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    };
  }, []);

  return null;
};
