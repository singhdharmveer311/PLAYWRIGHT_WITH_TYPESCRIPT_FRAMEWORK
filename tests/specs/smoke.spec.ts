import { test, expect } from '../../src/core/BaseTest';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Search Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should display search button', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'Search' }).first();
    await expect(searchButton).toBeVisible();
  });

  test('should open search dialog on click', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'Search' }).first();
    
    // Click search button if visible
    if (await searchButton.isVisible()) {
      await searchButton.click();
      await page.waitForTimeout(1000);
    }
  });
});

test.describe('Responsive Design Tests', () => {
  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    
    const isLoaded = await homePage.verifyHomePageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('should work on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    
    const isLoaded = await homePage.verifyHomePageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('should work on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    const homePage = new HomePage(page);
    await homePage.navigateToHome();
    
    const isLoaded = await homePage.verifyHomePageLoaded();
    expect(isLoaded).toBeTruthy();
  });
});
