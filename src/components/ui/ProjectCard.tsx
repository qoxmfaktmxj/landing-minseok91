import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type PortfolioProject } from "@/data/siteContent";

interface ProjectCardProps {
  project: PortfolioProject;
  priority?: boolean;
}

export default function ProjectCard({
  project,
  priority = false,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(19,27,46,0.92),rgba(11,19,38,0.98))] shadow-[0_18px_60px_rgba(2,6,23,0.28)]">
      {project.thumbnail ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[16/10] overflow-hidden border-b border-[var(--line)]"
          aria-label={`${project.title} 사이트 열기`}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
            className="object-cover object-top transition duration-700 group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,32,0.04),rgba(6,14,32,0.58))]" />
          {project.evidence ? (
            <span className="absolute left-4 top-4 inline-flex rounded-full border border-[rgba(196,198,205,0.14)] bg-[rgba(11,19,38,0.74)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]">
              {project.evidence}
            </span>
          ) : null}
        </a>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
          style={{ fontFamily: "var(--font-geist-mono), monospace" }}
        >
          {project.category}
        </p>

        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
            {project.title}
          </h3>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(78,222,163,0.2)] bg-[rgba(78,222,163,0.08)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:border-[rgba(78,222,163,0.36)] hover:text-[var(--accent)]"
          >
            {project.linkLabel}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          {project.summary}
        </p>

        {project.accessNote ? (
          <p
            className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--soft)]"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            {project.accessNote}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[var(--line)] bg-[rgba(11,19,38,0.68)] px-3 py-1.5 text-xs font-medium text-[var(--accent-soft)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
