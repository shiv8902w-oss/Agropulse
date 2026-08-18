import { useRef, useEffect, useCallback } from 'react';
import './PortalHero.css';

/* ── Utility helpers ─────────────────────── */
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const HERO_IMG =
  'https://images.unsplash.com/photo-1753153481105-7a979eabe5a9?fm=jpg&q=80&w=2400&auto=format&fit=crop';

export default function PortalHero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const duoRef = useRef(null);
  const panelLRef = useRef(null);
  const panelRRef = useRef(null);
  const dotARef = useRef(null);
  const dotTRef = useRef(null);
  const wordRef = useRef(null);
  const waRef = useRef(null);
  const wbRef = useRef(null);
  const cueRef = useRef(null);

  const ticking = useRef(false);

  /* ── Frame update — reads scroll position & applies transforms ── */
  const update = useCallback(() => {
    ticking.current = false;
    const hero = heroRef.current;
    if (!hero) return;

    const rect = hero.getBoundingClientRect();
    const scrollRange = hero.offsetHeight - window.innerHeight;
    const raw = scrollRange > 0 ? clamp(-rect.top / scrollRange, 0, 1) : 1;
    const p = ease(raw);

    /* Panels slide open */
    if (panelLRef.current)
      panelLRef.current.style.transform = `translateX(${lerp(0, -105, p)}%)`;
    if (panelRRef.current)
      panelRRef.current.style.transform = `translateX(${lerp(0, 105, p)}%)`;

    /* Image zoom-in */
    if (imgRef.current)
      imgRef.current.style.transform = `scale(${lerp(1.14, 1, p)})`;

    /* Duotone fade */
    if (duoRef.current)
      duoRef.current.style.opacity = lerp(0, 0.3, p);

    /* Accent dots scatter */
    if (dotARef.current)
      dotARef.current.style.transform = `translate(-50%,-50%) translate(${lerp(0, -32, p)}vw,${lerp(0, -28, p)}vh)`;
    if (dotTRef.current)
      dotTRef.current.style.transform = `translate(-50%,-50%) translate(${lerp(0, 32, p)}vw,${lerp(0, 28, p)}vh)`;

    /* Wordmark separates */
    const scale = lerp(1, 1.34, p);
    const ls = lerp(-0.02, -0.075, p);
    if (wordRef.current) {
      wordRef.current.style.transform = `translate(-50%,-50%) scale(${scale})`;
      wordRef.current.style.letterSpacing = `${ls}em`;
    }
    if (waRef.current)
      waRef.current.style.transform = `translateX(${lerp(0, -38, p)}%)`;
    if (wbRef.current)
      wbRef.current.style.transform = `translateX(${lerp(0, 38, p)}%)`;

    /* Scroll-cue fades */
    if (cueRef.current)
      cueRef.current.style.opacity = 1 - clamp(raw / 0.15, 0, 1);
  }, []);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(update);
      ticking.current = true;
    }
  }, [update]);

  /* ── Lifecycle — attach/detach listeners ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReduced) {
      document.documentElement.classList.add('js-portal');
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      update(); // initial frame
    }

    return () => {
      document.documentElement.classList.remove('js-portal');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onScroll, update]);

  return (
    <section className="portal-hero" id="portalHero" ref={heroRef}>
      <div className="stage">
        {/* ── Background image ── */}
        <img
          className="hero-img"
          ref={imgRef}
          src={HERO_IMG}
          alt="A control room of monitors, dimly lit"
        />
        <div className="duotone" ref={duoRef} />
        <div className="veil" />

        {/* ── Sliding panels ── */}
        <div className="panel panel-left" ref={panelLRef} />
        <div className="panel panel-right" ref={panelRRef} />

        {/* ── Accent dots ── */}
        <div className="hero-dot dot-amber" ref={dotARef} />
        <div className="hero-dot dot-teal" ref={dotTRef} />

        {/* ── Wordmark ── */}
        <h1 className="wordmark" ref={wordRef}>
          <span className="word-a" ref={waRef}>AGRO</span>
          <span className="word-b" ref={wbRef}>
            PULSE<span className="wm-dot">.</span>
          </span>
        </h1>

        {/* ── Corner metadata ── */}
        <div className="meta meta-tl">
          Ops deck<br />
          <span className="value">Live systems view</span>
        </div>

        <div className="meta meta-tr">
          <span className="rule" />Uptime<br />
          <span className="value">99.98%</span> — rolling 90d
        </div>

        <div className="meta meta-bl">
          <span className="eyebrow">Real-time ops command</span>
          <span className="lede">
            Alerts, on-call, and system status — every signal your team watches,
            in one room.
          </span>
        </div>

        <div className="meta meta-br">
          Region<br />
          <span className="value">US-EAST-1</span> / EU-WEST-1<br />
          Incidents <span className="value">0 open</span> — 24h
        </div>

        {/* ── Scroll cue ── */}
        <div className="scroll-cue" ref={cueRef}>
          Scroll to open
          <div className="line" />
        </div>
      </div>
    </section>
  );
}
