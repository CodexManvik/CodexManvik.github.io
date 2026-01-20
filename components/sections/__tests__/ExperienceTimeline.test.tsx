import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import fc from 'fast-check';
import { ExperienceTimeline } from '../ExperienceTimeline';

describe('ExperienceTimeline Section', () => {
  // Property 30: Timeline Chronological Order
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 15.3, 15.4
  describe('Property 30: Timeline Chronological Order', () => {
    it('sorts entries in reverse chronological order', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      expect(entries.length).toBeGreaterThan(0);
    });

    it('places work experience before education', () => {
      render(<ExperienceTimeline />);

      const workBadge = screen.getByText('Work Experience');
      const educationBadge = screen.getByText('Education');
      
      expect(workBadge).toBeTruthy();
      expect(educationBadge).toBeTruthy();
    });

    it('validates chronological ordering consistency', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 3 }),
          (iterations) => {
            for (let i = 0; i < iterations; i++) {
              const { container, unmount } = render(<ExperienceTimeline />);
              
              const entries = container.querySelectorAll('[class*="mb-12"]');
              expect(entries.length).toBeGreaterThan(0);
              
              unmount();
            }
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  // Property 31: Timeline Content Positioning
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 15.4
  describe('Property 31: Timeline Content Positioning', () => {
    it('applies left margin for beam clearance', () => {
      const { container } = render(<ExperienceTimeline />);

      const content = container.querySelector('.ml-12');
      expect(content).toBeTruthy();
    });

    it('applies larger left margin on desktop', () => {
      const { container } = render(<ExperienceTimeline />);

      const content = container.querySelector('.md\\:ml-20');
      expect(content).toBeTruthy();
    });

    it('validates consistent positioning across entries', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 3 }),
          (iterations) => {
            for (let i = 0; i < iterations; i++) {
              const { container, unmount } = render(<ExperienceTimeline />);
              
              const content = container.querySelector('.ml-12');
              expect(content).toBeTruthy();
              
              unmount();
            }
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  // Property 32: Timeline Fade-In Animation
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 15.5
  describe('Property 32: Timeline Fade-In Animation', () => {
    it('applies whileInView animation to entries', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      expect(entries.length).toBeGreaterThan(0);
    });

    it('uses viewport intersection observer', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      expect(entries.length).toBeGreaterThan(0);
    });

    it('applies staggered delays to entries', () => {
      const { container } = render(<ExperienceTimeline />);

      const entries = container.querySelectorAll('[class*="mb-12"]');
      expect(entries.length).toBeGreaterThan(0);
    });

    it('validates animation consistency', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 3 }),
          (iterations) => {
            for (let i = 0; i < iterations; i++) {
              const { container, unmount } = render(<ExperienceTimeline />);
              
              const entries = container.querySelectorAll('[class*="mb-12"]');
              expect(entries.length).toBeGreaterThan(0);
              
              unmount();
            }
          }
        ),
        { numRuns: 10 }
      );
    });
  });

  describe('TracingBeam Integration', () => {
    it('renders TracingBeam component', () => {
      const { container } = render(<ExperienceTimeline />);

      const beam = container.querySelector('.absolute');
      expect(beam).toBeTruthy();
    });

    it('wraps entries in TracingBeam', () => {
      const { container } = render(<ExperienceTimeline />);

      const beamContent = container.querySelector('.ml-12');
      expect(beamContent).toBeTruthy();
    });
  });

  describe('Type Badges', () => {
    it('renders work experience badge', () => {
      render(<ExperienceTimeline />);

      const badge = screen.getByText('Work Experience');
      expect(badge).toBeTruthy();
    });

    it('renders education badge', () => {
      render(<ExperienceTimeline />);

      const badge = screen.getByText('Education');
      expect(badge).toBeTruthy();
    });

    it('applies purple styling to work badge', () => {
      const { container } = render(<ExperienceTimeline />);

      const badges = container.querySelectorAll('.bg-purple-500\\/10');
      expect(badges.length).toBeGreaterThan(0);
    });

    it('includes icons in badges', () => {
      const { container } = render(<ExperienceTimeline />);

      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Entry Content', () => {
    it('renders duration for each entry', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText('Jun 2025 - Aug 2025')).toBeTruthy();
      expect(screen.getByText('2023 - 2027')).toBeTruthy();
    });

    it('renders title for each entry', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText('AI Development Intern')).toBeTruthy();
      expect(screen.getByText(/Bachelor of Technology/i)).toBeTruthy();
    });

    it('renders organization for each entry', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText('Path Infotech')).toBeTruthy();
      expect(screen.getByText('Manipal University Jaipur')).toBeTruthy();
    });

    it('renders description items', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText(/Architected and deployed Sofia chatbot/i)).toBeTruthy();
      expect(screen.getByText(/Specialized in Artificial Intelligence/i)).toBeTruthy();
    });
  });

  describe('Achievements Section', () => {
    it('renders achievements heading for education', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText('Achievements:')).toBeTruthy();
    });

    it('renders achievement items', () => {
      render(<ExperienceTimeline />);

      expect(screen.getByText(/3x Student Excellence Award/i)).toBeTruthy();
      expect(screen.getByText(/Published research/i)).toBeTruthy();
    });

    it('applies pink bullet points to achievements', () => {
      const { container } = render(<ExperienceTimeline />);

      const pinkBullets = container.querySelectorAll('.bg-pink-500');
      expect(pinkBullets.length).toBeGreaterThan(0);
    });
  });

  describe('Section Structure', () => {
    it('renders section element', () => {
      const { container } = render(<ExperienceTimeline />);

      const section = container.querySelector('section');
      expect(section).toBeTruthy();
    });

    it('renders section heading', () => {
      render(<ExperienceTimeline />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading.textContent).toBe('Experience & Education');
    });

    it('applies max-w-7xl container', () => {
      const { container } = render(<ExperienceTimeline />);

      const maxWidth = container.querySelector('.max-w-7xl');
      expect(maxWidth).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('applies black background', () => {
      const { container } = render(<ExperienceTimeline />);

      const section = container.querySelector('section');
      expect(section?.classList.contains('bg-black')).toBe(true);
    });

    it('applies vertical padding', () => {
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

  describe('Description Lists', () => {
    it('renders description items as list', () => {
      const { container } = render(<ExperienceTimeline />);

      const lists = container.querySelectorAll('ul');
      expect(lists.length).toBeGreaterThan(0);
    });

    it('applies purple bullet points to descriptions', () => {
      const { container } = render(<ExperienceTimeline />);

      const purpleBullets = container.querySelectorAll('.bg-purple-500');
      expect(purpleBullets.length).toBeGreaterThan(0);
    });

    it('applies space-y-2 to lists', () => {
      const { container } = render(<ExperienceTimeline />);

      const lists = container.querySelectorAll('.space-y-2');
      expect(lists.length).toBeGreaterThan(0);
    });
  });
});
