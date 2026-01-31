import { test, expect } from '@playwright/test';

test('example test - can delete', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toBeVisible();
});