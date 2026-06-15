/**
 * Structural chrome: the floating trigger button, the modal overlay, the panel
 * shell, the header, and the scrollable body / section wrappers.
 *
 * Light scheme only. Flat: no gradients or shadows. Feedback comes from colour
 * changes and outlines, not motion — there are no hover lifts or press effects.
 */
export const layout = `
/* ── Trigger ── */
.accessibility-widget-trigger {
  position: fixed;
  z-index: 2147483646;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: var(--accessibility-widget-trigger-bg, var(--accessibility-widget-primary));
  color: var(--accessibility-widget-trigger-icon, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: filter 0.2s ease;
}
.accessibility-widget-trigger:hover { filter: brightness(0.93); }
.accessibility-widget-trigger:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accessibility-widget-primary) 55%, transparent);
  outline-offset: 3px;
}
.accessibility-widget-trigger svg { width: 26px; height: 26px; }
.accessibility-widget-trigger[data-position="bottom-right"] { right: var(--accessibility-widget-trigger-offset-x, 20px); bottom: var(--accessibility-widget-trigger-offset-y, 20px); }
.accessibility-widget-trigger[data-position="bottom-left"]  { left: var(--accessibility-widget-trigger-offset-x, 20px);  bottom: var(--accessibility-widget-trigger-offset-y, 20px); }

/* ── Overlay ── */
.accessibility-widget-overlay {
  position: fixed;
  inset: 0;
  background: rgba(9,9,11,0.42);
  z-index: 2147483646;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
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
  border-radius: 16px;
  border: 1px solid var(--accessibility-widget-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
.accessibility-widget-panel.open {
  opacity: 1;
  pointer-events: auto;
}
.accessibility-widget-panel[data-size="S"] { width: 320px; max-height: 620px; }
.accessibility-widget-panel[data-size="XL"] { width: 460px; max-height: 920px; }
.accessibility-widget-panel[data-position="bottom-right"] { right: 8px; bottom: 8px; }
.accessibility-widget-panel[data-position="bottom-left"]  { left: 8px;  bottom: 8px; }

/* ── Header ── */
.accessibility-widget-header {
  background: var(--accessibility-widget-header-bg, var(--accessibility-widget-primary));
  color: var(--accessibility-widget-on-primary, #fff);
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.accessibility-widget-header-left {
  display: flex;
  align-items: center;
  gap: 11px;
}
.accessibility-widget-header-icon {
  width: 36px;
  height: 36px;
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 16%, transparent);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessibility-widget-header-icon svg { width: 20px; height: 20px; }
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
  color: var(--accessibility-widget-on-primary, #fff);
  line-height: 1.15;
}
.accessibility-widget-header-sub {
  font-size: 11px;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 72%, transparent);
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
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 10%, transparent);
  border: none;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 78%, transparent);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, color 0.2s ease;
}
.accessibility-widget-icon-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 22%, transparent);
  color: var(--accessibility-widget-on-primary, #fff);
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
