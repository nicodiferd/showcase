import type { AppConfig } from '../../data/apps';
import { useWindowManager } from '../../state/WindowManagerContext';
import styles from './DesktopIcon.module.css';

interface DesktopIconProps {
  app: AppConfig;
}

export function DesktopIcon({ app }: DesktopIconProps) {
  const { dispatch } = useWindowManager();

  return (
    <div
      className={styles.icon}
      onDoubleClick={() => dispatch({ type: 'OPEN_WINDOW', appId: app.id })}
    >
      <div className={styles.iconImage}>
        <i className={app.icon} />
      </div>
      <span className={styles.iconLabel}>{app.filename}</span>
    </div>
  );
}
