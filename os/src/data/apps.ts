import type { AppId, Size } from '../state/types';

export interface AppConfig {
  id: AppId;
  title: string;
  icon: string;
  filename: string;
  defaultSize: Size;
  minSize: Size;
}

export const apps: AppConfig[] = [
  {
    id: 'about',
    title: 'ABOUT_ME',
    icon: 'fas fa-user',
    filename: 'about_me.exe',
    defaultSize: { width: 620, height: 500 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: 'projects',
    title: 'PROJECTS',
    icon: 'fas fa-folder-open',
    filename: 'projects/',
    defaultSize: { width: 700, height: 520 },
    minSize: { width: 450, height: 350 },
  },
  {
    id: 'resume',
    title: 'RESUME',
    icon: 'fas fa-file-pdf',
    filename: 'resume.pdf',
    defaultSize: { width: 650, height: 550 },
    minSize: { width: 400, height: 350 },
  },
  {
    id: 'certs',
    title: 'ACHIEVEMENTS',
    icon: 'fas fa-trophy',
    filename: 'achievements.log',
    defaultSize: { width: 550, height: 450 },
    minSize: { width: 350, height: 300 },
  },
  {
    id: 'bandit',
    title: 'BANDIT',
    icon: 'fas fa-car',
    filename: 'bandit.txt',
    defaultSize: { width: 650, height: 500 },
    minSize: { width: 400, height: 350 },
  },
  {
    id: 'homelab',
    title: 'HOMELAB',
    icon: 'fas fa-server',
    filename: 'homelab.sh',
    defaultSize: { width: 650, height: 500 },
    minSize: { width: 400, height: 350 },
  },
  {
    id: 'contact',
    title: 'MAIL',
    icon: 'fas fa-envelope',
    filename: 'mail.exe',
    defaultSize: { width: 500, height: 480 },
    minSize: { width: 380, height: 400 },
  },
  {
    id: 'terminal',
    title: 'TERMINAL',
    icon: 'fas fa-terminal',
    filename: 'terminal.exe',
    defaultSize: { width: 600, height: 400 },
    minSize: { width: 400, height: 250 },
  },
];

export const getAppConfig = (appId: AppId): AppConfig => {
  return apps.find(a => a.id === appId)!;
};
