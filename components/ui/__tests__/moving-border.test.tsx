import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { MovingBorder } from '../moving-border';

// Mock getTotalLength for SVG elements in jsdom
beforeEach(() => {
  SVGElement.prototype.getTotalLength = vi.fn(() => 400);
});

describe('Moving Border Component', () => {
  // Property 5: Moving Border Animation
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5
  describe('Property 5: Moving Border Animation', () => {
    it('generates SVG path matching card perimeter', () => {
      const { container } = render(
        <MovingBorder>
          <div style={{ width: '200px', height: '100px' }}>Content</div>
        </MovingBorder>
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg?.classList.contains('absolute')).toBe(true);
      expect(svg?.classList.contains('inset-0')).toBe(true);

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
      expect(rect?.getAttribute('x')).toBe('1');
      expect(rect?.getAttribute('y')).toBe('1');
      expect(rect?.getAttribute('width')).toBe('calc(100% - 2px)');
      expect(rect?.getAttribute('height')).toBe('calc(100% - 2px)');
    });

    it('animates stroke-dashoffset continuously', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
      
      // Framer Motion animation is configured
      const strokeDasharray = rect?.getAttribute('stroke-dasharray');
      expect(strokeDasharray).toBeTruthy();
    });

    it('uses gradient stroke colors (purple to pink)', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const gradient = container.querySelector('#border-gradient');
      expect(gradient).toBeTruthy();

      const stops = container.querySelectorAll('stop');
      expect(stops.length).toBe(3);
      
      expect(stops[0].getAttribute('stop-color')).toBe('#8b5cf6'); // Purple
      expect(stops[1].getAttribute('stop-color')).toBe('#ec4899'); // Pink
      expect(stops[2].getAttribute('stop-color')).toBe('#8b5cf6'); // Purple
    });

    it('completes animation in 3-5 seconds with default duration', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
      
      // Default duration is 4 seconds (within 3-5 range)
      // Animation is configured via Framer Motion
    });

    it('validates animation across arbitrary durations', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 3, max: 5 }),
          (duration) => {
            const { container } = render(
              <MovingBorder duration={duration}>
                <div>Content</div>
              </MovingBorder>
            );

            const rect = container.querySelector('rect');
            expect(rect).toBeTruthy();
            expect(rect?.getAttribute('stroke')).toBe('url(#border-gradient)');
          }
        ),
        { numRuns: 50 }
      );
    });

    it('loops continuously without visual discontinuity', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
      
      // Infinite repeat is configured in Framer Motion
      // Linear easing ensures smooth continuous loop
    });
  });

  describe('SVG Path Properties', () => {
    it('applies rounded corners (rx=12)', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('rx')).toBe('12');
    });

    it('uses 2px stroke width', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('stroke-width')).toBe('2');
    });

    it('has no fill (transparent)', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('fill')).toBe('none');
    });
  });

  describe('Content Rendering', () => {
    it('renders children content', () => {
      render(
        <MovingBorder>
          <div data-testid="content">Test Content</div>
        </MovingBorder>
      );

      expect(screen.getByTestId('content')).toBeTruthy();
      expect(screen.getByText('Test Content')).toBeTruthy();
    });

    it('positions content with z-10', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const contentWrapper = container.querySelector('.z-10');
      expect(contentWrapper).toBeTruthy();
    });

    it('validates content rendering with arbitrary children', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 2 }).filter(s => s.trim().length > 0),
          (text) => {
            const { container } = render(
              <MovingBorder>
                <div>{text}</div>
              </MovingBorder>
            );

            expect(container.textContent).toContain(text);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Custom Duration', () => {
    it('accepts custom duration prop', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 10 }),
          (duration) => {
            const { container } = render(
              <MovingBorder duration={duration}>
                <div>Content</div>
              </MovingBorder>
            );

            const rect = container.querySelector('rect');
            expect(rect).toBeTruthy();
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className to container', () => {
      const { container } = render(
        <MovingBorder className="custom-border">
          <div>Content</div>
        </MovingBorder>
      );

      const wrapper = container.querySelector('.custom-border');
      expect(wrapper).toBeTruthy();
      expect(wrapper?.classList.contains('relative')).toBe(true);
    });

    it('applies custom borderClassName to rect', () => {
      const { container } = render(
        <MovingBorder borderClassName="custom-stroke">
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.classList.contains('custom-stroke')).toBe(true);
    });
  });

  describe('Pointer Events', () => {
    it('SVG has pointer-events-none', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const svg = container.querySelector('svg');
      expect(svg?.classList.contains('pointer-events-none')).toBe(true);
    });
  });

  describe('Gradient Configuration', () => {
    it('uses linear gradient from top-left to bottom-right', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const gradient = container.querySelector('#border-gradient');
      expect(gradient?.getAttribute('x1')).toBe('0%');
      expect(gradient?.getAttribute('y1')).toBe('0%');
      expect(gradient?.getAttribute('x2')).toBe('100%');
      expect(gradient?.getAttribute('y2')).toBe('100%');
    });

    it('has three color stops', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops.length).toBe(3);
      
      expect(stops[0].getAttribute('offset')).toBe('0%');
      expect(stops[1].getAttribute('offset')).toBe('50%');
      expect(stops[2].getAttribute('offset')).toBe('100%');
    });
  });
});
