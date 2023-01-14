import { ReactEventHandler, RefObject } from 'react';
import { useFocusOnClose } from './use-focus-on-close';
import { useFocusOnOpen } from './use-focus-on-open';
import { useKeydownListener } from './use-keydown-listener';

export interface UseModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
  modalRef: RefObject<HTMLElement>;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
}

export function useModal({
  isOpen,
  onClose,
  modalRef,
  onOpenFocusRef,
  onCloseFocusRef,
}: UseModalProps) {
  // useFocusOnClose must be called before useFocusOnOpen, otherwise the focus would shift into the modal before
  // saving the active element which needs to gain focus upon modal close
  useFocusOnClose({
    isOpen,
    customRef: onCloseFocusRef,
  });

  useFocusOnOpen({
    isOpen,
    containerRef: modalRef,
    customRef: onOpenFocusRef,
  });

  useKeydownListener({
    containerRef: modalRef,
    listen: isOpen,
    keyListenerMap: { Escape: onClose },
  });
}
