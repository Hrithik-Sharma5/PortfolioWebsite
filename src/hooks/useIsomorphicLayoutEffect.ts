import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect in the browser, useEffect during prerendering.
 *
 * The static HTML is generated in Node, where useLayoutEffect cannot run and
 * React logs a warning about it. Layout effects are skipped on the server
 * either way, so swapping the import keeps the build output clean without
 * changing browser behaviour.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
