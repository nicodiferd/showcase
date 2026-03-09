import { apps } from '../../data/apps';
import { useWindowManager } from '../../state/WindowManagerContext';
import { Window } from '../Window/Window';
import { DesktopIcon } from './DesktopIcon';
import { AppRenderer } from '../../apps/AppRenderer';
import styles from './Desktop.module.css';

export function Desktop() {
  const { state } = useWindowManager();

  return (
    <div className={styles.desktop}>
      <div className={styles.iconGrid}>
        {apps.map(app => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {state.windows.map(w => (
        <Window key={w.id} windowState={w}>
          <AppRenderer appId={w.appId} />
        </Window>
      ))}

      <div className={styles.watermark}>
        NicoOS v1.0<br />
        nicolo@nicolod.org
      </div>
    </div>
  );
}
