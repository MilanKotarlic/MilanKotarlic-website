import { test, expect } from '@playwright/test';

const mockYouTubeResponse = {
  items: [
    {
      id: { videoId: 'test1' },
      snippet: {
        title: 'Test Video 1',
        description: 'Test description',
        thumbnails: { medium: { url: 'https://test.com/thumb1.jpg' } },
        channelTitle: 'Test Channel'
      }
    },
    {
      id: { videoId: 'test2' },
      snippet: {
        title: 'Test Video 2',
        description: 'Another test',
        thumbnails: { medium: { url: 'https://test.com/thumb2.jpg' } },
        channelTitle: 'Test Channel'
      }
    }
  ]
};

test.describe('Milan Kotarlić Website - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/youtube/v3/search**', async route => {
      await route.fulfill({ json: mockYouTubeResponse });
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load home page correctly', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
  });

  test('should display gallery videos', async ({ page }) => {
    await page.goto('/gallery');
    await page.waitForSelector('.video-card', { timeout: 10000 });

    const videoCards = page.locator('.video-card');
    await expect(videoCards).toHaveCount(2);

    await expect(videoCards.first().locator('.video-card__title')).toBeVisible();
    await expect(videoCards.first().locator('.video-card__thumbnail')).toBeVisible();
  });

  test('should open and close video player', async ({ page }) => {
    await page.goto('/gallery');
    const videoCards = page.locator('.video-card');
    await videoCards.first().click();

    await expect(page.locator('.video-player__overlay')).toBeVisible();
    await page.locator('.video-player__close').click();
    await expect(page.locator('.video-player__overlay')).not.toBeVisible();
  });
});
