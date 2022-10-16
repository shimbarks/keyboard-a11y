import { ReactEventHandler, RefObject, useCallback, useEffect } from 'react';
import { keyboardTrap } from '../utils/dom.utils';

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
  const keyListenerMap: { [key: string]: (e: any) => void } = {
    Escape: (e) => onClose(e),
    Tab: (e) => keyboardTrap(e, modalRef),
  };

  const keyListener = useCallback((event: KeyboardEvent) => {
    keyListenerMap[event.code]?.(event);
  }, []);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.addEventListener('keydown', keyListener); // apply exit upon 'Esc' and keyboard focus trapping while modal is visible
      firstFocusableRef.current?.focus(); // shift focus into the modal when it opens
    } else {
      modalRef.current?.removeEventListener('keydown', keyListener); // stop listening to 'Esc' while modal is hidden
      openerRef.current?.focus(); // restore focus to the opener element when the modal is closed
    }
  }, [isOpen]);
};
