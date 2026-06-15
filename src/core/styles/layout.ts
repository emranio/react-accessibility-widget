/**
 * Structural chrome: the floating trigger button, the modal overlay, the panel
 * shell, the header, and the scrollable body / section wrappers.
 */
export const layout = `
/* ── Trigger ── */
.accessibility-widget-trigger {
  position: fixed;
  z-index: 2147483646;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.16);
  background: var(--accessibility-widget-trigger-bg, var(--accessibility-widget-primary));
  color: var(--accessibility-widget-trigger-icon, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease;
}
.accessibility-widget-trigger::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.3);
  pointer-events: none;
}
.accessibility-widget-trigger:hover {
  transform: scale(1.08) translateY(-1px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.28), 0 0 0 6px color-mix(in srgb, var(--accessibility-widget-primary) 16%, transparent);
}
.accessibility-widget-trigger:active { transform: scale(1.02); }
.accessibility-widget-trigger svg { width: 23px; height: 30px; }
.accessibility-widget-trigger svg circle,
.accessibility-widget-header-icon svg circle {
  fill: currentColor !important;
}
.accessibility-widget-trigger[data-position="bottom-right"] { right: 20px; bottom: 20px; }
.accessibility-widget-trigger[data-position="bottom-left"]  { left: 20px;  bottom: 20px; }
.accessibility-widget-trigger[data-position="top-right"]    { right: 20px; top: 20px; }
.accessibility-widget-trigger[data-position="top-left"]     { left: 20px;  top: 20px; }

/* ── Overlay ── */
.accessibility-widget-overlay {
  position: fixed;
  inset: 0;
  background: rgba(9,9,11,0.45);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  z-index: 2147483646;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
}
.accessibility-widget-overlay.open { opacity: 1; pointer-events: auto; }

/* ── Panel ── */
.accessibility-widget-panel {
  position: fixed;
  z-index: 2147483647;
  background: var(--accessibility-widget-bg);
  width: 320px;
  max-width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  max-height: 620px;
  border-radius: 20px;
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-border) 85%, transparent);
  overflow: hidden;
  box-shadow: 0 28px 80px rgba(0,0,0,0.24), 0 8px 24px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  transform: translateY(16px) scale(0.97);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease;
  transform-origin: bottom center;
}
.accessibility-widget-panel.open {
  transform: translateY(0) scale(1);
  opacity: 1;
  pointer-events: auto;
}
.accessibility-widget-panel[data-size="S"] { width: 320px; max-height: 620px; }
.accessibility-widget-panel[data-size="XL"] { width: 460px; max-height: 920px; }
.accessibility-widget-panel[data-position="bottom-right"] { right: 8px; bottom: 8px; transform-origin: bottom right; }
.accessibility-widget-panel[data-position="bottom-left"]  { left: 8px;  bottom: 8px; transform-origin: bottom left; }
.accessibility-widget-panel[data-position="top-right"]    { right: 8px; top: 8px;    transform-origin: top right; }
.accessibility-widget-panel[data-position="top-left"]     { left: 8px;  top: 8px;    transform-origin: top left; }

/* ── Header ── */
.accessibility-widget-header {
  background:
    linear-gradient(135deg,
      var(--accessibility-widget-header-bg, var(--accessibility-widget-primary)),
      color-mix(in srgb, var(--accessibility-widget-header-bg, var(--accessibility-widget-primary)) 76%, #000));
  color: #fff;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.accessibility-widget-header-left {
  display: flex;
  align-items: center;
  gap: 11px;
}
.accessibility-widget-header-icon {
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.18);
}
.accessibility-widget-header-icon svg { width: 19px; height: 19px; }
.accessibility-widget-header h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
}
.accessibility-widget-header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  max-width: 220px;
}
.accessibility-widget-header-title {
  font-size: 15px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: #fff;
  line-height: 1.15;
}
.accessibility-widget-header-sub {
  font-size: 11px;
  color: rgba(255,255,255,0.72);
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 1.2;
}
.accessibility-widget-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
.accessibility-widget-icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: rgba(255,255,255,0.08);
  border: none;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.14s ease, color 0.14s ease, transform 0.14s ease;
}
.accessibility-widget-icon-btn:hover {
  background: rgba(255,255,255,0.2);
  color: #fff;
  transform: rotate(90deg);
}
.accessibility-widget-icon-btn svg { width: 16px; height: 16px; }

/* ── Body ── */
.accessibility-widget-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  background: var(--accessibility-widget-bg);
  min-width: 0;
}
.accessibility-widget-body::-webkit-scrollbar { width: 7px; }
.accessibility-widget-body::-webkit-scrollbar-track { background: transparent; }
.accessibility-widget-body::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--accessibility-widget-muted) 45%, transparent);
  border-radius: 999px;
  border: 2px solid var(--accessibility-widget-bg);
}
.accessibility-widget-body::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--accessibility-widget-muted) 70%, transparent);
}

/* ── Section ── */
.accessibility-widget-section {
  padding: 16px 18px;
  border-bottom: 1px solid var(--accessibility-widget-border);
}
.accessibility-widget-section:last-child { border-bottom: none; }
.accessibility-widget-section--compact { padding: 12px 18px; }
.accessibility-widget-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.accessibility-widget-section--compact .accessibility-widget-section-head { margin-bottom: 0; }
.accessibility-widget-section-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--accessibility-widget-muted);
}
`
