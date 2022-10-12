import React, { useState } from 'react';
import './App.scss';
import { Modal } from './components/modal/Modal';

export const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <main className="app__main">
      <button onClick={() => setModalVisible(true)}>Open Modal</button>
      <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
        <header>My Modal</header>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          in beatae eos distinctio debitis qui magni mollitia quasi doloribus
          est omnis blanditiis nisi quam adipisci nihil iusto iure, repudiandae
          repellat?
        </div>
        <footer>
          <button>OK</button>
        </footer>
      </Modal>
    </main>
  );
};
