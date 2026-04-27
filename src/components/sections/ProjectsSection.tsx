import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { portfolioProjects } from "@/data/siteContent";

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono-feature text-[11px] font-semibold uppercase tracking-overline text-accent">
              // PORTFOLIO
            </span>
            <h2 className="mt-3 text-4xl font-extrabold leading-section tracking-section text-on-background">
              개인 프로젝트 소개
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {portfolioProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.06}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-ambient-warm">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="mb-4 font-mono-feature text-[11px] font-semibold uppercase tracking-overline text-accent">
                  {project.category}
                </span>

                <h3 className="text-xl font-bold tracking-tight text-on-background">
                  {project.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
                  {project.summary}
                </p>

                {project.accessNote ? (
                  <p className="mt-3 font-mono-feature text-xs text-outline">
                    {project.accessNote}
                  </p>
                ) : null}

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-outline-variant bg-white px-4 py-3 text-xs font-bold text-on-surface transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-on-primary"
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
