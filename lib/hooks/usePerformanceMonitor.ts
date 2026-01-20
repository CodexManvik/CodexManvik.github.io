'use client';

import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  avgFrameTime: number;
  isLowPerformance: boolean;
}

/**
 * Hook to monitor frame rate and detect low performance
 * Automatically reduces complexity on sustained low frame rates
 */
export function usePerformanceMonitor(threshold = 45): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    avgFrameTime: 16.67,
    isLowPerformance: false,
  });

  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number>();

  useEffect(() => {
    let frameCount = 0;
    const maxSamples = 60; // Sample last 60 frames

    const measureFrame = () => {
      const now = performance.now();
      const frameTime = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      // Store frame time
      frameTimesRef.current.push(frameTime);
      if (frameTimesRef.current.length > maxSamples) {
        frameTimesRef.current.shift();
      }

      frameCount++;

      // Calculate metrics every 60 frames
      if (frameCount >= 60) {
        const avgFrameTime =
          frameTimesRef.current.reduce((a, b) => a + b, 0) /
          frameTimesRef.current.length;
        const fps = 1000 / avgFrameTime;
        const isLowPerformance = fps < threshold;

        setMetrics({
          fps: Math.round(fps),
          avgFrameTime: Math.round(avgFrameTime * 100) / 100,
          isLowPerformance,
        });

        // Log warning in development
        if (process.env.NODE_ENV === 'development' && isLowPerformance) {
          console.warn(`Low performance detected: ${Math.round(fps)} FPS`);
        }

        frameCount = 0;
      }

      rafIdRef.current = requestAnimationFrame(measureFrame);
    };

    rafIdRef.current = requestAnimationFrame(measureFrame);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [threshold]);

  return metrics;
}
