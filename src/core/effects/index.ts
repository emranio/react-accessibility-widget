/**
 * Page effects orchestrator.
 *
 * {@link applyEffects} is the single entry point the widget calls whenever
 * state changes. It reconciles the current state against the host wrapper:
 * toggling the static effect classes, syncing their CSS variables, injecting
 * the dynamic rules, and enabling/disabling the cursor-following reading aids.
 * {@link clearEffects} tears everything back down.
 *
 * This module re-exports the host-wrapper API so consumers can import the whole
 * effects surface from one place.
 */
import type { AccessibilityWidgetState } from '../types'
import { ensureColorBlindFilter, removeColorBlindFilter } from './color-blind'
import { dynamicCss } from './dynamic-css'
import { HOST_WRAPPER_ID, clearHostStyle, ensureHostStyle } from './host'
import { disableMagnifier, enableMagnifier } from './magnifier'
import { disableReadingGuide, enableReadingGuide } from './reading-guide'
import { disableReadingLens, enableReadingLens } from './reading-lens'
import { disableReadingMask, enableReadingMask } from './reading-mask'
import { syncWrapperVars } from './wrapper-vars'

export { HOST_WRAPPER_ID, ensureHostWrapper, unwrapHost } from './host'

/**
 * Map of `accessibility-widget-effect-*` class names to a predicate over the
 * current state. Each entry is toggled on the host wrapper by
 * {@link applyEffects}; the matching CSS lives in the stylesheet.
 */
function effectToggles(state: AccessibilityWidgetState): Array<[string, boolean]> {
  return [
    ['accessibility-widget-effect-legible-fonts', state.legibleFonts > 0],
    ['accessibility-widget-effect-dyslexia', state.profile === 'dyslexia'],
    ['accessibility-widget-effect-highlight-titles', state.highlightTitles > 0],
    ['accessibility-widget-effect-highlight-links', state.highlightLinks > 0],
    ['accessibility-widget-effect-dark-contrast', state.darkContrast > 0],
    ['accessibility-widget-effect-light-contrast', state.lightContrast > 0],
    ['accessibility-widget-effect-high-contrast', state.highContrast > 0],
    ['accessibility-widget-effect-monochrome', state.monochrome > 0],
    ['accessibility-widget-effect-invert', state.invertColors > 0],
    ['accessibility-widget-effect-color-blind', state.colorBlind > 0],
    ['accessibility-widget-effect-hide-images', state.hideImages > 0],
    ['accessibility-widget-effect-off-animations', state.offAnimations > 0],
    ['accessibility-widget-effect-text-magnifier', state.textMagnifier > 0],
    ['accessibility-widget-effect-big-cursor', state.bigCursor > 0],
    ['accessibility-widget-effect-reading-mask-active', state.readingMask > 0],
    ['accessibility-widget-effect-reading-guide-active', state.readingGuide > 0],
  ]
}

/**
 * Reconcile all page effects to match `state`.
 *
 * No-op when there is no document (SSR) or the host wrapper has not been
 * created yet.
 */
export function applyEffects(state: AccessibilityWidgetState): void {
  if (typeof document === 'undefined') return
  const wrapper = document.getElementById(HOST_WRAPPER_ID)
  if (!wrapper) return

  for (const [cls, on] of effectToggles(state)) {
    wrapper.classList.toggle(cls, on)
  }
  syncWrapperVars(wrapper, state)
  if (state.colorBlind > 0) ensureColorBlindFilter()
  ensureHostStyle().textContent = dynamicCss(state)

  // Cursor-following reading aids are managed imperatively (listeners + DOM).
  if (state.textMagnifier > 0) enableMagnifier(state.textMagnifier)
  else disableMagnifier()
  if (state.readingLens > 0) enableReadingLens(state.readingLens)
  else disableReadingLens()
  if (state.readingMask > 0) enableReadingMask(state.readingMask)
  else disableReadingMask()
  if (state.readingGuide > 0) enableReadingGuide(state.readingGuide)
  else disableReadingGuide()
}

/** Remove every applied effect: classes, dynamic CSS, filter, and reading aids. */
export function clearEffects(): void {
  if (typeof document === 'undefined') return
  const wrapper = document.getElementById(HOST_WRAPPER_ID)
  if (wrapper) {
    for (const cls of Array.from(wrapper.classList)) {
      if (cls.startsWith('accessibility-widget-effect-')) wrapper.classList.remove(cls)
    }
  }
  clearHostStyle()
  removeColorBlindFilter()
  disableMagnifier()
  disableReadingLens()
  disableReadingMask()
  disableReadingGuide()
}
