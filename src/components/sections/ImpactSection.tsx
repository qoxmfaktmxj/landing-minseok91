import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionFrame from "@/components/ui/SectionFrame";
import SectionHeader from "@/components/ui/SectionHeader";
import { focusAreas } from "@/data/siteContent";

export default function ImpactSection() {
  return (
    <section id="impact" className="px-6 py-20 md:px-8 md:py-28">
      <SectionFrame>
        <ScrollReveal>
          <SectionHeader
            eyebrow="Impact"
            title=""
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((area, index) => (
            <ScrollReveal key={area.title} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-[28px] border border-[rgba(18,25,44,0.08)] bg-white/82 p-6 shadow-[0_14px_44px_rgba(18,25,44,0.05)]">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3559D6]"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                </p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#12192C]">
                  {area.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#596176]">
                  {area.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </SectionFrame>
    </section>
  );
}
