import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './LoginPage.css';

const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong'];

function getStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function LoginPage({ onBack }) {
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState('');
  const strength = getStrength(pw);

  return (
    <div className="lp">
      {/* ── Nav ── */}
      <nav className="lp-nav">
        <button className="lp-nav-back" onClick={onBack} aria-label="Back to home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          <span>AGROPULSE<span className="lp-dot">.</span></span>
        </button>
        <div className="lp-nav-links">
          <span>Already monitoring?</span>
          <a href="#" className="lp-ulink lp-bold">Log in</a>
        </div>
      </nav>

      {/* ── Split main ── */}
      <main className="lp-split">

        {/* LEFT — Brand pane */}
        <div className="lp-brand">
          <div className="lp-grain" />
          <svg className="lp-arcs" viewBox="0 0 600 600" aria-hidden="true">
            <circle cx="500" cy="100" r="120" fill="none" stroke="rgba(254,250,224,.14)" strokeWidth="1"/>
            <circle cx="500" cy="100" r="200" fill="none" stroke="rgba(254,250,224,.10)" strokeWidth="1"/>
            <circle cx="500" cy="100" r="280" fill="none" stroke="rgba(254,250,224,.06)" strokeWidth="1"/>
          </svg>
          <div className="lp-bloom" />

          <div className="lp-brand-content">
            <p className="lp-eyebrow">
              <span className="lp-rule-line" />
              AGROPULSE &middot; FIELD INTELLIGENCE PLATFORM
            </p>

            <h1 className="lp-headline">
              Intelligence at the<br /><em>speed</em> of growth.
            </h1>

            <p className="lp-value">
              Deploy sensors, monitor microclimate, and get early
              warnings for every field you manage. No guesswork,
              no crop loss, ever again.
            </p>

            <hr className="lp-hr" />

            <blockquote className="lp-quote">
              <p>
                &ldquo;It is the first system that reads the field the way I
                actually farm. I describe the problem, it returns the
                prescription.&rdquo;
              </p>
              <footer className="lp-quote-footer">
                <span className="lp-avatar">RK</span>
                <div>
                  <strong>Rajesh Kumar</strong><br />
                  <span>Head Agronomist, GreenHarvest</span>
                </div>
              </footer>
            </blockquote>

            <div className="lp-features">
              <div className="lp-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span>24/7 monitoring</span>
              </div>
              <div className="lp-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
                <span>Real-time alerts</span>
              </div>
              <div className="lp-feature">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 22l1-1h3l9-9M17.5 2.5l4 4M14.5 5.5l4 4"/><path d="M12 8L4 16v4h4l8-8"/></svg>
                <span>Soil analytics</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Form pane */}
        <div className="lp-form-pane">
          <div className="lp-form-content">
            <p className="lp-form-eyebrow">CREATE YOUR ACCOUNT</p>
            <h2 className="lp-form-heading">
              Start monitoring,<br /><em>free.</em>
            </h2>
            <p className="lp-form-sub">
              50 sensor data points on the house. No card, no setup anxiety.
            </p>

            {/* OAuth */}
            <button className="lp-oauth" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
            <button className="lp-oauth" type="button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 00-3.8 23.38c.6.12.83-.26.83-.57v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016.02 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.8 5.62-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .31.2.69.82.57A12 12 0 0012 .3"/></svg>
              Continue with GitHub
            </button>

            {/* Divider */}
            <div className="lp-divider">
              <span className="lp-divider-line" />
              <span className="lp-divider-text">OR WITH EMAIL</span>
              <span className="lp-divider-line" />
            </div>

            {/* Form */}
            <form className="lp-form" onSubmit={(e) => e.preventDefault()}>
              <label className="lp-label">Work email</label>
              <div className="lp-field">
                <svg className="lp-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                <input type="email" placeholder="you@farm.co" autoComplete="email" />
              </div>

              <label className="lp-label">Password</label>
              <div className="lp-field">
                <svg className="lp-field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="8+ characters"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  autoComplete="new-password"
                />
                <button type="button" className="lp-eye" onClick={() => setShowPw(!showPw)} aria-label="Toggle password visibility">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Strength meter */}
              <div className="lp-strength">
                <div className="lp-strength-bars">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`lp-strength-seg${strength >= i ? ' active' : ''}`} />
                  ))}
                </div>
                {pw.length > 0 && (
                  <span className="lp-strength-label">{STRENGTH_LABELS[strength - 1] || ''}</span>
                )}
              </div>

              <button type="submit" className="lp-cta">Create account</button>
            </form>

            <p className="lp-terms">
              By continuing you agree to our <a href="#" className="lp-ulink">Terms</a> and <a href="#" className="lp-ulink">Privacy Policy</a>.
              We will never post on your behalf.
            </p>

            <div className="lp-bottom-row">
              <span>Already monitoring? <a href="#" className="lp-ulink">Log in</a></span>
              <a href="#" className="lp-ulink">Enterprise</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
