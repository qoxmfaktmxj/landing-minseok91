# Jarvis Feature Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 랜딩 페이지의 두 번째 메인 프로젝트를 원천징수 레퍼런스에서 Jarvis로 교체하고 실제 서비스 URL과 화면을 제공한다.

**Architecture:** 기존 `FeatureStoryItem` 데이터 계약과 `FeatureStory` 렌더링을 그대로 사용한다. 콘텐츠 객체와 정적 이미지 자산만 교체해 기존 디자인과 반응형 동작에 영향을 주지 않는다.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, 정적 PNG 자산

## Global Constraints

- 메인 프로젝트는 `EHR Harness`와 `Jarvis` 두 개만 유지한다.
- 원천징수 레퍼런스 메인 카드는 제거한다.
- Jarvis URL은 `https://jarvis.minseok91.cloud/`를 사용한다.
- 기존 컴포넌트와 디자인 시스템은 변경하지 않는다.
- 제공된 실제 Jarvis 대시보드 스크린샷을 사용한다.

---

### Task 1: Jarvis 메인 프로젝트 카드

**Files:**
- Create: `public/images/jarvis-thumb.png`
- Modify: `src/data/siteContent.ts`
- Test: 기존 ESLint 및 Next.js production build

**Interfaces:**
- Consumes: `FeatureStoryItem` 인터페이스와 `featureStories` 배열
- Produces: `id: "jarvis"`인 두 번째 `FeatureStoryItem`과 `/images/jarvis-thumb.png` 정적 자산

- [ ] **Step 1: Jarvis 스크린샷을 정적 자산으로 추가**

`C:\Users\kms\Pictures\Screenshots\스크린샷 2026-07-21 174456.png`를 `public/images/jarvis-thumb.png`로 복사한다.

- [ ] **Step 2: 원천징수 프로젝트 객체를 Jarvis 객체로 교체**

`src/data/siteContent.ts`의 `id: "withhold-tax"` 객체를 아래 필드 의미에 맞게 교체한다.

```ts
{
  id: "jarvis",
  kicker: "연속 기획 — AI 지식 플랫폼",
  title: "흩어진 사내 지식을 근거와 함께 답하는 Jarvis",
  url: "https://jarvis.minseok91.cloud/",
  urlLabel: "jarvis.minseok91.cloud",
  previewImage: "/images/jarvis-thumb.png",
  previewAlt: "Jarvis 사내 업무 및 지식 플랫폼 대시보드 화면",
  tech: ["Next.js", "PostgreSQL", "Git Wiki", "LLM Agent"],
  accessNote: "라이브 서비스 · 로그인이 필요할 수 있습니다",
}
```

`problem`, `approach`, `result`는 디자인 문서의 문구 방향에 따라 각각 흩어진 지식, 근거 탐색형 agent, 검색·인용·검토 가능한 결과를 한 문단으로 작성한다.

- [ ] **Step 3: 정적 검사 실행**

Run: `npm run lint`

Expected: ESLint 오류 없이 exit code 0.

- [ ] **Step 4: production build 실행**

Run: `npm run build`

Expected: Next.js production build 성공 및 exit code 0.

- [ ] **Step 5: 변경 범위 확인 및 커밋**

Run: `git diff --check` 및 `git status --short`

Expected: 계획·디자인 문서, `src/data/siteContent.ts`, `public/images/jarvis-thumb.png`만 이번 작업 변경으로 확인되며 기존 사용자 미추적 파일은 포함하지 않는다.

```bash
git add docs/superpowers/specs/2026-07-21-jarvis-feature-design.md docs/superpowers/plans/2026-07-21-jarvis-feature.md src/data/siteContent.ts public/images/jarvis-thumb.png
git commit -m "feat: feature Jarvis on landing page"
git push origin main
```
