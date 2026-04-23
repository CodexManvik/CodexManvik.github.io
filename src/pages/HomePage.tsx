import { Hero } from '../sections/Hero';
import { Journey } from '../sections/Journey';
import { Projects } from '../sections/Projects';
import { Experience } from '../sections/Experience';
import { Achievements } from '../sections/Achievements';
import { Skills } from '../sections/Skills';
import { Footer } from '../sections/Footer';

export function HomePage() {
  return (
    <main>
      <Hero />
      <Journey />
      <Projects />
      <Experience />
      <Achievements />
      <Skills />
      <Footer />
    </main>
  );
}
