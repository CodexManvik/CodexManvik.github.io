import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectsGrid } from '../ProjectsGrid';

describe('ProjectsGrid - Unit Tests', () => {
  // Test rendering with all 4 projects
  describe('Project Rendering', () => {
    it('renders exactly 4 projects', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="group/bento"]');
      expect(items.length).toBe(4);
    });

    it('renders Enterprise AI Assistant project', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('Enterprise AI Assistant')).toBeTruthy();
      expect(screen.getByText(/Azure OpenAI-powered RAG system/i)).toBeTruthy();
    });

    it('renders Deep Learning Watermarking project', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('Deep Learning Watermarking')).toBeTruthy();
      expect(screen.getByText(/Invisible copyright protection/i)).toBeTruthy();
    });

    it('renders FloatChat project', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('FloatChat')).toBeTruthy();
      expect(screen.getByText(/Local RAG system using Qwen/i)).toBeTruthy();
    });

    it('renders AI Mock Interviewer project', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('AI Mock Interviewer')).toBeTruthy();
      expect(screen.getByText(/Real-time emotion and gaze analysis/i)).toBeTruthy();
    });
  });

  // Test technology tag rendering
  describe('Technology Tag Rendering', () => {
    it('renders all technologies for Enterprise AI Assistant', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('Azure OpenAI')).toBeTruthy();
      const pythonTags = screen.getAllByText('Python');
      expect(pythonTags.length).toBeGreaterThan(0);
      expect(screen.getByText('FastAPI')).toBeTruthy();
      const chromaDBTags = screen.getAllByText('ChromaDB');
      expect(chromaDBTags.length).toBeGreaterThan(0);
      expect(screen.getByText('Docker')).toBeTruthy();
    });

    it('renders all technologies for Deep Learning Watermarking', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('PyTorch')).toBeTruthy();
      expect(screen.getByText('CNN')).toBeTruthy();
      expect(screen.getByText('Image Processing')).toBeTruthy();
    });

    it('renders all technologies for FloatChat', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('Qwen')).toBeTruthy();
      expect(screen.getByText('Streamlit')).toBeTruthy();
    });

    it('renders all technologies for AI Mock Interviewer', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('OpenCV')).toBeTruthy();
      expect(screen.getByText('TensorFlow')).toBeTruthy();
      expect(screen.getByText('MediaPipe')).toBeTruthy();
    });

    it('applies consistent tag styling', () => {
      const { container } = render(<ProjectsGrid />);

      const tags = container.querySelectorAll('.rounded-full');
      
      tags.forEach(tag => {
        expect(tag.classList.contains('bg-purple-500/10')).toBe(true);
        expect(tag.classList.contains('px-3')).toBe(true);
        expect(tag.classList.contains('py-1')).toBe(true);
        expect(tag.classList.contains('text-xs')).toBe(true);
        expect(tag.classList.contains('font-medium')).toBe(true);
        expect(tag.classList.contains('text-purple-300')).toBe(true);
        expect(tag.classList.contains('ring-1')).toBe(true);
      });
    });

    it('wraps tags in flex container', () => {
      const { container } = render(<ProjectsGrid />);

      const tagContainers = container.querySelectorAll('.flex-wrap');
      expect(tagContainers.length).toBe(4);
    });

    it('applies gap-2 to tag containers', () => {
      const { container } = render(<ProjectsGrid />);

      const tagContainers = container.querySelectorAll('.flex-wrap');
      tagContainers.forEach(container => {
        expect(container.classList.contains('gap-2')).toBe(true);
      });
    });
  });

  // Test grid span application
  describe('Grid Span Application', () => {
    it('applies md:col-span-2 to Enterprise AI Assistant', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="group/bento"]');
      const firstItem = items[0];
      
      expect(firstItem.classList.contains('md:col-span-2')).toBe(true);
    });

    it('applies md:row-span-1 to Enterprise AI Assistant', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="group/bento"]');
      const firstItem = items[0];
      
      expect(firstItem.classList.contains('md:row-span-1')).toBe(true);
    });

    it('applies md:col-span-1 to Deep Learning Watermarking', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="group/bento"]');
      const secondItem = items[1];
      
      expect(secondItem.classList.contains('md:col-span-1')).toBe(true);
    });

    it('applies md:col-span-1 to FloatChat', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="group/bento"]');
      const thirdItem = items[2];
      
      expect(thirdItem.classList.contains('md:col-span-1')).toBe(true);
    });

    it('applies md:col-span-2 to AI Mock Interviewer', () => {
      const { container } = render(<ProjectsGrid />);

      const items = container.querySelectorAll('[class*="group/bento"]');
      const fourthItem = items[3];
      
      expect(fourthItem.classList.contains('md:col-span-2')).toBe(true);
    });
  });

  describe('Project Icons', () => {
    it('renders Brain icon for Path Infotech', () => {
      const { container } = render(<ProjectsGrid />);

      const brainIcon = container.querySelector('.text-purple-500');
      expect(brainIcon).toBeTruthy();
    });

    it('renders Sparkles icon for Research Project', () => {
      const { container } = render(<ProjectsGrid />);

      const sparklesIcon = container.querySelector('.text-pink-500');
      expect(sparklesIcon).toBeTruthy();
    });

    it('renders Code2 icon for Personal Project', () => {
      const { container } = render(<ProjectsGrid />);

      const code2Icon = container.querySelector('.text-blue-500');
      expect(code2Icon).toBeTruthy();
    });

    it('renders Database icon for Academic Project', () => {
      const { container } = render(<ProjectsGrid />);

      const databaseIcon = container.querySelector('.text-green-500');
      expect(databaseIcon).toBeTruthy();
    });

    it('applies h-6 w-6 to all icons', () => {
      const { container } = render(<ProjectsGrid />);

      const purpleIcon = container.querySelector('.text-purple-500');
      const pinkIcon = container.querySelector('.text-pink-500');
      const blueIcon = container.querySelector('.text-blue-500');
      const greenIcon = container.querySelector('.text-green-500');
      
      [purpleIcon, pinkIcon, blueIcon, greenIcon].forEach(icon => {
        expect(icon?.classList.contains('h-6')).toBe(true);
        expect(icon?.classList.contains('w-6')).toBe(true);
      });
    });
  });

  describe('Metrics Display', () => {
    it('displays Response Time metric for Enterprise AI Assistant', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('< 2s')).toBeTruthy();
      expect(screen.getByText('Response Time')).toBeTruthy();
    });

    it('displays Citation Accuracy metric for Enterprise AI Assistant', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('95%')).toBeTruthy();
      expect(screen.getByText('Citation Accuracy')).toBeTruthy();
    });

    it('displays PSNR metric for Deep Learning Watermarking', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('> 40dB')).toBeTruthy();
      expect(screen.getByText('PSNR')).toBeTruthy();
    });

    it('displays Robustness metric for Deep Learning Watermarking', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('98%')).toBeTruthy();
      expect(screen.getByText('Robustness')).toBeTruthy();
    });

    it('displays Emotion Accuracy metric for AI Mock Interviewer', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('92%')).toBeTruthy();
      expect(screen.getByText('Emotion Accuracy')).toBeTruthy();
    });

    it('displays Latency metric for AI Mock Interviewer', () => {
      render(<ProjectsGrid />);

      expect(screen.getByText('< 100ms')).toBeTruthy();
      expect(screen.getByText('Latency')).toBeTruthy();
    });

    it('does not display metrics for FloatChat', () => {
      const { container } = render(<ProjectsGrid />);

      const floatChatItem = Array.from(container.querySelectorAll('h3'))
        .find(h3 => h3.textContent === 'FloatChat')
        ?.closest('[class*="group/bento"]');
      
      const metricsGrid = floatChatItem?.querySelector('.grid-cols-2');
      expect(metricsGrid).toBeFalsy();
    });
  });

  describe('Metrics Styling', () => {
    it('applies grid-cols-2 to metrics container', () => {
      const { container } = render(<ProjectsGrid />);

      const metricsGrids = container.querySelectorAll('.grid-cols-2');
      expect(metricsGrids.length).toBe(3); // 3 projects have metrics
    });

    it('applies gap-4 to metrics container', () => {
      const { container } = render(<ProjectsGrid />);

      const metricsGrids = container.querySelectorAll('.grid-cols-2');
      metricsGrids.forEach(grid => {
        expect(grid.classList.contains('gap-4')).toBe(true);
      });
    });

    it('applies mt-4 to metrics container', () => {
      const { container } = render(<ProjectsGrid />);

      const metricsGrids = container.querySelectorAll('.grid-cols-2');
      metricsGrids.forEach(grid => {
        expect(grid.classList.contains('mt-4')).toBe(true);
      });
    });

    it('centers metric text', () => {
      const { container } = render(<ProjectsGrid />);

      const metricContainers = container.querySelectorAll('.grid-cols-2 > div');
      metricContainers.forEach(metric => {
        expect(metric.classList.contains('text-center')).toBe(true);
      });
    });

    it('applies text-2xl to metric values', () => {
      const { container } = render(<ProjectsGrid />);

      const metricValues = container.querySelectorAll('.text-2xl');
      expect(metricValues.length).toBeGreaterThan(0);
      
      metricValues.forEach(value => {
        expect(value.classList.contains('font-bold')).toBe(true);
        expect(value.classList.contains('text-white')).toBe(true);
      });
    });

    it('applies text-xs to metric labels', () => {
      const { container } = render(<ProjectsGrid />);

      const metricLabels = Array.from(container.querySelectorAll('.text-xs'))
        .filter(el => el.classList.contains('text-neutral-400'));
      
      expect(metricLabels.length).toBeGreaterThan(0);
    });
  });

  describe('Section Configuration', () => {
    it('applies id="projects" for scroll navigation', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('#projects');
      expect(section).toBeTruthy();
    });

    it('applies relative positioning', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('relative')).toBe(true);
    });

    it('applies black background', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('bg-black')).toBe(true);
    });

    it('applies py-20 vertical padding', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('py-20')).toBe(true);
    });

    it('applies responsive horizontal padding', () => {
      const { container } = render(<ProjectsGrid />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('px-4')).toBe(true);
      expect(section?.classList.contains('sm:px-6')).toBe(true);
      expect(section?.classList.contains('lg:px-8')).toBe(true);
    });
  });

  describe('Heading Configuration', () => {
    it('renders "Featured Projects" heading', () => {
      render(<ProjectsGrid />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.textContent).toBe('Featured Projects');
    });

    it('applies mb-12 spacing to heading', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('mb-12')).toBe(true);
    });

    it('centers heading text', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-center')).toBe(true);
    });

    it('applies responsive text sizes to heading', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-4xl')).toBe(true);
      expect(heading?.classList.contains('sm:text-5xl')).toBe(true);
    });

    it('applies bold font to heading', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('font-bold')).toBe(true);
    });

    it('applies white color to heading', () => {
      const { container } = render(<ProjectsGrid />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-white')).toBe(true);
    });
  });

  describe('Container Configuration', () => {
    it('applies mx-auto to center container', () => {
      const { container } = render(<ProjectsGrid />);

      const maxWidth = container.querySelector('.max-w-7xl');
      expect(maxWidth?.classList.contains('mx-auto')).toBe(true);
    });

    it('applies max-w-7xl constraint', () => {
      const { container } = render(<ProjectsGrid />);

      const maxWidth = container.querySelector('.max-w-7xl');
      expect(maxWidth).toBeTruthy();
    });
  });

  describe('BentoGrid Usage', () => {
    it('renders BentoGrid wrapper', () => {
      const { container } = render(<ProjectsGrid />);

      const grid = container.querySelector('.grid');
      expect(grid).toBeTruthy();
    });

    it('applies responsive grid columns', () => {
      const { container } = render(<ProjectsGrid />);

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('grid-cols-1')).toBe(true);
      expect(grid?.classList.contains('md:grid-cols-2')).toBe(true);
      expect(grid?.classList.contains('lg:grid-cols-3')).toBe(true);
    });

    it('applies responsive gap', () => {
      const { container } = render(<ProjectsGrid />);

      const grid = container.querySelector('.grid');
      expect(grid?.classList.contains('gap-4')).toBe(true);
      expect(grid?.classList.contains('md:gap-6')).toBe(true);
    });
  });
});
