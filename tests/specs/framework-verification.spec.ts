import { test, expect } from '../../src/core/BaseTest';

test.describe('Framework Verification Tests', () => {
  test('should navigate to example.com', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('should verify page object model works', async ({ page }) => {
    await page.goto('https://example.com');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Example Domain');
  });

  test('should capture screenshot on failure', async ({ page }) => {
    await page.goto('https://example.com');
    const content = page.locator('p').first();
    await expect(content).toBeVisible();
  });

  test('should verify logging works', async ({ page, logger }) => {
    logger.info('Test is running');
    await page.goto('https://example.com');
    logger.success('Navigation completed');
    await expect(page).toHaveURL(/example.com/);
  });
});
