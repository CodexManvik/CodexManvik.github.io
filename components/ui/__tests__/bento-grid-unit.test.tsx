import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BentoGrid, BentoGridItem } from '../bento-grid';

describe('Bento Grid Unit Tests', () => {
  describe('Grid Rendering', () => {
    it('renders with multiple items', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Item 1" description="Description 1" />
          <BentoGridItem title="Item 2" description="Description 2" />
          <BentoGridItem title="Item 3" description="Description 3" />
        </BentoGrid>
      );

      expect(screen.getByText('Item 1')).toBeTruthy();
      expect(screen.getByText('Item 2')).toBeTruthy();
      expect(screen.getByText('Item 3')).toBeTruthy();

      const items = container.querySelectorAll('.group\\/bento');
      expect(items.length).toBe(3);
    });

    it('renders empty grid', () => {
      const { container } = render(<BentoGrid />);
      const grid = container.querySelector('.grid');
      expect(grid).toBeTruthy();
    });

    it('renders single item', () => {
      render(
        <BentoGrid>
          <BentoGridItem title="Single Item" description="Single description" />
        </BentoGrid>
      );

      expect(screen.getByText('Single Item')).toBeTruthy();
      expect(screen.getByText('Single description')).toBeTruthy();
    });
  });

  describe('Custom GridSpan Application', () => {
    it('applies col-span-1 row-span-1', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem
            title="Test"
            description="Description"
            gridSpan={{ cols: 1, rows: 1 }}
          />
        </BentoGrid>
      );

      const item = container.querySelector('.group\\/bento');
      const classes = item?.className || '';
      
      expect(classes).toContain('md:col-span-1');
      expect(classes).toContain('md:row-span-1');
    });

    it('applies col-span-2 row-span-1', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem
            title="Test"
            description="Description"
            gridSpan={{ cols: 2, rows: 1 }}
          />
        </BentoGrid>
      );

      const item = container.querySelector('.group\\/bento');
      const classes = item?.className || '';
      
      expect(classes).toContain('md:col-span-2');
      expect(classes).toContain('md:row-span-1');
    });

    it('applies col-span-3 row-span-2', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem
            title="Test"
            description="Description"
            gridSpan={{ cols: 3, rows: 2 }}
          />
        </BentoGrid>
      );

      const item = container.querySelector('.group\\/bento');
      const classes = item?.className || '';
      
      expect(classes).toContain('md:col-span-3');
      expect(classes).toContain('md:row-span-2');
    });

    it('renders without gridSpan prop', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const item = container.querySelector('.group\\/bento');
      expect(item).toBeTruthy();
    });
  });

  describe('Gap Spacing at Breakpoints', () => {
    it('applies gap-4 for mobile (1rem)', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('gap-4')).toBe(true);
    });

    it('applies md:gap-6 for desktop (1.5rem)', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('md:gap-6')).toBe(true);
    });

    it('maintains consistent gap across multiple items', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Item 1" description="Description 1" />
          <BentoGridItem title="Item 2" description="Description 2" />
          <BentoGridItem title="Item 3" description="Description 3" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('gap-4')).toBe(true);
      expect(grid?.classList.contains('md:gap-6')).toBe(true);
    });
  });

  describe('Header and Icon Slots', () => {
    it('renders header content', () => {
      render(
        <BentoGrid>
          <BentoGridItem
            title="Test"
            description="Description"
            header={
              <div className="flex gap-2">
                <span className="badge">Badge 1</span>
                <span className="badge">Badge 2</span>
              </div>
            }
          />
        </BentoGrid>
      );

      expect(screen.getByText('Badge 1')).toBeTruthy();
      expect(screen.getByText('Badge 2')).toBeTruthy();
    });

    it('renders icon content', () => {
      render(
        <BentoGrid>
          <BentoGridItem
            title="Test"
            description="Description"
            icon={<span data-testid="icon">🚀</span>}
          />
        </BentoGrid>
      );

      expect(screen.getByTestId('icon')).toBeTruthy();
    });

    it('renders both header and icon', () => {
      render(
        <BentoGrid>
          <BentoGridItem
            title="Test"
            description="Description"
            header={<div data-testid="header">Header</div>}
            icon={<span data-testid="icon">🎨</span>}
          />
        </BentoGrid>
      );

      expect(screen.getByTestId('header')).toBeTruthy();
      expect(screen.getByTestId('icon')).toBeTruthy();
    });

    it('renders without header and icon', () => {
      render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      expect(screen.getByText('Test')).toBeTruthy();
      expect(screen.getByText('Description')).toBeTruthy();
    });
  });

  describe('Noise Texture Overlay', () => {
    it('applies noise texture overlay', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const noise = container.querySelector('.bg-noise');
      expect(noise).toBeTruthy();
      expect(noise?.classList.contains('opacity-5')).toBe(true);
      expect(noise?.classList.contains('pointer-events-none')).toBe(true);
    });
  });

  describe('Max Width Container', () => {
    it('applies max-w-7xl to grid container', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('max-w-7xl')).toBe(true);
      expect(grid?.classList.contains('mx-auto')).toBe(true);
    });
  });

  describe('Custom ClassName Merging', () => {
    it('merges custom className on BentoGrid', () => {
      const { container } = render(
        <BentoGrid className="custom-grid-class">
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const grid = container.querySelector('.custom-grid-class');
      expect(grid).toBeTruthy();
      expect(grid?.classList.contains('grid')).toBe(true);
    });

    it('merges custom className on BentoGridItem', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem
            title="Test"
            description="Description"
            className="custom-item-class"
          />
        </BentoGrid>
      );

      const item = container.querySelector('.custom-item-class');
      expect(item).toBeTruthy();
      expect(item?.classList.contains('group/bento')).toBe(true);
    });
  });

  describe('Content Rendering', () => {
    it('renders title and description', () => {
      render(
        <BentoGrid>
          <BentoGridItem
            title="Project Title"
            description="This is a detailed project description"
          />
        </BentoGrid>
      );

      expect(screen.getByText('Project Title')).toBeTruthy();
      expect(screen.getByText('This is a detailed project description')).toBeTruthy();
    });

    it('applies correct text styling', () => {
      const { container } = render(
        <BentoGrid>
          <BentoGridItem title="Test" description="Description" />
        </BentoGrid>
      );

      const title = screen.getByText('Test');
      expect(title.classList.contains('text-xl')).toBe(true);
      expect(title.classList.contains('font-bold')).toBe(true);
      expect(title.classList.contains('text-white')).toBe(true);

      const description = screen.getByText('Description');
      expect(description.classList.contains('text-neutral-400')).toBe(true);
      expect(description.classList.contains('text-sm')).toBe(true);
    });
  });
});
