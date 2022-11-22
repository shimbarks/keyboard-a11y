import React, { useRef } from 'react';
import { useKeyboardTrap } from '../../hooks/use-keyboard-trap';
import { DialogModal, DialogModalProps } from './DialogModal';

export const DialogModalStrict: React.FC<DialogModalProps> = (props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useKeyboardTrap({
    isOpen: props.isOpen,
    containerRef: dialogRef,
  });

  return <DialogModal {...props} ref={dialogRef} />;
};
