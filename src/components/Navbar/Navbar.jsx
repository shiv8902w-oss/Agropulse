import { useContext } from 'react';
import { LayoutDashboard, Bell, LogIn } from 'lucide-react';
import { PageContext } from '../../App';
import MagnificationDock from '../MagnificationDock/MagnificationDock';
import { LanguageToggle, T } from '../Language/Language';
import './Navbar.css';

export default function Navbar() {
  const { setPage } = useContext(PageContext);

  const dockItems = [
    {
      icon: <LayoutDashboard size={22} />,
      label: <T>Dashboard</T>,
      onClick: () => setPage('dashboard'),
    },
    {
      icon: <Bell size={22} />,
      label: <T>Alerts</T>,
      onClick: () => console.log('Alerts'),
    },
    {
      icon: <LogIn size={22} />,
      label: <T>Login</T>,
      onClick: () => setPage('login'),
    },
  ];

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-word">
        AGROPULSE<span className="dot">.</span>
      </div>

      <div className="nav-dock-wrapper">
        <MagnificationDock
          items={dockItems}
          panelHeight={48}
          baseItemSize={36}
          magnification={56}
          distance={140}
        />
      </div>

      <div className="nav-right">
        <LanguageToggle />
      </div>
    </nav>
  );
}

