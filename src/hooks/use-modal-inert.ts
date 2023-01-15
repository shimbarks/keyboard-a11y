import { RefObject, useCallback } from 'react';
import { getElementsToInert } from '../utils/dom.utils';
import { useModalLooseTrap } from './use-modal-loose-trap';

export interface UseInertProps {
  modalRef: RefObject<HTMLElement>;
  isOpen: boolean;
}

export function useModalInert({ modalRef, isOpen }: UseInertProps) {
  const inert = useCallback((): Element[] => {
    const elementsToInert = getElementsToInert(modalRef);

    elementsToInert.forEach((element) => {
      element.setAttribute('inert', 'true');
    });

    return elementsToInert;
  }, [modalRef]);

  const unInert = (inertedElements: Element[]) => {
    inertedElements.forEach((element) => {
      element.removeAttribute('inert');
    });
  };

  useModalLooseTrap({
    isOpen,
    trap: inert,
    unTrap: unInert,
  });
}
