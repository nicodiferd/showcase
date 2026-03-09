import s from '../app-styles.module.css';

const services = [
  { name: 'Traderbot', desc: 'Windows 11 VM running automated trading workflows 24/7.', status: 'active', icon: 'fas fa-chart-line' },
  { name: 'Tailscale VPN', desc: 'Mesh VPN connecting all devices into a private network.', status: 'active', icon: 'fas fa-network-wired' },
  { name: 'Immich Photo Store', desc: 'Self-hosted Google Photos alt with AI face recognition.', status: 'stopped', icon: 'fas fa-images' },
  { name: 'n8n Workflows', desc: 'Open-source workflow automation platform.', status: 'active', icon: 'fas fa-project-diagram' },
  { name: 'PiHole DNS', desc: 'Network-level ad blocker and DNS sinkhole.', status: 'active', icon: 'fas fa-shield-alt' },
  { name: 'ClickHouse', desc: 'Column-oriented data warehouse for analytics workloads.', status: 'stopped', icon: 'fas fa-database' },
  { name: 'ClawdBot', desc: 'Self-hosted AI assistant with Discord integration and SSH access.', status: 'active', icon: 'fas fa-robot' },
];

export function HomelabApp() {
  return (
    <div>
      <div className={s.heading}>
        <i className="fas fa-server" style={{ marginRight: 8 }} />
        HOMELAB.SH
      </div>
      <p className={s.text}>
        I built my own cloud. A dedicated server, a pile of containers, and the belief
        that the best way to learn infrastructure is to run your own.
      </p>

      <div className={s.subheading}>HARDWARE</div>
      <div className={s.grid} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div className={s.stat}><div className={s.statNumber} style={{ fontSize: 14 }}>Ryzen 9 5900X</div><div className={s.statLabel}>CPU</div></div>
        <div className={s.stat}><div className={s.statNumber} style={{ fontSize: 14 }}>32 GB</div><div className={s.statLabel}>Memory</div></div>
        <div className={s.stat}><div className={s.statNumber} style={{ fontSize: 14 }}>Proxmox VE</div><div className={s.statLabel}>Hypervisor</div></div>
        <div className={s.stat}><div className={s.statNumber} style={{ fontSize: 14 }}>ZFS + LVM</div><div className={s.statLabel}>Storage</div></div>
      </div>

      <hr className={s.divider} />

      <div className={s.subheading}>SERVICES</div>
      {services.map(svc => (
        <div key={svc.name} className={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span className={s.cardTitle}>
              <i className={svc.icon} style={{ marginRight: 6, color: 'var(--accent-primary)' }} />
              {svc.name}
            </span>
            <span className={svc.status === 'active' ? s.statusActive : s.statusStopped}>
              {svc.status === 'active' ? '● RUNNING' : '○ STOPPED'}
            </span>
          </div>
          <div className={s.cardDesc}>{svc.desc}</div>
        </div>
      ))}

      <hr className={s.divider} />

      <div className={s.subheading}>CLOUDFLARE INFRA</div>
      <div className={s.grid} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className={s.stat}><div className={s.statNumber}>7</div><div className={s.statLabel}>Domains</div></div>
        <div className={s.stat}><div className={s.statNumber}>6</div><div className={s.statLabel}>Tunnels</div></div>
        <div className={s.stat}><div className={s.statNumber}>6</div><div className={s.statLabel}>Pages</div></div>
        <div className={s.stat}><div className={s.statNumber}>2</div><div className={s.statLabel}>R2 Buckets</div></div>
      </div>

      <hr className={s.divider} />

      <div className={s.subheading}>TECH STACK</div>
      <div className={s.tags}>
        {['Proxmox VE', 'ZFS', 'Docker', 'Linux', 'Cloudflare Tunnels', 'Cloudflare Pages', 'R2', 'Tailscale', 'n8n', 'PiHole', 'Python', 'Node.js', 'Bash', 'SSH', 'Discord.py', 'Claude API', 'Nginx'].map(t => (
          <span key={t} className={s.tag}>{t}</span>
        ))}
      </div>
    </div>
  );
}
