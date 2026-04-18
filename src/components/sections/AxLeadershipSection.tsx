import { ArrowUpRight, Layers, ShieldCheck, Boxes, Radar } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const pluginCapabilities = [
  {
    icon: Layers,
    label: "EHR4 · EHR5",
    hint: "Anyframe · MyBatis 프로파일 자동 감별",
  },
  {
    icon: Boxes,
    label: "Agent · Skill · Hook",
    hint: "전문 에이전트 3종 + 스킬 7종 자동 배치",
  },
  {
    icon: ShieldCheck,
    label: "Safety Hooks",
    hint: "DB 변경 · VCS 커밋 원천 차단",
  },
  {
    icon: Radar,
    label: "Drift Audit",
    hint: "프로젝트 변경 자동 감지 + 반자동 반영",
  },
];

export default function AxLeadershipSection() {
  return (
    <section
      id="ax-leadership"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              AX LEADERSHIP
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-on-background md:text-4xl">
              통제된 AI 자동화 체계를 먼저 설계하고, 조직에 확산합니다.
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <article className="mb-6 overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-low p-8 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">
                    Harness Engineering 선제 도입
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-on-background md:text-3xl">
                  AX 혁신 발표 + 조직 하네스 선제 설계
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base">
                  &ldquo;AI가 쓰기 좋은 코드를 만드는 것&rdquo;을 넘어,{" "}
                  <strong className="text-on-background">
                    AI가 조직의 규칙 안에서 일하도록 만드는 체계
                  </strong>
                  를 설계했습니다. 검증된 성과는 AI 활용 혁신 보고서에서 자세히 확인할 수 있습니다.
                </p>
              </div>

              <a
                href="/AI%ED%99%9C%EC%9A%A9%ED%98%81%EC%8B%A0%EB%B3%B4%EA%B3%A0%EC%84%9C.html"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AI 활용 혁신 보고서를 새 탭에서 열기"
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-on-background px-6 py-3 text-sm font-bold text-on-primary transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                AI 활용 혁신 보고서 보기
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <article className="overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-low p-8 md:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                  EHR Harness Plugin
                </span>
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-on-background md:text-3xl">
                  AI 하네스 플러그인
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-on-surface-variant md:text-base">
                  &ldquo;하네스 만들어줘&rdquo; 한 마디로 레거시 인사시스템을 심층 분석하고,
                  프로젝트에 맞는 규칙·스킬·에이전트·훅을 자동으로 배치합니다.
                  <span className="mt-3 block text-on-surface-variant">
                    한 번 검증된 구성을 조직 내 다른 프로젝트에서도 재사용할 수 있도록 플러그인 형태로 패키징했습니다.
                  </span>
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="/harness-plugin.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="EHR Harness Plugin 문서를 새 탭에서 열기"
                    className="group inline-flex items-center gap-2 rounded-full bg-on-background px-6 py-3 text-sm font-bold text-on-primary transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    플러그인 문서 보기
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <span className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-white px-4 py-2.5 text-xs font-semibold text-on-surface-variant">
                    Claude Code · Codex · Gemini CLI 호환
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {pluginCapabilities.map((cap, index) => {
                  const Icon = cap.icon;
                  return (
                    <ScrollReveal
                      key={cap.label}
                      delay={0.15 + index * 0.06}
                      className="h-full"
                    >
                      <div className="flex h-full flex-col rounded-xl border border-outline-variant/40 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-outline-variant hover:shadow-md">
                        <Icon
                          className="mb-3 h-4 w-4 text-on-surface-variant"
                          aria-hidden="true"
                        />
                        <p className="text-sm font-bold tracking-tight text-on-background">
                          {cap.label}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant">
                          {cap.hint}
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
