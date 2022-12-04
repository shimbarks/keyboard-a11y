import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useAutoOverflow } from '../../hooks/use-auto-overflow';
import { useKeydownListener } from '../../hooks/use-keydown-listener';
import './Sidebar.scss';

export interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const loremRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const stateMod = isSidebarOpen ? 'open' : 'closed';

  useKeydownListener({
    containerRef: sidebarRef,
    isOpen: isSidebarOpen,
    keyListenerMap: { Escape: () => setIsSidebarOpen(false) },
  });

  useEffect(() => {
    if (isSidebarOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isSidebarOpen]);

  useAutoOverflow(loremRef);

  return (
    <aside ref={sidebarRef} className={`sidebar sidebar--${stateMod}`}>
      <button
        type="button"
        className={`sidebar__close-button sidebar__close-button--${stateMod}`}
        ref={closeBtnRef}
        aria-label="close side bar"
        onClick={() => setIsSidebarOpen(false)}
        data-testid="sidebar-close-btn"
      >
        X
      </button>
      <section ref={loremRef} className="sidebar__lorem">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
        delectus, sit beatae excepturi cum saepe sint maiores. Rem at optio
        minus voluptates itaque. Quo, aliquam modi? A nihil sit maiores ut
        facere dolorem omnis tempora dolorum quas, nemo eveniet eius
        necessitatibus. Fugit dicta nesciunt sapiente sunt similique aliquid
        placeat quas assumenda excepturi maiores aliquam ullam molestias, sed
        veniam facere alias dignissimos tenetur et adipisci, quam enim dolores!
        Nesciunt delectus animi possimus quo voluptatum omnis nam impedit nemo,
        assumenda eaque dolorum dignissimos vero optio recusandae repellat,
        incidunt exercitationem enim, commodi aut necessitatibus. Maiores ipsam
        cumque esse autem quasi architecto soluta? Reiciendis, necessitatibus
        numquam, ducimus, explicabo dolore vitae consectetur nemo nobis ad
        maiores alias eaque? Obcaecati quaerat, possimus pariatur repudiandae
      </section>
    </aside>
  );
};
