import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

dotenv.config({
  path: process.env.ENV_NAME ? `./env-files/.env.${process.env.ENV_NAME}` : "./env-files/.env.demo",
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 60_000,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
  ],
  outputDir: "test-results",
  expect: {
    timeout: 15_000,
  },
  use: {
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    video: {
      mode: "retain-on-failure",
      size: { width: 1920, height: 1080 },
    },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "SetupAuth",
      testMatch: /tests\/ui\/global-setup\.spec\.ts/,
      use: {
        baseURL: process.env.BASE_URL,
      },
    },
    {
      name: "chromium",
      testIgnore: ["tests/api/**"],
      dependencies: ["SetupAuth"],
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.BASE_URL,
        storageState: "./.auth/user.json",
      },
    },
    {
      name: "firefox",
      testIgnore: ["tests/api/**"],
      use: {
        ...devices["Desktop Firefox"],
        baseURL: process.env.BASE_URL,
      },
    },
    {
      name: "api",
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {
        baseURL: process.env.API_BASE_URL,
        extraHTTPHeaders: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    },
  ],
});
