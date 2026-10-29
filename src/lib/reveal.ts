import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Runs `setup` (entrance animations) for the section in `scope`, failing open:
 * - the prerendered HTML has no hidden state, so without JS everything is visible;
 * - with reduced motion nothing is animated or hidden;
 * - setup waits for the first animation frame. GSAP only advances on frames, and a
 *   background tab or automated browser can run JS while painting none, which used
 *   to leave sections stuck at opacity 0. No frame, nothing hidden.
 * Tweens are scoped to the section and reverted on unmount.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, setup: () => void) {
  useGSAP((_, contextSafe) => {
    if (prefersReducedMotion()) return;
    const frame = requestAnimationFrame(contextSafe!(setup));
    return () => cancelAnimationFrame(frame);
  }, { scope });
}

/**
 * Fades `targets` in once `trigger` scrolls into view. `once` stops a reveal from
 * ever re-hiding content, and a trigger already above the viewport (fast scroll,
 * deep link) plays straight away. Call it from a useReveal setup.
 */
export function reveal(
  targets: gsap.TweenTarget,
  trigger: Element,
  from: gsap.TweenVars = { y: 40 },
  vars: gsap.TweenVars = {},
) {
  // A trigger that is also a target gets measured in its shifted-down from-state,
  // which would reveal it that many pixels late; measure from where it ends up.
  const shift = typeof from.y === 'number' && gsap.utils.toArray(targets).includes(trigger) ? from.y : 0;
  const tween = gsap.from(targets, {
    ...from,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out',
    ...vars,
    scrollTrigger: {
      trigger,
      start: `top${shift ? `-=${shift}` : ''} 85%`,
      once: true,
      // If frames stop after the reveal starts, a timer (which still runs) finishes it.
      onEnter: () => { setTimeout(() => tween.progress(1), (tween.totalDuration() + 1) * 1000); },
    },
  });
}

/**
 * Trigger positions are measured when the sections mount. The web fonts load
 * non-blocking and reflow the page afterwards (by ~250 px by the Achievements
 * section), which left triggers firing at the wrong scroll position. Re-measure
 * whenever the page height changes, and after every image load.
 */
export function refreshScrollTriggersOnLayoutChange(): () => void {
  let frame = 0;
  const refresh = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  let height = document.body.scrollHeight;
  const observer = new ResizeObserver(() => {
    if (document.body.scrollHeight === height) return;
    height = document.body.scrollHeight;
    refresh();
  });
  observer.observe(document.body);
  // `load` doesn't bubble, so listen in the capture phase to catch lazy images too.
  const onLoad = (e: Event) => { if (e.target instanceof HTMLImageElement) refresh(); };
  document.addEventListener('load', onLoad, true);
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    document.removeEventListener('load', onLoad, true);
  };
}
