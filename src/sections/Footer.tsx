import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, ArrowUpRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    gsap.fromTo(content.children, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 80%' },
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  const socialLinks = [
    { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/CodexManvik' },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://linkedin.com/in/manvik-talwar' },
    { icon: <Mail size={18} />, label: 'Email', href: 'mailto:manvik.talwar@gmail.com' },
  ];

  return (
    <footer id="footer" ref={sectionRef} className="relative py-24 px-6 lg:px-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent))]/15 to-transparent" />

      <div ref={contentRef} className="max-w-4xl mx-auto text-center">
        <p className="font-mono-data text-xs tracking-widest uppercase mb-5" style={{ color: 'rgb(var(--accent))' }}>
          Get in Touch
        </p>

        <h2 className="font-display font-bold leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}>
          Let's build something<br /><span className="text-gradient">worth building.</span>
        </h2>

        <p className="mt-5 text-sm text-muted max-w-md mx-auto">
          Open to AI/ML and backend engineering internship opportunities.
        </p>

        <div className="flex items-center justify-center gap-2 mt-4 text-muted">
          <MapPin size={12} style={{ color: 'rgb(var(--accent))' }} />
          <span className="text-xs">India</span>
        </div>

        <a href="mailto:manvik.talwar@gmail.com"
          className="inline-flex items-center gap-2 mt-5 text-base text-muted hover:text-[rgb(var(--accent))] transition-colors group"
          data-hover="true">
          manvik.talwar@gmail.com
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Certifications link */}
        <div className="mt-4">
          <Link to="/certifications"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-[rgb(var(--accent))] transition-colors"
            data-hover="true">
            View all certifications
            <ArrowUpRight size={11} />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[rgba(var(--border),0.08)] flex items-center justify-center text-muted hover:text-[rgb(var(--accent))] hover:border-[rgba(var(--accent),0.25)] transition-all duration-300"
              data-hover="true" aria-label={link.label}>
              {link.icon}
            </a>
          ))}
        </div>

        <div className="mt-16 pt-5 border-t border-[rgba(var(--border),0.04)] flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-display font-bold text-sm text-[rgb(var(--fg))]">MT<span style={{ color: 'rgb(var(--accent))' }}>.</span></p>
          <p className="text-xs text-subtle">Manvik Talwar — AI/ML Engineer</p>
          <p className="font-mono-data text-xs text-subtle">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
