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
  image: string;
  github?: string;
  demo?: string;
  color: string;
}

const projects: Project[] = [
  {
    name: 'Aura',
    tagline: 'Agentic RAG for Distributed Content',
    description: 'A modular agentic retrieval system with 6 specialized agents that route queries through retrieve, validate, synthesize, and finalize stages. Runs locally with end-to-end latency under 30 seconds.',
    tech: ['LangGraph', 'FastAPI', 'ChromaDB', 'Ollama'],
    image: './project-aura.jpg',
    github: 'https://github.com/CodexManvik/Agentic-Rag-for-Distributed-Content',
    color: '#d4860f',
  },
  {
    name: 'Interview Mirror',
    tagline: 'Real-time AI Interview Coach',
    description: 'Tracks 543 body landmarks at under 100ms latency to analyze posture, gestures, and stress signals. Integrates Gemini, Whisper, and TTS for comprehensive interview feedback.',
    tech: ['MediaPipe', 'FastAPI', 'OpenCV', 'React'],
    image: './project-interview.jpg',
    color: '#a83f39',
  },
  {
    name: 'Sofia',
    tagline: 'Enterprise AI Assistant',
    description: 'Production RAG chatbot deployed on Azure serving 100+ concurrent users at 99.9% uptime. Features full citation tracking and an optimized semantic search pipeline for enterprise knowledge bases.',
    tech: ['Azure OpenAI', 'Cognitive Search', 'Flask', 'Docker'],
    image: './project-sofia.jpg',
    github: 'https://github.com/CodexManvik',
    color: '#c66e0f',
  },
  {
    name: 'FloatChat',
    tagline: 'Natural Language over Ocean Data',
    description: 'Replaces SQL querying for ARGO ocean datasets with a conversational RAG interface. Handles 100k+ records with sub-2-second response using Qwen LLM and vector search.',
    tech: ['Qwen LLM', 'PostgreSQL', 'ChromaDB', 'Streamlit'],
    image: './project-floatchat.jpg',
    color: '#b85a2a',
  },
  {
    name: 'Deep Watermarking',
    tagline: 'CNN + DWT Invisible Watermarking',
    description: 'Deep learning model for invisible image watermarking achieving PSNR above 40dB with 96% robustness. Uses a hybrid CNN-DWT architecture resistant to compression and noise attacks.',
    tech: ['PyTorch', 'OpenCV'],
    image: './project-watermark.jpg',
    color: '#c45a1f',
  },
  {
    name: 'MusicGen',
    tagline: 'AI Music Generation',
    description: 'Generates original music compositions from text prompts using transformer and LSTM-based sequence modeling. Produces structured MIDI outputs with coherent melody, harmony, and rhythm.',
    tech: ['PyTorch', 'MIDI', 'Streamlit'],
    image: './project-music.jpg',
    color: '#d4860f',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

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
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${project.color}20`; }}
      onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(var(--border),0.06)'; }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg-elevated))] via-transparent to-transparent" />
        <span className="absolute top-3 right-3 font-display font-bold text-5xl opacity-[0.06] text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10 p-6 -mt-6">
        <h3 className="font-display font-bold text-lg text-[rgb(var(--fg))] mb-0.5 group-hover:text-gradient transition-all duration-300">
          {project.name}
        </h3>
        <p className="font-mono-data text-[11px] mb-3" style={{ color: project.color }}>
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
              Code
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
            A collection of things I have built — from agentic RAG pipelines to real-time computer vision systems. Each one taught me something the docs never could.
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
