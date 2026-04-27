import ScrollReveal from "@/components/ui/ScrollReveal";
import { focusAreas } from "@/data/siteContent";

export default function ImpactSection() {
  return (
    <section id="focus" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="font-mono-feature text-[11px] font-semibold uppercase tracking-overline text-accent">
              {"// CORE FOCUS"}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-section tracking-section text-on-background md:text-4xl">
              깊은 도메인 지식과 최신 <span className="text-accent">AI 트렌드</span>를 함께 활용합니다.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((area, index) => (
            <ScrollReveal key={area.title} delay={index * 0.06} className="h-full">
              <article className="group flex h-full flex-col rounded-xl border border-outline-variant/60 bg-surface-container-low p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-ambient-warm">
                <span className="mb-4 font-mono-feature text-[11px] font-semibold tracking-overline text-on-surface-variant transition-colors group-hover:text-accent">
                  {String(index + 1).padStart(2, "0")} / {String(focusAreas.length).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-on-background">
                  {area.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-on-surface-variant">
                  {area.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
