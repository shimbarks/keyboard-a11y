import { RefObject } from 'react';

export function keyboardTrap(
  event: KeyboardEvent,
  containerRef: RefObject<HTMLElement>,
): void {
  if (containerRef.current) {
    const focusableElements = getFocusableElements(containerRef.current);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const isForwardFromLastElement =
      !event.shiftKey && document.activeElement === lastElement;
    const isBackwardFromFirstElement =
      event.shiftKey && document.activeElement === firstElement;

    if (isForwardFromLastElement) {
      firstElement.focus();
      event.preventDefault();
    } else if (isBackwardFromFirstElement) {
      lastElement.focus();
      event.preventDefault();
    }
  }
}

export function getFocusableElements(
  containerElement?: HTMLElement,
): NodeListOf<HTMLElement> {
  const container = containerElement ?? document;
  return container.querySelectorAll(focusableQuery);
}

const focusableSelectors = ['a', 'button', 'textarea', 'input', 'select'];

const focusableQuery = `${focusableSelectors.join(
  ':not(:disabled), ',
)}:not(:disabled)`;
