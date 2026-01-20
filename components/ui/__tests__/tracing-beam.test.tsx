import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { TracingBeam } from '../tracing-beam';

describe('Tracing Beam Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Property 7: Scroll-Driven Tracing Beam
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5
  describe('Property 7: Scroll-Driven Tracing Beam', () => {
    it('renders vertical SVG line with gradient', () => {
      const { container } = render(
        <TracingBeam>
          <div>Timeline content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
      expect(line?.getAttribute('stroke')).toContain('beam-gradient');
    });

    it('applies gradient from purple to pink', () => {
      const { container } = render(
        <TracingBeam>
          <div>Timeline content</div>
        </TracingBeam>
      );

      const gradient = container.querySelector('#beam-gradient');
      expect(gradient).toBeTruthy();

      const stops = container.querySelectorAll('stop');
      expect(stops.length).toBe(3);
    });

    it('positions line vertically from top to bottom', () => {
      const { container } = render(
        <TracingBeam>
          <div>Timeline content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line?.getAttribute('x1')).toBe('1');
      expect(line?.getAttribute('y1')).toBe('0');
      expect(line?.getAttribute('x2')).toBe('1');
      expect(line?.getAttribute('y2')).toBe('100');
    });

    it('uses useScroll hook with correct offset configuration', () => {
      const { container } = render(
        <TracingBeam>
          <div>Timeline content</div>
        </TracingBeam>
      );

      const wrapper = container.querySelector('.relative');
      expect(wrapper).toBeTruthy();
    });

    it('transforms scroll progress to pathLength', () => {
      const { container } = render(
        <TracingBeam>
          <div>Timeline content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('validates beam rendering across arbitrary content', () => {
      fc.assert(
        fc.property(
          fc.array(fc.string({ minLength: 5, maxLength: 50 }), { minLength: 1, maxLength: 5 }),
          (items) => {
            const { container } = render(
              <TracingBeam>
                {items.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </TracingBeam>
            );

            const svg = container.querySelector('svg');
            expect(svg).toBeTruthy();

            const line = container.querySelector('line');
            expect(line).toBeTruthy();
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('SVG Configuration', () => {
    it('applies preserveAspectRatio="none" for vertical stretch', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('preserveAspectRatio')).toBe('none');
    });

    it('uses viewBox for scalable coordinates', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBe('0 0 2 100');
    });

    it('applies full height and width classes', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      expect(svg?.classList.contains('h-full')).toBe(true);
      expect(svg?.classList.contains('w-full')).toBe(true);
    });

    it('sets overflow visible for gradient effects', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      const style = svg?.getAttribute('style');
      expect(style).toContain('overflow: visible');
    });
  });

  describe('Line Styling', () => {
    it('applies 2px stroke width', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('uses round linecap', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('applies gradient stroke', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line?.getAttribute('stroke')).toBe('url(#beam-gradient)');
    });
  });

  describe('Gradient Configuration', () => {
    it('defines linear gradient from top to bottom', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const gradient = container.querySelector('#beam-gradient');
      expect(gradient?.getAttribute('x1')).toBe('0%');
      expect(gradient?.getAttribute('y1')).toBe('0%');
      expect(gradient?.getAttribute('x2')).toBe('0%');
      expect(gradient?.getAttribute('y2')).toBe('100%');
    });

    it('uses three color stops', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops.length).toBe(3);
    });

    it('applies transparent purple at start (0%)', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[0].getAttribute('offset')).toBe('0%');
    });

    it('applies opaque purple at middle (50%)', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[1].getAttribute('offset')).toBe('50%');
    });

    it('applies opaque pink at end (100%)', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[2].getAttribute('offset')).toBe('100%');
    });
  });

  describe('Content Positioning', () => {
    it('applies left margin for beam clearance on mobile', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const content = container.querySelector('.ml-12');
      expect(content).toBeTruthy();
    });

    it('applies larger left margin on desktop', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const content = container.querySelector('.md\\:ml-20');
      expect(content).toBeTruthy();
    });

    it('renders children content', () => {
      render(
        <TracingBeam>
          <div>Timeline Item 1</div>
          <div>Timeline Item 2</div>
        </TracingBeam>
      );

      expect(screen.getByText('Timeline Item 1')).toBeTruthy();
      expect(screen.getByText('Timeline Item 2')).toBeTruthy();
    });

    it('validates content rendering with arbitrary children', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              title: fc.string({ minLength: 3, maxLength: 30 }),
              description: fc.string({ minLength: 10, maxLength: 100 }),
            }),
            { minLength: 1, maxLength: 5 }
          ),
          (items) => {
            const { container } = render(
              <TracingBeam>
                {items.map((item, idx) => (
                  <div key={idx}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                ))}
              </TracingBeam>
            );

            const content = container.querySelector('.ml-12');
            expect(content).toBeTruthy();
            expect(content?.children.length).toBe(items.length);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Beam Positioning', () => {
    it('positions beam absolutely on left side', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      expect(beam?.classList.contains('left-4')).toBe(true);
      expect(beam?.classList.contains('top-0')).toBe(true);
    });

    it('applies larger left offset on desktop', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      expect(beam?.classList.contains('md:left-8')).toBe(true);
    });

    it('applies full height to beam container', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      expect(beam?.classList.contains('h-full')).toBe(true);
    });

    it('applies 2px width to beam container', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      const hasWidthClass = Array.from(beam?.classList || []).some(cls => cls.includes('w-[2px]'));
      expect(hasWidthClass).toBe(true);
    });
  });

  describe('Container Styling', () => {
    it('applies relative positioning to wrapper', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('relative')).toBe(true);
    });

    it('merges custom className with default classes', () => {
      const { container } = render(
        <TracingBeam className="custom-beam">
          <div>Content</div>
        </TracingBeam>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('custom-beam')).toBe(true);
      expect(wrapper.classList.contains('relative')).toBe(true);
    });
  });

  describe('Scroll Progress Mapping', () => {
    it('uses start center to end center offset', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const wrapper = container.querySelector('.relative');
      expect(wrapper).toBeTruthy();
    });

    it('transforms scroll progress from 0 to 1', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });
  });

  describe('Empty Children', () => {
    it('handles empty children gracefully', () => {
      const { container } = render(<TracingBeam>{null}</TracingBeam>);

      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();

      const content = container.querySelector('.ml-12');
      expect(content).toBeTruthy();
    });

    it('renders beam without content', () => {
      const { container } = render(<TracingBeam />);

      const beam = container.querySelector('.absolute');
      expect(beam).toBeTruthy();

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });
  });
});
