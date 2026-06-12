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
  previewImage: string;
  previewAlt: string;
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
    previewImage: "/images/hr-thumb-new.png",
    previewAlt: "VIBE HR 라이브 인사시스템 화면 미리보기",
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
    previewImage: "/images/withhold-thumb.png",
    previewAlt: "원천징수 레퍼런스 라이브 화면 미리보기",
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
