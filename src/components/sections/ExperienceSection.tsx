import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionFrame from "@/components/ui/SectionFrame";
import { experienceHighlights } from "@/data/siteContent";

const experienceStats = [
  { label: "Career", value: "9 Years" },
  { label: "Context", value: "HR / ERP / Internal Tools" },
  { label: "Focus", value: "Architecture + Delivery" },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-20 md:px-8 md:py-28">
      <SectionFrame className="p-4 md:p-5">
        <div className="rounded-[36px] bg-[#12192C] px-6 py-12 shadow-[0_28px_120px_rgba(18,25,44,0.22)] md:px-10 md:py-14">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Experience"
            title="백엔드, 데이터, 화면, 운영을 따로 보지 않는 경험."
            description="엔터프라이즈 시스템은 레이어별 최적화보다 연결된 판단이 중요합니다. 제 경험은 그 연결을 놓치지 않게 해줍니다."
            inverse
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {experienceStats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.05}>
              <div className="rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] p-5">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8CA3FF]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {stat.label}
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {stat.value}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {experienceHighlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.06}>
              <div className="rounded-[28px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#CDD5EA]">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        </div>
      </SectionFrame>
    </section>
  );
}
