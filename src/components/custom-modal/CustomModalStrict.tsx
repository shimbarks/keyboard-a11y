import React, { RefObject, useRef } from 'react';
import { useFocusTrap } from '../../hooks/use-focus-trap';
import { useModal } from '../../hooks/use-modal';
import { CustomModal, CustomModalProps } from './CustomModal';

export const CustomModalStrict: React.FC<CustomModalProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useModal({
    isOpen: props.isOpen,
    onClose: props.onClose,
    modalRef: modalRef as RefObject<HTMLDivElement>,
    onOpenFocusRef: props.onOpenFocusRef,
    onCloseFocusRef: props.onCloseFocusRef,
  });

  useFocusTrap({
    isOpen: props.isOpen,
    containerRef: modalRef,
  });

  return <CustomModal {...props} ref={modalRef} />;
};
