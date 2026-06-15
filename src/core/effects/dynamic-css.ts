import type { AccessibilityWidgetState } from '../types'
import { HOST_WRAPPER_ID } from './host'
import { FONT_STEP, LH_STEP, LS_STEP, bigCursorValue } from './presets'

/**
 * Build the dynamic, per-state CSS that cannot be expressed with static rules
 * plus toggled classes alone (because the numeric values depend on the current
 * adjustment levels).
 *
 * The rules are scoped to the host wrapper so they never leak into the widget
 * UI, and use `!important` to override host-page styles. Font size is applied
 * to the wrapper itself so normal inheritance scales descendants without
 * compounding on nested elements.
 */
export function dynamicCss(state: AccessibilityWidgetState): string {
  const rules: string[] = []
  const scope = `#${HOST_WRAPPER_ID}`

  if (state.fontSize !== 0) {
    const pct = 100 + state.fontSize * FONT_STEP * 100
    // Set on wrapper so inheritance does the work — avoids compounding on nested elements
    rules.push(`${scope} { font-size: ${pct}% !important; }`)
  }
  if (state.lineHeight !== 0) {
    const lh = 1.5 + state.lineHeight * LH_STEP
    rules.push(`${scope} * { line-height: ${lh} !important; }`)
  }
  if (state.letterSpacing !== 0) {
    const ls = state.letterSpacing * LS_STEP
    rules.push(`${scope} * { letter-spacing: ${ls}em !important; }`)
  }
  if (state.textAlignment !== 'default') {
    rules.push(`${scope} * { text-align: ${state.textAlignment} !important; }`)
  }
  if (state.bigCursor !== 0) {
    const cursor = bigCursorValue(state.bigCursor)
    rules.push(`html, body, ${scope}, ${scope} *, .accessibility-widget-root, .accessibility-widget-root * { cursor: ${cursor} !important; }`)
  }
  return rules.join('\n')
}
