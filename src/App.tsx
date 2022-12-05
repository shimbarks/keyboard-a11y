import React, { useState } from 'react';
import './App.scss';
import { Menu, MenuItem } from './components/menu/Menu';
import { ModalOpener } from './components/modal-opener/ModalOpener';
import { Sidebar } from './components/sidebar/Sidebar';
import { ToggleSidebar } from './components/toggle-sidebar/ToggleSidebar';

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

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarMod = isSidebarOpen ? 'open' : 'closed';

  return (
    <>
      <main className={`app__main app__main--sidebar-${sidebarMod}`}>
        <ToggleSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <section className="app__modals-section">
          <section className="app__section">
            <h2>Native Modal Dialog</h2>
            <i>Strict focus trap:</i>
            <ModalOpener
              implementation="native modal dialog"
              keyboardTrap="strict"
            />
            <i>Loose focus trap:</i>
            <ModalOpener
              implementation="native modal dialog"
              keyboardTrap="loose"
            />
          </section>
          <section className="app__section">
            <h2>Custom Modal</h2>
            <i>Strict focus trap:</i>
            <ModalOpener implementation="custom modal" keyboardTrap="strict" />
            <i>Loose focus trap:</i>
            <ModalOpener implementation="custom modal" keyboardTrap="loose" />
          </section>
        </section>
        <section className="app__section">
          <h2>Menu:</h2>
          <Menu label="Open Menu" items={menuItems} />
          <a className="app__fake-link" href="#">
            Fake Link
          </a>
        </section>
      </main>
    </>
  );
};
