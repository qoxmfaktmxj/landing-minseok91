import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type CaseStudy } from "@/data/siteContent";

interface ProjectCardProps {
  project: CaseStudy;
}

const detailItems = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "role", label: "My Role" },
  { key: "result", label: "Result" },
] as const;

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-[32px] border border-[rgba(18,25,44,0.08)] bg-white/82 shadow-[0_18px_64px_rgba(18,25,44,0.07)]">
      <div className="grid gap-0 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="relative min-h-[280px] border-b border-[rgba(18,25,44,0.08)] bg-[#E9EEF8] lg:min-h-full lg:border-b-0 lg:border-r">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            className="object-contain object-center"
            priority={project.id === "vibe-hr"}
          />
        </div>

        <div className="p-7 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3559D6]"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {project.category}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#12192C]">
                {project.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#596176]">
                {project.summary}
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              {project.evidence ? (
                <span className="inline-flex rounded-full border border-[rgba(18,25,44,0.08)] bg-[#F6F8FC] px-4 py-2 text-xs font-medium text-[#3559D6]">
                  {project.evidence}
                </span>
              ) : null}
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F5EFF] transition hover:text-[#194AC4]"
              >
                {project.linkLabel}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              {project.accessNote ? (
                <p className="max-w-[240px] text-right text-xs leading-6 text-[#7B8599]">
                  {project.accessNote}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {detailItems.map((item) => (
              <div
                key={item.key}
                className="rounded-[24px] border border-[rgba(18,25,44,0.08)] bg-[#F9FAFD] p-5"
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#3559D6]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#596176]">
                  {project[item.key]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[rgba(18,25,44,0.08)] bg-white px-3 py-1.5 text-xs font-medium text-[#4B556A]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
