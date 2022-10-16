import React, { useRef, useState } from 'react';
import './App.scss';
import { Modal } from './components/modal/Modal';

export const App: React.FC = () => {
  const [firstModalVisible, setFirstModalVisible] = useState<boolean>(false);
  const [secondModalVisible, setSecondModalVisible] = useState<boolean>(false);
  const openSecondModalButtonRef = useRef<HTMLButtonElement>(null);
  const firstCloseButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <main className="app__main">
      <button onClick={() => setFirstModalVisible(true)}>
        Open First Modal
      </button>
      <button onClick={() => alert('Second button clicked 😎')}>
        Other Button
      </button>
      <Modal
        isOpen={firstModalVisible}
        onClose={() => setFirstModalVisible(false)}
        onOpenFocusRef={openSecondModalButtonRef}
        closeButton={
          <button
            ref={firstCloseButtonRef}
            type="button"
            onClick={() => setFirstModalVisible(false)}
          >
            X
          </button>
        }
      >
        <header>My First Modal</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          in beatae eos distinctio debitis qui magni mollitia quasi doloribus
          est omnis blanditiis nisi quam adipisci nihil iusto iure, repudiandae
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
      </Modal>
      <Modal
        isOpen={secondModalVisible}
        onClose={() => setSecondModalVisible(false)}
        onCloseFocusRef={firstCloseButtonRef}
        closeButton={
          <button type="button" onClick={() => setSecondModalVisible(false)}>
            X
          </button>
        }
      >
        <header>My Second Modal</header>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
        <footer className="modal__footer">
          <a href="#">Fake Link 1</a>
          <a href="#">Fake Link 2</a>
        </footer>
      </Modal>
    </main>
  );
};
