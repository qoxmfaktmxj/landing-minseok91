import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  use: {
    baseURL: "http://127.0.0.1:3112",
    viewport: { width: 1440, height: 900 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: process.platform === "win32" && process.env.PLAYWRIGHT_HARDWARE_GPU === "1"
      ? { args: ["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist"] }
      : undefined,
  },
  webServer: {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3112",
    url: "http://127.0.0.1:3112",
    reuseExistingServer: false,
  },
});
