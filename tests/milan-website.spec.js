import { test, expect } from '@playwright/test';

test.describe('Milan Kotarlić Website - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/youtube/v3/search**', async route => {
      const mockData = {
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
      console.log('YouTube API mocked for home page');
      await route.fulfill({ json: mockData });
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load home page with correct structure', async ({ page }) => {
    await expect(page).toHaveTitle(/Milan Kotarlić|SquareUp/);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('.hero')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    const navLinks = [
      { text: 'Home', url: '/' },
      { text: 'About', url: '/about' },
      { text: 'Gallery', url: '/gallery' },
      { text: 'Contact', url: '/contact' }
    ];

    for (const link of navLinks) {
      await page.click(`header a:has-text("${link.text}")`);
      await expect(page).toHaveURL(`http://localhost:5173${link.url}`);
      if (link.text !== 'Home') {
        await page.goBack();
      }
    }
  });

  test('should display hero section correctly', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero.locator('h1')).toBeVisible();
    await expect(hero.locator('.hero__subtitle')).toBeVisible();
    await expect(hero.locator('.hero__buttons')).toBeVisible();
  });

  test('should display services section with cards', async ({ page }) => {
    await expect(page.locator('.services')).toBeVisible();
    await expect(page.locator('.services__title')).toBeVisible();
    
    const serviceCards = page.locator('.services__card');
    await expect(serviceCards).toHaveCount(3);
    
    for (let i = 0; i < 3; i++) {
      const card = serviceCards.nth(i);
      await expect(card.locator('.services__card-title')).toBeVisible();
      await expect(card.locator('.services__card-description')).toBeVisible();
      await expect(card.locator('.services__button')).toBeVisible();
    }
  });

  test('should display why choose section', async ({ page }) => {
    await expect(page.locator('.why-choose')).toBeVisible();
    await expect(page.locator('.why-choose__title')).toBeVisible();
    
    const whyChooseCards = page.locator('.why-choose__card');
    await expect(whyChooseCards).toHaveCount(4);
  });

  test('should have working language switcher', async ({ page }) => {
    const languageSwitcher = page.locator('.header__language');
    if (await languageSwitcher.count() > 0) {
      await expect(languageSwitcher).toBeVisible();
      
      const enButton = page.locator('button:has-text("EN")');
      const srButton = page.locator('button:has-text("SR")');
      
      if (await enButton.count() > 0 && await srButton.count() > 0) {
        await expect(enButton).toBeVisible();
        await expect(srButton).toBeVisible();
        
        await srButton.click();
        await page.waitForTimeout(500);
        
        await enButton.click();
      }
    }
  });

  test('should have responsive mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const hamburger = page.locator('.header__hamburger-icon');
    await expect(hamburger).toBeVisible();
    
    await page.evaluate(() => {
      document.querySelector('.header__hamburger-icon')?.click();
    });
    
    await page.waitForTimeout(2000);
    
    await page.goto('/gallery');
    await expect(page).toHaveURL(/.*gallery/);
  });

  test('should have functional footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    await expect(footer.locator('.footer__logo')).toBeVisible();
    await expect(footer.locator('.footer__nav')).toBeVisible();
    await expect(footer.locator('.footer__social')).toBeVisible();
    await expect(footer.locator('.footer__contact-info')).toBeVisible();
    
    const socialLinks = footer.locator('.footer__social-link');
    await expect(socialLinks).toHaveCount(3);
  });
});

test.describe('Gallery Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/youtube/v3/search**', async route => {
      const mockData = {
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
      console.log('YouTube API mocked for gallery page');
      await route.fulfill({ json: mockData });
    });

    await page.goto('/gallery');
    await page.waitForLoadState('networkidle');
  });

  test('should load gallery page correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Music|Moja Muzika/);
    await expect(page.locator('.gallery__videos')).toBeVisible();
  });

  test('should display video cards', async ({ page }) => {
    await page.waitForSelector('.video-card', { timeout: 10000 });
    const videoCards = page.locator('.video-card');
    await expect(videoCards.first()).toBeVisible();
    
    const firstCard = videoCards.first();
    await expect(firstCard.locator('.video-card__title')).toBeVisible();
    await expect(firstCard.locator('.video-card__thumbnail')).toBeVisible();
    await expect(firstCard.locator('.video-card__play-overlay')).toBeVisible();
  });

  test('should open and close video player', async ({ page }) => {
    const videoCards = page.locator('.video-card');
    await videoCards.first().click();
    
    await expect(page.locator('.video-player__overlay')).toBeVisible();
    await expect(page.locator('.video-player__title')).toBeVisible();
    
    await page.locator('.video-player__close').click();
    await expect(page.locator('.video-player__overlay')).not.toBeVisible();
  });
});

test.describe('About Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
  });

  test('should load about page correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Hello I am Milan/);
    await expect(page.locator('.about__image')).toBeVisible();
    await expect(page.locator('.about__links')).toBeVisible();
    await expect(page.locator('.about__products')).toBeVisible();
  });

  test('should have social links', async ({ page }) => {
    const socialLinks = page.locator('.about__links a');
    await expect(socialLinks).toHaveCount(4);
  });
});

test.describe('Contact Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
  });

  test('should load contact page correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Contact/);
    await expect(page.locator('.contact__info')).toBeVisible();
    await expect(page.locator('.contact-page__form')).toBeVisible();
  });

  test('should have contact information', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Phone' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Location' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Connect With Me' })).toBeVisible();
  });

  test('should fill contact form', async ({ page }) => {
    await page.fill('input[placeholder*="Name"]', 'John Doe');
    await page.fill('input[placeholder*="Email"]', 'john@example.com');
    await page.fill('textarea', 'Test message for contact form');
    
    await expect(page.locator('input[placeholder*="Name"]')).toHaveValue('John Doe');
    await expect(page.locator('input[placeholder*="Email"]')).toHaveValue('john@example.com');
    await expect(page.locator('textarea')).toHaveValue('Test message for contact form');
    
    await page.click('button[type="submit"]');
  });

  test('should have start project button', async ({ page }) => {
    await expect(page.locator('button:has-text("Start a Project")')).toBeVisible();
    await page.click('button:has-text("Start a Project")');
  });
});