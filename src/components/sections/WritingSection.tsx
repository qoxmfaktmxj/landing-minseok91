import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionFrame from "@/components/ui/SectionFrame";
import { writingItems } from "@/data/siteContent";

export default function WritingSection() {
  return (
    <section id="links" className="px-6 py-20 md:px-8 md:py-28">
      <SectionFrame>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Links"
            title="작동하는 결과물과 그 뒤의 기록을 함께 남깁니다."
            description="라이브 제품만 보여주지 않고, 코드 저장소와 기술 기록도 같이 공개합니다."
            inverse
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {writingItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <article className="flex h-full flex-col rounded-[30px] border border-[var(--line)] bg-[rgba(19,27,46,0.76)] p-7 transition duration-300 hover:-translate-y-1 hover:border-[rgba(78,222,163,0.3)]">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {index === 0 ? "CODE" : "WRITING"}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-[var(--muted)]">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--accent)]"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </SectionFrame>
    </section>
  );
}
