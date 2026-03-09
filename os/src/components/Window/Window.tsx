import { type ReactNode } from 'react';
import type { WindowState } from '../../state/types';
import { useWindowManager } from '../../state/WindowManagerContext';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import styles from './Window.module.css';

interface WindowProps {
  windowState: WindowState;
  children: ReactNode;
}

export function Window({ windowState, children }: WindowProps) {
  const { state, dispatch } = useWindowManager();
  const isActive = state.activeWindowId === windowState.id;
  const isMaximized = windowState.status === 'maximized';
  const isMinimized = windowState.status === 'minimized';

  const dragHandlers = useDraggable({
    disabled: isMaximized,
    onDrag: (position) => dispatch({ type: 'MOVE_WINDOW', id: windowState.id, position }),
    onDragStart: () => dispatch({ type: 'FOCUS_WINDOW', id: windowState.id }),
  });

  const resizeHandlers = useResizable({
    disabled: isMaximized,
    minSize: windowState.minSize,
    onResize: (size) => dispatch({ type: 'RESIZE_WINDOW', id: windowState.id, size }),
  });

  const classNames = [
    styles.window,
    isActive && styles.active,
    isMinimized && styles.minimized,
    isMaximized && styles.maximized,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      style={isMaximized ? { zIndex: windowState.zIndex } : {
        left: windowState.position.x,
        top: windowState.position.y,
        width: windowState.size.width,
        height: windowState.size.height,
        zIndex: windowState.zIndex,
      }}
      onPointerDown={() => {
        if (!isActive) dispatch({ type: 'FOCUS_WINDOW', id: windowState.id });
      }}
    >
      <div className={styles.titlebar} {...dragHandlers}>
        <span className={styles.title}>{windowState.title}</span>
        <div className={styles.controls}>
          <button
            className={styles.controlBtn}
            onClick={() => dispatch({ type: 'MINIMIZE_WINDOW', id: windowState.id })}
            title="Minimize"
          >
            &#8211;
          </button>
          <button
            className={styles.controlBtn}
            onClick={() => dispatch({
              type: isMaximized ? 'RESTORE_WINDOW' : 'MAXIMIZE_WINDOW',
              id: windowState.id,
            })}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? '&#9643;' : '&#9633;'}
          </button>
          <button
            className={`${styles.controlBtn} ${styles.closeBtn}`}
            onClick={() => dispatch({ type: 'CLOSE_WINDOW', id: windowState.id })}
            title="Close"
          >
            &#10005;
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
      {!isMaximized && (
        <div className={styles.resizeHandle} {...resizeHandlers} />
      )}
    </div>
  );
}
