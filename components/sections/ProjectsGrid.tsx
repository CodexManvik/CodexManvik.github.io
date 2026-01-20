'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { ProjectModal } from '@/components/ui/project-modal';
import { Code2, Sparkles, Database, Brain } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'Path Infotech': <Brain className="h-6 w-6 text-purple-500" />,
  'Research Project': <Sparkles className="h-6 w-6 text-pink-500" />,
  'Personal Project': <Code2 className="h-6 w-6 text-blue-500" />,
  'Academic Project': <Database className="h-6 w-6 text-green-500" />,
};

export function ProjectsGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section 
      id="projects" 
      className="relative bg-black py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2 
          id="projects-heading"
          className="mb-12 text-center text-4xl font-bold text-white sm:text-5xl"
        >
          Featured Projects
        </h2>

        <BentoGrid>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedId(project.id);
                }
              }}
              aria-label={`View details for ${project.title}`}
            >
              <BentoGridItem
                title={project.title}
                description={project.description}
                gridSpan={project.gridSpan}
                icon={iconMap[project.company]}
                header={
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        role="listitem"
                        className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 ring-1 ring-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                }
              >
                {project.metrics && (
                  <div className="mt-4 grid grid-cols-2 gap-4" role="list" aria-label="Project metrics">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center" role="listitem">
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-neutral-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </BentoGridItem>
            </div>
          ))}
        </BentoGrid>
      </div>

      <ProjectModal selectedId={selectedId} onClose={() => setSelectedId(null)} />
    </section>
  );
}
