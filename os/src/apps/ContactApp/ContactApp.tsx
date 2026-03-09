import { useState, type FormEvent } from 'react';
import s from '../app-styles.module.css';

export function ContactApp() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch('https://formspree.io/f/xovjlpne', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className={s.success}>
        <i className="fas fa-check" style={{ marginRight: 8 }} />
        Message sent successfully.
      </div>
    );
  }

  return (
    <div>
      <div className={s.heading}>
        <i className="fas fa-envelope" style={{ marginRight: 8 }} />
        NEW MESSAGE
      </div>
      <p className={s.text}>
        Have an idea, a project, or just want to talk shop? Send a message.
      </p>

      <form onSubmit={handleSubmit}>
        <div className={s.formGroup}>
          <label className={s.label}>NAME</label>
          <input type="text" name="name" className={s.input} required autoComplete="name" />
        </div>
        <div className={s.formGroup}>
          <label className={s.label}>EMAIL</label>
          <input type="email" name="email" className={s.input} required autoComplete="email" />
        </div>
        <div className={s.formGroup}>
          <label className={s.label}>MESSAGE</label>
          <textarea name="message" className={s.textarea} rows={5} required />
        </div>
        <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        {status === 'error' && (
          <p style={{ color: 'var(--accent-danger)', fontSize: 11, marginBottom: 8 }}>
            Failed to send. Try again.
          </p>
        )}

        <button type="submit" className={s.submitBtn} disabled={status === 'sending'}>
          {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
      </form>
    </div>
  );
}
