import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ImpactSection from "@/components/sections/ImpactSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WritingSection from "@/components/sections/WritingSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactSection />
        <ProjectsSection />
        <WritingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
