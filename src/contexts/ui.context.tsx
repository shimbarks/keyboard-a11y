import React, { createContext, ReactNode, RefObject } from 'react';

export interface UIContextProps {
  activeModals: RefObject<HTMLElement>[];
}

const initialValue: UIContextProps = {
  activeModals: [],
};

export const uiContext = createContext<UIContextProps>(initialValue);

export interface UIContextProviderProps {
  children: ReactNode;
}

export const UIContextProvider: React.FC<UIContextProviderProps> = (
  props: UIContextProviderProps,
) => {
  return (
    <uiContext.Provider
      value={{
        ...initialValue,
      }}
    >
      {props.children}
    </uiContext.Provider>
  );
};
