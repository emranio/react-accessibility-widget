/**
 * Interactive controls inside the panel body: the size switch, the profile
 * cards, the tool tiles with their level indicators, and the reset bar.
 */
export const controls = `
/* ── Size switch ── */
.accessibility-widget-size-switch {
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  display: inline-flex;
  align-items: center;
  min-height: 0;
  padding: 0;
}
.accessibility-widget-size-switch:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-size-switch-track {
  position: relative;
  width: 150px;
  height: 44px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 5%, #ffffff);
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-text) 8%, #ffffff);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 4px;
}
.accessibility-widget-size-switch-option {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 14px;
  font-weight: 750;
  line-height: 1;
  letter-spacing: 0;
  color: #111827;
  transition: color 0.25s ease;
}
.accessibility-widget-size-switch-thumb {
  position: absolute;
  z-index: 1;
  left: 4px;
  top: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  border-radius: 999px;
  background: #ffffff;
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-text) 52%, #ffffff);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-thumb {
  transform: translateX(100%);
}
.accessibility-widget-size-switch[aria-checked="false"] .accessibility-widget-size-switch-option--s,
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-option--l {
  color: #111827;
}

/* ── Position grid ── */
.accessibility-widget-position-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
}
.accessibility-widget-position-option {
  aspect-ratio: 16 / 7;
  border-radius: 8px;
  border: 1px solid var(--accessibility-widget-border);
  background: color-mix(in srgb, var(--accessibility-widget-text) 4%, #ffffff);
  color: color-mix(in srgb, var(--accessibility-widget-text) 64%, transparent);
  cursor: pointer;
  display: grid;
  font: inherit;
  font-size: 17px;
  line-height: 1;
  padding: 6px;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
.accessibility-widget-position-option[data-position="left"] span { place-self: end start; }
.accessibility-widget-position-option[data-position="right"] span { place-self: end end; }
.accessibility-widget-position-option:hover {
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-position-option:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-position-option[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: color-mix(in srgb, var(--accessibility-widget-primary) 12%, #ffffff);
  color: var(--accessibility-widget-primary);
}

/* ── Profile cards ── */
.accessibility-widget-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.accessibility-widget-grid-tools { grid-template-columns: repeat(2, 1fr); }
[data-size="L"] .accessibility-widget-grid-tools {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.accessibility-widget-grid-3 { grid-template-columns: repeat(3, 1fr); }
[data-size="S"] .accessibility-widget-grid-3 { grid-template-columns: repeat(2, 1fr); }
.accessibility-widget-grid > *, .accessibility-widget-grid-3 > *, .accessibility-widget-grid-tools > * { min-width: 0; }

.accessibility-widget-card {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  padding: 10px 34px 10px 12px;
  background: #ffffff;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 9px;
  min-height: 58px;
  width: 100%;
}
.accessibility-widget-card:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 3%, #ffffff);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
}
.accessibility-widget-card[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-card[aria-pressed="true"]:hover { background: var(--accessibility-widget-primary); }
.accessibility-widget-card[aria-pressed="true"] .icon {
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-card .icon {
  width: 28px;
  height: 28px;
  color: var(--accessibility-widget-text);
  border: 0;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease;
}
.accessibility-widget-card:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); }
.accessibility-widget-card .icon svg { width: 19px; height: 19px; }
.accessibility-widget-card .label {
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: left;
  color: inherit;
}
.accessibility-widget-info {
  position: absolute;
  top: 13px;
  right: 13px;
  width: 18px;
  height: 18px;
  background: transparent;
  border-radius: 999px;
  color: color-mix(in srgb, var(--accessibility-widget-text) 48%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  opacity: 0;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}
.accessibility-widget-info-glyph {
  font-size: 11px;
  font-weight: 800;
  font-style: normal;
  line-height: 1;
}
.accessibility-widget-tooltip {
  position: absolute;
  z-index: 8;
  top: calc(100% + 8px);
  right: 0;
  width: 198px;
  max-width: calc(100vw - 48px);
  padding: 8px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accessibility-widget-panel-bg) 82%, #111827);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
  font-size: 11px;
  font-weight: 650;
  line-height: 1.35;
  text-align: left;
  white-space: normal;
  display: none;
  pointer-events: auto;
  transition: none;
}
.accessibility-widget-tooltip::before {
  content: "";
  position: absolute;
  top: -5px;
  right: 7px;
  width: 10px;
  height: 10px;
  background: inherit;
  transform: rotate(45deg);
}
.accessibility-widget-grid > :nth-child(odd) .accessibility-widget-tooltip {
  left: 0;
  right: auto;
}
.accessibility-widget-grid > :nth-child(odd) .accessibility-widget-tooltip::before {
  left: 7px;
  right: auto;
}
[data-size="L"] .accessibility-widget-grid-tools > * .accessibility-widget-tooltip {
  left: auto;
  right: 0;
}
[data-size="L"] .accessibility-widget-grid-tools > * .accessibility-widget-tooltip::before {
  left: auto;
  right: 7px;
}
[data-size="L"] .accessibility-widget-grid-tools > :nth-child(3n + 1) .accessibility-widget-tooltip {
  left: 0;
  right: auto;
}
[data-size="L"] .accessibility-widget-grid-tools > :nth-child(3n + 1) .accessibility-widget-tooltip::before {
  left: 7px;
  right: auto;
}
.accessibility-widget-card:hover .accessibility-widget-info,
.accessibility-widget-card:focus-visible .accessibility-widget-info,
.accessibility-widget-tile:hover .accessibility-widget-info,
.accessibility-widget-tile:focus-visible .accessibility-widget-info {
  opacity: 1;
  background: var(--accessibility-widget-info-bg);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-card[aria-pressed="true"] .accessibility-widget-info,
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-info {
  opacity: 1;
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #ffffff) 18%, transparent);
  color: var(--accessibility-widget-on-primary, #ffffff);
}
.accessibility-widget-info:hover .accessibility-widget-tooltip {
  display: block;
}

/* ── Tiles (content & color adjustments) ── */
.accessibility-widget-tile {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  padding: 14px 12px 13px;
  background: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  min-height: 114px;
  width: 100%;
}
.accessibility-widget-tile:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 3%, #ffffff);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
}
.accessibility-widget-tile[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-tile[aria-pressed="true"]:hover { background: var(--accessibility-widget-primary); }
.accessibility-widget-tile[aria-pressed="true"] .icon {
  color: var(--accessibility-widget-on-primary, #fff);
  border-color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 48%, transparent);
}
.accessibility-widget-tile .icon {
  width: 40px;
  height: 40px;
  color: var(--accessibility-widget-text);
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.accessibility-widget-tile:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); }
.accessibility-widget-tile .icon svg { width: 22px; height: 22px; }
.accessibility-widget-tile .label {
  font-size: 13px;
  font-weight: 750;
  line-height: 1.25;
  overflow-wrap: anywhere;
  width: 100%;
  text-align: center;
  color: inherit;
}

/* ── Level indicator bars (centered under each tile) ── */
.accessibility-widget-levels {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin-top: 0;
  min-height: 7px;
}
.accessibility-widget-levels span {
  flex: 0 0 16px;
  width: 16px;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 16%, transparent);
  transition: background 0.2s ease, height 0.2s ease;
}
.accessibility-widget-levels span.active {
  height: 7px;
  background: var(--accessibility-widget-primary);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 30%, transparent);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span.active {
  background: var(--accessibility-widget-on-primary, #fff);
}

/* ── Reset bar ── */
.accessibility-widget-reset-bar {
  padding: 0 12px 10px;
  border-top: 0;
  flex-shrink: 0;
  background: var(--accessibility-widget-panel-bg);
}
.accessibility-widget-reset-btn {
  width: 100%;
  height: 44px;
  border-radius: 999px;
  border: 0;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #ffffff);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.accessibility-widget-reset-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 90%, #ffffff);
}
.accessibility-widget-reset-btn svg { width: 14px; height: 14px; color: currentColor; }
`
