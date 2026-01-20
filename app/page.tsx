import { Hero } from '@/components/sections/Hero';
import { TechStackMarquee } from '@/components/sections/TechStackMarquee';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <TechStackMarquee />
      <ProjectsGrid />
      <ExperienceTimeline />
      <Contact />
    </main>
  );
}
