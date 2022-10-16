import {
  MutableRefObject,
  ReactEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { getFirstFocusableElement, keyboardTrap } from '../utils/dom.utils';

export interface UseModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
  modalRef: RefObject<HTMLElement>;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
}

export const useModal = ({
  isOpen,
  onClose,
  modalRef,
  onOpenFocusRef,
  onCloseFocusRef,
}: UseModalProps) => {
  const openerRef: MutableRefObject<HTMLElement | null> =
    useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  const getOnOpenFocusElement = (): HTMLElement | null => {
    return (
      onOpenFocusRef?.current ??
      (modalRef.current ? getFirstFocusableElement(modalRef.current) : null)
    );
  };

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
      getOnOpenFocusElement()?.focus(); // shift focus into the modal when it opens
    } else {
      modalRef.current?.removeEventListener('keydown', keyListener); // stop listening to 'Esc' and 'Tab' while modal is hidden
      (onCloseFocusRef ?? openerRef).current?.focus(); // shift focus to outside of the modal when the it closes
    }
  }, [isOpen]);
};
