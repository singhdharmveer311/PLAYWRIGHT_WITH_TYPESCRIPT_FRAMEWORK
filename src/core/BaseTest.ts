import { test as baseTest } from '@playwright/test';
import { Logger } from '../utils/Logger';

/**
 * Base Test class with custom hooks and utilities
 */
export const test = baseTest.extend({
  // Auto-screenshot on failure
  screenshot: [
    async ({ page }, use, testInfo) => {
      await use();
      if (testInfo.status === 'failed') {
        const screenshot = await page.screenshot();
        await testInfo.attach('screenshot', {
          body: screenshot,
          contentType: 'image/png',
        });
      }
    },
    { auto: true },
  ],

  // Auto-logging
  logger: async ({}, use, testInfo) => {
    Logger.info(`Starting test: ${testInfo.title}`);
    await use(Logger);
    if (testInfo.status === 'passed') {
      Logger.success(`Test passed: ${testInfo.title}`);
    } else if (testInfo.status === 'failed') {
      Logger.error(`Test failed: ${testInfo.title}`);
    }
  },
});

export { expect } from '@playwright/test';
