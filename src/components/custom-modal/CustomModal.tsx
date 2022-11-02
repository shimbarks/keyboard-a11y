import React, {
  ReactElement,
  ReactEventHandler,
  ReactNode,
  RefObject,
  useRef,
} from 'react';
import { useModal1 } from '../../hooks/use-modal-1';
import './CustomModal.scss';

export interface CustomModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
  children?: ReactNode;
  closeButton?: ReactElement;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  onOpenFocusRef,
  onCloseFocusRef,
  children,
  closeButton,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const visibleMod = isOpen ? 'visible' : 'hidden';

  useModal1({
    isOpen,
    onClose,
    modalRef,
    onOpenFocusRef,
    onCloseFocusRef,
  });

  return (
    <div
      ref={modalRef}
      className={`modal__container modal__container--${visibleMod}`}
      role="dialog"
      aria-modal="true"
      aria-label="modal-dialog"
    >
      <div className={`modal__box modal__box--${visibleMod}`}>
        <div className="modal__close-btn">{closeButton}</div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};
