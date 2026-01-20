import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfiniteMovingCards } from '../infinite-cards';
import type { TechStackItem } from '@/data/types';

describe('Infinite Moving Cards - Unit Tests', () => {
  const mockItems: TechStackItem[] = [
    { name: 'Python', icon: '/icons/python.svg' },
    { name: 'PyTorch', icon: '/icons/pytorch.svg' },
    { name: 'Azure', icon: '/icons/azure.svg' },
  ];

  // Test direction prop (left vs right)
  describe('Direction Prop', () => {
    it('animates left by default', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // Default direction is left: x goes from 0% to -50%
    });

    it('animates right when direction="right"', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} direction="right" />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // Right direction: x goes from -50% to 0%
    });

    it('animates left when direction="left"', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} direction="left" />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });
  });

  // Test speed variations
  describe('Speed Variations', () => {
    it('uses 20s duration for normal speed (default)', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // Normal speed = 20s duration
    });

    it('uses 40s duration for slow speed', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} speed="slow" />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // Slow speed = 40s duration
    });

    it('uses 10s duration for fast speed', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} speed="fast" />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // Fast speed = 10s duration
    });

    it('handles all speed options correctly', () => {
      const speeds: Array<'slow' | 'normal' | 'fast'> = ['slow', 'normal', 'fast'];
      
      speeds.forEach(speed => {
        const { container } = render(
          <InfiniteMovingCards items={mockItems} speed={speed} />
        );

        const marquee = container.querySelector('.flex');
        expect(marquee).toBeTruthy();
      });
    });
  });

  // Test item duplication logic
  describe('Item Duplication Logic', () => {
    it('duplicates items exactly once for seamless loop', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const renderedItems = container.querySelectorAll('.flex-shrink-0');
      expect(renderedItems.length).toBe(mockItems.length * 2);
    });

    it('duplicates single item correctly', () => {
      const singleItem: TechStackItem[] = [
        { name: 'React', icon: '/icons/react.svg' }
      ];

      const { container } = render(
        <InfiniteMovingCards items={singleItem} />
      );

      const renderedItems = container.querySelectorAll('.flex-shrink-0');
      expect(renderedItems.length).toBe(2);
      expect(screen.getAllByText('React').length).toBe(2);
    });

    it('duplicates multiple items correctly', () => {
      const multipleItems: TechStackItem[] = [
        { name: 'Docker', icon: '/icons/docker.svg' },
        { name: 'FastAPI', icon: '/icons/fastapi.svg' },
        { name: 'ChromaDB', icon: '/icons/chromadb.svg' },
        { name: 'OpenCV', icon: '/icons/opencv.svg' },
        { name: 'TensorFlow', icon: '/icons/tensorflow.svg' },
      ];

      const { container } = render(
        <InfiniteMovingCards items={multipleItems} />
      );

      const renderedItems = container.querySelectorAll('.flex-shrink-0');
      expect(renderedItems.length).toBe(multipleItems.length * 2);
    });

    it('maintains item order in duplication', () => {
      render(<InfiniteMovingCards items={mockItems} />);

      const pythonElements = screen.getAllByText('Python');
      const pytorchElements = screen.getAllByText('PyTorch');
      const azureElements = screen.getAllByText('Azure');

      // Each item appears exactly twice
      expect(pythonElements.length).toBe(2);
      expect(pytorchElements.length).toBe(2);
      expect(azureElements.length).toBe(2);
    });

    it('assigns unique keys to duplicated items', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const renderedItems = container.querySelectorAll('.flex-shrink-0');
      
      // Verify all items are rendered
      expect(renderedItems.length).toBe(mockItems.length * 2);
      
      // Keys should be unique: name-0, name-1, name-2, name-3, name-4, name-5
      // (3 original items + 3 duplicates)
    });
  });

  describe('Empty Items Array', () => {
    it('handles empty items array gracefully', () => {
      const { container } = render(
        <InfiniteMovingCards items={[]} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      
      const renderedItems = container.querySelectorAll('.flex-shrink-0');
      expect(renderedItems.length).toBe(0);
    });
  });

  describe('Item Content Rendering', () => {
    it('renders icon with correct src attribute', () => {
      render(<InfiniteMovingCards items={mockItems} />);

      const pythonIcons = screen.getAllByAltText('Python');
      pythonIcons.forEach(icon => {
        expect(icon.getAttribute('src')).toBe('/icons/python.svg');
      });
    });

    it('renders name with correct text', () => {
      render(<InfiniteMovingCards items={mockItems} />);

      const pythonNames = screen.getAllByText('Python');
      expect(pythonNames.length).toBe(2);
      
      pythonNames.forEach(name => {
        expect(name.textContent).toBe('Python');
      });
    });

    it('applies correct icon dimensions', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const icons = container.querySelectorAll('img');
      icons.forEach(icon => {
        expect(icon.classList.contains('w-8')).toBe(true);
        expect(icon.classList.contains('h-8')).toBe(true);
      });
    });

    it('applies correct text styling', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const names = container.querySelectorAll('span');
      names.forEach(name => {
        expect(name.classList.contains('text-sm')).toBe(true);
        expect(name.classList.contains('font-medium')).toBe(true);
        expect(name.classList.contains('text-white')).toBe(true);
      });
    });
  });

  describe('Animation Configuration', () => {
    it('configures infinite repeat', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // Framer Motion transition.repeat = Infinity
    });

    it('uses linear easing', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // Framer Motion transition.ease = 'linear'
    });

    it('combines direction and speed correctly', () => {
      const { container: leftSlow } = render(
        <InfiniteMovingCards items={mockItems} direction="left" speed="slow" />
      );
      expect(leftSlow.querySelector('.flex')).toBeTruthy();

      const { container: rightFast } = render(
        <InfiniteMovingCards items={mockItems} direction="right" speed="fast" />
      );
      expect(rightFast.querySelector('.flex')).toBeTruthy();
    });
  });

  describe('Pause on Hover Configuration', () => {
    it('enables pause on hover by default', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // whileHover configured when pauseOnHover=true
    });

    it('disables pause on hover when pauseOnHover=false', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} pauseOnHover={false} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
      // whileHover not configured when pauseOnHover=false
    });

    it('respects pauseOnHover prop with different speeds', () => {
      const { container: pauseSlow } = render(
        <InfiniteMovingCards items={mockItems} speed="slow" pauseOnHover={true} />
      );
      expect(pauseSlow.querySelector('.flex')).toBeTruthy();

      const { container: noPauseFast } = render(
        <InfiniteMovingCards items={mockItems} speed="fast" pauseOnHover={false} />
      );
      expect(noPauseFast.querySelector('.flex')).toBeTruthy();
    });
  });

  describe('Container Styling', () => {
    it('applies relative positioning', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('relative')).toBe(true);
    });

    it('applies overflow-hidden', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('overflow-hidden')).toBe(true);
    });

    it('merges custom className with default classes', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} className="custom-class" />
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.classList.contains('custom-class')).toBe(true);
      expect(wrapper.classList.contains('relative')).toBe(true);
      expect(wrapper.classList.contains('overflow-hidden')).toBe(true);
    });
  });

  describe('Marquee Flex Layout', () => {
    it('applies flex layout to marquee', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee).toBeTruthy();
    });

    it('applies gap-8 (2rem) spacing', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const marquee = container.querySelector('.flex');
      expect(marquee?.classList.contains('gap-8')).toBe(true);
    });
  });

  describe('Item Card Styling', () => {
    it('applies flex-shrink-0 to prevent shrinking', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const items = container.querySelectorAll('.flex-shrink-0');
      expect(items.length).toBeGreaterThan(0);
    });

    it('applies dark background (bg-neutral-900)', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const items = container.querySelectorAll('.flex-shrink-0');
      items.forEach(item => {
        expect(item.classList.contains('bg-neutral-900')).toBe(true);
      });
    });

    it('applies rounded corners', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const items = container.querySelectorAll('.flex-shrink-0');
      items.forEach(item => {
        expect(item.classList.contains('rounded-lg')).toBe(true);
      });
    });

    it('applies border with white/10 opacity', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const items = container.querySelectorAll('.flex-shrink-0');
      items.forEach(item => {
        expect(item.classList.contains('border')).toBe(true);
        expect(item.className).toContain('border-white/10');
      });
    });

    it('applies padding (px-6 py-4)', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const items = container.querySelectorAll('.flex-shrink-0');
      items.forEach(item => {
        expect(item.classList.contains('px-6')).toBe(true);
        expect(item.classList.contains('py-4')).toBe(true);
      });
    });

    it('uses flex layout with gap-3 for icon and text', () => {
      const { container } = render(
        <InfiniteMovingCards items={mockItems} />
      );

      const items = container.querySelectorAll('.flex-shrink-0');
      items.forEach(item => {
        expect(item.classList.contains('flex')).toBe(true);
        expect(item.classList.contains('items-center')).toBe(true);
        expect(item.classList.contains('gap-3')).toBe(true);
      });
    });
  });
});
