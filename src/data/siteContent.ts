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
  lede: "사내 AI TFT를 이끌어 마무리했습니다. 그 성과를 바탕으로 Claude Code 전사 도입이 결정됐습니다. HR 업무를 이해하고 AI 도구와 업무시스템을 직접 만들며 사용자 교육도 맡고 있습니다.",
  byline: "BY KIM MINSEOK / BACKEND DEVELOPER / 본지 단독",
};

export const profileColumn = {
  kicker: "PROFILE / 인물",
  title: "업무를 이해하고 AI로 개선하는 개발자",
  body: "업무시스템 개발 9년 차입니다. 2022년부터 HR 시스템을 구축하고 운영했습니다. 현재 인사시스템 유지보수 파트를 이끌며 고객과 요구사항을 협의하고 팀원 교육을 맡고 있습니다. 사내 업무시스템과 LLM Wiki를 하나의 사이트로 통합했고 현재 Oracle 데이터 이관과 타 시스템 연계를 진행하고 있습니다.",
};

export const pullQuote = "업무를 이해하고,\nAI를 실무에 연결합니다.";

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
    title: "레거시 인사시스템을 위한 AI 코딩 하네스",
    problem:
      "레거시 인사시스템(EHR)은 Oracle 프로시저가 복잡하게 얽혀 있고 구조도 방대합니다. AI 코딩 에이전트가 맥락을 잡지 못해 잘못된 코드와 답변을 내놓습니다.",
    approach:
      "EHR Harness Plugin을 단독으로 설계하고 개발했습니다. AI가 고객사별 인사 규정과 권한, 결재 구조를 참고할 수 있도록 업무 맥락과 코드 분석 기준, 검증 절차를 담았습니다. 프로젝트별 규칙과 코드 탐색, 변경 영향 검토를 표준화했습니다.",
    result:
      "2개 팀 30명 이상에게 배포해 활용됐으며 소속 팀의 공식 개발방법론으로 채택됐습니다. 이후에도 사용자 피드백을 반영해 버전을 업데이트하고 있습니다. 사내 AI 교육을 4회 진행했고 AI TFT 성과를 바탕으로 Claude Code 전사 도입이 결정됐습니다.",
    url: "/README_HARNESS.html",
    urlLabel: "README_HARNESS",
    previewImage: "/images/harness-thumb-cinematic.png",
    previewAlt: "EHR Harness Plugin README 화면 미리보기",
    tech: ["Claude Code Plugin", "Oracle / Tibero", "MyBatis", "superpowers"],
    accessNote: "2개 팀 30명 이상 배포 및 활용, 소속 팀 공식 개발방법론 채택",
    docMode: true,
  },
  {
    id: "vibe-hr",
    kicker: "프로젝트 / HR 업무 시스템",
    title: "인사 업무를 웹으로 옮긴 VIBE-HR",
    problem:
      "인사 업무에서는 조직과 사원 정보, 발령, 근태, 급여가 서로 연결됩니다. 개별 화면만 구현해서는 실제 처리 흐름을 확인하기 어렵습니다.",
    approach:
      "기존 EHR 업무를 바탕으로 Next.js와 Spring Boot, PostgreSQL로 인사시스템을 재구성했습니다. 공통 그리드와 메뉴 권한을 정리하고 사원관리, 발령, 신청과 승인, 급여 조회 화면을 하나의 흐름으로 연결하고 있습니다.",
    result:
      "법인과 조직 조회, 사원관리, 발령 처리, 신청과 승인, 급여 Run과 대상자 상세 조회를 구현했습니다. 일부 후속 업무는 계속 개발 중입니다. 체험용 계정으로 주요 화면을 살펴볼 수 있습니다.",
    url: "https://hr.minseok91.cloud/",
    urlLabel: "hr.minseok91.cloud",
    previewImage: "/images/vibe-hr-login.webp",
    previewAlt: "분홍빛 건축물과 수면을 배경으로 한 VIBE-HR 로그인 화면",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "AG Grid"],
    accessNote: "공개 데모, 체험용 계정 admin / admin",
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
    id: "jarvis",
    name: "Jarvis",
    description: "HR 규정을 공식 근거와 기준일에 따라 확인하는 AI 지식 플랫폼",
    href: "https://jarvis.minseok91.cloud/",
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
