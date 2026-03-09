import { useState } from 'react';
import { useWindowManager } from '../../state/WindowManagerContext';
import { useClock } from '../../hooks/useClock';
import { StartMenu } from './StartMenu';
import styles from './Taskbar.module.css';

export function Taskbar() {
  const { state, dispatch } = useWindowManager();
  const time = useClock();
  const [showStart, setShowStart] = useState(false);

  const handleWindowClick = (id: string, status: string) => {
    if (status === 'minimized') {
      dispatch({ type: 'RESTORE_WINDOW', id });
    } else if (state.activeWindowId === id) {
      dispatch({ type: 'MINIMIZE_WINDOW', id });
    } else {
      dispatch({ type: 'FOCUS_WINDOW', id });
    }
  };

  return (
    <>
      {showStart && <StartMenu onClose={() => setShowStart(false)} />}
      <div className={styles.taskbar}>
        <button
          className={`${styles.startBtn} ${showStart ? styles.active : ''}`}
          onClick={() => setShowStart(s => !s)}
        >
          <i className="fas fa-terminal" />
          NICO
        </button>

        <div className={styles.divider} />

        <div className={styles.windowButtons}>
          {state.windows.map(w => (
            <button
              key={w.id}
              className={[
                styles.windowBtn,
                state.activeWindowId === w.id && styles.activeWindow,
                w.status === 'minimized' && styles.minimized,
              ].filter(Boolean).join(' ')}
              onClick={() => handleWindowClick(w.id, w.status)}
            >
              {w.title}
            </button>
          ))}
        </div>

        <div className={styles.tray}>
          <span className={styles.clock}>{time}</span>
        </div>
      </div>
    </>
  );
}
