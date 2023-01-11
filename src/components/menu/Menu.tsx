import React, { MouseEventHandler, useId, useRef, useState } from 'react';
import { useFocusOnClose } from '../../hooks/use-focus-on-close';
import { useFocusOnOpen } from '../../hooks/use-focus-on-open';
import { useKeydownListener } from '../../hooks/use-keydown-listener';
import { useOutsideClick } from '../../hooks/use-outside-click';
import './Menu.scss';

export interface MenuItem {
  text: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

export interface MenuProps {
  label: string;
  items: MenuItem[];
}

const ITEM_ID_PREFIX = 'menu-item-';

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const popupId = useId();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const visibleMod = isOpen ? 'visible' : 'hidden';
  const popupRef = useRef<HTMLUListElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useOutsideClick<HTMLUListElement>({
    ref: popupRef,
    handler: () => setIsOpen(false),
    excludeRefs: [openerRef],
  });

  useFocusOnClose({
    isOpen,
  });

  useFocusOnOpen({
    isOpen,
    containerRef: popupRef,
  });

  const getNextItemIndex = (
    index: number,
    direction: 'up' | 'down',
  ): number => {
    const lastIndex = props.items.length - 1;

    if (direction === 'up') {
      return index === 0 ? lastIndex : index - 1;
    } else {
      return index === lastIndex ? 0 : index + 1;
    }
  };

  const handleArrowKeydown = (event: any, direction: 'up' | 'down') => {
    event.preventDefault();
    const index = +event.target.id.slice(ITEM_ID_PREFIX.length);
    const nextIndex = getNextItemIndex(index, direction);
    const nextItemQuery = `#${ITEM_ID_PREFIX}${nextIndex}`;
    const nextItem =
      popupRef.current?.querySelector<HTMLElement>(nextItemQuery);
    nextItem?.focus();
  };

  const handleTabKeydown = (event: KeyboardEvent) => {
    if (event.shiftKey) {
      event.preventDefault();
    }
    setIsOpen(false);
  };

  useKeydownListener({
    containerRef: popupRef,
    isOpen,
    keyListenerMap: {
      Escape: () => setIsOpen(false),
      Tab: handleTabKeydown,
      ArrowDown: (e) => handleArrowKeydown(e, 'down'),
      ArrowUp: (e) => handleArrowKeydown(e, 'up'),
    },
  });

  const renderItem = (item: MenuItem, index: number) => {
    return (
      <li role="none" key={item.text} className="menu__item">
        <button
          tabIndex={-1}
          id={`${ITEM_ID_PREFIX}${index}`}
          role="menuitem"
          className="menu__item-btn"
          onClick={(e) => {
            item.onClick?.(e);
            setIsOpen(false);
          }}
        >
          {item.text}
        </button>
      </li>
    );
  };

  return (
    <div className="menu">
      <button
        className="primary-button"
        ref={openerRef}
        aria-haspopup={true}
        aria-controls={popupId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((openState) => !openState)}
      >
        {props.label}
      </button>
      <ul
        id={popupId}
        ref={popupRef}
        role="menu"
        className={`menu__popup menu__popup--${visibleMod}`}
      >
        {props.items.map(renderItem)}
      </ul>
    </div>
  );
};
