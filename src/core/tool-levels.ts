/**
 * Per-tool level configuration.
 *
 * Every level-based tool has a maximum level: tools with a max of 1 behave as
 * on/off toggles, while higher maximums cycle 0 → 1 → … → max → 0. This single
 * source of truth drives cycling in the widget, validation of profile presets,
 * and the level indicators in the renderer.
 */
import type { AccessibilityWidgetState } from './types'

/** Maximum level for each level-based tool, keyed by its state field. */
export const TOOL_MAX_LEVELS = {
  legibleFonts: 2,
  highlightTitles: 2,
  fontSize: 4,
  textMagnifier: 1,
  highlightLinks: 2,
  readingLens: 1,
  bigCursor: 3,
  readingMask: 3,
  readingGuide: 1,
  readAloud: 1,
  dictionary: 1,
  simplify: 1,
  virtualKeyboard: 1,
  focusHighlight: 1,
  lineHeight: 3,
  letterSpacing: 3,
  darkContrast: 3,
  lightContrast: 3,
  highContrast: 3,
  monochrome: 1,
  invertColors: 1,
  colorBlind: 1,
  hideImages: 1,
  offAnimations: 1,
} as const satisfies Readonly<Partial<Record<keyof AccessibilityWidgetState, 1 | 2 | 3 | 4>>>

/** Union of the state fields that are level-based tools. */
export type LevelToolKey = keyof typeof TOOL_MAX_LEVELS

/** All level-based tool keys, derived from {@link TOOL_MAX_LEVELS}. */
export const LEVEL_TOOLS = Object.keys(TOOL_MAX_LEVELS) as LevelToolKey[]

/**
 * Number of text-alignment options (left / center / right / justify). Alignment
 * is cycled separately from the numeric tools since its state is a string.
 */
export const TEXT_ALIGNMENT_MAX_LEVEL = 4
