import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ImpactSection from "@/components/sections/ImpactSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import WritingSection from "@/components/sections/WritingSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <ImpactSection />
        <ProjectsSection />
        <WritingSection />
      </main>
      <Footer />
    </>
  );
}
