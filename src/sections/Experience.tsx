import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Job {
  company: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
}

const jobs: Job[] = [
  {
    company: 'Niva Bupa Health Insurance',
    role: 'AI Engineering Intern',
    period: 'May 2026 – Jul 2026',
    summary: 'Built a claims auto-adjudication engine for the ReAssure 3.0 health policy, pairing deterministic rules with a local Gemma LLM on llama.cpp.',
    bullets: [
      'Built a 7-gate pipeline (policy, member, coverage, waiting period, exclusion, financial, state update) mixing deterministic rules with a local LLM',
      'Forced schema-valid JSON output with GBNF grammar-constrained decoding',
      'Built 4-tier confidence routing that sends uncertain claims to operations, clinical or senior-auditor review queues instead of forcing an automated verdict',
      "Built a DAG rule planner (Kahn's topological sort) for audit-replayable plans",
      'Shipped async FastAPI with per-gate SSE streaming and OCR + LLM extraction from discharge summaries',
      'Wrote a 67-test pytest suite that runs without a live LLM',
    ],
  },
  {
    company: 'TechLearn',
    role: 'Backend Engineering Intern',
    period: 'Feb 2026 – May 2026',
    summary: 'Built backend analytics APIs for an education platform.',
    bullets: [
      'Shipped the Dashboard Stats API serving real-time KPIs to educators, now the primary analytics endpoint in production',
      'Replaced offset pagination with cursor-based pagination on submission retrieval, removing deep-page scan cost',
      'Added composite indexes and restructured trend queries to cut redundant aggregation passes',
    ],
  },
  {
    company: 'Path Infotech',
    role: 'AI Development Intern',
    period: 'Jun 2025 – Aug 2025',
    summary: 'Deployed an enterprise RAG assistant on company servers for internal knowledge retrieval.',
    bullets: [
      'Built the semantic search pipeline with custom Azure Cognitive Search indexing skillsets for PDFs',
      'Built a citation layer backed by MySQL tagging so every generated answer rendered clickable source references',
      'Made outputs auditable for non-technical staff',
    ],
  },
];

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !cardsRef.current) return;

    gsap.fromTo(titleRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
    });

    const cards = cardsRef.current.querySelectorAll('.exp-card');
    gsap.fromTo(cards, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-14">
          <p className="font-mono-data text-xs tracking-widest uppercase mb-4" style={{ color: 'rgb(var(--accent))' }}>
            Professional Experience
          </p>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Work & <span className="text-gradient">Internships</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.company} className="exp-card relative rounded-2xl bg-[rgb(var(--bg-elevated))] border border-[rgba(var(--border),0.06)] p-7 hover:border-[rgba(var(--accent),0.15)] transition-all duration-500">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent))]/20 to-transparent" />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(var(--accent),0.08)', color: 'rgb(var(--accent))' }}>
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-[rgb(var(--fg))]">{job.company}</h3>
                    <p className="text-xs text-muted">{job.role}</p>
                  </div>
                </div>
                <span className="font-mono-data text-[10px] px-3 py-1 rounded-full whitespace-nowrap" style={{ color: 'rgb(var(--accent))', backgroundColor: 'rgba(var(--accent),0.08)' }}>
                  {job.period}
                </span>
              </div>

              <p
                className={`text-sm text-[rgb(var(--fg))] leading-relaxed ${
                  job.bullets.length > 0
                    ? 'mb-4 pb-4 border-b border-[rgba(var(--border),0.04)]'
                    : ''
                }`}
              >
                {job.summary}
              </p>

              {job.bullets.length > 0 && (
                <ul className="space-y-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                      <Zap size={11} className="mt-1 flex-shrink-0" style={{ color: 'rgb(var(--accent))' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
