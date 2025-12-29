import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { GettingStartedPage } from '../pages/GettingStartedPage';

/**
 * Custom fixtures for page objects
 */
type CustomFixtures = {
  homePage: HomePage;
  gettingStartedPage: GettingStartedPage;
};

/**
 * Extend base test with custom page object fixtures
 */
export const test = base.extend<CustomFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  gettingStartedPage: async ({ page }, use) => {
    const gettingStartedPage = new GettingStartedPage(page);
    await use(gettingStartedPage);
  },
});

export { expect } from '@playwright/test';
