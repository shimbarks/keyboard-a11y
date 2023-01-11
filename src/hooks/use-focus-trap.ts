import { RefObject } from 'react';
import { focusTrap } from '../utils/dom.utils';
import { useKeydownListener } from './use-keydown-listener';

export interface UseFocusTrapProps {
  isOpen: boolean;
  containerRef: RefObject<HTMLElement>;
}

export function useFocusTrap({
  isOpen,
  containerRef,
}: UseFocusTrapProps): void {
  useKeydownListener({
    containerRef,
    isOpen,
    keyListenerMap: { Tab: (e) => focusTrap(e, containerRef) },
  });
}
