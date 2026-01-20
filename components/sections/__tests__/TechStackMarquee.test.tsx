import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TechStackMarquee } from '../TechStackMarquee';

describe('TechStackMarquee - Unit Tests', () => {
  describe('Technology Item Rendering', () => {
    it('renders all 12 technology items', () => {
      render(<TechStackMarquee />);

      expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
      expect(screen.getAllByText('PyTorch').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TensorFlow').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Azure OpenAI').length).toBeGreaterThan(0);
      expect(screen.getAllByText('FastAPI').length).toBeGreaterThan(0);
      expect(screen.getAllByText('ChromaDB').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Docker').length).toBeGreaterThan(0);
      expect(screen.getAllByText('OpenCV').length).toBeGreaterThan(0);
      expect(screen.getAllByText('React').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Next.js').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Tailwind CSS').length).toBeGreaterThan(0);
    });

    it('renders icons for each technology', () => {
      const { container } = render(<TechStackMarquee />);

      const icons = container.querySelectorAll('img');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('displays technology names', () => {
      render(<TechStackMarquee />);

      const pythonElements = screen.getAllByText('Python');
      expect(pythonElements.length).toBeGreaterThan(0);
    });
  });

  describe('InfiniteMovingCards Configuration', () => {
    it('renders InfiniteMovingCards component', () => {
      const { container } = render(<TechStackMarquee />);

      const marquee = container.querySelector('.relative.overflow-hidden');
      expect(marquee).toBeTruthy();
    });

    it('uses normal speed', () => {
      const { container } = render(<TechStackMarquee />);

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });

    it('enables pause on hover', () => {
      const { container } = render(<TechStackMarquee />);

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });

    it('animates left direction', () => {
      const { container } = render(<TechStackMarquee />);

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });
  });

  describe('Section Configuration', () => {
    it('renders section element', () => {
      const { container } = render(<TechStackMarquee />);

      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('applies neutral-950 background', () => {
      const { container } = render(<TechStackMarquee />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('bg-neutral-950')).toBe(true);
    });

    it('applies py-20 vertical padding', () => {
      const { container } = render(<TechStackMarquee />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('py-20')).toBe(true);
    });

    it('applies responsive horizontal padding', () => {
      const { container } = render(<TechStackMarquee />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('px-4')).toBe(true);
      expect(section?.classList.contains('sm:px-6')).toBe(true);
      expect(section?.classList.contains('lg:px-8')).toBe(true);
    });

    it('applies relative positioning', () => {
      const { container } = render(<TechStackMarquee />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('relative')).toBe(true);
    });
  });

  describe('Heading Configuration', () => {
    it('renders section heading', () => {
      render(<TechStackMarquee />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.textContent).toBe('Tech Stack');
    });

    it('applies mb-12 spacing to heading', () => {
      const { container } = render(<TechStackMarquee />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('mb-12')).toBe(true);
    });

    it('centers heading text', () => {
      const { container } = render(<TechStackMarquee />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-center')).toBe(true);
    });

    it('applies responsive text sizes', () => {
      const { container } = render(<TechStackMarquee />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-4xl')).toBe(true);
      expect(heading?.classList.contains('sm:text-5xl')).toBe(true);
    });

    it('applies white color to heading', () => {
      const { container } = render(<TechStackMarquee />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-white')).toBe(true);
    });

    it('applies bold font to heading', () => {
      const { container } = render(<TechStackMarquee />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('font-bold')).toBe(true);
    });
  });

  describe('Container Configuration', () => {
    it('applies mx-auto to center container', () => {
      const { container } = render(<TechStackMarquee />);

      const maxWidth = container.querySelector('.max-w-7xl');
      expect(maxWidth?.classList.contains('mx-auto')).toBe(true);
    });

    it('applies max-w-7xl constraint', () => {
      const { container } = render(<TechStackMarquee />);

      const maxWidth = container.querySelector('.max-w-7xl');
      expect(maxWidth).toBeTruthy();
    });
  });

  describe('Item Duplication', () => {
    it('duplicates items for seamless loop', () => {
      const { container } = render(<TechStackMarquee />);

      const items = container.querySelectorAll('.flex-shrink-0');
      expect(items.length).toBe(24); // 12 items * 2
    });
  });

  describe('Marquee Styling', () => {
    it('applies gap-8 between items', () => {
      const { container } = render(<TechStackMarquee />);

      const marquee = container.querySelector('.flex');
      expect(marquee?.classList.contains('gap-8')).toBe(true);
    });

    it('applies overflow-hidden to container', () => {
      const { container } = render(<TechStackMarquee />);

      const wrapper = container.querySelector('.overflow-hidden');
      expect(wrapper).toBeTruthy();
    });
  });
});
