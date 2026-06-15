/**
 * Cursor-following reading aids and global widget affordances: the magnifier
 * tooltip, the reading lens, the reading mask, the reading guide, and the
 * shared focus-visible ring.
 */
export const readingTools = `
.accessibility-widget-magnify-cursor {
  position: fixed;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 2147483645;
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 18px;
  max-width: 280px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  color: #0c0c0c;
  line-height: 1.4;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

/* ── Reading lens (circular zoom that follows the cursor) ── */
.accessibility-widget-reading-lens {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2147483645;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  border: 4px solid #0c0c0c;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.6),
    0 16px 40px rgba(0,0,0,0.40),
    inset 0 0 0 1px rgba(255,255,255,0.4);
  will-change: transform;
  contain: layout paint;
}
.accessibility-widget-reading-lens::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  box-shadow: inset 0 0 24px rgba(0,0,0,0.10);
}
.accessibility-widget-reading-lens-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform-origin: 0 0;
  will-change: transform;
}
.accessibility-widget-reading-lens-inner > * {
  margin: 0 !important;
}
.accessibility-widget-reading-lens-inner,
.accessibility-widget-reading-lens-inner *,
.accessibility-widget-reading-lens-inner *::before,
.accessibility-widget-reading-lens-inner *::after {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}

/* ── Reading mask (clear horizontal band with shaded surroundings) ── */
.accessibility-widget-reading-mask {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483644;
}
.accessibility-widget-reading-mask-panel {
  position: fixed;
  left: 0;
  right: 0;
  background: rgba(0,0,0,var(--accessibility-widget-reading-mask-opacity, 0.45));
}
.accessibility-widget-reading-mask-top {
  top: 0;
  border-bottom: 3px solid var(--accessibility-widget-reading-mask-edge, #10b981);
}
.accessibility-widget-reading-mask-bottom {
  bottom: 0;
  border-top: 3px solid var(--accessibility-widget-reading-mask-edge, #10b981);
}

/* ── Reading guide (high-contrast rule that follows the cursor) ── */
.accessibility-widget-reading-guide {
  position: fixed;
  left: 0;
  width: 100vw;
  height: var(--accessibility-widget-reading-guide-height, 8px);
  border: var(--accessibility-widget-reading-guide-border, 3px) solid var(--accessibility-widget-reading-guide-edge, #facc15);
  border-radius: 999px;
  background: var(--accessibility-widget-reading-guide-fill, #0c0c0c);
  box-shadow:
    0 0 0 1px rgba(0,0,0,0.28),
    0 0 18px var(--accessibility-widget-reading-guide-glow, rgba(250,204,21,0.34));
  pointer-events: none;
  z-index: 2147483645;
}
.accessibility-widget-reading-guide-pointer {
  position: absolute;
  left: var(--accessibility-widget-reading-guide-x, 50vw);
  top: -24px;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 18px solid var(--accessibility-widget-reading-guide-edge, #facc15);
}
.accessibility-widget-reading-guide-pointer::after {
  content: '';
  position: absolute;
  left: -12px;
  top: 7px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid var(--accessibility-widget-reading-guide-fill, #0c0c0c);
}

.accessibility-widget-root :focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 2px;
}
`
