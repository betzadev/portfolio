"use client";

import React, { useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseOffset: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 110;
const CONNECTION_DIST = 160;
const MOUSE_REPEL_DIST = 120;
const MOUSE_REPEL_STRENGTH = 0.018;
const BASE_SPEED = 0.28;

function createParticle(width: number, height: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = BASE_SPEED * (0.4 + Math.random() * 0.8);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius: 1.2 + Math.random() * 1.6,
    opacity: 0.4 + Math.random() * 0.6,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

export const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Sizing ────────────────────────────────────────────────────────────
    let W = window.innerWidth;
    let H = window.innerHeight;

    const setSize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    setSize();

    // ── Theme helpers ─────────────────────────────────────────────────────
    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    let isLight = getTheme();

    const themeObserver = new MutationObserver(() => {
      isLight = getTheme();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // ── Particles ─────────────────────────────────────────────────────────
    let particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(W, H)
    );

    // ── Mouse ─────────────────────────────────────────────────────────────
    let mouseX = W / 2;
    let mouseY = H / 2;
    let mouseActive = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };
    const onMouseLeave = () => {
      mouseActive = false;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      setSize();
      // Respawn any out-of-bounds particles
      particles = particles.map((p) => {
        if (p.x > W || p.y > H) return createParticle(W, H);
        return p;
      });
    };
    window.addEventListener("resize", onResize);

    // ── Ink-drop transition overlay ───────────────────────────────────────
    let inkDrop = {
      active: false,
      cx: 0,
      cy: 0,
      radius: 0,
      maxRadius: 0,
      color: "",
      speed: 0,
    };

    const handleInkDrop = (e: Event) => {
      const detail = (e as CustomEvent).detail;

      const isLightNow = getTheme();
      const bgColor = isLightNow ? "#F8F8FF" : "#04101C";

      // Trigger DOM theme swap immediately
      if (detail.onComplete) detail.onComplete();

      const maxR = Math.hypot(
        Math.max(detail.x, W - detail.x),
        Math.max(detail.y, H - detail.y)
      ) * 1.05;

      inkDrop = {
        active: true,
        cx: detail.x,
        cy: detail.y,
        radius: 0,
        maxRadius: maxR,
        color: bgColor,
        speed: maxR / 35, // ~35 frames to fill screen
      };
    };

    window.addEventListener("playInkDrop", handleInkDrop);

    // ── Render ────────────────────────────────────────────────────────────
    let rafId = 0;
    let t = 0;

    const draw = () => {
      t += 0.016;
      rafId = requestAnimationFrame(draw);

      // Background fill
      ctx.fillStyle = isLight ? "#F8F8FF" : "#04101C";
      ctx.fillRect(0, 0, W, H);

      const accent = isLight
        ? "rgba(85,214,194,"      // teal accent
        : "rgba(85,214,194,";
      const nodeColor = isLight
        ? "rgba(58,75,97,"        // muted navy on light
        : "rgba(136,146,176,";    // slate on dark

      // ── Update & draw particles ────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        if (mouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_REPEL_DIST && dist > 0) {
            const force = (1 - dist / MOUSE_REPEL_DIST) * MOUSE_REPEL_STRENGTH;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Gentle drift damping (keep speeds controlled)
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Clamp speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > BASE_SPEED * 1.8) {
          p.vx = (p.vx / spd) * BASE_SPEED * 1.8;
          p.vy = (p.vy / spd) * BASE_SPEED * 1.8;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = W + 10;
        else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        else if (p.y > H + 10) p.y = -10;

        // Pulse opacity for a breathing effect
        const pulse = 0.75 + 0.25 * Math.sin(t * 1.2 + p.pulseOffset);
        const alpha = p.opacity * pulse;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${nodeColor}${alpha})`;
        ctx.fill();

        // Glow on accent-coloured nodes (every 7th)
        if (i % 7 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `${accent}${alpha * 0.35})`;
          ctx.fill();
        }

        // ── Connections ──────────────────────────────────────────────────
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * 0.35;

            // Accent lines between accent nodes (i%7 & j%7)
            const useAccent = i % 7 === 0 && j % 7 === 0;
            const lineColor = useAccent
              ? `${accent}${lineAlpha * 1.4})`
              : `${nodeColor}${lineAlpha})`;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = useAccent ? 0.8 : 0.5;
            ctx.stroke();
          }
        }
      }

      // ── Ink-drop overlay ──────────────────────────────────────────────
      if (inkDrop.active) {
        inkDrop.radius += inkDrop.speed;

        // Draw a "cutout" circle – the area OUTSIDE the circle keeps the old color
        ctx.save();
        ctx.beginPath();
        // Full-screen rect
        ctx.rect(0, 0, W, H);
        // Punch a circular hole at the click origin
        ctx.arc(inkDrop.cx, inkDrop.cy, inkDrop.radius, 0, Math.PI * 2, true);
        ctx.fillStyle = inkDrop.color;
        ctx.fill("evenodd");
        ctx.restore();

        if (inkDrop.radius >= inkDrop.maxRadius) {
          inkDrop.active = false;
        }
      }
    };

    draw();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("playInkDrop", handleInkDrop);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};
