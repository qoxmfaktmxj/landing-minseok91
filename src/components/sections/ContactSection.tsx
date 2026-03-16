import { BookOpen, Github, Mail } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionFrame from "@/components/ui/SectionFrame";
import { contactPrompts } from "@/data/siteContent";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:qoxmfaktmxj@naver.com",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/qoxmfaktmxj",
  },
  {
    icon: BookOpen,
    label: "Blog",
    href: "https://qoxmfaktmxj.github.io",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="px-6 py-20 md:px-8 md:py-28">
      <SectionFrame>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <ScrollReveal direction="left">
            <div>
              <SectionHeader
                eyebrow="Contact"
                title="복잡한 업무 시스템을 구현 한다면"
                description="채용, 프로젝트 협업, 내부 도구 개선, 레거시 현대화 논의 모두 편하게 연락주세요."
                inverse
                className="max-w-none"
                titleClassName="xl:whitespace-nowrap xl:text-[2.9rem]"
              />

              <ul className="mt-8 grid gap-3 text-sm leading-7 text-[var(--muted)]">
                {contactPrompts.map((prompt) => (
                  <li
                    key={prompt}
                    className="rounded-[24px] border border-[var(--line)] bg-[rgba(19,27,46,0.76)] px-5 py-4"
                  >
                    <span className="block text-[15px] leading-7 text-[var(--foreground)]">
                      {prompt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="lg:self-end">
            <div className="rounded-[30px] border border-[var(--line)] bg-[rgba(11,19,38,0.36)] p-6">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Reach Out
              </p>

              <div className="mt-6 grid gap-3">
                {contacts.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={label === "Email" ? undefined : "_blank"}
                    rel={label === "Email" ? undefined : "noopener noreferrer"}
                    className="flex items-center justify-between rounded-[24px] border border-[var(--line)] bg-[rgba(19,27,46,0.82)] px-5 py-4 transition hover:border-[rgba(78,222,163,0.32)] hover:bg-[rgba(23,31,51,0.96)]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(78,222,163,0.08)] text-[var(--accent)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {label}
                      </span>
                    </span>
                    <span className="text-sm font-medium text-[var(--muted)]">
                      연결하기
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionFrame>
    </section>
  );
}
