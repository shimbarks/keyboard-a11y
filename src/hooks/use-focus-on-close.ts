import { MutableRefObject, RefObject, useEffect, useRef } from 'react';

export interface UseFocusOnCloseProps {
  isOpen: boolean;
  customRef?: RefObject<HTMLElement>;
}

export const useFocusOnClose = ({
  isOpen,
  customRef,
}: UseFocusOnCloseProps): void => {
  const openerRef: MutableRefObject<HTMLElement | null> =
    useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement as HTMLElement;
    } else {
      (customRef ?? openerRef).current?.focus();
    }
  }, [isOpen, customRef]);
};
