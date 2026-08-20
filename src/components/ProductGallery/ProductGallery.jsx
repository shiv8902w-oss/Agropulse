import { useRef, useCallback, useEffect, useState } from 'react';
import './ProductGallery.css';

/* ── Gallery view data ─────────────────────── */
const VIEWS = [
  {
    label: 'IMG_FRONT_VIEW',
    eyebrow: 'Front View',
    desc:
      'The Field Shell is built for the gap between a rain jacket and a real shell — light enough to carry every day, sealed enough to trust on a ridge line. A three-layer recycled nylon face keeps the garment stiff enough to hold its shape off the body.',
  },
  {
    label: 'IMG_BACK_VIEW',
    eyebrow: 'Back View',
    desc:
      'A yoke seam across the upper back allows the shell to move with the shoulder rather than against it. Seams here are taped in a single pass, which is slower to produce and the reason the jacket carries a 15,000mm hydrostatic rating instead of a nominal one.',
  },
  {
    label: 'IMG_DETAIL_HOOD',
    eyebrow: 'Hood Detail',
    desc:
      'The hood adjusts from two points at the back of the skull rather than the front, so the fit tightens evenly instead of pulling down over the eyes. It packs flat into the collar when not in use, with no loose fabric bunched at the neck.',
  },
  {
    label: 'IMG_DETAIL_CUFF',
    eyebrow: 'Cuff Detail',
    desc:
      'An adjustable velcro tab at each cuff seals the sleeve against the wrist without needing an inner elastic gasket, which keeps the sleeve easy to push up on warmer days and fully closed when the weather turns.',
  },
  {
    label: 'IMG_WORN_STUDIO',
    eyebrow: 'Worn, Studio',
    desc:
      'Cut is regular through the chest and tapered from the waist down, sized to layer over a midweight fleece without adding bulk at the shoulder. Shown here in Jet Black, size M.',
  },
];

const TOTAL = VIEWS.length;

/* ── Single gallery card ── */
function GalleryCard({ index, onClick }) {
  const v = VIEWS[index];
  return (
    <div className="pg-card" data-i={index} onClick={() => onClick(index)}>
      {/* Corner bracket decorations */}
      <span className="pg-bracket tl" />
      <span className="pg-bracket tr" />
      <span className="pg-bracket bl" />
      <span className="pg-bracket br" />

      <span className="pg-label">{v.label}</span>
      <span className="pg-counter">
        {String(index + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
      </span>
      <span className="pg-expand">VIEW</span>
    </div>
  );
}

export default function ProductGallery() {
  const trackRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeView, setActiveView] = useState(0);

  /* ── Open / close modal ── */
  const openModal = useCallback((index) => {
    setActiveView(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = '';
  }, []);

  /* ── Keyboard escape ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && modalOpen) closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalOpen, closeModal]);

  /* ── Pause marquee while modal is open ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (modalOpen) {
      track.classList.add('paused');
    } else {
      track.classList.remove('paused');
    }
  }, [modalOpen]);

  const v = VIEWS[activeView];

  return (
    <>
      <section className="gallery-section" id="gallery">
        {/* Section heading */}
        <div className="gallery-header">
          <span className="gallery-eyebrow">Product Gallery</span>
          <h2 className="gallery-title">
            Field Shell Jacket<span className="title-accent">.</span>
          </h2>
        </div>

        {/* Marquee track */}
        <div className="gallery-viewport">
          <div className="gallery-track" ref={trackRef}>
            {/* Original set */}
            {VIEWS.map((_, i) => (
              <GalleryCard key={`a-${i}`} index={i} onClick={openModal} />
            ))}
            {/* Duplicate set for seamless loop */}
            {VIEWS.map((_, i) => (
              <GalleryCard key={`b-${i}`} index={i} onClick={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      <div
        className={`pg-modal-overlay${modalOpen ? ' open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div
          className="pg-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pgModalTitle"
        >
          <button
            className="pg-modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>

          <div className="pg-modal-visual">
            <span className="pg-label">{v.label}</span>
          </div>

          <div className="pg-modal-info">
            <span className="pg-modal-eyebrow">{v.eyebrow}</span>
            <h2 className="pg-modal-title" id="pgModalTitle">
              Field Shell Jacket
            </h2>
            <div className="pg-modal-price">$340</div>
            <div className="pg-modal-divider" />
            <p className="pg-modal-desc">{v.desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}
