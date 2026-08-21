import { useRef, useEffect, useCallback } from 'react';
import { T } from '../Language/Language';
import './StackedCards.css';

const CARDS = [
  {
    tag: 'Microclimate',
    title: 'Field-Level Weather Station',
    desc: 'Continuous monitoring of temperature, humidity, rainfall, wind speed, wind direction, and light intensity at the crop canopy level — powered by an ultrasonic anemometer, tipping-bucket rain gauge, and precision environmental sensors.',
    techs: ['Anemometer', 'Rain Gauge', 'Environmental Sensor'],
    image: '/1.png',
  },
  {
    tag: 'Soil Intelligence',
    title: 'Soil Spectra Analytics',
    desc: 'Real-time soil condition profiling using near-infrared spectroscopy. Moisture, organic carbon, nutrient density, and pH mapped across every zone — turning invisible soil data into actionable fertility prescriptions.',
    techs: ['Soil Spectra', 'NIR Sensing', 'Zone Mapping'],
    image: '/2.png',
  },
  {
    tag: 'Early Warning',
    title: 'Localized Alert Engine',
    desc: 'Threshold-driven alerts for heavy rainfall, heat stress, high winds, and unsuitable crop-spraying conditions. Predictive models correlate microclimate patterns with crop vulnerability windows to warn before damage occurs.',
    techs: ['Predictive Models', 'SMS/Push Alerts', 'Risk Scoring'],
    image: '/3.png',
  },
  {
    tag: 'Infrastructure',
    title: 'Connected Sensor Mesh',
    desc: 'BLE nodes relay field data through a low-power gateway to a centralized data logger. Edge processing filters noise, compresses payloads, and ensures continuous uptime even in low-connectivity rural environments.',
    techs: ['BLE Node', 'BLE Gateway', 'Data Logger'],
    image: '/4.png',
  },
];

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export default function StackedCards() {
  const activeRef = useRef(0);
  const itemRefs = useRef([]);
  const cardRefs = useRef([]);
  const slideRefs = useRef([]);
  const progressRefs = useRef([]);
  const counterRef = useRef(null);
  const ticking = useRef(false);

  /** Set the active slide directly via DOM — avoids React re-render lag */
  const setActive = useCallback((idx) => {
    if (activeRef.current === idx) return;
    activeRef.current = idx;

    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      el.classList.toggle('active', i === idx);
    });
    progressRefs.current.forEach((el, i) => {
      if (!el) return;
      el.classList.toggle('active', i === idx);
    });
    if (counterRef.current) {
      counterRef.current.textContent =
        `${String(idx + 1).padStart(2, '0')} / ${String(CARDS.length).padStart(2, '0')}`;
    }
  }, []);

  const update = useCallback(() => {
    ticking.current = false;
    const vh = window.innerHeight;
    const stickyTop = 88;

    /*
     * A stack-item becomes "active" once its top edge has scrolled
     * to (or past) the sticky offset. We pick the LAST one that
     * satisfies this — that's the card currently visible on top.
     */
    let active = 0;
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      if (el.getBoundingClientRect().top <= stickyTop + 10) {
        active = i;
      }
    }
    setActive(active);

    /* scale / dim covered cards */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    for (let i = 0; i < itemRefs.current.length - 1; i++) {
      const next = itemRefs.current[i + 1];
      const card = cardRefs.current[i];
      if (!next || !card) continue;
      const rect = next.getBoundingClientRect();
      const p = 1 - clamp((rect.top - stickyTop) / (vh - stickyTop), 0, 1);
      card.style.transform = `translateY(${p * -14}px) scale(${1 - p * 0.05})`;
      card.style.filter = `brightness(${1 - p * 0.25})`;
    }
  }, [setActive]);

  const onScroll = useCallback(() => {
    if (!ticking.current) { requestAnimationFrame(update); ticking.current = true; }
  }, [update]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onScroll, update]);

  return (
    <section className="stacked-section" id="solutions">
      {/* ── Left: Sticky media panel ── */}
      <div className="media-panel">
        <div className="media-sticky">
          {CARDS.map((c, i) => (
            <div
              className={`media-slide${i === 0 ? ' active' : ''}`}
              key={i}
              ref={(el) => (slideRefs.current[i] = el)}
            >
              <img src={c.image} alt={c.title} />
              <div className="media-overlay" />
            </div>
          ))}

          <div className="media-hud">
            <div className="hud-indicator">
              <span className="hud-dot" />
              <span className="hud-label"><T>LIVE FEED</T></span>
            </div>
            <span className="hud-counter" ref={counterRef}>
              01 / {String(CARDS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="media-progress">
            {CARDS.map((_, i) => (
              <div
                key={i}
                className={`progress-bar${i === 0 ? ' active' : ''}`}
                ref={(el) => (progressRefs.current[i] = el)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Stacking cards ── */}
      <div className="cards-column">
        <div className="cards-header">
          <span className="cards-eyebrow"><T>The System</T></span>
          <h2 className="cards-title">
            <T>Sensing what your crops can't tell you</T><span className="title-dot">.</span>
          </h2>
        </div>

        {CARDS.map((c, i) => (
          <div className="stack-item" key={i} ref={(el) => (itemRefs.current[i] = el)}>
            <article className="sc-card" ref={(el) => (cardRefs.current[i] = el)}>
              <div className="sc-card-content">
                <div className="sc-card-meta">
                  <span className="sc-card-tag"><T>{c.tag}</T></span>
                  <span className="sc-card-count">
                    {String(i + 1).padStart(2, '0')} / {String(CARDS.length).padStart(2, '0')}
                  </span>
                </div>
                <h3><T>{c.title}</T></h3>
                <p><T>{c.desc}</T></p>
                <div className="sc-card-footer">
                  <div className="sc-card-techs">
                    {c.techs.map((t) => (<span key={t}><T>{t}</T></span>))}
                  </div>
                  <a className="sc-card-link" href="#">
                    <T>Explore</T>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
