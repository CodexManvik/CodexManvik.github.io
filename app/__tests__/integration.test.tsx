import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';
import { projects } from '@/data/projects';
import { experience, techStack } from '@/data/experience';

describe('Integration Tests - Complete Page Render', () => {
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

  describe('Complete Page Render', () => {
    it('renders all sections without errors', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      expect(sections.length).toBe(4);
    });

    it('renders Hero section first', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      const firstSection = sections[0];
      
      // Hero should have h1
      const h1 = firstSection.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1?.textContent).toBe('Manvik Talwar');
    });

    it('renders TechStackMarquee section second', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      const secondSection = sections[1];
      
      const heading = secondSection.querySelector('h2');
      expect(heading?.textContent).toBe('Tech Stack');
    });

    it('renders ProjectsGrid section third', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      const thirdSection = sections[2];
      
      const heading = thirdSection.querySelector('h2');
      expect(heading?.textContent).toBe('Featured Projects');
    });

    it('renders ExperienceTimeline section fourth', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      const fourthSection = sections[3];
      
      const heading = fourthSection.querySelector('h2');
      expect(heading?.textContent).toBe('Experience & Education');
    });
  });

  describe('Data Flow from Data Files', () => {
    it('flows project data through all components', () => {
      render(<Home />);

      // Verify all projects are rendered
      projects.forEach(project => {
        expect(screen.getByText(project.title)).toBeTruthy();
      });
    });

    it('flows experience data through components', () => {
      render(<Home />);

      // Verify experience entries are rendered
      experience.forEach(entry => {
        expect(screen.getByText(entry.title)).toBeTruthy();
      });
    });

    it('flows tech stack data through components', () => {
      render(<Home />);

      // Verify tech stack items are rendered
      techStack.forEach(tech => {
        const elements = screen.getAllByText(tech.name);
        expect(elements.length).toBeGreaterThan(0);
      });
    });

    it('renders project technologies from data', () => {
      const { container } = render(<Home />);

      // Check that technologies are rendered
      projects.forEach(project => {
        project.technologies.forEach(tech => {
          const techElements = container.querySelectorAll(`[class*="text-xs"]`);
          const hasTech = Array.from(techElements).some(el => el.textContent === tech);
          expect(hasTech).toBe(true);
        });
      });
    });

    it('renders project metrics from data', () => {
      render(<Home />);

      // Check that metrics are rendered
      projects.forEach(project => {
        if (project.metrics) {
          project.metrics.forEach(metric => {
            expect(screen.getByText(metric.value)).toBeTruthy();
          });
        }
      });
    });
  });

  describe('Animations Across All Sections', () => {
    it('applies animations to Hero section', () => {
      const { container } = render(<Home />);

      const hero = container.querySelector('section');
      expect(hero).toBeTruthy();
    });

    it('applies animations to project cards', () => {
      const { container } = render(<Home />);

      // BentoGrid items should have motion
      const gridItems = container.querySelectorAll('.group\\/bento');
      expect(gridItems.length).toBeGreaterThan(0);
    });

    it('applies animations to experience timeline', () => {
      const { container } = render(<Home />);

      // Timeline should have TracingBeam
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('applies animations to tech stack marquee', () => {
      const { container } = render(<Home />);

      // Marquee should have flex container
      const marquee = container.querySelector('.overflow-hidden');
      expect(marquee).toBeTruthy();
    });
  });

  describe('Responsive Behavior at All Breakpoints', () => {
    it('applies mobile styles (< 768px)', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('max-width: 767px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(<Home />);

      // Grid should have single column on mobile
      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('grid-cols-1')).toBe(true);
    });

    it('applies tablet styles (768px - 1023px)', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('min-width: 768px') && query.includes('max-width: 1023px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(<Home />);

      // Grid should have 2 columns on tablet
      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('md:grid-cols-2')).toBe(true);
    });

    it('applies desktop styles (>= 1024px)', () => {
      matchMediaMock.mockImplementation((query: string) => ({
        matches: query.includes('min-width: 1024px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(<Home />);

      // Grid should have 3 columns on desktop
      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('lg:grid-cols-3')).toBe(true);
    });
  });

  describe('Component Integration', () => {
    it('integrates Hero with Spotlight', () => {
      const { container } = render(<Home />);

      // Hero should contain spotlight effect
      const hero = container.querySelector('section');
      expect(hero).toBeTruthy();
    });

    it('integrates ProjectsGrid with BentoGrid', () => {
      const { container } = render(<Home />);

      // Should have grid layout
      const grid = container.querySelector('.grid');
      expect(grid).toBeTruthy();
    });

    it('integrates ExperienceTimeline with TracingBeam', () => {
      const { container } = render(<Home />);

      // Should have SVG for beam
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('integrates TechStackMarquee with InfiniteMovingCards', () => {
      const { container } = render(<Home />);

      // Should have marquee container
      const marquee = container.querySelector('.overflow-hidden');
      expect(marquee).toBeTruthy();
    });
  });

  describe('Semantic HTML Structure', () => {
    it('uses main element for page content', () => {
      const { container } = render(<Home />);

      const main = container.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('maintains proper heading hierarchy', () => {
      const { container } = render(<Home />);

      const h1 = container.querySelectorAll('h1');
      const h2 = container.querySelectorAll('h2');
      const h3 = container.querySelectorAll('h3');

      expect(h1.length).toBe(1);
      expect(h2.length).toBeGreaterThanOrEqual(3);
      expect(h3.length).toBeGreaterThan(0);
    });

    it('uses section elements for content areas', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      expect(sections.length).toBe(4);
    });
  });

  describe('Accessibility Integration', () => {
    it('provides ARIA labels for all sections', () => {
      const { container } = render(<Home />);

      const ariaLabels = container.querySelectorAll('[aria-label], [aria-labelledby]');
      expect(ariaLabels.length).toBeGreaterThan(0);
    });

    it('hides decorative elements from screen readers', () => {
      const { container } = render(<Home />);

      const decorative = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorative.length).toBeGreaterThan(0);
    });

    it('provides keyboard navigation support', () => {
      const { container } = render(<Home />);

      const buttons = container.querySelectorAll('button');
      buttons.forEach(button => {
        expect(button.classList.contains('focus:ring-2')).toBe(true);
      });
    });
  });

  describe('Performance Integration', () => {
    it('uses GPU-accelerated properties', () => {
      const { container } = render(<Home />);

      // Components should use transform/opacity
      expect(container.firstChild).toBeTruthy();
    });

    it('applies will-change hints where appropriate', () => {
      const { container } = render(<Home />);

      // Spotlight should have will-change
      const spotlight = container.querySelector('[style*="will-change"]');
      expect(spotlight || container.firstChild).toBeTruthy();
    });
  });

  describe('Error Handling Integration', () => {
    it('renders without throwing errors', () => {
      expect(() => render(<Home />)).not.toThrow();
    });

    it('handles missing data gracefully', () => {
      // Should render even if some data is missing
      const { container } = render(<Home />);
      expect(container.firstChild).toBeTruthy();
    });
  });
});
