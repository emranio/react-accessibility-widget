/**
 * Shared types and default state for the accessibility widget.
 *
 * This module is the canonical home for the public configuration / state
 * shapes and the {@link DEFAULT_STATE} baseline. It has no runtime dependencies
 * so it can be imported from anywhere in the core without cycles.
 */

/** Panel size preset. */
export type WidgetSize = 'S' | 'XL'
/** Bottom corner the trigger and panel anchor to. */
export type Position = 'bottom-right' | 'bottom-left'
/** Text-alignment value (`'default'` means "no override"). */
export type TextAlignment = 'left' | 'center' | 'right' | 'justify' | 'default'
/** A tool's current level; 0 means off. */
export type AdjustmentLevel = 0 | 1 | 2 | 3 | 4
/** Active tab in the Page Structure dialog. */
export type PageStructureTab = 'headings' | 'landmarks' | 'links'

/** A bundled accessibility profile. */
export type AccessibilityProfile =
  | 'seizure-safe'
  | 'vision-impaired'
  | 'light-sensitivity'
  | 'color-blind'
  | 'dyslexia'
  | 'adhd-friendly'
  | 'cognitive-disability'

/** Supported UI languages (Arabic renders right-to-left). */
export type Lang = 'en' | 'ar' | 'es' | 'fr' | 'de' | 'pt'

/** Trigger button colour preset. */
export type TriggerScheme = 'auto' | 'dark' | 'light'

/** Configuration accepted by the widget constructor and React props. */
export interface AccessibilityWidgetConfig {
  title?: string
  accentColor?: string
  position?: Position
  /** Horizontal distance (px) of the trigger from its anchored edge. Default 20. */
  offsetX?: number
  /** Vertical distance (px) of the trigger from the bottom edge. Default 20. */
  offsetY?: number
  size?: WidgetSize
  theme?: {
    primary?: string
    background?: string
    text?: string
  }
  /**
   * Trigger button colour preset.
   * - 'auto'  — filled with the accent colour, white icon (default)
   * - 'dark'  — black background, white icon
   * - 'light' — white background, dark icon
   */
  triggerScheme?: TriggerScheme
  persistence?: boolean
  lang?: Lang
  onOpen?: () => void
  onClose?: () => void
  onReset?: () => void
}

/** The complete, persisted runtime state of the widget. */
export interface AccessibilityWidgetState {
  profile: AccessibilityProfile | null
  fontSize: AdjustmentLevel
  lineHeight: AdjustmentLevel
  letterSpacing: AdjustmentLevel
  textAlignment: TextAlignment
  legibleFonts: AdjustmentLevel
  highlightTitles: AdjustmentLevel
  highlightLinks: AdjustmentLevel
  textMagnifier: AdjustmentLevel
  readingLens: AdjustmentLevel
  bigCursor: AdjustmentLevel
  readingMask: AdjustmentLevel
  readingGuide: AdjustmentLevel
  darkContrast: AdjustmentLevel
  lightContrast: AdjustmentLevel
  highContrast: AdjustmentLevel
  colorBlind: AdjustmentLevel
  monochrome: AdjustmentLevel
  invertColors: AdjustmentLevel
  hideImages: AdjustmentLevel
  offAnimations: AdjustmentLevel
}

/** A single navigable entry (heading, landmark, or link) in the dialog. */
export interface PageStructureItem {
  id: string
  label: string
  meta: string
  depth?: number
  external?: boolean
}

/** The collected page structure, grouped by tab. */
export interface PageStructureData {
  headings: PageStructureItem[]
  landmarks: PageStructureItem[]
  links: PageStructureItem[]
}

/** The baseline state: no profile and every tool off. */
export const DEFAULT_STATE: AccessibilityWidgetState = {
  profile: null,
  fontSize: 0,
  lineHeight: 0,
  letterSpacing: 0,
  textAlignment: 'default',
  legibleFonts: 0,
  highlightTitles: 0,
  highlightLinks: 0,
  textMagnifier: 0,
  readingLens: 0,
  bigCursor: 0,
  readingMask: 0,
  readingGuide: 0,
  darkContrast: 0,
  lightContrast: 0,
  highContrast: 0,
  colorBlind: 0,
  monochrome: 0,
  invertColors: 0,
  hideImages: 0,
  offAnimations: 0,
}

/** `localStorage` key under which widget state is persisted. */
export const STORAGE_KEY = 'react-accessibility-widget-state'
