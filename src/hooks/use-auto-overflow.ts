import { RefObject, useCallback, useEffect } from 'react';
import { isOverflown } from '../utils/dom.utils';
import { useKeydownListener } from './use-keydown-listener';

export function useAutoOverflow(ref: RefObject<HTMLElement>) {
  const setTabIndex = useCallback(() => {
    if (ref.current) {
      ref.current.tabIndex = isOverflown(ref.current) ? 0 : -1;
    }
  }, [ref]);

  // set the initial tabindex
  useEffect(() => {
    setTabIndex();
  }, [setTabIndex]);

  useKeydownListener({
    listen: true,
    keyListenerMap: { Tab: setTabIndex },
  });
}
