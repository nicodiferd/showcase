import type { WindowManagerState, WindowAction, WindowState } from './types';
import { getAppConfig } from '../data/apps';

export const initialState: WindowManagerState = {
  windows: [],
  nextZIndex: 100,
  activeWindowId: null,
};

let counter = 0;

function getOffset(state: WindowManagerState): { x: number; y: number } {
  const count = state.windows.length;
  return {
    x: 60 + (count % 8) * 30,
    y: 40 + (count % 8) * 30,
  };
}

export function windowReducer(state: WindowManagerState, action: WindowAction): WindowManagerState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      // If app is already open, focus it
      const existing = state.windows.find(w => w.appId === action.appId);
      if (existing) {
        if (existing.status === 'minimized') {
          return windowReducer(
            windowReducer(state, { type: 'RESTORE_WINDOW', id: existing.id }),
            { type: 'FOCUS_WINDOW', id: existing.id }
          );
        }
        return windowReducer(state, { type: 'FOCUS_WINDOW', id: existing.id });
      }

      const config = getAppConfig(action.appId);
      const offset = getOffset(state);
      const id = `${action.appId}-${++counter}`;

      const newWindow: WindowState = {
        id,
        appId: action.appId,
        title: config.title,
        position: { x: offset.x, y: offset.y },
        size: { ...config.defaultSize },
        minSize: { ...config.minSize },
        zIndex: state.nextZIndex,
        status: 'normal',
      };

      return {
        ...state,
        windows: [...state.windows, newWindow],
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: id,
      };
    }

    case 'CLOSE_WINDOW': {
      const windows = state.windows.filter(w => w.id !== action.id);
      return {
        ...state,
        windows,
        activeWindowId: state.activeWindowId === action.id
          ? (windows.length > 0 ? windows[windows.length - 1].id : null)
          : state.activeWindowId,
      };
    }

    case 'FOCUS_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, zIndex: state.nextZIndex } : w
        ),
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: action.id,
      };
    }

    case 'MINIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, status: 'minimized' as const } : w
        ),
        activeWindowId: state.activeWindowId === action.id ? null : state.activeWindowId,
      };
    }

    case 'MAXIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, status: 'maximized' as const, zIndex: state.nextZIndex } : w
        ),
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: action.id,
      };
    }

    case 'RESTORE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, status: 'normal' as const, zIndex: state.nextZIndex } : w
        ),
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: action.id,
      };
    }

    case 'MOVE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, position: action.position } : w
        ),
      };
    }

    case 'RESIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, size: action.size } : w
        ),
      };
    }

    default:
      return state;
  }
}
