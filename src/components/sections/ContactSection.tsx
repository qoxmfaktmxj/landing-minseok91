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
        <ScrollReveal>
          <SectionHeader
            eyebrow="Contact"
            title="복잡한 사내 시스템을 개선, 신규 프로젝트 진행"
            description="채용, 프로젝트 협업, 내부 도구 개선, 레거시 현대화 논의 모두 편하게 연락주세요."
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <ScrollReveal direction="left">
            <div className="rounded-[32px] border border-[rgba(18,25,44,0.08)] bg-white/92 p-7 shadow-[0_16px_40px_rgba(18,25,44,0.06)]">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3559D6]"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
              </p>
              <ul className="mt-4 grid gap-1 text-sm leading-7 text-[#596176]">
                {contactPrompts.map((prompt) => (
                  <li
                    key={prompt}
                    className="rounded-[22px] border border-[rgba(18,25,44,0.08)] bg-white px-5 py-4 shadow-[0_10px_26px_rgba(18,25,44,0.05)]"
                  >
                    <span className="block text-[15px] leading-7 text-[#4C5870]">
                      {prompt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="grid gap-3">
              {contacts.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noopener noreferrer"}
                  className="flex items-center justify-between rounded-[24px] border border-[rgba(18,25,44,0.08)] bg-white/84 px-5 py-4 transition hover:border-[#1F5EFF] hover:bg-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2F6FF] text-[#1F5EFF]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold text-[#12192C]">
                      {label}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-[#596176]">
                    연결하기
                  </span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </SectionFrame>
    </section>
  );
}
