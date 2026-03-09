import s from '../app-styles.module.css';

export function BanditApp() {
  return (
    <div>
      <div className={s.heading}>
        <i className="fas fa-car" style={{ marginRight: 8 }} />
        BANDIT: YEAR ONE
      </div>
      <p className={s.text}>
        A retrospective on co-founding a student transportation startup in San Luis Obispo.
      </p>

      <div className={s.subheading}>WHAT IT WAS</div>
      <p className={s.text}>
        Bandit was a student transportation company — an LLC I co-founded to provide safe, reliable rides
        for college students in San Luis Obispo. We weren't just building an app; we were trying to build
        a brand that students actually identified with.
      </p>
      <p className={s.text}>
        The driving company for the thrifters and coffee lovers, the band players and house show dancers,
        the party hosts and study-night warriors. That was the vision.
      </p>

      <hr className={s.divider} />

      <div className={s.subheading}>THE PROBLEM</div>
      <div className={s.grid}>
        <div className={s.card}>
          <div className={s.cardTitle}><i className="fas fa-dollar-sign" style={{ marginRight: 6, color: 'var(--accent-secondary)' }} />Surge Pricing</div>
          <div className={s.cardDesc}>Uber/Lyft prices 3-4x on weekend nights. $25+ for a 5-minute ride.</div>
        </div>
        <div className={s.card}>
          <div className={s.cardTitle}><i className="fas fa-clock" style={{ marginRight: 6, color: 'var(--accent-secondary)' }} />Unreliable Supply</div>
          <div className={s.cardDesc}>20-30 min waits, sometimes no cars at all in a small college town.</div>
        </div>
        <div className={s.card}>
          <div className={s.cardTitle}><i className="fas fa-shield-alt" style={{ marginRight: 6, color: 'var(--accent-secondary)' }} />Safety Gap</div>
          <div className={s.cardDesc}>High prices + long waits = students driving when they shouldn't.</div>
        </div>
      </div>

      <hr className={s.divider} />

      <div className={s.subheading}>WHAT WE BUILT</div>
      <div className={s.tags}>
        {['Swift', 'SwiftUI', 'TypeScript', 'Node.js', 'MongoDB', 'Firebase Auth', 'WebSockets', 'Stripe', 'Push Notifications'].map(t => (
          <span key={t} className={s.tag}>{t}</span>
        ))}
      </div>

      <hr className={s.divider} />

      <div className={s.subheading}>TIMELINE</div>
      <div className={s.timeline}>
        {[
          { date: 'Early 2024', title: 'Formation', text: 'Filed the LLC, assembled the founding team.' },
          { date: 'Spring 2024', title: 'Development', text: 'Built the iOS app, backend infrastructure, and scheduling system.' },
          { date: 'Summer 2024', title: 'Brand & Launch Prep', text: 'Developed brand identity, website, and marketing materials.' },
          { date: 'Fall 2024', title: 'Operations', text: 'Ran live operations — managing drivers, scheduling, the reality of running a service.' },
          { date: 'September 2025', title: 'Closure', text: 'Made the decision to wind down. Not a failure — a deliberate choice.' },
        ].map((item, i) => (
          <div key={i} className={s.timelineItem}>
            <div className={s.timelineDate}>{item.date}</div>
            <div className={s.timelineTitle}>{item.title}</div>
            <div className={s.timelineText}>{item.text}</div>
          </div>
        ))}
      </div>

      <hr className={s.divider} />

      <div className={s.subheading}>LESSONS LEARNED</div>
      <div className={s.grid}>
        <div className={s.card}>
          <div className={s.cardTitle}>Brand Resonance</div>
          <div className={s.cardDesc}>People connected with Bandit as a brand more than expected. The identity mattered.</div>
        </div>
        <div className={s.card}>
          <div className={s.cardTitle}>Operations Complexity</div>
          <div className={s.cardDesc}>The tech was the easy part. Software scales. Operations don't — at least not the same way.</div>
        </div>
        <div className={s.card}>
          <div className={s.cardTitle}>Knowing When to Stop</div>
          <div className={s.cardDesc}>Closing wasn't giving up. It was recognizing market conditions didn't align. I'd do it again.</div>
        </div>
      </div>
    </div>
  );
}
