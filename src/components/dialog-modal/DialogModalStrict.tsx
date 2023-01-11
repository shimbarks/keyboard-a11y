import React, { useRef } from 'react';
import { useFocusTrap } from '../../hooks/use-focus-trap';
import { DialogModal, DialogModalProps } from './DialogModal';

export const DialogModalStrict: React.FC<DialogModalProps> = (props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useFocusTrap({
    isOpen: props.isOpen,
    containerRef: dialogRef,
  });

  return <DialogModal {...props} ref={dialogRef} />;
};
