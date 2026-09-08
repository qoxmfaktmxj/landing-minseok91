# Minseok Landing Page

민석을 소개하고 주요 프로젝트와 연락처를 정리한 개인 랜딩 페이지입니다.

프로필, 기술 스택, 프로젝트 소개, 연락 채널을 한 페이지에 담은 포트폴리오 성격의 웹사이트입니다.

첫 화면은 Three.js로 직접 구성한 3D 눈 계곡과 여섯 단의 얼음 건축물입니다. 포인터에 따라 카메라가 움직이며, 가까운 블록이 벌어지고 서리와 이음새의 빛이 반응합니다. 눈 입자는 여러 깊이에서 계속 흐릅니다. 이후 구간은 기존 그래파이트, 실버, 코발트를 유지하며 대표 사례를 실제 프로젝트 화면과 함께 소개합니다. 실험실 미리보기는 마우스와 키보드 포커스로 탐색할 수 있습니다.

정상 진입 시 완성된 이글루 사진을 먼저 표시하지 않습니다. 3D 코드가 준비되면 윤곽선을 먼저 렌더링하고, 재질 다운로드 중에는 같은 카메라 위치와 진행률에서 고정합니다. 재질이 준비되면 PC 2.6초, 터치 기기 1.8초 동안 윤곽선이 얼음으로 변하고 카메라가 기본 위치로 내려옵니다. 연결망은 등장 순간에만 보이며 숫자 표시는 없습니다. 이후에는 블록이 서로 다른 속도로 조금씩 움직이고, 포인터 가까이의 블록은 더 크게 반응합니다. 이름에 마우스를 올리면 0.25초의 짧은 글리치 효과가 재생됩니다. 모션 감소 설정에서는 등장과 자동 움직임, 글리치를 생략합니다.

운영체제의 모션 감소 설정을 지원하며, 탭이 숨겨지거나 첫 화면을 벗어나면 렌더링을 멈춥니다. 별도 일시 정지 버튼은 제공하지 않습니다. WebGL을 사용할 수 없거나 셰이더가 실패하면 로컬 풍경 이미지가 남고, GPU 손실 후 복구되면 장면을 다시 재생합니다. JavaScript 없이도 풍경, 경력과 프로젝트 링크를 확인할 수 있습니다. 최종 시각 규칙은 `DESIGN.md`를 참고하세요.

모바일에서도 네 개의 주요 메뉴와 현재 구간 표시를 유지합니다. 이메일 주소 복사, 한국어 오류 페이지의 복귀 경로, 프로젝트 용어 안내를 제공합니다. Nielsen 휴리스틱 평가 기록은 `.impeccable/critique/`에 저장합니다.

일반적인 PC와 세로 모바일에서는 실제 대기 프레임을 캡처한 작은 WebP를 먼저 표시합니다. 특수한 가로 화면과 작은 세로 화면은 잘못된 구도의 사진을 확대하지 않고 배경에서 실제 윤곽선으로 전환합니다. 로딩 이미지는 production 서버 실행 후 `node scripts/capture-arctic-loading.mjs`로 다시 만들 수 있습니다.

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / WebGL / GLSL

## 로컬 실행

```bash
npm install
npm run dev
```

로컬 개발 서버는 `http://localhost:3010` 에서 실행됩니다.

## 스크립트

```bash
npm run dev
npm run build
npm run start
npm run lint
```

3D 배경과 주요 동작은 Chromium과 WebKit에서 검증합니다. 테스트는 production build 후 전용 포트 3112에서 실행합니다.

```bash
npx playwright install chromium webkit
npm run test:e2e
```

Windows에서 실제 GPU 경로를 확인하려면 `PLAYWRIGHT_HARDWARE_GPU=1` 환경 변수를 사용할 수 있습니다. 테스트는 실제 픽셀 출력, 셰이더 실패, GPU 반복 복구, 텍스처 지연과 실패, 화면 이탈, 모션 감소, 모바일 탭과 화면 회전을 확인합니다. CDP를 사용하는 드래그와 관성 스크롤 검사는 Chromium 전용 파일에서 실행합니다.

성능은 포트 3010에서 production 서버를 실행한 뒤 측정합니다. PC와 모바일 에뮬레이션 각각 30초씩 3회 검사하며, 실제 휴대폰의 발열과 성능 검증은 별도로 진행해야 합니다.

```bash
npm run test:performance
```

결과는 `.impeccable/review/arctic-performance.json`에 기록합니다.

## 프로젝트 구조

```text
src/app
src/components
src/data
public/images
```

## 하네스 문서

`public/README_HARNESS.html`은 공개용 요약 문서입니다. 랜딩페이지의 디자인을 따르는 `public/harness-document.css`와 목차 동작을 위한 `public/harness-document.js`를 사용합니다. 기술 설명 원문은 `public/README_HARNESS.md`에 별도로 보존합니다.

기존 `scripts/build-readme.mjs`는 긴 Markdown을 별도 레이아웃으로 변환해 요약 HTML을 덮어쓰는 도구이므로, 현재 공개 문서의 디자인 수정에는 사용하지 않습니다. 공개 요약본은 HTML을 기준으로 편집합니다.

하네스 미리보기는 문서 첫 화면을 폰트 로딩 완료 후 1600×1000 크기로 촬영한 `public/images/harness-thumb-cinematic.png`입니다. 문서를 변경하면 실제 화면을 다시 촬영하고 `src/data/siteContent.ts`의 이미지 경로를 확인합니다.

## 목적

- 민석을 소개하는 개인 랜딩 페이지
- 주요 프로젝트와 기술 역량 정리
- 포트폴리오와 연락 채널 제공
