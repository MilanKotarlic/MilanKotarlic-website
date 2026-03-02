import { test, expect } from '@playwright/test';
import mockVideos from './mocks/videos.json' assert { type: 'json' };
const BASE_URL = process.env.CI ? 'http://localhost:4173' : 'http://localhost:5174';


test.describe('Milan Kotarlić Website - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('https://www.googleapis.com*', route => route.fulfill({ json: mockVideos }));
    await page.goto(BASE_URL + '/');
    await page.waitForLoadState('networkidle');
  });

  test('should load home page correctly', async ({ page }) => {
    await expect(page.locator('.header')).toBeVisible();
    await expect(page.locator('.footer')).toBeVisible();
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
      await page.click(`.header__nav-link:has-text("${link.text}")`);
      await expect(page).toHaveURL(`${BASE_URL}${link.url}`);
      if (link.text !== 'Home') await page.goBack();
    }
  });

  test('should display hero section correctly', async ({ page }) => {
    const hero = page.locator('.hero');
    await expect(hero.locator('.hero__title')).toBeVisible();
    await expect(hero.locator('.hero__subtitle')).toBeVisible();
    await expect(hero.locator('.hero__buttons')).toBeVisible();
  });

  test('should display services section with cards', async ({ page }) => {
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
  await page.goto(BASE_URL + '/');
  const hamburger = page.locator('.header__hamburger');
  await expect(hamburger).toBeVisible({ timeout: 10000 });
  await hamburger.click();
  await expect(page.locator('.header__nav--mobile.header__nav--open')).toBeVisible({ timeout: 5000 });
  await page.locator('.header__nav--mobile .header__nav-link:has-text("Gallery")').click();
  await expect(page).toHaveURL(/.*gallery/);
});

  test('should have functional footer', async ({ page }) => {
    const footer = page.locator('.footer');
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
    await page.route('**/youtube/v3/channels**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          items: [
            {
              id: "UCsaYUfVMS7y74eUOMBJ4tAg",
              contentDetails: {
                relatedPlaylists: {
                  uploads: "UUsaYUfVMS7y74eUOMBJ4tAg"
                }
              }
            }
          ]
        })
      });
    });

    await page.route('**/youtube/v3/playlistItems**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockVideos)
      });
    });

    await page.goto(BASE_URL + '/gallery');
    await page.waitForLoadState('networkidle');
    
    await page.waitForFunction(() => {
      const cards = document.querySelectorAll('.video-card');
      return cards.length > 0 && cards[0].offsetParent !== null;
    }, { timeout: 30000 });
  });

  test('should load gallery page correctly', async ({ page }) => {
    await expect(page.locator('.gallery__title')).toBeVisible();
    await expect(page.locator('.gallery__subtitle')).toBeVisible();
    await expect(page.locator('.gallery__videos')).toBeVisible();
  });

  test('should display video cards', async ({ page }) => {
    const videoCards = page.locator('.video-card');
    await expect(videoCards.first()).toBeVisible({ timeout: 15000 });
    await expect(videoCards.first().locator('.video-card__title')).toBeVisible();
    await expect(videoCards.first().locator('.video-card__thumbnail')).toBeVisible();
  });

  test('should open and close video player', async ({ page }) => {
    const videoCards = page.locator('.video-card');
    await videoCards.first().click();
    
    await expect(page.locator('.video-player__overlay')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('.video-player__title')).toBeVisible();
    
    await page.locator('.video-player__close').click();
    await expect(page.locator('.video-player__overlay')).not.toBeVisible();
  });
});

test.describe('About Page Tests', () => {
  test.beforeEach(async ({ page }) => { 
    await page.goto(BASE_URL + '/about'); 
    await page.waitForLoadState('networkidle'); 
  });
  
  test('should load about page correctly', async ({ page }) => {
    await expect(page.locator('.about__heading')).toBeVisible();
    await expect(page.locator('.about__paragraph')).toBeVisible();
    await expect(page.locator('.about__image')).toBeVisible();
  });
  
  test('should have social links', async ({ page }) => {
    const socialLinks = page.locator('.about__link');
    await expect(socialLinks).toHaveCount(4);
    await expect(page.locator('.about__link:has-text("LinkedIn")')).toBeVisible();
    await expect(page.locator('.about__link:has-text("Facebook")')).toBeVisible();
    await expect(page.locator('.about__link:has-text("Instagram")')).toBeVisible();
    await expect(page.locator('.about__link:has-text("TikTok")')).toBeVisible();
  });

  test('should have YouTube link in products section', async ({ page }) => {
    await expect(page.locator('.about__youtube-link')).toBeVisible();
    await expect(page.locator('.about__youtube-icon')).toBeVisible();
    await expect(page.locator('.about__products-description')).toBeVisible();
  });
});

test.describe('Contact Page Tests', () => {
  test.beforeEach(async ({ page }) => { 
    await page.goto(BASE_URL + '/contact'); 
    await page.waitForLoadState('networkidle'); 
  });
  
  test('should load contact page correctly', async ({ page }) => {
    await expect(page.locator('.contact-page__title')).toBeVisible();
    await expect(page.locator('.contact__info')).toBeVisible();
  });
  
  test('should have contact information', async ({ page }) => {
    await expect(page.locator('.contact__info-item')).toHaveCount(4);
    
    const emailItem = page.locator('.contact__info-item:has-text("Email")');
    await expect(emailItem).toBeVisible();
    await expect(emailItem.locator('a[href^="mailto:"]')).toBeVisible();
    
    const phoneItem = page.locator('.contact__info-item:has-text("Phone")');
    await expect(phoneItem).toBeVisible();
    await expect(phoneItem.locator('a[href^="tel:"]')).toBeVisible();
    
    const locationItem = page.locator('.contact__info-item:has-text("Location")');
    await expect(locationItem).toBeVisible();
    
    const socialItem = page.locator('.contact__info-item--social');
    await expect(socialItem).toBeVisible();
    await expect(socialItem.locator('.contact__social-link')).toHaveCount(4);
  });
});