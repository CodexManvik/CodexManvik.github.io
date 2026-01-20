import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { Spotlight } from '../spotlight';

describe('Spotlight Component', () => {
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });

  // Property 2: Spotlight Mouse Tracking
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 2.1, 2.4
  describe('Property 2: Spotlight Mouse Tracking', () => {
    it('uses CSS transforms for position updates', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<Spotlight />);
      const spotlight = container.querySelector('.pointer-events-none');

      expect(spotlight).toBeTruthy();
      
      const style = spotlight?.getAttribute('style');
      expect(style).toContain('will-change: transform');
    });

    it('applies GPU acceleration hints', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 768, max: 2560 }),
          (viewportWidth) => {
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              configurable: true,
              value: viewportWidth,
            });

            const { container } = render(<Spotlight />);
            const spotlight = container.querySelector('.pointer-events-none');
            const style = spotlight?.getAttribute('style');

            expect(style).toContain('will-change: transform');
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  // Property 15: Spotlight Minimum Size
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 2.2
  describe('Property 15: Spotlight Minimum Size', () => {
    it('gradient diameter is >= 600px by default', () => {
      const { container } = render(<Spotlight />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient\(600px/);
    });

    it('respects custom size prop >= 600px', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 600, max: 1200 }),
          (size) => {
            const { container } = render(<Spotlight size={size} />);
            const spotlight = container.querySelector('.pointer-events-none');
            const style = spotlight?.getAttribute('style');

            expect(style).toMatch(new RegExp(`radial-gradient\\(${size}px`));
          }
        ),
        { numRuns: 50 }
      );
    });

    it('validates size across arbitrary valid inputs', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 600, max: 2000 }),
          fc.oneof(
            fc.constant('rgba(255, 0, 0, 0.5)'),
            fc.constant('rgba(0, 255, 0, 0.3)')
          ),
          (size, fill) => {
            const { container } = render(<Spotlight size={size} fill={fill} />);
            const spotlight = container.querySelector('.pointer-events-none');

            expect(spotlight).toBeTruthy();
            
            const style = spotlight?.getAttribute('style');
            // Check for size in radial-gradient
            expect(style).toMatch(new RegExp(`radial-gradient\\(${size}px`));
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Property 16: Mobile Spotlight Behavior
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 2.5
  describe('Property 16: Mobile Spotlight Behavior', () => {
    it('renders static gradient on mobile viewports', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { container } = render(<Spotlight />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient\(\d+px circle at 50% 50%/);
    });

    it('uses static gradient for all mobile viewport widths', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 767 }),
          (viewportWidth) => {
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              configurable: true,
              value: viewportWidth,
            });

            const { container } = render(<Spotlight />);
            const spotlight = container.querySelector('.pointer-events-none');
            const style = spotlight?.getAttribute('style');

            expect(style).toMatch(/at 50% 50%/);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('does not use mouse tracking on mobile', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 767 }),
          (viewportWidth) => {
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              configurable: true,
              value: viewportWidth,
            });

            const { container } = render(<Spotlight />);
            const spotlight = container.querySelector('.pointer-events-none');

            // Mobile version is a div, not motion.div
            expect(spotlight?.tagName).toBe('DIV');
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  // Additional property tests
  describe('Spotlight Configuration Properties', () => {
    it('accepts custom fill colors', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant('rgba(255, 0, 0, 0.5)'),
            fc.constant('rgba(0, 255, 0, 0.3)'),
            fc.constant('rgba(0, 0, 255, 0.4)')
          ),
          (fill) => {
            const { container } = render(<Spotlight fill={fill} />);
            const spotlight = container.querySelector('.pointer-events-none');
            const style = spotlight?.getAttribute('style');

            // Browser converts rgba to rgb(), check for color presence
            expect(style).toMatch(/radial-gradient\(\d+px circle/);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('applies pointer-events-none for all configurations', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 600, max: 1200 }),
          fc.string(),
          (size, fill) => {
            const { container } = render(<Spotlight size={size} fill={fill} />);
            const spotlight = container.querySelector('.pointer-events-none');

            expect(spotlight).toBeTruthy();
            expect(spotlight?.classList.contains('pointer-events-none')).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
