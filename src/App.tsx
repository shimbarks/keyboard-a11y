import React, { useState } from 'react';
import './App.scss';
import { Modal } from './components/modal/Modal';

export const App: React.FC = () => {
  const [firstModalVisible, setFirstModalVisible] = useState<boolean>(false);
  const [secondModalVisible, setSecondModalVisible] = useState<boolean>(false);

  return (
    <main className="app__main">
      <button onClick={() => setFirstModalVisible(true)}>
        Open First Modal
      </button>
      <button onClick={() => alert('Second button clicked 😎')}>
        Other Button
      </button>
      <Modal
        open={firstModalVisible}
        onClose={() => setFirstModalVisible(false)}
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
          <button onClick={() => setSecondModalVisible(true)}>
            Open Second Modal
          </button>
        </footer>
      </Modal>
      <Modal
        open={secondModalVisible}
        onClose={() => setSecondModalVisible(false)}
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
