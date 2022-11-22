import React, { useRef } from 'react';
import { DialogModal, DialogModalProps } from './DialogModal';

export const DialogModalLoose: React.FC<DialogModalProps> = (props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return <DialogModal {...props} ref={dialogRef} />;
};
