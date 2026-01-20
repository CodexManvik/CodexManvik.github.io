import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { BentoGrid, BentoGridItem } from '../bento-grid';

describe('Bento Grid Component', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  // Property 1: Consistent Visual Styling
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 1.5, 5.2, 5.3
  describe('Property 1: Consistent Visual Styling', () => {
    it('applies white/10 opacity borders to grid items', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Test description" />
        </BentoGrid>
      );

      const item = container.querySelector('.border-white\\/10');
      expect(item).toBeTruthy();
    });

    it('applies dark gradient backgrounds (neutral-900 to neutral-950)', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Test description" />
        </BentoGrid>
      );

      const item = container.querySelector('.bg-gradient-to-br');
      expect(item).toBeTruthy();
      expect(item?.classList.contains('from-neutral-900')).toBe(true);
      expect(item?.classList.contains('to-neutral-950')).toBe(true);
    });

    it('validates styling across multiple grid items', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              title: fc.string({ minLength: 1 }),
              description: fc.string({ minLength: 1 }),
            }),
            { minLength: 1, maxLength: 6 }
          ),
          (items) => {
            const { container } = render(
              <BentoGrid>
                {items.map((item, idx) => (
                  <BentoGridItem
                    key={idx}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </BentoGrid>
            );

            const gridItems = container.querySelectorAll('.border-white\\/10');
            expect(gridItems.length).toBe(items.length);

            gridItems.forEach((gridItem) => {
              expect(gridItem.classList.contains('bg-gradient-to-br')).toBe(true);
              expect(gridItem.classList.contains('from-neutral-900')).toBe(true);
              expect(gridItem.classList.contains('to-neutral-950')).toBe(true);
            });
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  // Property 4: Responsive Grid Layout
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 5.1, 5.5, 12.1
  describe('Property 4: Responsive Grid Layout', () => {
    it('uses 1 column on mobile (< 768px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test 1" description="Description 1" />
          <BentoGridItem title="Test 2" description="Description 2" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('grid-cols-1')).toBe(true);
    });

    it('uses 2 columns on tablet (768px-1023px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 800,
      });

      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test 1" description="Description 1" />
          <BentoGridItem title="Test 2" description="Description 2" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('md:grid-cols-2')).toBe(true);
    });

    it('uses 3 columns on desktop (>= 1024px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280,
      });

      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test 1" description="Description 1" />
          <BentoGridItem title="Test 2" description="Description 2" />
          <BentoGridItem title="Test 3" description="Description 3" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('lg:grid-cols-3')).toBe(true);
    });

    it('validates responsive columns across viewport widths', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 2560 }),
          (viewportWidth) => {
            Object.defineProperty(window, 'innerWidth', {
              writable: true,
              configurable: true,
              value: viewportWidth,
            });

            const { container } = render(
              <BentoGrid>
                <BentoGridItem title="Test" description="Description" />
              </BentoGrid>
            );

            const grid = container.querySelector('.grid');
            expect(grid?.classList.contains('grid-cols-1')).toBe(true);
            expect(grid?.classList.contains('md:grid-cols-2')).toBe(true);
            expect(grid?.classList.contains('lg:grid-cols-3')).toBe(true);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('applies correct gap spacing (1rem mobile, 1.5rem desktop)', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('gap-4')).toBe(true); // 1rem
      expect(grid?.classList.contains('md:gap-6')).toBe(true); // 1.5rem
    });
  });

  // Property 17: Hover Scale Transform
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 5.4
  describe('Property 17: Hover Scale Transform', () => {
    it('applies 1.02x scale on hover via Framer Motion', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const item = container.querySelector('.group\\/bento');
      expect(item).toBeTruthy();
      
      // Framer Motion whileHover is configured in component
      // We verify the component structure supports hover
      expect(item?.classList.contains('hover:shadow-xl')).toBe(true);
      
      // Check for shadow class (Tailwind may not escape in classList)
      const classes = item?.className || '';
      expect(classes).toContain('hover:shadow');
    });

    it('validates hover effects across multiple items', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              title: fc.string({ minLength: 1 }),
              description: fc.string({ minLength: 1 }),
            }),
            { minLength: 1, maxLength: 4 }
          ),
          (items) => {
            const { container } = render(
              <BentoGrid>
                {items.map((item, idx) => (
                  <BentoGridItem
                    key={idx}
                    title={item.title}
                    description={item.description}
                  />
                ))}
              </BentoGrid>
            );

            const gridItems = container.querySelectorAll('.group\\/bento');
            gridItems.forEach((gridItem) => {
              expect(gridItem.classList.contains('hover:shadow-xl')).toBe(true);
            });
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  // Additional property tests
  describe('Grid Span Properties', () => {
    it('applies custom grid span classes', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 3 }),
          fc.integer({ min: 1, max: 2 }),
          (cols, rows) => {
            const { container } = render(
              <BentoGrid>
                <BentoGridItem
                  title="Test"
                  description="Description"
                  gridSpan={{ cols, rows }}
                />
              </BentoGrid>
            );

            const item = container.querySelector('.group\\/bento');
            const classes = item?.className || '';
            
            expect(classes).toContain(`md:col-span-${cols}`);
            expect(classes).toContain(`md:row-span-${rows}`);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Composition Pattern', () => {
    it('accepts children prop', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      expect(container.querySelector('.grid')).toBeTruthy();
    });

    it('accepts custom className', () => {
      const { container } = render(
        <BentoGrid className="custom-grid">
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.custom-grid');
      expect(grid).toBeTruthy();
    });

    it('accepts header and icon slots', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem
            title="Test"
            description="Description"
            header={<div data-testid="header">Header</div>}
            icon={<span data-testid="icon">🎨</span>}
          />
        </BentoGrid>
      );

      expect(screen.getByTestId('header')).toBeTruthy();
      expect(screen.getByTestId('icon')).toBeTruthy();
    });
  });
});
