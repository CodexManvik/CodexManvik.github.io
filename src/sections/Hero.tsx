import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Download, FolderGit2 } from 'lucide-react';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const proofRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0;
    let particles: Array<{
      x: number; y: number; baseX: number; baseY: number;
      size: number; speed: number; color: string; angle: number;
    }> = [];
    const colors = [
      'rgb(var(--hero-particle-1))',
      'rgb(var(--hero-particle-2))',
      'rgb(var(--hero-particle-3))',
      'rgb(var(--hero-particle-4))',
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 20000), 50);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x, y, baseX: x, baseY: y,
          size: Math.random() * 1.2 + 0.3, speed: Math.random() * 0.2 + 0.05,
          color: colors[Math.floor(Math.random() * colors.length)], angle: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.02;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.02;
      const mx = mouseRef.current.x * width;
      const my = mouseRef.current.y * height;

      particles.forEach((p) => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x -= dx * force * 0.01;
          p.y -= dy * force * 0.01;
        }
        p.x += (p.baseX - p.x) * 0.008;
        p.y += (p.baseY - p.y) * 0.008;
        p.angle += 0.002;
        p.x += Math.sin(p.angle) * p.speed * 0.3;
        p.y += Math.cos(p.angle) * p.speed * 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.25;
        ctx.fill();
      });

      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = 'rgb(var(--hero-line))';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / width;
      mouseRef.current.targetY = e.clientY / height;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    const raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(titleRef.current, { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' })
      .fromTo(taglineRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .fromTo(proofRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2');
    return () => { tl.kill(); };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--hero-gradient)' }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: 'var(--hero-overlay)' }} />

      <div className="relative z-[3] text-center px-6 max-w-3xl mx-auto">
        <p ref={taglineRef} className="font-mono-data text-xs tracking-widest uppercase mb-6" style={{ color: 'rgb(var(--accent))' }}>
          Manipal University Jaipur — B.Tech CSE (AI & ML)
        </p>
        <h1 ref={titleRef} className="font-display font-bold uppercase tracking-tighter leading-[0.92]"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
          <span className="block text-[rgb(var(--fg))]">Manvik</span>
          <span className="block text-gradient">Talwar</span>
        </h1>
        <p ref={proofRef} className="mt-7 text-muted font-light tracking-wide max-w-lg mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}>
          I enjoy turning messy real-world problems into AI systems that people actually want to use.
        </p>

        <div ref={ctaRef} className="mt-10 flex items-center justify-center gap-3 flex-wrap">
          <button onClick={scrollToProjects}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full border border-[rgba(var(--border),0.12)] text-[rgb(var(--fg))] hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))] transition-all duration-400"
            data-hover="true">
            <FolderGit2 size={15} />
            View Projects
          </button>
          <a href="https://github.com/CodexManvik" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full border border-[rgba(var(--border),0.08)] text-muted hover:text-[rgb(var(--fg))] hover:border-[rgba(var(--border),0.2)] transition-all duration-400"
            data-hover="true">
            <Github size={15} />
            GitHub
          </a>
          <a href="./manvik-talwar-resume.pdf" download
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-full text-white"
            style={{ backgroundColor: 'rgb(var(--accent))' }}
            data-hover="true">
            <Download size={15} />
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
