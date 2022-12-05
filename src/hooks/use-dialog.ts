import { RefObject, useEffect, useState } from 'react';
import { useFocusOnClose } from './use-focus-on-close';
import { useFocusOnOpen } from './use-focus-on-open';

export interface UseDialogProps {
  isOpen: boolean;
  dialogRef: RefObject<HTMLDialogElement>;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
}

export function useDialog({
  isOpen,
  dialogRef,
  onOpenFocusRef,
  onCloseFocusRef,
}: UseDialogProps) {
  const [delayedIsOpen, setDelayedIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen, dialogRef]);

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
}
