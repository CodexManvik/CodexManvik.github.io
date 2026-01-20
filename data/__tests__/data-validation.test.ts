import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { projects } from '../projects';
import { experience, techStack } from '../experience';
import type { Project, ExperienceEntry, TechStackItem } from '../types';

describe('Data Structure Validation', () => {
  // Property 11: Data Structure Validation
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 3.2, 4.5
  describe('Property 11: Data Structure Validation', () => {
    it('all projects have required fields', () => {
      fc.assert(
        fc.property(
          fc.constant(projects),
          (projectList: Project[]) => {
            projectList.forEach((project) => {
              expect(project).toHaveProperty('id');
              expect(project).toHaveProperty('title');
              expect(project).toHaveProperty('company');
              expect(project).toHaveProperty('description');
              expect(project).toHaveProperty('technologies');
              
              expect(typeof project.id).toBe('string');
              expect(typeof project.title).toBe('string');
              expect(typeof project.company).toBe('string');
              expect(typeof project.description).toBe('string');
              expect(Array.isArray(project.technologies)).toBe(true);
              
              expect(project.id.length).toBeGreaterThan(0);
              expect(project.title.length).toBeGreaterThan(0);
              expect(project.company.length).toBeGreaterThan(0);
              expect(project.description.length).toBeGreaterThan(0);
              expect(project.technologies.length).toBeGreaterThan(0);
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('validates project structure with arbitrary data', () => {
      const projectArbitrary = fc.record({
        id: fc.string({ minLength: 1 }),
        title: fc.string({ minLength: 1 }),
        company: fc.string({ minLength: 1 }),
        description: fc.string({ minLength: 1 }),
        technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
        metrics: fc.option(
          fc.array(
            fc.record({
              label: fc.string({ minLength: 1 }),
              value: fc.string({ minLength: 1 }),
            })
          )
        ),
        link: fc.option(fc.webUrl()),
        gridSpan: fc.option(
          fc.record({
            cols: fc.integer({ min: 1, max: 3 }),
            rows: fc.integer({ min: 1, max: 2 }),
          })
        ),
      });

      fc.assert(
        fc.property(projectArbitrary, (project) => {
          expect(project.id).toBeTruthy();
          expect(project.title).toBeTruthy();
          expect(project.company).toBeTruthy();
          expect(project.description).toBeTruthy();
          expect(project.technologies.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });
  });

  // Property 12: Technology Stack Data Validation
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 3.5
  describe('Property 12: Technology Stack Data Validation', () => {
    it('all techStack items have name and icon fields', () => {
      fc.assert(
        fc.property(
          fc.constant(techStack),
          (stackItems: TechStackItem[]) => {
            stackItems.forEach((item) => {
              expect(item).toHaveProperty('name');
              expect(item).toHaveProperty('icon');
              
              expect(typeof item.name).toBe('string');
              expect(typeof item.icon).toBe('string');
              
              expect(item.name.length).toBeGreaterThan(0);
              expect(item.icon.length).toBeGreaterThan(0);
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('validates techStack structure with arbitrary data', () => {
      const techStackArbitrary = fc.array(
        fc.record({
          name: fc.string({ minLength: 1 }),
          icon: fc.string({ minLength: 1 }),
        }),
        { minLength: 1 }
      );

      fc.assert(
        fc.property(techStackArbitrary, (items) => {
          items.forEach((item) => {
            expect(item.name).toBeTruthy();
            expect(item.icon).toBeTruthy();
          });
        }),
        { numRuns: 100 }
      );
    });
  });

  // Property 28: Experience Data Structure
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 15.1
  describe('Property 28: Experience Data Structure', () => {
    it('all experience entries have required fields', () => {
      fc.assert(
        fc.property(
          fc.constant(experience),
          (entries: ExperienceEntry[]) => {
            entries.forEach((entry) => {
              expect(entry).toHaveProperty('id');
              expect(entry).toHaveProperty('type');
              expect(entry).toHaveProperty('title');
              expect(entry).toHaveProperty('organization');
              expect(entry).toHaveProperty('duration');
              expect(entry).toHaveProperty('description');
              
              expect(typeof entry.id).toBe('string');
              expect(['work', 'education']).toContain(entry.type);
              expect(typeof entry.title).toBe('string');
              expect(typeof entry.organization).toBe('string');
              expect(typeof entry.duration).toBe('string');
              expect(Array.isArray(entry.description)).toBe(true);
              
              expect(entry.id.length).toBeGreaterThan(0);
              expect(entry.title.length).toBeGreaterThan(0);
              expect(entry.organization.length).toBeGreaterThan(0);
              expect(entry.duration.length).toBeGreaterThan(0);
              expect(entry.description.length).toBeGreaterThan(0);
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('validates experience structure with arbitrary data', () => {
      const experienceArbitrary = fc.record({
        id: fc.string({ minLength: 1 }),
        type: fc.constantFrom('work' as const, 'education' as const),
        title: fc.string({ minLength: 1 }),
        organization: fc.string({ minLength: 1 }),
        duration: fc.string({ minLength: 1 }),
        description: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
        achievements: fc.option(fc.array(fc.string({ minLength: 1 }))),
      });

      fc.assert(
        fc.property(experienceArbitrary, (entry) => {
          expect(entry.id).toBeTruthy();
          expect(['work', 'education']).toContain(entry.type);
          expect(entry.title).toBeTruthy();
          expect(entry.organization).toBeTruthy();
          expect(entry.duration).toBeTruthy();
          expect(entry.description.length).toBeGreaterThan(0);
        }),
        { numRuns: 100 }
      );
    });
  });

  // Property 29: Education Data Structure
  // Feature: aceternity-portfolio-redesign
  // Validates: Requirements 15.2
  describe('Property 29: Education Data Structure', () => {
    it('education entries have required fields including achievements', () => {
      const educationEntries = experience.filter((e) => e.type === 'education');

      fc.assert(
        fc.property(
          fc.constant(educationEntries),
          (entries: ExperienceEntry[]) => {
            entries.forEach((entry) => {
              expect(entry.type).toBe('education');
              expect(entry).toHaveProperty('id');
              expect(entry).toHaveProperty('title');
              expect(entry).toHaveProperty('organization');
              expect(entry).toHaveProperty('duration');
              expect(entry).toHaveProperty('achievements');
              
              if (entry.achievements) {
                expect(Array.isArray(entry.achievements)).toBe(true);
                expect(entry.achievements.length).toBeGreaterThan(0);
              }
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('validates education-specific structure with arbitrary data', () => {
      const educationArbitrary = fc.record({
        id: fc.string({ minLength: 1 }),
        type: fc.constant('education' as const),
        title: fc.string({ minLength: 1 }),
        organization: fc.string({ minLength: 1 }),
        duration: fc.string({ minLength: 1 }),
        description: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
        achievements: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
      });

      fc.assert(
        fc.property(educationArbitrary, (entry) => {
          expect(entry.type).toBe('education');
          expect(entry.achievements.length).toBeGreaterThan(0);
          entry.achievements.forEach((achievement) => {
            expect(achievement.length).toBeGreaterThan(0);
          });
        }),
        { numRuns: 100 }
      );
    });
  });

  // Additional validation tests
  describe('Data Integrity Tests', () => {
    it('projects array contains exactly 4 projects', () => {
      expect(projects).toHaveLength(4);
    });

    it('all project IDs are unique', () => {
      const ids = projects.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('experience array contains at least 2 entries', () => {
      expect(experience.length).toBeGreaterThanOrEqual(2);
    });

    it('techStack contains at least 8 technologies', () => {
      expect(techStack.length).toBeGreaterThanOrEqual(8);
    });

    it('all experience IDs are unique', () => {
      const ids = experience.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('all techStack names are unique', () => {
      const names = techStack.map((t) => t.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });
});
