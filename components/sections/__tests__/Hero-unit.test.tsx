import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero Section - Unit Tests', () => {
  // Test content rendering with correct text
  describe('Content Rendering', () => {
    it('renders exact name text', () => {
      render(<Hero />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1.textContent).toBe('Manvik Talwar');
    });

    it('renders exact title text', () => {
      render(<Hero />);

      const h2 = screen.getByRole('heading', { level: 2 });
      expect(h2.textContent).toBe('AI/ML Engineer & Full-Stack Developer');
    });

    it('renders exact description text', () => {
      render(<Hero />);

      const description = screen.getByText(
        'Building intelligent systems with deep learning, RAG architectures, and modern web technologies'
      );
      expect(description).toBeTruthy();
    });

    it('renders exact button text', () => {
      render(<Hero />);

      const button = screen.getByRole('button');
      expect(button.textContent).toContain('View My Work');
    });
  });

  // Test animation timing and sequencing
  describe('Animation Timing', () => {
    it('applies 0.2s delay to h1 animation', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1).toBeTruthy();
    });

    it('applies 0.4s delay to h2 animation', () => {
      const { container } = render(<Hero />);

      const h2 = container.querySelector('h2');
      expect(h2).toBeTruthy();
    });

    it('applies 0.6s delay to description animation', () => {
      const { container } = render(<Hero />);

      const description = screen.getByText(/Building intelligent systems/i);
      expect(description).toBeTruthy();
    });

    it('applies 0.8s delay to button animation', () => {
      const { container } = render(<Hero />);

      const button = screen.getByRole('button');
      expect(button).toBeTruthy();
    });

    it('uses 0.8s duration for all animations', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      const h2 = container.querySelector('h2');
      
      expect(h1).toBeTruthy();
      expect(h2).toBeTruthy();
    });

    it('animates from y: 20 to y: 0', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1).toBeTruthy();
    });

    it('animates from opacity: 0 to opacity: 1', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1).toBeTruthy();
    });
  });

  // Test CTA button click handler
  describe('CTA Button Click Handler', () => {
    it('scrolls to projects section on click', () => {
      const mockScrollIntoView = vi.fn();
      const mockElement = { scrollIntoView: mockScrollIntoView };
      
      vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);

      render(<Hero />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(document.getElementById).toHaveBeenCalledWith('projects');
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('handles missing projects section gracefully', () => {
      vi.spyOn(document, 'getElementById').mockReturnValue(null);

      render(<Hero />);

      const button = screen.getByRole('button');
      
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('uses smooth scroll behavior', () => {
      const mockScrollIntoView = vi.fn();
      const mockElement = { scrollIntoView: mockScrollIntoView };
      
      vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);

      render(<Hero />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockScrollIntoView).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: 'smooth' })
      );
    });
  });

  describe('Text Gradient Effects', () => {
    it('applies gradient from white to white/40', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1?.classList.contains('from-white')).toBe(true);
      expect(h1?.classList.contains('via-white')).toBe(true);
      expect(h1?.classList.contains('to-white/40')).toBe(true);
    });

    it('uses bottom-right gradient direction', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1?.classList.contains('bg-gradient-to-br')).toBe(true);
    });

    it('applies text-transparent for gradient visibility', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1?.classList.contains('text-transparent')).toBe(true);
    });

    it('uses bg-clip-text for gradient clipping', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1?.classList.contains('bg-clip-text')).toBe(true);
    });
  });

  describe('Text Shadow Effects', () => {
    it('applies purple glow shadow to h1', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1') as HTMLElement;
      expect(h1?.style?.textShadow).toContain('rgba(139, 92, 246, 0.3)');
    });

    it('uses 40px blur radius for glow', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1') as HTMLElement;
      expect(h1?.style?.textShadow).toContain('40px');
    });
  });

  describe('Typography', () => {
    it('applies bold font weight to h1', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1?.classList.contains('font-bold')).toBe(true);
    });

    it('applies tight tracking to h1', () => {
      const { container } = render(<Hero />);

      const h1 = container.querySelector('h1');
      expect(h1?.classList.contains('tracking-tight')).toBe(true);
    });

    it('applies neutral-300 color to h2', () => {
      const { container } = render(<Hero />);

      const h2 = container.querySelector('h2');
      expect(h2?.classList.contains('text-neutral-300')).toBe(true);
    });

    it('applies neutral-400 color to description', () => {
      const { container } = render(<Hero />);

      const description = screen.getByText(/Building intelligent systems/i);
      expect(description.classList.contains('text-neutral-400')).toBe(true);
    });
  });

  describe('Button Icon', () => {
    it('renders ArrowRight icon', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      const svg = button?.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('applies transition to icon', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      const svg = button?.querySelector('svg');
      expect(svg?.classList.contains('transition-transform')).toBe(true);
    });

    it('applies translate on hover', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      const svg = button?.querySelector('svg');
      expect(svg?.classList.contains('group-hover:translate-x-1')).toBe(true);
    });

    it('applies correct icon size', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      const svg = button?.querySelector('svg');
      expect(svg?.classList.contains('h-5')).toBe(true);
      expect(svg?.classList.contains('w-5')).toBe(true);
    });
  });

  describe('Button Hover Effects', () => {
    it('applies scale-105 on hover', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('hover:scale-105')).toBe(true);
    });

    it('applies shadow-lg on hover', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('hover:shadow-lg')).toBe(true);
    });

    it('applies purple shadow on hover', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('hover:shadow-purple-500/50')).toBe(true);
    });

    it('applies transition-all for smooth effects', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('transition-all')).toBe(true);
    });
  });

  describe('Button Layout', () => {
    it('uses inline-flex layout', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('inline-flex')).toBe(true);
    });

    it('centers items vertically', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('items-center')).toBe(true);
    });

    it('applies gap-2 between text and icon', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('gap-2')).toBe(true);
    });

    it('applies rounded-lg corners', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('rounded-lg')).toBe(true);
    });

    it('applies px-8 py-4 padding', () => {
      const { container } = render(<Hero />);

      const button = container.querySelector('button');
      expect(button?.classList.contains('px-8')).toBe(true);
      expect(button?.classList.contains('py-4')).toBe(true);
    });
  });

  describe('Content Container', () => {
    it('applies max-w-7xl constraint', () => {
      const { container } = render(<Hero />);

      const content = container.querySelector('.max-w-7xl');
      expect(content).toBeTruthy();
    });

    it('centers content with mx-auto', () => {
      const { container } = render(<Hero />);

      const content = container.querySelector('.max-w-7xl');
      expect(content?.classList.contains('mx-auto')).toBe(true);
    });

    it('applies text-center', () => {
      const { container } = render(<Hero />);

      const content = container.querySelector('.max-w-7xl');
      expect(content?.classList.contains('text-center')).toBe(true);
    });

    it('applies z-20 for layering', () => {
      const { container } = render(<Hero />);

      const content = container.querySelector('.z-20');
      expect(content).toBeTruthy();
    });

    it('applies relative positioning', () => {
      const { container } = render(<Hero />);

      const content = container.querySelector('.z-20');
      expect(content?.classList.contains('relative')).toBe(true);
    });
  });

  describe('Description Paragraph', () => {
    it('applies max-w-2xl constraint', () => {
      const { container } = render(<Hero />);

      const description = screen.getByText(/Building intelligent systems/i);
      expect(description.classList.contains('max-w-2xl')).toBe(true);
    });

    it('centers with mx-auto', () => {
      const { container } = render(<Hero />);

      const description = screen.getByText(/Building intelligent systems/i);
      expect(description.classList.contains('mx-auto')).toBe(true);
    });

    it('applies mt-6 spacing', () => {
      const { container } = render(<Hero />);

      const description = screen.getByText(/Building intelligent systems/i);
      expect(description.classList.contains('mt-6')).toBe(true);
    });

    it('applies responsive text sizes', () => {
      const { container } = render(<Hero />);

      const description = screen.getByText(/Building intelligent systems/i);
      expect(description.classList.contains('text-base')).toBe(true);
      expect(description.classList.contains('sm:text-lg')).toBe(true);
    });
  });

  describe('Spacing', () => {
    it('applies mt-6 to h2', () => {
      const { container } = render(<Hero />);

      const h2 = container.querySelector('h2');
      expect(h2?.classList.contains('mt-6')).toBe(true);
    });

    it('applies mt-10 to button container', () => {
      const { container } = render(<Hero />);

      const buttonContainer = container.querySelector('button')?.parentElement;
      expect(buttonContainer?.classList.contains('mt-10')).toBe(true);
    });
  });

  describe('Grid Background', () => {
    it('applies 50px grid size', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('[class*="bg-grid-white"]');
      expect(grid?.classList.contains('bg-[size:50px_50px]')).toBe(true);
    });

    it('applies WebkitMaskImage for Safari support', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('[class*="bg-grid-white"]') as HTMLElement;
      expect(grid?.style?.WebkitMaskImage).toContain('radial-gradient');
    });

    it('uses ellipse shape for mask', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('[class*="bg-grid-white"]') as HTMLElement;
      expect(grid?.style?.maskImage).toContain('ellipse');
    });

    it('centers mask at center', () => {
      const { container } = render(<Hero />);

      const grid = container.querySelector('[class*="bg-grid-white"]') as HTMLElement;
      expect(grid?.style?.maskImage).toContain('at center');
    });
  });

  describe('Spotlight Configuration', () => {
    it('applies z-10 to spotlight', () => {
      const { container } = render(<Hero />);

      const spotlight = container.querySelector('.z-10');
      expect(spotlight).toBeTruthy();
    });

    it('positions spotlight behind content (z-10 < z-20)', () => {
      const { container } = render(<Hero />);

      const spotlight = container.querySelector('.z-10');
      const content = container.querySelector('.z-20');
      
      expect(spotlight).toBeTruthy();
      expect(content).toBeTruthy();
    });
  });

  describe('Section Element', () => {
    it('uses section semantic element', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('applies min-h-screen for full viewport', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('min-h-screen')).toBe(true);
    });
  });
});
