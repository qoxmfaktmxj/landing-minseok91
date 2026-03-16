import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import SectionFrame from "@/components/ui/SectionFrame";
import { portfolioProjects } from "@/data/siteContent";

export default function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-10 md:px-8 md:py-14">
      <SectionFrame>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Projects"
            title="실제 동작하는 네 가지 제품을 카드 형태로 정리했습니다."
            description="긴 케이스 스터디 대신 핵심 맥락만 읽히도록 구성했습니다. 각 카드는 바로 열어볼 수 있는 라이브 프로젝트로 연결됩니다."
            inverse
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {portfolioProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} priority={index < 2} />
            </ScrollReveal>
          ))}
        </div>
      </SectionFrame>
    </section>
  );
}
