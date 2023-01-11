import { RefObject, useEffect } from 'react';
import { getFocusableElements } from '../utils/dom.utils';

export interface UseFocusOnOpenProps {
  isOpen: boolean;
  containerRef: RefObject<HTMLElement>;
  customRef?: RefObject<HTMLElement>;
}

export function useFocusOnOpen({
  isOpen,
  containerRef,
  customRef,
}: UseFocusOnOpenProps): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (customRef?.current) {
      customRef.current.focus();
    } else if (containerRef.current) {
      const firstFocusableElement = getFocusableElements({
        containerElement: containerRef.current,
      })[0];

      if (firstFocusableElement) {
        firstFocusableElement.focus();
      } else {
        containerRef.current.tabIndex = -1;
        containerRef.current.focus();
      }
    }
  }, [isOpen, containerRef, customRef]);
}
