'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TechStackItem } from '@/data/types';
import { useIsMobile } from '@/lib/hooks/useMediaQuery';
import * as Icons from 'lucide-react';

interface InfiniteMovingCardsProps {
  items: TechStackItem[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Duplicate items for seamless infinite loop
  const duplicatedItems = [...items, ...items];

  // Calculate animation duration based on speed (slower on mobile for better performance)
  const speedMap = {
    slow: (mounted && isMobile) ? 60 : 40,
    normal: (mounted && isMobile) ? 30 : 20,
    fast: (mounted && isMobile) ? 15 : 10,
  };
  const duration = speedMap[speed];

  // Get icon component from lucide-react
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="flex gap-8"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        whileHover={pauseOnHover && mounted && !isMobile ? { animationPlayState: 'paused' } : {}}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-neutral-900 rounded-lg border border-white/10"
          >
            <div className="text-purple-400">
              {getIcon(item.icon)}
            </div>
            <span className="text-sm font-medium text-white">{item.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
