'use client';

import { techStack } from '@/data/experience';
import { InfiniteMovingCards } from '@/components/ui/infinite-cards';

export function TechStackMarquee() {
  return (
    <section className="relative bg-neutral-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-bold text-white sm:text-5xl">
          Tech Stack
        </h2>

        <InfiniteMovingCards
          items={techStack}
          speed="normal"
          pauseOnHover={true}
          direction="left"
        />
      </div>
    </section>
  );
}
