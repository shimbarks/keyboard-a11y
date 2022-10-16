import React, {
  MouseEventHandler,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useModal } from '../../hooks/use-modal';
import './Modal.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLElement>;
  onOpenFocusRef?: RefObject<HTMLElement>;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOpenFocusRef,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [openerElement, setOpenerElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setOpenerElement(document.activeElement as HTMLElement);
    }
  }, [isOpen]);

  useModal({
    modalRef,
    openerRef: { current: openerElement },
    isOpen,
    onClose,
    onOpenFocusRef,
  });

  return isOpen ? (
    <div
      ref={modalRef}
      className="modal__container"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal__box">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          X
        </button>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  ) : null;
};
