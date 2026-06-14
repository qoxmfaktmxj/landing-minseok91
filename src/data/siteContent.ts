export const masthead = {
  cityLine: "SEOUL, KOREA",
  statusLine: "BUILD: PASSING ✦ DEPLOY: LIVE",
  priceLine: "무료 · FREE COPY",
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
    text: "9년차 HR 도메인 개발자, AI를 활용해 팀 전체의 생산성을 끌어올린다",
  },
  {
    label: "속보",
    text: "레거시 인사시스템에 자체 구축한 하네스 엔지니어링 적용 — AI가 코드베이스를 읽고 답하기 시작",
  },
  {
    label: "단독",
    text: "같은 AI, 다른 결과 — 생산성을 곱하는 개발자",
  },
];

export interface HeadlineSegment {
  text: string;
  marker?: boolean;
}

export const frontPage = {
  headline: [
    [{ text: "AI를 제대로 쓴다는 것" }],
    [{ text: "— " }, { text: "결과가", marker: true }, { text: " 증명한다" }],
  ] as HeadlineSegment[][],
  lede: "사내 AI TFT를 이끌고 하네스를 팀에 배포했다. 레거시 인사시스템까지 AI가 이해하게 만든, 결과로 증명하는 개발자.",
  byline: "BY KIM MINSEOK — AX ENGINEER · 본지 단독",
};

export const profileColumn = {
  kicker: "PROFILE — 인물",
  title: "도메인 전문성 × AI = 몇 배의 생산성",
  body: "HR 도메인에 강점을 가진 9년차 백엔드 개발자. 지금은 AI 네이티브로 개발하며 조직의 AI 전환(AX)을 이끈다. 사내 AI TFT를 맡아 직접 만든 하네스 엔지니어링을 팀에 배포했고, 노후 사내 시스템을 사내 LLM 위키로 통합하는 중이다. 도구를 쫓기보다 실제 문제를 푸는지 먼저 검증하는 것이 그의 방식이다.",
};

export const pullQuote = "AI에게 먼저,\n코드베이스를\n읽는 눈을 준다.";

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
  previewImage: string;
  previewAlt: string;
  tech: string[];
  accessNote?: string;
  docMode?: boolean;
}

export const featureStories: FeatureStoryItem[] = [
  {
    id: "ehr-harness",
    kicker: "특집 — FEATURE STORY",
    title: "레거시 인사시스템에 ‘AI 코딩 하네스’를 입히다",
    problem:
      "Oracle 프로시저로 뒤엉킨 레거시 인사시스템(EHR)은 구조가 방대해 AI 코딩 에이전트가 맥락을 잡지 못한다. 엉뚱한 답과 코드가 나오는 이유다.",
    approach:
      "“하네스 만들어줘” 한 마디로 EHR 프로젝트를 심층 분석해, 프로젝트에 맞춤화된 하네스(규칙·지식·도구 패키지)를 자동 생성하는 Claude Code 플러그인을 직접 설계하고 구축했다.",
    result:
      "팀에 배포해 동료 약 20명이 사용 중. AI가 레거시 코드베이스를 이해하고, 답하고, 맞춤 코드까지 생성하는 환경이 완성됐다.",
    url: "/README_HARNESS.html",
    urlLabel: "README_HARNESS",
    previewImage: "/images/harness-thumb.png",
    previewAlt: "EHR Harness Plugin README 화면 미리보기",
    tech: ["Claude Code Plugin", "Oracle / Tibero", "MyBatis", "superpowers"],
    accessNote: "사내 배포 · 팀원 약 20명 사용",
    docMode: true,
  },
  {
    id: "withhold-tax",
    kicker: "연속 기획 — HR 도메인의 깊이",
    title: "법령으로 검증되는 원천징수 실무 레퍼런스",
    problem:
      "원천징수 실무는 법령 조문·시행일·개정 이력이 흩어져 있어 '이 값이 지금 맞는지' 검증하기 어렵다.",
    approach:
      "모든 핵심 사실에 출처(조문)·시행일·검증상태를 스키마(zod)로 강제했다. 출처 없는 문장은 빌드가 거부한다.",
    result:
      "HR 도메인 지식을 한층 끌어올려 주는, 출처 중심의 실무 레퍼런스.",
    url: "https://withhold.minseok91.cloud/",
    urlLabel: "withhold.minseok91.cloud",
    previewImage: "/images/withhold-thumb.png",
    previewAlt: "원천징수 레퍼런스 라이브 화면 미리보기",
    tech: ["Next.js", "TypeScript", "Tailwind v4", "MDX", "zod"],
  },
];

export const classified = {
  sectionTitle: "CLASSIFIED — 광고면",
  urgentAd: {
    badge: "긴급구인 · URGENT",
    title: "백엔드 개발자 — 재고 1개",
    body: "HR 도메인에 강한 9년차 백엔드 개발자. 지금은 AI 네이티브로 개발하며, 조직의 AI 전환(AX)까지 이끈다. 재고 소진 임박.",
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
    id: "vibe-hr",
    name: "VIBE HR",
    description: "경량 인사시스템 라이브 데모 (admin / admin)",
    href: "https://hr.minseok91.cloud/",
  },
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
