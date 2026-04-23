import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Trophy, Target, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    title: '4x Student Excellence Award',
    description: 'Consistently recognized for outstanding academic and project performance.',
    icon: <Award size={20} />,
  },
  {
    title: 'SIH 2025 All India Round',
    description: 'Selected for Smart India Hackathon 2025 All India Round.',
    icon: <Trophy size={20} />,
  },
  {
    title: 'Dell x Google Ideathon Finalist',
    description: 'Finalist for an AI-powered solution at Dell x GDG Ideathon.',
    icon: <Target size={20} />,
  },
  {
    title: 'Google Big Code Challenge',
    description: 'Ranked top 15,000 across India.',
    icon: <Code2 size={20} />,
  },
];

export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !gridRef.current) return;

    gsap.fromTo(titleRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
    });

    const cards = gridRef.current.querySelectorAll('.achieve-card');
    gsap.fromTo(cards, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

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
