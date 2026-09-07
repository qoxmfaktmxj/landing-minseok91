"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "about", label: "소개" },
  { id: "work", label: "프로젝트" },
  { id: "lab", label: "실험실" },
  { id: "contact", label: "연락" },
];

export default function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("main");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const boundary = (headerRef.current?.offsetHeight ?? 88) + 100;
      let current = "main";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= boundary) {
          current = section.id;
        }
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4
      ) {
        current = "contact";
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <a
        className="wordmark"
        href="#main"
        aria-label="김민석, 처음으로"
        aria-current={active === "main" ? "location" : undefined}
      >
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M3 25V7l13 13L29 7v18M3 7h8l5 5 5-5h8"
            stroke="currentColor"
            strokeWidth="2.5"
          />
        </svg>
        <span>
          minseok<span className="wordmark-dot">.</span>
        </span>
      </a>
      <nav aria-label="주요 메뉴">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? "location" : undefined}
            onClick={() =>
              document
                .getElementById(section.id)
                ?.focus({ preventScroll: true })
            }
          >
            {section.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
