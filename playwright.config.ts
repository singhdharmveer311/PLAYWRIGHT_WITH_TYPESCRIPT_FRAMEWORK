import { defineConfig, devices } from '@playwright/test';
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

dotenv.config({
  path: process.env.ENV_NAME ? `./env-files/.env.${process.env.ENV_NAME}` : './env-files/.env'
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', {open: 'always'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  
  // My defined values there are 2 timeouts one for normal locator find ( 30 sec and one for the assertions ( default - 5s )
  // timeout: 40000   -> Timeout for the  test. 
  expect: {
    timeout: 30000    // timeout for the expect assertions
  },
  
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    video: {
      mode: 'on',
      size: { width: 1920, height: 1080 } // Full HD resolution
    },
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'SetupAuth',
      testMatch: 'global-setup.spec.ts'
    },

    {
      name: 'chromium',
      dependencies: ['SetupAuth'],   // authentication setup reuse setup
      use: { ...devices['Desktop Chrome'],
            storageState: './.auth/user.json'
       },
    },

    {
      name: 'firefox',
      // dependencies: ['SetupAuth'],
      use: { ...devices['Desktop Firefox']
        //  storageState: './playwright/.auth/user.json'
     },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
