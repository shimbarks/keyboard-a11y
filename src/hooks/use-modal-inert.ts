import { RefObject, useEffect, useState } from 'react';

export interface UseInertProps {
  modalRef: RefObject<HTMLElement>;
  isOpen: boolean;
}

export const useModalInert = ({ modalRef, isOpen }: UseInertProps) => {
  const [inertElements, setInertElements] = useState<Element[]>([]);

  useEffect(() => {
    if (isOpen) {
      // in case the current modal got inert by a different modal that is still open:
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
      return modal !== modalRef.current;
    });

    const elementsToInert = [...allOtherModals];

    const rootElement = document.getElementById('root');

    if (rootElement) {
      elementsToInert.push(rootElement);
    }

    elementsToInert.forEach((element) => {
      element.setAttribute('inert', 'true');
    });

    setInertElements(elementsToInert);
  };

  const unInert = () => {
    inertElements.forEach((element) => {
      element.removeAttribute('inert');
    });
  };
};
