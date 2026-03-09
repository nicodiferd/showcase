import s from '../app-styles.module.css';

const certs = [
  { icon: 'fas fa-shield-alt', title: 'Splunk Enterprise Certified' },
  { icon: 'fas fa-users', title: 'Fraternity President' },
  { icon: 'fas fa-baseball-ball', title: 'Cal Poly Club Baseball President' },
  { icon: 'fas fa-briefcase', title: '3 Internships' },
  { icon: 'fas fa-building', title: 'Part-Owner of LLC Bandit' },
  { icon: 'fas fa-rocket', title: 'Part-Owner of LLC Wedge' },
  { icon: 'fas fa-code', title: 'Full Stack Developer' },
];

export function CertsApp() {
  return (
    <div>
      <div className={s.heading}>
        <i className="fas fa-trophy" style={{ marginRight: 8 }} />
        ACHIEVEMENTS.LOG
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 8 }}>
          $ cat ~/achievements.log
        </div>
        {certs.map((cert, i) => (
          <div key={i} className={s.card} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <i className={cert.icon} style={{ color: 'var(--accent-primary)', width: 20, textAlign: 'center' }} />
            <span style={{ color: 'var(--text-primary)' }}>{cert.title}</span>
          </div>
        ))}
        <div style={{ color: 'var(--text-muted)', marginTop: 12 }}>
          [{certs.length} entries loaded]
        </div>
      </div>
    </div>
  );
}
