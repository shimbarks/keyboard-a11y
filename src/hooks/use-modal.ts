import { ReactEventHandler, RefObject, useCallback } from 'react';
import { keyboardTrap } from '../utils/dom.utils';
import { useUpdateEffect } from './use-update-effect';

export interface UseModalProps {
  modalRef: RefObject<HTMLElement>;
  openerRef: RefObject<HTMLElement>;
  firstFocusableRef: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: ReactEventHandler;
}

export const useModal = ({
  modalRef,
  openerRef,
  firstFocusableRef,
  isOpen,
  onClose,
}: UseModalProps) => {
  const onEscape: ReactEventHandler = (event) => {
    onClose(event);
  };

  const keyListenerMap: { [key: string]: (e: any) => void } = {
    Escape: onEscape,
    Tab: (e) => keyboardTrap(e, modalRef),
  };

  const keyListener = useCallback((event: KeyboardEvent) => {
    keyListenerMap[event.code]?.(event);
  }, []);

  useUpdateEffect(() => {
    if (isOpen) {
      modalRef.current?.addEventListener('keydown', keyListener); // apply exit upon 'Esc' and keyboard focus trapping while modal is visible
      firstFocusableRef.current?.focus(); // shift focus into the modal when it opens
    } else {
      modalRef.current?.removeEventListener('keydown', keyListener); // stop listening to 'Esc' while modal is hidden
      openerRef.current?.focus(); // restore focus to the opener element when the modal is closed
    }
  }, [isOpen]);
};
