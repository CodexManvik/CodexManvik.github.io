import { useRef } from 'react';
import { Award, Trophy, Target } from 'lucide-react';
import { reveal, useReveal } from '../lib/reveal';

const achievements = [
  {
    title: '4x Student Excellence Award',
    description: 'Consistently recognized for outstanding academic and project performance.',
    icon: <Award size={20} />,
  },
  {
    title: 'SIH 2025 National Semi-Finalist',
    description: 'Smart India Hackathon 2025 national semi-finalist with FloatChat-AI: NL-to-SQL and semantic search over ARGO ocean data.',
    icon: <Trophy size={20} />,
  },
  {
    title: 'Dell x Google Ideathon Finalist',
    description: 'Finalist for an AI-powered solution at Dell x GDG Ideathon.',
    icon: <Target size={20} />,
  },
  {
    title: 'NPTEL Topper',
    description: 'Topped two NPTEL courses, Deep Learning and Design and Analysis of Algorithms, in the national online learning programme run by the IITs and IISc.',
    icon: <Award size={20} />,
  },
];

export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useReveal(sectionRef, () => {
    if (!titleRef.current || !gridRef.current) return;
    reveal(titleRef.current.children, titleRef.current, { y: 40 }, { duration: 0.8, stagger: 0.1 });
    reveal(gridRef.current.querySelectorAll('.achieve-card'), gridRef.current, { y: 40 }, { stagger: 0.12 });
  });

  return (
    <section id="achievements" ref={sectionRef} className="relative py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-14">
          <p className="font-mono-data text-xs tracking-widest uppercase mb-4" style={{ color: 'rgb(var(--accent))' }}>
            Recognition
          </p>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Achievements & <span className="text-gradient">Awards</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.title}
              className="achieve-card group relative rounded-2xl bg-[rgb(var(--bg-elevated))] border border-[rgba(var(--border),0.06)] p-6 hover:border-[rgba(var(--accent),0.15)] transition-all duration-500"
            >
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(var(--accent),0.08)', color: 'rgb(var(--accent))' }}>
                  {ach.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-[rgb(var(--fg))] mb-1 group-hover:text-gradient transition-all duration-300">
                    {ach.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
