import { LayoutDashboard, Bell, LogIn } from 'lucide-react';
import MagnificationDock from '../MagnificationDock/MagnificationDock';
import './Navbar.css';

const dockItems = [
  {
    icon: <LayoutDashboard size={22} />,
    label: 'Dashboard',
    onClick: () => {
      const el = document.getElementById('solutions');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
  },
  {
    icon: <Bell size={22} />,
    label: 'Alerts',
    onClick: () => console.log('Alerts'),
  },
  {
    icon: <LogIn size={22} />,
    label: 'Login',
    onClick: () => console.log('Login'),
  },
];

export default function Navbar() {
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

      <div className="nav-spacer" />
    </nav>
  );
}
