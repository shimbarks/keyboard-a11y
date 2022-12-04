import React, { Dispatch, SetStateAction, useRef } from 'react';
import { useUpdateEffect } from '../../hooks/use-update-effect';
import './ToggleSidebar.scss';

export interface ToggleSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const ToggleSidebar: React.FC<ToggleSidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const stateMod = isSidebarOpen ? 'open' : 'closed';
  const buttonRef = useRef<HTMLButtonElement>(null);

  useUpdateEffect(() => {
    if (!isSidebarOpen) {
      buttonRef.current?.focus();
    }
  }, [isSidebarOpen]);

  return (
    <button
      type="button"
      className={`toggle-sidebar__button toggle-sidebar__button--${stateMod}`}
      ref={buttonRef}
      aria-label="open menu"
      onClick={() => setIsSidebarOpen((open) => !open)}
    >
      <div
        className={`toggle-sidebar__hamburger toggle-sidebar__hamburger--${stateMod}`}
      ></div>
    </button>
  );
};
