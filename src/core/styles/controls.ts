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
  transition: filter 0.12s ease;
}
.accessibility-widget-size-switch:hover {
  filter: brightness(0.98);
}
.accessibility-widget-size-switch:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-size-switch-track {
  position: relative;
  width: 64px;
  height: 32px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-bg) 92%, var(--accessibility-widget-surface));
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-muted) 42%, var(--accessibility-widget-border));
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.04);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 3px;
  transition: background 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
}
.accessibility-widget-size-switch-option {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.01em;
  color: color-mix(in srgb, var(--accessibility-widget-muted) 86%, var(--accessibility-widget-text));
  transition: color 0.16s ease;
}
.accessibility-widget-size-switch-thumb {
    position: absolute;
    z-index: 1;
    left: 1px;
    top: 1px;
    background: var(--accessibility-widget-primary);
    box-shadow: 0 2px 6px color-mix(in srgb, var(--accessibility-widget-primary) 35%, transparent);
    transition: transform 0.24s cubic-bezier(0.34,1.56,0.64,1), background 0.16s ease;
    width: 55%;
    height: 26px;
    border-radius: 3rem;
}
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-track {
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 42%, var(--accessibility-widget-border));
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.04);
}
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-thumb {
  transform: translateX(25px);
}
.accessibility-widget-size-switch[aria-checked="false"] .accessibility-widget-size-switch-option--s,
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-option--l {
  color: var(--accessibility-widget-bg);
}

/* ── Profile cards ── */
.accessibility-widget-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.accessibility-widget-grid-3 { grid-template-columns: repeat(3, 1fr); }
[data-size="S"] .accessibility-widget-grid-3 { grid-template-columns: repeat(2, 1fr); }
.accessibility-widget-grid > *, .accessibility-widget-grid-3 > * { min-width: 0; }

.accessibility-widget-card {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 12px;
  padding: 11px 13px;
  background: var(--accessibility-widget-bg);
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), border-color 0.16s ease, background 0.16s ease, box-shadow 0.2s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 54px;
}
.accessibility-widget-card:hover {
  background: var(--accessibility-widget-surface);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 32%, var(--accessibility-widget-border));
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
}
.accessibility-widget-card[aria-pressed="true"] {
  border-color: transparent;
  background: linear-gradient(135deg, var(--accessibility-widget-primary), color-mix(in srgb, var(--accessibility-widget-primary) 80%, #000));
  color: #fff;
  box-shadow: 0 8px 20px color-mix(in srgb, var(--accessibility-widget-primary) 38%, transparent);
}
.accessibility-widget-card[aria-pressed="true"] .icon { color: rgba(255,255,255,0.9); }
.accessibility-widget-card[aria-pressed="true"]:hover {
  background: linear-gradient(135deg, var(--accessibility-widget-primary), color-mix(in srgb, var(--accessibility-widget-primary) 80%, #000));
  border-color: transparent;
}
.accessibility-widget-card[aria-pressed="true"]:hover .icon { color: #fff; }
.accessibility-widget-card .icon { width: 22px; height: 22px; color: var(--accessibility-widget-muted); flex-shrink: 0; transition: color 0.16s ease, transform 0.2s ease; }
.accessibility-widget-card:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); transform: scale(1.08); }
.accessibility-widget-card .icon svg { width: 100%; height: 100%; }
.accessibility-widget-card .label { font-size: 12px; font-weight: 550; line-height: 1.3; min-width: 0; overflow-wrap: break-word; }

/* ── Tiles (content & color adjustments) ── */
.accessibility-widget-tile {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 14px;
  padding: 14px 10px 12px;
  background: var(--accessibility-widget-bg);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), border-color 0.16s ease, background 0.16s ease, box-shadow 0.2s ease;
  min-height: 118px;
  width: 100%;
}
.accessibility-widget-tile:hover {
  background: var(--accessibility-widget-surface);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 32%, var(--accessibility-widget-border));
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.09);
}
.accessibility-widget-tile[aria-pressed="true"] {
  border-color: transparent;
  background: linear-gradient(140deg, var(--accessibility-widget-primary), color-mix(in srgb, var(--accessibility-widget-primary) 80%, #000));
  color: #fff;
  box-shadow: 0 8px 22px color-mix(in srgb, var(--accessibility-widget-primary) 38%, transparent);
}
.accessibility-widget-tile[aria-pressed="true"] .icon { color: rgba(255,255,255,0.9); }
.accessibility-widget-tile[aria-pressed="true"]:hover {
  background: linear-gradient(140deg, var(--accessibility-widget-primary), color-mix(in srgb, var(--accessibility-widget-primary) 80%, #000));
  border-color: transparent;
}
.accessibility-widget-tile[aria-pressed="true"]:hover .icon { color: #fff; }
.accessibility-widget-tile .icon { width: 28px; height: 28px; color: var(--accessibility-widget-muted); transition: color 0.16s ease, transform 0.2s ease; }
.accessibility-widget-tile:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); transform: scale(1.1); }
.accessibility-widget-tile .icon svg { width: 100%; height: 100%; }
.accessibility-widget-tile .label { font-size: 11px; font-weight: 550; line-height: 1.25; overflow-wrap: break-word; width: 100%; text-align: center; color: inherit; }

/* ── Level indicator bars (centered under each tile) ── */
.accessibility-widget-levels {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin-top: 2px;
}
.accessibility-widget-levels span {
  flex: 0 0 16px;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 14%, transparent);
  transition: background 0.16s ease, transform 0.16s ease;
}
.accessibility-widget-levels span.active {
  background: var(--accessibility-widget-primary);
  transform: scaleY(1.5);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span {
  background: rgba(255,255,255,0.28);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span.active {
  background: #fff;
}

/* ── Reset bar ── */
.accessibility-widget-reset-bar {
  padding: 12px 18px;
  border-top: 1px solid var(--accessibility-widget-border);
  flex-shrink: 0;
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-reset-btn {
  width: 100%;
  height: 38px;
  border-radius: 11px;
  border: 1px solid var(--accessibility-widget-border);
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.16s ease, border-color 0.16s ease, transform 0.16s ease, box-shadow 0.16s ease;
}
.accessibility-widget-reset-btn:hover {
  background: var(--accessibility-widget-surface);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 32%, var(--accessibility-widget-border));
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.07);
}
.accessibility-widget-reset-btn:active { transform: translateY(0); }
.accessibility-widget-reset-btn svg { width: 14px; height: 14px; color: var(--accessibility-widget-muted); }
`
