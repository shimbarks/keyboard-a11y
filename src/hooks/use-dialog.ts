import { RefObject, useEffect, useState } from 'react';
import { useFocusOnClose } from './use-focus-on-close';
import { useFocusOnOpen } from './use-focus-on-open';
import { useKeyboardTrap } from './use-keyboard-trap';

export interface UseDialogProps {
  isOpen: boolean;
  dialogRef: RefObject<HTMLElement>;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
}

export const useDialog = ({
  isOpen,
  dialogRef,
  onOpenFocusRef,
  onCloseFocusRef,
}: UseDialogProps) => {
  const [delayedIsOpen, setDelayedIsOpen] = useState<boolean>(false);

  // we can't manipulate focus based on isOpen since the native dialog focus behaviour overrides it,
  // so we need to use a separate state which will be set after the default focus occurs:
  useEffect(() => {
    setDelayedIsOpen(isOpen);
  }, [isOpen]);

  useFocusOnClose({
    isOpen: delayedIsOpen,
    customRef: onCloseFocusRef,
  });

  useFocusOnOpen({
    isOpen: delayedIsOpen,
    containerRef: dialogRef,
    customRef: onOpenFocusRef,
  });

  useKeyboardTrap({
    isOpen,
    containerRef: dialogRef,
  });
};
