import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionFrame from "@/components/ui/SectionFrame";
import { restrictedProjectNotes, workPrinciples } from "@/data/siteContent";

export default function HowIWorkSection() {
  return (
    <section id="how-i-work" className="px-6 py-20 md:px-8 md:py-28">
      <SectionFrame>
        <ScrollReveal>
          <SectionHeader
            eyebrow="How I Work"
            title="AI를 쓰되, 실제 조직에서 통하는 방식으로 씁니다."
            description="제가 AI를 활용하는 이유는 과장된 생산성 광고가 아니라, 탐색과 정리 비용을 줄이고 더 나은 구조를 빠르게 검증하기 위해서입니다."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-5">
            {workPrinciples.map((principle, index) => (
              <ScrollReveal key={principle.title} delay={index * 0.06}>
                <div className="rounded-[28px] border border-[rgba(18,25,44,0.08)] bg-white/82 p-7 shadow-[0_14px_40px_rgba(18,25,44,0.05)]">
                  <h3 className="text-xl font-semibold tracking-tight text-[#12192C]">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#596176]">
                    {principle.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="right" delay={0.12}>
            <aside className="rounded-[32px] bg-[#12192C] p-8 text-white shadow-[0_24px_80px_rgba(18,25,44,0.2)]">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8CA3FF]"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Access Note
              </p>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                로그인 필요한 프로젝트는 이렇게 설명합니다.
              </h3>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#CDD5EA]">
                {restrictedProjectNotes.map((note) => (
                  <li key={note} className="border-t border-[rgba(255,255,255,0.1)] pt-4 first:border-t-0 first:pt-0">
                    {note}
                  </li>
                ))}
              </ul>
            </aside>
          </ScrollReveal>
        </div>
      </SectionFrame>
    </section>
  );
}
