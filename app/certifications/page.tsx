import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CertificationsGallery } from '@/components/sections/CertificationsGallery';

export const metadata: Metadata = {
  title: 'Certifications | Manvik Talwar',
  description: 'Verified certifications across AI, cloud, systems, and software engineering.',
};

export default function CertificationsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black py-20">
      <div
        className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"
        aria-hidden="true"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />

      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="certifications-title">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.02] px-4 py-2 text-sm text-white transition-all hover:bg-white/[0.08]"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Link>

        <h1
          id="certifications-title"
          className="mt-8 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
        >
          Certifications
        </h1>

        <p className="mt-4 max-w-3xl text-base text-neutral-300 sm:text-lg">
          A curated collection of certifications spanning AI, cloud computing, algorithms, backend engineering, and Linux administration.
        </p>

        <div className="mt-10">
          <CertificationsGallery />
        </div>
      </section>
    </main>
  );
}