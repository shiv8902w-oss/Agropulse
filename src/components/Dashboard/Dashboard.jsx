import './Dashboard.css';

/* ── Static data ── */
const FEED = [
  { initials: 'WS', text: 'Wind alert: Zone A-3 gusts 38km/h', time: 'Just now', color: '#fb7185' },
  { initials: 'SM', text: 'Soil moisture critical: Zone B-1', time: '2m ago', color: '#f5b544' },
  { initials: 'TP', text: 'Temperature normal: all zones', time: '5m ago', color: '#34d399' },
  { initials: 'RG', text: 'Rainfall detected: 3.2mm/hr', time: '8m ago', color: '#2dd4bf' },
  { initials: 'SS', text: 'Soil spectra scan complete', time: '14m ago', color: '#34d399' },
  { initials: 'AL', text: 'Heat stress warning cleared', time: '22m ago', color: '#8b7cff' },
];

const ZONES = [
  { zone: 'Zone A-1', temp: '26.5°C', hum: '72%', wind: '12 km/h', up: true },
  { zone: 'Zone A-2', temp: '27.1°C', hum: '68%', wind: '8 km/h', up: true },
  { zone: 'Zone B-1', temp: '25.8°C', hum: '81%', wind: '15 km/h', up: false },
  { zone: 'Zone B-2', temp: '28.3°C', hum: '55%', wind: '22 km/h', up: false },
  { zone: 'Zone C-1', temp: '24.9°C', hum: '74%', wind: '6 km/h', up: true },
];

const DONUT_DATA = [
  { label: 'Environmental', pct: 38, color: '#2dd4bf' },
  { label: 'Anemometer', pct: 25, color: '#34d399' },
  { label: 'Soil Spectra', pct: 21, color: '#f5b544' },
  { label: 'Rain Gauge', pct: 16, color: '#8b7cff' },
];

/* ── Tiny sparkline helpers ── */
function Sparkline({ points, color, w = 80, h = 28 }) {
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const d = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="db-sparkline" preserveAspectRatio="none">
      <polyline points="" fill="none" />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MicroBars({ values, color, w = 80, h = 28 }) {
  const max = Math.max(...values);
  const gap = 3;
  const bw = (w - gap * (values.length - 1)) / values.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="db-sparkline" preserveAspectRatio="none">
      {values.map((v, i) => {
        const bh = (v / max) * (h - 2);
        const op = 0.4 + (i / (values.length - 1)) * 0.6;
        return <rect key={i} x={i * (bw + gap)} y={h - bh} width={bw} height={bh} rx="2" fill={color} opacity={op} />;
      })}
    </svg>
  );
}

/* ── Donut ── */
function Donut({ data, size = 160, stroke = 22 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="db-donut">
      {data.map((d, i) => {
        const dash = (d.pct / 100) * circ;
        const gap = circ - dash;
        const o = offset;
        offset += dash;
        return (
          <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={d.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-o}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
    </svg>
  );
}

export default function Dashboard({ onBack }) {
  return (
    <div className="db">
      {/* ══════ APP BAR ══════ */}
      <header className="db-bar">
        <div className="db-bar-left">
          <button className="db-logo-tile" onClick={onBack} aria-label="Back to home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </button>
          <span className="db-wordmark">AGROPULSE</span>
          <nav className="db-nav-links">
            <span className="db-nav-active">Overview</span>
            <span>Sensors</span>
            <span>Alerts</span>
            <span>Reports</span>
          </nav>
        </div>
        <div className="db-bar-right">
          <div className="db-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <span className="db-search-hint">/</span>
          </div>
          <span className="db-date-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            Last 7 days
          </span>
          <button className="db-bell">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            <span className="db-bell-dot" />
          </button>
          <span className="db-avatar">PK</span>
        </div>
      </header>

      {/* ══════ PAGE HEADER ══════ */}
      <div className="db-header">
        <div>
          <h1 className="db-h1">Field Overview</h1>
          <p className="db-subtitle">SENSOR ANALYTICS &middot; UPDATED 4 MIN AGO</p>
        </div>
        <div className="db-header-actions">
          <div className="db-seg">
            <span>Day</span><span className="db-seg-active">Week</span><span>Month</span>
          </div>
          <button className="db-ghost">Export</button>
          <button className="db-primary">+ Add Widget</button>
        </div>
      </div>

      {/* ══════ BENTO GRID ══════ */}
      <div className="db-grid">

        {/* 1 — Temperature hero (2x2) */}
        <div className="db-tile db-tile-hero db-span-2x2">
          <div className="db-tile-head">
            <span className="db-eyebrow">AVG TEMPERATURE</span>
            <div className="db-mini-toggle">
              <span>12M</span><span className="active">30D</span><span>7D</span>
            </div>
          </div>
          <div className="db-big-row">
            <span className="db-big-num">26.5°C</span>
            <span className="db-delta db-delta-up">&#9650; +2.1°C</span>
          </div>
          {/* Area chart */}
          <div className="db-chart-wrap">
            <div className="db-y-axis">
              <span>35°C</span><span>30°C</span><span>25°C</span><span>20°C</span>
            </div>
            <div className="db-chart-area">
              <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="db-area-svg">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity=".35" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* gridlines */}
                {[50, 100, 150].map(y => <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#1e3228" strokeWidth="1" />)}
                {/* area fill */}
                <path d="M0,140 C40,130 80,120 125,110 C170,100 210,95 250,80 C290,65 330,55 375,50 C420,48 460,42 500,35 L500,200 L0,200Z" fill="url(#areaGrad)" />
                {/* line */}
                <path d="M0,140 C40,130 80,120 125,110 C170,100 210,95 250,80 C290,65 330,55 375,50 C420,48 460,42 500,35" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                {/* marker */}
                <circle cx="375" cy="50" r="5" fill="#34d399" />
                <circle cx="375" cy="50" r="9" fill="none" stroke="#34d399" strokeWidth="2" opacity=".4" />
                {/* connector */}
                <line x1="375" y1="42" x2="375" y2="18" stroke="#34d399" strokeWidth="1" opacity=".5" />
              </svg>
              {/* tooltip */}
              <div className="db-chart-tip" style={{ left: '75%' }}>Oct 12 &middot; 28.3°C</div>
              <div className="db-x-axis">
                <span>Sep 28</span><span>Oct 3</span><span>Oct 7</span><span>Oct 12</span><span>Oct 14</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 — Active Sensors (1x1) */}
        <div className="db-tile db-span-1x1">
          <span className="db-eyebrow">ACTIVE SENSORS</span>
          <div className="db-big-row">
            <span className="db-big-num db-mono">24 / 24</span>
            <span className="db-delta db-delta-up">&#9650; +0</span>
          </div>
          <div className="db-spark-bottom">
            <Sparkline points={[20, 22, 21, 24, 24, 23, 24, 24]} color="#2dd4bf" />
          </div>
        </div>

        {/* 3 — Soil Moisture (1x1) */}
        <div className="db-tile db-span-1x1">
          <span className="db-eyebrow">AVG SOIL MOISTURE</span>
          <div className="db-big-row">
            <span className="db-big-num db-mono">68%</span>
            <span className="db-delta db-delta-up">&#9650; +4.2%</span>
          </div>
          <div className="db-spark-bottom">
            <MicroBars values={[45, 52, 58, 55, 62, 65, 68]} color="#f5b544" />
          </div>
        </div>

        {/* 4 — Live Sensor Feed (1x2 tall) */}
        <div className="db-tile db-span-1x2">
          <div className="db-tile-head">
            <span className="db-eyebrow" style={{ margin: 0 }}>Live Sensor Feed</span>
            <span className="db-live-dot" />
          </div>
          <div className="db-feed">
            {FEED.map((e, i) => (
              <div className="db-feed-row" key={i}>
                <span className="db-feed-avatar">{e.initials}</span>
                <div className="db-feed-body">
                  <span className="db-feed-text">{e.text}</span>
                  <span className="db-feed-time">{e.time}</span>
                </div>
                <span className="db-feed-dot" style={{ background: e.color }} />
              </div>
            ))}
          </div>
        </div>

        {/* 5 — Sensor Distribution (1x2 tall) */}
        <div className="db-tile db-span-1x2 db-tile-donut">
          <span className="db-eyebrow">SENSOR DISTRIBUTION</span>
          <div className="db-donut-wrap">
            <Donut data={DONUT_DATA} />
            <div className="db-donut-center">
              <span className="db-donut-num">24</span>
              <span className="db-donut-label">SENSORS</span>
            </div>
          </div>
          <div className="db-legend">
            {DONUT_DATA.map((d, i) => (
              <div className="db-legend-row" key={i}>
                <span className="db-legend-dot" style={{ background: d.color }} />
                <span className="db-legend-name">{d.label}</span>
                <span className="db-legend-pct">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 — Field Health Score (1x1) */}
        <div className="db-tile db-span-1x1 db-tile-gauge">
          <svg viewBox="0 0 120 120" className="db-gauge-svg">
            <circle cx="60" cy="60" r="50" fill="none" stroke="#1e3228" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="#34d399" strokeWidth="10"
              strokeDasharray={`${0.82 * 314} ${314}`} strokeDashoffset="0"
              strokeLinecap="round" transform="rotate(-90 60 60)" />
          </svg>
          <div className="db-gauge-center">
            <span className="db-gauge-pct">82%</span>
          </div>
          <span className="db-eyebrow db-gauge-label">FIELD HEALTH SCORE</span>
          <span className="db-mono db-gauge-val">Good</span>
        </div>

        {/* 7 — Zone Status (3x1 wide) */}
        <div className="db-tile db-span-3x1">
          <div className="db-tile-head">
            <span className="db-eyebrow" style={{ margin: 0 }}>Zone Status</span>
            <a href="#" className="db-view-all">View all</a>
          </div>
          <div className="db-table-scroll">
            <table className="db-table">
              <thead>
                <tr>
                  <th>Zone</th><th>Temp</th><th>Humidity</th><th>Wind</th><th>7-Day Trend</th>
                </tr>
              </thead>
              <tbody>
                {ZONES.map((z, i) => (
                  <tr key={i}>
                    <td className="db-mono">{z.zone}</td>
                    <td className="db-mono">{z.temp}</td>
                    <td className="db-mono">{z.hum}</td>
                    <td className="db-mono">{z.wind}</td>
                    <td>
                      <Sparkline
                        points={z.up ? [3, 4, 3, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 5, 3]}
                        color={z.up ? '#34d399' : '#fb7185'}
                        w={60} h={20}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
