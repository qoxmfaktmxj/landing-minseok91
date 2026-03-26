export const navItems = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "Projects", href: "#projects" },
];

export const heroSignals = [
  {
    label: "Career",
    value: "9년차",
    description:
      "HR, 채용, 업무형 UI, 커머스 프로토타입까지 실무형 제품을 구축해왔습니다.",
  },
  {
    label: "Method",
    value: "AI 활용 개발",
    description:
      "기획, 설계, 구현, UI 개선, 문서화까지 하나의 흐름으로 연결합니다.",
  },
  {
    label: "Preference",
    value: "점진적 현대화",
    description:
      "빅뱅 교체보다 운영 리스크를 낮추는 구조 개선을 선호합니다.",
  },
];

export const focusAreas = [
  {
    title: "도메인 중심 설계",
    description:
      "HR, 채용, 커머스 등 복잡한 업무 도메인을 깊이 이해하고, 운영 흐름과 데이터 구조에 맞춰 실무에 바로 쓰이는 제품을 설계합니다.",
  },
  {
    title: "레거시 현대화",
    description:
      "레거시 프로젝트들을 화면, API, 공통 모듈을 단위로 단계적으로 현대화 합니다. 운영 중단 없이 시스템을 현대 스택으로 전환 합니다.",
  },
  {
    title: "AI 활용 개발",
    description:
      "Harness Engineering, Agent Orchestration 등 최신 AI 트렌드를 실무에 적용해 MVP를 빠르게 만들고, 유지보수를 수월하게 진행할 수 있는 AI개발환경을 구축합니다.",
  },
  {
    title: "AI 기반 유지보수",
    description:
      "코드 리뷰, 테스트, 문서화, 반복 업무를 AI 에이전트에 연결해 개발 속도와 운영 대응력을 끌어올립니다.",
  },
];

export const experienceHighlights = [
  {
    title: "도메인 이해",
    description:
      "사람, 조직, 권한, 공통코드가 얽힌 엔터프라이즈 도메인을 실무 문맥으로 이해합니다.",
  },
  {
    title: "구조 설계",
    description:
      "백엔드, 데이터 모델, API, 화면 흐름이 서로 어긋나지 않도록 연결하는 데 강점이 있습니다.",
  },
  {
    title: "빠른 흡수와 적용",
    description:
      "새 도구를 빠르게 익히되 실제 문제 해결에 도움이 되는지 먼저 판단합니다.",
  },
  {
    title: "AI 활용 방식",
    description:
      "AI를 코드 생성기보다 탐색, 설계 보조, UI 개선, 문서화 가속 장치로 사용합니다.",
  },
];

export const workPrinciples = [
  {
    title: "업무 문맥 우선",
    description:
      "화면 단위보다 운영 흐름, 데이터 구조, 권한 체계를 먼저 읽습니다.",
  },
  {
    title: "작게 끊어 검증",
    description:
      "문제 영역을 작은 단위로 나누고 실제 동작으로 빠르게 확인합니다.",
  },
  {
    title: "구조화된 전달",
    description:
      "설계 의도와 공통 규칙을 코드와 문서 둘 다로 남겨 팀이 이어받기 쉽게 만듭니다.",
  },
];

export const restrictedProjectNotes = [
  "로그인이 필요한 프로젝트는 요약 화면과 핵심 흐름 설명으로 먼저 맥락을 드러냅니다.",
  "문제와 제약, 설계 포인트를 짧게 정리해 공개가 어려운 운영 화면의 빈틈을 보완합니다.",
  "필요하면 Before / After 흐름도와 공통 패턴 정리 문서로 설계 의도를 설명합니다.",
];

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
  thumbnail?: string;
  href: string;
  linkLabel: string;
  evidence?: string;
  accessNote?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "vibe-grid",
    title: "VibeGrid",
    category: "Work Grid / Internal Tool",
    summary: "대량의 데이터를 저장할 수 있는 업무용 그리드",
    tech: ["Next.js", "React", "Data Grid", "B2B UI"],

    href: "https://grid.minseok91.cloud/",
    linkLabel: "사이트 열기",
    evidence: "GRID LAB",
  },
  {
    id: "vibe-hr",
    title: "VIBE HR",
    category: "HR System",
    summary: "최신기술로 개발된 경량화된 인사시스템",
    tech: ["Next.js", "React", "PostgreSQL", "Prisma", "shadcn/ui"],

    href: "https://hr.minseok91.cloud/",
    linkLabel: "사이트 열기",
    evidence: "HR SYSTEM",
    accessNote: "로그인: admin / admin",
  },
  {
    id: "vibe-rec",
    title: "HIRE FLOW",
    category: "Recruiting System",
    summary: "최신 채용 트렌드를 반영한 채용시스템",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Admin UI"],

    href: "https://rec.minseok91.cloud/",
    linkLabel: "사이트 열기",
    evidence: "RECRUIT FLOW",
    accessNote: "로그인: admin / admin",
  },
  {
    id: "maru",
    title: "MARU",
    category: "Commerce",
    summary: "인테리어 쇼핑몰",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Commerce UI"],

    href: "https://shop.minseok91.cloud/",
    linkLabel: "사이트 열기",
    evidence: "STORE FRONT",
  },
];

export const writingItems = [
  {
    title: "GitHub",
    description: "코드 저장소 확인하기",
    href: "https://github.com/qoxmfaktmxj",
    label: "저장소 보기",
  },
  {
    title: "Tech Blog",
    description: "기술 블로그 확인하기",
    href: "https://qoxmfaktmxj.github.io",
    label: "글 보러 가기",
  },
];

export const contactPrompts = [
  "사내 시스템 개선 방향을 같이 정리해야 할 때",
  "레거시를 점진적으로 바꾸면서도 속도를 잃고 싶지 않을 때",
  "공통 프레임워크나 업무형 UI 기준을 세우고 싶을 때",
];
