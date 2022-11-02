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
      let elementToFocus = customRef?.current;

      if (!elementToFocus && containerRef.current) {
        elementToFocus = getFirstFocusableElement(containerRef.current);

        if (!elementToFocus) {
          containerRef.current.tabIndex = -1;
          elementToFocus = containerRef.current;
        }
      }

      elementToFocus?.focus();
    }
  }, [isOpen, containerRef, customRef]);
};
