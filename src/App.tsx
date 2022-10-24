import React from 'react';
import './App.scss';
import { ModalOpener } from './components/modal-opener/ModalOpener';

export const App: React.FC = () => {
  return (
    <main className="app__main">
      <section>
        <h2>Native Modal Dialog:</h2>
        <ModalOpener implementation="native modal dialog" />
      </section>
      <section>
        <h2>Custom Modal:</h2>
        <ModalOpener implementation="custom modal" />
      </section>
    </main>
  );
};
