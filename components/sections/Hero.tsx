'use client';

import { motion } from 'framer-motion';
import { Spotlight } from '@/components/ui/spotlight';
import { ArrowRight, Download } from 'lucide-react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Simplified animations for reduced motion
  const animationProps = prefersReducedMotion
    ? { initial: {}, animate: {}, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section 
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      aria-label="Hero section"
    >
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 bg-grid-white/[0.15] bg-[size:50px_50px]"
        aria-hidden="true"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
        }}
      />

      {/* Spotlight effect */}
      <div aria-hidden="true">
        <Spotlight className="z-10" fill="rgba(139, 92, 246, 0.3)" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          {...animationProps}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
          className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl"
          style={{ textShadow: '0 0 40px rgba(139, 92, 246, 0.3)' }}
        >
          Manvik Talwar
        </motion.h1>

        <motion.h2
          {...animationProps}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.4 }}
          className="mt-6 text-xl text-neutral-300 sm:text-2xl md:text-3xl"
        >
          AI/ML Engineer & Full-Stack Developer
        </motion.h2>

        <motion.p
          {...animationProps}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-base text-neutral-400 sm:text-lg"
        >
          Building intelligent systems with deep learning, RAG architectures, and modern web technologies
        </motion.p>

        <motion.div
          {...animationProps}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            aria-label="View my work - scroll to projects section"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-base font-medium text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            View My Work
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>

          <a
            href="/assets/Manvik_Talwar_Resume.pdf"
            download="Manvik_Talwar_Resume.pdf"
            aria-label="Download resume"
            className="group relative inline-flex items-center gap-2 rounded-lg border border-white/20 bg-transparent px-8 py-4 text-base font-medium text-white transition-all hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
          >
            Download Resume
            <Download className="h-5 w-5 transition-transform group-hover:translate-y-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
