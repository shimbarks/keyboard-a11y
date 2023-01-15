import { RefObject, useCallback } from 'react';
import { getFocusableElements } from '../utils/dom.utils';
import { useModalLooseTrap } from './use-modal-loose-trap';

export interface UseModalTabindexProps {
  modalRef: RefObject<HTMLElement>;
  isOpen: boolean;
}

export function useModalTabindex({ modalRef, isOpen }: UseModalTabindexProps) {
  const disableTab = useCallback((): Element[] => {
    const allTabbableElements = getFocusableElements({ tabbableOnly: true });

    const tabbableElementsOutsideModal = allTabbableElements.filter(
      (element) => modalRef.current && !modalRef.current.contains(element),
    );

    tabbableElementsOutsideModal.forEach((element) =>
      element.setAttribute('tabindex', '-1'),
    );

    return tabbableElementsOutsideModal;
  }, [modalRef]);

  const enableTab = (inertedElements: Element[]) => {
    inertedElements.forEach((element) => {
      element.setAttribute('tabindex', '0');
    });
  };

  useModalLooseTrap({
    isOpen,
    trap: disableTab,
    unTrap: enableTab,
  });
}
