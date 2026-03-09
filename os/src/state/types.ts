export type AppId = 'about' | 'projects' | 'resume' | 'contact' | 'terminal' | 'certs' | 'bandit' | 'homelab';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type WindowStatus = 'normal' | 'minimized' | 'maximized';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  position: Position;
  size: Size;
  minSize: Size;
  zIndex: number;
  status: WindowStatus;
}

export interface WindowManagerState {
  windows: WindowState[];
  nextZIndex: number;
  activeWindowId: string | null;
}

export type WindowAction =
  | { type: 'OPEN_WINDOW'; appId: AppId }
  | { type: 'CLOSE_WINDOW'; id: string }
  | { type: 'FOCUS_WINDOW'; id: string }
  | { type: 'MINIMIZE_WINDOW'; id: string }
  | { type: 'MAXIMIZE_WINDOW'; id: string }
  | { type: 'RESTORE_WINDOW'; id: string }
  | { type: 'MOVE_WINDOW'; id: string; position: Position }
  | { type: 'RESIZE_WINDOW'; id: string; size: Size };
