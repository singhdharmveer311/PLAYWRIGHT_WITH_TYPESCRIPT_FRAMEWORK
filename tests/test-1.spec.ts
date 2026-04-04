import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('button', { name: 'Zoom in' }).click();
  await page.getByRole('button', { name: 'Home' }).click();
  await page.locator('canvas').click({
    position: {
      x: 366,
      y: 187
    }
  });
});