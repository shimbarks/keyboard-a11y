import React, { RefObject, useRef } from 'react';
import { useKeyboardTrap } from '../../hooks/use-keyboard-trap';
import { useModal1 } from '../../hooks/use-modal-1';
import { CustomModal, CustomModalProps } from './CustomModal';

export const CustomModalStrict: React.FC<CustomModalProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useModal1({
    isOpen: props.isOpen,
    onClose: props.onClose,
    modalRef: modalRef as RefObject<HTMLDivElement>,
    onOpenFocusRef: props.onOpenFocusRef,
    onCloseFocusRef: props.onCloseFocusRef,
  });

  useKeyboardTrap({
    isOpen: props.isOpen,
    containerRef: modalRef,
  });

  return <CustomModal {...props} ref={modalRef} />;
};
