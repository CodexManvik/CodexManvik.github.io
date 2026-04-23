import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: '2023',
    title: 'Started at Manipal University Jaipur',
    description: 'Began B.Tech in CSE (AI/ML). Built a strong foundation in ML systems, backend engineering, and production-focused AI.',
  },
  {
    year: '2024',
    title: 'First Deep Learning Project',
    description: 'Built a CNN + DWT watermarking system with PSNR > 40dB and 96% extraction robustness across compression/noise/cropping attacks.',
  },
  {
    year: '2025',
    title: 'AI Intern at Path Infotech',
    description: 'Architected and deployed "Sofia," an enterprise RAG chatbot on Azure OpenAI + Cognitive Search, serving 100+ concurrent users at 99.9% uptime.',
  },
  {
    year: '2025',
    title: 'Interview Mirror',
    description: 'Built a real-time AI interview coach using MediaPipe + Gemini with live feedback, 543 landmark tracking, and low-latency streaming.',
  },
  {
    year: '2025',
    title: 'SIH 2025 + Awards',
    description: 'Selected for SIH 2025 All India Round, became Dell x Google Developer Group Ideathon finalist, and earned multiple Student Excellence Awards.',
  },
  {
    year: '2026',
    title: 'Agentic RAG for Distributed Content',
    description: 'Built a 6-agent local-first RAG pipeline (LangGraph + FastAPI + ChromaDB + Ollama) with strong citation validation and retrieval quality tracking.',
  },
  {
    year: 'Mar 2026 - Present',
    title: 'Backend Engineering Intern at TechLearn',
    description: 'Built analytics and filtered submissions APIs with cursor pagination, optimized query performance, and improved high-concurrency reliability.',
  },
];

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.fromTo(titleRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
    });

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(item, { x: i % 2 === 0 ? -30 : 30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 85%' },
      });
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative py-28 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="font-mono-data text-xs tracking-widest uppercase mb-4" style={{ color: 'rgb(var(--accent))' }}>
            The Journey So Far
          </p>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Milestones & <span className="text-gradient">Turning Points</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(var(--border),0.08)] md:-translate-x-px" />

          {milestones.map((m, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className={`relative flex items-start gap-6 mb-10 md:gap-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 rounded-full border-2 z-10 md:-translate-x-1/2 mt-1.5"
                style={{ borderColor: 'rgb(var(--accent))', backgroundColor: 'rgb(var(--bg))' }} />

              {/* Content */}
              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <span className="font-mono-data text-[11px] tracking-wider uppercase" style={{ color: 'rgb(var(--accent))' }}>
                  {m.year}
                </span>
                <h3 className="font-display font-bold text-base text-[rgb(var(--fg))] mt-1 mb-2">
                  {m.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
