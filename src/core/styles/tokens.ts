/**
 * Design tokens: the themeable CSS custom properties and the base root rule.
 *
 * {@link StyleVars} are baked into the stylesheet once at injection time;
 * per-instance overrides (accent colour, scheme, …) are applied later as inline
 * styles on the widget root. Light/dark scheme variable overrides live in
 * `theme.ts`.
 */

/** The set of colour tokens that parameterise the widget's appearance. */
export interface StyleVars {
  primary: string
  primaryDark: string
  background: string
  text: string
  border: string
  muted: string
  surface: string
}

/** Default light-theme token values. */
export const DEFAULT_VARS: StyleVars = {
  primary: '#0c0c0c',
  primaryDark: '#18181b',
  background: '#ffffff',
  text: '#0c0c0c',
  border: '#e4e4e7',
  muted: '#71717a',
  surface: '#f4f4f5',
}

/** The `.accessibility-widget-root` rule that declares the token variables. */
export const tokens = (vars: StyleVars): string => `
.accessibility-widget-root {
  --accessibility-widget-primary: ${vars.primary};
  --accessibility-widget-primary-dark: ${vars.primaryDark};
  --accessibility-widget-bg: ${vars.background};
  --accessibility-widget-text: ${vars.text};
  --accessibility-widget-border: ${vars.border};
  --accessibility-widget-muted: ${vars.muted};
  --accessibility-widget-surface: ${vars.surface};
  --accessibility-widget-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--accessibility-widget-text);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}
.accessibility-widget-root *, .accessibility-widget-root *::before, .accessibility-widget-root *::after {
  box-sizing: border-box;
}
`
