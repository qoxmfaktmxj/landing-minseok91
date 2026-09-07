export const masthead = {
  cityLine: "SEOUL, KOREA",
  statusLine: "BUILD: PASSING ✦ DEPLOY: LIVE",
  priceLine: "무료 / FREE COPY",
  volume: "VOL. 9 / NO. 2026",
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
    text: "개발 9년 차, HR 경력 4년 이상. 업무 이해를 바탕으로 AI를 적용합니다.",
  },
  {
    label: "속보",
    text: "사내 AI TFT 완료, 성과를 바탕으로 Claude Code 전사 도입 결정",
  },
  {
    label: "단독",
    text: "2개 팀 30명 이상이 활용하는 EHR Harness Plugin, 소속 팀 공식 개발방법론으로 채택",
  },
];

export interface HeadlineSegment {
  text: string;
  marker?: boolean;
}

export const frontPage = {
  headline: [
    [{ text: "AI로 필요한 서비스를 만들고 있습니다." }],
    [{ text: "팀에서 함께 쓸 AI 도구도 직접 만듭니다." }],
  ] as HeadlineSegment[][],
  lede: "사내 AI TFT를 리더로서 마무리했으며, 그 성과를 바탕으로 Claude Code 전사 도입이 결정됐습니다. HR 업무 이해를 바탕으로 AI 도구와 업무시스템을 직접 만들고 사용자 교육까지 수행합니다.",
  byline: "BY KIM MINSEOK / BACKEND DEVELOPER / 본지 단독",
};

export const profileColumn = {
  kicker: "PROFILE / 인물",
  title: "업무를 이해하고 AI로 개선하는 개발자",
  body: "업무시스템 개발 9년 차로, 2022년부터 HR 시스템의 구축과 운영을 담당했습니다. 현재 인사시스템 유지보수 파트를 이끌며 고객 요구사항 협의와 팀원 교육을 맡고 있습니다. 사내 업무시스템과 LLM Wiki를 하나의 사이트로 통합했고, 현재 Oracle 데이터 이관과 타 시스템 연계를 진행하고 있습니다.",
};

export const pullQuote = "먼저 AI가\n잘 일할 수 있는 환경을\n설계합니다.";

export interface StatItem {
  value: number | null;
  display: string;
  label: string;
}

export const stats: StatItem[] = [
  { value: 9, display: "9th", label: "YEAR IN IT" },
  { value: 30, display: "30+", label: "HARNESS USERS" },
  { value: 4, display: "4", label: "AI TRAININGS" },
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
    kicker: "특집 / FEATURE STORY",
    title: "레거시 인사시스템에 ‘AI 코딩 하네스’를 입히다",
    problem:
      "Oracle 프로시저로 뒤엉킨 레거시 인사시스템(EHR)은 구조가 방대해 AI 코딩 에이전트가 맥락을 잡지 못합니다. 잘못된 코드와 답변이 나오는 이유입니다.",
    approach:
      "고객사별 인사 규정과 권한, 결재 구조를 AI가 참고하도록 업무 맥락과 코드 분석 기준, 검증 절차를 제공하는 EHR Harness Plugin을 단독으로 설계하고 개발했습니다. 프로젝트별 규칙과 코드 탐색, 변경 영향 검토를 표준화했습니다.",
    result:
      "2개 팀 30명 이상에게 배포되어 활용됐고, 소속 팀의 공식 개발방법론으로 채택됐습니다. 이후에도 사용자 피드백을 반영해 버전 업데이트를 진행하고 있습니다. 사내 AI 교육은 4회 수행했으며, AI TFT 성과를 바탕으로 Claude Code 전사 도입이 결정됐습니다.",
    url: "/README_HARNESS.html",
    urlLabel: "README_HARNESS",
    previewImage: "/images/harness-thumb-cinematic.png",
    previewAlt: "EHR Harness Plugin README 화면 미리보기",
    tech: ["Claude Code Plugin", "Oracle / Tibero", "MyBatis", "superpowers"],
    accessNote: "2개 팀 30명 이상 배포 및 활용, 소속 팀 공식 개발방법론 채택",
    docMode: true,
  },
  {
    id: "jarvis",
    kicker: "연속 기획 / HR 근거 기반 AI",
    title: "HR 지식을 공식 근거와 함께 답하는 Jarvis",
    problem:
      "식대 비과세 한도, 퇴직소득 원천징수처럼 HR과 세무 규정은 기준일마다 한도와 세율이 달라지지만, 일반적인 AI 답변은 어떤 규정과 기준일에 근거한 것인지 확인하기 어렵습니다.",
    approach:
      "HR 규정과 공식 문서를 Git 기반 위키로 정리하고, LLM이 관련 근거를 직접 검색하고 인용하며 기준일(effective date)까지 함께 제시하도록 tool-use agent를 설계했습니다. CLI Proxy를 통해 구독형 LLM을 연결하고 문서 이력과 검토 흐름까지 함께 관리합니다.",
    result:
      "HR 실무 질문을 공식 근거와 기준일에 따라 확인하고 답변의 출처와 변경 이력까지 추적할 수 있는 HR 컴플라이언스 지식 플랫폼을 구축했습니다.",
    url: "https://jarvis.minseok91.cloud/",
    urlLabel: "jarvis.minseok91.cloud",
    previewImage: "/images/jarvis-thumb.png",
    previewAlt: "Jarvis HR Evidence Wiki 컴플라이언스 대시보드 화면",
    tech: ["Next.js", "PostgreSQL", "Git Wiki", "LLM Agent"],
    accessNote: "공개 데모, 로그인이 필요할 수 있습니다",
  },
];

export const classified = {
  sectionTitle: "CLASSIFIED",
  urgentAd: {
    badge: "긴급구인 / URGENT",
    title: "백엔드 개발자, 재고 1개",
    body: "개발 9년 차, HR 경력 4년 이상. 업무시스템 개발과 운영, AI 도구 적용과 사용자 교육을 경험했습니다. 재고 소진 임박.",
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
  publisher: "발행인 겸 편집장 / 김민석",
  links: [
    { label: "GitHub", href: "https://github.com/qoxmfaktmxj" },
    { label: "Tech Blog", href: "https://qoxmfaktmxj.github.io" },
    { label: "Contact", href: "mailto:qoxmfaktmxj@naver.com" },
  ],
  copyright: "© 2026 The Minseok Times. All rights reserved. 모든 기사는 실화입니다.",
};
