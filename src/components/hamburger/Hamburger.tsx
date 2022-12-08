import React, { Dispatch, SetStateAction, useRef } from 'react';
import { useUpdateEffect } from '../../hooks/use-update-effect';
import './Hamburger.scss';

export interface HamburgerProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const Hamburger: React.FC<HamburgerProps> = ({
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
      className={`hamburger hamburger--${stateMod}`}
      ref={buttonRef}
      aria-label="open menu"
      onClick={() => setIsSidebarOpen((open) => !open)}
    >
      <div className={`hamburger__meat hamburger__meat--${stateMod}`}></div>
    </button>
  );
};
