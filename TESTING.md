# Testing Guide

## Test Coverage

This project has comprehensive test coverage across multiple dimensions:

### Unit Tests
- **UI Components**: 464+ tests for Spotlight, BentoGrid, MovingBorder, InfiniteMovingCards, TracingBeam
- **Section Components**: Tests for Hero, ProjectsGrid, ExperienceTimeline, TechStackMarquee
- **Data Validation**: 18 tests for Zod schemas and error handling
- **Hooks**: Tests for useMediaQuery, useReducedMotion, usePerformanceMonitor

### Property-Based Tests
- Using fast-check for universal correctness properties
- 100+ property tests covering edge cases and invariants
- Tests for responsive behavior, performance, and accessibility

### Integration Tests
- 31 tests for complete page rendering
- Data flow verification
- Component integration testing
- Cross-breakpoint responsive testing

### Accessibility Tests
- 43 tests for WCAG compliance
- ARIA attributes verification
- Keyboard navigation testing
- Screen reader compatibility

### Performance Tests
- 13 tests for GPU acceleration
- Frame rate monitoring
- Animation performance validation

### E2E Tests (Playwright)
- 38 end-to-end tests across desktop, mobile, and tablet
- Visual regression testing with screenshots
- Accessibility testing with keyboard navigation
- Performance testing with real browser metrics

## Running Tests

### Unit & Integration Tests (Vitest)
```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test.tsx

# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage
```

### E2E Tests (Playwright)
```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test e2e/visual-regression.spec.ts

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=mobile
npx playwright test --project=tablet

# Debug tests
npx playwright test --debug
```

### All Tests
```bash
# Run unit tests + E2E tests
npm run test:all
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

## Visual Regression Testing (Manual)

For visual regression testing, follow these steps:

1. **Install Playwright** (if not already installed):
   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```

2. **Create Playwright config** (`playwright.config.ts`):
   ```typescript
   import { defineConfig } from '@playwright/test';

   export default defineConfig({
     testDir: './e2e',
     use: {
       baseURL: 'http://localhost:3000',
       screenshot: 'only-on-failure',
     },
     webServer: {
       command: 'npm run dev',
       port: 3000,
     },
   });
   ```

3. **Create visual tests** in `e2e/` directory

4. **Run visual tests**:
   ```bash
   npx playwright test
   ```

## Performance Audit (Manual)

For performance auditing, use Lighthouse:

1. **Build the production version**:
   ```bash
   npm run build
   npm run start
   ```

2. **Run Lighthouse**:
   - Open Chrome DevTools
   - Navigate to Lighthouse tab
   - Run audit for Performance, Accessibility, Best Practices, SEO

3. **Target Metrics**:
   - Performance Score: ≥ 90
   - First Contentful Paint: < 1.5s
   - Time to Interactive: < 3.5s
   - Cumulative Layout Shift: < 0.1

## Accessibility Audit

### Automated Testing
```bash
# Run accessibility tests
npm test -- lib/__tests__/accessibility
```

### Manual Testing with Screen Readers

1. **NVDA (Windows)**:
   - Download from https://www.nvaccess.org/
   - Navigate through the site using Tab and arrow keys
   - Verify all content is announced correctly

2. **JAWS (Windows)**:
   - Test keyboard navigation
   - Verify ARIA labels are read correctly

3. **VoiceOver (macOS)**:
   - Enable with Cmd+F5
   - Navigate with VO+arrow keys
   - Test all interactive elements

### Keyboard Navigation Testing

1. Test Tab navigation through all interactive elements
2. Verify focus indicators are visible
3. Test Enter/Space on buttons
4. Verify skip links work correctly

### Color Contrast Testing

Use browser extensions:
- WAVE (Web Accessibility Evaluation Tool)
- axe DevTools
- Lighthouse Accessibility audit

## Test Organization

```
├── components/
│   ├── ui/__tests__/           # UI component tests
│   └── sections/__tests__/     # Section component tests
├── lib/__tests__/              # Utility and hook tests
├── app/__tests__/              # Page-level tests
└── data/__tests__/             # Data validation tests
```

## Continuous Integration

For CI/CD pipelines, add:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
```

## Test Maintenance

- Keep tests close to the code they test
- Update tests when requirements change
- Maintain high test coverage (>80%)
- Review failing tests promptly
- Add tests for bug fixes
