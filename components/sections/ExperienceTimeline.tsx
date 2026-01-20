'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/experience';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { Briefcase, GraduationCap } from 'lucide-react';

export function ExperienceTimeline() {
  // Sort in reverse chronological order (newest first)
  const sortedExperience = [...experience].sort((a, b) => {
    // Simple heuristic: work entries before education, then by duration string
    if (a.type !== b.type) {
      return a.type === 'work' ? -1 : 1;
    }
    return 0;
  });

  return (
    <section className="relative bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-white sm:text-5xl">
          Experience & Education
        </h2>

        <TracingBeam>
          {sortedExperience.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 last:mb-0"
            >
              {/* Type Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 ring-1 ring-purple-500/20">
                {entry.type === 'work' ? (
                  <Briefcase className="h-4 w-4 text-purple-400" />
                ) : (
                  <GraduationCap className="h-4 w-4 text-pink-400" />
                )}
                <span className="text-sm font-medium text-purple-300">
                  {entry.type === 'work' ? 'Work Experience' : 'Education'}
                </span>
              </div>

              {/* Duration */}
              <div className="mb-2 text-sm text-neutral-400">{entry.duration}</div>

              {/* Title & Organization */}
              <h3 className="mb-1 text-2xl font-bold text-white">{entry.title}</h3>
              <div className="mb-4 text-lg text-purple-400">{entry.organization}</div>

              {/* Description */}
              <ul className="space-y-2">
                {entry.description.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-neutral-300">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Achievements (if present) */}
              {entry.achievements && entry.achievements.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 text-sm font-semibold text-white">Achievements:</div>
                  <ul className="space-y-2">
                    {entry.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-3 text-neutral-300">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-500" />
                        <span className="text-sm leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </TracingBeam>
      </div>
    </section>
  );
}
