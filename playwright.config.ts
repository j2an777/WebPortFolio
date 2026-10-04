import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: "http://localhost:3100",
    browserName: "chromium",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  reporter: [["list"]],
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
  },
});
