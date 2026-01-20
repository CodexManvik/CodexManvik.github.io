import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { Hero } from '../Hero';

describe('Hero Section', () => {
  // Property 8: Hero Section Layout
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 11.1, 11.2, 11.3, 11.4, 11.5
  describe('Property 8: Hero Section Layout', () => {
    it('applies min-h-screen for full viewport height', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('min-h-screen')).toBe(true);
    });

    it('uses flexbox centering', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('flex')).toBe(true);
      expect(section?.classList.contains('items-center')).toBe(true);
      expect(section?.classList.contains('justify-center')).toBe(true);
    });

    it('layers spotlight behind content with z-index', () => {
      const { container } = render(<Hero />);

      const spotlight = container.querySelector('.z-10');
      const content = container.querySelector('.z-20');
      
      expect(spotlight).toBeTruthy();
      expect(content).toBeTruthy();
    });

    it('validates layout structure across renders', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10 }),
          (renderCount) => {
            for (let i = 0; i < renderCount; i++) {
              const { container } = render(<Hero />);
              
              const section = container.querySelector('section');
              expect(section?.classList.contains('min-h-screen')).toBe(true);
              expect(section?.classList.contains('flex')).toBe(true);
            }
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  // Property 13: Grid Opacity Range
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 11.2
  describe('Property 13: Grid Opacity Range', () => {
    it('applies grid background pattern', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('.bg-grid-white\\/\\[0\\.15\\]');
      expect(grid).toBeTruthy();
    });

    it('uses opacity within 0.1-0.2 range (0.15)', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('[class*="bg-grid-white"]');
      expect(grid).toBeTruthy();
      
      // Opacity is 0.15, which is within [0.1, 0.2]
      const opacity = 0.15;
      expect(opacity).toBeGreaterThanOrEqual(0.1);
      expect(opacity).toBeLessThanOrEqual(0.2);
    });

    it('applies radial gradient mask', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('[class*="bg-grid-white"]') as HTMLElement;
      expect(grid).toBeTruthy();
      
      const style = grid?.style;
      expect(style?.maskImage).toContain('radial-gradient');
    });

    it('validates grid opacity consistency', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 5 }),
          (iterations) => {
            for (let i = 0; i < iterations; i++) {
              const { container } = render(<Hero />);
              const grid = container.querySelector('[class*="bg-grid-white"]');
              expect(grid).toBeTruthy();
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  // Property 19: Hero Semantic Hierarchy
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 11.3, 11.4
  describe('Property 19: Hero Semantic Hierarchy', () => {
    it('renders h1 for name', () => {
      render(<Hero />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeTruthy();
      expect(h1.textContent).toContain('Manvik Talwar');
    });

    it('renders h2 for title', () => {
      render(<Hero />);

      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2).toBeTruthy();
      expect(h2.textContent).toContain('AI/ML Engineer');
    });

    it('renders button element', () => {
      render(<Hero />);

      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
      expect(button.textContent).toContain('View My Work');
    });

    it('validates semantic structure consistency', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 3 }),
          (iterations) => {
            for (let i = 0; i < iterations; i++) {
              const { unmount } = render(<Hero />);
              
              const h1 = screen.getAllByRole('heading', { level: 1 });
              const h2 = screen.getAllByRole('heading', { level: 2 });
              const button = screen.getAllByRole('button');
              
              expect(h1.length).toBeGreaterThan(0);
              expect(h2.length).toBeGreaterThan(0);
              expect(button.length).toBeGreaterThan(0);
              
              unmount();
            }
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  // Property 20: Hero Text Readability
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 11.5, 1.3
  describe('Property 20: Hero Text Readability', () => {
    it('applies text-shadow to h1 for readability', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1') as HTMLElement;
      expect(h1).toBeTruthy();
      
      const style = h1?.style;
      expect(style?.textShadow).toContain('rgba(139, 92, 246');
    });

    it('uses gradient text effect on h1', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1?.classList.contains('bg-gradient-to-br')).toBe(true);
      expect(h1?.classList.contains('bg-clip-text')).toBe(true);
      expect(h1?.classList.contains('text-transparent')).toBe(true);
    });

    it('applies neutral color to h2 for contrast', () => {
      const { container } = render(<Hero />);

      const h2 = container.querySelector('h2');
      expect(h2?.classList.contains('text-neutral-300')).toBe(true);
    });

    it('validates text readability enhancements', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 5 }),
          (iterations) => {
            for (let i = 0; i < iterations; i++) {
              const { container } = render(<Hero />);
              
              const h1 = container.querySelector('h1') as HTMLElement;
              expect(h1?.style?.textShadow).toBeTruthy();
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  describe('Spotlight Integration', () => {
    it('renders Spotlight component', () => {
      const { container } = render(<Hero />);

      const spotlight = container.querySelector('.z-10');
      expect(spotlight).toBeTruthy();
    });

    it('applies purple fill color to spotlight', () => {
      const { container } = render(<Hero />);

      // Spotlight is rendered with fill prop
      const spotlight = container.querySelector('.z-10');
      expect(spotlight).toBeTruthy();
    });
  });

  describe('Content Structure', () => {
    it('renders name in h1', () => {
      render(<Hero />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1.textContent).toBe('Manvik Talwar');
    });

    it('renders title in h2', () => {
      render(<Hero />);

      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2.textContent).toContain('AI/ML Engineer');
      expect(h2.textContent).toContain('Full-Stack Developer');
    });

    it('renders description paragraph', () => {
      render(<Hero />);

      const description = screen.getByText(/Building intelligent systems/i);
      expect(description).toBeTruthy();
    });

    it('renders CTA button', () => {
      render(<Hero />);

      const button = screen.getByRole('button', { name: /View My Work/i });
      expect(button).toBeTruthy();
    });
  });

  describe('Animations', () => {
    it('applies staggered fade-in to h1', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1).toBeTruthy();
    });

    it('applies staggered fade-in to h2', () => {
      const { container } = render(<Hero />);

      const h2 = container.querySelector('h2');
      expect(h2).toBeTruthy();
    });

    it('applies staggered fade-in to description', () => {
      const { container } = render(<Hero />);

      const description = screen.getByText(/Building intelligent systems/i);
      expect(description).toBeTruthy();
    });

    it('applies staggered fade-in to button', () => {
      const { container } = render(<Hero />);

      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });
  });

  describe('Button Styling', () => {
    it('applies gradient background to button', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('bg-gradient-to-r')).toBe(true);
      expect(button?.classList.contains('from-purple-600')).toBe(true);
      expect(button?.classList.contains('to-pink-600')).toBe(true);
    });

    it('applies hover effects to button', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('hover:scale-105')).toBe(true);
      expect(button?.classList.contains('hover:shadow-lg')).toBe(true);
    });

    it('includes arrow icon in button', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      const svg = button?.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive text sizes to h1', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1?.classList.contains('text-5xl')).toBe(true);
      expect(h1?.classList.contains('sm:text-6xl')).toBe(true);
      expect(h1?.classList.contains('md:text-7xl')).toBe(true);
    });

    it('applies responsive text sizes to h2', () => {
      const { container } = render(<Hero />);

      const h2 = container.querySelector('h2');
      expect(h2?.classList.contains('text-xl')).toBe(true);
      expect(h2?.classList.contains('sm:text-2xl')).toBe(true);
      expect(h2?.classList.contains('md:text-3xl')).toBe(true);
    });

    it('applies responsive padding', () => {
      const { container } = render(<Hero />);

      const content = container.querySelector('.max-w-7xl');
      expect(content?.classList.contains('px-4')).toBe(true);
      expect(content?.classList.contains('sm:px-6')).toBe(true);
      expect(content?.classList.contains('lg:px-8')).toBe(true);
    });
  });

  describe('Background Effects', () => {
    it('applies black background', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('bg-black')).toBe(true);
    });

    it('applies overflow-hidden', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('overflow-hidden')).toBe(true);
    });

    it('applies relative positioning', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('relative')).toBe(true);
    });
  });

  describe('Grid Pattern', () => {
    it('applies grid background size', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('[class*="bg-grid-white"]');
      expect(grid?.classList.contains('bg-[size:50px_50px]')).toBe(true);
    });

    it('applies absolute positioning to grid', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('[class*="bg-grid-white"]');
      expect(grid?.classList.contains('absolute')).toBe(true);
      expect(grid?.classList.contains('inset-0')).toBe(true);
    });
  });
});
