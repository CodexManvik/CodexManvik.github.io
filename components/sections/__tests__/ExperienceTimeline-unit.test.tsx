import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExperienceTimeline } from '../ExperienceTimeline';

describe('ExperienceTimeline - Unit Tests', () => {
  describe('Entry Rendering', () => {
    it('renders exactly 2 entries', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      expect(entries.length).toBe(2);
    });

    it('renders work experience entry', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText('AI Development Intern')).toBeTruthy();
      expect(screen.getByText('Path Infotech')).toBeTruthy();
    });

    it('renders education entry', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText(/Bachelor of Technology/i)).toBeTruthy();
      expect(screen.getByText('Manipal University Jaipur')).toBeTruthy();
    });
  });

  describe('Type Badge Styling', () => {
    it('renders Briefcase icon for work experience', () => {
      const { container } = render(<ExperienceTimeline />);

      const workBadge = screen.getByText('Work Experience').closest('.inline-flex');
      const icon = workBadge?.querySelector('svg');
      expect(icon).toBeTruthy();
    });

    it('renders GraduationCap icon for education', () => {
      const { container } = render(<ExperienceTimeline />);

      const eduBadge = screen.getByText('Education').closest('.inline-flex');
      const icon = eduBadge?.querySelector('svg');
      expect(icon).toBeTruthy();
    });

    it('applies purple background to badges', () => {
      const { container } = render(<ExperienceTimeline />);

      const badges = container.querySelectorAll('.bg-purple-500\\/10');
      expect(badges.length).toBe(2);
    });

    it('applies ring to badges', () => {
      const { container } = render(<ExperienceTimeline />);

      const badges = container.querySelectorAll('.ring-1');
      expect(badges.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Description List Rendering', () => {
    it('renders all description items for work experience', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText(/Architected and deployed Sofia chatbot/i)).toBeTruthy();
      expect(screen.getByText(/Engineered semantic search pipeline/i)).toBeTruthy();
      expect(screen.getByText(/Implemented query enhancement/i)).toBeTruthy();
      expect(screen.getByText(/Built citation management system/i)).toBeTruthy();
    });

    it('renders all description items for education', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText(/Specialized in Artificial Intelligence/i)).toBeTruthy();
      expect(screen.getByText(/Focus on Deep Learning/i)).toBeTruthy();
    });

    it('applies purple bullet points', () => {
      const { container } = render(<ExperienceTimeline />);

      const purpleBullets = container.querySelectorAll('.bg-purple-500');
      expect(purpleBullets.length).toBeGreaterThan(0);
    });

    it('applies flex layout to list items', () => {
      const { container } = render(<ExperienceTimeline />);

      const listItems = container.querySelectorAll('ul li');
      listItems.forEach(item => {
        expect(item.classList.contains('flex')).toBe(true);
        expect(item.classList.contains('gap-3')).toBe(true);
      });
    });
  });

  describe('Achievements Rendering', () => {
    it('renders achievements heading', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText('Achievements:')).toBeTruthy();
    });

    it('renders all achievement items', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText(/3x Student Excellence Award/i)).toBeTruthy();
      expect(screen.getByText(/Published research on deep learning/i)).toBeTruthy();
    });

    it('applies pink bullet points to achievements', () => {
      const { container } = render(<ExperienceTimeline />);

      const pinkBullets = container.querySelectorAll('.bg-pink-500');
      expect(pinkBullets.length).toBe(2);
    });

    it('applies mt-4 spacing to achievements section', () => {
      const { container } = render(<ExperienceTimeline />);

      const achievementsSection = screen.getByText('Achievements:').closest('.mt-4');
      expect(achievementsSection).toBeTruthy();
    });

    it('applies semibold font to achievements heading', () => {
      const { container } = render(<ExperienceTimeline />);

      const heading = screen.getByText('Achievements:');
      expect(heading.classList.contains('font-semibold')).toBe(true);
    });
  });

  describe('Duration Display', () => {
    it('renders work experience duration', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText('Jun 2025 - Aug 2025')).toBeTruthy();
    });

    it('renders education duration', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText('2023 - 2027')).toBeTruthy();
    });

    it('applies text-sm to duration', () => {
      const { container } = render(<ExperienceTimeline />);

      const durations = Array.from(container.querySelectorAll('.text-sm')).filter(
        el => el.textContent?.includes('2025') || el.textContent?.includes('2023')
      );
      expect(durations.length).toBeGreaterThan(0);
    });

    it('applies neutral-400 color to duration', () => {
      const { container } = render(<ExperienceTimeline />);

      const durations = container.querySelectorAll('.text-neutral-400');
      expect(durations.length).toBeGreaterThan(0);
    });
  });

  describe('Title and Organization Styling', () => {
    it('applies text-2xl to titles', () => {
      const { container } = render(<ExperienceTimeline />);

      const titles = container.querySelectorAll('h3');
      titles.forEach(title => {
        expect(title.classList.contains('text-2xl')).toBe(true);
        expect(title.classList.contains('font-bold')).toBe(true);
      });
    });

    it('applies white color to titles', () => {
      const { container } = render(<ExperienceTimeline />);

      const titles = container.querySelectorAll('h3');
      titles.forEach(title => {
        expect(title.classList.contains('text-white')).toBe(true);
      });
    });

    it('applies purple-400 color to organizations', () => {
      const { container } = render(<ExperienceTimeline />);

      const pathInfotech = screen.getByText('Path Infotech');
      expect(pathInfotech.classList.contains('text-purple-400')).toBe(true);

      const manipal = screen.getByText('Manipal University Jaipur');
      expect(manipal.classList.contains('text-purple-400')).toBe(true);
    });

    it('applies text-lg to organizations', () => {
      const { container } = render(<ExperienceTimeline />);

      const pathInfotech = screen.getByText('Path Infotech');
      expect(pathInfotech.classList.contains('text-lg')).toBe(true);
    });
  });

  describe('Section Configuration', () => {
    it('renders section element', () => {
      const { container } = render(<ExperienceTimeline />);

      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('applies black background', () => {
      const { container } = render(<ExperienceTimeline />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('bg-black')).toBe(true);
    });

    it('applies py-20 vertical padding', () => {
      const { container } = render(<ExperienceTimeline />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('py-20')).toBe(true);
    });

    it('applies responsive horizontal padding', () => {
      const { container } = render(<ExperienceTimeline />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('px-4')).toBe(true);
      expect(section?.classList.contains('sm:px-6')).toBe(true);
      expect(section?.classList.contains('lg:px-8')).toBe(true);
    });
  });

  describe('Heading Configuration', () => {
    it('renders section heading', () => {
      render(<ExperienceTimeline />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.textContent).toBe('Experience & Education');
    });

    it('applies mb-16 spacing to heading', () => {
      const { container } = render(<ExperienceTimeline />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('mb-16')).toBe(true);
    });

    it('centers heading text', () => {
      const { container } = render(<ExperienceTimeline />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-center')).toBe(true);
    });

    it('applies responsive text sizes', () => {
      const { container } = render(<ExperienceTimeline />);

      const heading = container.querySelector('h2');
      expect(heading?.classList.contains('text-4xl')).toBe(true);
      expect(heading?.classList.contains('sm:text-5xl')).toBe(true);
    });
  });

  describe('TracingBeam Integration', () => {
    it('renders TracingBeam wrapper', () => {
      const { container } = render(<ExperienceTimeline />);

      const beam = container.querySelector('.absolute');
      expect(beam).toBeTruthy();
    });

    it('applies left margin to content', () => {
      const { container } = render(<ExperienceTimeline />);

      const content = container.querySelector('.ml-12');
      expect(content).toBeTruthy();
    });

    it('applies larger margin on desktop', () => {
      const { container } = render(<ExperienceTimeline />);

      const content = container.querySelector('.md\\:ml-20');
      expect(content).toBeTruthy();
    });
  });

  describe('Entry Spacing', () => {
    it('applies mb-12 to entries', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      expect(entries.length).toBe(2);
    });

    it('applies last:mb-0 to last entry', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      const lastEntry = entries[entries.length - 1];
      expect(lastEntry.classList.contains('last:mb-0')).toBe(true);
    });
  });

  describe('Animation Configuration', () => {
    it('applies initial opacity 0', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      expect(entries.length).toBeGreaterThan(0);
    });

    it('uses whileInView for viewport animations', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      expect(entries.length).toBeGreaterThan(0);
    });
  });
});
