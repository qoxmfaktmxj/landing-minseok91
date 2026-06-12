"use client";

import Image from "next/image";
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
      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-[16/10] overflow-hidden border border-paper/20 bg-paper/5">
          <Image
            src={story.previewImage}
            alt={story.previewAlt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover opacity-90 grayscale transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="absolute left-3 top-3 bg-vermilion px-2 py-1 font-mono text-[9px] font-bold tracking-[0.2em] text-paper-white">
            LIVE PREVIEW
          </span>
        </div>
        <div className="flex min-h-28 flex-col justify-between border border-paper/15 bg-paper/5 p-4">
          <span className="font-mono text-[10px] tracking-[0.25em] text-paper/50">
            SCREENSHOT DESK
          </span>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">
            실제 라이브 화면의 첫 인상을 신문 지면 안에서 먼저 확인한다.
            커서를 올리면 같은 프리뷰가 손끝을 따라온다.
          </p>
        </div>
      </div>
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
        OPEN LIVE — {story.urlLabel} ↗
      </span>

      {!reduced && hovered && (
        <motion.span
          className="pointer-events-none absolute z-10 hidden w-64 -translate-x-1/2 -translate-y-full border border-vermilion-soft bg-paper p-2 shadow-2xl md:block [@media(pointer:coarse)]:hidden"
          style={{ x: sx, y: sy, left: 0, top: -8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="relative block aspect-[16/10] overflow-hidden bg-ink">
            <Image
              src={story.previewImage}
              alt=""
              fill
              sizes="256px"
              className="object-cover"
            />
          </span>
          <span className="mt-2 block font-mono text-[10px] font-bold tracking-widest text-ink">
            OPEN LIVE — {story.urlLabel} ↗
          </span>
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
