import { RefObject, useCallback, useEffect, useState } from 'react';
import { getElementsToInert } from '../utils/dom.utils';

export interface UseInertProps {
  modalRef: RefObject<HTMLElement>;
  isOpen: boolean;
}

export function useModalInert({ modalRef, isOpen }: UseInertProps) {
  const [inertedElements, setInertedElements] = useState<Element[]>([]);

  const inert = useCallback(() => {
    const elementsToInert = getElementsToInert(modalRef);

    elementsToInert.forEach((element) => {
      element.setAttribute('inert', 'true');
    });

    setInertedElements(elementsToInert);
  }, [modalRef]);

  const unInert = useCallback(() => {
    inertedElements.forEach((element) => {
      element.removeAttribute('inert');
    });
  }, [inertedElements]);

  useEffect(() => {
    if (isOpen) {
      // in case the current modal got inerted by a different modal that is still open:
      modalRef.current?.removeAttribute('inert');
      inert();
    }
  }, [isOpen, modalRef, inert]);

  // using 2 different calls to useEffect in order to avoid an infinite loop in which the inert function
  // changes inertedElements, which on its turn recreates the unInert function, which would have called the useEffect again
  useEffect(() => {
    if (!isOpen) {
      unInert();
    }
  }, [isOpen, unInert]);
}
