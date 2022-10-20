import { RefObject, useCallback, useEffect } from 'react';
import { keyboardTrap } from '../utils/dom.utils';

export interface UseKeyboardTrapProps {
  isOpen: boolean;
  containerRef: RefObject<HTMLElement>;
}

export const useKeyboardTrap = ({
  isOpen,
  containerRef,
}: UseKeyboardTrapProps): void => {
  const keyListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Tab') {
        keyboardTrap(event, containerRef);
      }
    },
    [containerRef],
  );

  useEffect(() => {
    if (isOpen) {
      containerRef.current?.addEventListener('keydown', keyListener);
    } else {
      containerRef.current?.removeEventListener('keydown', keyListener);
    }
  }, [isOpen, containerRef, keyListener]);
};
