import { EventHandler, RefObject, useEffect } from 'react';

export interface UseOutsideClickProps<T> {
  ref: RefObject<T>;
  handler: EventHandler<any>;
  excludeRefs: RefObject<HTMLElement>[];
  persist?: boolean;
}

export function useOutsideClick<T extends HTMLElement>({
  ref,
  handler,
  excludeRefs,
  persist,
}: UseOutsideClickProps<T>): void {
  useEffect(() => {
    const listener = (event: Event) => {
      const isInnerClick = ref.current?.contains(event.target as Node);
      const isExcludedClick = excludeRefs?.some((excludeRef) =>
        excludeRef.current?.contains(event.target as Node),
      );

      if (!isInnerClick && !isExcludedClick) {
        handler(event);

        if (!persist) {
          removeListener();
        }
      }
    };

    const addListener = () => {
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    };

    const removeListener = () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };

    addListener();

    return removeListener;
  }, [ref, handler, excludeRefs, persist]);
}
