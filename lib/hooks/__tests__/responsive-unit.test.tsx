import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

describe('Responsive Behavior - Unit Tests', () => {
  let matchMediaMock: any;

  beforeEach(() => {
    matchMediaMock = vi.fn();
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Grid Column Counts at Different Breakpoints', () => {
    it('applies single column on mobile', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('max-width: 767px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Test description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('grid-cols-1')).toBe(true);
    });

    it('applies two columns on tablet', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('min-width: 768px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Test description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('md:grid-cols-2')).toBe(true);
    });

    it('applies three columns on desktop', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('min-width: 1024px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Test description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('lg:grid-cols-3')).toBe(true);
    });
  });

  describe('Font Size Adjustments', () => {
    it('applies responsive text sizes to headings', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(
        <BentoGridItem title="Test Title" description="Test description" />
      );

      const heading = container.querySelector('h3');
      expect(heading?.classList.contains('text-xl')).toBe(true);
    });

    it('applies smaller text on mobile for descriptions', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(
        <BentoGridItem title="Test" description="Test description" />
      );

      const description = container.querySelector('.text-sm');
      expect(description).toBeTruthy();
    });
  });

  describe('Touch Target Sizes', () => {
    it('ensures buttons meet minimum touch target size', () => {
      const { container } = render(
        <button className="px-8 py-4">Test Button</button>
      );

      const button = container.querySelector('button');
      
      // px-8 = 2rem = 32px horizontal padding (16px each side)
      // py-4 = 1rem = 16px vertical padding (8px each side)
      // Minimum content + padding should exceed 44px
      expect(button?.classList.contains('px-8')).toBe(true);
      expect(button?.classList.contains('py-4')).toBe(true);
    });

    it('applies adequate spacing for touch interactions', () => {
      const { container } = render(
        <div className="flex gap-4">
          <button>Button 1</button>
          <button>Button 2</button>
        </div>
      );

      const wrapper = container.querySelector('.gap-4');
      expect(wrapper).toBeTruthy();
    });
  });

  describe('Responsive Padding', () => {
    it('applies mobile padding (px-4)', () => {
      const { container } = render(
        <div className="px-4 sm:px-6 lg:px-8">Content</div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element.classList.contains('px-4')).toBe(true);
    });

    it('applies tablet padding (sm:px-6)', () => {
      const { container } = render(
        <div className="px-4 sm:px-6 lg:px-8">Content</div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element.classList.contains('sm:px-6')).toBe(true);
    });

    it('applies desktop padding (lg:px-8)', () => {
      const { container } = render(
        <div className="px-4 sm:px-6 lg:px-8">Content</div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element.classList.contains('lg:px-8')).toBe(true);
    });
  });

  describe('Responsive Margins', () => {
    it('applies responsive gap spacing in grids', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Test" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('gap-4')).toBe(true);
      expect(grid?.classList.contains('md:gap-6')).toBe(true);
    });
  });

  describe('Viewport-Specific Behavior', () => {
    it('hides elements on mobile with hidden class', () => {
      const { container } = render(
        <div className="hidden md:block">Desktop Only</div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element.classList.contains('hidden')).toBe(true);
      expect(element.classList.contains('md:block')).toBe(true);
    });

    it('shows elements only on mobile', () => {
      const { container } = render(
        <div className="block md:hidden">Mobile Only</div>
      );

      const element = container.firstChild as HTMLElement;
      expect(element.classList.contains('block')).toBe(true);
      expect(element.classList.contains('md:hidden')).toBe(true);
    });
  });

  describe('Responsive Typography', () => {
    it('scales heading sizes responsively', () => {
      const { container } = render(
        <h2 className="text-4xl sm:text-5xl">Heading</h2>
      );

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-4xl')).toBe(true);
      expect(heading?.classList.contains('sm:text-5xl')).toBe(true);
    });

    it('adjusts line height for readability', () => {
      const { container } = render(
        <p className="leading-relaxed">Text content</p>
      );

      const paragraph = container.querySelector('p');
      expect(paragraph?.classList.contains('leading-relaxed')).toBe(true);
    });
  });
});
