/**
 * MagnificationDock — macOS-inspired dock with fluid magnification
 * Icons magnify on hover; text labels sit beside them (unscaled).
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import React, { useMemo, useRef } from 'react';
import './MagnificationDock.css';

/* ── DockItem ──────────────────────────────── */
function DockItem({
  icon,
  label,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <div className={`dock-item-wrapper ${className}`} onClick={onClick}>
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        className="dock-item"
        tabIndex={0}
        role="button"
      >
        <div className="dock-icon">{icon}</div>
      </motion.div>
      <span className="dock-item-text">{label}</span>
    </div>
  );
}

/* ── MagnificationDock ─────────────────────── */
export default function MagnificationDock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height, scrollbarWidth: 'none' }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Navigation dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            className={item.className || ''}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
