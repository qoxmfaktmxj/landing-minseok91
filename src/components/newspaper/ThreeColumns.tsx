"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { profileColumn, pullQuote, stats } from "@/data/siteContent";
import CountUp from "./CountUp";

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function useSectionParallax(
  sectionRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  from: number,
  to: number,
) {
  const y = useMotionValue(0);

  useEffect(() => {
    if (!enabled) {
      y.set(0);
      return;
    }

    let frameId = 0;
    const update = () => {
      frameId = 0;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const total = window.innerHeight + rect.height;
      const rawProgress = (window.innerHeight - rect.top) / total;
      const progress = Math.min(1, Math.max(0, rawProgress));
      y.set(from + (to - from) * progress);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [enabled, from, sectionRef, to, y]);

  return y;
}

export default function ThreeColumns() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const shouldParallax = isDesktop && !reduced;
  const y1 = useSectionParallax(sectionRef, shouldParallax, 24, -24);
  const y2 = useSectionParallax(sectionRef, shouldParallax, 48, -48);
  const y3 = useSectionParallax(sectionRef, shouldParallax, 12, -12);

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-ink px-5 md:px-10"
    >
      <div className="mx-auto grid max-w-container grid-cols-1 md:grid-cols-3">
        <motion.article
          style={{ y: shouldParallax ? y1 : 0 }}
          className="border-b border-ink py-8 pr-0 md:border-b-0 md:border-r md:py-12 md:pr-8"
        >
          <span className="mb-3 block font-mono text-[10px] font-bold tracking-[0.25em] text-vermilion">
            {profileColumn.kicker}
          </span>
          <h3 className="mb-4 text-xl font-extrabold tracking-tight text-ink md:text-2xl">
            {profileColumn.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">
            {profileColumn.body}
          </p>
        </motion.article>

        <motion.div
          style={{ y: shouldParallax ? y2 : 0 }}
          className="flex items-center justify-center border-b border-ink px-0 py-10 md:border-b-0 md:border-r md:px-8 md:py-12"
        >
          <blockquote className="whitespace-pre-line text-center font-serif text-2xl font-bold italic leading-snug text-ink md:text-3xl">
            {pullQuote}
          </blockquote>
        </motion.div>

        <motion.div
          style={{ y: shouldParallax ? y3 : 0 }}
          className="py-8 md:py-12 md:pl-8"
        >
          <span className="mb-4 block font-mono text-[10px] font-bold tracking-[0.25em] text-vermilion">
            BY THE NUMBERS
          </span>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-ink bg-paper-white px-2 py-4 text-center"
              >
                <span className="block text-2xl font-black tracking-tight text-ink md:text-3xl">
                  <CountUp to={stat.value} display={stat.display} />
                </span>
                <span className="mt-1 block font-mono text-[8px] tracking-wider text-ink-faint md:text-[9px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
