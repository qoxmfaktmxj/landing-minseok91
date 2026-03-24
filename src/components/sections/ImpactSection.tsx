import { BookOpen, RefreshCw, Bot, Workflow } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { focusAreas } from "@/data/siteContent";

const icons = [BookOpen, RefreshCw, Bot, Workflow];
const iconBgColors = [
  "bg-blue-50",
  "bg-emerald-50",
  "bg-violet-50",
  "bg-amber-50",
];
const iconTextColors = [
  "text-blue-500",
  "text-emerald-500",
  "text-violet-500",
  "text-amber-500",
];

export default function ImpactSection() {
  return (
    <section id="focus" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">
              CORE FOCUS 01
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-on-background">
              깊은 도메인 지식과 최신 AI 트렌드를 함께 활용합니다.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((area, index) => {
            const Icon = icons[index];
            return (
              <ScrollReveal key={area.title} delay={index * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-xl border border-outline-variant/40 bg-surface-container-low p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColors[index]}`}
                  >
                    <Icon className={`h-5 w-5 ${iconTextColors[index]}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-on-background">
                    {area.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-on-surface-variant">
                    {area.description}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
