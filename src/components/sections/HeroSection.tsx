"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
      className="relative flex min-h-[614px] items-center justify-center overflow-hidden bg-surface-container-low px-6"
    >
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 translate-x-1/4 rounded-l-full bg-black/[0.02] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-line bg-white px-4 py-1.5 font-mono-feature text-[11px] font-semibold uppercase tracking-overline text-accent">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent-soft)]"
          />
          Enterprise Systems Builder
        </div>

        <h1 className="mb-8 text-4xl font-extrabold leading-headline tracking-headline text-on-background md:text-6xl lg:text-7xl">
          <span className="text-accent">AI</span> 활용해 제품을
          <br className="hidden md:block" />
          개발하고 유지보수 합니다.
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
          최신 AI 트렌드를 읽고 활용해 문제 정의부터 구조 설계, 구현, 검증까지
          빠르게 진행합니다.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollToSection("projects")}
            className="w-full rounded-full bg-primary px-10 py-4 font-bold text-on-primary shadow-lg shadow-black/10 transition-all hover:bg-accent hover:shadow-ambient-soft sm:w-auto"
          >
            프로젝트 보기
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full rounded-full border border-outline-variant bg-white px-10 py-4 font-bold text-on-surface transition-all hover:border-accent hover:text-accent sm:w-auto"
          >
            연락하기
          </button>
        </div>
      </motion.div>
    </section>
  );
}
