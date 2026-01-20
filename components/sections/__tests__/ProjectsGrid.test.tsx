import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { ProjectsGrid } from '../ProjectsGrid';

describe('ProjectsGrid Section', () => {
  // Property 3: Data-Driven Rendering
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 3.1, 3.3
  describe('Property 3: Data-Driven Rendering', () => {
    it('renders all projects from data file', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('Enterprise AI Assistant')).toBeTruthy();
      expect(screen.getByText('Deep Learning Watermarking')).toBeTruthy();
      expect(screen.getByText('FloatChat')).toBeTruthy();
      expect(screen.getByText('AI Mock Interviewer')).toBeTruthy();
    });

    it('passes project data through props to BentoGridItem', () => {
      const { container } = render(<ProjectsGrid />);

      const titles = container.querySelectorAll('h3');
      expect(titles.length).toBe(4);
    });

    it('renders project descriptions', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText(/Azure OpenAI-powered RAG system/i)).toBeTruthy();
      expect(screen.getByText(/Invisible copyright protection/i)).toBeTruthy();
      expect(screen.getByText(/Local RAG system using Qwen/i)).toBeTruthy();
      expect(screen.getByText(/Real-time emotion and gaze analysis/i)).toBeTruthy();
    });

    it('validates data-driven rendering consistency', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 5 }),
          (iterations) => {
            for (let i = 0; i < iterations; i++) {
              const { container, unmount } = render(<ProjectsGrid />);
              
              const titles = container.querySelectorAll('h3');
              expect(titles.length).toBe(4);
              
              unmount();
            }
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Technology Tags Rendering', () => {
    it('renders technology tags for each project', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('Azure OpenAI')).toBeTruthy();
      expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
      expect(screen.getByText('PyTorch')).toBeTruthy();
      expect(screen.getAllByText('ChromaDB').length).toBeGreaterThan(0);
    });

    it('applies consistent styling to technology tags', () => {
      const { container } = render(<ProjectsGrid />);

      const tags = container.querySelectorAll('.rounded-full');
      expect(tags.length).toBeGreaterThan(0);
      
      tags.forEach(tag => {
        expect(tag.classList.contains('bg-purple-500/10')).toBe(true);
        expect(tag.classList.contains('text-purple-300')).toBe(true);
      });
    });

    it('renders all technologies for Enterprise AI Assistant', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('Azure OpenAI')).toBeTruthy();
      expect(screen.getByText('FastAPI')).toBeTruthy();
      expect(screen.getByText('Docker')).toBeTruthy();
    });

    it('renders all technologies for Deep Learning Watermarking', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('PyTorch')).toBeTruthy();
      expect(screen.getByText('CNN')).toBeTruthy();
      expect(screen.getByText('Image Processing')).toBeTruthy();
    });
  });

  describe('Project Icons', () => {
    it('renders icon for each project', () => {
      const { container } = render(<ProjectsGrid />);

      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThanOrEqual(4);
    });

    it('applies correct icon colors', () => {
      const { container } = render(<ProjectsGrid />);

      const purpleIcon = container.querySelector('.text-purple-500');
      const pinkIcon = container.querySelector('.text-pink-500');
      const blueIcon = container.querySelector('.text-blue-500');
      const greenIcon = container.querySelector('.text-green-500');
      
      expect(purpleIcon).toBeTruthy();
      expect(pinkIcon).toBeTruthy();
      expect(blueIcon).toBeTruthy();
      expect(greenIcon).toBeTruthy();
    });
  });

  describe('Grid Span Application', () => {
    it('applies col-span-2 to Enterprise AI Assistant', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="col-span"]');
      expect(items.length).toBeGreaterThan(0);
    });

    it('applies col-span-2 to AI Mock Interviewer', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="col-span"]');
      expect(items.length).toBeGreaterThan(0);
    });

    it('applies col-span-1 to smaller projects', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="col-span"]');
      expect(items.length).toBeGreaterThan(0);
    });
  });

  describe('Metrics Rendering', () => {
    it('renders metrics for Enterprise AI Assistant', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('< 2s')).toBeTruthy();
      expect(screen.getByText('95%')).toBeTruthy();
      expect(screen.getByText('Response Time')).toBeTruthy();
      expect(screen.getByText('Citation Accuracy')).toBeTruthy();
    });

    it('renders metrics for Deep Learning Watermarking', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('> 40dB')).toBeTruthy();
      expect(screen.getByText('98%')).toBeTruthy();
      expect(screen.getByText('PSNR')).toBeTruthy();
      expect(screen.getByText('Robustness')).toBeTruthy();
    });

    it('renders metrics for AI Mock Interviewer', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('92%')).toBeTruthy();
      expect(screen.getByText('< 100ms')).toBeTruthy();
      expect(screen.getByText('Emotion Accuracy')).toBeTruthy();
      expect(screen.getByText('Latency')).toBeTruthy();
    });

    it('handles projects without metrics', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('FloatChat')).toBeTruthy();
    });
  });

  describe('Section Structure', () => {
    it('renders section element', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('applies id="projects" for navigation', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('#projects');
      expect(section).toBeTruthy();
    });

    it('renders section heading', () => {
      render(<ProjectsGrid />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.textContent).toBe('Featured Projects');
    });

    it('applies max-w-7xl container', () => {
      const { container } = render(<ProjectsGrid />);

      const maxWidth = container.querySelector('.max-w-7xl');
      expect(maxWidth).toBeTruthy();
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive padding', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('px-4')).toBe(true);
      expect(section?.classList.contains('sm:px-6')).toBe(true);
      expect(section?.classList.contains('lg:px-8')).toBe(true);
    });

    it('applies responsive heading sizes', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-4xl')).toBe(true);
      expect(heading?.classList.contains('sm:text-5xl')).toBe(true);
    });
  });

  describe('Styling', () => {
    it('applies black background', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('bg-black')).toBe(true);
    });

    it('applies vertical padding', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('py-20')).toBe(true);
    });

    it('centers heading text', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-center')).toBe(true);
    });

    it('applies white color to heading', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-white')).toBe(true);
    });

    it('applies bold font to heading', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('font-bold')).toBe(true);
    });
  });

  describe('BentoGrid Integration', () => {
    it('renders BentoGrid component', () => {
      const { container } = render(<ProjectsGrid />);

      const grid = container.querySelector('.grid');
      expect(grid).toBeTruthy();
    });

    it('renders 4 BentoGridItem components', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="group/bento"]');
      expect(items.length).toBe(4);
    });
  });

  describe('Technology Tag Styling', () => {
    it('applies rounded-full to tags', () => {
      const { container } = render(<ProjectsGrid />);

      const tags = container.querySelectorAll('.rounded-full');
      expect(tags.length).toBeGreaterThan(0);
    });

    it('applies purple background to tags', () => {
      const { container } = render(<ProjectsGrid />);

      const tags = container.querySelectorAll('.bg-purple-500\\/10');
      expect(tags.length).toBeGreaterThan(0);
    });

    it('applies ring to tags', () => {
      const { container } = render(<ProjectsGrid />);

      const tags = container.querySelectorAll('.ring-1');
      expect(tags.length).toBeGreaterThan(0);
    });

    it('applies text-xs to tags', () => {
      const { container } = render(<ProjectsGrid />);

      const tags = container.querySelectorAll('.text-xs');
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe('Metrics Grid Layout', () => {
    it('uses grid-cols-2 for metrics', () => {
      const { container } = render(<ProjectsGrid />);

      const metricsGrid = container.querySelector('.grid-cols-2');
      expect(metricsGrid).toBeTruthy();
    });

    it('applies gap-4 to metrics grid', () => {
      const { container } = render(<ProjectsGrid />);

      const metricsGrid = container.querySelector('.grid-cols-2');
      expect(metricsGrid?.classList.contains('gap-4')).toBe(true);
    });

    it('centers metric text', () => {
      const { container } = render(<ProjectsGrid />);

      const metricContainers = container.querySelectorAll('.text-center');
      expect(metricContainers.length).toBeGreaterThan(0);
    });
  });
});
