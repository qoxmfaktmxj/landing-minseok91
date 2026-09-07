import { expect, test, type Page } from "@playwright/test";

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

test("camera and nearby ice blocks respond, settle and support keyboard pause", async ({ page }) => {
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
  await page.getByRole("button", { name: "그래픽 일시 정지" }).focus();
  await page.keyboard.press("Space");
  const frozen = await expectStopped(page);
  await page.mouse.move(720, 450);
  expect(await canvas.getAttribute("data-frames")).toBe(frozen);
  await page.getByRole("button", { name: "그래픽 재생" }).click();
  await expect.poll(() => canvas.getAttribute("data-frames")).not.toBe(frozen);
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

test("mobile touch release recenters without horizontal overflow", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3112/");
    const canvas = page.locator(".hero canvas");
    await expect(canvas).toHaveAttribute("data-ready", "true");
    const cdp = await context.newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 420 }] });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 325, y: 420 }] });
    await expect.poll(() => canvas.getAttribute("data-camera")).not.toBe("-13.490,2.650,14.430");
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(canvas).toHaveAttribute("data-hover", "false");
    await expect.poll(() => canvas.getAttribute("data-camera")).toBe("-13.490,2.650,14.430");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.getByRole("button", { name: "그래픽 일시 정지" })).toBeInViewport();
  } finally { await context.close(); }
});
