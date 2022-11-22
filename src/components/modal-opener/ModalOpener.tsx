import React, { useRef, useState } from 'react';
import { CustomModalLoose } from '../custom-modal/CustomModalLoose';
import { CustomModalStrict } from '../custom-modal/CustomModalStrict';
import { DialogModalLoose } from '../dialog-modal/DialogModalLoose';
import { DialogModalStrict } from '../dialog-modal/DialogModalStrict';
import './ModalOpener.scss';

export interface ModalOpenerProps {
  implementation: 'native modal dialog' | 'custom modal';
  keyboardTrap: 'strict' | 'loose';
}

export const ModalOpener: React.FC<ModalOpenerProps> = ({
  implementation,
  keyboardTrap,
}) => {
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

  const renderModal = (): JSX.Element => {
    if (implementation === 'native modal dialog') {
      return keyboardTrap === 'strict' ? (
        <>
          <DialogModalStrict {...firstModalProps} />
          <DialogModalStrict {...secondModalProps} />
        </>
      ) : (
        <>
          <DialogModalLoose {...firstModalProps} />
          <DialogModalLoose {...secondModalProps} />
        </>
      );
    } else {
      return keyboardTrap === 'strict' ? (
        <>
          <CustomModalStrict {...firstModalProps} />
          <CustomModalStrict {...secondModalProps} />
        </>
      ) : (
        <>
          <CustomModalLoose {...firstModalProps} />
          <CustomModalLoose {...secondModalProps} />
        </>
      );
    }
  };

  return (
    <div className="section">
      <button onClick={() => setFirstModalVisible(true)}>
        Open First Modal
      </button>
      {renderModal()}
    </div>
  );
};
