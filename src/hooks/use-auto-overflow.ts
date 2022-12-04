import { RefObject, useEffect } from 'react';

export const useAutoOverflow = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.tabIndex = 0;
    }
  }, []);
};
