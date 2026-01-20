'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  borderClassName?: string;
}

export function MovingBorder({
  children,
  duration = 4,
  className,
  borderClassName,
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  return (
    <div className={cn('relative', className)}>
      {/* SVG Border Animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <motion.rect
          ref={pathRef}
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="12"
          stroke="url(#border-gradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray={pathLength}
          className={cn(borderClassName)}
          animate={{
            strokeDashoffset: [pathLength, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
