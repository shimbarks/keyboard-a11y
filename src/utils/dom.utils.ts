import { RefObject } from 'react';

export function isOverflown({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}: HTMLElement) {
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
}

export function keyboardTrap(
  event: KeyboardEvent,
  containerRef: RefObject<HTMLElement>,
): void {
  if (!containerRef.current) {
    return;
  }

  const tabbableElements = getFocusableElements({
    containerElement: containerRef.current,
    tabbableOnly: true,
  });

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
    event.preventDefault();
    firstElement.focus();
  } else if (isBackwardFromFirstElement) {
    event.preventDefault();
    lastElement.focus();
  }
}

export function getFocusableElements({
  containerElement,
  tabbableOnly,
}: {
  containerElement?: HTMLElement;
  tabbableOnly?: boolean;
} = {}): HTMLElement[] {
  const container = containerElement ?? document;

  const selectors = [
    'a[href]',
    'button',
    'input',
    'textarea',
    'select',
    'iframe',
    'embed',
    'object',
    'summary',
    'dialog',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]',
    `[tabindex]${tabbableOnly ? ':not([tabindex="-1"])' : ''}`,
  ];

  const potentiallyFocusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(selectors.join(', ')),
  );

  const focusableElements = potentiallyFocusableElements.filter(
    (element) =>
      !element.hasAttribute('disabled') &&
      !element.hasAttribute('hidden') &&
      !element.hasAttribute('inert') &&
      getComputedStyle(element).display !== 'none' &&
      getComputedStyle(element).visibility !== 'hidden',
  );

  return focusableElements;
}
