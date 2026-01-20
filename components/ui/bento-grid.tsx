'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/useMediaQuery';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  gridSpan?: {
    cols: number;
    rows: number;
  };
  children?: React.ReactNode;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
        'max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
  gridSpan,
  children,
}: BentoGridItemProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const gridSpanClasses = gridSpan
    ? `md:col-span-${gridSpan.cols} md:row-span-${gridSpan.rows}`
    : '';

  return (
    <motion.div
      className={cn(
        'relative group/bento p-6 rounded-xl',
        'border border-white/10',
        'bg-gradient-to-br from-neutral-900 to-neutral-950',
        'hover:shadow-xl hover:shadow-purple-500/10',
        'transition-shadow duration-200',
        gridSpanClasses,
        className
      )}
      whileHover={mounted && !isMobile ? { scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-5 rounded-xl pointer-events-none" />

      {header && <div className="mb-4">{header}</div>}

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
        {children}
      </div>
    </motion.div>
  );
}
