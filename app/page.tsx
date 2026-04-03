import { Hero } from '@/components/sections/Hero';
import { TechStackMarquee } from '@/components/sections/TechStackMarquee';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { GitHubActivity } from '@/components/sections/GitHubActivity';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <TechStackMarquee />
      <ProjectsGrid />
      <GitHubActivity />
      <ExperienceTimeline />
      <Contact />
    </main>
  );
}
