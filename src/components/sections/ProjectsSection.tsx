import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { portfolioProjects } from "@/data/siteContent";

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              PORTFOLIO 02
            </span>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-on-background">
              개인 프로젝트 소개
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.06}>
              <article className="group flex h-full flex-col rounded-xl border border-outline-variant/40 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                  {project.category}
                </span>

                <h3 className="text-xl font-bold text-on-background">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
                  {project.summary}
                </p>

                {project.accessNote ? (
                  <p className="mt-3 text-xs text-outline">
                    {project.accessNote}
                  </p>
                ) : null}

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-outline-variant bg-white py-2.5 text-xs font-bold text-on-surface transition-all group-hover:border-black group-hover:bg-black group-hover:text-white"
                >
                  {project.linkLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
