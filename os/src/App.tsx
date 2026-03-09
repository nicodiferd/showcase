import { useState, useCallback } from 'react';
import { WindowManagerProvider } from './state/WindowManagerContext';
import { BootScreen } from './components/Boot/BootScreen';
import { LoginScreen } from './components/Boot/LoginScreen';
import { Desktop } from './components/Desktop/Desktop';
import { Taskbar } from './components/Taskbar/Taskbar';

type Phase = 'boot' | 'login' | 'desktop';

function App() {
  const skipBoot = sessionStorage.getItem('nicoos-booted') === '1';
  const [phase, setPhase] = useState<Phase>(skipBoot ? 'desktop' : 'boot');

  const handleBootComplete = useCallback(() => {
    setPhase('login');
  }, []);

  const handleLoginComplete = useCallback(() => {
    sessionStorage.setItem('nicoos-booted', '1');
    setPhase('desktop');
  }, []);

  if (phase === 'boot') {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  if (phase === 'login') {
    return <LoginScreen onComplete={handleLoginComplete} />;
  }

  return (
    <WindowManagerProvider>
      <Desktop />
      <Taskbar />
      <div className="scanline-overlay" />
    </WindowManagerProvider>
  );
}

export default App;
