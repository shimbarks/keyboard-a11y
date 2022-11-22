import React, { RefObject, useRef } from 'react';
import { useInert } from '../../hooks/use-inert';
import { useModal1 } from '../../hooks/use-modal-1';
import { CustomModal, CustomModalProps } from './CustomModal';

export const CustomModalLoose: React.FC<CustomModalProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useInert({ containerRef: modalRef, isOpen: props.isOpen });

  useModal1({
    isOpen: props.isOpen,
    onClose: props.onClose,
    modalRef: modalRef as RefObject<HTMLDivElement>,
    onOpenFocusRef: props.onOpenFocusRef,
    onCloseFocusRef: props.onCloseFocusRef,
  });

  return <CustomModal {...props} ref={modalRef} />;
};
