import React from 'react';
import './App.scss';
import { Menu, MenuItem } from './components/menu/Menu';
import { ModalOpener } from './components/modal-opener/ModalOpener';

export const App: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      text: 'lorem ipsum',
      onClick: () => console.log('Hello Lorem!'),
    },
    {
      text: 'dolor sit amet',
      onClick: () => console.log('Hello Dolor!'),
    },
  ];

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
      <section className="app__menu-section">
        <h2>Menu:</h2>
        <Menu label="Open Menu" items={menuItems} />
        <a className="app__fake-link" href="#">
          Fake Link
        </a>
      </section>
    </main>
  );
};
