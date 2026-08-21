import { useRef, useEffect, useCallback } from 'react';
import { T } from '../Language/Language';
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
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2400&auto=format&fit=crop';

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
          alt="Golden agricultural field at sunrise"
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
          <T>Field Station</T><br />
          <span className="value"><T>Live sensor feed</T></span>
        </div>

        <div className="meta meta-tr">
          <span className="rule" /><T>Nodes Online</T><br />
          <span className="value">24 / 24</span> — <T>all active</T>
        </div>

        <div className="meta meta-bl">
          <span className="eyebrow"><T>Microclimate Early-Warning</T></span>
          <span className="lede">
            <T>Field-level weather, soil, and crop intelligence — every signal your farm needs, in real time.</T>
          </span>
        </div>

        <div className="meta meta-br">
          <T>Alert Status</T><br />
          <span className="value"><T>Clear</T></span> — <T>all zones</T><br />
          <T>Warnings</T> <span className="value"><T>0 active</T></span> — 24h
        </div>

        {/* ── Scroll cue ── */}
        <div className="scroll-cue" ref={cueRef}>
          <T>Scroll to open</T>
          <div className="line" />
        </div>
      </div>
    </section>
  );
}
