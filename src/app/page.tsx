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
        "MyBatis는 Java와 SQL을 연결하는 도구입니다. superpowers는 AI 코딩 작업 절차를 지원합니다.",
      ],
    ],
  },
  "vibe-hr": {
    summary: "조직과 사원 정보부터 발령, 근태, 급여까지 다루는 웹 기반 인사시스템입니다.",
    terms: [
      [
        "HR",
        "조직과 구성원의 인사 정보를 관리하는 업무를 뜻합니다.",
      ],
      [
        "발령",
        "입사, 부서 이동, 승진처럼 사원의 소속과 직무가 달라지는 인사 처리입니다.",
      ],
      [
        "급여 Run",
        "지급 대상자와 계산 내역을 묶어 조회하고 관리하는 급여 처리 단위입니다.",
      ],
      [
        "AG Grid",
        "사원 목록처럼 많은 데이터를 표 형태로 조회하고 편집하는 화면 도구입니다.",
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
                <span className="sr-only">새 탭에서 열림</span>
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
              업무의 맥락을 이해하고
              <br />
              업무를 개선할 도구를 직접 만듭니다.
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
                  name={index === 0 ? "EHR HARNESS" : "VIBE-HR"}
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
                  {story.docMode ? "하네스 문서 읽기" : "VIBE-HR 살펴보기"}
                  {story.docMode ? (
                    <ArrowRight size={18} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={18} aria-hidden="true" />
                  )}
                  {!story.docMode && (
                    <span className="sr-only">새 탭에서 열림</span>
                  )}
                </a>
              </div>
            </article>
          ))}
        </section>
        <figure className="statement-section section-shell">
          <blockquote>
            {pullQuote.split("\n").map((line, i) => (
              <span
                key={line}
                className={i === 1 ? "statement-emphasis" : undefined}
              >
                {line}
                {i === 0 ? " " : null}
              </span>
            ))}
          </blockquote>
          <figcaption className="statement-credit">
            <span>김민석</span>
            <span className="statement-role">Backend Developer</span>
          </figcaption>
        </figure>
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
              다음 작업을
              <br />
              함께 해볼까요?
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
              복잡한 업무를 이해하고
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
              <span className="sr-only">새 탭에서 열림</span>
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
