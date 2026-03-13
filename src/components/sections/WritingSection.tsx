import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionFrame from "@/components/ui/SectionFrame";
import { writingItems } from "@/data/siteContent";

export default function WritingSection() {
  return (
    <section id="writing" className="px-6 py-20 md:px-8 md:py-28">
      <SectionFrame>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Writing"
            title=""
            description=""
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {writingItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <article className="flex h-full flex-col rounded-[30px] border border-[rgba(18,25,44,0.08)] bg-white/82 p-7 shadow-[0_14px_42px_rgba(18,25,44,0.05)]">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3559D6]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#12192C]">
                  {item.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-[#596176]">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1F5EFF] transition hover:text-[#194AC4]"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </SectionFrame>
    </section>
  );
}
