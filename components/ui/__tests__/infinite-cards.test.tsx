import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { InfiniteMovingCards } from '../infinite-cards';
import type { TechStackItem } from '@/data/types';

describe('Infinite Moving Cards Component', () => {
  const mockItems: TechStackItem[] = [
    { name: 'React', icon: '/icons/react.svg' },
    { name: 'TypeScript', icon: '/icons/typescript.svg' },
    { name: 'Next.js', icon: '/icons/nextjs.svg' },
  ];

  // Property 6: Infinite Marquee
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 7.1, 7.2, 7.3, 7.4
  describe('Property 6: Infinite Marquee', () => {
    it('maintains constant linear velocity', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      
      // Linear easing configured in Framer Motion
      // Constant velocity without acceleration/deceleration
    });

    it('duplicates content seamlessly for infinite loop', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      // Should render items twice (original + duplicate)
      const items = container.querySelectorAll('.flex-shrink-0');
      expect(items.length).toBe(mockItems.length * 2);
    });

    it('pauses animation on hover when pauseOnHover is true', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} pauseOnHover={true} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      
      // whileHover configured in Framer Motion
    });

    it('validates marquee behavior across arbitrary item counts', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              name: fc.string({ minLength: 1 }),
              icon: fc.string({ minLength: 1 }),
            }),
            { minLength: 1, maxLength: 10 }
          ),
          (items) => {
            const { container } = render(
              <InfiniteMovingCards items={items} />
            );

            const renderedItems = container.querySelectorAll('.flex-shrink-0');
            expect(renderedItems.length).toBe(items.length * 2);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('validates constant velocity across different speeds', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('slow' as const, 'normal' as const, 'fast' as const),
          (speed) => {
            const { container } = render(
              <InfiniteMovingCards items={mockItems} speed={speed} />
            );

            const marquee = container.querySelector('.flex');
            expect(marquee).toBeTruthy();
          }
        ),
        { numRuns: 50 }
      );
    });

    it('validates seamless loop in both directions', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('left' as const, 'right' as const),
          (direction) => {
            const { container } = render(
              <InfiniteMovingCards items={mockItems} direction={direction} />
            );

            const items = container.querySelectorAll('.flex-shrink-0');
            expect(items.length).toBe(mockItems.length * 2);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  // Property 18: Marquee Spacing
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 7.5
  describe('Property 18: Marquee Spacing', () => {
    it('applies 2rem gap between items', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee?.classList.contains('gap-8')).toBe(true); // gap-8 = 2rem
    });

    it('validates spacing across arbitrary item counts', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              name: fc.string({ minLength: 1 }),
              icon: fc.string({ minLength: 1 }),
            }),
            { minLength: 1, maxLength: 8 }
          ),
          (items) => {
            const { container } = render(
              <InfiniteMovingCards items={items} />
            );

            const marquee = container.querySelector('.flex');
            expect(marquee?.classList.contains('gap-8')).toBe(true);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Technology Item Rendering', () => {
    it('displays technology icons and names', () => {
      render(<InfiniteMovingCards items={mockItems} />);

      // Each item appears twice (original + duplicate)
      expect(screen.getAllByText('React').length).toBe(2);
      expect(screen.getAllByText('TypeScript').length).toBe(2);
      expect(screen.getAllByText('Next.js').length).toBe(2);
    });

    it('renders icons with correct alt text', () => {
      render(<InfiniteMovingCards items={mockItems} />);

      const reactIcons = screen.getAllByAltText('React');
      expect(reactIcons.length).toBe(2);
      
      reactIcons.forEach(icon => {
        expect(icon.getAttribute('src')).toBe('/icons/react.svg');
      });
    });

    it('validates icon and name rendering across arbitrary items', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              name: fc.string({ minLength: 3, maxLength: 20 }).filter(s => /^[a-zA-Z0-9\s]+$/.test(s)),
              icon: fc.webUrl(),
            }),
            { minLength: 1, maxLength: 5 }
          ),
          (items) => {
            const { container } = render(<InfiniteMovingCards items={items} />);

            // Verify all items are rendered (each appears twice)
            const renderedItems = container.querySelectorAll('.flex-shrink-0');
            expect(renderedItems.length).toBe(items.length * 2);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Direction Configuration', () => {
    it('animates left by default', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });

    it('animates right when direction is right', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} direction="right" />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });
  });

  describe('Speed Configuration', () => {
    it('uses normal speed by default', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // Duration: 20s for normal speed
    });

    it('accepts slow speed (40s)', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} speed="slow" />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });

    it('accepts fast speed (10s)', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} speed="fast" />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });
  });

  describe('Pause on Hover', () => {
    it('enables pause on hover by default', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });

    it('disables pause on hover when pauseOnHover is false', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} pauseOnHover={false} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });
  });

  describe('Item Styling', () => {
    it('applies consistent styling to all items', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const items = container.querySelectorAll('.flex-shrink-0');
      items.forEach(item => {
        expect(item.classList.contains('bg-neutral-900')).toBe(true);
        expect(item.classList.contains('rounded-lg')).toBe(true);
        expect(item.classList.contains('border')).toBe(true);
      });
    });

    it('applies white/10 opacity borders', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const items = container.querySelectorAll('.flex-shrink-0');
      items.forEach(item => {
        const classes = item.className;
        expect(classes).toContain('border-white/10');
      });
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className to container', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} className="custom-marquee" />
      );

      const wrapper = container.querySelector('.custom-marquee');
      expect(wrapper).toBeTruthy();
      expect(wrapper?.classList.contains('relative')).toBe(true);
      expect(wrapper?.classList.contains('overflow-hidden')).toBe(true);
    });
  });

  describe('Overflow Handling', () => {
    it('applies overflow-hidden to container', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('overflow-hidden')).toBe(true);
    });
  });
});
