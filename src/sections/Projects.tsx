import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  /** Omit to render a typographic header instead of a photo. */
  image?: string;
  github?: string;
  demo?: string;
  color: string;
}

const projects: Project[] = [
  {
    name: 'IntelliOps',
    tagline: 'Agentic AIOps Platform · Deloitte Capstone 2026',
    description: 'A 7-service, event-driven AIOps platform that collapses alert storms into incidents, ranks root causes and runs governed, reversible remediation on Kubernetes. On a live cluster: 75% alert-noise reduction, 41 s median time-to-fix, and autonomy rising from 0% to 76.7% of runs as playbooks earned it from verified outcomes. The LLM agent is confined to a closed 7-verb action vocabulary behind a fail-closed human-approval gate. 833 automated tests.',
    tech: ['FastAPI', 'Redis Streams', 'PostgreSQL', 'Prometheus', 'Kubernetes', 'React'],
    github: 'https://github.com/CodexManvik/intelliops',
    color: 'rgb(var(--accent-text))',
  },
  {
    name: 'Claims Auto-Adjudication Engine',
    tagline: 'Deterministic Rules + Local LLM · Niva Bupa',
    description: 'Health insurance claims engine built during my Niva Bupa internship. A 7-gate pipeline handles policy, member, coverage, waiting-period, exclusion and financial checks deterministically, while a local Gemma LLM on llama.cpp reasons over discharge summaries with GBNF-constrained JSON output. 4-tier confidence routing sends uncertain claims to human review queues.',
    tech: ['FastAPI', 'llama.cpp', 'GBNF', 'PostgreSQL', 'React'],
    // Theme accent token: legible in both light and dark, unlike a fixed hex.
    color: 'rgb(var(--accent-text))',
  },
  {
    name: 'Aura',
    tagline: 'Agentic RAG for Distributed Content',
    description: 'Multi-agent LangGraph pipeline (plan, retrieve, adequacy check, reformulate, synthesize, citation validation) over hybrid vector + BM25 retrieval that abstains instead of hallucinating when evidence is weak. Evaluated with Hit@k, MRR and citation precision: 0.690 Hit@k and 0.549 MRR on local models, blocking every prompt-injection test query.',
    tech: ['LangGraph', 'FastAPI', 'ChromaDB', 'BM25', 'Ollama'],
    image: '/project-aura.jpg',
    github: 'https://github.com/CodexManvik/Agentic-Rag-for-Distributed-Content',
    color: '#d4860f',
  },
  {
    name: 'Deep Watermarking',
    tagline: 'DWT-CNN Invisible Image Watermarking',
    description: 'First-authored, end-to-end differentiable encode-attack-decode CNN that embeds a 256-bit payload in the Haar DWT LL subband, with differentiable JPEG in a 6-attack simulator. Trained on 50K images to 37.3 dB PSNR, 0.97 SSIM and 3.2% BER, with 2.4–7x lower BER than a classical DWT baseline. Manuscript in preparation.',
    tech: ['TensorFlow', 'Keras', 'OpenCV'],
    image: '/project-watermark.jpg',
    github: 'https://github.com/CodexManvik/Deep-Learning-Based-Watermarking',
    color: '#c45a1f',
  },
  {
    name: 'Sofia',
    tagline: 'Enterprise RAG Assistant · Path Infotech',
    description: 'Enterprise RAG assistant deployed on company servers for internal knowledge retrieval, with a semantic search pipeline built on custom Azure Cognitive Search indexing skillsets for PDFs and a citation layer so every answer links back to its sources.',
    tech: ['Azure OpenAI', 'Cognitive Search', 'MySQL', 'Flask'],
    image: '/project-sofia.jpg',
    github: 'https://github.com/CodexManvik/Sofia-A-Chatbot-For-Realtime-Document-Insights',
    color: '#c66e0f',
  },
  {
    name: 'FloatChat',
    tagline: 'Natural Language over Ocean Data · SIH 2025',
    description: 'Smart India Hackathon 2025 national semi-finalist. NL-to-SQL and semantic search over ARGO ocean datasets, replacing hand-written SQL with a conversational RAG interface over 100k+ records.',
    tech: ['Qwen LLM', 'PostgreSQL', 'ChromaDB', 'Streamlit'],
    image: '/project-floatchat.jpg',
    github: 'https://github.com/CodexManvik/FloatChat-AI',
    color: '#b85a2a',
  },
  {
    name: 'Aethel',
    tagline: 'Local-First AI Agent Runtime · In Development',
    description: 'A local desktop agent with permissioned, rollback-safe tools. Reflective Skill Memory keeps or retires learned skills based on their measured success rate.',
    tech: ['llama.cpp', 'FastAPI', 'Tauri', 'LanceDB'],
    github: 'https://github.com/CodexManvik/Aethel',
    color: 'rgb(var(--accent-text))',
  },
  {
    name: 'Interview Mirror',
    tagline: 'Real-time AI Interview Coach',
    description: 'Tracks 543 body landmarks at under 100ms latency to analyze posture, gestures, and stress signals. Integrates Gemini, Whisper, and TTS for comprehensive interview feedback.',
    tech: ['MediaPipe', 'FastAPI', 'OpenCV', 'React'],
    image: '/project-interview.jpg',
    github: 'https://github.com/CodexManvik/Interview-Mirror',
    color: '#a83f39',
  },
  {
    name: 'MusicGen',
    tagline: 'AI Music Generation',
    description: 'Generates original music compositions from text prompts using transformer and LSTM-based sequence modeling. Produces structured MIDI outputs with coherent melody, harmony, and rhythm.',
    tech: ['PyTorch', 'MIDI', 'Streamlit'],
    image: '/project-music.jpg',
    github: 'https://github.com/CodexManvik/automatic-music-generation',
    color: '#d4860f',
  },
];

/**
 * Hex accents take a 0x20 alpha suffix; the theme-token accent needs rgba().
 * Both resolve to the same faint tint on hover.
 */
function hoverBorderFor(color: string): string {
  return color.startsWith('#') ? `${color}20` : 'rgba(var(--accent),0.125)';
}

/** The decorative gradient/number keep the vivid accent; only text uses --accent-text. */
const ACCENT_TINT = 'rgb(var(--accent))';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverBorder = hoverBorderFor(project.color);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateZ(4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-[rgb(var(--bg-elevated))] border border-[rgba(var(--border),0.06)] overflow-hidden"
      style={{ transition: 'transform 0.2s ease, border-color 0.4s ease' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = hoverBorder; }}
      onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(var(--border),0.06)'; }}
    >
      {/* Image, or a typographic panel when no artwork exists */}
      <div className="relative h-44 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} — ${project.tagline}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-end p-6"
            style={{
              background:
                'linear-gradient(140deg, rgba(var(--accent),0.12) 0%, rgba(var(--accent),0.04) 55%, transparent 100%)',
            }}
          >
            <span className="font-mono-data text-[11px] tracking-widest uppercase text-accent-token">
              {project.tagline}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-elevated))] via-transparent to-transparent" />
        <span
          className="absolute top-3 right-3 font-display font-bold text-5xl opacity-[0.06]"
          style={project.image ? { color: '#fff' } : { color: ACCENT_TINT, opacity: 0.16 }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10 p-6 -mt-6">
        <h3 className="font-display font-bold text-lg text-[rgb(var(--fg))] mb-0.5 group-hover:text-gradient transition-all duration-300">
          {project.name}
        </h3>
        {/* Small text uses the theme token so it clears AA in both themes;
            per-project hex colors stay on decorative accents only. */}
        <p className="font-mono-data text-[11px] mb-3 text-accent-token">
          {project.tagline}
        </p>
        <p className="text-sm text-muted leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-0.5 text-[11px] font-mono-data rounded-full border border-[rgba(var(--border),0.06)] text-subtle">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-3 border-t border-[rgba(var(--border),0.04)]">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-[rgb(var(--fg))] transition-colors"
              data-hover="true">
              <Github size={13} />
              <span>Code<span className="sr-only"> for {project.name} on GitHub</span></span>
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-[rgb(var(--accent))] transition-colors"
              data-hover="true">
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !gridRef.current) return;

    gsap.fromTo(titleRef.current.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
    });

    const cards = gridRef.current.querySelectorAll('.group');
    gsap.fromTo(cards, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-28 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-14">
          <p className="font-mono-data text-xs tracking-widest uppercase mb-4" style={{ color: 'rgb(var(--accent))' }}>
            Featured Work
          </p>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Projects & <span className="text-gradient">Research</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl text-sm leading-relaxed">
            From an agentic AIOps platform and local-LLM claims adjudication to agentic RAG and deep-learning research. Each one taught me something the docs never could.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 perspective-1000">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
