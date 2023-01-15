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

      <section className="app__components">
        <section className="app__section">
          <h2>Native Modal Dialog</h2>
          <i>Strict focus trap:</i>
          <ModalOpener
            implementation="native modal dialog"
            focusTrap="strict"
          />
          <i>Loose focus trap:</i>
          <ModalOpener implementation="native modal dialog" focusTrap="loose" />
        </section>
        <section className="app__section">
          <h2>Custom Modal</h2>
          <i>Strict focus trap:</i>
          <ModalOpener implementation="custom modal" focusTrap="strict" />
          <i>Loose focus trap (inert):</i>
          <ModalOpener
            implementation="custom modal"
            focusTrap="loose"
            looseImplementation="inert"
          />
          <i>Loose focus trap (tabindex):</i>
          <ModalOpener
            implementation="custom modal"
            focusTrap="loose"
            looseImplementation="tabindex"
          />
        </section>
        <section className="app__section">
          <h2>Menu:</h2>
          <Menu label="Open Menu" items={menuItems} />
          <a className="app__fake-link" href="#">
            Fake Link
          </a>
        </section>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non repudiandae
        sunt id doloremque totam odio dolorem nisi omnis commodi ipsa excepturi
        esse dicta dolorum nam hic laboriosam adipisci, illo modi maiores rerum
        provident! Repellendus nam minus quas doloribus quia corporis obcaecati
        impedit, nisi ipsum fugit quidem cumque perspiciatis. Animi inventore
        magni reiciendis officia commodi natus obcaecati quaerat ab, vitae
        praesentium aliquid cupiditate fugit molestiae molestias dignissimos
        tenetur necessitatibus deleniti quasi nobis possimus, aliquam suscipit.
        Adipisci placeat non delectus eum sit voluptate tempore necessitatibus,
        qui accusantium harum fugit magnam repellat soluta expedita tenetur,
        nisi fuga mollitia voluptas! Reiciendis consequuntur tempora earum
        quisquam nihil minus corporis nobis dolores ea placeat expedita, cum
        eius, mollitia quod aut quos sit sed odit. Exercitationem, dolores
        libero. Beatae similique eveniet cupiditate, dolor perferendis explicabo
        sunt? Molestiae unde deserunt sunt nobis officia nisi tempore debitis
        laborum ab doloremque explicabo recusandae ducimus ipsa ad veritatis
        libero consectetur deleniti nihil, reiciendis voluptate. Eveniet officia
        ea ut obcaecati provident voluptatum in dolorum similique saepe aut
        consectetur ipsum, iste enim porro minus neque voluptate fugiat sint!
        Veritatis, iste corrupti placeat harum consectetur dolorem obcaecati
        deleniti amet cupiditate reprehenderit, eligendi atque nihil, tempore
        quam vel ipsum fugiat sequi dolor minima aut explicabo.
      </section>
    </main>
  );
};
