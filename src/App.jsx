import Navbar from './components/Navbar/Navbar';
import PortalHero from './components/PortalHero/PortalHero';

export default function App() {
  return (
    <>
      <Navbar />
      <PortalHero />

      {/* Placeholder section below the hero so the page scrolls past the reveal */}
      <section
        style={{
          minHeight: '100vh',
          background: 'var(--ground)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(20px, 3vw, 36px)',
            fontWeight: 700,
            color: 'var(--ink-2)',
            letterSpacing: '-.02em',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          Content coming soon<span style={{ color: 'var(--amber)' }}>.</span>
        </p>
      </section>
    </>
  );
}
