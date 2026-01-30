import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Recording...
  await page.locator('body').click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByText('Username : Admin').click();
  await page.getByText('Username : Admin').click();
  await page.getByText('Username : Admin').dblclick();
  await page.locator('body').press('ControlOrMeta+c');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).dblclick();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'PIM' }).click();
  await expect(page.getByRole('textbox', { name: 'Type for hints...' }).first()).toBeVisible();
  await page.getByRole('button', { name: ' Add' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('asdf');
  await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Middle Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('sdfg');
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('04192');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Successfully Saved')).toBeVisible();
  await page.getByText('Successfully Saved').click();
});