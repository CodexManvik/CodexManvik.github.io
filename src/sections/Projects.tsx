import { useRef, useCallback } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { reveal, useReveal } from '../lib/reveal';

interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  /** 1344x768 WebP. Omit to render a typographic header instead of a photo. */
  image?: string;
  /** Describes the project, not the artwork. */
  imageAlt?: string;
  github?: string;
  demo?: string;
  color: string;
}

const projects: Project[] = [
  {
    name: 'IntelliOps',
    tagline: 'Agentic AIOps Platform · Deloitte Capstone 2026',
    description: 'Seven Python (FastAPI) microservices over Redis Streams and PostgreSQL, with a React operator console. It groups alert storms into incidents, ranks root causes and runs reversible remediation on Kubernetes with automatic rollback. The LLM agent is limited to a closed set of remediation actions behind a fail-closed human-approval gate, and playbooks graduate to automatic only after a record of verified fixes, with outcomes fed back as training data. Pluggable anomaly detectors run against a seeded benchmark: the robust seasonal detector cuts the false-positive rate 7x (0.014 → 0.002), enforced in CI. Grafana, Loki and Prometheus observability, a full audit trail and 860+ tests.',
    tech: ['FastAPI', 'Redis Streams', 'PostgreSQL', 'Kubernetes', 'scikit-learn', 'Grafana', 'React'],
    image: '/project-intelliops.webp',
    imageAlt: 'IntelliOps: an agentic AIOps platform that condenses alert storms into a few incidents and learns from each fix',
    github: 'https://github.com/CodexManvik/intelliops',
    color: 'rgb(var(--accent-text))',
  },
  {
    name: 'Claims Auto-Adjudication Engine',
    tagline: 'Deterministic Rules + LLM · Niva Bupa',
    description: 'Health insurance claims engine built during my Niva Bupa internship. A 7-gate pipeline handles policy, member, coverage, waiting-period, exclusion and financial checks deterministically, while an LLM reasons over discharge summaries with GBNF-constrained JSON output. It runs on a local LLM (Gemma on llama.cpp) or a cloud API (Groq). Batching exclusion screening cut LLM calls per bill line item from ~11 to 1, and 4-tier confidence routing sends uncertain claims to human review queues. 77 tests.',
    tech: ['FastAPI', 'llama.cpp', 'Groq', 'GBNF', 'PostgreSQL', 'React'],
    image: '/project-claims.webp',
    imageAlt: 'Claims Auto-Adjudication Engine: health insurance claims checked by deterministic rule gates and an LLM',
    github: 'https://github.com/CodexManvik/policy-automate',
    // Theme accent token: legible in both light and dark, unlike a fixed hex.
    color: 'rgb(var(--accent-text))',
  },
  {
    name: 'Interview Mirror',
    tagline: 'AI Interview Panel · Team of 2',
    description: "A three-person AI panel (technical, manager, HR) that takes turns, each speaking in its own Azure neural TTS voice, with questions generated from the candidate's resume and target job description. Groq-hosted LLMs and Groq Whisper speech-to-text; MediaPipe body-language analysis runs on-device, so video never leaves the browser. Evidence-based scoring uses two LLM graders, a tie-break pass and a transcript evidence check, with LLM fallbacks, timeouts and cooldowns. 950+ backend and 300+ frontend tests in CI. Built with Archit Badoni.",
    tech: ['React', 'FastAPI', 'Groq', 'Azure TTS', 'MediaPipe', 'Supabase'],
    image: '/project-interview.webp',
    imageAlt: 'Interview Mirror: a three-person AI interview panel with on-device body-language analysis',
    demo: 'https://interview-mirror-hy2n.vercel.app',
    color: '#a83f39',
  },
  {
    name: 'Aethel',
    tagline: 'Local-First Desktop AI Agent · v2.0.0-beta.1',
    description: 'Shipped v2.0.0-beta.1 with a Windows installer on GitHub Releases. Runs multi-step PC tasks through an MCP tool hub with permission manifests, approval gates and one-click rollback. Reflective Skill Memory turns finished tasks into reviewable skills, and a skill compiles into an LLM-free macro after 3 identical runs. A CPU-only decision model (~0.2 s per call) routes intent at 0.91 precision and recall on held-out labelled data. Voice, personas and image generation; 790+ tests.',
    tech: ['llama.cpp', 'FastAPI', 'Tauri', 'MCP', 'LanceDB'],
    image: '/project-aethel.webp',
    imageAlt: 'Aethel: a local-first desktop AI agent that runs PC tasks and turns them into reusable skills',
    github: 'https://github.com/CodexManvik/Aethel',
    color: 'rgb(var(--accent-text))',
  },
  {
    name: 'Aura',
    tagline: 'Agentic RAG for Distributed Content',
    description: 'LangGraph agent pipeline (plan, retrieve, adequacy check, reformulate, synthesize, citation validation) over hybrid vector + BM25 retrieval that abstains instead of hallucinating when evidence is weak. Evaluated with Hit@k, MRR and citation precision: 0.690 Hit@k and 0.549 MRR on local models, blocking every prompt-injection test query.',
    tech: ['LangGraph', 'FastAPI', 'ChromaDB', 'BM25', 'Ollama'],
    image: '/project-aura.webp',
    imageAlt: 'Aura: an agentic RAG pipeline that cites its sources or abstains',
    github: 'https://github.com/CodexManvik/Agentic-Rag-for-Distributed-Content',
    color: '#d4860f',
  },
  {
    name: 'Deep Watermarking',
    tagline: 'DWT-CNN Invisible Image Watermarking',
    description: 'First-authored, end-to-end differentiable encode-attack-decode CNN that embeds a 256-bit payload in the Haar DWT LL subband, with differentiable JPEG in a 6-attack simulator. Trained on 50K images to 37.3 dB PSNR, 0.97 SSIM and 3.2% BER, with 2.4–7x lower BER than a classical DWT baseline. Manuscript in preparation.',
    tech: ['TensorFlow', 'Keras', 'OpenCV'],
    image: '/project-watermark.webp',
    imageAlt: 'Deep Watermarking: a CNN that hides a 256-bit payload invisibly inside images',
    github: 'https://github.com/CodexManvik/Deep-Learning-Based-Watermarking',
    color: '#c45a1f',
  },
  {
    name: 'FloatChat',
    tagline: 'Natural Language over Ocean Data · SIH 2025',
    description: 'Smart India Hackathon 2025 national semi-finalist. Ask questions about Argo float data: 438 floats, 3,891 profiles and 88,541 measurements from the Indian Ocean (Jan–Mar 2024). Statistical questions route to NL-to-SQL (templates plus LLM-written SQL, validated as a single read-only SELECT); the rest go to ChromaDB semantic search with region, month and oxygen filters. Works with any OpenAI-compatible LLM (Groq, Ollama).',
    tech: ['FastAPI', 'PostgreSQL', 'ChromaDB', 'Streamlit', 'Docker Compose'],
    image: '/project-floatchat.webp',
    imageAlt: 'FloatChat: natural-language questions over Argo ocean float data',
    github: 'https://github.com/CodexManvik/FloatChat-AI',
    color: '#b85a2a',
  },
  {
    name: 'Sofia',
    tagline: 'Enterprise RAG Assistant · Path Infotech',
    description: 'Enterprise RAG assistant deployed on company servers for internal knowledge retrieval, with a semantic search pipeline built on custom Azure Cognitive Search indexing skillsets for PDFs and a citation layer so every answer links back to its sources.',
    tech: ['Azure OpenAI', 'Cognitive Search', 'MySQL', 'Flask'],
    image: '/project-sofia.webp',
    imageAlt: 'Sofia: an enterprise RAG assistant that answers from internal PDFs with citations',
    github: 'https://github.com/CodexManvik/Sofia-A-Chatbot-For-Realtime-Document-Insights',
    color: '#c66e0f',
  },
  {
    name: 'MusicGen',
    tagline: 'LSTM Music Generation',
    description: 'A 2-layer LSTM in PyTorch trained on Schubert piano MIDI, parsed into note and chord sequences with music21. It generates new MIDI autoregressively, predicting each note from the ones before it.',
    tech: ['PyTorch', 'LSTM', 'music21', 'MIDI'],
    image: '/project-music.webp',
    imageAlt: 'MusicGen: an LSTM that composes new piano MIDI after training on Schubert',
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
            alt={project.imageAlt ?? project.name}
            width={1344}
            height={768}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
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
              <span>Live<span className="sr-only"> demo of {project.name}</span></span>
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

  useReveal(sectionRef, () => {
    if (!titleRef.current || !gridRef.current) return;
    reveal(titleRef.current.children, titleRef.current, { y: 40 }, { duration: 0.8, stagger: 0.1 });
    // One trigger per card: on a one-column phone layout the last cards sit
    // several screens below the grid's top edge.
    gridRef.current.querySelectorAll('.group').forEach((card) => reveal(card, card, { y: 50 }));
  });

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
