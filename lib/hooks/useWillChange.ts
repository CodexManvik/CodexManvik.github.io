'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook to manage will-change CSS property for performance optimization
 * Automatically removes will-change after animation completes to avoid memory issues
 */
export function useWillChange(properties: string[], isAnimating: boolean) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (isAnimating) {
      element.style.willChange = properties.join(', ');
    } else {
      // Remove will-change after animation completes
      const timeout = setTimeout(() => {
        element.style.willChange = 'auto';
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [properties, isAnimating]);

  return elementRef;
}
