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
    text: "같은 AI, 다른 결과 — AI를 제대로 활용하는 개발자",
  },
];

export interface HeadlineSegment {
  text: string;
  marker?: boolean;
}

export const frontPage = {
  headline: [
    [{ text: "AI를 제대로 이해하고 쓴다는 것" }],
    [{ text: "결과가", marker: true }, { text: " 증명한다" }],
  ] as HeadlineSegment[][],
  lede: "사내 AI TFT를 이끌고 레거시 인사시스템 전용 하네스를 팀에 배포했습니다. AI가 시스템을 이해하게 만든, 결과로 증명하는 개발자입니다.",
  byline: "BY KIM MINSEOK — BACKEND DEVELOPER · 본지 단독",
};

export const profileColumn = {
  kicker: "PROFILE — 인물",
  title: "도메인 전문성 × AI = 몇 배의 생산성",
  body: "HR 도메인에 강점을 가진 9년차 백엔드 개발자입니다. 팀의 AI 전환을 위해 사내 AI TFT를 맡아 직접 만든 하네스를 팀에 배포했고, 노후 사내 시스템을 고도화하며, 사내 인사시스템 지식의 암묵지 활용을 위해 사내 LLM 위키를 개발하고 있습니다.",
};

export const pullQuote = "먼저 AI가\n잘 일할 수 있는 환경을\n설계합니다.";

export interface StatItem {
  value: number | null;
  display: string;
  label: string;
}

export const stats: StatItem[] = [
  { value: 9, display: "9+", label: "YEARS IN IT" },
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
      "Oracle 프로시저로 뒤엉킨 레거시 인사시스템(EHR)은 구조가 방대해 AI 코딩 에이전트가 맥락을 잡지 못합니다. 잘못된 코드와 답변이 나오는 이유입니다.",
    approach:
      "“하네스 만들어줘” 한 마디로 EHR 프로젝트를 심층 분석해, 프로젝트에 맞춤화된 하네스(규칙·지식·도구 패키지) 약 40개 파일을 자동 생성하는 Claude Code 플러그인을 직접 설계하고 구축했습니다. EHR4·EHR5·클라우드 MSA 3개 프로파일과 연말정산 전용 플러그인까지 확장했습니다.",
    result:
      "팀에 배포해 동료 약 20명이 사용 중이며, 팀 표준 개발 방법론으로 확정됐습니다. 현재 v1.14 기준 DB 무접속 보안 정책(접속 CLI 18종 차단)과 자동 점검(audit), 쓸수록 지식이 쌓이는 학습 사이클까지 갖췄습니다.",
    url: "/README_HARNESS.html",
    urlLabel: "README_HARNESS",
    previewImage: "/images/harness-thumb.png",
    previewAlt: "EHR Harness Plugin README 화면 미리보기",
    tech: ["Claude Code Plugin", "Oracle / Tibero", "MyBatis", "superpowers"],
    accessNote: "사내 배포 · 팀원 약 20명 사용",
    docMode: true,
  },
  {
    id: "jarvis",
    kicker: "연속 기획 — AI 지식 플랫폼",
    title: "흩어진 사내 지식을 근거와 함께 답하는 Jarvis",
    problem:
      "사내 업무·인사·개발 지식은 여러 시스템과 문서에 흩어져 있고, 일반적인 AI 답변은 어떤 근거에서 나온 것인지 확인하기 어렵습니다.",
    approach:
      "사내 업무 시스템과 Git 기반 위키를 하나로 묶고, LLM이 관련 문서를 검색하고 직접 읽은 뒤 근거를 인용하도록 tool-use agent를 설계했습니다. CLI Proxy를 통해 구독형 LLM을 연결하고 문서 이력과 검토 흐름까지 함께 관리합니다.",
    result:
      "검색·업무·위키·AI 질문을 한곳에서 처리하면서도 답변의 출처와 변경 이력을 추적할 수 있는 엔터프라이즈 지식 플랫폼을 구축했습니다.",
    url: "https://jarvis.minseok91.cloud/",
    urlLabel: "jarvis.minseok91.cloud",
    previewImage: "/images/jarvis-thumb.png",
    previewAlt: "Jarvis 사내 업무 및 지식 플랫폼 대시보드 화면",
    tech: ["Next.js", "PostgreSQL", "Git Wiki", "LLM Agent"],
    accessNote: "라이브 서비스 · 로그인이 필요할 수 있습니다",
  },
];

export const classified = {
  sectionTitle: "CLASSIFIED",
  urgentAd: {
    badge: "긴급구인 · URGENT",
    title: "백엔드 개발자 — 재고 1개",
    body: "HR 도메인에 강한 9년차 백엔드 개발자. 팀의 AI 전환(AX)을 이끌며 팀의 생산성을 높입니다. 재고 소진 임박.",
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
    description: "최신 채용 트렌드를 반영한 채용시스템",
    href: "https://rec.minseok91.cloud/",
  },
  {
    id: "maru",
    name: "MARU",
    description: "인테리어 커머스 프로토타입",
    href: "https://shop.minseok91.cloud/",
  },
  {
    id: "worldcup",
    name: "World Cup",
    description: "2002부터 2026까지 역대 월드컵 현황을 한눈에",
    href: "https://worldcup.minseok91.cloud/",
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
