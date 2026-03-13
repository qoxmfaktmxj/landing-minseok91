export const navItems = [
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Project", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

export const heroSignals = [
  {
    title: "9년차 풀스택 개발자",
    description: "HR, 사내 시스템 등을 구축부터 시작해 운영까지 다뤄왔습니다.",
  },
  {
    title: "AI를 실무에 연결",
    description: "기획, 디자인, 설계, 구현, UI 개선, 문서화, 리팩토링까지 끊김 없이 이어갑니다.",
  },
  {
    title: "점진적 현대화 선호",
    description: "레거시를 한 번에 버리기보다 위험을 낮추며 개선하는 방식을 택합니다.",
  },
];

export const focusAreas = [
  {
    title: "사내 시스템 UX 개선",
    description:
      "업무 화면이 많은 시스템에서도 입력, 조회, 승인, 관리 흐름이 단순하게 느껴지도록 구조를 다시 잡습니다.",
  },
  {
    title: "레거시 현대화",
    description:
      "빅뱅 교체보다 점진적 전환을 선호합니다. 운영 중단 위험을 줄이면서 화면, API, 공통 모듈을 단계적으로 바꿉니다.",
  },
  {
    title: "공통 프레임워크 구축",
    description:
      "폼, 테이블, 공통코드, 인증, 레이아웃처럼 반복되는 요소를 정리해 팀 전체의 변경 비용을 낮춥니다.",
  },
  {
    title: "운영 효율화",
    description:
      "AI와 문서화를 활용해 기획 정리, 설계 옵션 비교, 개발 속도, 유지보수 대응력을 함께 끌어올립니다.",
  },
];

export const experienceHighlights = [
  {
    title: "도메인 이해",
    description:
      "사람, 조직, 권한, 공통코드, 승인 같은 엔터프라이즈 도메인의 얽힘을 실무 문맥으로 이해합니다.",
  },
  {
    title: "구조 설계",
    description:
      "백엔드, 데이터 모델, API, 화면 흐름, 운영 관점이 서로 어긋나지 않도록 연결하는 데 강점이 있습니다.",
  },
  {
    title: "빠른 흡수와 적용",
    description:
      "새 도구를 빨리 익히되, 기술 자체보다 실제 문제 해결에 도움이 되는지 먼저 판단합니다.",
  },
  {
    title: "AI 활용 방식",
    description:
      "AI를 코드 생성기보다 탐색, 설계 보조, UI 개선, 문서화 가속 장치로 사용합니다.",
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  role: string;
  result: string;
  tech: string[];
  thumbnail: string;
  href: string;
  linkLabel: string;
  evidence?: string;
  accessNote?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "vibe-hr",
    title: "VIBE-HR",
    category: "HR Modernization Prototype",
    summary:
        "복잡한 Legacy HR 시스템을 AI 기반 개발 방식으로 재구성하여 기술 부채를 줄이고 성능과 개발 생산성을 개선한 사례",
    problem:
        "HR 시스템은 급여, 근태, 조직, 권한, 공통코드 등 여러 도메인이 강하게 결합되어 있어 기술 부채가 쉽게 쌓이고, 기능 추가나 UI 개선 시 개발 속도와 유지보수성이 크게 떨어지는 문제가 있습니다.",
    approach:
        "AI를 활용해 레거시 구조를 분석하고 반복되는 화면 패턴, 데이터 구조, 공통 로직을 정리했습니다. 이후 폼, 테이블, 공통 코드, 권한 흐름을 일관된 구조로 재설계하여 개발 패턴과 UI 구조를 표준화했습니다.",
    role:
        "AI 기반 구조 분석, 시스템 설계, UX 흐름 정리, 프론트엔드 구현, 백엔드 연동까지 전 과정을 직접 설계하고 구현했습니다.",
    result:
        "레거시 HR 시스템의 기술 부채를 줄이고 공통 구조를 정리하여 개발 속도와 유지보수성을 개선했으며, AI를 활용한 시스템 개선 방식의 실무 적용 가능성을 검증했습니다.",
    tech: ["Next.js", "React", "PostgreSQL", "Prisma", "shadcn/ui"],
    thumbnail: "/images/vibe_hr_thumb.png",
    href: "https://hr.minseok91.cloud",
    linkLabel: "링크 열기",
    evidence: "HR SYSTEM",
    accessNote: "admin / admin 으로 로그인",
  },
  {
    id: "vibe-grid",
    title: "VibeGrid",
    category: "Enterprise Grid Playground",
    summary:
      "사내 시스템에서 반복되는 그리드 UX 의사결정을 빠르게 검증하기 위한 업무형 테스트 허브입니다.",
    problem:
      "사내 시스템의 데이터 그리드는 기능이 많고 복잡한데, 실제 사용성 검증은 종종 너무 늦게 이뤄집니다.",
    approach:
      "정렬, 선택, 편집, 상태 전환, 대량 처리 같은 그리드 상호작용을 별도 공간에서 빠르게 실험할 수 있도록 구성했습니다.",
    role:
      "검증 시나리오 정의, 인터랙션 설계, 프론트엔드 구현을 맡아 업무형 UI 패턴의 기준점을 만들었습니다.",
    result:
      "업무 화면에 자주 등장하는 그리드 결정을 실제 제품 개발 이전에 비교하고 다듬을 수 있는 공용 베이스를 확보했습니다.",
    tech: ["Next.js", "React", "Data Grid", "B2B UI", "Interaction Design"],
    thumbnail: "/images/grid-thumb.png",
    href: "https://grid.minseok91.cloud/",
    linkLabel: "데모 보기",
    evidence: "GRID",
  },
];

export const workPrinciples = [
  {
    title: "문제부터 정의합니다",
    description:
      "기술 스택을 먼저 정하지 않습니다. 운영 병목, 사용자 불편, 유지보수 비용이 어디서 생기는지부터 봅니다.",
  },
  {
    title: "AI는 과장 없이 씁니다",
    description:
      "아이디어 정리, 설계 옵션 비교, UI 카피 정제, 문서 초안, 리팩토링 보조에 AI를 사용하되 최종 판단은 맥락과 운영성을 기준으로 합니다.",
  },
  {
    title: "조금씩 바꿉니다",
    description:
      "기존 시스템을 부정하지 않습니다. 리스크가 큰 영역부터 우선순위를 정하고, 공통 규칙을 만들면서 점진적으로 바꿉니다.",
  },
];

export const restrictedProjectNotes = [
  "로그인이 필요한 프로젝트는 공개 데모 대신 요약 화면, 붉은 정보 마스킹 스크린샷, 핵심 흐름 설명으로 보여줍니다.",
  "문제, 제약, 내가 한 결정, 결과를 짧고 명확하게 정리해 사내 시스템 특성상 공개가 어려운 부분을 보완합니다.",
  "필요하면 Before / After 흐름도나 공통 패턴 정리 문서로 설계 역량을 드러냅니다.",
];

export const writingItems = [
  {
    title: "기술 블로그",
    description:
      "AI 최신 Daily News, 학습한 내역을 기록하는 블로그 입니다. 기존 네이버 블로그에서 옮겨온 글들도 있습니다.",
    href: "https://qoxmfaktmxj.github.io",
    label: "글 보러 가기",
  },
  {
    title: "GitHub",
    description:
      "작동하는 결과물뿐 아니라, 구조를 어떻게 나누고 어떤 방식으로 발전시키는지 코드 단위로 확인할 수 있습니다.",
    href: "https://github.com/qoxmfaktmxj",
    label: "저장소 보기",
  },
];

export const contactPrompts = [
  "사내 시스템 개선 방향을 같이 정리해야 할 때",
  "레거시를 한 번에 갈아엎지 않고 점진적으로 바꾸고 싶을 때",
  "공통 프레임워크나 업무형 UI 기준을 세우고 싶을 때",
];
