import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * This hook is identical to useEffect, with the only exception of not being called during the initial render.
 */
export function useUpdateEffect(
  effect: EffectCallback,
  dependencies?: DependencyList,
): void {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      effect();
    } else {
      didMountRef.current = true;
    }
  }, dependencies);

  useEffect(() => {
    return () => {
      didMountRef.current = false;
    };
  }, []);
}
