import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactEventHandler,
  ReactNode,
  RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import './CustomModal.scss';

export interface CustomModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
  onOpenFocusRef?: RefObject<HTMLElement>;
  onCloseFocusRef?: RefObject<HTMLElement>;
  children?: ReactNode;
  closeButton?: ReactElement;
}

const CustomModalComponent = (
  { isOpen, children, closeButton }: CustomModalProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const visibleMod = isOpen ? 'visible' : 'hidden';

  return createPortal(
    <div
      ref={ref}
      className={`modal__container modal__container--${visibleMod}`}
      role="dialog"
      aria-modal="true"
      aria-label="modal-dialog"
    >
      <div className={`modal__box modal__box--${visibleMod}`}>
        <div className="modal__close-btn">{closeButton}</div>
        <div className="modal__content">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root') ?? document.body,
  );
};

export const CustomModal = forwardRef<HTMLDivElement, CustomModalProps>(
  CustomModalComponent,
);
