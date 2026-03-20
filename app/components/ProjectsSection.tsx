"use client";

import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../i18n/translations";
import { CuchiStoreShowcase } from "./CuchiStoreShowcase";

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const IconLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    style={{ color: "var(--text-muted)", transition: "color 0.2s" }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
  >
    {children}
  </a>
);

export const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const featured = translations[language].projects.featured;
  const others = translations[language].projects.others;

  return (
    <section id="projects" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <h2 className="numbered-heading" data-number="03.">
        {t("projects.title")}
      </h2>

      {/* ── Featured Projects ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "4rem" }}>
        {featured.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              borderRadius: "0.75rem",
              overflow: "hidden",
              background: "var(--surface)",
              border: "1px solid var(--surface-2)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            }}
          >
            {/* top accent bar */}
            <div style={{ height: "2px", background: "var(--accent)" }} />

            <div style={{ padding: "1.75rem" }}>
              <h3
                style={{
                  color: "var(--heading)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                {project.title}
              </h3>

              {/* description box */}
              <div
                style={{
                  background: "var(--surface-2)",
                  borderRadius: "0.5rem",
                  padding: "1rem 1.25rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ color: "var(--text)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {project.description}
                </p>
              </div>

              {/* tech + links row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {project.tech.map((tech: string) => (
                    <span
                      key={tech}
                      style={{
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.85rem" }}>
                  {project.github && <IconLink href={project.github}><GithubIcon /></IconLink>}
                  {project.external && <IconLink href={project.external}><ExternalIcon /></IconLink>}
                </div>
              </div>

              {/* mockups gallery or special animation */}
              {project.title === "Cuchi Store" ? (
                <div style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--surface-2)", marginTop: "1.5rem" }}>
                  <CuchiStoreShowcase />
                </div>
              ) : (
                project.images && project.images.length > 0 && (
                  <div
                    style={{
                      paddingTop: "1.5rem",
                      borderTop: "1px solid var(--surface-2)",
                      marginTop: "1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                      alignItems: "center",
                    }}
                  >
                    {project.images.map((img: string, i: number) => (
                      <motion.img
                        key={img}
                        src={img}
                        alt={`${project.title} mockup ${i + 1}`}
                        initial={{ opacity: 0, scale: 0.9, y: 40, rotate: -4 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "0.5rem",
                          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                          objectFit: "contain",
                        }}
                      />
                    ))}
                  </div>
                )
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Additional Projects mapping goes here if populated in the future ── */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "1rem",
        }}
      >
        {others.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--surface-2)",
              borderRadius: "0.65rem",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <span style={{ color: "var(--accent)" }}><FolderIcon /></span>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <IconLink href={project.github}><GithubIcon /></IconLink>
                <IconLink href={project.external}><ExternalIcon /></IconLink>
              </div>
            </div>

            <h4
              style={{
                color: "var(--heading)",
                fontSize: "0.95rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
                transition: "color 0.2s",
              }}
            >
              {project.title}
            </h4>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.8rem",
                lineHeight: 1.6,
                flex: 1,
                marginBottom: "1rem",
              }}
            >
              {project.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
