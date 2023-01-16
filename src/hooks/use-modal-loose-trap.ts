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
  const [inactiveElements, setInactiveElements] = useState<Element[]>([]);

  useEffect(() => {
    if (isOpen) {
      setInactiveElements(trap());
    }
  }, [isOpen, trap]);

  // using 2 different calls to useEffect in order to avoid an infinite loop in which setInactiveElements
  // changes inactiveElements, which would have called the useEffect again
  useEffect(() => {
    if (!isOpen) {
      unTrap(inactiveElements);
    }
  }, [isOpen, unTrap, inactiveElements]);
}
