import { RefObject, useCallback, useEffect } from 'react';

export interface UseKeydownListenerProps {
  containerRef: RefObject<HTMLElement>;
  isOpen: boolean;
  keyListenerMap: { [key: string]: (e: any) => void };
}

export const useKeydownListener = ({
  containerRef,
  isOpen,
  keyListenerMap,
}: UseKeydownListenerProps): void => {
  const keyListener = useCallback(
    (event: KeyboardEvent) => keyListenerMap[event.key]?.(event),
    [keyListenerMap],
  );

  useEffect(() => {
    if (isOpen) {
      containerRef.current?.addEventListener('keydown', keyListener);
    } else {
      containerRef.current?.removeEventListener('keydown', keyListener);
    }
  }, [isOpen, containerRef, keyListener]);
};
