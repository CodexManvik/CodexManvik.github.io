import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, Award, Calendar, ExternalLink } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  verifyUrl?: string;
}

const certifications: Certification[] = [
  {
    title: 'Microsoft Azure AI Certification',
    issuer: 'Microsoft',
    date: '2025',
    skills: ['Azure AI Services', 'Cognitive Services', 'Machine Learning'],
    verifyUrl: './certifications/Manvik Talwar Azure AI Certification.pdf',
  },
  {
    title: 'Azure AI Fundamentals - AI Overview',
    issuer: 'Microsoft',
    date: '2025',
    skills: ['Azure AI Fundamentals', 'AI Concepts', 'Cloud AI'],
    verifyUrl: './certifications/Microsoft Azure AI Fundamentals- AI Overview.pdf',
  },
  {
    title: 'Azure AI Fundamentals - Generative AI',
    issuer: 'Microsoft',
    date: '2025',
    skills: ['Generative AI', 'Prompting', 'LLM Basics'],
    verifyUrl: './certifications/Microsoft Azure AI Fundamentals- Generative AI.pdf',
  },
  {
    title: 'Azure AI Fundamentals - NLP',
    issuer: 'Microsoft',
    date: '2025',
    skills: ['Natural Language Processing', 'Text Analytics', 'Language AI'],
    verifyUrl: './certifications/Microsoft Azure AI Fundamentals- NLP.pdf',
  },
  {
    title: 'Azure AI Fundamentals - Computer Vision',
    issuer: 'Microsoft',
    date: '2025',
    skills: ['Computer Vision', 'Image Analysis', 'Vision Models'],
    verifyUrl: './certifications/Microsoft Azure AI Fundamentals- Computer Vision.pdf',
  },
  {
    title: 'Azure AI Fundamentals - Document Intelligence',
    issuer: 'Microsoft',
    date: '2025',
    skills: ['Document Intelligence', 'OCR', 'Structured Extraction'],
    verifyUrl: './certifications/Microsoft Azure AI Fundamentals- Document Intelligence.pdf',
  },
  {
    title: 'Machine Learning',
    issuer: 'NPTEL',
    date: '2024',
    skills: ['Supervised Learning', 'Neural Networks', 'Model Evaluation'],
    verifyUrl: './certifications/Machine Learning.pdf',
  },
  {
    title: 'Backend Development',
    issuer: 'Coursera',
    date: '2024',
    skills: ['API Design', 'Database Management', 'Server Architecture'],
    verifyUrl: './certifications/Backend Development.pdf',
  },
  {
    title: 'Design & Analysis of Algorithms',
    issuer: 'NPTEL',
    date: '2024',
    skills: ['Algorithms', 'Complexity Analysis', 'Problem Solving'],
    verifyUrl: './certifications/Design and Analysis of Algorithms.pdf',
  },
  {
    title: 'Red Hat System Administration I (RH124)',
    issuer: 'Red Hat',
    date: '2024',
    skills: ['Linux', 'System Management', 'Shell Scripting'],
    verifyUrl: './certifications/Red Hat System Administration I (RH124).pdf',
  },
  {
    title: 'Red Hat System Administration II (RH134)',
    issuer: 'Red Hat',
    date: '2025',
    skills: ['Network Configuration', 'Security', 'Automation'],
    verifyUrl: './certifications/Red Hat System Administration II (RH134).pdf',
  },
  {
    title: 'Programming in Python',
    issuer: 'NPTEL',
    date: '2024',
    skills: ['Python', 'Core Programming', 'Problem Solving'],
    verifyUrl: './certifications/Programming in Python.pdf',
  },
  {
    title: 'Programming, Data Structures and Algorithms using Python',
    issuer: 'NPTEL',
    date: '2024',
    skills: ['Python', 'Data Structures', 'Algorithms'],
    verifyUrl: './certifications/Programming, Data Structures and Algorithms using Python.pdf',
  },
  {
    title: 'Agile Software Development',
    issuer: 'Coursera',
    date: '2024',
    skills: ['Agile', 'Scrum', 'Software Lifecycle'],
    verifyUrl: './certifications/Agile Software Development.pdf',
  },
  {
    title: 'Agile with Atlassian Jira',
    issuer: 'Atlassian / Coursera',
    date: '2024',
    skills: ['Jira', 'Agile Planning', 'Workflow Management'],
    verifyUrl: './certifications/Agile with Atlassian Jira.pdf',
  },
];

export function CertificationsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!containerRef.current || !cardsRef.current) return;

    gsap.fromTo(containerRef.current.querySelector('.page-header'), { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2,
    });

    const cards = cardsRef.current.querySelectorAll('.cert-card');
    gsap.fromTo(cards, { y: 50, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.4,
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
          <h1 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            All <span className="text-gradient">Certifications</span>
          </h1>
          <p className="mt-4 text-muted max-w-lg">
            A complete list of professional certifications earned alongside building real-world projects.
          </p>
        </div>

        {/* Certifications List */}
        <div ref={cardsRef} className="space-y-4">
          {certifications.map((cert, i) => (
            <div
              key={cert.title}
              className="cert-card group relative rounded-2xl bg-[rgb(var(--bg-elevated))] border border-[rgba(var(--border),0.06)] p-6 hover:border-[rgba(var(--accent),0.2)] transition-all duration-400"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(var(--accent), 0.1)', color: 'rgb(var(--accent))' }}
                  >
                    <Award size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[rgb(var(--fg))] mb-1">
                      {cert.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-muted mb-3">
                      <span>{cert.issuer}</span>
                      <span className="w-1 h-1 rounded-full bg-[rgba(var(--border),0.15)]" />
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {cert.date}
                      </span>
                    </div>
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
                    className="relative z-20 inline-flex items-center gap-1 text-xs text-muted hover:text-[rgb(var(--accent))] transition-colors flex-shrink-0"
                    data-hover="true"
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
