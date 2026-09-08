import { chromium } from "@playwright/test";
import sharp from "sharp";

const browser = await chromium.launch({ args: process.platform === "win32" ? ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"] : [] });
try {
  for (const mobile of [false, true]) {
    const context = await browser.newContext({
      viewport: mobile ? { width: 600, height: 1600 } : { width: 3600, height: 1000 },
      isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1, reducedMotion: "no-preference",
    });
    let release;
    const gate = new Promise(resolve => { release = resolve; });
    const page = await context.newPage();
    try {
      await page.route("**/images/arctic/**", async route => { await gate; await route.continue(); });
      await page.goto("http://127.0.0.1:3010/", { waitUntil: "domcontentloaded" });
      await page.locator(".hero canvas[data-preview=true]").waitFor({ state: "visible" });
      await page.waitForFunction(() => getComputedStyle(document.querySelector(".hero canvas")).opacity === "1");
      await page.addStyleTag({ content: ".site-header, .hero [class*=copy], .hero [class*=actions], .hero [class*=caption], .hero [class*=bottom] { visibility: hidden !important; } .hero [class*=stage]::after { content: none !important; }" });
      const png = await page.locator(".hero canvas").screenshot();
      const output = `public/images/arctic-loading-${mobile ? "mobile" : "desktop"}.webp`;
      const result = await sharp(png).webp({ quality: 88, effort: 6 }).toFile(output);
      console.log(`${output}: ${result.size}바이트`);
    } finally {
      release();
      await page.unrouteAll({ behavior: "wait" });
      await context.close();
    }
  }
} finally { await browser.close(); }
