import { test, expect } from '../../src/core/BaseTest';
import { HomePage } from '../../src/pages/HomePage';
import { GettingStartedPage } from '../../src/pages/GettingStartedPage';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should load home page successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const isLoaded = await homePage.verifyHomePageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('should have correct page title', async ({ page }) => {
    const homePage = new HomePage(page);
    const title = await homePage.getTitle();
    expect(title).toContain('Playwright');
  });

  test('should display navigation menu', async ({ page }) => {
    const homePage = new HomePage(page);
    const navMenu = homePage.getNavigationMenu();
    await expect(navMenu).toBeVisible();
  });

  test('should navigate to Getting Started page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickGetStarted();
    
    // Verify navigation
    const gettingStartedPage = new GettingStartedPage(page);
    await gettingStartedPage.waitForPageLoad();
    const url = gettingStartedPage.getCurrentURL();
    expect(url).toContain('docs');
  });

  test('should navigate to Docs page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickDocs();
    
    // Verify URL changed
    await page.waitForLoadState('networkidle');
    const url = page.url();
    expect(url).toContain('docs');
  });
});

test.describe('Getting Started Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const gettingStartedPage = new GettingStartedPage(page);
    await gettingStartedPage.navigateToGettingStarted();
  });

  test('should load Getting Started page', async ({ page }) => {
    const gettingStartedPage = new GettingStartedPage(page);
    const isLoaded = await gettingStartedPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('should display sidebar navigation', async ({ page }) => {
    const gettingStartedPage = new GettingStartedPage(page);
    const isSidebarVisible = await gettingStartedPage.isSidebarVisible();
    expect(isSidebarVisible).toBeTruthy();
  });

  test('should have page heading', async ({ page }) => {
    const gettingStartedPage = new GettingStartedPage(page);
    const heading = await gettingStartedPage.getPageHeading();
    expect(heading).toBeTruthy();
    expect(heading.length).toBeGreaterThan(0);
  });
});
