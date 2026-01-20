import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page - Integration Tests', () => {
  describe('Section Rendering Order', () => {
    it('renders all four sections', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      expect(sections.length).toBe(4);
    });

    it('renders sections in correct semantic order', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      
      // Hero section (first)
      expect(sections[0].querySelector('h1')).toBeTruthy();
      
      // TechStackMarquee section (second)
      const techStackHeading = sections[1].querySelector('h2');
      expect(techStackHeading?.textContent).toBe('Tech Stack');
      
      // ProjectsGrid section (third)
      const projectsHeading = sections[2].querySelector('h2');
      expect(projectsHeading?.textContent).toBe('Featured Projects');
      
      // ExperienceTimeline section (fourth)
      const experienceHeading = sections[3].querySelector('h2');
      expect(experienceHeading?.textContent).toBe('Experience & Education');
    });

    it('wraps all sections in main element', () => {
      const { container } = render(<Home />);

      const main = container.querySelector('main');
      expect(main).toBeTruthy();
      expect(main?.classList.contains('relative')).toBe(true);
    });
  });

  describe('Data Flow from Data Files', () => {
    it('renders project data from data/projects.ts', () => {
      render(<Home />);

      // Verify projects are rendered
      expect(screen.getByText('Enterprise AI Assistant')).toBeTruthy();
      expect(screen.getByText('Deep Learning Watermarking')).toBeTruthy();
      expect(screen.getByText('FloatChat')).toBeTruthy();
      expect(screen.getByText('AI Mock Interviewer')).toBeTruthy();
    });

    it('renders experience data from data/experience.ts', () => {
      render(<Home />);

      // Verify work experience
      expect(screen.getByText('AI Development Intern')).toBeTruthy();
      expect(screen.getByText('Path Infotech')).toBeTruthy();

      // Verify education
      expect(screen.getByText(/Bachelor of Technology/i)).toBeTruthy();
      expect(screen.getByText('Manipal University Jaipur')).toBeTruthy();
    });

    it('renders tech stack data from data/experience.ts', () => {
      render(<Home />);

      // Verify tech stack items are rendered
      expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
      expect(screen.getAllByText('PyTorch').length).toBeGreaterThan(0);
      expect(screen.getAllByText('TensorFlow').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Docker').length).toBeGreaterThan(0);
    });
  });

  describe('Semantic HTML Structure', () => {
    it('uses semantic main element', () => {
      const { container } = render(<Home />);

      const main = container.querySelector('main');
      expect(main).toBeTruthy();
    });

    it('uses semantic section elements', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      expect(sections.length).toBe(4);
    });

    it('maintains proper heading hierarchy', () => {
      const { container } = render(<Home />);

      // Hero has h1
      const h1 = container.querySelector('h1');
      expect(h1).toBeTruthy();

      // Other sections have h2
      const h2Elements = container.querySelectorAll('h2');
      expect(h2Elements.length).toBeGreaterThanOrEqual(3);
    });

    it('uses div elements for content cards', () => {
      const { container } = render(<Home />);

      // BentoGrid items are divs with proper structure
      const gridItems = container.querySelectorAll('.group\\/bento');
      expect(gridItems.length).toBeGreaterThan(0);
    });
  });

  describe('Component Integration', () => {
    it('Hero section integrates Spotlight component', () => {
      const { container } = render(<Home />);

      // Spotlight creates a radial gradient
      const spotlight = container.querySelector('[style*="background"]');
      expect(spotlight).toBeTruthy();
    });

    it('ProjectsGrid integrates BentoGrid component', () => {
      const { container } = render(<Home />);

      // BentoGrid creates a grid layout
      const grid = container.querySelector('.grid');
      expect(grid).toBeTruthy();
    });

    it('ExperienceTimeline integrates TracingBeam component', () => {
      const { container } = render(<Home />);

      // TracingBeam creates an SVG
      const svg = container.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('TechStackMarquee integrates InfiniteMovingCards component', () => {
      const { container } = render(<Home />);

      // InfiniteMovingCards creates animated flex container
      const marquee = container.querySelector('.overflow-hidden');
      expect(marquee).toBeTruthy();
    });
  });

  describe('Section Spacing', () => {
    it('applies consistent vertical padding to sections', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      
      // All sections should have py-20 or similar vertical padding
      sections.forEach(section => {
        const hasPadding = section.classList.contains('py-20') || 
                          section.classList.contains('py-16') ||
                          section.classList.contains('min-h-screen');
        expect(hasPadding).toBe(true);
      });
    });

    it('applies responsive horizontal padding to sections or their containers', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      
      // Sections or their immediate children should have responsive horizontal padding
      sections.forEach(section => {
        const hasPadding = section.classList.contains('px-4') || 
                          section.classList.contains('px-6') ||
                          section.querySelector('.px-4') !== null ||
                          section.querySelector('.px-6') !== null;
        expect(hasPadding).toBe(true);
      });
    });
  });

  describe('Content Completeness', () => {
    it('renders hero content', () => {
      render(<Home />);

      expect(screen.getByText('Manvik Talwar')).toBeTruthy();
      expect(screen.getByText(/AI\/ML Engineer/i)).toBeTruthy();
    });

    it('renders all project titles', () => {
      render(<Home />);

      const projectTitles = [
        'Enterprise AI Assistant',
        'Deep Learning Watermarking',
        'FloatChat',
        'AI Mock Interviewer'
      ];

      projectTitles.forEach(title => {
        expect(screen.getByText(title)).toBeTruthy();
      });
    });

    it('renders technology tags in projects', () => {
      const { container } = render(<Home />);

      // Projects should have technology tags
      const techTags = container.querySelectorAll('.text-xs');
      expect(techTags.length).toBeGreaterThan(0);
    });

    it('renders experience descriptions', () => {
      render(<Home />);

      expect(screen.getByText(/Architected and deployed Sofia chatbot/i)).toBeTruthy();
      expect(screen.getByText(/Specialized in Artificial Intelligence/i)).toBeTruthy();
    });
  });

  describe('Visual Consistency', () => {
    it('applies dark theme to all sections', () => {
      const { container } = render(<Home />);

      const sections = container.querySelectorAll('section');
      
      sections.forEach(section => {
        const hasDarkBg = section.classList.contains('bg-black') || 
                         section.classList.contains('bg-neutral-950') ||
                         section.classList.contains('bg-neutral-900');
        expect(hasDarkBg).toBe(true);
      });
    });

    it('uses consistent gradient colors', () => {
      const { container } = render(<Home />);

      // Check for purple/pink gradient usage
      const gradients = container.querySelectorAll('[class*="purple"], [class*="pink"]');
      expect(gradients.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('has single h1 element', () => {
      const { container } = render(<Home />);

      const h1Elements = container.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });

    it('has proper heading hierarchy (h1 -> h2 -> h3)', () => {
      const { container } = render(<Home />);

      const h1 = container.querySelector('h1');
      const h2Elements = container.querySelectorAll('h2');
      const h3Elements = container.querySelectorAll('h3');

      expect(h1).toBeTruthy();
      expect(h2Elements.length).toBeGreaterThan(0);
      expect(h3Elements.length).toBeGreaterThan(0);
    });

    it('uses semantic landmarks', () => {
      const { container } = render(<Home />);

      const main = container.querySelector('main');
      const sections = container.querySelectorAll('section');

      expect(main).toBeTruthy();
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Performance Considerations', () => {
    it('renders without throwing errors', () => {
      expect(() => render(<Home />)).not.toThrow();
    });

    it('renders all sections synchronously', () => {
      const { container } = render(<Home />);

      // All sections should be in DOM immediately
      const sections = container.querySelectorAll('section');
      expect(sections.length).toBe(4);
    });
  });
});
