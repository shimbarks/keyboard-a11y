import React, { RefObject, useRef } from 'react';
import { useModal } from '../../hooks/use-modal';
import { useModalInert } from '../../hooks/use-modal-inert';
import { CustomModal, CustomModalProps } from './CustomModal';

export const CustomModalLoose: React.FC<CustomModalProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // useModalInert must be called before useFocusOnClose (which is called within useModal) in order to
  // remove the inert attribute of the opener element before trying to focus on it upon modal close
  useModalInert({ modalRef, isOpen: props.isOpen });

  useModal({
    isOpen: props.isOpen,
    onClose: props.onClose,
    modalRef: modalRef as RefObject<HTMLDivElement>,
    onOpenFocusRef: props.onOpenFocusRef,
    onCloseFocusRef: props.onCloseFocusRef,
  });

  return <CustomModal {...props} ref={modalRef} />;
};
