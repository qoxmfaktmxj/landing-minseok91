import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { chromium } from "@playwright/test";

const output = process.argv[2] ?? ".impeccable/review/arctic-performance.json";
const browser = await chromium.launch({
  args: process.platform === "win32" ? ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"] : [],
});
const results = [];
try {
  for (const mobile of [false, true]) {
    const context = await browser.newContext({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
      deviceScaleFactor: mobile ? 3 : 1, isMobile: mobile, hasTouch: mobile,
    });
    try {
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.arcticMetrics = { draws: 0, uploadBytes: 0 };
        for (const method of ["drawElements", "drawArrays"]) {
          const original = WebGL2RenderingContext.prototype[method];
          WebGL2RenderingContext.prototype[method] = function(...args) {
            window.arcticMetrics.draws++;
            return original.apply(this, args);
          };
        }
        const upload = WebGL2RenderingContext.prototype.bufferSubData;
        WebGL2RenderingContext.prototype.bufferSubData = function(target, offset, data, sourceOffset, length) {
          window.arcticMetrics.uploadBytes += length ? length * data.BYTES_PER_ELEMENT : data.byteLength;
          return upload.apply(this, arguments);
        };
      });
      await page.goto("http://127.0.0.1:3010/", { waitUntil: "domcontentloaded" });
      await page.locator(".hero canvas[data-ready=true]").waitFor({ state: "visible", timeout: 60_000 });
      const load = await page.evaluate(() => ({
        observedReadyMs: performance.now(),
        fcpMs: performance.getEntriesByName("first-contentful-paint")[0]?.startTime,
        userAgent: navigator.userAgent,
        textures: performance.getEntriesByType("resource").filter(entry => entry.name.includes("/images/arctic/")).map(entry => ({ url: entry.name, bytes: entry.encodedBodySize })),
      }));
      const viewport = page.viewportSize();
      await page.mouse.move(viewport.width / 2, viewport.height / 2);
      await page.waitForTimeout(3000);
      const samples = [];
      for (let run = 0; run < 3; run++) {
        const sample = await page.evaluate(() => new Promise(resolve => {
          const canvas = document.querySelector(".hero canvas");
          const start = performance.now();
          const firstFrame = Number(canvas.dataset.frames);
          const first = { ...window.arcticMetrics };
          const intervals = [];
          let previous = start;
          const tick = now => {
            intervals.push(now - previous);
            previous = now;
            if (now - start < 30_000) { requestAnimationFrame(tick); return; }
            const frames = Number(canvas.dataset.frames) - firstFrame;
            intervals.sort((a, b) => a - b);
            resolve({
              durationMs: now - start, frames, fps: frames * 1000 / (now - start),
              p95FrameMs: intervals[Math.floor(intervals.length * .95)],
              framesOver33ms: intervals.filter(value => value > 33.34).length,
              drawsPerFrame: (window.arcticMetrics.draws - first.draws) / frames,
              uploadBytesPerFrame: (window.arcticMetrics.uploadBytes - first.uploadBytes) / frames,
            });
          };
          requestAnimationFrame(tick);
        }));
        samples.push(sample);
        console.log(`${mobile ? "모바일 에뮬레이션" : "PC"} ${run + 1}/3: ${sample.fps.toFixed(1)} FPS, 버퍼 ${Math.round(sample.uploadBytesPerFrame)}바이트/프레임`);
      }
      results.push({ environment: mobile ? "모바일 에뮬레이션" : "PC", viewport, load, samples });
    } finally { await context.close(); }
  }
} finally { await browser.close(); }
await mkdir(dirname(output), { recursive: true });
await writeFile(output, JSON.stringify({ measuredAt: new Date().toISOString(), results }, null, 2) + "\n");
console.log(`측정 결과: ${output}`);
