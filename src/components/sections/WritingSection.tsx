import { Github, BookOpen, Mail, ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const links = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/qoxmfaktmxj",
  },
  {
    icon: BookOpen,
    label: "Tech Blog",
    href: "https://qoxmfaktmxj.github.io",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:qoxmfaktmxj@naver.com",
  },
];

export default function WritingSection() {
  return (
    <section id="contact" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <ScrollReveal>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-on-background md:text-5xl">
            함께 일할 사람을 찾고 계신가요?
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-on-surface-variant">
            채용 제안, 프로젝트 협업, 기술 논의 등 편하게 연락주세요.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noopener noreferrer"}
                className="group inline-flex items-center gap-3 rounded-full border border-outline-variant/20 bg-surface-container-lowest px-8 py-4 font-bold text-on-background shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              >
                <Icon className="h-5 w-5 text-primary" />
                {label}
                <ArrowUpRight className="h-4 w-4 text-on-surface-variant transition-colors group-hover:text-primary" />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
