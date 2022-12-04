import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import './Sidebar.scss';

export interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const ref = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const stateMod = isSidebarOpen ? 'open' : 'closed';

  useEffect(() => {
    if (isSidebarOpen) {
      closeBtnRef.current?.focus();
    }
  }, [isSidebarOpen]);

  return (
    <aside ref={ref} className={`sidebar sidebar--${stateMod}`}>
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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sint quia
      minima aliquam dignissimos tempore! Voluptatibus commodi nobis animi dolor
      voluptatum non a iste quasi maxime, quaerat hic, temporibus neque.
    </aside>
  );
};
