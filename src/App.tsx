import React, { useState } from 'react';
import './App.scss';
import { Hamburger } from './components/hamburger/Hamburger';
import { Menu, MenuItem } from './components/menu/Menu';
import { ModalOpener } from './components/modal-opener/ModalOpener';
import { Sidebar } from './components/sidebar/Sidebar';
import { SkipLink } from './components/skip-link/SkipLink';

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
    {
      text: 'consectetur adipisicing elit',
      onClick: () => console.log('Hello Consectetur!'),
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarMod = isSidebarOpen ? 'open' : 'closed';

  return (
    <main className={`app__main app__main--sidebar-${sidebarMod}`}>
      <SkipLink skipToId="main-content">Skip to main content</SkipLink>

      <section className="app__section">
        <h2>Native Modal Dialog</h2>
        <i>Strict focus trap:</i>
        <ModalOpener implementation="native modal dialog" focusTrap="strict" />
        <i>Loose focus trap:</i>
        <ModalOpener implementation="native modal dialog" focusTrap="loose" />
      </section>
      <section className="app__section">
        <h2>Custom Modal</h2>
        <i>Strict focus trap:</i>
        <ModalOpener implementation="custom modal" focusTrap="strict" />
        <i>Loose focus trap:</i>
        <ModalOpener implementation="custom modal" focusTrap="loose" />
      </section>
      <section className="app__section">
        <h2>Menu:</h2>
        <Menu label="Open Menu" items={menuItems} />
        <a className="app__fake-link" href="#">
          Fake Link
        </a>
      </section>
      <Hamburger
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <section id="main-content" className="app__lorem">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim
        vero recusandae eligendi dolore saepe, aliquid harum nobis doloremque
        quis vel molestias magnam! Iste numquam nam quam mollitia consequuntur
        repellat.
      </section>
    </main>
  );
};
