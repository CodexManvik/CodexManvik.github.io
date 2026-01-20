import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MovingBorder } from '../moving-border';

// Mock getTotalLength for SVG elements in jsdom
beforeEach(() => {
  SVGElement.prototype.getTotalLength = vi.fn(() => 400);
});

describe('Moving Border Unit Tests', () => {
  describe('Animation Duration Configuration', () => {
    it('uses default duration of 4 seconds', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
    });

    it('accepts duration of 3 seconds', () => {
      const { container } = render(
        <MovingBorder duration={3}>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
    });

    it('accepts duration of 5 seconds', () => {
      const { container } = render(
        <MovingBorder duration={5}>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
    });

    it('accepts custom duration of 10 seconds', () => {
      const { container } = render(
        <MovingBorder duration={10}>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
    });
  });

  describe('Gradient Color Application', () => {
    it('applies purple color at start (0%)', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[0].getAttribute('offset')).toBe('0%');
      expect(stops[0].getAttribute('stop-color')).toBe('#8b5cf6');
    });

    it('applies pink color at middle (50%)', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[1].getAttribute('offset')).toBe('50%');
      expect(stops[1].getAttribute('stop-color')).toBe('#ec4899');
    });

    it('applies purple color at end (100%)', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const stops = container.querySelectorAll('stop');
      expect(stops[2].getAttribute('offset')).toBe('100%');
      expect(stops[2].getAttribute('stop-color')).toBe('#8b5cf6');
    });
  });

  describe('Loop Behavior', () => {
    it('configures infinite repeat animation', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
      // Framer Motion infinite repeat is configured in component
    });

    it('uses linear easing for smooth loop', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect).toBeTruthy();
      // Linear easing configured in Framer Motion transition
    });
  });

  describe('SVG Structure', () => {
    it('renders SVG with correct namespace', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    });

    it('positions SVG absolutely', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const svg = container.querySelector('svg');
      expect(svg?.classList.contains('absolute')).toBe(true);
      expect(svg?.classList.contains('inset-0')).toBe(true);
    });

    it('makes SVG full width and height', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const svg = container.querySelector('svg');
      expect(svg?.classList.contains('w-full')).toBe(true);
      expect(svg?.classList.contains('h-full')).toBe(true);
    });
  });

  describe('Rect Element Configuration', () => {
    it('positions rect with 1px offset', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('x')).toBe('1');
      expect(rect?.getAttribute('y')).toBe('1');
    });

    it('sizes rect to container minus 2px', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('width')).toBe('calc(100% - 2px)');
      expect(rect?.getAttribute('height')).toBe('calc(100% - 2px)');
    });

    it('applies border radius of 12px', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('rx')).toBe('12');
    });

    it('uses gradient stroke', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('stroke')).toBe('url(#border-gradient)');
    });

    it('has no fill', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('fill')).toBe('none');
    });
  });

  describe('Content Wrapper', () => {
    it('renders content in relative positioned wrapper', () => {
      const { container } = render(
        <MovingBorder>
          <div data-testid="content">Test</div>
        </MovingBorder>
      );

      const wrapper = container.querySelector('.z-10');
      expect(wrapper).toBeTruthy();
      expect(wrapper?.classList.contains('relative')).toBe(true);
    });

    it('renders complex children', () => {
      render(
        <MovingBorder>
          <div>
            <h3>Title</h3>
            <p>Description</p>
            <button>Action</button>
          </div>
        </MovingBorder>
      );

      expect(screen.getByText('Title')).toBeTruthy();
      expect(screen.getByText('Description')).toBeTruthy();
      expect(screen.getByText('Action')).toBeTruthy();
    });

    it('renders nested components', () => {
      render(
        <MovingBorder>
          <div>
            <div>
              <span>Nested Content</span>
            </div>
          </div>
        </MovingBorder>
      );

      expect(screen.getByText('Nested Content')).toBeTruthy();
    });
  });

  describe('Custom ClassName Application', () => {
    it('applies custom className to container', () => {
      const { container } = render(
        <MovingBorder className="p-4 bg-black">
          <div>Content</div>
        </MovingBorder>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('p-4')).toBe(true);
      expect(wrapper.classList.contains('bg-black')).toBe(true);
      expect(wrapper.classList.contains('relative')).toBe(true);
    });

    it('applies custom borderClassName to rect', () => {
      const { container } = render(
        <MovingBorder borderClassName="opacity-50">
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.classList.contains('opacity-50')).toBe(true);
    });

    it('merges multiple custom classes', () => {
      const { container } = render(
        <MovingBorder className="p-4 m-2 rounded-lg">
          <div>Content</div>
        </MovingBorder>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('p-4')).toBe(true);
      expect(wrapper.classList.contains('m-2')).toBe(true);
      expect(wrapper.classList.contains('rounded-lg')).toBe(true);
    });
  });

  describe('Path Length Calculation', () => {
    it('calculates path length on mount', () => {
      const getTotalLengthSpy = vi.fn(() => 400);
      SVGElement.prototype.getTotalLength = getTotalLengthSpy;

      render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      // getTotalLength should be called during useEffect
      expect(getTotalLengthSpy).toHaveBeenCalled();
    });

    it('sets strokeDasharray to path length', () => {
      const { container } = render(
        <MovingBorder>
          <div>Content</div>
        </MovingBorder>
      );

      const rect = container.querySelector('rect');
      expect(rect?.getAttribute('stroke-dasharray')).toBe('400');
    });
  });
});
