import { Sidebar } from "./components/Sidebar";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { EducationSection } from "./components/EducationSection";
import { CertificationsSection } from "./components/CertificationsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ClientEffects } from "./components/ClientEffects";

export default function Home() {
  return (
    <>
      <ClientEffects />
      <Sidebar />
      <main className="portfolio-main">
        <div className="portfolio-content">
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <EducationSection />
            <CertificationsSection />
            <ContactSection />
            <Footer />
        </div>
      </main>
    </>
  );
}