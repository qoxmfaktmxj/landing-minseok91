import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionFrame from "@/components/ui/SectionFrame";
import { caseStudies } from "@/data/siteContent";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-20 md:px-8 md:py-28">
      <SectionFrame>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Project"
            title=""
            description=""
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6">
          {caseStudies.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </SectionFrame>
    </section>
  );
}
