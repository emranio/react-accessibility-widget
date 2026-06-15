import type { AccessibilityWidgetState } from '../types'
import { setCssVar } from '../utils/css'
import {
  DARK_CONTRAST_PRESETS,
  HIGH_CONTRAST_PRESETS,
  LIGHT_CONTRAST_PRESETS,
  legibleFontFamily,
} from './presets'

/**
 * Sync the CSS custom properties that parameterise the static, class-driven
 * host effects (declared in the stylesheet) to the current state.
 *
 * The stylesheet toggles behaviour via `accessibility-widget-effect-*` classes;
 * this function feeds those rules their per-level values (contrast colours,
 * highlight strengths, filter amounts, …). Passing `null` removes a variable so
 * the rule falls back to its declared default.
 */
export function syncWrapperVars(wrapper: HTMLElement, state: AccessibilityWidgetState): void {
  // Legible fonts: family plus subtle word/letter spacing per level.
  setCssVar(wrapper, '--accessibility-widget-legible-font-family', legibleFontFamily(state.legibleFonts))
  setCssVar(wrapper, '--accessibility-widget-legible-word-spacing', state.legibleFonts > 0 ? `${state.legibleFonts === 1 ? 0.03 : 0.015}em` : null)
  setCssVar(wrapper, '--accessibility-widget-legible-letter-spacing', state.legibleFonts > 0 ? `${state.legibleFonts === 1 ? 0.02 : 0.005}em` : null)

  // Highlight titles / links: outline width and background highlight alpha.
  setCssVar(wrapper, '--accessibility-widget-title-outline-width', state.highlightTitles > 0 ? `${state.highlightTitles}px` : null)
  setCssVar(wrapper, '--accessibility-widget-title-highlight-alpha', state.highlightTitles > 0 ? `${0.04 + state.highlightTitles * 0.03}` : null)
  setCssVar(wrapper, '--accessibility-widget-link-outline-width', state.highlightLinks > 0 ? `${state.highlightLinks}px` : null)
  setCssVar(wrapper, '--accessibility-widget-link-highlight-alpha', state.highlightLinks > 0 ? `${0.04 + state.highlightLinks * 0.03}` : null)
  setCssVar(wrapper, '--accessibility-widget-link-underline-width', state.highlightLinks > 0 ? `${state.highlightLinks}px` : null)

  // Contrast modes: background / text / border colours from the preset tables.
  const dark = state.darkContrast > 0 ? DARK_CONTRAST_PRESETS[state.darkContrast - 1] : null
  setCssVar(wrapper, '--accessibility-widget-dark-contrast-bg', dark?.bg ?? null)
  setCssVar(wrapper, '--accessibility-widget-dark-contrast-text', dark?.text ?? null)
  setCssVar(wrapper, '--accessibility-widget-dark-contrast-border', dark?.border ?? null)

  const light = state.lightContrast > 0 ? LIGHT_CONTRAST_PRESETS[state.lightContrast - 1] : null
  setCssVar(wrapper, '--accessibility-widget-light-contrast-bg', light?.bg ?? null)
  setCssVar(wrapper, '--accessibility-widget-light-contrast-text', light?.text ?? null)
  setCssVar(wrapper, '--accessibility-widget-light-contrast-border', light?.border ?? null)

  const high = state.highContrast > 0 ? HIGH_CONTRAST_PRESETS[state.highContrast - 1] : null
  setCssVar(wrapper, '--accessibility-widget-high-contrast-bg', high?.bg ?? null)
  setCssVar(wrapper, '--accessibility-widget-high-contrast-text', high?.text ?? null)
  setCssVar(wrapper, '--accessibility-widget-high-contrast-border', high?.border ?? null)

  // Colour filters: grayscale / invert amounts and colour-blind tuning.
  setCssVar(wrapper, '--accessibility-widget-monochrome-amount', state.monochrome > 0 ? '100%' : null)
  setCssVar(wrapper, '--accessibility-widget-invert-amount', state.invertColors > 0 ? '100%' : null)
  setCssVar(wrapper, '--accessibility-widget-color-blind-saturate', state.colorBlind > 0 ? `${1 - state.colorBlind * 0.1}` : null)
  setCssVar(wrapper, '--accessibility-widget-color-blind-contrast', state.colorBlind > 0 ? `${1 + state.colorBlind * 0.05}` : null)
}
