"use client";

import { motion } from "framer-motion";
import { classified, labAds } from "@/data/siteContent";

export default function ClassifiedSection() {
  return (
    <section className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-container">
        <div className="rule-double mb-10 border-b border-ink pb-2 pt-2 text-center font-mono text-[11px] font-bold tracking-wide3 text-ink">
          {classified.sectionTitle}
        </div>

        <motion.div
          className="mx-auto max-w-2xl -rotate-1 border-2 border-dashed border-vermilion bg-paper-white p-8 text-center md:p-12"
          initial={false}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
        >
          <span className="mb-4 inline-block animate-pulse bg-vermilion px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-paper-white motion-reduce:animate-none">
            {classified.urgentAd.badge}
          </span>
          <h3 className="mb-3 text-2xl font-black tracking-tight text-ink md:text-4xl">
            {classified.urgentAd.title}
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-ink-soft md:text-base">
            {classified.urgentAd.body}
          </p>
          <a
            href={classified.urgentAd.ctaHref}
            className="inline-block rounded-full bg-vermilion px-8 py-3 text-sm font-extrabold text-paper-white motion-safe:transition-transform motion-safe:hover:scale-105 motion-safe:active:scale-95"
            data-cursor="contact"
          >
            {classified.urgentAd.ctaLabel}
          </a>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {labAds.map((ad, i) => (
            <motion.a
              key={ad.id}
              href={ad.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink bg-paper-white p-5 transition-colors hover:bg-paper"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-cursor="open"
            >
              <span className="mb-1 block font-mono text-[10px] tracking-[0.2em] text-vermilion">
                LAB ✦
              </span>
              <span className="block text-base font-extrabold text-ink">
                {ad.name}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-ink-faint">
                {ad.description}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
