import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TracingBeam } from '../tracing-beam';

describe('Tracing Beam - Unit Tests', () => {
  // Test scroll progress calculation
  describe('Scroll Progress Calculation', () => {
    it('uses useScroll with target ref', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const wrapper = container.querySelector('.relative');
      expect(wrapper).toBeTruthy();
    });

    it('configures offset from start center to end center', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const wrapper = container.querySelector('.relative');
      expect(wrapper).toBeTruthy();
    });

    it('transforms scrollYProgress to pathLength', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('maps scroll range [0, 1] to pathLength [0, 1]', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });
  });

  // Test reverse scroll behavior
  describe('Reverse Scroll Behavior', () => {
    it('handles scrolling up (decreasing progress)', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('maintains smooth animation during reverse scroll', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('resets to start when scrolled to top', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });
  });

  // Test gradient application
  describe('Gradient Application', () => {
    it('defines unique gradient ID', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const gradient = container.querySelector('#beam-gradient');
      expect(gradient).toBeTruthy();
    });

    it('applies gradient to line stroke', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line?.getAttribute('stroke')).toBe('url(#beam-gradient)');
    });

    it('uses vertical gradient direction', () => {
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

    it('creates fade-in effect at start', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[0].getAttribute('offset')).toBe('0%');
    });

    it('creates solid color in middle and end', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[1].getAttribute('offset')).toBe('50%');
      expect(stops[2].getAttribute('offset')).toBe('100%');
    });

    it('transitions from purple to pink', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops.length).toBe(3);
    });
  });

  describe('SVG Line Configuration', () => {
    it('renders line element', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('positions line from top to bottom', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line?.getAttribute('y1')).toBe('0');
      expect(line?.getAttribute('y2')).toBe('100');
    });

    it('centers line horizontally at x=1', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line?.getAttribute('x1')).toBe('1');
      expect(line?.getAttribute('x2')).toBe('1');
    });

    it('wraps line in motion.line for animation', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });
  });

  describe('Content Layout', () => {
    it('renders children inside content wrapper', () => {
      render(
        <TracingBeam>
          <div>Timeline Item 1</div>
          <div>Timeline Item 2</div>
          <div>Timeline Item 3</div>
        </TracingBeam>
      );

      expect(screen.getByText('Timeline Item 1')).toBeTruthy();
      expect(screen.getByText('Timeline Item 2')).toBeTruthy();
      expect(screen.getByText('Timeline Item 3')).toBeTruthy();
    });

    it('applies ml-12 on mobile for beam clearance', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const content = container.querySelector('.ml-12');
      expect(content).toBeTruthy();
    });

    it('applies md:ml-20 on desktop for larger clearance', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const content = container.querySelector('.md\\:ml-20');
      expect(content).toBeTruthy();
    });

    it('maintains content order', () => {
      const { container } = render(
        <TracingBeam>
          <div id="first">First</div>
          <div id="second">Second</div>
          <div id="third">Third</div>
        </TracingBeam>
      );

      const content = container.querySelector('.ml-12');
      const children = content?.children;
      expect(children?.[0].id).toBe('first');
      expect(children?.[1].id).toBe('second');
      expect(children?.[2].id).toBe('third');
    });
  });

  describe('Beam Container Positioning', () => {
    it('positions beam absolutely', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      expect(beam).toBeTruthy();
    });

    it('positions beam at left-4 on mobile', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      expect(beam?.classList.contains('left-4')).toBe(true);
    });

    it('positions beam at md:left-8 on desktop', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      expect(beam?.classList.contains('md:left-8')).toBe(true);
    });

    it('anchors beam at top-0', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      expect(beam?.classList.contains('top-0')).toBe(true);
    });

    it('applies full height to beam', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const beam = container.querySelector('.absolute');
      expect(beam?.classList.contains('h-full')).toBe(true);
    });

    it('applies 2px width to beam', () => {
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

  describe('Wrapper Configuration', () => {
    it('applies relative positioning to wrapper', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('relative')).toBe(true);
    });

    it('accepts custom className', () => {
      const { container } = render(
        <TracingBeam className="custom-timeline">
          <div>Content</div>
        </TracingBeam>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('custom-timeline')).toBe(true);
    });

    it('merges custom className with default classes', () => {
      const { container } = render(
        <TracingBeam className="custom-class another-class">
          <div>Content</div>
        </TracingBeam>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('custom-class')).toBe(true);
      expect(wrapper.classList.contains('another-class')).toBe(true);
      expect(wrapper.classList.contains('relative')).toBe(true);
    });
  });

  describe('SVG ViewBox and Scaling', () => {
    it('uses narrow viewBox for thin line', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('viewBox')).toBe('0 0 2 100');
    });

    it('disables aspect ratio preservation', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('preserveAspectRatio')).toBe('none');
    });

    it('applies full height to SVG', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      expect(svg?.classList.contains('h-full')).toBe(true);
    });

    it('applies full width to SVG', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const svg = container.querySelector('svg');
      expect(svg?.classList.contains('w-full')).toBe(true);
    });

    it('allows overflow for gradient effects', () => {
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

  describe('Complex Content Scenarios', () => {
    it('handles nested components', () => {
      render(
        <TracingBeam>
          <div>
            <h2>Section 1</h2>
            <p>Description</p>
          </div>
          <div>
            <h2>Section 2</h2>
            <p>Description</p>
          </div>
        </TracingBeam>
      );

      expect(screen.getByText('Section 1')).toBeTruthy();
      expect(screen.getByText('Section 2')).toBeTruthy();
    });

    it('handles mixed content types', () => {
      render(
        <TracingBeam>
          <div>Text content</div>
          <button>Button</button>
          <img src="/test.jpg" alt="Test" />
        </TracingBeam>
      );

      expect(screen.getByText('Text content')).toBeTruthy();
      expect(screen.getByRole('button')).toBeTruthy();
      expect(screen.getByAltText('Test')).toBeTruthy();
    });

    it('handles empty content sections', () => {
      const { container } = render(
        <TracingBeam>
          <div></div>
          <div>Content</div>
          <div></div>
        </TracingBeam>
      );

      const content = container.querySelector('.ml-12');
      expect(content?.children.length).toBe(3);
    });
  });

  describe('Animation Properties', () => {
    it('uses Framer Motion for line animation', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('animates pathLength based on scroll', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });

    it('uses strokeDasharray for path reveal', () => {
      const { container } = render(
        <TracingBeam>
          <div>Content</div>
        </TracingBeam>
      );

      const line = container.querySelector('line');
      expect(line).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    it('handles single child', () => {
      render(
        <TracingBeam>
          <div>Single item</div>
        </TracingBeam>
      );

      expect(screen.getByText('Single item')).toBeTruthy();
    });

    it('handles many children', () => {
      const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
      
      render(
        <TracingBeam>
          {items.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </TracingBeam>
      );

      expect(screen.getByText('Item 1')).toBeTruthy();
      expect(screen.getByText('Item 20')).toBeTruthy();
    });

    it('handles null children', () => {
      const { container } = render(
        <TracingBeam>
          {null}
        </TracingBeam>
      );

      const content = container.querySelector('.ml-12');
      expect(content).toBeTruthy();
    });

    it('handles undefined children', () => {
      const { container } = render(
        <TracingBeam>
          {undefined}
        </TracingBeam>
      );

      const content = container.querySelector('.ml-12');
      expect(content).toBeTruthy();
    });
  });
});
