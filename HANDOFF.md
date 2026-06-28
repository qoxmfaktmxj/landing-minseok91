# HANDOFF — The Minseok Times 랜딩 작업 인계

> 다른 PC에서 이어서 작업하기 위한 문서. 작성 시점: 2026-06-28.
> 이 문서는 코드가 참조하지 않는 순수 인계 문서다. 작업이 끝나면 지워도 됨.

## 0. 핵심 사실 (절대 틀리면 안 됨)
- **IT/개발 경력 9년차** (백엔드 개발자) → 통계 라벨은 `YEARS IN IT`.
- **HR 도메인은 4년차**. "HR 9년차"로 쓰면 안 됨.
- 정체성 라벨 = **BACKEND DEVELOPER** (과거 "AX ENGINEER"에서 변경됨).
- 포지셔닝: HR 개발 공고에 어필. "AI 잘 쓴다"를 **슬로건이 아니라 구체적 행동**(전용 하네스 직접 제작, 최신 오픈소스 레포/도구 활용, 사내 LLM 위키 개발)으로 보여줄 것. AI를 0으로 줄이지 말고, HR 도메인 백엔드 역량을 증폭한 근거로 배치.

## 1. 환경 세팅 (새 PC)
```bash
npm install
npm run dev   # http://localhost:3010
```
- 모든 카피는 `src/data/siteContent.ts` 한 곳에 모여 있음.
- 콘텐츠/구조 작업은 대부분 이 파일 + `src/components/newspaper/*`.

## 2. 오늘까지 완료된 것 (이미 main에 푸시됨)
- 마스트헤드/티커/헤드라인/리드/풀쿼트/광고 카피를 "AI는 도구가 아닌 동료" → 이후 "백엔드 개발자 정체성"으로 재정렬.
- 특집 1면을 **EHR 하네스 플러그인**(README 스크린샷 `public/images/harness-thumb.png`)으로 교체, VIBE HR은 Lab+로 이동.
- `FeatureStory`에 `docMode`(README/READ DOC 라벨) 추가, 데스크 패널 제거.
- ✦ 구분기호 3곳(마스트헤드/티커/LAB)을 공용 `NewspaperMark` 신문 아이콘으로 통일.
- favicon(`src/app/icon.svg`)을 양피지 잉크 스탬프로 교체.
- stats 라벨 `YEARS IN HR` → `YEARS IN IT` 정정, byline `BACKEND DEVELOPER`.
- **OG 이미지 `public/og-image.png` (1200×630, 신문 1면 스타일) 생성 완료 — 아직 metadata에 연결 안 됨 (아래 Task 1).**

## 3. 지금 해야 할 작업 3개 (우선순위 순)

### Task 1 — metadata 정정 + OG 이미지 연결  (가장 먼저)
파일: `src/app/layout.tsx` (현재 metadata는 옛 헤드라인/"9년 HR" 잔재가 남아 현재 페이지와 불일치).

**(a) description / openGraph / twitter 문구 교체** — 아래로:
```ts
description:
  "AI를 제대로 이해하고 쓰는 9년차 백엔드 개발자. HR 도메인 4년의 깊이 위에서 레거시 인사시스템을 AI가 이해하게 만든 과정을 담은 단 한 부의 신문.",
keywords: ["김민석", "백엔드 개발자", "HR 시스템 개발", "AI 활용 개발", "레거시 현대화", "AX 엔지니어"],
```
openGraph.description 와 twitter.description (현재 "조직의 AX 전환, 한 사람에서 시작된다…" — 이건 이미 페이지에서 삭제한 옛 헤드라인이라 반드시 교체):
```ts
"9년차 백엔드 개발자가 레거시 HR 시스템을 AI가 이해하게 만들고 팀 생산성을 끌어올린 단독 보도.",
```

**(b) OG 이미지 연결** — `public/og-image.png`는 이미 생성돼 있음. metadata에 추가:
```ts
openGraph: {
  // ...기존 title/description/url/type/locale 유지
  images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "The Minseok Times — HR × AI × AX" }],
},
twitter: {
  card: "summary_large_image",
  title: "The Minseok Times — HR × AI × AX",
  description: "9년차 백엔드 개발자가 레거시 HR 시스템을 AI가 이해하게 만들고 팀 생산성을 끌어올린 단독 보도.",
  images: ["/og-image.png"],
},
```
> 확인: 배포 후 https://www.opengraph.xyz 등으로 카드 미리보기 점검.
> og-image 재생성이 필요하면 부록 참고.

### Task 2 — 히어로 아래 CTA 2개 추가
첫 화면에서 바로 행동 유도(현재 CTA는 하단 광고면/콜로폰에만 있음).

**(a) `src/data/siteContent.ts`의 `frontPage`에 추가:**
```ts
export const frontPage = {
  headline: [ /* 그대로 */ ],
  lede: "...",
  byline: "...",
  ctas: [
    { label: "하네스 사례 보기", href: "#feature" },
    { label: "연락하기", href: "mailto:qoxmfaktmxj@naver.com" },
  ],
};
```

**(b) `src/components/newspaper/FeatureStory.tsx`** — 특집 `<section>`에 앵커 추가:
```tsx
<section id="feature" className="bg-ink px-5 py-14 md:px-10 md:py-20">
```

**(c) `src/components/newspaper/FrontPageHeadline.tsx`** — byline `<motion.p>` 아래에 버튼 2개 추가(예시):
```tsx
<div className="mt-7 flex flex-wrap gap-3">
  <a href={frontPage.ctas[0].href}
     className="border border-ink bg-ink px-5 py-2.5 font-mono text-xs tracking-widest text-paper transition-colors hover:bg-vermilion hover:border-vermilion">
    {frontPage.ctas[0].label} →
  </a>
  <a href={frontPage.ctas[1].href}
     className="border border-ink px-5 py-2.5 font-mono text-xs tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper">
    {frontPage.ctas[1].label}
  </a>
</div>
```

> GOTCHA: 이 사이트는 Lenis 스무스 스크롤을 쓴다(`SmoothScrollProvider`). `#feature` 앵커 클릭이 그냥 안 먹을 수 있음(이전에 `window.scrollTo`를 Lenis가 되돌리는 걸 확인함). 안 되면 onClick에서 `document.getElementById("feature")?.scrollIntoView()` 또는 Lenis 인스턴스의 `scrollTo`를 호출하도록 핸들러를 달 것.

### Task 3 — stats 라벨 정정 (`1st AX LEADER` 교체)
파일: `src/data/siteContent.ts` (`stats`):
```ts
export const stats: StatItem[] = [
  { value: 9,  display: "9+",  label: "YEARS IN IT" },
  { value: 20, display: "20+", label: "TEAM USERS" },
  { value: 5,  display: "5",   label: "LIVE PRODUCTS" },
];
```
> `CountUp`은 `value`로 카운트업하고 `display`에서 숫자를 뺀 나머지("+")를 suffix로 씀 → 20+ 정상 동작.

## 4. 같이 보면 좋은 자잘한 수정
- **풀쿼트 오타** (`siteContent.ts` `pullQuote`): 현재 `"먼저 AI가 ,\n잘 일할 수 있는 환경을\n설계 합니다."` → 쉼표 앞 공백/"설계 합니다" 띄어쓰기 어색 + 사이트는 평서체인데 여기만 "합니다"체. 예: `"AI가 먼저\n잘 일하게,\n환경을 설계한다."`
- profile body·광고의 "HR 도메인에 강한 9년차 백엔드 개발자"는 9년 HR을 주장하진 않지만, 원하면 "HR 도메인 4년"을 한 번 명시해 오해 차단.

## 5. 그다음(여유 될 때) 백로그 — 외부 리뷰에서 채택한 항목
- feature story에 `role` / `impact` / `period` 필드 추가하고 카드에 "문제 → 내 역할 → 접근 → 결과" 순으로 노출(채용 관점에서 "내 역할" 중요).
- 내부 링크(`/README_HARNESS.html`)는 같은 탭, 외부 링크만 새 탭으로 (현재 `FeatureStory`가 전부 `target="_blank"`).
- `app/sitemap.ts`, `app/robots.ts`, JSON-LD `ProfilePage`(jobTitle: Backend Developer, knowsAbout: HR Systems/AI Harness/Oracle/MyBatis/Legacy Modernization) 추가.
- `package.json` 스크립트 추가: `"typecheck": "tsc --noEmit"`, `"format": "prettier --write ."`.
- Lighthouse 한 번 돌려 수치 확인 후 성능 판단(선제 리팩터는 보류 — 페이지가 작음).
- (선택) VIBE HR을 Lab+ → 특집으로 복귀 검토(HR 백엔드 역량의 직접 증거).
- (낮은 우선순위) 헤드라인 글자분해 애니메이션에 `sr-only` 원문/`aria-label`. textContent는 이미 온전해 SEO 영향은 작음.

## 부록 — OG 이미지 재생성 방법
`public/og-image.png`는 아래 HTML을 Playwright(headless chromium)로 1200×630 @2x 스크린샷한 것. 폰트는 Noto Serif KR(CDN) + Georgia. 수정 시 이 HTML을 고쳐 다시 스크린샷:
- 시스템에 chromium이 없으면: `npx --yes playwright@latest install chromium`
- 핵심 주의: 마스트헤드는 `white-space: nowrap` + font-size ~78px라야 "The Minseok Times"가 한 줄에 들어감(키우면 줄바꿈돼 레이아웃 깨짐).

```html
<!doctype html><html lang="ko"><head><meta charset="utf-8"/>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0} html,body{width:1200px;height:630px;overflow:hidden}
body{background:#f3f1ea;color:#1b2440;font-family:Georgia,serif;padding:56px}
.frame{width:100%;height:100%;border:4px solid #1b2440;padding:40px 52px;display:flex;flex-direction:column}
.topbar{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #1b2440;padding-bottom:12px;font-family:monospace;font-size:15px;letter-spacing:.18em;color:#4a5470}
.masthead{text-align:center;font-weight:900;font-size:78px;line-height:1;letter-spacing:-.03em;margin:28px 0 18px;white-space:nowrap}
.masthead .v{color:#ff4f30}
.rule-double{border-top:3px solid #1b2440;border-bottom:1.5px solid #1b2440;height:7px;margin-bottom:6px}
.tagline{text-align:center;font-family:monospace;font-size:14px;letter-spacing:.3em;color:#4a5470;padding-bottom:22px;border-bottom:1px solid #1b2440}
.headline{font-family:"Noto Serif KR",serif;font-weight:900;font-size:52px;line-height:1.14;letter-spacing:-.03em;margin-top:34px}
.headline .mark{background:linear-gradient(transparent 62%,#ffcfc4 62%);padding:0 4px}
.sub{margin-top:auto;font-family:monospace;font-size:19px;letter-spacing:.04em;color:#4a5470}
</style></head><body><div class="frame">
<div class="topbar"><span>SEOUL, KOREA</span><span>HR × AI × AX</span><span>EST. 2017</span></div>
<div class="masthead">The <span class="v">Minseok</span> Times</div>
<div class="rule-double"></div>
<div class="tagline">VOL. 9 — NO. 2026 · BACKEND DEVELOPER</div>
<div class="headline">AI를 제대로 이해하고 쓴다는 것<br/>— <span class="mark">결과가</span> 증명한다</div>
<div class="sub">9년차 백엔드 개발자 · HR 도메인 4년 · 레거시 EHR을 AI가 이해하게 만들다</div>
</div></body></html>
```
Playwright: `viewport 1200×630, deviceScaleFactor:2 → goto(file://...), waitForTimeout(1500), screenshot(public/og-image.png)`.
