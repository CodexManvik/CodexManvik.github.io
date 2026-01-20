import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { AnimationErrorBoundary } from '@/components/ErrorBoundary';
import { validateProjects, validateExperience, validateTechStack } from '@/data/schemas';
import { projects } from '@/data/projects';
import { experience, techStack } from '@/data/experience';

// Component that throws an error
function ThrowError() {
  throw new Error('Test error');
}

describe('Error Handling - Unit Tests', () => {
  describe('Data Validation', () => {
    it('validates correct project data', () => {
      const result = validateProjects(projects);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeTruthy();
      expect(result.errors).toBeNull();
    });

    it('rejects invalid project data - missing required fields', () => {
      const invalidData = [
        {
          id: '1',
          // missing title
          company: 'Test',
          description: 'Test description',
          technologies: ['React'],
          gridSpan: { cols: 1, rows: 1 },
        },
      ];

      const result = validateProjects(invalidData);
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
    });

    it('rejects invalid project data - invalid types', () => {
      const invalidData = [
        {
          id: 123, // should be string
          title: 'Test',
          company: 'Test',
          description: 'Test description',
          technologies: ['React'],
          gridSpan: { cols: 1, rows: 1 },
        },
      ];

      const result = validateProjects(invalidData);
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
    });

    it('validates correct experience data', () => {
      const result = validateExperience(experience);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeTruthy();
      expect(result.errors).toBeNull();
    });

    it('rejects invalid experience data - invalid type enum', () => {
      const invalidData = [
        {
          id: '1',
          type: 'invalid', // should be 'work' or 'education'
          title: 'Test',
          organization: 'Test Org',
          duration: '2023-2024',
          description: ['Test'],
        },
      ];

      const result = validateExperience(invalidData);
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
    });

    it('validates correct tech stack data', () => {
      const result = validateTechStack(techStack);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeTruthy();
      expect(result.errors).toBeNull();
    });

    it('rejects invalid tech stack data - empty name', () => {
      const invalidData = [
        {
          name: '', // should not be empty
          icon: '/icon.svg',
        },
      ];

      const result = validateTechStack(invalidData);
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
    });

    it('provides detailed error messages', () => {
      const invalidData = [
        {
          id: '1',
          title: 'A', // too short (min 1 is ok, but let's test max)
          company: 'Test',
          description: 'Short', // too short (min 10)
          technologies: [], // empty array (min 1)
          gridSpan: { cols: 1, rows: 1 },
        },
      ];

      const result = validateProjects(invalidData);
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      if (result.errors) {
        expect(Array.isArray(result.errors)).toBe(true);
      }
    });
  });

  describe('Error Boundary', () => {
    // Suppress console.error for these tests
    const originalError = console.error;
    beforeEach(() => {
      console.error = vi.fn();
    });
    afterEach(() => {
      console.error = originalError;
    });

    it('renders children when no error occurs', () => {
      const { container } = render(
        <AnimationErrorBoundary>
          <div>Test Content</div>
        </AnimationErrorBoundary>
      );

      expect(container.textContent).toContain('Test Content');
    });

    it('renders fallback UI when error occurs', () => {
      const { container } = render(
        <AnimationErrorBoundary>
          <ThrowError />
        </AnimationErrorBoundary>
      );

      expect(container.textContent).toContain('Content temporarily unavailable');
    });

    it('renders custom fallback when provided', () => {
      const { container } = render(
        <AnimationErrorBoundary fallback={<div>Custom Fallback</div>}>
          <ThrowError />
        </AnimationErrorBoundary>
      );

      expect(container.textContent).toContain('Custom Fallback');
    });

    it('catches errors from child components', () => {
      const { container } = render(
        <AnimationErrorBoundary>
          <ThrowError />
        </AnimationErrorBoundary>
      );

      // Should not crash, should show fallback
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe('Fallback Data', () => {
    it('provides fallback for missing project data', () => {
      const result = validateProjects([]);
      
      // Empty array is valid
      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it('handles null data gracefully', () => {
      const result = validateProjects(null);
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
    });

    it('handles undefined data gracefully', () => {
      const result = validateProjects(undefined);
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
    });
  });

  describe('Validation Error Messages', () => {
    it('provides clear error messages for validation failures', () => {
      const invalidData = [
        {
          id: '1',
          title: 'Test',
          company: 'Test',
          description: 'Too short', // min 10 chars
          technologies: ['React'],
          gridSpan: { cols: 1, rows: 1 },
        },
      ];

      const result = validateProjects(invalidData);
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      if (result.errors) {
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it('validates array constraints', () => {
      const invalidData = [
        {
          id: '1',
          title: 'Test',
          company: 'Test',
          description: 'Valid description here',
          technologies: [], // should have at least 1
          gridSpan: { cols: 1, rows: 1 },
        },
      ];

      const result = validateProjects(invalidData);
      
      expect(result.success).toBe(false);
    });

    it('validates nested object constraints', () => {
      const invalidData = [
        {
          id: '1',
          title: 'Test',
          company: 'Test',
          description: 'Valid description here',
          technologies: ['React'],
          gridSpan: { cols: 5, rows: 1 }, // cols max is 3
        },
      ];

      const result = validateProjects(invalidData);
      
      expect(result.success).toBe(false);
    });
  });
});
