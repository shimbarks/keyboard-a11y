import { RefObject } from 'react';

export function keyboardTrap(
  event: KeyboardEvent,
  containerRef: RefObject<HTMLElement>,
): void {
  if (containerRef.current) {
    const tabbableElements = getTabbableElements(containerRef.current);

    if (!tabbableElements.length) {
      event.preventDefault();
      return;
    }

    const firstElement = tabbableElements[0];
    const lastElement = tabbableElements[tabbableElements.length - 1];

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

export function getTabbableElements(
  containerElement?: HTMLElement,
): HTMLElement[] {
  const container = containerElement ?? document;
  const focusableElementsQuery =
    'a[href], button, input, textarea, select, details, iframe, embed, object, summary, dialog, audio[controls], video[controls], [contenteditable], [tabindex]:not([tabindex="-1"])';
  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(focusableElementsQuery),
  );
  const tabbableElements = focusableElements.filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      !element.hasAttribute('hidden') &&
      getComputedStyle(element).display !== 'none' &&
      getComputedStyle(element).visibility !== 'hidden',
  );

  return tabbableElements;
}

export function getFirstTabbableElement(
  containerElement?: HTMLElement,
): HTMLElement | null {
  return getTabbableElements(containerElement)[0];
}

export function getNextTabbableElement(
  currentElement: HTMLElement,
): HTMLElement | null {
  const tabbableElements = getTabbableElements();

  for (let i = 0; i < tabbableElements.length - 1; i++) {
    const element = tabbableElements[i];

    if (element === currentElement) {
      return tabbableElements[i + 1];
    }
  }

  return null;
}
