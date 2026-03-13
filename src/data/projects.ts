export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  url: string;
  tags: string[];
  status: "live" | "coming_soon" | "in_progress";
}

export const projects: Project[] = [
  {
    id: "blog",
    title: "기술 블로그",
    description: "개발 여정 기록",
    longDescription:
      "AI 학습, 인프라 구축, 개발 경험을 기록하는 기술 블로그",
    thumbnail: "/images/blog-thumb-v3.webp",
    url: "https://qoxmfaktmxj.github.io",
    tags: ["GitHub Pages", "Blog"],
    status: "live",
  },
  {
    id: "vibe-grid",
    title: "VibeGrid",
    description: "업무용 그리드 테스트 허브",
    longDescription:
      "실무형 데이터 조회와 편집 흐름을 빠르게 검증할 수 있도록 만든 업무용 그리드 데모 프로젝트",
    thumbnail: "/images/grid-thumb.png",
    url: "https://grid.minseok91.cloud/",
    tags: ["Next.js", "Data Grid", "B2B UI"],
    status: "live",
  },
  {
    id: "vibe-hr",
    title: "VIBE-HR",
    description: "인사관리 시스템",
    longDescription:
      "직원 정보, 조직 관리, 공통코드 관리 등 엔터프라이즈 HR 기능을 제공하는 풀스택 웹 애플리케이션",
    thumbnail: "/images/vibe-hr-thumb-v3.webp",
    url: "https://hr.minseok91.cloud",
    tags: ["Next.js", "PostgreSQL", "Prisma", "shadcn/ui"],
    status: "live",
  },
];
