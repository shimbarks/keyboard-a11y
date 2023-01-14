import { RefObject, useCallback, useEffect } from 'react';

export interface UseKeydownListenerProps {
  containerRef?: RefObject<HTMLElement | Document>;
  listen: boolean;
  keyListenerMap: { [key: string]: (e: any) => void };
}

export function useKeydownListener({
  containerRef = { current: document }, // if no ref is passed, we'll listen on the document element
  listen,
  keyListenerMap,
}: UseKeydownListenerProps): void {
  const keyListener = useCallback(
    (event: Event) => keyListenerMap[(event as KeyboardEvent).key]?.(event),
    [keyListenerMap],
  );

  useEffect(() => {
    let containerElement: HTMLElement | Document | undefined;

    if (listen && containerRef.current) {
      containerElement = containerRef.current;
      containerElement.addEventListener('keydown', keyListener);
    }

    return () => {
      containerElement?.removeEventListener('keydown', keyListener);
    };
  }, [listen, containerRef, keyListener]);
}
