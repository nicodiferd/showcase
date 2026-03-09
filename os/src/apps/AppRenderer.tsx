import type { AppId } from '../state/types';
import { AboutApp } from './AboutApp/AboutApp';
import { ProjectsApp } from './ProjectsApp/ProjectsApp';
import { ResumeApp } from './ResumeApp/ResumeApp';
import { ContactApp } from './ContactApp/ContactApp';
import { CertsApp } from './CertsApp/CertsApp';
import { BanditApp } from './BanditApp/BanditApp';
import { HomelabApp } from './HomelabApp/HomelabApp';
import { TerminalApp } from './TerminalApp/TerminalApp';

const appComponents: Record<AppId, () => React.JSX.Element> = {
  about: AboutApp,
  projects: ProjectsApp,
  resume: ResumeApp,
  contact: ContactApp,
  certs: CertsApp,
  bandit: BanditApp,
  homelab: HomelabApp,
  terminal: TerminalApp,
};

export function AppRenderer({ appId }: { appId: AppId }) {
  const Component = appComponents[appId];
  return <Component />;
}
