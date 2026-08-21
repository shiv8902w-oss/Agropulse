import { useRef, useCallback, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { T } from '../Language/Language';
import './ProductGallery.css';

/* ── 3D Model helpers ─────────────────────── */
const MODEL_DHT22 = '/dht22_temperature_sensor_module.glb';
const MODEL_ESP32 = '/esp32.glb';
const MODEL_RAIN = '/sensor_de_chuva.glb';
const MODEL_PIR = '/pir_sensor.glb';
const MODEL_TFT = '/tft_display.glb';
const MODEL_AMBIENT_LIGHT = '/Ambient Light Sensor Module.glb';

/** Each instance clones the scene so multiple Canvases don't conflict */
function SensorModel({ url, scale }) {
  const { scene } = useGLTF(url);
  const clone = useMemo(() => scene.clone(true), [scene]);

  const finalScale = useMemo(() => {
    if (scale != null) return scale;
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    return maxDim > 0 ? 3.1 / maxDim : 1;
  }, [clone, scale]);

  return <primitive object={clone} scale={finalScale} />;
}

useGLTF.preload(MODEL_DHT22);
useGLTF.preload(MODEL_ESP32);
useGLTF.preload(MODEL_RAIN);
useGLTF.preload(MODEL_PIR);
useGLTF.preload(MODEL_TFT);
useGLTF.preload(MODEL_AMBIENT_LIGHT);

/** Reusable 3D viewer — `interactive` enables drag-rotate / zoom in the modal */
function ModelViewer({ url, scale = 1, position = [0, 0, 0], cameraPosition = [3, 2, 5], interactive = false }) {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 8, 5]} intensity={2} />
        <directionalLight position={[-5, -3, -5]} intensity={1} />
        <pointLight position={[0, 5, 3]} intensity={1.5} />
        <Suspense fallback={null}>
          <group position={position}>
            <Center>
              <SensorModel url={url} scale={scale} />
            </Center>
          </group>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableZoom={interactive}
          enablePan={interactive}
          enableRotate={interactive}
          autoRotate
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </div>
  );
}

/* ── Gallery view data ─────────────────────── */
const VIEWS = [
  {
    label: 'DHT22_SENSOR',
    eyebrow: 'DHT22 Temperature Sensor',
    is3D: true,
    modelUrl: MODEL_DHT22,
    modelScale: 60,
    modelPosition: [0, 0, 0],
    cameraPosition: [3, 2, 5],
    desc:
      'The DHT22 is a low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air, delivering calibrated digital output via a single-wire protocol — ideal for field-level environmental monitoring.',
  },
  {
    label: 'ESP32_BOARD',
    eyebrow: 'ESP32 IoT Controller',
    is3D: true,
    modelUrl: MODEL_ESP32,
    modelScale: 1.5,
    modelPosition: [0, 0, 0],
    cameraPosition: [0.5, 4.5, 2.5],
    desc:
      'The ESP32 is a low-power system on a chip microcontroller with integrated Wi-Fi and dual-mode Bluetooth. It serves as the primary controller for smart agricultural sensor nodes, handling data processing and wireless transmission.',
  },
  {
    label: 'RAIN_SENSOR',
    eyebrow: 'Rain Sensor Module',
    is3D: true,
    modelUrl: MODEL_RAIN,
    modelScale: 35,
    modelPosition: [0, 0, 0],
    cameraPosition: [3, 2, 5],
    desc:
      'The Rain Sensor Module is an easy-to-use water detection board. It functions as a rain detection switch when moisture falls on its sensor plate surface, allowing real-time weather monitoring for agricultural microclimates.',
  },
  {
    label: 'LIGHT_SENSOR',
    eyebrow: 'Ambient Light Sensor',
    is3D: true,
    modelUrl: MODEL_AMBIENT_LIGHT,
    modelScale: 100,
    modelPosition: [0, 0, 0],
    cameraPosition: [3, 2, 5],
    desc:
      'The Ambient Light Sensor Module measures illuminance levels in lux. It enables smart agricultural hubs to optimize artificial lighting, trigger automated shade controls, and monitor solar radiation intensity.',
  },
  {
    label: 'IMG_WORN_STUDIO',
    eyebrow: 'Worn, Studio',
    desc:
      'Cut is regular through the chest and tapered from the waist down, sized to layer over a midweight fleece without adding bulk at the shoulder. Shown here in Jet Black, size M.',
  },
];

const VIEWS_2 = [
  {
    label: 'PIR_SENSOR',
    eyebrow: 'PIR Motion Sensor',
    is3D: true,
    modelUrl: MODEL_PIR,
    modelScale: 1.5,
    modelPosition: [0, 0, 0],
    cameraPosition: [3, 2, 5],
    desc:
      'The Passive Infrared (PIR) Motion Sensor detects animal and human motion by measuring changes in infrared energy. Integrated into solar-powered field hubs, it provides real-time security alerts and activity logging in agricultural zones.',
  },
  {
    label: 'TFT_DISPLAY',
    eyebrow: 'TFT Display Module',
    is3D: true,
    modelUrl: MODEL_TFT,
    modelScale: null,
    modelPosition: [0, 0, 0],
    cameraPosition: [3, 2, 5],
    desc:
      'The TFT Display Module provides high-resolution graphical output for field sensor telemetry, displaying real-time microclimate metrics, system diagnostic logs, and network status.',
  },
  { label: '', eyebrow: 'Slot 03', desc: 'Upcoming 3D model sensor slot.' },
  { label: '', eyebrow: 'Slot 04', desc: 'Upcoming 3D model sensor slot.' },
  { label: '', eyebrow: 'Slot 05', desc: 'Upcoming 3D model sensor slot.' },
];

const TOTAL = VIEWS.length;
const TOTAL_2 = VIEWS_2.length;

/* ── Single gallery card ── */
function GalleryCard({ index, isSecondGallery = false, onClick }) {
  const v = isSecondGallery ? VIEWS_2[index] : VIEWS[index];
  const totalCount = isSecondGallery ? TOTAL_2 : TOTAL;
  const title = v.eyebrow || v.label;
  return (
    <div className={`pg-card${v.is3D ? ' pg-card--has-embed' : ''}`} data-i={index}>
      {/* Corner bracket decorations */}
      <span className="pg-bracket tl" />
      <span className="pg-bracket tr" />
      <span className="pg-bracket bl" />
      <span className="pg-bracket br" />

      {v.is3D ? (
        <>
          <div className="pg-card-iframe">
            <ModelViewer
              url={v.modelUrl}
              scale={v.modelScale}
              position={v.modelPosition}
              cameraPosition={v.cameraPosition}
              interactive={false}
            />
          </div>
          {/* Transparent overlay so the card click still fires */}
          <div className="pg-card-click-layer" onClick={() => onClick(index)} />
        </>
      ) : (
        <span className="pg-label"><T>{v.label}</T></span>
      )}

      {title && <span className="pg-card-title"><T>{title}</T></span>}

      <span className="pg-counter">
        {String(index + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
      </span>
      <span className="pg-expand" onClick={() => onClick(index)}><T>VIEW</T></span>
    </div>
  );
}

export default function ProductGallery() {
  const trackRef = useRef(null);
  const track2Ref = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState(1);
  const [activeView, setActiveView] = useState(0);

  /* ── Open / close modal ── */
  const openModal = useCallback((index) => {
    setActiveGallery(1);
    setActiveView(index);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const openModalSecond = useCallback((index) => {
    setActiveGallery(2);
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
    const track2 = track2Ref.current;
    if (modalOpen) {
      track?.classList.add('paused');
      track2?.classList.add('paused');
    } else {
      track?.classList.remove('paused');
      track2?.classList.remove('paused');
    }
  }, [modalOpen]);

  const v = activeGallery === 1 ? VIEWS[activeView] : VIEWS_2[activeView];

  return (
    <>
      <section className="gallery-section" id="gallery">
        {/* Section heading */}
        <div className="gallery-header">
          <span className="gallery-eyebrow"><T>Sensors Gallery</T></span>
          <h2 className="gallery-title">
            <T>Field Shell Jacket</T><span className="title-accent">.</span>
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

        {/* Second Marquee track (Opposite Direction) */}
        <div className="gallery-viewport" style={{ marginTop: '24px' }}>
          <div className="gallery-track gallery-track--reverse" ref={track2Ref}>
            {/* Original set */}
            {VIEWS_2.map((_, i) => (
              <GalleryCard key={`c-${i}`} index={i} isSecondGallery={true} onClick={openModalSecond} />
            ))}
            {/* Duplicate set for seamless loop */}
            {VIEWS_2.map((_, i) => (
              <GalleryCard key={`d-${i}`} index={i} isSecondGallery={true} onClick={openModalSecond} />
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

          <div className={`pg-modal-visual${v.is3D ? ' pg-modal-visual--embed' : ''}`}>
            {v.is3D ? (
              <div className="pg-modal-iframe">
                <ModelViewer
                  url={v.modelUrl}
                  scale={v.modelScale}
                  position={v.modelPosition}
                  cameraPosition={v.cameraPosition}
                  interactive={true}
                />
              </div>
            ) : (
              <span className="pg-label"><T>{v.label}</T></span>
            )}
          </div>

          <div className="pg-modal-info">
            <span className="pg-modal-eyebrow"><T>{v.eyebrow}</T></span>
            <h2 className="pg-modal-title" id="pgModalTitle">
              <T>Sensors induced in the system</T>
            </h2>
            <div className="pg-modal-price">$340</div>
            <div className="pg-modal-divider" />
            <p className="pg-modal-desc"><T>{v.desc}</T></p>
          </div>
        </div>
      </div>
    </>
  );
}
