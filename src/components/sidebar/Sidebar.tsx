import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { useAutoOverflow } from '../../hooks/use-auto-overflow';
import { useKeydownListener } from '../../hooks/use-keydown-listener';
import { TruncableText } from '../truncable-text/TruncableText';
import './Sidebar.scss';

const songList: string[] = [
  `Come Together`,
  `Something`,
  `Maxwell's Silver Hammer`,
  `Oh! Darling`,
  `Octopus's Garden`,
  `I Want You (She's So Heavy)`,
  `Here Comes the Sun`,
  `Because`,
  `You Never Give Me Your Money`,
  `Sun King`,
  `Mean Mr. Mustard`,
  `Polythene Pam`,
  `She Came In Through the Bathroom Window`,
  `Golden Slumbers`,
  `Carry That Weight`,
  `The End`,
  `Her Majesty`,
];

export interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
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

  useAutoOverflow(ulRef);

  return (
    <aside ref={sidebarRef} className={`sidebar sidebar--${stateMod}`}>
      <button
        type="button"
        className={`x-button sidebar__close-button sidebar__close-button--${stateMod}`}
        ref={closeBtnRef}
        aria-label="close side bar"
        onClick={() => setIsSidebarOpen(false)}
        data-testid="sidebar-close-btn"
      >
        X
      </button>
      <h2 className="sidebar__heading">Abbey Road</h2>
      <ul ref={ulRef} className="sidebar__song-list">
        {songList.map((song) => (
          <li key={song} className="sidebar__song">
            <TruncableText>{song}</TruncableText>
          </li>
        ))}
      </ul>
    </aside>
  );
};
