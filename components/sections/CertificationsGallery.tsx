import { ExternalLink } from 'lucide-react';
import { certifications } from '@/data/certifications';

export function CertificationsGallery() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-label="Certification tiles">
      {certifications.map((certification) => {
        const certificatePath = `/certifications/${encodeURIComponent(certification.fileName)}`;

        return (
          <a
            key={certification.id}
            href={certificatePath}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open certificate ${certification.title}`}
            className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-cyan-500/10"
          >
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />

            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-100">
              {certification.category}
            </p>

            <h2 className="mt-4 text-xl font-semibold leading-tight text-white">{certification.title}</h2>

            <p className="mt-2 text-sm text-neutral-300">{certification.description}</p>

            <div className="mt-5 flex items-center justify-between text-sm text-neutral-300">
              <span>{certification.issuer}</span>
              <span className="inline-flex items-center gap-1 text-cyan-200">
                Open PDF
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}