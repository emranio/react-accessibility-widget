/**
 * Colour-scheme theming.
 *
 * The widget's scheme is driven by the `data-scheme` attribute on the root.
 * The explicit light override wins over OS preference; the dark block both
 * remaps the token variables and patches the handful of components that need
 * scheme-specific treatment.
 */
export const theme = `
/* ── Dark mode ── */
/* Explicit light override — wins over OS preference and data-scheme="dark" */
.accessibility-widget-root[data-scheme="light"] {
  --accessibility-widget-primary: #0c0c0c;
  --accessibility-widget-primary-dark: #18181b;
  --accessibility-widget-bg: #ffffff;
  --accessibility-widget-text: #0c0c0c;
  --accessibility-widget-border: #e4e4e7;
  --accessibility-widget-muted: #71717a;
  --accessibility-widget-surface: #f4f4f5;
}
.accessibility-widget-root[data-scheme="dark"] {
  --accessibility-widget-primary: #fafafa;
  --accessibility-widget-primary-dark: #e4e4e7;
  --accessibility-widget-bg: #0c0c0c;
  --accessibility-widget-text: #fafafa;
  --accessibility-widget-border: #27272a;
  --accessibility-widget-muted: #71717a;
  --accessibility-widget-surface: #18181b;
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-header {
  background: var(--accessibility-widget-header-bg, #18181b);
  border-bottom-color: rgba(255,255,255,0.06);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-trigger {
  background: var(--accessibility-widget-trigger-bg, #fafafa);
  color: var(--accessibility-widget-trigger-icon, #0c0c0c);
  border-color: rgba(0,0,0,0.12);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-reset-bar { background: #0c0c0c; }
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-magnify-cursor {
  background: #18181b;
  border-color: #27272a;
  color: #fafafa;
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-card[aria-pressed="true"],
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-tile[aria-pressed="true"] {
  background: linear-gradient(140deg, var(--accessibility-widget-primary), color-mix(in srgb, var(--accessibility-widget-primary) 84%, #000));
  color: #0c0c0c;
  border-color: transparent;
  box-shadow: 0 8px 22px rgba(0,0,0,0.5);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-card[aria-pressed="true"] .icon,
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-tile[aria-pressed="true"] .icon { color: rgba(0,0,0,0.78); }
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-card[aria-pressed="true"]:hover,
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-tile[aria-pressed="true"]:hover {
  background: linear-gradient(140deg, var(--accessibility-widget-primary), color-mix(in srgb, var(--accessibility-widget-primary) 84%, #000));
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span {
  background: rgba(12,12,12,0.3);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span.active {
  background: #0c0c0c;
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-size-switch-track {
  background: var(--accessibility-widget-surface);
  box-shadow: inset 0 0 0 1px var(--accessibility-widget-border);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-structure-dialog {
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
  border-color: var(--accessibility-widget-border);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-structure-header {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-structure-tabs {
  background: var(--accessibility-widget-bg);
  border-bottom-color: var(--accessibility-widget-border);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-structure-tab {
  border-inline-end-color: var(--accessibility-widget-border);
  color: var(--accessibility-widget-muted);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-structure-tab[aria-selected="true"] {
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-structure-item {
  color: var(--accessibility-widget-text);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-structure-item:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-root[data-scheme="dark"] .accessibility-widget-structure-external {
  color: var(--accessibility-widget-primary);
}
`
