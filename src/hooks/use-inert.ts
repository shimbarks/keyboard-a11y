import { RefObject, useEffect, useState } from 'react';
import { getTabbableElements } from '../utils/dom.utils';

export interface UseInertProps {
  containerRef: RefObject<HTMLElement>;
  isOpen: boolean;
}

export const useInert = ({ containerRef, isOpen }: UseInertProps) => {
  const [inertElements, setInertElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      inert();
    } else {
      unInert();
    }
  }, [isOpen]);

  const inert = () => {
    const tabbableElementsOutsideModal = getTabbableElements().filter(
      (element) => !containerRef.current?.contains(element),
    );

    tabbableElementsOutsideModal.forEach((element) => {
      element.setAttribute('inert', 'true');
    });

    setInertElements(tabbableElementsOutsideModal);
  };

  const unInert = () => {
    inertElements.forEach((element) => {
      element.removeAttribute('inert');
    });
  };
};
