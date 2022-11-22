import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactEventHandler,
  ReactNode,
  RefObject,
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

const DialogModalComponent = (
  {
    isOpen,
    onClose,
    onOpenFocusRef,
    onCloseFocusRef,
    children,
    closeButton,
  }: DialogModalProps,
  ref: ForwardedRef<HTMLDialogElement>,
) => {
  useDialog({
    isOpen,
    dialogRef: ref as RefObject<HTMLDialogElement>,
    onOpenFocusRef,
    onCloseFocusRef,
  });

  return (
    <dialog
      onCancel={onClose} // reset state upon 'Esc' keypress
      ref={ref}
      className="dialog"
    >
      <div className="modal__close-btn">{closeButton}</div>
      <div className="modal__content">{children}</div>
    </dialog>
  );
};

export const DialogModal = forwardRef<HTMLDialogElement, DialogModalProps>(
  DialogModalComponent,
);
