import React, {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  RefObject,
  useRef,
} from 'react';
import { useModal } from '../../hooks/use-modal';
import './Modal.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
  children?: ReactNode;
  closeButton: ReactElement;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpenFocusRef,
  onCloseFocusRef,
  children,
  closeButton,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useModal({
    isOpen,
    onClose,
    modalRef,
    onOpenFocusRef,
    onCloseFocusRef,
  });

  return isOpen ? (
    <div
      ref={modalRef}
      className="modal__container"
      role="dialog"
      aria-modal="true"
      aria-label="modal-dialog"
    >
      <div className="modal__box">
        <div className="modal__close-btn">{closeButton}</div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  ) : null;
};
