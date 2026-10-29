import { useRef } from 'react';
import { reveal, useReveal } from '../lib/reveal';

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: '2023',
    title: 'Started at Manipal University Jaipur',
    description: 'Began B.Tech in CSE (AI & ML). Built a strong foundation in ML systems, backend engineering, and production-focused AI.',
  },
  {
    year: '2024',
    title: 'First Deep Learning Project',
    description: 'Started a DWT-CNN invisible watermarking system, which grew into a differentiable encode-attack-decode network reaching 37.3 dB PSNR and 0.97 SSIM.',
  },
  {
    year: '2025',
    title: 'AI Development Intern at Path Infotech',
    description: 'Deployed "Sofia," an enterprise RAG assistant built on Azure Cognitive Search, with a citation layer that makes every answer auditable.',
  },
  {
    year: '2025',
    title: 'Interview Mirror',
    description: 'Started Interview Mirror with Archit Badoni: an AI interview coach that grew into a three-person AI panel with resume-based questions, on-device body-language analysis and evidence-based scoring.',
  },
  {
    year: '2025',
    title: 'SIH 2025 National Semi-Finalist',
    description: 'FloatChat-AI reached the Smart India Hackathon 2025 national semi-finals. Also a Dell x GDG Ideathon finalist and a 4x Student Excellence Award winner.',
  },
  {
    year: '2026',
    title: 'Agentic RAG for Distributed Content',
    description: 'Built a LangGraph agent pipeline for RAG over hybrid vector + BM25 retrieval, with an evaluation harness and citation validation.',
  },
  {
    year: 'Feb 2026',
    title: 'Backend Engineering Intern at TechLearn',
    description: 'Shipped the Dashboard Stats API, now the primary analytics endpoint in production, and moved submission retrieval to cursor-based pagination.',
  },
  {
    year: 'May 2026',
    title: 'AI Engineering Intern at Niva Bupa',
    description: 'Built a claims auto-adjudication engine combining a 7-gate deterministic pipeline with a local LLM for clinical reasoning, with confidence-based routing to human reviewers.',
  },
  {
    year: 'Aug 2026',
    title: 'Deloitte Capstone Programme: IntelliOps',
    description: 'Built IntelliOps, an agentic AIOps platform: seven FastAPI microservices that group alert storms into incidents, rank root causes and run reversible Kubernetes remediation behind a fail-closed human-approval gate.',
  },
];

export function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useReveal(sectionRef, () => {
    if (!titleRef.current) return;
    reveal(titleRef.current.children, titleRef.current, { y: 40 }, { duration: 0.8, stagger: 0.1 });
    itemsRef.current.forEach((item, i) => {
      if (item) reveal(item, item, { x: i % 2 === 0 ? -30 : 30 }, { duration: 0.7 });
    });
  });

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
        <div className="relative overflow-x-clip">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(var(--border),0.08)] md:-translate-x-px" />

          {milestones.map((m, i) => (
            <div
              key={i}
              ref={(el) => { itemsRef.current[i] = el; }}
              className={`relative flex items-start mb-10 ${
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
