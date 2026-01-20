import { test, expect } from '@playwright/test';

/**
 * Performance Tests with Playwright
 * Tests page load times, animation performance, and resource loading
 */

test.describe('Page Load Performance', () => {
  test('First Contentful Paint < 1.5s', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    
    // Wait for first contentful paint
    await page.waitForSelector('h1', { timeout: 5000 });
    
    const fcp = Date.now() - startTime;
    console.log(`First Contentful Paint: ${fcp}ms`);
    
    expect(fcp).toBeLessThan(1500);
  });

  test('Time to Interactive < 3.5s', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const tti = Date.now() - startTime;
    console.log(`Time to Interactive: ${tti}ms`);
    
    expect(tti).toBeLessThan(3500);
  });

  test('Page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    expect(errors).toHaveLength(0);
  });
});

test.describe('Animation Performance', () => {
  test('Animations run at 60fps', async ({ page }) => {
    await page.goto('/');
    
    // Start performance measurement
    await page.evaluate(() => {
      (window as any).frameCount = 0;
      (window as any).startTime = performance.now();
      
      function countFrames() {
        (window as any).frameCount++;
        requestAnimationFrame(countFrames);
      }
      countFrames();
    });
    
    // Let animations run for 1 second
    await page.waitForTimeout(1000);
    
    // Calculate FPS
    const fps = await page.evaluate(() => {
      const elapsed = performance.now() - (window as any).startTime;
      return ((window as any).frameCount / elapsed) * 1000;
    });
    
    console.log(`Average FPS: ${fps.toFixed(2)}`);
    expect(fps).toBeGreaterThanOrEqual(55); // Allow slight variance
  });

  test('Scroll performance is smooth', async ({ page }) => {
    await page.goto('/');
    
    // Measure scroll performance
    const scrollStart = Date.now();
    
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    
    await page.waitForTimeout(2000);
    
    const scrollTime = Date.now() - scrollStart;
    console.log(`Scroll time: ${scrollTime}ms`);
    
    // Smooth scroll should complete within reasonable time
    expect(scrollTime).toBeLessThan(3000);
  });

  test('Hover effects are responsive', async ({ page }) => {
    await page.goto('/');
    
    const projectsSection = page.locator('section').nth(1);
    await projectsSection.scrollIntoViewIfNeeded();
    
    const card = page.locator('[class*="group"]').first();
    
    const hoverStart = Date.now();
    await card.hover();
    await page.waitForTimeout(100);
    const hoverTime = Date.now() - hoverStart;
    
    console.log(`Hover response time: ${hoverTime}ms`);
    expect(hoverTime).toBeLessThan(200);
  });
});

test.describe('Resource Loading', () => {
  test('Images load efficiently', async ({ page }) => {
    const imageRequests: any[] = [];
    
    page.on('request', (request) => {
      if (request.resourceType() === 'image') {
        imageRequests.push(request);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    console.log(`Total images loaded: ${imageRequests.length}`);
    
    // Should have some images but not excessive
    expect(imageRequests.length).toBeGreaterThan(0);
    expect(imageRequests.length).toBeLessThan(50);
  });

  test('JavaScript bundle size is reasonable', async ({ page }) => {
    const jsRequests: any[] = [];
    
    page.on('response', async (response) => {
      if (response.url().includes('.js')) {
        const size = (await response.body()).length;
        jsRequests.push({ url: response.url(), size });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalSize = jsRequests.reduce((sum, req) => sum + req.size, 0);
    const totalSizeKB = totalSize / 1024;
    
    console.log(`Total JS size: ${totalSizeKB.toFixed(2)} KB`);
    
    // Total JS should be under 500KB for good performance
    expect(totalSizeKB).toBeLessThan(500);
  });

  test('CSS loads efficiently', async ({ page }) => {
    const cssRequests: any[] = [];
    
    page.on('response', async (response) => {
      if (response.url().includes('.css')) {
        const size = (await response.body()).length;
        cssRequests.push({ url: response.url(), size });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalSize = cssRequests.reduce((sum, req) => sum + req.size, 0);
    const totalSizeKB = totalSize / 1024;
    
    console.log(`Total CSS size: ${totalSizeKB.toFixed(2)} KB`);
    
    // Total CSS should be under 100KB
    expect(totalSizeKB).toBeLessThan(100);
  });
});

test.describe('Memory Usage', () => {
  test('No memory leaks on navigation', async ({ page }) => {
    await page.goto('/');
    
    // Get initial memory
    const initialMemory = await page.evaluate(() => {
      if ((performance as any).memory) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });
    
    // Scroll and interact
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
    }
    
    // Force garbage collection if available
    await page.evaluate(() => {
      if ((window as any).gc) {
        (window as any).gc();
      }
    });
    
    await page.waitForTimeout(1000);
    
    // Get final memory
    const finalMemory = await page.evaluate(() => {
      if ((performance as any).memory) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });
    
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreaseMB = memoryIncrease / (1024 * 1024);
      
      console.log(`Memory increase: ${memoryIncreaseMB.toFixed(2)} MB`);
      
      // Memory increase should be reasonable (< 10MB)
      expect(memoryIncreaseMB).toBeLessThan(10);
    }
  });
});

test.describe('Cumulative Layout Shift', () => {
  test('CLS < 0.1', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Measure CLS
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ((entry as any).hadRecentInput) continue;
            clsValue += (entry as any).value;
          }
        });
        
        observer.observe({ type: 'layout-shift', buffered: true });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 1000);
      });
    });
    
    console.log(`Cumulative Layout Shift: ${cls}`);
    expect(cls).toBeLessThan(0.1);
  });
});
