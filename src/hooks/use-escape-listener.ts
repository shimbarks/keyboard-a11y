import { RefObject, useCallback, useEffect } from 'react';

export interface UseEscapeListenerProps {
  isOpen: boolean;
  containerRef: RefObject<HTMLElement>;
  callback: (e: any) => void;
}

export const useEscapeListener = ({
  isOpen,
  containerRef,
  callback,
}: UseEscapeListenerProps): void => {
  const keyListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        callback(event);
      }
    },
    [callback],
  );

  useEffect(() => {
    if (isOpen) {
      containerRef.current?.addEventListener('keydown', keyListener);
    } else {
      containerRef.current?.removeEventListener('keydown', keyListener);
    }
  }, [isOpen, containerRef, keyListener]);
};
