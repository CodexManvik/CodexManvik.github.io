import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillGroup {
  category: string;
  items: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'AI Systems',
    items: ['LLMs', 'RAG Pipelines', 'LangGraph', 'Hugging Face', 'PyTorch', 'TensorFlow', 'OpenCV', 'Scikit-learn', 'LLM Quantization'],
  },
  {
    category: 'Backend & Infrastructure',
    items: ['FastAPI', 'Flask', 'Python', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'ChromaDB', 'FAISS'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Azure OpenAI', 'Cognitive Search', 'App Service', 'Docker', 'CI/CD', 'Git', 'Linux'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Streamlit'],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !groupsRef.current) return;

    gsap.fromTo(titleRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
    });

    const groups = groupsRef.current.querySelectorAll('.skill-group');
    gsap.fromTo(groups, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: groupsRef.current, start: 'top 80%' },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="mb-14">
          <p className="font-mono-data text-xs tracking-widest uppercase mb-4" style={{ color: 'rgb(var(--accent))' }}>
            Technical Skills
          </p>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Tools & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="mt-4 text-muted text-sm max-w-lg leading-relaxed">
            The stack I reach for when building production AI systems. Always learning, always iterating.
          </p>
        </div>

        <div ref={groupsRef} className="space-y-8">
          {skillGroups.map((group) => (
            <div key={group.category} className="skill-group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'rgb(var(--accent))' }} />
                <h3 className="font-display font-bold text-xs text-[rgb(var(--fg))] uppercase tracking-wider">
                  {group.category}
                </h3>
                <div className="flex-1 h-px bg-[rgba(var(--border),0.05)]" />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-3.5 py-1.5 text-sm rounded-lg bg-[rgb(var(--bg-elevated))] border border-[rgba(var(--border),0.05)] text-muted hover:text-[rgb(var(--fg))] hover:border-[rgba(var(--border),0.12)] transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
