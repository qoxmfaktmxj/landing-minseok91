import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

test("터치 드래그 후 카메라가 복귀하고 주요 링크가 보인다", async ({ page, context }) => {
  await page.goto("/");
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
  await expect(page.locator('.hero a[href="#work"]')).toBeInViewport();
});

test("모바일 스크롤이 그래픽 반응을 취소하고 가로 넘침이 없다", async ({ page, context }) => {
  await page.goto("/");
  const canvas = page.locator(".hero canvas");
  await expect(canvas).toHaveAttribute("data-ready", "true");
  const cdp = await context.newCDPSession(page);
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 195, y: 420 }] });
  await expect(canvas).toHaveAttribute("data-hover", "true");
  for (const y of [400, 360, 300, 220]) {
    await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 195, y }] });
  }
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(50);
  await expect(canvas).toHaveAttribute("data-hover", "false");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
