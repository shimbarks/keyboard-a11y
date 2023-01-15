import { RefObject } from 'react';

export function isOverflown({
  clientWidth,
  clientHeight,
  scrollWidth,
  scrollHeight,
}: HTMLElement) {
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
}

export function focusTrap(
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

  // if there's just one tabbable element or no tabbable elements at all,
  // we simply leave the focus in its place:
  if ([0, 1].includes(tabbableElements.length)) {
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

/**
 * based on https://zellwk.com/blog/keyboard-focusable-elements/
 */
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
    '[tabindex]',
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

  return tabbableOnly
    ? focusableElements.filter((element) => element.tabIndex >= 0)
    : focusableElements;
}

export function getElementsToInert(
  modalRef: RefObject<HTMLElement>,
): Element[] {
  const allModals = Array.from(
    document.getElementById('modal-root')?.children ?? [],
  );

  // filter out the current modal, modals that are already inerted, and hidden modals:
  const allOtherActiveModals = allModals.filter((modal) => {
    return (
      modal !== modalRef.current &&
      !modal.hasAttribute('inert') &&
      getComputedStyle(modal).display !== 'none' &&
      getComputedStyle(modal).visibility !== 'hidden'
    );
  });

  const elementsToInert = [...allOtherActiveModals];

  const rootElement = document.getElementById('root');

  if (rootElement && !rootElement.hasAttribute('inert')) {
    elementsToInert.push(rootElement);
  }

  return elementsToInert;
}
