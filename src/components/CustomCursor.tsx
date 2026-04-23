import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const { theme } = useTheme();

  const color = theme === 'light' ? '#1a1a1a' : '#ffffff';

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.dataset.hover === 'true') {
        isHoveringRef.current = true;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.dataset.hover === 'true') {
        isHoveringRef.current = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    let rafId: number;
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12;

      const dotSize = isHoveringRef.current ? 36 : 6;
      const ringSize = isHoveringRef.current ? 48 : 28;

      dot.style.transform = `translate(${posRef.current.x - dotSize / 2}px, ${posRef.current.y - dotSize / 2}px)`;
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;

      ring.style.transform = `translate(${targetRef.current.x - ringSize / 2}px, ${targetRef.current.y - ringSize / 2}px)`;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          width: 6, height: 6, backgroundColor: color,
          transition: 'width 0.25s ease, height 0.25s ease, background-color 0.4s ease',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: 28, height: 28,
          border: `1px solid ${color}`,
          opacity: 0.2,
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.4s ease, opacity 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
