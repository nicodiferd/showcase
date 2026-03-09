import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { useWindowManager } from '../../state/WindowManagerContext';
import type { AppId } from '../../state/types';

const NEOFETCH = `
  ┌─────────────────────┐
  │     ╔╗╔╦╔═╗╔═╗      │
  │     ║║║║║  ║║ ║      │
  │     ║╚╝║╚═╝╚═╝      │
  │         OS           │
  └─────────────────────┘
  OS:      NicoOS v1.0
  Host:    Nicolo DiFerdinando
  Kernel:  Builder-23.0
  Shell:   nicosh 1.0
  CPU:     Caffeine-Powered
  Memory:  Unlimited Curiosity
  Uptime:  23 years
`;

const HELP = `Available commands:
  help        Show this message
  whoami      Who am I?
  neofetch    System info
  ls          List apps
  open <app>  Open an app (about, projects, resume, contact, certs, bandit, homelab)
  socials     Show social links
  clear       Clear terminal
  echo <msg>  Echo a message
  date        Show current date/time
  uname       System info (short)
  pwd         Print working directory
  history     Command history
`;

export function TerminalApp() {
  const { dispatch } = useWindowManager();
  const [lines, setLines] = useState<Array<{ text: string; type: 'input' | 'output' }>>([
    { text: 'NicoOS Terminal v1.0', type: 'output' },
    { text: 'Type "help" for available commands.', type: 'output' },
    { text: '', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const addOutput = (text: string) => {
    setLines(prev => [...prev, { text, type: 'output' }]);
  };

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    setLines(prev => [...prev, { text: `nicolo@nicoos:~$ ${trimmed}`, type: 'input' }]);
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (command) {
      case '':
        break;
      case 'help':
        addOutput(HELP);
        break;
      case 'whoami':
        addOutput('Nicolo DiFerdinando — builder, breaker, figuring it out.');
        break;
      case 'neofetch':
        addOutput(NEOFETCH);
        break;
      case 'ls':
        addOutput('about_me.exe  projects/  resume.pdf  achievements.log  bandit.txt  homelab.sh  mail.exe  terminal.exe');
        break;
      case 'open': {
        const appMap: Record<string, AppId> = {
          about: 'about', projects: 'projects', resume: 'resume',
          contact: 'contact', mail: 'contact', certs: 'certs',
          achievements: 'certs', bandit: 'bandit', homelab: 'homelab',
        };
        const appId = appMap[args.toLowerCase()];
        if (appId) {
          dispatch({ type: 'OPEN_WINDOW', appId });
          addOutput(`Opening ${args}...`);
        } else {
          addOutput(`Error: unknown app "${args}". Try: about, projects, resume, contact, certs, bandit, homelab`);
        }
        break;
      }
      case 'socials':
        addOutput('GitHub:   https://github.com/nicodiferd');
        addOutput('LinkedIn: https://linkedin.com/in/nicolo-diferdinando');
        addOutput('Email:    nicodiferd@gmail.com');
        break;
      case 'clear':
        setLines([]);
        break;
      case 'echo':
        addOutput(args || '');
        break;
      case 'date':
        addOutput(new Date().toString());
        break;
      case 'uname':
        addOutput('NicoOS v1.0 — builder-23.0 — caffeine-powered');
        break;
      case 'pwd':
        addOutput('/home/nicolo');
        break;
      case 'history':
        history.forEach((h, i) => addOutput(`  ${i + 1}  ${h}`));
        break;
      case 'sudo':
        addOutput('Nice try.');
        break;
      case 'rm':
        addOutput('Permission denied: cannot destroy portfolio');
        break;
      case 'exit':
        addOutput('There is no escape from NicoOS.');
        break;
      default:
        addOutput(`nicosh: command not found: ${command}`);
        break;
    }

    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div
      style={{
        background: '#000',
        color: 'var(--accent-primary)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 12,
        lineHeight: 1.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: -16,
        padding: 12,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div style={{ flex: 1, overflow: 'auto' }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            color: line.type === 'input' ? 'var(--text-secondary)' : 'var(--accent-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}>
            {line.text}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'var(--accent-primary)', marginRight: 8, flexShrink: 0 }}>
            nicolo@nicoos:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              outline: 'none',
              flex: 1,
              padding: 0,
              caretColor: 'var(--accent-primary)',
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
