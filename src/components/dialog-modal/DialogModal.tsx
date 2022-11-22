import React, {
  ReactElement,
  ReactEventHandler,
  ReactNode,
  RefObject,
  useRef,
} from 'react';
import { useDialog } from '../../hooks/use-dialog';

import '../custom-modal/CustomModal.scss';
import './DialogModal.scss';

export interface DialogModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
  children?: ReactNode;
  closeButton?: ReactElement;
}

export const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  onClose,
  onOpenFocusRef,
  onCloseFocusRef,
  children,
  closeButton,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useDialog({
    isOpen,
    dialogRef,
    onOpenFocusRef,
    onCloseFocusRef,
  });

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
