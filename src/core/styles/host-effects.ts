/**
 * Host-page effect rules.
 *
 * These rules are scoped to `#accessibility-widget-host` and activated by the
 * `accessibility-widget-effect-*` classes that {@link applyEffects} toggles.
 * Their per-level values come from the CSS variables synced by
 * `effects/wrapper-vars.ts`. `!important` is used throughout to win over
 * arbitrary host-page styles.
 */
export const hostEffects = `
/* ── Applied host effects ── */
#accessibility-widget-host.accessibility-widget-effect-legible-fonts, #accessibility-widget-host.accessibility-widget-effect-legible-fonts * {
  font-family: var(--accessibility-widget-legible-font-family), Tahoma, Verdana, Arial, sans-serif !important;
  letter-spacing: var(--accessibility-widget-legible-letter-spacing, 0em) !important;
  word-spacing: var(--accessibility-widget-legible-word-spacing, 0em) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dyslexia, #accessibility-widget-host.accessibility-widget-effect-dyslexia * {
  font-family: "Accessibility Widget OpenDyslexic", Tahoma, Verdana, Arial, sans-serif !important;
  letter-spacing: 0.04em !important;
  word-spacing: 0.03em !important;
}
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h1,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h2,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h3,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h4,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h5,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h6 {
  outline: var(--accessibility-widget-title-outline-width, 2px) solid #f59e0b !important;
  outline-offset: 2px !important;
  background: rgba(245,158,11,var(--accessibility-widget-title-highlight-alpha, 0.07)) !important;
}
#accessibility-widget-host.accessibility-widget-effect-highlight-links a {
  outline: var(--accessibility-widget-link-outline-width, 2px) solid #3b82f6 !important;
  outline-offset: 2px !important;
  background: rgba(59,130,246,var(--accessibility-widget-link-highlight-alpha, 0.07)) !important;
  text-decoration: underline !important;
  text-decoration-thickness: var(--accessibility-widget-link-underline-width, 1px) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dark-contrast {
  background: var(--accessibility-widget-dark-contrast-bg, #000) !important;
  color: var(--accessibility-widget-dark-contrast-text, #fff) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dark-contrast * {
  background-color: transparent !important;
  color: var(--accessibility-widget-dark-contrast-text, #fff) !important;
  border-color: var(--accessibility-widget-dark-contrast-border, #333) !important;
}
#accessibility-widget-host.accessibility-widget-effect-light-contrast {
  background: var(--accessibility-widget-light-contrast-bg, #fff) !important;
  color: var(--accessibility-widget-light-contrast-text, #000) !important;
}
#accessibility-widget-host.accessibility-widget-effect-light-contrast * {
  background-color: transparent !important;
  color: var(--accessibility-widget-light-contrast-text, #000) !important;
  border-color: var(--accessibility-widget-light-contrast-border, #475569) !important;
}
#accessibility-widget-host.accessibility-widget-effect-high-contrast {
  background: var(--accessibility-widget-high-contrast-bg, #000) !important;
  color: var(--accessibility-widget-high-contrast-text, #ff0) !important;
}
#accessibility-widget-host.accessibility-widget-effect-high-contrast * {
  background-color: var(--accessibility-widget-high-contrast-bg, #000) !important;
  color: var(--accessibility-widget-high-contrast-text, #ff0) !important;
  border-color: var(--accessibility-widget-high-contrast-border, #ff0) !important;
}
#accessibility-widget-host.accessibility-widget-effect-monochrome { filter: grayscale(var(--accessibility-widget-monochrome-amount, 100%)) !important; }
#accessibility-widget-host.accessibility-widget-effect-invert { filter: invert(var(--accessibility-widget-invert-amount, 100%)) hue-rotate(180deg) !important; }
#accessibility-widget-host.accessibility-widget-effect-color-blind {
  filter:
    url('#accessibility-widget-protanopia')
    saturate(var(--accessibility-widget-color-blind-saturate, 0.85))
    contrast(var(--accessibility-widget-color-blind-contrast, 1)) !important;
}
#accessibility-widget-host.accessibility-widget-effect-hide-images img,
#accessibility-widget-host.accessibility-widget-effect-hide-images picture {
  visibility: hidden !important;
}
#accessibility-widget-host.accessibility-widget-effect-off-animations,
#accessibility-widget-host.accessibility-widget-effect-off-animations *,
#accessibility-widget-host.accessibility-widget-effect-off-animations *::before,
#accessibility-widget-host.accessibility-widget-effect-off-animations *::after {
  animation-delay: 0s !important;
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  scroll-behavior: auto !important;
  transition-delay: 0s !important;
  transition-duration: 0.001ms !important;
}
#accessibility-widget-host.accessibility-widget-effect-focus-highlight :focus,
#accessibility-widget-host.accessibility-widget-effect-focus-highlight :focus-visible {
  outline: 3px solid #1d4ed8 !important;
  outline-offset: 2px !important;
}
`
