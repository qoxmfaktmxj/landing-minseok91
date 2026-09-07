---
name: "Kim Minseok Portfolio"
description: "Graphite, silver, and cobalt systems shown in motion."
colors:
  ground: "#111318"
  foreground: "#edf0f7"
  muted: "#a0a7b6"
  line: "#353943"
  nav-text: "#c1c6d1"
  control-text: "#bfc5d3"
  cobalt: "#3156f5"
  project-cobalt: "#2445d4"
  cobalt-soft: "#bfcfff"
  silver: "#dce1ea"
  ink: "#1b2030"
  focus-on-dark: "#93acff"
  focus-on-silver: "#2448d7"
typography:
  display:
    fontFamily: "var(--font-geist), sans-serif"
    fontSize: "clamp(62px, 7.2vw, 96px)"
    fontWeight: 570
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-geist), sans-serif"
    fontSize: "clamp(52px, 6vw, 86px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Pretendard, Apple SD Gothic Neo, sans-serif"
    fontSize: "clamp(25px, 2.5vw, 36px)"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Pretendard, Apple SD Gothic Neo, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-geist), sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.8
    letterSpacing: "0.03em"
rounded:
  sharp: "0"
  circle: "50%"
spacing:
  compact: "8px"
  regular: "24px"
  control-block: "17px"
  control-inline: "23px"
  section-inline: "clamp(24px, 5vw, 88px)"
  section-block: "125px"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.ground}"
    rounded: "{rounded.sharp}"
    padding: "17px 23px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-soft}"
    textColor: "{colors.ground}"
  button-case:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sharp}"
    padding: "17px 23px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.nav-text}"
    rounded: "{rounded.sharp}"
  scene-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.control-text}"
    rounded: "{rounded.sharp}"
    padding: "8px 12px"
  project-visual:
    backgroundColor: "{colors.project-cobalt}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sharp}"
    padding: "118px 30px 65px"
  lab-link:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sharp}"
    padding: "25px 0"
  contact-action:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "clamp(90px, 14vw, 190px)"
---

# Design System: Kim Minseok Portfolio

## Overview

**Creative North Star: "Systems in Motion"**

첫 화면은 은빛 눈 계곡과 빛나는 얼음 건축물을 화면 전체에 펼친다. 이름은 위쪽 왼편, 소개는 위쪽 오른편에 두고, 프로젝트와 연락 행동은 풍경 아래에 둔다. 이후 구간은 기존 흑연, 은빛, 코발트와 실제 프로젝트 화면을 유지한다.

화면은 넓고 개방적이며 본문보다 결과물을 먼저 보게 한다. 움직임은 시스템의 반응성을 설명하고, 사용자가 모션 감소를 선택하거나 그래픽을 멈추면 모든 내용과 링크는 그대로 유지된다.

**Key Characteristics:**

- 흑연, 은빛, 코발트로 제한한 고대비 팔레트
- 큰 영문 표제와 읽기 편한 한국어 본문의 분명한 역할 구분
- 첫 화면의 옅은 안개와 눈, 포인터 깊이 효과와 기존 프로젝트 및 갤러리 전환
- 둥근 카드 대신 각진 화면 프레임과 가는 경계선
- 실제 프로젝트 화면이 중심이 되는 열린 사례 구성

## Colors

차가운 중성색이 구조를 만들고, 코발트는 움직임과 선택 상태, 핵심 진입점에만 집중해서 사용한다.

### Primary

- **Signal Cobalt:** 링크 상태, 프로젝트 무대와 선언 구간에 사용한다. 첫 화면의 풍경은 차가운 중성색을 유지한다.
- **Soft Cobalt:** 주요 버튼의 호버와 밝은 강조에 사용한다.

### Neutral

- **Graphite Ground:** 기본 페이지 배경이다.
- **Cold Foreground:** 어두운 바탕 위의 제목과 주요 텍스트다.
- **Muted Alloy:** 설명, 메타데이터, 비활성 링크에 사용한다.
- **Structural Line:** 구간과 행을 나누는 가는 선이다.
- **Silver Field:** 소개와 연락 구간의 밝은 반전 표면이다.
- **Deep Ink:** 밝은 은빛 표면 위의 제목과 본문이다.

### Named Rules

**The Cobalt Signal Rule.** 코발트는 모든 요소를 장식하지 않는다. 움직임, 선택, 핵심 프로젝트 무대처럼 시선의 다음 방향을 알려주는 곳에 쓴다.

## Typography

**Display Font:** Geist Variable (sans-serif fallback)

**Body Font:** Pretendard (Apple SD Gothic Neo, sans-serif fallback)

**Character:** Geist는 큰 영문 표제와 숫자에 기술적인 밀도를 준다. Pretendard는 한국어 프로젝트 설명을 긴 호흡으로 읽게 한다.

### Hierarchy

- **Display:** 첫 화면의 한 줄 영문 이름 KIM MINSEOK에 사용한다. 데스크톱에서는 위쪽 왼편에 배치하고, 중앙의 얼음 건축물을 가리지 않는다. 모바일에서는 이름과 소개를 한 열로 정리한다. 소개 문구는 "AI로 필요한 서비스를 만들고 있습니다. 팀에서 함께 쓸 AI 도구도 직접 만듭니다."로 역할을 담담하게 설명한다.
- **Headline:** 주요 구간 제목과 대형 숫자에 사용한다.
- **Title:** 사례 제목과 한국어 핵심 문장에 사용한다.
- **Body:** 사례의 문제, 접근, 결과와 소개 문단에 사용한다.
- **Label:** 영문 메타데이터와 짧은 캡션에 사용한다. 내비게이션과 제어는 각 컴포넌트의 실제 크기와 굵기를 따른다.

### Named Rules

**The Split Voice Rule.** 큰 영문 구조와 한국어 설명의 역할을 섞지 않는다. Geist는 신호를 만들고 Pretendard는 맥락을 전달한다.

## Layout

기본 수평 여백은 유동형 섹션 인셋을 사용한다. 데스크톱은 왼쪽 서사와 오른쪽 시각물을 비대칭으로 배치하고, 사례는 1.2 대 1 열로 구성한다. 프로젝트 시각물은 데스크톱에서 스크롤 동안 고정되며 본문이 옆으로 흐른다.

1099px 이하에서는 사례를 단일 열로 전환하고 시각물의 고정을 해제한다. 767px 이하에서는 24px 좌우 여백을 기준으로 모든 핵심 구간을 한 열에 쌓고, 첫 화면은 카메라 줌을 조정해 세로 화면에서도 얼음 건축물을 모두 보여준다. 실험실 미리보기는 모바일에서 숨기되 프로젝트 링크는 모두 유지한다. 내비게이션은 모든 크기에서 네 경로를 유지하고 링크마다 최소 44px 너비와 높이를 확보한다. 상단 고정 헤더는 데스크톱 88px, 모바일 105px이며, 사례 이미지의 고정 위치는 헤더 아래 112px이다.

프로젝트 설명은 데스크톱 16px, 모바일 15px로 읽는다. 접근 안내는 13px로 행동 앞에 배치하고, 의미 있는 캡션과 모바일 통계 라벨은 12px 아래로 줄이지 않는다. 실험 프로젝트는 업무 도구 세 개와 다른 실험 두 개로 묶는다.

## Elevation & Depth

대부분의 표면은 평평하며 깊이는 색면 전환, 원근, 잘린 프레임과 움직임으로 만든다. 그림자는 실제 프로젝트 화면을 무대에서 띄우는 경우에만 사용한다.

### Shadow Vocabulary

- **Cobalt Screen Lift** (`0 24px 48px rgba(4, 12, 62, 0.35)`): 파란 프로젝트 무대 위에서 실제 화면을 분리한다.
- **Silver Screen Lift** (`0 24px 48px rgba(24, 40, 67, 0.23)`): 밝은 은빛 프로젝트 무대 위에서 실제 화면을 분리한다.

### Named Rules

**The Screen Only Rule.** 그림자는 프로젝트 화면에만 허용한다. 일반 구간과 링크 행은 색면과 1px 선으로 계층을 만든다.

## Shapes

기본 형태는 각진 직사각형과 수평선이다. 버튼, 프로젝트 화면, 갤러리 행은 모서리를 둥글게 만들지 않는다. 원형은 다음 구간 이동과 연락 행동처럼 단독 방향을 나타내는 제어에만 사용한다. 첫 화면에는 별도 장식 프레임 없이 눈 계곡과 얼음 건축물을 사용한다.

## Components

### Buttons

- **Primary:** 밝은 전경색 바탕과 흑연 텍스트를 사용하는 각진 버튼이다. 넓은 아이콘 간격으로 다음 이동을 강조한다.
- **Case:** 투명 바탕과 가는 중성 테두리를 사용한다. 호버 시 밝은 면으로 반전한다.
- **Hover / Focus:** 화살표는 오른쪽 위로 짧게 이동한다. 키보드 포커스는 어두운 배경에서 밝은 코발트, 은빛 배경에서 짙은 코발트의 2px 외곽선과 6px 오프셋으로 표시한다.
- **Email Copy:** 연락 영역에는 이메일 주소 복사 버튼과 결과 안내를 제공한다. 자동 복사가 실패하면 주소를 선택하고 직접 복사하는 방법을 안내한다. 결과는 상태 영역으로 읽힌다.

### Cards / Containers

- **Project Visual:** 코발트 또는 은빛 무대 안에 16 대 10 실제 화면과 28px 브라우저 도구막대를 배치한다. 스크롤 위치에 따라 화면이 가볍게 기울고 이동한다.
- **Lab Preview:** 활성 프로젝트의 실제 이미지를 확대 상태에서 제자리로 전환한다. 캡션은 은빛 직사각형으로 이미지 왼쪽 아래에 붙인다.
- **Case Narrative:** 문제, 접근, 결과의 짧은 텍스트 레이블 열과 본문 열을 나누고 각 행의 상단을 가는 선으로 구분한다.

### Navigation

내비게이션은 소개, 프로젝트, 실험실, 연락의 네 경로를 13px 텍스트로 제공한다. 헤더는 스크롤 중에도 남아 있고 현재 구간에는 코발트 색, 밑줄, aria-current를 함께 적용한다. 모바일에서는 로고 아래 네 링크를 같은 너비로 배치한다. 첫 화면에는 프로젝트 보기와 연락하기를 함께 제공한다.

첫 구간에서는 로고만 표시하고 현재 위치는 aria-current로 전달한다. 같은 페이지의 이동은 아래 화살표, 내부 문서는 오른쪽 화살표, 외부 링크는 오른쪽 위 화살표와 보이는 새 탭 문구를 사용한다. 이메일 실행에는 봉투 아이콘을 사용한다. 모바일에서 숨겨진 실험실 미리보기의 선택 상태를 링크에 남기지 않는다.

프로젝트 용어는 긴 설명 앞의 접을 수 있는 안내 안에 설명한다. 없는 페이지에서는 한국어로 상황을 설명하고 첫 화면, 프로젝트, 연락 경로를 제공한다.

### Harness Document

공개 하네스 문서는 같은 색과 서체를 사용하는 Read 화면이다. 그래파이트 본문, 실버 텍스트, 코발트 계열의 현재 구간 표시를 유지한다. 영문 제목은 로컬 Geist, 한국어 설명은 Pretendard, 실제 코드와 버전 표기는 Geist Mono를 사용한다. 본문은 16px, 모바일은 15px이며 보조 라벨은 12px 이상이다.

데스크톱에는 고정된 일곱 구간 목차를 두고, 모바일에서는 상단의 네이티브 펼침 목차로 전환한다. 코드와 표만 지역적으로 가로 스크롤하며 문서 전체에는 가로 넘침이 없어야 한다. 읽는 화면에는 장식용 반복 모션을 추가하지 않는다. 기술 버전과 활용 현황의 서로 다른 기준 날짜를 명확히 유지한다.

### Motion Scene

지형과 70개의 얼음 블록을 실제 메시로 구성한다. 여섯 단의 돔 아래 세 단은 거의 수직으로 서고, 앞쪽에는 깊이가 있는 아치형 입구를 둔다. 카메라는 포인터를 부드럽게 따라 움직이며, 가까운 블록이 벌어지고 회전할 때 서리와 이음새의 빛도 함께 반응한다. 표면 이미지의 좌표는 각 블록의 초기 형상에 고정해 이동 중에도 재질이 블록에 붙어 있게 한다. 눈 입자 1,200개와 먼 지형의 안개로 깊이를 표현한다.

큰 산 앞에는 낮은 능선이 비스듬히 겹친다. 지형의 눈 재질은 고정된 월드 좌표에 연속해서 적용하며 카메라 시야에 따른 재질 절단을 사용하지 않는다. 눈 입자는 바람의 화면상 방향에 맞춰 기울고, 크기와 속도에 작은 차이를 둔다. 모바일 터치를 놓으면 시점과 블록을 원위치로 돌려 본문 탐색을 이어갈 수 있게 한다.

동일한 원본 비교 기준표로 독립90점 판정을 받았다. 구도, 재질, 입력 반응, 지속적인 분위기와 타이포그래피를 평가한 결과이며 픽셀 일치율을 의미하지 않는다. `npm run test:e2e`는 production build 후 주요3D 동작과 모바일 사용성을 검증한다.

WebGL이 준비된 뒤에만 일시 정지 제어를 표시한다. 모션 감소 환경에서는 정적인 장면을 표시하고 제어를 숨긴다. 정지, 탭 숨김, 화면 이탈 시 프레임 요청을 중단한다. 텍스처 로딩이 실패하거나 로딩 중 컴포넌트가 제거되면 GPU를 생성하지 않고 로드된 자원을 정리한다. WebGL을 사용할 수 없거나 컨텍스트가 손실되면 로컬 풍경 이미지가 남으며, JavaScript 없이도 본문과 링크를 이용할 수 있다.

모바일의 일시 정지 제어는 첫 화면의 행동 링크 아래 오른쪽에 배치한다. 헤더, 풍경, 행동 링크와 제어가 첫 뷰포트 안에 들어오도록 높이를 조정한다.

## Do's and Don'ts

### Do:

- **Do** 실제 프로젝트 화면을 사례의 가장 큰 시각 근거로 사용한다.
- **Do** 코발트 강조를 움직임, 활성 상태, 핵심 행동에 집중한다.
- **Do** 데스크톱의 비대칭 구성을 모바일에서 명확한 단일 열로 다시 배치한다.
- **Do** 모션이 멈춰도 모든 본문, 링크, 프로젝트 정보를 이용할 수 있게 한다.

### Don't:

- **Don't** 사용하지 않는 신문 테마의 색상이나 서체를 새 화면에 가져오지 않는다.
- **Don't** 일반 카드, 버튼, 링크에 임의의 둥근 모서리나 장식 그림자를 추가하지 않는다.
- **Don't** 실제 프로젝트 이미지를 추상 그래픽이나 임의의 목업으로 대체하지 않는다.
- **Don't** 모든 요소에 애니메이션을 적용해 눈 풍경의 대기 효과와 프로젝트 전환의 역할을 약하게 만들지 않는다.
