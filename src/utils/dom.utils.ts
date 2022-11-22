import { RefObject } from 'react';

export function keyboardTrap(
  event: KeyboardEvent,
  containerRef: RefObject<HTMLElement>,
): void {
  if (containerRef.current) {
    const focusableElements = getFocusableElements(containerRef.current);

    if (!focusableElements.length) {
      event.preventDefault();
      return;
    }

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
): HTMLElement[] {
  const container = containerElement ?? document;
  const focusableElementsQuery =
    'a[href], button, input, textarea, select, details, iframe, embed, object, summary, dialog, audio[controls], video[controls], [contenteditable], [tabindex]:not([tabindex="-1"])';
  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(focusableElementsQuery),
  );

  return focusableElements.filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      !el.hasAttribute('hidden') &&
      getComputedStyle(el).display !== 'none' &&
      getComputedStyle(el).visibility !== 'hidden',
  );
}

export function getFirstFocusableElement(
  containerElement?: HTMLElement,
): HTMLElement | null {
  return getFocusableElements(containerElement)[0];
}

export function getNextFocusableElement(
  currentElement: HTMLElement,
): HTMLElement | null {
  const focusableElements = getFocusableElements();

  for (let i = 0; i < focusableElements.length - 1; i++) {
    const element = focusableElements[i];

    if (element === currentElement) {
      return focusableElements[i + 1];
    }
  }

  return null;
}
