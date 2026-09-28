import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Award, Calendar, ExternalLink } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  verifyUrl?: string;
}

/**
 * Ordered by recruiter recognition: issuer brand weight first, and within that,
 * generative AI and agentic topics ahead of cloud, then CS fundamentals.
 */
const certifications: Certification[] = [
  {
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    date: 'May 2026',
    description:
      'Covers how generative models differ from traditional ML, where they fit in the Google Cloud stack, and which problems they are a poor fit for.',
    skills: ['Generative AI', 'Foundation Models', 'Google Cloud'],
    verifyUrl: '/certifications/Intro to Gen AI Google Cloud.pdf',
  },
  {
    title: 'Introduction to Large Language Models',
    issuer: 'Google Cloud',
    date: 'May 2026',
    description:
      'How LLMs are trained and tuned, why prompt design changes output quality, and what prompt tuning costs compared to fine-tuning.',
    skills: ['LLMs', 'Prompt Tuning', 'Model Training'],
    verifyUrl: '/certifications/Introduction to Large Language Models Google Cloud.pdf',
  },
  {
    title: 'Generative AI: Prompt Engineering Basics',
    issuer: 'IBM',
    date: 'Jun 2026',
    description:
      'Prompt patterns that hold up in production: zero-shot and few-shot, chain of thought, and the interview pattern for pulling detail out of a model.',
    skills: ['Prompt Engineering', 'Few-shot', 'Chain of Thought'],
    verifyUrl: '/certifications/Gen AI Prompt Engineering.pdf',
  },
  {
    title: 'Generative AI: Introduction and Applications',
    issuer: 'IBM',
    date: 'Jun 2026',
    description:
      'Generative models across text, image, code, and audio, and the tooling around each. Ends on where the technology is applied in real products.',
    skills: ['Generative AI', 'Multimodal', 'Applied AI'],
    verifyUrl: '/certifications/Gen AI Introduction.pdf',
  },
  {
    title: 'Generative AI: Foundation Models and Platforms',
    issuer: 'IBM',
    date: 'Jun 2026',
    description:
      'How foundation models are pre-trained and adapted downstream, and what separates the major model platforms in practice.',
    skills: ['Foundation Models', 'Transfer Learning', 'Model Platforms'],
    verifyUrl: '/certifications/Gen AI Foundation model.pdf',
  },
  {
    title: 'Introduction to Responsible AI',
    issuer: 'Google Cloud',
    date: 'May 2026',
    description:
      'Why responsible AI is an engineering problem rather than a policy afterthought, and how Google structures its own AI principles.',
    skills: ['Responsible AI', 'AI Ethics', 'Model Governance'],
    verifyUrl: '/certifications/Introduction to Responsible AI Google Cloud.pdf',
  },
  {
    title: 'Responsible AI: Applying AI Principles with Google Cloud',
    issuer: 'Google Cloud',
    date: 'May 2026',
    description:
      'Turning AI principles into operational practice: governance structures, review processes, and the tradeoffs teams hit when applying them.',
    skills: ['AI Governance', 'Fairness', 'Responsible AI'],
    verifyUrl: '/certifications/Responsible AI Applying AI Principles with Google.pdf',
  },
  {
    title: 'Microsoft Azure AI Fundamentals: Generative AI',
    issuer: 'Microsoft',
    date: 'Apr 2025',
    description:
      'Azure OpenAI Service end to end, from model deployment to prompt design and the responsible AI controls built into the platform.',
    skills: ['Azure OpenAI', 'Generative AI', 'Prompt Design'],
    verifyUrl: '/certifications/Microsoft Azure AI Fundamentals- Generative AI.pdf',
  },
  {
    title: 'Microsoft Azure AI Fundamentals: Natural Language Processing',
    issuer: 'Microsoft',
    date: 'Apr 2025',
    description:
      'Language understanding on Azure AI Language: entity and intent recognition, sentiment, translation, and conversational speech.',
    skills: ['NLP', 'Azure AI Language', 'Text Analytics'],
    verifyUrl: '/certifications/Microsoft Azure AI Fundamentals- NLP.pdf',
  },
  {
    title: 'Microsoft Azure AI Fundamentals: Computer Vision',
    issuer: 'Microsoft',
    date: 'Apr 2025',
    description:
      'Image classification, object detection, and face and OCR services on Azure AI Vision, including when a custom model beats a prebuilt one.',
    skills: ['Computer Vision', 'Azure AI Vision', 'Object Detection'],
    verifyUrl: '/certifications/Microsoft Azure AI Fundamentals- Computer Vision.pdf',
  },
  {
    title: 'Microsoft Azure AI Fundamentals: Document Intelligence and Knowledge Mining',
    issuer: 'Microsoft',
    date: 'Apr 2025',
    description:
      'Pulling structure out of unstructured documents with Azure AI Document Intelligence, and building searchable indexes with Cognitive Search.',
    skills: ['Document Intelligence', 'Cognitive Search', 'OCR'],
    verifyUrl: '/certifications/Microsoft Azure AI Fundamentals- Document Intelligence.pdf',
  },
  {
    title: 'Microsoft Azure AI Fundamentals: AI Overview',
    issuer: 'Microsoft',
    date: 'Apr 2025',
    description:
      'The Azure AI service catalogue and how the pieces fit together, plus the workload types each service is meant to handle.',
    skills: ['Azure AI', 'Cloud AI', 'ML Workloads'],
    verifyUrl: '/certifications/Microsoft Azure AI Fundamentals- AI Overview.pdf',
  },
  {
    title: 'Agentic AI',
    issuer: 'AI CERTs',
    date: 'Jun 2026',
    description:
      'Agent architectures that plan, call tools, and keep state across steps. The design questions here fed directly into my 6-agent Aura pipeline.',
    skills: ['Agentic AI', 'Tool Calling', 'Multi-agent Systems'],
    verifyUrl: '/certifications/Agentic AI.pdf',
  },
  {
    title: 'Create Your Own AI Assistant',
    issuer: 'AI CERTs',
    date: 'Jun 2026',
    description:
      'Building a working assistant end to end: grounding it in your own data, wiring up tools, and handling conversation state.',
    skills: ['AI Assistants', 'RAG', 'Conversational AI'],
    verifyUrl: '/certifications/Create Your Own AI Assistant.pdf',
  },
  {
    title: 'Prompt Engineering',
    issuer: 'AI CERTs',
    date: 'Jun 2026',
    description:
      'Structured prompting for real applications, including how to constrain output format and reduce hallucination on retrieval tasks.',
    skills: ['Prompt Engineering', 'LLM Applications', 'Output Control'],
    verifyUrl: '/certifications/Prompt Engineering.pdf',
  },
  {
    title: 'Generative AI Fundamentals',
    issuer: 'AI CERTs',
    date: 'Jun 2026',
    description:
      'The mechanics underneath generative models: how they are trained, why they hallucinate, and what that means for building on them.',
    skills: ['Generative AI', 'Model Behaviour', 'AI Fundamentals'],
    verifyUrl: '/certifications/Gen AI Fundamentals.pdf',
  },
  {
    title: 'Generative AI for Business',
    issuer: 'AI CERTs',
    date: 'Jun 2026',
    description:
      'Where generative AI earns its cost in a business, how to scope a pilot, and the risks worth raising before one ships.',
    skills: ['AI Strategy', 'Business Applications', 'AI Adoption'],
    verifyUrl: '/certifications/Gen AI Business.pdf',
  },
  {
    title: 'Deep Learning',
    issuer: 'AI CERTs',
    date: 'May 2026',
    description:
      'Neural network architectures and the training decisions that matter: optimizers, regularization, and reading a loss curve honestly.',
    skills: ['Deep Learning', 'Neural Networks', 'Model Training'],
    verifyUrl: '/certifications/Deep Learning.pdf',
  },
  {
    title: 'Managing Projects with AI',
    issuer: 'AI CERTs',
    date: 'May 2026',
    description:
      'Using AI tooling inside a delivery workflow for planning, estimation, and tracking, without handing over decisions that need a human.',
    skills: ['Project Management', 'AI Tooling', 'Delivery'],
    verifyUrl: '/certifications/Managing Projects with AI.pdf',
  },
  {
    title: 'Introduction to Machine Learning',
    issuer: 'IIT Madras (NPTEL)',
    date: 'Jul – Oct 2025',
    description:
      'A 12 week proctored course covering supervised and unsupervised methods and model evaluation. Scored 71% and earned the Elite grade.',
    skills: ['Supervised Learning', 'Model Evaluation', 'Statistical ML'],
    verifyUrl: '/certifications/Machine Learning.pdf',
  },
  {
    title: 'Design and Analysis of Algorithms',
    issuer: 'IIT Madras (NPTEL)',
    date: 'Jan – Mar 2025',
    description:
      'An 8 week proctored course on algorithm design and complexity analysis. Scored 75%, placing in the top 5% of 1,696 certified candidates.',
    skills: ['Algorithms', 'Complexity Analysis', 'Problem Solving'],
    verifyUrl: '/certifications/Design and Analysis of Algorithms.pdf',
  },
  {
    title: 'Programming, Data Structures and Algorithms using Python',
    issuer: 'IIT Madras (NPTEL)',
    date: 'Jul – Sep 2024',
    description:
      'An 8 week proctored course on core data structures and their Python implementations, assessed by assignments and a written exam.',
    skills: ['Python', 'Data Structures', 'Algorithms'],
    verifyUrl: '/certifications/Programming, Data Structures and Algorithms using Python.pdf',
  },
  {
    title: 'Introduction to Back-End Development',
    issuer: 'Meta',
    date: 'Mar 2024',
    description:
      'Server side fundamentals and how the backend layers sit behind a web application, plus where each common framework is a sensible choice.',
    skills: ['Backend', 'Web Architecture', 'HTTP'],
    verifyUrl: '/certifications/Backend Development.pdf',
  },
  {
    title: 'Programming in Python',
    issuer: 'Meta',
    date: 'Feb 2025',
    description:
      'Python for production work: data structures, object oriented design, error handling, and testing.',
    skills: ['Python', 'OOP', 'Testing'],
    verifyUrl: '/certifications/Programming in Python.pdf',
  },
  {
    title: 'Red Hat System Administration I (RH124)',
    issuer: 'Red Hat Academy',
    date: 'Mar 2025',
    description:
      'Linux administration from the command line: users and permissions, processes, storage, and shell scripting on RHEL.',
    skills: ['Linux', 'RHEL', 'Shell Scripting'],
    verifyUrl: '/certifications/Red Hat System Administration I (RH124).pdf',
  },
  {
    title: 'Red Hat System Administration II (RH134)',
    issuer: 'Red Hat Academy',
    date: 'Mar 2025',
    description:
      'The second RHEL course, covering networking, storage management, SELinux, and task automation.',
    skills: ['Linux', 'Networking', 'SELinux'],
    verifyUrl: '/certifications/Red Hat System Administration II (RH134).pdf',
  },
  {
    title: 'Agile Software Development',
    issuer: 'University of Minnesota',
    date: 'Mar 2025',
    description:
      'How agile teams actually run: iteration planning, estimation, and the practices that survive contact with a real backlog.',
    skills: ['Agile', 'Scrum', 'Iterative Delivery'],
    verifyUrl: '/certifications/Agile Software Development.pdf',
  },
  {
    title: 'Agile with Atlassian Jira',
    issuer: 'Atlassian',
    date: 'Mar 2025',
    description:
      'Running a board in Jira: configuring workflows, managing a backlog, and reading burndown and velocity reports.',
    skills: ['Jira', 'Agile Planning', 'Workflow Configuration'],
    verifyUrl: '/certifications/Agile with Atlassian Jira.pdf',
  },
];

export function CertificationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!containerRef.current || !cardsRef.current) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = containerRef.current.querySelector('.page-header');
    const cards = cardsRef.current.querySelectorAll('.cert-card');

    if (reduced) {
      gsap.set([header, ...Array.from(cards)], { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(header, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2,
    });

    gsap.fromTo(cards, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: 'power3.out', delay: 0.4,
    });

    return () => { gsap.killTweensOf(cards); };
  }, []);

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-[rgb(var(--bg))] pt-24 pb-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link to="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-[rgb(var(--accent))] transition-colors mb-10 group"
          data-hover="true">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to portfolio
        </Link>

        {/* Header */}
        <div className="page-header mb-16">
          <p className="font-mono-data text-xs tracking-widest uppercase mb-4" style={{ color: 'rgb(var(--accent))' }}>
            Credentials
          </p>
          <h1 className="font-display font-bold leading-[1.05] tracking-[-0.02em]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            All <span className="text-gradient">Certifications</span>
          </h1>
          <p className="mt-4 text-muted max-w-lg leading-relaxed">
            {certifications.length} verified credentials, earned alongside the projects they fed into.
            Each one links to the original certificate.
          </p>
        </div>

        {/* Certifications List */}
        <div ref={cardsRef} className="space-y-4">
          {certifications.map((cert, i) => (
            <div
              key={cert.title}
              className="cert-card group relative rounded-2xl bg-[rgb(var(--bg-elevated))] border border-[rgba(var(--border),0.06)] p-6 hover:border-[rgba(var(--accent),0.2)] transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(var(--accent), 0.1)', color: 'rgb(var(--accent))' }}
                  >
                    <Award size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-base text-[rgb(var(--fg))] mb-1 leading-snug">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted mb-2.5">
                      <span>{cert.issuer}</span>
                      <span className="w-1 h-1 rounded-full bg-[rgba(var(--border),0.15)] flex-shrink-0" />
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Calendar size={10} />
                        {cert.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed mb-3 max-w-xl">
                      {cert.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 text-[11px] font-mono-data rounded-full border border-[rgba(var(--border),0.06)] text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 -mr-1 -mt-1.5 rounded-lg text-xs text-muted hover:text-[rgb(var(--accent))] active:scale-[0.97] transition-colors flex-shrink-0"
                    data-hover="true"
                    aria-label={`Verify ${cert.title} certificate (opens PDF in a new tab)`}
                  >
                    <ExternalLink size={12} />
                    <span>Verify</span>
                  </a>
                )}
              </div>

              {/* Number */}
              <span className="pointer-events-none absolute top-4 right-4 font-display font-bold text-5xl opacity-[0.03] text-[rgb(var(--accent))]">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
