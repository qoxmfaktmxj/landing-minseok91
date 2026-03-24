import { Mail, Github, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:qoxmfaktmxj@naver.com",
    bgClass: "bg-black text-white hover:bg-neutral-800",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/qoxmfaktmxj",
    bgClass:
      "bg-surface-container text-on-surface hover:bg-surface-container-high",
  },
  {
    icon: BookOpen,
    label: "Blog",
    href: "https://qoxmfaktmxj.github.io",
    bgClass:
      "bg-surface-container text-on-surface hover:bg-surface-container-high",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-outline-variant/20 bg-white py-32"
    >
      <div className="mx-auto max-w-7xl px-6 text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-on-background md:text-5xl">
            함께 일할 사람을 찾고 계신가요?
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-on-surface-variant">
            채용 제안, 프로젝트 협업, 기술 논의 등 편하게 연락주세요.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4">
            {contacts.map(({ icon: Icon, label, href, bgClass }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noopener noreferrer"}
                className={`flex items-center gap-2 rounded-full px-8 py-3 font-bold transition-all ${bgClass}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
