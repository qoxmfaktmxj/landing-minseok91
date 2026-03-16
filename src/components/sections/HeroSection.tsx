"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  heroSignals,
  portfolioProjects,
  workPrinciples,
} from "@/data/siteContent";

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
      className="relative overflow-hidden px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top_left,_rgba(184,200,218,0.2),_transparent_28%),radial-gradient(circle_at_80%_18%,_rgba(78,222,163,0.14),_transparent_24%)]" />

      <div className="mx-auto max-w-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-[36px] border border-[var(--line-strong)] bg-[linear-gradient(180deg,rgba(23,31,51,0.92),rgba(11,19,38,0.97))] p-8 shadow-[0_24px_90px_rgba(2,6,23,0.38)] md:p-10"
        >
          <div className="grid gap-12 xl:grid-cols-[minmax(0,1.05fr)_360px]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(78,222,163,0.28)] bg-[rgba(78,222,163,0.08)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                <Sparkles className="h-3.5 w-3.5" />
                Enterprise Systems Builder
              </div>

              <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-[var(--foreground)] md:text-[3.8rem] md:leading-[1.04]">
                사내 시스템을
                <br className="hidden md:block" />
                실제로 운영 가능한 제품으로 다시 설계합니다.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                HR, 업무용 그리드, 채용, 커머스처럼 서로 다른 도메인을 작은 제품 단위로
                구현하고, AI를 활용해 문제 정의부터 구조 설계, 구현, 검증까지 빠르게
                이어갑니다.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-[#062018] transition hover:bg-[#6ffbbe]"
                >
                  프로젝트 보기
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line-strong)] bg-[rgba(19,27,46,0.78)] px-6 py-3.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[rgba(78,222,163,0.32)] hover:text-[var(--accent)]"
                >
                  연락하기
                </button>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {heroSignals.map((signal, index) => (
                  <motion.div
                    key={signal.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.12 + index * 0.08,
                      ease: "easeOut",
                    }}
                    className="rounded-[28px] border border-[var(--line)] bg-[rgba(19,27,46,0.82)] p-5"
                  >
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--accent-soft)]"
                      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                    >
                      {signal.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
                      {signal.value}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {signal.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[30px] border border-[var(--line)] bg-[rgba(19,27,46,0.92)] p-6">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  System Atlas
                </p>

                <div className="relative mt-5 overflow-hidden rounded-[24px] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(34,42,61,0.96),rgba(11,19,38,0.95))] p-5">
                  <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[rgba(78,222,163,0.14)] bg-[rgba(78,222,163,0.08)] blur-xl" />
                  <div className="absolute -bottom-10 left-6 h-20 w-20 rounded-full border border-[rgba(184,200,218,0.18)] bg-[rgba(184,200,218,0.08)] blur-lg" />

                  <div className="relative z-10 space-y-4">
                    {portfolioProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className="flex items-start gap-4 rounded-[20px] border border-[rgba(196,198,205,0.1)] bg-[rgba(11,19,38,0.46)] px-4 py-4"
                      >
                        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-base font-semibold text-[var(--foreground)]">
                            {project.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                            {project.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {workPrinciples.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.26 + index * 0.08,
                    ease: "easeOut",
                  }}
                  className="rounded-[26px] border border-[var(--line)] bg-[rgba(19,27,46,0.82)] p-5"
                >
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
