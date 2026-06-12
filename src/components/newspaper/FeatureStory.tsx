"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { featureStories } from "@/data/siteContent";
import type { FeatureStoryItem } from "@/data/siteContent";

function StoryCard({ story }: { story: FeatureStoryItem }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 30 });
  const sy = useSpring(my, { stiffness: 300, damping: 30 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <a
      ref={cardRef}
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block border border-paper/20 p-6 transition-colors hover:border-vermilion-soft md:p-10"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="open"
    >
      <span className="mb-3 block font-mono text-[10px] font-bold tracking-[0.25em] text-vermilion-soft">
        {story.kicker}
      </span>
      <h3 className="mb-6 text-2xl font-black leading-tight tracking-tight text-paper md:text-4xl">
        {story.title}
      </h3>
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          ["문제", story.problem],
          ["접근", story.approach],
          ["결과", story.result],
        ].map(([label, text]) => (
          <div key={label}>
            <span className="mb-2 block border-b border-paper/20 pb-1 font-mono text-[10px] tracking-[0.25em] text-paper/50">
              {label}
            </span>
            <p className="text-sm leading-relaxed text-paper/70">{text}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {story.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-paper/30 px-3 py-1 font-mono text-[10px] text-paper/70"
          >
            {t}
          </span>
        ))}
        {story.accessNote && (
          <span className="font-mono text-[10px] text-paper/40">
            {story.accessNote}
          </span>
        )}
      </div>
      <span className="mt-6 block font-mono text-xs tracking-widest text-vermilion-soft">
        LIVE — {story.urlLabel} ↗
      </span>

      {!reduced && hovered && (
        <motion.span
          className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-full rounded-sm bg-vermilion px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest text-paper-white [@media(pointer:fine)]:block"
          style={{ x: sx, y: sy, left: 0, top: -8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          OPEN LIVE ↗
        </motion.span>
      )}
    </a>
  );
}

export default function FeatureStory() {
  return (
    <section className="bg-ink px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-container">
        <div className="mb-10 border-b border-paper/30 pb-2 text-center font-mono text-[11px] font-bold tracking-wide3 text-paper/70">
          FEATURE — 특집
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {featureStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
