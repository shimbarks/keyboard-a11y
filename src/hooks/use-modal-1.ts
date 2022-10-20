import { ReactEventHandler, RefObject } from 'react';
import { useEscapeListener } from './use-escape-listener';
import { useFocusOnClose } from './use-focus-on-close';
import { useFocusOnOpen } from './use-focus-on-open';
import { useKeyboardTrap } from './use-keyboard-trap';

export interface UseModal1Props {
  isOpen: boolean;
  onClose: ReactEventHandler;
  modalRef: RefObject<HTMLElement>;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
}

export const useModal1 = ({
  isOpen,
  onClose,
  modalRef,
  onOpenFocusRef,
  onCloseFocusRef,
}: UseModal1Props) => {
  useFocusOnClose({
    isOpen,
    customRef: onCloseFocusRef,
  });

  useFocusOnOpen({
    isOpen,
    containerRef: modalRef,
    customRef: onOpenFocusRef,
  });

  useEscapeListener({
    isOpen,
    containerRef: modalRef,
    callback: onClose,
  });

  useKeyboardTrap({
    isOpen,
    containerRef: modalRef,
  });
};
