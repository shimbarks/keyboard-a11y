import React, { RefObject, useRef } from 'react';
import { useModal } from '../../hooks/use-modal';
import { useModalTabindex } from '../../hooks/use-modal-tabindex';
import { CustomModal, CustomModalProps } from './CustomModal';

export const CustomModalLooseTabindex: React.FC<CustomModalProps> = (props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // useModalTabindex must be called before useFocusOnClose (which is called within useModal) in order to
  // remove the -1 tabindex attribute of the opener element before trying to focus on it upon modal close
  useModalTabindex({ modalRef, isOpen: props.isOpen });

  useModal({
    isOpen: props.isOpen,
    onClose: props.onClose,
    modalRef: modalRef as RefObject<HTMLDivElement>,
    onOpenFocusRef: props.onOpenFocusRef,
    onCloseFocusRef: props.onCloseFocusRef,
  });

  return <CustomModal {...props} ref={modalRef} />;
};
