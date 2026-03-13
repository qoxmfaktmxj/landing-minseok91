"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const capabilityGroups = [
  {
    label: "주요 도메인",
    value: "HR / Internal Systems",
  },
  {
    label: "핵심 강점",
    value: "AI 기반 문제 정의 + 시스템 구조 설계",
  },
  {
    label: "작업 방식",
    value: "AI 활용 개발 + 점진적 시스템 현대화",
  },
];

const supportingPoints = [
  {
    title: "업무 문맥을 빠르게 이해합니다",
    description:
      "복잡하게 연결된 엔터프라이즈 도메인을 화면 단위가 아니라 업무 흐름과 데이터 구조 단위로 분석합니다.",
  },
  {
    title: "AI를 개발 생산성으로 연결합니다",
    description:
      "AI를 코드 생성 도구로만 사용하는 것이 아니라 개발 전 과정의 생산성을 높이는 도구로 활용합니다.",
    bullets: [
      "설계 옵션 비교",
      "코드 생성 및 리팩토링",
      "UI 개선",
      "문서 초안 작성",
      "시스템 구조 분석",
    ],
  },
];

const aboutParagraphs = [
  "기업의 업무 시스템은 단순히 화면을 만드는 작업이 아니라 운영 흐름, 데이터 구조, 권한 체계, 공통 규칙이 복합적으로 얽힌 구조 위에서 동작합니다.",
  "저는 이러한 엔터프라이즈 시스템의 맥락을 이해한 뒤 AI를 활용해 문제 정의, 설계 옵션 탐색, 구조 정리, 코드 구현, 리팩토링, 문서화까지 개발 전 과정을 가속합니다.",
  "새로운 기술을 무작정 도입하기보다 기존 시스템의 제약과 운영 환경을 고려한 상태에서 AI 기반 개발 생산성을 활용해 점진적으로 구조를 개선하는 방식을 선호합니다.",
  "시스템의 안정성을 유지하면서도 개발 속도와 유지보수성을 동시에 높이는 방향으로 시스템을 발전시킵니다.",
];

const keyStatement =
  "AI를 활용해 문제를 구조화하고 실제 운영 가능한 시스템 개선으로 연결합니다.";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 pb-20 pt-32 md:px-8 md:pb-28 md:pt-36"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(31,94,255,0.16),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(13,27,85,0.12),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.82),_rgba(255,255,255,0.34))]" />
      <div className="mx-auto max-w-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-[32px] border border-[rgba(18,25,44,0.1)] bg-[rgba(255,255,255,0.72)] p-8 shadow-[0_18px_80px_rgba(18,25,44,0.08)] backdrop-blur md:p-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(18,25,44,0.08)] bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#3559D6]">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Enabled Enterprise Builder
          </div>

          <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-[#12192C] md:text-5xl md:leading-[1.08]">
            엔터프라이즈 시스템을 설계하고 현대화 하는 개발자
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#596176] md:text-xl">
            AI를 활용해 시스템을 실무에 맞게 구현하는 백엔드 개발자 입니다.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection("projects")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F5EFF] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#194AC4]"
            >
              프로젝트
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(18,25,44,0.12)] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#12192C] transition hover:border-[#1F5EFF] hover:text-[#1F5EFF]"
            >
              연락하기
            </button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {capabilityGroups.map((group, index) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.12 + index * 0.08,
                  ease: "easeOut",
                }}
                className="rounded-[28px] border border-[rgba(18,25,44,0.08)] bg-white p-6 shadow-[0_16px_42px_rgba(18,25,44,0.05)]"
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#3559D6]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {group.label}
                </p>
                <p className="mt-4 text-base font-semibold leading-7 text-[#12192C]">
                  {group.value}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 border-t border-[rgba(18,25,44,0.08)] pt-14">
            <div className="max-w-3xl">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3559D6]"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                About
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="space-y-6">
                <div className="rounded-[32px] border border-[rgba(31,94,255,0.14)] bg-[linear-gradient(135deg,_rgba(31,94,255,0.12),_rgba(255,255,255,0.88))] p-7 shadow-[0_16px_48px_rgba(31,94,255,0.08)]">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3559D6]"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    Key Statement
                  </p>
                  <p className="mt-4 text-2xl font-semibold leading-9 text-[#12192C]">
                    {keyStatement}
                  </p>
                </div>

                <div className="rounded-[32px] border border-[rgba(18,25,44,0.08)] bg-white/80 p-8 shadow-[0_18px_60px_rgba(18,25,44,0.06)]">
                  <div className="space-y-5 text-base leading-8 text-[#596176]">
                    {aboutParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                {supportingPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-[28px] border border-[rgba(18,25,44,0.08)] bg-[rgba(255,255,255,0.72)] p-7 shadow-[0_16px_42px_rgba(18,25,44,0.05)]"
                  >
                    <h3 className="text-lg font-semibold tracking-tight text-[#12192C]">
                      {point.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[#596176]">
                      {point.description}
                    </p>
                    {point.bullets ? (
                      <ul className="mt-5 space-y-2 text-sm leading-7 text-[#4C5870]">
                        {point.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1F5EFF]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
