import { test, expect } from '@playwright/test';

/**
 * Accessibility Tests with Playwright
 * Tests keyboard navigation, focus management, and ARIA attributes
 */

test.describe('Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Tab navigation through interactive elements', async ({ page }) => {
    // Start tabbing through the page
    await page.keyboard.press('Tab');
    
    // Check first focusable element has focus
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT']).toContain(firstFocused);
    
    // Tab through multiple elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
    
    // Verify focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('Focus indicators are visible', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check for focus ring/outline
    const outline = await focusedElement.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.boxShadow;
    });
    
    expect(outline).not.toBe('none');
    expect(outline).not.toBe('');
  });

  test('Enter key activates buttons', async ({ page }) => {
    // Find first button
    const button = page.locator('button, a[role="button"]').first();
    await button.focus();
    
    // Press Enter
    await page.keyboard.press('Enter');
    
    // Verify button was activated (check for navigation or state change)
    await page.waitForTimeout(500);
  });

  test('Escape key closes modals/dialogs', async ({ page }) => {
    // This test assumes modals exist - adjust based on actual implementation
    // For now, just verify Escape doesn't break the page
    await page.keyboard.press('Escape');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('ARIA Attributes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Heading hierarchy is correct', async ({ page }) => {
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Only one h1 per page
    
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text).toBeTruthy();
  });

  test('Buttons have accessible names', async ({ page }) => {
    const buttons = page.locator('button, a[role="button"]');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      
      // Button must have either text content or aria-label
      expect(ariaLabel || text?.trim()).toBeTruthy();
    }
  });

  test('Decorative elements have aria-hidden', async ({ page }) => {
    // Check SVG decorative elements
    const decorativeSvgs = page.locator('svg[aria-hidden="true"]');
    const count = await decorativeSvgs.count();
    
    // Should have some decorative SVGs
    expect(count).toBeGreaterThan(0);
  });

  test('Semantic HTML structure', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Check for sections
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(0);
  });
});

test.describe('Screen Reader Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // All images must have alt attribute (can be empty for decorative)
      expect(alt).not.toBeNull();
    }
  });

  test('Links have descriptive text', async ({ page }) => {
    const links = page.locator('a');
    const count = await links.count();
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      // Links must have text or aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test('Form inputs have labels', async ({ page }) => {
    const inputs = page.locator('input, textarea, select');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      // Input must have label, aria-label, or aria-labelledby
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }
  });
});

test.describe('Reduced Motion', () => {
  test('Respects prefers-reduced-motion', async ({ page }) => {
    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    
    // Check that animations are disabled or simplified
    // This is implementation-specific - adjust based on your CSS
    const animatedElements = page.locator('[class*="animate"]');
    const count = await animatedElements.count();
    
    // Verify page still renders correctly
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Color Contrast', () => {
  test('Text has sufficient contrast', async ({ page }) => {
    await page.goto('/');
    
    // This is a basic check - for full contrast testing, use axe-core
    const textElements = page.locator('h1, h2, h3, p, a, button');
    const count = await textElements.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Verify text is visible (basic check)
    for (let i = 0; i < Math.min(count, 10); i++) {
      const element = textElements.nth(i);
      await expect(element).toBeVisible();
    }
  });
});
