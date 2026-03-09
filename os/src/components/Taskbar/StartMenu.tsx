import { apps } from '../../data/apps';
import { useWindowManager } from '../../state/WindowManagerContext';
import styles from './StartMenu.module.css';

interface StartMenuProps {
  onClose: () => void;
}

export function StartMenu({ onClose }: StartMenuProps) {
  const { dispatch } = useWindowManager();

  const handleOpen = (appId: typeof apps[number]['id']) => {
    dispatch({ type: 'OPEN_WINDOW', appId });
    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.menu}>
        <div className={styles.header}>
          <img src="/images/Nicolo.jpeg" alt="" className={styles.headerAvatar} />
          <div className={styles.headerInfo}>
            <span className={styles.headerName}>Nicolo</span>
            <span className={styles.headerSub}>nicoos v1.0</span>
          </div>
        </div>

        <div className={styles.items}>
          {apps.map(app => (
            <button
              key={app.id}
              className={styles.item}
              onClick={() => handleOpen(app.id)}
            >
              <span className={styles.itemIcon}>
                <i className={app.icon} />
              </span>
              <span>{app.filename}</span>
            </button>
          ))}
        </div>

        <div className={styles.footer}>
          <a
            href="https://github.com/nicodiferd"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <i className="fab fa-github" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nicolo-diferdinando/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            <i className="fab fa-linkedin" /> LinkedIn
          </a>
          <a
            href="mailto:nicodiferd@gmail.com"
            className={styles.footerLink}
          >
            <i className="fas fa-envelope" /> Email
          </a>
        </div>
      </div>
    </>
  );
}
