import { RefObject, useCallback, useEffect } from 'react';
import { isOverflown } from '../utils/dom.utils';

export const useAutoOverflow = (ref: RefObject<HTMLElement>) => {
  const keyListener = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab' && ref.current) {
      ref.current.tabIndex = isOverflown(ref.current) ? 0 : -1;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  }, []);
};
