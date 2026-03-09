import { useEffect } from 'react';
import styles from './LoginScreen.module.css';

interface LoginScreenProps {
  onComplete: () => void;
}

export function LoginScreen({ onComplete }: LoginScreenProps) {
  useEffect(() => {
    const handler = () => onComplete();
    window.addEventListener('keydown', handler);
    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('click', handler);
    };
  }, [onComplete]);

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <img src="/images/Nicolo.jpeg" alt="Nicolo" className={styles.avatar} />
        <div className={styles.name}>Nicolo DiFerdinando</div>
        <div className={styles.sub}>builder. breaker. figuring it out.</div>
        <div className={styles.prompt}>
          <span className={styles.promptPrefix}>nicolo@nicoos:~$</span>
          <span className={styles.cursor} />
        </div>
      </div>
      <div className={styles.hint}>press any key to continue</div>
    </div>
  );
}
