import React, { useRef, useState } from 'react';
import { Dialog } from '../dialog/Dialog';
import { Modal } from '../modal/Modal';
import './ModalOpener.scss';

export interface ModalOpenerProps {
  implementation: 'native modal dialog' | 'custom modal';
}

export const ModalOpener: React.FC<ModalOpenerProps> = ({ implementation }) => {
  const [firstModalVisible, setFirstModalVisible] = useState<boolean>(false);
  const [secondModalVisible, setSecondModalVisible] = useState<boolean>(false);
  const openSecondModalButtonRef = useRef<HTMLButtonElement>(null);
  const firstCloseButtonRef = useRef<HTMLButtonElement>(null);

  const firstCloseButtonElement = (
    <button
      ref={firstCloseButtonRef}
      type="button"
      onClick={() => setFirstModalVisible(false)}
    >
      X
    </button>
  );

  const secondCloseButtonElement = (
    <button type="button" onClick={() => setSecondModalVisible(false)}>
      X
    </button>
  );

  const firstModalContent = (
    <>
      <header>My First Modal</header>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, in
        beatae eos distinctio debitis qui magni mollitia quasi doloribus est
        omnis blanditiis nisi quam adipisci nihil iusto iure, repudiandae
        repellat?
      </div>
      <footer className="modal__footer">
        <a href="#">Fake Link</a>
        <button
          ref={openSecondModalButtonRef}
          onClick={() => setSecondModalVisible(true)}
        >
          Open Second Modal
        </button>
      </footer>
    </>
  );

  const secondModalContent = (
    <>
      <header>My Second Modal</header>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      <footer className="modal__footer">
        <a href="#">Fake Link 1</a>
        <a href="#">Fake Link 2</a>
      </footer>
    </>
  );

  const firstModalProps = {
    isOpen: firstModalVisible,
    onClose: () => setFirstModalVisible(false),
    onOpenFocusRef: openSecondModalButtonRef,
    closeButton: firstCloseButtonElement,
    children: firstModalContent,
  };

  const secondModalProps = {
    isOpen: secondModalVisible,
    onClose: () => setSecondModalVisible(false),
    onCloseFocusRef: firstCloseButtonRef,
    closeButton: secondCloseButtonElement,
    children: secondModalContent,
  };

  return (
    <div className="section">
      <button onClick={() => setFirstModalVisible(true)}>
        Open First Modal
      </button>
      {implementation === 'native modal dialog' ? (
        <>
          <Dialog {...firstModalProps} />
          <Dialog {...secondModalProps} />
        </>
      ) : (
        <>
          <Modal {...firstModalProps} />
          <Modal {...secondModalProps} />
        </>
      )}
    </div>
  );
};
