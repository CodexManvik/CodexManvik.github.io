import { ExperienceEntry, TechStackItem } from './types';

export const experience: ExperienceEntry[] = [
  {
    id: 'path-infotech',
    type: 'work',
    title: 'AI Development Intern',
    organization: 'Path Infotech',
    duration: 'Jun 2025 - Aug 2025',
    description: [
      'Architected and deployed Sofia chatbot with React/Next.js frontend and Python Flask backend, achieving 99.9% uptime while scaling to 100+ concurrent users',
      'Engineered semantic search pipeline using Azure Cognitive Search with custom skillsets for PDF text/image indexing and Azure OpenAI embeddings',
      'Implemented query enhancement and summarization using Azure OpenAI ChatCompletionSkill, reducing API response time by 25% through optimized routing',
      'Built citation management system with MySQL database for tagging and metadata, enabling clickable source references in chat responses',
    ],
  },
  {
    id: 'education',
    type: 'education',
    title: 'Bachelor of Technology in Computer Science (AI/ML)',
    organization: 'Manipal University Jaipur',
    duration: '2023 - 2027',
    description: [
      'Specialized in Artificial Intelligence and Machine Learning',
      'Focus on Deep Learning, RAG systems, and Computer Vision',
    ],
    achievements: [
      '3x Student Excellence Award (2025)',
      'Published research on deep learning watermarking techniques',
    ],
  },
];

export const techStack: TechStackItem[] = [
  { name: 'Python', icon: 'Code' },
  { name: 'PyTorch', icon: 'Flame' },
  { name: 'TensorFlow', icon: 'Brain' },
  { name: 'Azure OpenAI', icon: 'Cloud' },
  { name: 'FastAPI', icon: 'Zap' },
  { name: 'ChromaDB', icon: 'Database' },
  { name: 'Docker', icon: 'Box' },
  { name: 'OpenCV', icon: 'Eye' },
  { name: 'React', icon: 'Atom' },
  { name: 'Next.js', icon: 'Triangle' },
  { name: 'TypeScript', icon: 'FileCode2' },
  { name: 'Tailwind CSS', icon: 'Palette' },
];
