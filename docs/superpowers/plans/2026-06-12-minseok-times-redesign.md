# "The Minseok Times" 랜딩페이지 재구축 — 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기존 랜딩페이지를 "The Minseok Times" 신문 컨셉(크림 페이퍼 × 네이비 잉크 × 버밀리언, 풀 액션 모션)으로 전면 재구축한다.

**Architecture:** Next.js 16 App Router 단일 페이지. 신문 섹션별 컴포넌트(`src/components/newspaper/`)를 새로 만들고 기존 섹션 컴포넌트는 전부 삭제. 콘텐츠는 `src/data/siteContent.ts` 하나에 신문 스키마로 재작성. 모션은 framer-motion 12 + lenis(스무스 스크롤)만 사용, GSAP 금지.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 3, framer-motion 12, lenis, next/font (Noto Serif KR)

**Spec:** `docs/superpowers/specs/2026-06-12-landing-redesign-design.md` — 팔레트·구조·모션·카피 톤의 단일 출처. 막히면 이 문서를 따른다.

**검증 방식(중요):** 이 프로젝트에는 테스트 프레임워크가 없다 (UI 전용 프로젝트). 각 태스크의 게이트는 `npm run lint` + `npm run build` 통과이고, 마지막 태스크에서 시각 QA(뷰포트 3종 + reduced-motion)를 수행한다. 새 테스트 프레임워크를 추가하지 말 것.

**전역 규칙:**
- 모든 애니메이션은 `transform`/`opacity`만 사용. `top/left/width/height` 애니메이션 금지 (CLS 0 유지).
- 헤드라인 텍스트는 항상 DOM에 즉시 존재해야 함 (LCP). 글자 애니메이션은 opacity/transform으로만.
- 모든 모션 컴포넌트는 `prefers-reduced-motion` 폴백 필수 (framer-motion은 MotionConfig `reducedMotion="user"`가 이미 처리, CSS 애니메이션은 `motion-reduce:` 유틸리티 사용).
- 커밋 메시지 끝에 `Co-Authored-By` 추가하지 않는다 (Codex 실행 기준).

---

### Task 0: 브랜치 생성

- [x] **Step 1: 작업 브랜치 생성**

```bash
git checkout -b redesign/minseok-times
```

---

### Task 1: 의존성 + 디자인 토큰 + 폰트

**Files:**
- Modify: `package.json` (lenis 추가 — npm install로)
- Modify: `src/app/globals.css` (전면 교체)
- Modify: `tailwind.config.ts` (전면 교체)
- Modify: `src/app/layout.tsx` (폰트·메타데이터 교체)

- [x] **Step 1: lenis 설치**

```bash
npm install lenis
```

- [x] **Step 2: `src/app/globals.css` 전면 교체**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --paper: #f3f1ea;
  --paper-white: #ffffff;
  --ink: #1b2440;
  --ink-soft: #4a5470;
  --ink-faint: #5a6280;
  --vermilion: #ff4f30;
  --vermilion-soft: #ff8a70;
  --marker: rgba(255, 79, 48, 0.18);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-family:
    "Pretendard Variable",
    "Pretendard",
    "Inter",
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--vermilion);
  outline-offset: 2px;
  border-radius: 2px;
}

::selection {
  background: var(--ink);
  color: var(--paper);
}

/* 신문 괘선 유틸리티 */
.rule-double {
  border-top: 3px solid var(--ink);
  box-shadow: 0 5px 0 -4px var(--ink);
}

/* 형광펜 마커 */
.marker-highlight {
  box-shadow: inset 0 -0.35em 0 var(--marker);
}

/* 무한 마퀴 */
@keyframes ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.ticker-track {
  animation: ticker-scroll 28s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .ticker-track {
    animation: none;
  }
}
```

- [x] **Step 3: `tailwind.config.ts` 전면 교체**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-noto-serif-kr)", "Georgia", "Times New Roman", "serif"],
        body: ["Pretendard Variable", "Pretendard", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        paper: {
          DEFAULT: "#f3f1ea",
          white: "#ffffff",
        },
        ink: {
          DEFAULT: "#1b2440",
          soft: "#4a5470",
          faint: "#5a6280",
        },
        vermilion: {
          DEFAULT: "#ff4f30",
          soft: "#ff8a70",
        },
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        headline: "-0.04em",
        wide3: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [x] **Step 4: `src/app/layout.tsx` 전면 교체**

Manrope 제거, Noto Serif KR 추가, 메타데이터 신문 컨셉으로 교체. SmoothScrollProvider/InkCursor는 이후 태스크에서 추가하므로 여기서는 임포트하지 않는다.

```tsx
import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import localFont from "next/font/local";
import MotionProvider from "@/components/providers/MotionProvider";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.minseok91.cloud"),
  title: "The Minseok Times — HR × AI × AX",
  description:
    "HR 시스템을 9년간 만들어온 개발자가 AI를 동료로 끌어들였다. 조직의 AX 전환을 단독 보도하는 단 한 부의 신문.",
  keywords: [
    "김민석",
    "AX 엔지니어",
    "HR 시스템 개발",
    "AI 활용 개발",
    "조직 AX 전환",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Minseok Times — HR × AI × AX",
    description:
      "조직의 AX 전환, 한 사람에서 시작된다. 9년차 HR 도메인 개발자의 단독 보도.",
    url: "/",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Minseok Times — HR × AI × AX",
    description:
      "조직의 AX 전환, 한 사람에서 시작된다. 9년차 HR 도메인 개발자의 단독 보도.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerifKr.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
```

- [x] **Step 5: 빌드 게이트** — 기존 섹션들이 옛 Tailwind 토큰(`surface`, `accent` 등)을 참조하므로 이 시점에는 빌드가 깨질 수 있다. 확인만 하고 넘어간다:

```bash
npm run lint
```

lint는 통과해야 함 (토큰은 클래스 문자열이라 lint 무관). `npm run build`는 Task 7 이후부터 게이트로 사용.

- [x] **Step 6: 커밋**

```bash
git add package.json package-lock.json src/app/globals.css tailwind.config.ts src/app/layout.tsx
git commit -m "feat: newspaper design tokens, fonts, and metadata for The Minseok Times"
```

---

### Task 2: 콘텐츠 데이터 전면 재작성

**Files:**
- Modify: `src/data/siteContent.ts` (전면 교체)
- Delete: `src/data/projects.ts` (siteContent로 통합)

- [x] **Step 1: `src/data/siteContent.ts` 전면 교체**

```ts
export const masthead = {
  cityLine: "SEOUL, KOREA",
  statusLine: "오늘의 커밋: 47 ✦ 빌드: PASSING",
  priceLine: "FREE · 무가지",
  volume: "VOL. 9 — NO. 2026",
  tagline: "HR × AI × AX TRANSFORMATION",
  established: "EST. 2017",
};

export interface TickerItem {
  label: string;
  text: string;
}

export const tickerItems: TickerItem[] = [
  {
    label: "BREAKING",
    text: "9년차 HR 도메인 개발자, 조직 전체를 AI로 일하게 만드는 중",
  },
  {
    label: "속보",
    text: "레거시 인사시스템, 운영 중단 없이 현대화 완료",
  },
  {
    label: "단독",
    text: "AI를 코드 생성기가 아닌 설계 파트너로 쓰는 개발자 포착",
  },
];

export interface HeadlineSegment {
  text: string;
  marker?: boolean;
}

export const frontPage = {
  headline: [
    [{ text: "조직의 " }, { text: "AX 전환", marker: true }, { text: "," }],
    [{ text: "한 사람에서 시작된다" }],
  ] as HeadlineSegment[][],
  lede: "HR 시스템을 9년간 만들어온 개발자가 AI를 도구가 아닌 동료로 끌어들였다. 기획부터 설계, 구현, 운영까지 — 일하는 방식 전체가 바뀌고 있다.",
  byline: "BY KIM MINSEOK — AX ENGINEER · 본지 단독",
};

export const profileColumn = {
  kicker: "PROFILE — 인물",
  title: "“AI는 코드 생성기가 아니라 설계 파트너”",
  body: "사람, 조직, 권한, 공통코드가 얽힌 엔터프라이즈 HR 도메인을 실무 문맥으로 이해한다. 새 도구는 빠르게 익히되, 실제 문제를 푸는지 먼저 검증한다. AI를 탐색·설계 보조·문서화 가속 장치로 쓰는 것이 그의 방식이다.",
};

export const pullQuote = "빅뱅 교체보다,\n멈추지 않는\n점진적 현대화.";

export interface StatItem {
  value: number | null;
  display: string;
  label: string;
}

export const stats: StatItem[] = [
  { value: 9, display: "9+", label: "YEARS IN HR" },
  { value: 5, display: "5", label: "LIVE PRODUCTS" },
  { value: null, display: "1st", label: "AX LEADER" },
];

export interface FeatureStoryItem {
  id: string;
  kicker: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  url: string;
  urlLabel: string;
  tech: string[];
  accessNote?: string;
}

export const featureStories: FeatureStoryItem[] = [
  {
    id: "vibe-hr",
    kicker: "특집 — FEATURE STORY",
    title: "경량 인사시스템 'VIBE HR', 최신 스택으로 다시 태어나다",
    problem:
      "무겁고 노후한 인사시스템은 작은 변경에도 큰 비용이 든다. 현업은 기다리다 지치고, 개발자는 레거시에 갇힌다.",
    approach:
      "Next.js + Prisma 경량 스택으로 핵심 인사 도메인을 재구성했다. AI 활용 개발로 설계부터 문서화까지 한 흐름으로 연결해 MVP 속도를 끌어올렸다.",
    result:
      "로그인해서 바로 만져볼 수 있는 라이브 인사시스템. 조직·인사 데이터 관리의 핵심 흐름이 가볍게 돌아간다.",
    url: "https://hr.minseok91.cloud/",
    urlLabel: "hr.minseok91.cloud",
    tech: ["Next.js", "React", "PostgreSQL", "Prisma", "shadcn/ui"],
    accessNote: "로그인: admin / admin",
  },
  {
    id: "withhold-tax",
    kicker: "연속 기획 — HR 도메인의 깊이",
    title: "원천징수 레퍼런스 — 모든 사실에 법령 조문이 박혀 있다",
    problem:
      "원천징수 실무는 법령 조문·시행일·개정 이력이 흩어져 있어 '이 값이 지금 맞는지' 검증하기 어렵다.",
    approach:
      "모든 핵심 사실에 출처(조문)·시행일·검증상태를 스키마(zod)로 강제했다. 출처 없는 문장은 빌드가 거부한다.",
    result:
      "HR/페이롤 도메인 지식이 코드 구조로 증명되는 출처 중심 실무 레퍼런스.",
    url: "https://withhold.minseok91.cloud/",
    urlLabel: "withhold.minseok91.cloud",
    tech: ["Next.js", "TypeScript", "Tailwind v4", "MDX", "zod"],
  },
];

export const classified = {
  sectionTitle: "CLASSIFIED — 광고면",
  urgentAd: {
    badge: "긴급구인 · URGENT",
    title: "AX 엔지니어 구함 — 단, 1명뿐",
    body: "HR 도메인 9년 + AI 네이티브 개발. 귀사의 AI 전환을 이끌 사람. 재고 소진 임박.",
    ctaLabel: "지금 연락하기 →",
    ctaHref: "mailto:qoxmfaktmxj@naver.com",
  },
};

export interface LabAd {
  id: string;
  name: string;
  description: string;
  href: string;
}

export const labAds: LabAd[] = [
  {
    id: "vibe-grid",
    name: "VibeGrid",
    description: "대량 데이터를 다루는 업무용 그리드 실험",
    href: "https://grid.minseok91.cloud/",
  },
  {
    id: "hire-flow",
    name: "HireFlow",
    description: "최신 채용 트렌드를 반영한 채용시스템 실험",
    href: "https://rec.minseok91.cloud/",
  },
  {
    id: "maru",
    name: "MARU",
    description: "인테리어 커머스 프로토타입",
    href: "https://shop.minseok91.cloud/",
  },
];

export const colophon = {
  publisher: "발행인 겸 편집장 · 김민석",
  links: [
    { label: "GitHub", href: "https://github.com/qoxmfaktmxj" },
    { label: "Tech Blog", href: "https://qoxmfaktmxj.github.io" },
    { label: "Contact", href: "mailto:qoxmfaktmxj@naver.com" },
  ],
  copyright: "© 2026 The Minseok Times. All rights reserved. 모든 기사는 실화입니다.",
};
```

- [x] **Step 2: `src/data/projects.ts` 삭제**

```bash
rm src/data/projects.ts
```

(이 파일을 임포트하는 옛 컴포넌트는 Task 9에서 함께 삭제된다. 이 시점 빌드 실패는 무시.)

- [x] **Step 3: 커밋**

```bash
git add src/data/siteContent.ts
git rm src/data/projects.ts 2>/dev/null || git add -A src/data
git commit -m "feat: rewrite site content as newspaper copy schema"
```

---

### Task 3: 스무스 스크롤 프로바이더

**Files:**
- Create: `src/components/providers/SmoothScrollProvider.tsx`
- Modify: `src/app/layout.tsx` (프로바이더 적용)

- [ ] **Step 1: `src/components/providers/SmoothScrollProvider.tsx` 생성**

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const lenis = new Lenis({ duration: 1.1 });
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: `src/app/layout.tsx`의 body 래핑 수정**

```tsx
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
```

body 내부를 다음으로 교체:

```tsx
      <body className="antialiased">
        <MotionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionProvider>
      </body>
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/providers/SmoothScrollProvider.tsx src/app/layout.tsx
git commit -m "feat: add lenis smooth scroll provider"
```

---

### Task 4: Masthead + BreakingTicker

**Files:**
- Create: `src/components/newspaper/Masthead.tsx`
- Create: `src/components/newspaper/BreakingTicker.tsx`

- [ ] **Step 1: `src/components/newspaper/Masthead.tsx` 생성** (서버 컴포넌트, 정적)

```tsx
import { masthead } from "@/data/siteContent";

export default function Masthead() {
  return (
    <header className="px-5 pt-8 md:px-10 md:pt-12">
      <div className="mx-auto max-w-container">
        <div className="flex items-center justify-between border-b border-ink pb-2 font-mono text-[10px] tracking-[0.15em] text-ink-soft md:text-xs">
          <span>{masthead.cityLine}</span>
          <span className="hidden md:inline">{masthead.statusLine}</span>
          <span>{masthead.priceLine}</span>
        </div>
        <h1 className="my-5 text-center font-serif text-[13vw] font-black leading-none tracking-tight text-ink md:my-8 md:text-8xl">
          The <span className="text-vermilion">Minseok</span> Times
        </h1>
        <div className="rule-double flex items-center justify-between py-2 font-mono text-[10px] tracking-[0.15em] text-ink-soft md:text-xs">
          <span>{masthead.volume}</span>
          <span className="font-bold text-ink">{masthead.tagline}</span>
          <span>{masthead.established}</span>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: `src/components/newspaper/BreakingTicker.tsx` 생성**

콘텐츠를 2벌 복제해 `translateX(-50%)` 루프 (CSS keyframes는 Task 1의 `.ticker-track`).

```tsx
import { tickerItems } from "@/data/siteContent";

export default function BreakingTicker() {
  return (
    <div className="mt-3 overflow-hidden bg-ink py-2 text-paper">
      <div className="ticker-track flex w-max whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex" aria-hidden={dup === 1}>
            {tickerItems.map((item) => (
              <span
                key={`${dup}-${item.label}-${item.text}`}
                className="mx-6 font-mono text-[11px] tracking-[0.2em] md:text-xs"
              >
                <strong className="mr-2 font-bold text-vermilion-soft">
                  {item.label}
                </strong>
                {item.text}
                <span className="ml-6 text-ink-faint">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/newspaper/Masthead.tsx src/components/newspaper/BreakingTicker.tsx
git commit -m "feat: add masthead and breaking news ticker"
```

---

### Task 5: 1면 헤드라인 (Hero)

**Files:**
- Create: `src/components/newspaper/FrontPageHeadline.tsx`

- [ ] **Step 1: `src/components/newspaper/FrontPageHeadline.tsx` 생성**

글자 단위 stagger 등장 (스탬프 느낌). 텍스트는 항상 DOM에 존재하고 opacity/transform만 애니메이션.

```tsx
"use client";

import { motion } from "framer-motion";
import { frontPage } from "@/data/siteContent";

const lineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.15 },
  },
};

const charVariant = {
  hidden: { opacity: 0, y: 14, scale: 1.15 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 420, damping: 26 },
  },
};

export default function FrontPageHeadline() {
  return (
    <section className="border-b border-ink px-5 md:px-10">
      <div className="mx-auto max-w-container py-12 md:py-20">
        <motion.h2
          className="text-[11vw] font-black leading-[1.02] tracking-headline text-ink md:text-7xl lg:text-8xl"
          variants={lineContainer}
          initial="hidden"
          animate="visible"
        >
          {frontPage.headline.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map((seg, segIdx) => (
                <span
                  key={segIdx}
                  className={seg.marker ? "marker-highlight" : undefined}
                >
                  {Array.from(seg.text).map((ch, chIdx) => (
                    <motion.span
                      key={chIdx}
                      variants={charVariant}
                      className="inline-block whitespace-pre"
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </motion.h2>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-ink-faint md:mt-8 md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {frontPage.lede}
        </motion.p>
        <motion.p
          className="mt-5 font-mono text-[10px] tracking-[0.25em] text-ink-soft md:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {frontPage.byline}
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/newspaper/FrontPageHeadline.tsx
git commit -m "feat: add front page headline with per-character stamp animation"
```

---

### Task 6: 3칼럼 기사 (Profile / Quote / Numbers)

**Files:**
- Create: `src/components/newspaper/CountUp.tsx`
- Create: `src/components/newspaper/ThreeColumns.tsx`

- [ ] **Step 1: `src/components/newspaper/CountUp.tsx` 생성**

```tsx
"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

export default function CountUp({
  to,
  display,
}: {
  to: number | null;
  display: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (to === null || !inView || !ref.current) return;
    if (reduced) {
      ref.current.textContent = display;
      return;
    }
    const suffix = display.replace(String(to), "");
    const controls = animate(value, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [inView, to, display, value, reduced]);

  return <span ref={ref}>{to === null ? display : `0`}</span>;
}
```

- [ ] **Step 2: `src/components/newspaper/ThreeColumns.tsx` 생성**

칼럼별 패럴랙스(스크롤 속도 차)는 `useScroll` + `useTransform`으로 y 오프셋만 다르게 준다.

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profileColumn, pullQuote, stats } from "@/data/siteContent";
import CountUp from "./CountUp";

export default function ThreeColumns() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const y2 = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const y3 = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <section ref={sectionRef} className="border-b border-ink px-5 md:px-10">
      <div className="mx-auto grid max-w-container grid-cols-1 md:grid-cols-3">
        <motion.article
          style={{ y: y1 }}
          className="border-b border-ink py-8 pr-0 md:border-b-0 md:border-r md:py-12 md:pr-8"
        >
          <span className="mb-3 block font-mono text-[10px] font-bold tracking-[0.25em] text-vermilion">
            {profileColumn.kicker}
          </span>
          <h3 className="mb-4 text-xl font-extrabold tracking-tight text-ink md:text-2xl">
            {profileColumn.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">
            {profileColumn.body}
          </p>
        </motion.article>

        <motion.div
          style={{ y: y2 }}
          className="flex items-center justify-center border-b border-ink px-0 py-10 md:border-b-0 md:border-r md:px-8 md:py-12"
        >
          <blockquote className="whitespace-pre-line text-center font-serif text-2xl font-bold italic leading-snug text-ink md:text-3xl">
            {pullQuote}
          </blockquote>
        </motion.div>

        <motion.div style={{ y: y3 }} className="py-8 md:py-12 md:pl-8">
          <span className="mb-4 block font-mono text-[10px] font-bold tracking-[0.25em] text-vermilion">
            BY THE NUMBERS
          </span>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-ink bg-paper-white px-2 py-4 text-center"
              >
                <span className="block text-2xl font-black tracking-tight text-ink md:text-3xl">
                  <CountUp to={stat.value} display={stat.display} />
                </span>
                <span className="mt-1 block font-mono text-[8px] tracking-wider text-ink-faint md:text-[9px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/newspaper/CountUp.tsx src/components/newspaper/ThreeColumns.tsx
git commit -m "feat: add three-column article section with parallax and count-up stats"
```

---

### Task 7: 특집 기사 (다크 반전, 케이스 스터디 2건)

**Files:**
- Create: `src/components/newspaper/FeatureStory.tsx`

- [ ] **Step 1: `src/components/newspaper/FeatureStory.tsx` 생성**

다크(잉크) 배경 반전 섹션. 카드 호버 시 커서를 따라다니는 "LIVE" 프리뷰 칩 (`useMotionValue` + `useSpring`). 모바일(coarse pointer)에서는 칩 미표시, 카드 전체가 링크.

```tsx
"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { featureStories } from "@/data/siteContent";
import type { FeatureStoryItem } from "@/data/siteContent";

function StoryCard({ story }: { story: FeatureStoryItem }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 30 });
  const sy = useSpring(my, { stiffness: 300, damping: 30 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <a
      ref={cardRef}
      href={story.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block border border-paper/20 p-6 transition-colors hover:border-vermilion-soft md:p-10"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="open"
    >
      <span className="mb-3 block font-mono text-[10px] font-bold tracking-[0.25em] text-vermilion-soft">
        {story.kicker}
      </span>
      <h3 className="mb-6 text-2xl font-black leading-tight tracking-tight text-paper md:text-4xl">
        {story.title}
      </h3>
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          ["문제", story.problem],
          ["접근", story.approach],
          ["결과", story.result],
        ].map(([label, text]) => (
          <div key={label}>
            <span className="mb-2 block border-b border-paper/20 pb-1 font-mono text-[10px] tracking-[0.25em] text-paper/50">
              {label}
            </span>
            <p className="text-sm leading-relaxed text-paper/70">{text}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {story.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-paper/30 px-3 py-1 font-mono text-[10px] text-paper/70"
          >
            {t}
          </span>
        ))}
        {story.accessNote && (
          <span className="font-mono text-[10px] text-paper/40">
            {story.accessNote}
          </span>
        )}
      </div>
      <span className="mt-6 block font-mono text-xs tracking-widest text-vermilion-soft">
        LIVE — {story.urlLabel} ↗
      </span>

      {!reduced && hovered && (
        <motion.span
          className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-full rounded-sm bg-vermilion px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest text-paper-white [@media(pointer:fine)]:block"
          style={{ x: sx, y: sy, left: 0, top: -8 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          OPEN LIVE ↗
        </motion.span>
      )}
    </a>
  );
}

export default function FeatureStory() {
  return (
    <section className="bg-ink px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-container">
        <div className="mb-10 border-b border-paper/30 pb-2 text-center font-mono text-[11px] font-bold tracking-wide3 text-paper/70">
          FEATURE — 특집
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {featureStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/newspaper/FeatureStory.tsx
git commit -m "feat: add dark feature story section with cursor-following live preview chip"
```

---

### Task 8: 광고면 (긴급구인 CTA + Lab) + 판권 푸터

**Files:**
- Create: `src/components/newspaper/ClassifiedSection.tsx`
- Create: `src/components/newspaper/ColophonFooter.tsx`

- [ ] **Step 1: `src/components/newspaper/ClassifiedSection.tsx` 생성**

```tsx
"use client";

import { motion } from "framer-motion";
import { classified, labAds } from "@/data/siteContent";

export default function ClassifiedSection() {
  return (
    <section className="px-5 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-container">
        <div className="rule-double mb-10 border-b border-ink pb-2 pt-2 text-center font-mono text-[11px] font-bold tracking-wide3 text-ink">
          {classified.sectionTitle}
        </div>

        <motion.div
          className="mx-auto max-w-2xl -rotate-1 border-2 border-dashed border-vermilion bg-paper-white p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
        >
          <span className="mb-4 inline-block animate-pulse bg-vermilion px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-paper-white motion-reduce:animate-none">
            {classified.urgentAd.badge}
          </span>
          <h3 className="mb-3 text-2xl font-black tracking-tight text-ink md:text-4xl">
            {classified.urgentAd.title}
          </h3>
          <p className="mb-8 text-sm leading-relaxed text-ink-soft md:text-base">
            {classified.urgentAd.body}
          </p>
          <a
            href={classified.urgentAd.ctaHref}
            className="inline-block rounded-full bg-vermilion px-8 py-3 text-sm font-extrabold text-paper-white transition-transform hover:scale-105 active:scale-95"
            data-cursor="contact"
          >
            {classified.urgentAd.ctaLabel}
          </a>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {labAds.map((ad, i) => (
            <motion.a
              key={ad.id}
              href={ad.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink bg-paper-white p-5 transition-colors hover:bg-paper"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-cursor="open"
            >
              <span className="mb-1 block font-mono text-[10px] tracking-[0.2em] text-vermilion">
                LAB ✦
              </span>
              <span className="block text-base font-extrabold text-ink">
                {ad.name}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-ink-faint">
                {ad.description}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: `src/components/newspaper/ColophonFooter.tsx` 생성** (서버 컴포넌트)

```tsx
import { colophon } from "@/data/siteContent";

export default function ColophonFooter() {
  return (
    <footer className="border-t-2 border-ink px-5 py-8 md:px-10">
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 md:flex-row md:justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">
          {colophon.publisher}
        </span>
        <nav className="flex gap-6">
          {colophon.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="font-mono text-xs font-bold tracking-widest text-ink underline-offset-4 transition-colors hover:text-vermilion hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span className="text-center font-mono text-[10px] text-ink-faint">
          {colophon.copyright}
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/newspaper/ClassifiedSection.tsx src/components/newspaper/ColophonFooter.tsx
git commit -m "feat: add classified job-ad CTA, lab ads, and colophon footer"
```

---

### Task 9: 인쇄 인트로 + 잉크 커서

**Files:**
- Create: `src/components/newspaper/PrintIntro.tsx`
- Create: `src/components/newspaper/InkCursor.tsx`

- [ ] **Step 1: `src/components/newspaper/PrintIntro.tsx` 생성**

세션당 1회(sessionStorage), 총 1.8초, 클릭으로 스킵. 콘텐츠를 가리는 오버레이 방식이지만 LCP 텍스트는 DOM에 이미 존재.

```tsx
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "minseok-times-intro-seen";

export default function PrintIntro() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShow(true);
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-paper"
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={() => setShow(false)}
          role="presentation"
        >
          <div className="text-center">
            <motion.p
              className="font-serif text-4xl font-black tracking-tight text-ink md:text-6xl"
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              The <span className="text-vermilion">Minseok</span> Times
            </motion.p>
            <motion.div
              className="mx-auto mt-4 h-0.5 bg-ink"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
            <motion.p
              className="mt-3 font-mono text-[10px] tracking-[0.3em] text-ink-soft"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              NOW PRINTING — VOL.9
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: `src/components/newspaper/InkCursor.tsx` 생성**

`pointer: fine` + 모션 허용 환경에서만 렌더. `data-cursor` 속성 가진 요소 호버 시 도장 라벨로 확대.

```tsx
"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const LABELS: Record<string, string> = {
  open: "OPEN",
  read: "READ",
  contact: "HIRE",
};

export default function InkCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 500, damping: 35 });
  const sy = useSpring(my, { stiffness: 500, damping: 35 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]",
      );
      setLabel(target ? (LABELS[target.dataset.cursor ?? ""] ?? null) : null);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full bg-vermilion font-mono text-[9px] font-bold text-paper-white"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: label ? 52 : 10,
        height: label ? 52 : 10,
        opacity: 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {label}
    </motion.div>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/newspaper/PrintIntro.tsx src/components/newspaper/InkCursor.tsx
git commit -m "feat: add print intro overlay and ink stamp custom cursor"
```

---

### Task 10: 페이지 조립 + 구 컴포넌트 삭제

**Files:**
- Modify: `src/app/page.tsx` (전면 교체)
- Delete: `src/components/sections/` 전체 (9개 파일)
- Delete: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`
- Delete: `src/components/ui/ProjectCard.tsx`, `ScrollReveal.tsx`, `SectionFrame.tsx`, `SectionHeader.tsx`, `TechTag.tsx`

- [ ] **Step 1: `src/app/page.tsx` 전면 교체**

```tsx
import Masthead from "@/components/newspaper/Masthead";
import BreakingTicker from "@/components/newspaper/BreakingTicker";
import FrontPageHeadline from "@/components/newspaper/FrontPageHeadline";
import ThreeColumns from "@/components/newspaper/ThreeColumns";
import FeatureStory from "@/components/newspaper/FeatureStory";
import ClassifiedSection from "@/components/newspaper/ClassifiedSection";
import ColophonFooter from "@/components/newspaper/ColophonFooter";
import PrintIntro from "@/components/newspaper/PrintIntro";
import InkCursor from "@/components/newspaper/InkCursor";

export default function Home() {
  return (
    <>
      <PrintIntro />
      <InkCursor />
      <Masthead />
      <BreakingTicker />
      <main>
        <FrontPageHeadline />
        <ThreeColumns />
        <FeatureStory />
        <ClassifiedSection />
      </main>
      <ColophonFooter />
    </>
  );
}
```

- [ ] **Step 2: 구 컴포넌트 삭제**

```bash
git rm -r src/components/sections
git rm src/components/layout/Navbar.tsx src/components/layout/Footer.tsx
git rm src/components/ui/ProjectCard.tsx src/components/ui/ScrollReveal.tsx src/components/ui/SectionFrame.tsx src/components/ui/SectionHeader.tsx src/components/ui/TechTag.tsx
```

`src/components/layout/`, `src/components/ui/` 디렉토리가 비면 디렉토리도 제거된다. `src/lib/utils.ts`는 다른 곳에서 쓸 수 있으니 임포트 검색 후 미사용이면 함께 삭제:

```bash
grep -rn "lib/utils" src/ || git rm src/lib/utils.ts
```

- [ ] **Step 3: 전체 게이트 — lint + build**

```bash
npm run lint
npm run build
```

Expected: 둘 다 에러 0. 실패 시 임포트 누락/옛 토큰 잔존 여부 확인 (`grep -rn "surface\|on-surface\|accent-" src/`).

- [ ] **Step 4: 커밋**

```bash
git add -A
git commit -m "feat: assemble The Minseok Times page and remove legacy sections"
```

---

### Task 11: 시각 QA + 마무리

- [ ] **Step 1: 개발 서버 기동 후 3개 뷰포트 확인**

```bash
npm run dev
```

http://localhost:3010 에서:
- 375px (모바일): 제호 줄바꿈 없이 1줄(13vw), 3칼럼이 세로 스택, 커서/패럴랙스 미동작, 티커 동작
- 768px (태블릿): 3칼럼 그리드 전환 확인
- 1440px (데스크톱): 커스텀 커서, 호버 프리뷰 칩, 패럴랙스 동작

- [ ] **Step 2: reduced-motion 검증**

브라우저 DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce" 설정 후:
- 인트로 미표시, 티커 정지, 커서 미표시, 카운트업 즉시 최종값, 콘텐츠는 전부 보임

- [ ] **Step 3: 링크 전수 확인**

클릭 대상 7개: hr.minseok91.cloud / withhold.minseok91.cloud / grid.minseok91.cloud / rec.minseok91.cloud / shop.minseok91.cloud / github.com/qoxmfaktmxj / qoxmfaktmxj.github.io + mailto 2곳.

- [ ] **Step 4: 발견된 문제 수정 후 최종 커밋**

```bash
git add -A
git commit -m "fix: visual QA adjustments for newspaper layout"
```

(수정 사항 없으면 이 커밋은 생략)

- [ ] **Step 5: 결과 보고**

변경 요약, 스크린샷(가능하면 3개 뷰포트), 남은 이슈를 보고하고 merge 여부는 사용자에게 맡긴다. main에 직접 push 금지.
