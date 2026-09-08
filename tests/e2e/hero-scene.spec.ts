import { expect, test, type Locator, type Page } from "@playwright/test";

async function openScene(page: Page) {
  await page.goto("/");
  const canvas = page.locator(".hero canvas");
  await expect(canvas).toHaveAttribute("data-ready", "true");
  return canvas;
}

async function expectStopped(page: Page) {
  const canvas = page.locator(".hero canvas");
  await page.waitForTimeout(150);
  const frame = await canvas.getAttribute("data-frames");
  await page.waitForTimeout(300);
  expect(await canvas.getAttribute("data-frames")).toBe(frame);
  return frame;
}

async function expectRenderedPixels(canvas: Locator) {
  const pixels = await canvas.evaluate(element => new Promise<number[]>(resolve => requestAnimationFrame(() => {
    const surface = element as HTMLCanvasElement;
    const gl = surface.getContext("webgl2")!;
    const values: number[] = [];
    for (const y of [.3, .5, .8]) {
      const color = new Uint8Array(4);
      gl.readPixels(Math.floor(surface.width / 2), Math.floor(surface.height * y), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, color);
      values.push(...color.slice(0, 3));
    }
    resolve(values);
  })));
  expect(Math.max(...pixels) - Math.min(...pixels)).toBeGreaterThan(10);
}

test("정상 셰이더가 실제 픽셀을 출력하고 브라우저 오류가 없다", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  const canvas = await openScene(page);
  await page.mouse.move(720, 450);
  await expect.poll(async () => Number(await canvas.getAttribute("data-displacement"))).toBeGreaterThan(.1);
  await expectRenderedPixels(canvas);
  expect(errors).toEqual([]);
});

test("실행 중 모션 감소 설정을 바꾸면 정지하고 다시 재생한다", async ({ page }) => {
  const canvas = await openScene(page);
  await page.mouse.move(720, 450);
  await expect(canvas).toHaveAttribute("data-hover", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const frozen = await expectStopped(page);
  await expect(canvas).toHaveAttribute("data-displacement", "0.000");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(() => canvas.getAttribute("data-frames")).not.toBe(frozen);
  await expect(canvas).toHaveAttribute("data-hover", "false");
});

test("GPU를 두 번 복구해도 다운로드와 렌더링 루프가 중복되지 않는다", async ({ page }) => {
  const canvas = await openScene(page);
  for (let attempt = 0; attempt < 2; attempt++) {
    const extension = await canvas.evaluateHandle(element => (element as HTMLCanvasElement).getContext("webgl2")!.getExtension("WEBGL_lose_context")!);
    await extension.evaluate(value => value.loseContext());
    await expect(canvas).toHaveAttribute("data-ready", "false");
    const frozen = await expectStopped(page);
    await extension.evaluate(value => value.restoreContext());
    await expect(canvas).toHaveAttribute("data-ready", "true");
    await expect.poll(() => canvas.getAttribute("data-frames")).not.toBe(frozen);
    await expectRenderedPixels(canvas);
    await extension.dispose();
  }
  const textureCount = await page.evaluate(() => performance.getEntriesByType("resource").filter(entry => entry.name.includes("/images/arctic/")).length);
  expect(textureCount).toBe(7);
  const counts = await canvas.evaluate(element => new Promise<{ renders: number; ticks: number }>(resolve => {
    const first = Number((element as HTMLCanvasElement).dataset.frames);
    let ticks = 0;
    const sample = () => {
      ticks++;
      if (ticks < 30) requestAnimationFrame(sample);
      else resolve({ renders: Number((element as HTMLCanvasElement).dataset.frames) - first, ticks });
    };
    requestAnimationFrame(sample);
  }));
  expect(counts.renders).toBeGreaterThan(20);
  expect(counts.renders).toBeLessThanOrEqual(counts.ticks + 1);
});

test("셰이더 컴파일 실패는 준비 완료로 표시하지 않는다", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const original = WebGL2RenderingContext.prototype.shaderSource;
    WebGL2RenderingContext.prototype.shaderSource = function(shader, source) {
      original.call(this, shader, this.getShaderParameter(shader, this.SHADER_TYPE) === this.FRAGMENT_SHADER ? source + "\ninvalid_shader_for_test;" : source);
    };
  });
  await page.goto("/");
  const canvas = page.locator(".hero canvas");
  await expect(canvas).toHaveAttribute("data-ready", "false");
  await expect(canvas).toHaveCSS("opacity", "0");
  await expectStopped(page);
  await page.locator('.hero a[href="#work"]').click();
  await expect(page.locator("#work")).toBeInViewport();
});

test("텍스처 지연 중 본문을 표시하고 다운로드 후 3D로 전환한다", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/snow_02-diffuse.webp", async route => { await gate; await route.continue(); });
  try {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "김민석", level: 1 })).toBeVisible();
    const canvas = page.locator(".hero canvas");
    await expect(canvas).toHaveCSS("opacity", "0");
    await expect(page.locator('.hero a[href="#work"]')).toBeVisible();
    release();
    await expect(canvas).toHaveAttribute("data-ready", "true");
  } finally { release(); }
});

test("텍스처 한 장이 실패해도 배경과 링크를 유지한다", async ({ page }) => {
  await page.route("**/snow_02-diffuse.webp", route => route.abort("failed"));
  await page.goto("/");
  const canvas = page.locator(".hero canvas");
  await expect(canvas).toHaveAttribute("data-ready", "false");
  await expect(canvas).toHaveCSS("opacity", "0");
  await page.locator('.hero a[href="#work"]').click();
  await expect(page.locator("#work")).toBeInViewport();
});

test("화면 회전 후에도 이글루 터치와 링크 배치가 정상이다", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    const page = await context.newPage();
    const canvas = await openScene(page);
    await page.setViewportSize({ width: 844, height: 390 });
    await expect.poll(() => canvas.evaluate(el => Math.round(el.getBoundingClientRect().height))).toBe(390);
    await expect(page.locator('.hero a[href="#work"]')).toBeInViewport();
    await page.touchscreen.tap(574, 190);
    await expect(canvas).toHaveAttribute("data-hover", "true");
    await expect.poll(async () => Number(await canvas.getAttribute("data-displacement")), { intervals: [50] }).toBeGreaterThan(.1);
    await page.setViewportSize({ width: 390, height: 844 });
    await expect.poll(() => canvas.evaluate(el => Math.round(el.getBoundingClientRect().height))).toBe(844);
    await page.touchscreen.tap(195, 420);
    await expect(canvas).toHaveAttribute("data-hover", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  } finally { await context.close(); }
});

for (const [width, height] of [[320, 568], [430, 932], [568, 320], [768, 1024]]) {
  test(`${width}x${height} 화면에서 제목과 주요 링크가 겹치지 않는다`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openScene(page);
    const heading = page.getByRole("heading", { name: "김민석", level: 1 });
    const action = page.locator('.hero a[href="#work"]');
    await expect(heading).toBeInViewport();
    await expect(action).toBeInViewport();
    const titleBox = await heading.boundingBox();
    const actionBox = await action.boundingBox();
    expect(titleBox!.y + titleBox!.height).toBeLessThan(actionBox!.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("카메라와 얼음 블록이 반응하고 키보드로 프로젝트를 탐색할 수 있다", async ({ page }) => {
  const canvas = await openScene(page);
  await page.mouse.move(50, 450);
  const camera = await canvas.getAttribute("data-camera");
  await page.mouse.move(1390, 450);
  await expect.poll(() => canvas.getAttribute("data-camera")).not.toBe(camera);
  await page.mouse.move(720, 450);
  await expect(canvas).toHaveAttribute("data-hover", "true");
  await expect.poll(async () => Number(await canvas.getAttribute("data-displacement"))).toBeGreaterThan(.1);
  await page.mouse.move(10, 10);
  await expect(canvas).toHaveAttribute("data-hover", "false");
  await expect.poll(async () => Number(await canvas.getAttribute("data-displacement"))).toBeLessThan(.04);
  await expect(page.getByRole("button", { name: /그래픽/ })).toHaveCount(0);
  await page.locator('.hero a[href="#work"]').focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#work")).toBeInViewport();
});

test("hidden and offscreen scenes suspend and resume", async ({ page }) => {
  const canvas = await openScene(page);
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", { configurable: true, value: true });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  const hiddenFrame = await expectStopped(page);
  await page.evaluate(() => {
    Reflect.deleteProperty(document, "hidden");
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect.poll(() => canvas.getAttribute("data-frames")).not.toBe(hiddenFrame);
  await page.locator('.hero a[href="#work"]').click();
  await expect(canvas).toHaveAttribute("data-intersecting", "false");
  const outsideFrame = await expectStopped(page);
  await page.getByRole("link", { name: "김민석, 처음으로", exact: true }).click();
  await expect(canvas).toHaveAttribute("data-intersecting", "true");
  await expect.poll(() => canvas.getAttribute("data-frames")).not.toBe(outsideFrame);
});

test("reduced motion keeps a static scene and usable links", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openScene(page);
  await expectStopped(page);
  await expect(page.getByRole("button", { name: "그래픽 일시 정지" })).toBeHidden();
  const heading = page.getByRole("heading", { name: "김민석", level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText("KIM MINSEOK");
  await page.locator('.hero a[href="#work"]').click();
  await expect(page).toHaveURL(/#work$/);
});

test("unavailable WebGL preserves the background and navigation", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
        return type.includes("webgl") ? null : Reflect.apply(original, this, [type, ...args]);
      },
    });
  });
  await page.goto("/");
  const canvas = page.locator(".hero canvas");
  await expect(canvas).toHaveAttribute("data-ready", "false");
  await expect(canvas).toHaveCSS("opacity", "0");
  await expect(canvas.locator("..")).toHaveCSS("background-image", /arctic-hero/);
  await expect(page.getByRole("button", { name: "그래픽 일시 정지" })).toBeHidden();
  await expect(page.locator('.hero a[href="#work"]')).toBeVisible();
});

test("context loss returns to the static background", async ({ page }) => {
  const canvas = await openScene(page);
  const supported = await canvas.evaluate(element => {
    const extension = (element as HTMLCanvasElement).getContext("webgl2")?.getExtension("WEBGL_lose_context");
    extension?.loseContext();
    return Boolean(extension);
  });
  expect(supported).toBe(true);
  await expect(canvas).toHaveAttribute("data-ready", "false");
  await expect(canvas).toHaveCSS("opacity", "0");
  await expect(page.getByRole("button", { name: "그래픽 일시 정지" })).toBeHidden();
});

test("mobile short tap opens blocks, settles and only downloads lightweight textures", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  try {
    const page = await context.newPage();
    const canvas = await openScene(page);
    await page.touchscreen.tap(195, 420);
    await expect(canvas).toHaveAttribute("data-hover", "true");
    await expect.poll(async () => Number(await canvas.getAttribute("data-displacement")), { intervals: [50] }).toBeGreaterThan(.1);
    await expect(canvas).toHaveAttribute("data-hover", "false");
    await expect.poll(async () => Number(await canvas.getAttribute("data-displacement"))).toBeLessThan(.04);
    await expect.poll(() => canvas.getAttribute("data-camera")).toBe("-13.490,2.650,14.430");
    const textures = await page.evaluate(() => performance.getEntriesByType("resource")
      .filter((entry): entry is PerformanceResourceTiming => entry instanceof PerformanceResourceTiming && entry.name.includes("/images/arctic/"))
      .map(entry => ({ url: entry.name, bytes: entry.encodedBodySize })));
    expect(textures).toHaveLength(7);
    expect(textures.filter(texture => texture.url.includes("/mobile/"))).toHaveLength(5);
    const bytes = textures.reduce((sum, texture) => sum + texture.bytes, 0);
    expect(bytes).toBeGreaterThan(0);
    expect(bytes).toBeLessThan(3_000_000);
    await page.locator('.hero a[href="#work"]').tap();
    await expect(canvas).toHaveAttribute("data-intersecting", "false");
    await expect(page.locator("#work")).toBeInViewport();
  } finally { await context.close(); }
});
