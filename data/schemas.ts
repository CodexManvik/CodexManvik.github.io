import { z } from 'zod';

// Project schema
export const ProjectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(100),
  company: z.string().min(1),
  description: z.string().min(10).max(500),
  technologies: z.array(z.string()).min(1),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ).optional(),
  link: z.string().url().optional(),
  gridSpan: z.object({
    cols: z.number().int().min(1).max(3),
    rows: z.number().int().min(1).max(2),
  }),
});

export type Project = z.infer<typeof ProjectSchema>;

// Experience Entry schema
export const ExperienceEntrySchema = z.object({
  id: z.string().min(1),
  type: z.enum(['work', 'education']),
  title: z.string().min(1).max(100),
  organization: z.string().min(1).max(100),
  duration: z.string().min(1),
  description: z.array(z.string()).min(1),
  achievements: z.array(z.string()).optional(),
});

export type ExperienceEntry = z.infer<typeof ExperienceEntrySchema>;

// Tech Stack Item schema
export const TechStackItemSchema = z.object({
  name: z.string().min(1).max(50),
  icon: z.string().min(1),
});

export type TechStackItem = z.infer<typeof TechStackItemSchema>;

// Validation functions
export function validateProjects(data: unknown) {
  try {
    const validated = z.array(ProjectSchema).parse(data);
    return {
      success: true as const,
      data: validated,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        data: null,
        errors: error.issues,
      };
    }
    return {
      success: false as const,
      data: null,
      errors: [{ message: 'Unknown validation error', path: [], code: 'custom' as const }],
    };
  }
}

export function validateExperience(data: unknown) {
  try {
    const validated = z.array(ExperienceEntrySchema).parse(data);
    return {
      success: true as const,
      data: validated,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        data: null,
        errors: error.issues,
      };
    }
    return {
      success: false as const,
      data: null,
      errors: [{ message: 'Unknown validation error', path: [], code: 'custom' as const }],
    };
  }
}

export function validateTechStack(data: unknown) {
  try {
    const validated = z.array(TechStackItemSchema).parse(data);
    return {
      success: true as const,
      data: validated,
      errors: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        data: null,
        errors: error.issues,
      };
    }
    return {
      success: false as const,
      data: null,
      errors: [{ message: 'Unknown validation error', path: [], code: 'custom' as const }],
    };
  }
}
