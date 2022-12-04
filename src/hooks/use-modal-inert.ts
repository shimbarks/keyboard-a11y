import { RefObject, useEffect, useState } from 'react';

export interface UseInertProps {
  modalRef: RefObject<HTMLElement>;
  isOpen: boolean;
}

export const useModalInert = ({ modalRef, isOpen }: UseInertProps) => {
  const [inertedElements, setInertedElements] = useState<Element[]>([]);

  useEffect(() => {
    if (isOpen) {
      // in case the current modal got inerted by a different modal that is still open:
      modalRef.current?.removeAttribute('inert');
      inert();
    } else {
      unInert();
    }
  }, [isOpen]);

  const inert = () => {
    const allModals = Array.from(
      document.getElementById('modal-root')?.children ?? [],
    );

    const allOtherModals = allModals.filter((modal) => {
      return modal !== modalRef.current && !modal.hasAttribute('inert');
    });

    const elementsToInert = [...allOtherModals];

    const rootElement = document.getElementById('root');

    if (rootElement && !rootElement.hasAttribute('inert')) {
      elementsToInert.push(rootElement);
    }

    elementsToInert.forEach((element) => {
      element.setAttribute('inert', 'true');
    });

    setInertedElements(elementsToInert);
  };

  const unInert = () => {
    inertedElements.forEach((element) => {
      element.removeAttribute('inert');
    });
  };
};
