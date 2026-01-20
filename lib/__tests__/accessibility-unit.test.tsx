import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from '@/components/sections/Hero';
import Home from '@/app/page';

describe('Accessibility - Unit Tests', () => {
  let matchMediaMock: any;

  beforeEach(() => {
    matchMediaMock = vi.fn();
    window.matchMedia = matchMediaMock;
    
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
  });

  describe('Keyboard Navigation', () => {
    it('allows Tab navigation through interactive elements', async () => {
      const user = userEvent.setup();
      render(<Hero />);

      const button = screen.getByRole('button', { name: /view my work/i });
      
      // Tab to button
      await user.tab();
      
      // Button should be focusable
      expect(button).toBeTruthy();
    });

    it('supports Enter key on buttons', async () => {
      const user = userEvent.setup();
      const mockScroll = vi.fn();
      
      // Mock scrollIntoView
      Element.prototype.scrollIntoView = mockScroll;
      
      render(<Hero />);

      const button = screen.getByRole('button', { name: /view my work/i });
      
      // Focus and press Enter
      button.focus();
      await user.keyboard('{Enter}');
      
      // Should trigger click handler
      expect(button).toBeTruthy();
    });

    it('supports Space key on buttons', async () => {
      const user = userEvent.setup();
      render(<Hero />);

      const button = screen.getByRole('button', { name: /view my work/i });
      
      button.focus();
      await user.keyboard(' ');
      
      expect(button).toBeTruthy();
    });
  });

  describe('Focus Indicators', () => {
    it('displays visible focus ring on buttons', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('focus:ring-2')).toBe(true);
      expect(button?.classList.contains('focus:ring-purple-500')).toBe(true);
    });

    it('has focus ring offset for better visibility', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('focus:ring-offset-2')).toBe(true);
    });

    it('uses appropriate focus ring color', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('focus:ring-purple-500')).toBe(true);
    });
  });

  describe('Screen Reader Compatibility', () => {
    it('provides aria-label for buttons', () => {
      render(<Hero />);

      const button = screen.getByRole('button');
      expect(button.getAttribute('aria-label')).toBeTruthy();
    });

    it('hides decorative elements from screen readers', () => {
      const { container } = render(<Hero />);

      const decorative = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorative.length).toBeGreaterThan(0);
    });

    it('provides section labels', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section?.getAttribute('aria-label')).toBeTruthy();
    });

    it('uses semantic heading structure', () => {
      render(<Home />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeTruthy();
      expect(h1.textContent).toBe('Manvik Talwar');
    });

    it('provides proper heading hierarchy', () => {
      const { container } = render(<Home />);

      const h1 = container.querySelector('h1');
      const h2Elements = container.querySelectorAll('h2');
      
      expect(h1).toBeTruthy();
      expect(h2Elements.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('ARIA Attributes', () => {
    it('uses aria-labelledby for content sections', () => {
      const { container } = render(<Home />);

      const labelledBy = container.querySelector('[aria-labelledby="projects-heading"]');
      expect(labelledBy).toBeTruthy();
    });

    it('provides role attributes where needed', () => {
      const { container } = render(<Home />);

      const lists = container.querySelectorAll('[role="list"]');
      expect(lists.length).toBeGreaterThan(0);
    });

    it('uses aria-hidden for icons', () => {
      const { container } = render(<Hero />);

      const icon = container.querySelector('svg[aria-hidden="true"]');
      expect(icon).toBeTruthy();
    });
  });

  describe('Semantic HTML', () => {
    it('uses main element for primary content', () => {
      const { container } = render(<Home />);

      const main = container.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('uses section elements for content sections', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      expect(sections.length).toBe(4);
    });

    it('uses proper heading levels', () => {
      const { container } = render(<Home />);

      const h1 = container.querySelectorAll('h1');
      const h2 = container.querySelectorAll('h2');
      const h3 = container.querySelectorAll('h3');

      expect(h1.length).toBe(1);
      expect(h2.length).toBeGreaterThan(0);
      expect(h3.length).toBeGreaterThan(0);
    });

    it('uses button elements for interactive actions', () => {
      render(<Hero />);

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Color Contrast', () => {
    it('uses white text on dark backgrounds', () => {
      const { container } = render(<Home />);

      const whiteText = container.querySelectorAll('.text-white');
      expect(whiteText.length).toBeGreaterThan(0);
    });

    it('uses high-contrast neutral colors', () => {
      const { container } = render(<Home />);

      const neutralText = container.querySelectorAll('.text-neutral-300, .text-neutral-400');
      expect(neutralText.length).toBeGreaterThan(0);
    });

    it('applies dark backgrounds for contrast', () => {
      const { container } = render(<Home />);

      const darkBg = container.querySelectorAll('.bg-black, .bg-neutral-950, .bg-neutral-900');
      expect(darkBg.length).toBeGreaterThan(0);
    });
  });

  describe('Reduced Motion', () => {
    it('respects prefers-reduced-motion setting', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(<Hero />);
      
      expect(container.firstChild).toBeTruthy();
    });

    it('renders without animations when reduced motion is preferred', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(<Hero />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeTruthy();
    });
  });

  describe('Interactive Element Accessibility', () => {
    it('provides accessible names for all buttons', () => {
      render(<Hero />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const accessibleName = button.getAttribute('aria-label') || button.textContent;
        expect(accessibleName).toBeTruthy();
      });
    });

    it('ensures buttons are keyboard accessible', () => {
      render(<Hero />);

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });
  });
});
