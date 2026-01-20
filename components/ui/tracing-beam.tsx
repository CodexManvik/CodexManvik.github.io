'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface TracingBeamProps {
  className?: string;
  children: React.ReactNode;
}

export function TracingBeam({ className, children }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="absolute left-4 top-0 h-full w-[2px] md:left-8">
        <svg
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          className="h-full w-full"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="url(#beam-gradient)"
            strokeWidth={2}
            strokeLinecap="round"
            style={{
              pathLength,
              strokeDasharray: '1 0',
            }}
          />
        </svg>
      </div>

      <div className="ml-12 md:ml-20">{children}</div>
    </div>
  );
}
