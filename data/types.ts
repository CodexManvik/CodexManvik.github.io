export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  fullDetail: string;
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  repoUrl?: string;
  demoUrl?: string;
  image?: string;
  gridSpan?: {
    cols: number;
    rows: number;
  };
}

export interface ExperienceEntry {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  duration: string;
  description: string[];
  achievements?: string[];
}

export interface TechStackItem {
  name: string;
  icon: string;
}
