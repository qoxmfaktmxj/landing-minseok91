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
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 translate-x-1/4 rounded-l-full bg-primary/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl text-center"
      >
        <div className="mb-6 inline-flex items-center rounded-full bg-primary-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-primary-container">
          Enterprise Systems Builder
        </div>

        <h1 className="mb-8 text-4xl font-extrabold leading-tight tracking-tighter text-on-background md:text-6xl lg:text-7xl">
          <span className="text-primary">AI</span> 활용해 제품을
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
            className="w-full rounded-full bg-primary px-10 py-4 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all hover:bg-primary-dim sm:w-auto"
          >
            프로젝트 보기
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="w-full rounded-full bg-surface-container-high px-10 py-4 font-bold text-primary transition-all hover:bg-surface-container-highest sm:w-auto"
          >
            연락하기
          </button>
        </div>
      </motion.div>
    </section>
  );
}
