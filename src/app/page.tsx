import { ArrowDown, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import Hero from "@/components/portfolio/Hero";
import ProjectVisual from "@/components/portfolio/ProjectVisual";
import LabGallery from "@/components/portfolio/LabGallery";
import SiteHeader from "@/components/portfolio/SiteHeader";
import EmailContact from "@/components/portfolio/EmailContact";
import {
  colophon,
  featureStories,
  frontPage,
  profileColumn,
  pullQuote,
  stats,
} from "@/data/siteContent";

const projectGuides: Record<
  string,
  { summary: string; terms: [string, string][] }
> = {
  "ehr-harness": {
    summary: "AI가 인사 규칙과 코드 검증 절차를 따르도록 돕는 개발 환경입니다.",
    terms: [
      ["EHR", "인사 업무를 처리하는 기업용 시스템입니다."],
      [
        "하네스와 플러그인",
        "AI 개발 도구에 업무 규칙, 코드 탐색 기준, 검증 절차를 추가하는 구성입니다.",
      ],
      [
        "Oracle / Tibero",
        "인사시스템의 데이터와 업무 처리 로직을 관리하는 데이터베이스입니다.",
      ],
      [
        "MyBatis / superpowers",
        "MyBatis는 Java와 SQL을 연결하는 도구이며, superpowers는 AI 코딩 작업 절차를 지원하는 도구입니다.",
      ],
    ],
  },
  jarvis: {
    summary: "인사 규정의 근거와 적용 날짜를 함께 확인하는 지식 플랫폼입니다.",
    terms: [
      [
        "HR / LLM",
        "HR은 인사 업무를, LLM은 문서를 이해하고 답변을 생성하는 언어 모델을 뜻합니다.",
      ],
      [
        "tool-use agent",
        "답변에 필요한 근거를 검색하는 등 도구를 사용하도록 설계한 AI입니다.",
      ],
      [
        "CLI Proxy",
        "명령줄 기반 중계 도구를 통해 구독형 언어 모델을 연결하는 방식입니다.",
      ],
      [
        "Git Wiki / 기준일",
        "문서의 변경 이력을 관리하고, 규정이 적용되는 날짜를 함께 확인합니다.",
      ],
    ],
  },
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <section
          id="about"
          className="about-section section-shell"
          aria-labelledby="about-heading"
          tabIndex={-1}
        >
          <div className="about-heading-row">
            <h2 id="about-heading">{profileColumn.title}</h2>
            <span className="about-location">
              Seoul, Korea <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
          <div className="about-content">
            <p className="about-lede">{frontPage.lede}</p>
            <div className="about-detail">
              <p>{profileColumn.body}</p>
              <a
                className="text-link"
                href={colophon.links[0].href}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub에서 더 알아보기{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
                <span className="link-destination">새 탭</span>
              </a>
            </div>
          </div>
          <div className="stats-line">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.display}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
            <a href="#work" className="stats-next" aria-label="프로젝트로 이동">
              <ArrowDown size={28} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          id="work"
          className="work-section"
          aria-labelledby="work-heading"
          tabIndex={-1}
        >
          <div className="work-heading section-shell">
            <h2 id="work-heading">
              Selected
              <br />
              <span>work.</span>
            </h2>
            <p>
              업무의 맥락을 이해하고,
              <br />
              직접 만든 도구로 변화를 만듭니다.
            </p>
          </div>
          {featureStories.map((story, index) => (
            <article
              key={story.id}
              className={`case-study case-${story.id}`}
              aria-labelledby={`${story.id}-title`}
            >
              <div className="case-visual-column">
                <ProjectVisual
                  src={story.previewImage}
                  alt={story.previewAlt}
                  name={index === 0 ? "EHR HARNESS" : "JARVIS"}
                />
                <div className="case-technology">
                  {story.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className="case-copy">
                <h3 id={`${story.id}-title`}>{story.title}</h3>
                <p className="case-summary">
                  {projectGuides[story.id].summary}
                </p>
                <details className="case-guide">
                  <summary>이 프로젝트의 용어 안내</summary>
                  <dl>
                    {projectGuides[story.id].terms.map(([term, definition]) => (
                      <div key={term}>
                        <dt>{term}</dt>
                        <dd>{definition}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
                <div className="case-narrative">
                  {[
                    ["문제", story.problem],
                    ["접근", story.approach],
                    ["결과", story.result],
                  ].map(([label, body]) => (
                    <div key={label}>
                      <h4>{label}</h4>
                      <p>{body}</p>
                    </div>
                  ))}
                </div>
                <p className="case-access" id={`${story.id}-access`}>
                  {story.accessNote}
                </p>
                <a
                  className="button button-case"
                  href={story.url}
                  aria-describedby={`${story.id}-access`}
                  target={story.docMode ? undefined : "_blank"}
                  rel={story.docMode ? undefined : "noopener noreferrer"}
                >
                  {story.docMode ? "하네스 문서 읽기" : "Jarvis 살펴보기"}
                  {story.docMode ? (
                    <ArrowRight size={18} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={18} aria-hidden="true" />
                  )}
                  {!story.docMode && (
                    <span className="link-destination">새 탭</span>
                  )}
                </a>
              </div>
            </article>
          ))}
        </section>
        <section
          className="statement-section section-shell"
          aria-label="개발 원칙"
        >
          <svg
            className="statement-symbol"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 50h80M50 10v80M22 22l56 56M22 78l56-56"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="27"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
          <p>
            {pullQuote.split("\n").map((line, i) => (
              <span
                key={line}
                className={i === 1 ? "statement-emphasis" : undefined}
              >
                {line}
              </span>
            ))}
          </p>
          <span className="statement-credit">김민석 / Backend Developer</span>
        </section>
        <section
          id="lab"
          className="lab-section section-shell"
          aria-labelledby="lab-heading"
          tabIndex={-1}
        >
          <div className="section-heading">
            <h2 id="lab-heading">
              Always
              <br />
              building<span>.</span>
            </h2>
            <p>
              아이디어는 직접 만들어보며 확인합니다.
              <br />
              아래 프로젝트는 외부 데모로 새 탭에서 열립니다.
            </p>
          </div>
          <LabGallery />
        </section>
        <section
          id="contact"
          className="contact-section section-shell"
          aria-labelledby="contact-heading"
          tabIndex={-1}
        >
          <div className="contact-top">
            <h2 id="contact-heading">
              다음 이야기를
              <br />
              함께 만들어볼까요?
            </h2>
            <a
              className="contact-arrow"
              href="mailto:qoxmfaktmxj@naver.com"
              aria-label="김민석에게 이메일 보내기"
            >
              <Mail aria-hidden="true" />
            </a>
          </div>
          <div className="contact-bottom">
            <EmailContact />
            <p>
              복잡한 업무를 이해하고,
              <br />더 나은 시스템을 만드는 일.
            </p>
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <a href="#main" className="footer-name">
          minseok.
        </a>
        <p>© 2026 Kim Minseok</p>
        <div>
          {colophon.links.slice(0, 2).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="link-destination">새 탭</span>
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
