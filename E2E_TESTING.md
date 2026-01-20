# E2E Testing & Performance Audits

## Overview

This project includes comprehensive end-to-end testing with Playwright and performance auditing with Lighthouse.

## Test Suites

### 1. Visual Regression Tests (`e2e/visual-regression.spec.ts`)
- Desktop, mobile, and tablet screenshots
- Hover state captures
- Animation state testing
- Full page screenshots

### 2. Accessibility Tests (`e2e/accessibility.spec.ts`)
- Keyboard navigation
- ARIA attributes validation
- Screen reader compatibility
- Focus management
- Reduced motion support
- Color contrast checks

### 3. Performance Tests (`e2e/performance.spec.ts`)
- First Contentful Paint (FCP < 1.5s)
- Time to Interactive (TTI < 3.5s)
- Animation frame rate (≥60fps)
- Resource loading efficiency
- Memory leak detection
- Cumulative Layout Shift (CLS < 0.1)

## Setup

### Install Playwright Browsers
```bash
npx playwright install
```

This downloads Chromium, Firefox, and WebKit browsers for testing.

## Running Tests

### Run All E2E Tests
```bash
npm run test:e2e
```

### Run Tests with UI Mode (Interactive)
```bash
npm run test:e2e:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:e2e:headed
```

### Run Specific Test File
```bash
npx playwright test e2e/visual-regression.spec.ts
```

### Run Tests on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=mobile
npx playwright test --project=tablet
```

### Debug Tests
```bash
npx playwright test --debug
```

## Lighthouse Performance Audits

### Prerequisites
Install Lighthouse globally:
```bash
npm install -g lighthouse @lhci/cli
```

### Run Lighthouse Audit

1. **Start the dev server:**
```bash
npm run dev
```

2. **In a new terminal, run Lighthouse:**
```bash
npm run test:lighthouse
```

Or run manually:
```bash
lighthouse http://localhost:3000 --view
```

### Lighthouse CI (Multiple Runs)
```bash
lhci autorun
```

This runs 3 audits and averages the results for more reliable metrics.

## Performance Targets

### Lighthouse Scores (Target: ≥90)
- ✅ Performance: ≥90
- ✅ Accessibility: ≥90
- ✅ Best Practices: ≥90
- ✅ SEO: ≥90

### Core Web Vitals
- ✅ First Contentful Paint (FCP): < 1.5s
- ✅ Time to Interactive (TTI): < 3.5s
- ✅ Cumulative Layout Shift (CLS): < 0.1
- ✅ Largest Contentful Paint (LCP): < 2.5s
- ✅ Total Blocking Time (TBT): < 300ms

## Test Reports

### Playwright Reports
After running tests, view the HTML report:
```bash
npx playwright show-report
```

Reports are generated in `playwright-report/` directory.

### Lighthouse Reports
Reports are saved in `lighthouse-reports/` directory with timestamps:
- HTML reports: `lighthouse-YYYY-MM-DD.html`
- JSON reports: `lighthouse-YYYY-MM-DD.json`

## Screenshots

Visual regression screenshots are saved in `e2e/screenshots/`:
- `hero-desktop.png`
- `hero-mobile.png`
- `projects-desktop.png`
- `projects-mobile.png`
- `full-page-desktop.png`
- `full-page-mobile.png`
- `full-page-tablet.png`
- `project-card-hover.png`
- `cta-button-hover.png`
- `spotlight-initial.png`
- `spotlight-moved.png`
- `marquee-animated.png`

## CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run start &
      - run: npx wait-on http://localhost:3000
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Lighthouse CI Example
```yaml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run start &
      - run: npx wait-on http://localhost:3000
      - run: npm install -g @lhci/cli
      - run: lhci autorun
```

## Troubleshooting

### Tests Fail with "Target Closed"
- Ensure dev server is running: `npm run dev`
- Increase timeout in `playwright.config.ts`

### Lighthouse Fails to Connect
- Verify server is running on port 3000
- Check firewall settings
- Try running with `--chrome-flags="--no-sandbox"`

### Screenshots Don't Match
- Ensure consistent viewport sizes
- Wait for animations to complete
- Use `await page.waitForTimeout()` for dynamic content

### Performance Scores Vary
- Run multiple times and average results
- Close other applications to reduce system load
- Use Lighthouse CI for consistent results
- Test on production build, not dev server

## Best Practices

1. **Run tests before deployment**
   ```bash
   npm run test:all
   ```

2. **Test on production build**
   ```bash
   npm run build
   npm run start
   npm run test:e2e
   ```

3. **Monitor performance over time**
   - Track Lighthouse scores in CI/CD
   - Set up performance budgets
   - Alert on regressions

4. **Update screenshots when design changes**
   - Review visual diffs carefully
   - Update baseline screenshots
   - Document intentional changes

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
