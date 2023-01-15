import { useEffect, useState } from 'react';

export interface UseModalLooseTrapProps {
  isOpen: boolean;
  trap: () => Element[];
  unTrap: (elements: Element[]) => void;
}

export function useModalLooseTrap({
  isOpen,
  trap,
  unTrap,
}: UseModalLooseTrapProps) {
  const [disabledElements, setDisabledElements] = useState<Element[]>([]);

  useEffect(() => {
    if (isOpen) {
      setDisabledElements(trap());
    }
  }, [isOpen, trap]);

  // using 2 different calls to useEffect in order to avoid an infinite loop in which setDisabledElements
  // changes disabledElements, which would have called the useEffect again
  useEffect(() => {
    if (!isOpen) {
      unTrap(disabledElements);
    }
  }, [isOpen, unTrap, disabledElements]);
}
