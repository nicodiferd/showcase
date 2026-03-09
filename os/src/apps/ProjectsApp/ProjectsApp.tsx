import s from '../app-styles.module.css';

const projects = [
  {
    name: 'Flora',
    desc: 'Building something new. Details under NDA — more to share soon.',
    tags: ['Research', 'HCI', 'NDA'],
    link: null,
    linkText: 'Coming Soon',
    icon: 'fas fa-seedling',
  },
  {
    name: 'HomeLab',
    desc: 'Self-hosted infrastructure running Proxmox, Cloudflare tunnels, AI assistants, and more on a dedicated server.',
    tags: ['Infrastructure', 'Proxmox', 'Cloudflare'],
    link: null,
    linkText: null,
    icon: 'fas fa-server',
  },
  {
    name: 'Bandit',
    desc: 'Co-founded a student transportation LLC in SLO. Built the app, ran operations, and closed after a year of learning.',
    tags: ['Startup', 'iOS', 'Operations'],
    link: null,
    linkText: null,
    icon: 'fas fa-car',
  },
  {
    name: 'Zedi',
    desc: 'Personal finance tracker with receipt OCR via Claude Vision, an auto-categorization engine that learns from corrections, and a Rust backend.',
    tags: ['Rust', 'Next.js', 'AI/ML'],
    link: null,
    linkText: 'Private Repo',
    icon: 'fas fa-chart-line',
  },
  {
    name: 'Beyond Wrapped',
    desc: 'Spotify analytics platform with ML-powered audio feature prediction, temporal listening patterns, and context-aware scoring.',
    tags: ['Python', 'ML', 'Streamlit'],
    link: null,
    linkText: 'Private Repo',
    icon: 'fab fa-spotify',
  },
  {
    name: 'diferdinando.com',
    desc: 'Modern portfolio website built with Next.js and TypeScript. Features dynamic theming and responsive design.',
    tags: ['Next.js', 'TypeScript', 'React'],
    link: 'https://diferdinando.com',
    linkText: 'View Project',
    icon: 'fas fa-globe',
  },
];

export function ProjectsApp() {
  return (
    <div>
      <div className={s.heading}>
        <i className="fas fa-folder-open" style={{ marginRight: 8 }} />
        /home/nicolo/projects
      </div>

      {projects.map(p => (
        <div key={p.name} className={s.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <i className={p.icon} style={{ color: 'var(--accent-primary)', fontSize: 14 }} />
            <span className={s.cardTitle}>{p.name}</span>
          </div>
          <div className={s.cardDesc}>{p.desc}</div>
          <div className={s.tags}>
            {p.tags.map(t => (
              <span key={t} className={s.tag}>{t}</span>
            ))}
          </div>
          {p.link ? (
            <a href={p.link} target="_blank" rel="noopener noreferrer" className={s.link}>
              {p.linkText} →
            </a>
          ) : p.linkText ? (
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{p.linkText}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
