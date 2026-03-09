import s from '../app-styles.module.css';

export function AboutApp() {
  return (
    <div>
      <div className={s.avatarRow}>
        <img src="/images/Nicolo.jpeg" alt="Nicolo" className={s.avatar} />
        <div className={s.avatarInfo}>
          <h2>Nicolo DiFerdinando</h2>
          <div className={s.avatarSub}>builder. breaker. figuring it out.</div>
        </div>
      </div>

      <p className={s.text}>
        I'm Nicolo — 23, based out of Newport Beach California, educated at Cal Poly San Luis Obispo,
        and genuinely bad at picking one thing. I've co-founded a startup, completed 3 internships,
        play club baseball, and somehow still find time to build things that probably don't need to exist yet.
      </p>
      <p className={s.text}>
        I like building — automations of repetitive tasks, personal applications and iOS apps,
        infrastructure, research and knowledge bases, startups, whatever scratches the itch.
        Industrial Engineering major by degree, builder by default.
      </p>

      <hr className={s.divider} />

      <div className={s.subheading}>SKILLS</div>
      <div className={s.tags} style={{ gap: '6px' }}>
        {[
          { icon: 'fas fa-robot', label: 'AI Agents' },
          { icon: 'fas fa-shield-alt', label: 'Cybersecurity' },
          { icon: 'fas fa-mobile-alt', label: 'iOS / Full Stack' },
          { icon: 'fas fa-server', label: 'Infrastructure / DevOps' },
          { icon: 'fas fa-chart-bar', label: 'Data Analytics' },
          { icon: 'fas fa-rocket', label: 'Startups' },
        ].map(skill => (
          <span key={skill.label} className={s.skillBadge}>
            <i className={skill.icon} />
            {skill.label}
          </span>
        ))}
      </div>

      <hr className={s.divider} />

      <div className={s.subheading}>STATS</div>
      <div className={s.grid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className={s.stat}>
          <div className={s.statNumber}>6+</div>
          <div className={s.statLabel}>Projects</div>
        </div>
        <div className={s.stat}>
          <div className={s.statNumber}>8+</div>
          <div className={s.statLabel}>Achievements</div>
        </div>
        <div className={s.stat}>
          <div className={s.statNumber}>23</div>
          <div className={s.statLabel}>Years Old</div>
        </div>
      </div>
    </div>
  );
}
