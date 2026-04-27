import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { marked } from "marked";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const SRC = join(root, "public", "README_HARNESS.md");
const OUT = join(root, "public", "README_HARNESS.html");

marked.setOptions({ gfm: true, breaks: false });

function slugify(text) {
  return text
    .replace(/<[^>]+>/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s\-]/g, "")
    .replace(/\s+/g, "-");
}

function injectHeadingIds(html) {
  return html.replace(
    /<(h[1-3])>([\s\S]*?)<\/\1>/g,
    (_match, tag, inner) => `<${tag} id="${slugify(inner)}">${inner}</${tag}>`
  );
}

function wrap(body) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>EHR Harness Plugin · README — minseok91</title>
<meta name="description" content="Oracle 프로시저 기반 레거시 인사시스템(EHR)을 위한 AI 코딩 하네스 자동 생성 플러그인 README." />
<meta name="robots" content="noindex" />
<link rel="preconnect" href="https://cdn.jsdelivr.net" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
<link rel="icon" href="/icon.svg" />
<style>
  :root {
    --ink: #0a0a0a;
    --ink-2: #525252;
    --ink-3: #737373;
    --bg: #ffffff;
    --bg-soft: #fafafa;
    --bg-code: #f7f7f6;
    --line: #e5e5e5;
    --line-soft: rgba(229, 229, 229, 0.6);
    --accent: #00875e;
    --accent-soft: #00d992;
    --accent-tint: rgba(0, 135, 94, 0.08);
    --accent-line: rgba(0, 135, 94, 0.34);
    --mono: ui-monospace, "SFMono-Regular", "Geist Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --sans: "Pretendard Variable", "Pretendard", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--sans);
    font-feature-settings: "calt", "rlig";
    -webkit-font-smoothing: antialiased;
    line-height: 1.65;
  }
  ::selection { background: rgba(0, 135, 94, 0.18); color: var(--ink); }
  :focus { outline: none; }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }

  .topbar {
    position: sticky; top: 0; z-index: 10;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: saturate(160%) blur(14px);
    -webkit-backdrop-filter: saturate(160%) blur(14px);
    border-bottom: 1px solid var(--line);
  }
  .topbar-inner {
    max-width: 920px; margin: 0 auto; padding: 14px 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .brand {
    display: inline-flex; align-items: baseline; gap: 8px;
    font-weight: 800; letter-spacing: -0.04em; color: var(--ink);
    text-decoration: none; font-size: 16px;
  }
  .brand .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent); align-self: center;
    box-shadow: 0 0 10px var(--accent-soft);
  }
  .crumb {
    color: var(--ink-3); font-size: 13px; letter-spacing: -0.01em;
  }
  .crumb::before { content: "/"; padding: 0 8px; color: var(--ink-3); opacity: 0.4; }
  .back-link {
    margin-left: auto;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px;
    border: 1px solid var(--line); border-radius: 999px;
    color: var(--ink); text-decoration: none;
    font-size: 13px; font-weight: 600;
    transition: border-color 200ms, color 200ms, background 200ms;
  }
  .back-link:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-tint); }

  main {
    max-width: 760px;
    margin: 0 auto;
    padding: 56px 24px 96px;
  }
  .meta-eyebrow {
    font-family: var(--mono);
    font-size: 11px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.22em;
    color: var(--accent);
    margin-bottom: 12px;
  }

  h1 {
    font-size: clamp(2rem, 4.5vw + 0.6rem, 3rem);
    line-height: 1.05; letter-spacing: -0.04em; font-weight: 800;
    margin: 0 0 16px;
  }
  h2 {
    font-size: clamp(1.4rem, 1.8vw + 0.8rem, 1.75rem);
    line-height: 1.2; letter-spacing: -0.025em; font-weight: 700;
    margin: 64px 0 16px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
  }
  h2:first-of-type { border-top: 0; padding-top: 0; }
  h3 {
    font-size: 1.125rem; line-height: 1.35; letter-spacing: -0.015em;
    font-weight: 700; margin: 36px 0 12px;
  }
  h4 {
    font-size: 1rem; line-height: 1.4; font-weight: 700;
    margin: 28px 0 8px; color: var(--ink);
  }
  p { margin: 14px 0; color: var(--ink); }
  a { color: var(--accent); text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 150ms; }
  a:hover { border-bottom-color: var(--accent); }
  hr { border: 0; border-top: 1px solid var(--line); margin: 36px 0; }

  ul, ol { padding-left: 22px; margin: 12px 0; }
  li { margin: 6px 0; }
  li::marker { color: var(--ink-3); }
  ol > li::marker { font-feature-settings: "tnum"; font-weight: 600; color: var(--ink-2); }

  code {
    font-family: var(--mono);
    font-size: 0.875em;
    background: var(--bg-code);
    border: 1px solid var(--line-soft);
    border-radius: 4px;
    padding: 2px 6px;
    color: var(--ink);
  }
  pre {
    background: var(--bg-code);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 18px 20px;
    overflow-x: auto;
    margin: 18px 0;
    line-height: 1.55;
  }
  pre code {
    background: transparent;
    border: 0;
    padding: 0;
    font-size: 0.85rem;
    color: var(--ink);
  }
  blockquote {
    margin: 18px 0;
    padding: 12px 16px 12px 18px;
    background: var(--accent-tint);
    border-left: 1px solid var(--accent);
    border-radius: 4px;
    color: var(--ink);
  }
  blockquote p { margin: 4px 0; }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 18px 0;
    font-size: 0.92rem;
    overflow: hidden;
  }
  thead th {
    text-align: left;
    font-weight: 700;
    padding: 10px 12px;
    border-bottom: 2px solid var(--line);
    background: var(--bg-soft);
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  tbody td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--line);
    color: var(--ink);
    vertical-align: top;
  }
  tbody tr:last-child td { border-bottom: 0; }
  table code { font-size: 0.85em; }

  @media (max-width: 640px) {
    main { padding: 32px 20px 72px; }
    h1 { font-size: 1.85rem; }
    h2 { font-size: 1.35rem; margin-top: 48px; }
    .topbar-inner { padding: 12px 18px; gap: 10px; }
    .crumb { display: none; }
  }

  .top-link {
    position: fixed; right: 20px; bottom: 20px;
    width: 44px; height: 44px;
    display: inline-flex; align-items: center; justify-content: center;
    border-radius: 999px;
    background: var(--ink); color: #fff;
    text-decoration: none; font-size: 18px; font-weight: 700;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
    opacity: 0.9; transition: opacity 200ms, background 200ms, transform 200ms;
  }
  .top-link:hover { opacity: 1; background: var(--accent); transform: translateY(-2px); }
</style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="/">
        <span class="dot" aria-hidden="true"></span>
        MINSEOK91
      </a>
      <span class="crumb">하네스 플러그인 README</span>
      <a class="back-link" href="/" aria-label="홈으로 돌아가기">← 홈으로</a>
    </div>
  </header>

  <main>
    <p class="meta-eyebrow">// EHR HARNESS PLUGIN</p>
    <article>
${body}
    </article>
  </main>

  <a class="top-link" href="#top" aria-label="페이지 맨 위로">↑</a>
  <span id="top" style="position:fixed;top:0;left:0;width:0;height:0;"></span>
</body>
</html>
`;
}

const md = readFileSync(SRC, "utf8");
const html = injectHeadingIds(marked.parse(md));
const out = wrap(html);
writeFileSync(OUT, out);
console.log(`✓ wrote ${OUT} (${out.length} bytes)`);
