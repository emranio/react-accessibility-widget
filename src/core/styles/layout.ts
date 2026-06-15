/**
 * Structural chrome: the floating trigger button, the modal overlay, the panel
 * shell, the header, and the scrollable body / section wrappers.
 */
export const layout = `
.accessibility-widget-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

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
.accessibility-widget-trigger[data-position="right"] { right: var(--accessibility-widget-trigger-offset-x, 20px); bottom: var(--accessibility-widget-trigger-offset-y, 20px); }
.accessibility-widget-trigger[data-position="left"]  { left: var(--accessibility-widget-trigger-offset-x, 20px);  bottom: var(--accessibility-widget-trigger-offset-y, 20px); }

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
  background: var(--accessibility-widget-panel-bg);
  width: 380px;
  max-width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  max-height: 720px;
  border-radius: 22px;
  border: 0;
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
.accessibility-widget-panel[data-size="S"] { width: 380px; max-height: 720px; }
.accessibility-widget-panel[data-size="L"] { width: 460px; max-height: 920px; }
.accessibility-widget-panel[data-position="right"] { right: 8px; bottom: 8px; }
.accessibility-widget-panel[data-position="left"]  { left: 8px;  bottom: 8px; }
@media (max-width: 480px) {
  .accessibility-widget-panel,
  .accessibility-widget-panel[data-size="S"],
  .accessibility-widget-panel[data-size="L"] {
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
    max-height: none;
  }
}

/* ── Header ── */
.accessibility-widget-header {
  background: var(--accessibility-widget-panel-bg);
  color: var(--accessibility-widget-on-primary, #fff);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 10px;
}
.accessibility-widget-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.accessibility-widget-header-icon {
  width: 34px;
  height: 34px;
  background: var(--accessibility-widget-primary);
  border: 0;
  border-radius: 999px;
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
  min-width: 0;
  max-width: 100%;
}
.accessibility-widget-header-title {
  display: block;
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--accessibility-widget-on-primary, #fff);
  line-height: 1.15;
}
.accessibility-widget-header-title span {
  min-width: 0;
  overflow-wrap: anywhere;
}
.accessibility-widget-header-shortcut {
  border: 0;
  padding: 0;
  background: transparent;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 76%, transparent);
  font: inherit;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.1;
  white-space: nowrap;
}
.accessibility-widget-header-sub {
  font-size: 11px;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 72%, transparent);
  letter-spacing: 0;
  text-transform: uppercase;
  line-height: 1.2;
}
.accessibility-widget-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 7px;
}
.accessibility-widget-icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-primary) 10%, #ffffff);
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: background 0.2s ease, color 0.2s ease, transform 0.16s ease;
}
.accessibility-widget-icon-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 7%, #ffffff);
  color: #111827;
  transform: scale(1.04);
}
.accessibility-widget-icon-btn:active {
  transform: scale(0.98);
}
.accessibility-widget-icon-btn svg { width: 12px; height: 12px; }

/* ── Body ── */
.accessibility-widget-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 12px 10px;
  background: var(--accessibility-widget-panel-bg);
  min-width: 0;
}
.accessibility-widget-body::-webkit-scrollbar { width: 7px; }
.accessibility-widget-body::-webkit-scrollbar-track { background: transparent; }
.accessibility-widget-body::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 36%, transparent);
  border-radius: 999px;
  border: 2px solid var(--accessibility-widget-panel-bg);
}
.accessibility-widget-body::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 56%, transparent);
}

/* ── Section ── */
.accessibility-widget-section {
  padding: 16px;
  background: var(--accessibility-widget-card-bg);
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-border) 88%, #ffffff);
  border-radius: 8px;
  margin: 0 0 16px;
  color: var(--accessibility-widget-text);
}
.accessibility-widget-section:last-child { margin-bottom: 0; }
.accessibility-widget-section-head {
  width: 100%;
  min-height: 44px;
  border: 0;
  border-radius: 8px;
  background: var(--accessibility-widget-section-head-bg);
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
}
.accessibility-widget-section-head:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-section-title {
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0;
  text-transform: none;
  color: var(--accessibility-widget-text);
  min-width: 0;
  overflow-wrap: anywhere;
}
.accessibility-widget-section-chevron {
  width: 18px;
  height: 18px;
  color: #111827;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessibility-widget-section-chevron svg { width: 18px; height: 18px; }
.accessibility-widget-section-body {
  padding-top: 16px;
}
.accessibility-widget-section-body[hidden] {
  display: none;
}
.accessibility-widget-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 42px;
}
.accessibility-widget-setting-row + .accessibility-widget-setting-row {
  margin-top: 12px;
}
.accessibility-widget-setting-row--stack {
  align-items: stretch;
  flex-direction: column;
  gap: 8px;
}
.accessibility-widget-setting-label {
  color: var(--accessibility-widget-text);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
}
`
