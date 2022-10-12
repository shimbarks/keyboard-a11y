import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useModal } from '../../hooks/use-modal';
import './Modal.scss';

export interface ModalProps {
  open: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [openerElement, setOpenerElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      setOpenerElement(document.activeElement as HTMLElement);
    }
  }, [open]);

  useModal({
    modalRef,
    openerRef: { current: openerElement },
    firstFocusableRef: closeRef,
    isOpen: open,
    onClose: onClose,
  });

  return open ? (
    <div
      ref={modalRef}
      className="modal__container"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal__box">
        <button
          ref={closeRef}
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        >
          X
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  ) : null;
};
