import React, {
  ReactElement,
  ReactEventHandler,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { useDialog } from '../../hooks/use-dialog';

import '../modal/Modal.scss';
import './Dialog.scss';

export interface DialogProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
  children?: ReactNode;
  closeButton: ReactElement;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onOpenFocusRef,
  onCloseFocusRef,
  children,
  closeButton,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // const visibleMod = isOpen ? 'visible' : 'hidden';

  useDialog({
    isOpen,
    dialogRef,
    onOpenFocusRef,
    onCloseFocusRef,
  });

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      onCancel={onClose} // reset state upon 'Esc' keypress
      ref={dialogRef}
      className="dialog"
    >
      <div className="modal__close-btn">{closeButton}</div>
      <div className="modal__content">{children}</div>
    </dialog>
  );
};
