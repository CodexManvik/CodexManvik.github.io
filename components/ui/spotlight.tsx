'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/lib/hooks/useMediaQuery';

interface SpotlightProps {
  className?: string;
  fill?: string;
  size?: number;
}

export function Spotlight({
  className,
  fill = 'rgba(139, 92, 246, 0.3)',
  size = 600,
}: SpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile || !mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mounted]);

  // Always render the same structure to avoid hydration mismatch
  // Use consistent gradient syntax for both server and client
  const backgroundStyle = (!mounted || isMobile)
    ? `radial-gradient(${size}px at 50% 50%, ${fill}, transparent 80%)`
    : `radial-gradient(${size}px at ${position.x}px ${position.y}px, ${fill}, transparent 80%)`;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0',
        className
      )}
      style={{
        background: backgroundStyle,
      }}
    />
  );
}
