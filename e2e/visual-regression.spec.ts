import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests
 * Captures screenshots at multiple viewport sizes and animation states
 */

test.describe('Visual Regression - Desktop', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for animations to settle
    await page.waitForTimeout(1000);
  });

  test('Hero section renders correctly', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    // Capture hero section
    await hero.screenshot({ path: 'e2e/screenshots/hero-desktop.png' });
  });

  test('Projects grid renders correctly', async ({ page }) => {
    const projectsSection = page.locator('section').nth(1);
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await projectsSection.screenshot({ path: 'e2e/screenshots/projects-desktop.png' });
  });

  test('Experience timeline renders correctly', async ({ page }) => {
    const timelineSection = page.locator('section').nth(2);
    await timelineSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await timelineSection.screenshot({ path: 'e2e/screenshots/timeline-desktop.png' });
  });

  test('Tech stack marquee renders correctly', async ({ page }) => {
    const marqueeSection = page.locator('section').nth(3);
    await marqueeSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await marqueeSection.screenshot({ path: 'e2e/screenshots/marquee-desktop.png' });
  });

  test('Full page screenshot', async ({ page }) => {
    await page.screenshot({ 
      path: 'e2e/screenshots/full-page-desktop.png',
      fullPage: true 
    });
  });
});

test.describe('Visual Regression - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('Hero section mobile view', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
    
    await hero.screenshot({ path: 'e2e/screenshots/hero-mobile.png' });
  });

  test('Projects grid mobile view', async ({ page }) => {
    const projectsSection = page.locator('section').nth(1);
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    await projectsSection.screenshot({ path: 'e2e/screenshots/projects-mobile.png' });
  });

  test('Full page mobile screenshot', async ({ page }) => {
    await page.screenshot({ 
      path: 'e2e/screenshots/full-page-mobile.png',
      fullPage: true 
    });
  });
});

test.describe('Visual Regression - Tablet', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);
  });

  test('Full page tablet screenshot', async ({ page }) => {
    await page.screenshot({ 
      path: 'e2e/screenshots/full-page-tablet.png',
      fullPage: true 
    });
  });
});

test.describe('Hover States', () => {
  test('Project card hover effect', async ({ page }) => {
    await page.goto('/');
    
    const projectsSection = page.locator('section').nth(1);
    await projectsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // Find first project card
    const firstCard = page.locator('[class*="group"]').first();
    await firstCard.hover();
    await page.waitForTimeout(300);
    
    await firstCard.screenshot({ path: 'e2e/screenshots/project-card-hover.png' });
  });

  test('CTA button hover effect', async ({ page }) => {
    await page.goto('/');
    
    const ctaButton = page.locator('button, a').filter({ hasText: /view|contact|explore/i }).first();
    await ctaButton.hover();
    await page.waitForTimeout(300);
    
    await ctaButton.screenshot({ path: 'e2e/screenshots/cta-button-hover.png' });
  });
});

test.describe('Animation States', () => {
  test('Spotlight animation initial state', async ({ page }) => {
    await page.goto('/');
    // Capture immediately
    await page.screenshot({ path: 'e2e/screenshots/spotlight-initial.png' });
  });

  test('Spotlight animation after mouse move', async ({ page }) => {
    await page.goto('/');
    
    // Move mouse to trigger spotlight
    await page.mouse.move(500, 300);
    await page.waitForTimeout(100);
    
    await page.screenshot({ path: 'e2e/screenshots/spotlight-moved.png' });
  });

  test('Marquee animation mid-scroll', async ({ page }) => {
    await page.goto('/');
    
    const marqueeSection = page.locator('section').nth(3);
    await marqueeSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000); // Let marquee animate
    
    await marqueeSection.screenshot({ path: 'e2e/screenshots/marquee-animated.png' });
  });
});
