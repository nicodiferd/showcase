import s from '../app-styles.module.css';

export function ResumeApp() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className={s.heading} style={{ marginBottom: 0 }}>RESUME.PDF</div>
        <a
          href="/Nicolo DiFerdinando Resume.pdf"
          download="Nicolo_DiFerdinando_Resume.pdf"
          className={s.submitBtn}
          style={{ textDecoration: 'none' }}
        >
          <i className="fas fa-download" style={{ marginRight: 6 }} />
          DOWNLOAD
        </a>
      </div>
      <div style={{ flex: 1, border: '1px solid var(--border-color)', minHeight: 300 }}>
        <iframe
          src="/Nicolo DiFerdinando Resume.pdf"
          title="Resume"
          style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
        />
      </div>
    </div>
  );
}
