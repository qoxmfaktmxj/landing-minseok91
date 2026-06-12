"use client";

import { motion, useReducedMotion } from "framer-motion";
import { frontPage } from "@/data/siteContent";

const lineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.15 },
  },
};

const charVariant = {
  hidden: { opacity: 0, y: 14, scale: 1.15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 26 },
  },
};

export default function FrontPageHeadline() {
  const reduced = useReducedMotion();

  return (
    <section className="border-b border-ink px-5 md:px-10">
      <div className="mx-auto max-w-container py-12 md:py-20">
        <motion.h2
          className="text-[11vw] font-black leading-[1.02] tracking-headline text-ink md:text-7xl lg:text-8xl"
          variants={lineContainer}
          initial={reduced ? false : "hidden"}
          animate={reduced ? undefined : "visible"}
        >
          {frontPage.headline.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((seg, segIdx) => (
                <span
                  key={segIdx}
                  className={seg.marker ? "marker-highlight" : undefined}
                >
                  {Array.from(seg.text).map((ch, chIdx) => (
                    reduced ? (
                      <span key={chIdx} className="inline-block whitespace-pre">
                        {ch}
                      </span>
                    ) : (
                      <motion.span
                        key={chIdx}
                        variants={charVariant}
                        className="inline-block whitespace-pre"
                        data-reduced-still
                      >
                        {ch}
                      </motion.span>
                    )
                  ))}
                </span>
              ))}
            </span>
          ))}
        </motion.h2>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-faint md:mt-8 md:text-lg"
          data-reduced-still
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {frontPage.lede}
        </motion.p>
        <motion.p
          className="mt-5 font-mono text-[10px] tracking-[0.25em] text-ink-soft md:text-xs"
          data-reduced-still
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {frontPage.byline}
        </motion.p>
      </div>
    </section>
  );
}
