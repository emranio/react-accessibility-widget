/**
 * Page Structure dialog: the floating layer, dialog shell, header, tablist,
 * scrollable item list, badges, and the small-viewport responsive overrides.
 */
export const structure = `
/* ── Page structure dialog ── */
.accessibility-widget-structure-layer {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
}
.accessibility-widget-structure-layer[hidden] { display: none; }
.accessibility-widget-structure-dialog {
  position: fixed;
  top: 24px;
  bottom: 24px;
  left: clamp(16px, 5vw, 80px);
  width: min(920px, calc(100vw - 420px));
  min-width: min(640px, calc(100vw - 32px));
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
  border-radius: 18px;
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-border) 85%, transparent);
  box-shadow: 0 28px 72px rgba(0,0,0,0.26);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}
.accessibility-widget-structure-header {
  min-height: 62px;
  padding: 14px 22px;
  background:
    linear-gradient(135deg,
      var(--accessibility-widget-primary),
      color-mix(in srgb, var(--accessibility-widget-primary) 76%, #000));
  color: var(--accessibility-widget-bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.accessibility-widget-structure-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.accessibility-widget-structure-close {
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s ease, transform 0.12s ease;
}
.accessibility-widget-structure-close:hover {
  background: color-mix(in srgb, currentColor 12%, transparent);
  transform: scale(1.04);
}
.accessibility-widget-structure-close svg {
  width: 20px;
  height: 20px;
}
.accessibility-widget-structure-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-bottom: 1px solid var(--accessibility-widget-border);
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-structure-tab {
  min-height: 50px;
  border: 0;
  border-inline-end: 1px solid var(--accessibility-widget-border);
  background: transparent;
  color: var(--accessibility-widget-muted);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 0.01em;
  position: relative;
  transition: background 0.12s ease, color 0.12s ease, box-shadow 0.12s ease;
}
.accessibility-widget-structure-tab:last-child { border-inline-end: 0; }
.accessibility-widget-structure-tab:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-structure-tab[aria-selected="true"] {
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
  box-shadow: inset 0 -3px 0 var(--accessibility-widget-primary);
}
.accessibility-widget-structure-list {
  flex: 1;
  overflow: auto;
  padding: 16px;
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-structure-item {
  width: 100%;
  min-height: 42px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  margin-inline-start: calc(var(--accessibility-widget-structure-depth, 0) * 22px);
  text-align: left;
  transition: background 0.12s ease, color 0.12s ease;
}
.accessibility-widget-structure-item:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-badge {
  width: 34px;
  height: 26px;
  border-radius: 7px;
  background: var(--accessibility-widget-surface);
  border: 1px solid var(--accessibility-widget-border);
  color: var(--accessibility-widget-primary);
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.accessibility-widget-structure-badge--text {
  background: var(--accessibility-widget-surface);
  font-size: 11px;
  font-weight: 700;
}
.accessibility-widget-structure-badge svg {
  width: 16px;
  height: 16px;
}
.accessibility-widget-structure-item-label {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 15px;
  line-height: 1.25;
}
.accessibility-widget-structure-external {
  flex: 0 0 auto;
  display: inline-flex;
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-external svg {
  width: 14px;
  height: 14px;
}
.accessibility-widget-structure-empty {
  padding: 28px 12px;
  color: var(--accessibility-widget-muted);
  font-size: 13px;
}

/* ── Page structure dialog — small viewports ── */
@media (max-width: 900px) {
  .accessibility-widget-structure-dialog {
    inset: 12px;
    width: auto;
    min-width: 0;
  }
  .accessibility-widget-structure-header {
    min-height: 64px;
    padding: 14px 18px;
  }
  .accessibility-widget-structure-tab {
    min-height: 46px;
    font-size: 13px;
  }
  .accessibility-widget-structure-list {
    padding: 12px;
  }
  .accessibility-widget-structure-item {
    margin-inline-start: calc(var(--accessibility-widget-structure-depth, 0) * 12px);
  }
  .accessibility-widget-structure-item-label {
    font-size: 14px;
  }
}
`
