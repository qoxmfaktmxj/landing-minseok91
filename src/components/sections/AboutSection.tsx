import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";

const capabilityGroups = [
  {
    label: "주요 문맥",
    value: "HR / ERP / Internal Tools",
  },
  {
    label: "핵심 강점",
    value: "문제 정의 + 구조 설계",
  },
  {
    label: "작업 방식",
    value: "AI 활용 + 점진적 개선",
  },
];

const supportingPoints = [
  {
    title: "업무 문맥을 이해합니다",
    description:
      "사람, 조직, 권한, 승인, 공통코드처럼 얽힌 엔터프라이즈 도메인을 화면과 운영 흐름까지 포함해 봅니다.",
  },
  {
    title: "구조를 먼저 정리합니다",
    description:
      "기능 하나를 빠르게 붙이는 것보다, 공통 패턴과 데이터 구조를 정리해 이후 변경 비용을 낮추는 쪽을 선호합니다.",
  },
  {
    title: "AI를 실무 흐름에 붙입니다",
    description:
      "아이디어 정리, 설계 옵션 비교, UI 개선, 문서 초안, 리팩토링 보조까지 연결하되 판단 기준은 항상 운영성과 현실성입니다.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow="About"
            title="기술 자체보다, 조직에서 오래 유지되는 구조를 설계하고 개발합니다."
            description="백엔드로 시작했지만 지금의 강점은 특정 기술보다 문제를 구조화하고 실무에 맞는 개선안으로 연결하는 데 있습니다."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <ScrollReveal direction="left">
            <div className="rounded-[32px] border border-[rgba(18,25,44,0.08)] bg-white/80 p-8 shadow-[0_18px_60px_rgba(18,25,44,0.06)]">
              <div className="space-y-5 text-base leading-8 text-[#596176]">
                <p>
                  업무 시스템은 단순히 화면을 만드는 것이 아니라 운영 흐름, 데이터 구조, 공통 규칙이 중심이 됩니다. 이러한 맥락을 이해하고 실제로 운영 가능한 구조를 설계하며, 문제 해결과 구조화, 빠른 기술 흡수, 그리고 AI를 실무 개선으로 연결하는 방식으로 기존 시스템의 제약을 고려한 점진적 현대화를 지향합니다.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {capabilityGroups.map((group) => (
                  <div
                    key={group.label}
                    className="rounded-3xl border border-[rgba(18,25,44,0.08)] bg-[#F6F8FC] p-4"
                  >
                    <p className="text-sm text-[#596176]">{group.label}</p>
                    <p className="mt-2 text-sm font-semibold text-[#12192C]">
                      {group.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-6">
            {supportingPoints.map((point, index) => (
              <ScrollReveal
                key={point.title}
                direction="right"
                delay={index * 0.08}
              >
                <div className="rounded-[28px] border border-[rgba(18,25,44,0.08)] bg-[rgba(255,255,255,0.72)] p-7 shadow-[0_16px_42px_rgba(18,25,44,0.05)]">
                  <h3 className="text-lg font-semibold tracking-tight text-[#12192C]">
                    {point.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#596176]">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
