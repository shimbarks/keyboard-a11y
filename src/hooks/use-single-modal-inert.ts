import { useEffect } from 'react';

export function useSingleModalInert({ isOpen }: { isOpen: boolean }) {
  useEffect(() => {
    const rootElement = document.getElementById('root');

    if (isOpen) {
      rootElement?.setAttribute('inert', 'true');
    } else {
      rootElement?.removeAttribute('inert');
    }
  }, [isOpen]);
}
