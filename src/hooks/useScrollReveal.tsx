import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/** Fraction of the viewport height an element must cross before it reveals. */
const REVEAL_THRESHOLD = 0.9;

/**
 * Fades elements up as they scroll into view.
 *
 * Replaces the GSAP + ScrollTrigger fade-ups (~114 kB raw / ~45 kB gzipped) at
 * no bundle cost. Two deliberate properties keep this from ever hiding the page:
 *
 *  1. The hidden state (`.reveal`) is applied here rather than in the markup, so
 *     if this hook never runs the content simply shows, unanimated.
 *  2. The first visibility check is synchronous, inside the layout effect, so
 *     anything already on screen is revealed before the first paint - it never
 *     waits on an async callback. Subsequent checks run off plain scroll events.
 *
 * Elements are dropped from the pending list once revealed, and the listeners
 * detach as soon as the list empties.
 *
 * Usage: spread the returned ref array over the elements to reveal. Do not add
 * a `reveal` class in JSX.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const refs = useRef<(T | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const all = refs.current.filter((el): el is T => el !== null);
    if (all.length === 0) return;

    let pending = all;

    // The markup is prerendered, so this content is already on screen. Hide it
    // with transitions suppressed so it snaps rather than fading out, then
    // restore them before anything scrolls into view.
    all.forEach((el) => el.classList.add('reveal-instant', 'reveal'));

    const check = () => {
      if (pending.length === 0) return;

      const limit = window.innerHeight * REVEAL_THRESHOLD;
      const stillHidden: T[] = [];

      for (const el of pending) {
        // Reveal once the top edge crosses the threshold. Using only `top` also
        // covers elements jumped clean past via an anchor link.
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add('reveal-visible');
        } else {
          stillHidden.push(el);
        }
      }

      pending = stillHidden;
      if (pending.length === 0) detach();
    };

    const detach = () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };

    // Synchronous first pass - whatever is already on screen shows immediately.
    check();

    // Flush the hidden state, then re-enable transitions for scroll reveals.
    void document.body.offsetHeight;
    all.forEach((el) => el.classList.remove('reveal-instant'));

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });

    return () => {
      detach();
      all.forEach((el) => el.classList.remove('reveal-instant', 'reveal', 'reveal-visible'));
    };
  }, []);

  return refs;
}
