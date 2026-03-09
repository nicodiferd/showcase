import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import type { WindowManagerState, WindowAction } from './types';
import { windowReducer, initialState } from './windowManager';

interface WindowManagerContextType {
  state: WindowManagerState;
  dispatch: Dispatch<WindowAction>;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(windowReducer, initialState);

  return (
    <WindowManagerContext.Provider value={{ state, dispatch }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return ctx;
}
