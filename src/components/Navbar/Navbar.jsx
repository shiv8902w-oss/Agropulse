import './Navbar.css';

const navLinks = [
  { label: 'Dashboard', href: '#solutions' },
  { label: 'Sensors', href: '#sensors' },
  { label: 'Alerts', href: '#alerts' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="nav-word">
        AGROPULSE<span className="dot">.</span>
      </div>

      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button className="nav-cta">Request Demo</button>
      </div>
    </nav>
  );
}
