export const navItems = [
  { label: "About", href: "#about" },
  { label: "Focus", href: "#focus" },
  { label: "Projects", href: "#projects" },
  { label: "Links", href: "#links" },
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
    title: "업무 흐름 중심 UX 재정리",
    description:
      "입력, 조회, 승인, 관리가 많은 화면에서도 사용자가 다음 행동을 쉽게 판단할 수 있게 흐름을 다시 구성합니다.",
  },
  {
    title: "레거시 현대화",
    description:
      "빅뱅 교체보다 점진적 전환을 택합니다. 화면, API, 공통 모듈을 나눠 바꾸며 운영 중단 위험을 줄입니다.",
  },
  {
    title: "공통 패턴과 프레임워크",
    description:
      "폼, 테이블, 인증, 공통코드처럼 반복되는 요소를 정리해 팀 전체의 변경 비용을 낮춥니다.",
  },
  {
    title: "AI 기반 전달 가속",
    description:
      "AI를 탐색과 설계 보조, UI 개선, 문서화에 연결해 개발 속도와 유지보수 대응력을 함께 끌어올립니다.",
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
  thumbnail: string;
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
    summary:
      "업무 화면에서 반복되는 조회, 편집, 대량 처리 인터랙션을 실제 데이터 그리드 시나리오로 검증하는 테스트 허브입니다.",
    tech: ["Next.js", "React", "Data Grid", "B2B UI"],
    thumbnail: "/images/grid-thumb.png",
    href: "https://grid.minseok91.cloud/",
    linkLabel: "사이트 열기",
    evidence: "GRID LAB",
  },
  {
    id: "vibe-hr",
    title: "VIBE-HR",
    category: "HR System",
    summary:
      "조직, 권한, 공통코드, 인사 운영 화면을 한 흐름으로 묶어 레거시 HR 시스템을 재구성한 인사시스템입니다.",
    tech: ["Next.js", "React", "PostgreSQL", "Prisma", "shadcn/ui"],
    thumbnail: "/images/vibe-hr-login-thumb.png",
    href: "https://hr.minseok91.cloud/",
    linkLabel: "사이트 열기",
    evidence: "HR SYSTEM",
    accessNote: "로그인: admin / admin",
  },
  {
    id: "vibe-rec",
    title: "Vibe Rec",
    category: "Recruiting System",
    summary:
      "공고 조회, 지원서 저장과 제출, 관리자 검토까지 채용 운영 플로우를 단계적으로 현대화한 채용시스템 MVP입니다.",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Admin UI"],
    thumbnail: "/images/vibe-rec-thumb.png",
    href: "https://rec.minseok91.cloud/",
    linkLabel: "사이트 열기",
    evidence: "RECRUIT FLOW",
    accessNote: "로그인: admin / admin",
  },
  {
    id: "vibe-shop",
    title: "Vibe Shop",
    category: "Commerce",
    summary:
      "홈, 카테고리, 상품 상세, 장바구니, 체크아웃까지 구매 퍼널을 새 구조로 다시 설계한 쇼핑몰 프로젝트입니다.",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "Commerce UI"],
    thumbnail: "/images/vibe-shop-thumb.png",
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
