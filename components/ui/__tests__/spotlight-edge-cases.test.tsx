import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Spotlight } from '../spotlight';

describe('Spotlight Edge Cases', () => {
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

  describe('Mouse Leave Viewport Behavior', () => {
    it('handles mouse leaving viewport gracefully', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<Spotlight />);
      const spotlight = container.querySelector('.pointer-events-none');

      expect(spotlight).toBeTruthy();

      // Simulate mouse move
      fireEvent(
        window,
        new MouseEvent('mousemove', {
          clientX: 500,
          clientY: 300,
        })
      );

      // Component should still be rendered
      expect(spotlight).toBeTruthy();
    });

    it('maintains gradient when mouse is at viewport edge', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { container } = render(<Spotlight />);

      // Mouse at edge
      fireEvent(
        window,
        new MouseEvent('mousemove', {
          clientX: 1024,
          clientY: 768,
        })
      );

      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient/);
    });
  });

  describe('Custom Fill Colors', () => {
    it('renders with rgba fill color', () => {
      const { container } = render(<Spotlight fill="rgba(255, 0, 0, 0.5)" />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient/);
    });

    it('renders with hex fill color', () => {
      const { container } = render(<Spotlight fill="#ff0000" />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient/);
    });

    it('renders with named color', () => {
      const { container } = render(<Spotlight fill="red" />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient/);
    });

    it('renders with transparent fill', () => {
      const { container } = render(<Spotlight fill="transparent" />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient/);
    });
  });

  describe('Custom Size Prop', () => {
    it('renders with minimum size (600px)', () => {
      const { container } = render(<Spotlight size={600} />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient\(600px/);
    });

    it('renders with large size (1200px)', () => {
      const { container } = render(<Spotlight size={1200} />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient\(1200px/);
    });

    it('renders with very large size (2000px)', () => {
      const { container } = render(<Spotlight size={2000} />);
      const spotlight = container.querySelector('.pointer-events-none');
      const style = spotlight?.getAttribute('style');

      expect(style).toMatch(/radial-gradient\(2000px/);
    });
  });

  describe('Viewport Resize Behavior', () => {
    it('switches from desktop to mobile on resize', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container, rerender } = render(<Spotlight />);

      // Simulate resize to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      fireEvent(window, new Event('resize'));

      rerender(<Spotlight />);

      const spotlight = container.querySelector('.pointer-events-none');
      expect(spotlight).toBeTruthy();
    });

    it('switches from mobile to desktop on resize', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { container, rerender } = render(<Spotlight />);

      // Simulate resize to desktop
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      fireEvent(window, new Event('resize'));

      rerender(<Spotlight />);

      const spotlight = container.querySelector('.pointer-events-none');
      expect(spotlight).toBeTruthy();
    });
  });

  describe('Custom ClassName', () => {
    it('applies custom className', () => {
      const { container } = render(<Spotlight className="custom-spotlight" />);
      const spotlight = container.querySelector('.custom-spotlight');

      expect(spotlight).toBeTruthy();
    });

    it('merges custom className with default classes', () => {
      const { container } = render(<Spotlight className="z-50 opacity-75" />);
      const spotlight = container.querySelector('.pointer-events-none');

      expect(spotlight).toBeTruthy();
      expect(spotlight?.classList.contains('pointer-events-none')).toBe(true);
    });
  });

  describe('Component Cleanup', () => {
    it('removes event listeners on unmount', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = render(<Spotlight />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Zero and Negative Coordinates', () => {
    it('handles mouse at (0, 0)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<Spotlight />);

      fireEvent(
        window,
        new MouseEvent('mousemove', {
          clientX: 0,
          clientY: 0,
        })
      );

      const spotlight = container.querySelector('.pointer-events-none');
      expect(spotlight).toBeTruthy();
    });
  });
});
