import { RefObject, useCallback, useEffect } from 'react';
import { isOverflown } from '../utils/dom.utils';

export function useAutoOverflow(ref: RefObject<HTMLElement>) {
  const keyListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Tab' && ref.current) {
        if (isOverflown(ref.current)) {
          ref.current.setAttribute('tabindex', '0');
        } else {
          ref.current.removeAttribute('tabindex');
        }
      }
    },
    [ref],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('keydown', keyListener);
    };
  }, [keyListener]);
}
