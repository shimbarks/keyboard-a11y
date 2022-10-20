import { RefObject, useEffect } from 'react';
import { getFirstFocusableElement } from '../utils/dom.utils';

export interface UseFocusOnOpenProps {
  isOpen: boolean;
  containerRef: RefObject<HTMLElement>;
  customRef?: RefObject<HTMLElement>;
}

export const useFocusOnOpen = ({
  isOpen,
  containerRef,
  customRef,
}: UseFocusOnOpenProps): void => {
  useEffect(() => {
    if (isOpen) {
      const elementToFocus =
        customRef?.current ??
        (containerRef.current &&
          getFirstFocusableElement(containerRef.current));

      elementToFocus?.focus();
    }
  }, [isOpen, containerRef, customRef]);
};
