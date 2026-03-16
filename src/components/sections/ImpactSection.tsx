import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeader from "@/components/ui/SectionHeader";
import { focusAreas } from "@/data/siteContent";

export default function ImpactSection() {
  return (
    <section id="focus" className="px-6 py-10 md:px-8 md:py-14">
      <SectionFrame>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Focus"
            title="문제 정의부터 공통 패턴 정리까지, 운영 흐름 중심으로 접근합니다."
            description="업무 문맥이 복잡한 시스템일수록 화면보다 흐름이 중요합니다. 구조를 작게 나누고, 실제 동작으로 검증하면서 확장합니다."
            inverse
            className="max-w-none"
            titleClassName="xl:whitespace-nowrap xl:text-[2.9rem]"
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((area, index) => (
            <ScrollReveal key={area.title} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-[28px] border border-[var(--line)] bg-[rgba(19,27,46,0.76)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[rgba(78,222,163,0.3)]">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                  {area.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {area.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </SectionFrame>
    </section>
  );
}
