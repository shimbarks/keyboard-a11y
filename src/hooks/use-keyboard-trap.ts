import { RefObject } from 'react';
import { keyboardTrap } from '../utils/dom.utils';
import { useKeydownListener } from './use-keydown-listener';

export interface UseKeyboardTrapProps {
  isOpen: boolean;
  containerRef: RefObject<HTMLElement>;
}

export const useKeyboardTrap = ({
  isOpen,
  containerRef,
}: UseKeyboardTrapProps): void => {
  useKeydownListener({
    containerRef,
    isOpen,
    keyListenerMap: { Tab: (e) => keyboardTrap(e, containerRef) },
  });
};
