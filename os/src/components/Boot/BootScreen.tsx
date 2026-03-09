import { useState, useEffect } from 'react';
import styles from './BootScreen.module.css';

interface BootScreenProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: 'NicoOS v1.0 — Personal Operating System', type: 'brand' },
  { text: '========================================', type: 'dim' },
  { text: '', type: 'dim' },
  { text: 'BIOS: Detecting hardware...', type: 'dim' },
  { text: '[  OK  ] CPU: Neural Processing Unit v23.0', type: 'ok' },
  { text: '[  OK  ] RAM: Caffeine-powered memory loaded', type: 'ok' },
  { text: '[  OK  ] DISK: Projects filesystem mounted', type: 'ok' },
  { text: '', type: 'dim' },
  { text: 'Starting NicoOS kernel...', type: 'dim' },
  { text: '[  OK  ] Loading personality.module', type: 'ok' },
  { text: '[  OK  ] Mounting /home/nicolo/projects', type: 'ok' },
  { text: '[  OK  ] Initializing caffeine.service', type: 'ok' },
  { text: '[  OK  ] Starting window-manager.service', type: 'ok' },
  { text: '[  OK  ] Loading homelab.drivers', type: 'ok' },
  { text: '[ WARN ] Sleep schedule not found, skipping...', type: 'warn' },
  { text: '[  OK  ] Connecting to builder-network.service', type: 'ok' },
  { text: '[  OK  ] Starting desktop-environment', type: 'ok' },
  { text: '', type: 'dim' },
  { text: 'Boot complete. Welcome, Nicolo.', type: 'brand' },
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines < bootMessages.length) {
      const delay = visibleLines === 0 ? 300 :
                    bootMessages[visibleLines]?.text === '' ? 100 :
                    bootMessages[visibleLines]?.type === 'brand' ? 400 : 80;
      const timer = setTimeout(() => setVisibleLines(v => v + 1), delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, onComplete]);

  return (
    <div className={styles.boot}>
      <div className={styles.lines}>
        {bootMessages.slice(0, visibleLines).map((msg, i) => (
          <div key={i} className={`${styles.line} ${styles[msg.type]}`}>
            {msg.text}
          </div>
        ))}
        {visibleLines < bootMessages.length && (
          <span className={styles.cursor} />
        )}
      </div>
    </div>
  );
}
