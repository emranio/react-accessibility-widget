/**
 * Accessibility profile presets.
 *
 * Each profile is a curated bundle of tool levels applied together when the
 * user selects it. Presets are validated at module load so an out-of-range
 * level fails fast during development rather than silently misbehaving.
 */
import { LEVEL_TOOLS, TOOL_MAX_LEVELS } from './tool-levels'
import type { AccessibilityProfile, AccessibilityWidgetState } from './types'

/** A partial state override — everything a profile may set except `profile`. */
type ProfilePreset = Readonly<Partial<Omit<AccessibilityWidgetState, 'profile'>>>

/**
 * Identity helper that validates a preset's level-based fields against their
 * configured maximums, throwing on any out-of-range value.
 */
function defineProfilePreset(preset: ProfilePreset): ProfilePreset {
  for (const key of LEVEL_TOOLS) {
    const value = preset[key]
    if (typeof value !== 'number') continue
    const maxLevel = TOOL_MAX_LEVELS[key]
    if (value < 0 || value > maxLevel) {
      throw new Error(`Invalid profile preset: ${key} level ${value} exceeds max ${maxLevel}`)
    }
  }
  return preset
}

/**
 * Tool-level bundles keyed by profile id.
 *
 * Each preset maps to a recognised disabled-user population and the WCAG 2.1/2.2
 * success criteria the tools help address. Invariant: a preset sets **at most
 * one** of the mutually-exclusive colour tools (`darkContrast`, `lightContrast`,
 * `highContrast`, `monochrome`, `invertColors`); `colorBlind` may stack on top.
 */
export const PROFILE_PRESETS: Record<AccessibilityProfile, ProfilePreset> = {
  // Photosensitive epilepsy — WCAG 2.3.1, 2.3.3. Signature: remove the triggers.
  // Stop animation, hide animated/flashing imagery, and desaturate to kill
  // saturated-colour flash energy. Nothing else — this profile is about removal.
  'seizure-safe': defineProfilePreset({
    offAnimations: 1,
    hideImages: 1,
    monochrome: 1,
  }),
  // Low vision — WCAG 1.4.3, 1.4.4, 1.4.8. Signature: magnify. Maximum text
  // size with yellow-on-black high contrast and a large cursor so fine print
  // and the pointer stay findable; a little extra line-height for comfort.
  'vision-impaired': defineProfilePreset({
    fontSize: 4,
    lineHeight: 1,
    highContrast: 2,
    bigCursor: 2,
  }),
  // Migraine / photophobia — WCAG 1.4.8, 2.3.3. Signature: lower the light.
  // A low-glare near-black scheme cuts luminance and motion is stopped; left
  // deliberately minimal so the page stays otherwise untouched.
  'light-sensitivity': defineProfilePreset({
    darkContrast: 2,
    offAnimations: 1,
  }),
  // Colour vision deficiency — WCAG 1.4.1, 1.4.11. Signature: fix the colour.
  // The correction filter improves hue separation and links are conveyed by
  // underline/outline so meaning never rests on colour alone.
  'color-blind': defineProfilePreset({
    colorBlind: 1,
    highlightLinks: 2,
  }),
  // Dyslexia — WCAG 1.4.8, 1.4.12. Signature: the reading font. OpenDyslexic
  // with loosened letter-spacing and line-height reduces crowding, and left
  // alignment removes the uneven gaps of justified text.
  'dyslexia': defineProfilePreset({
    legibleFonts: 1,
    lineHeight: 2,
    letterSpacing: 2,
    textAlignment: 'left',
  }),
  // ADHD / attention regulation — WCAG 2.3.3. Signature: narrow the focus.
  // A reading mask spotlights one band at a time, motion is stopped to cut the
  // biggest distraction driver, and links get a light highlight as anchors.
  'adhd-friendly': defineProfilePreset({
    readingMask: 2,
    offAnimations: 1,
    highlightLinks: 1,
  }),
  // Cognitive / learning difficulties — WCAG 1.4.8, 1.4.1. Signature: clarity
  // and structure. Atkinson Hyperlegible maximises character distinction, a
  // gentle size bump aids reading, and strong title/link highlighting makes
  // page structure unambiguous.
  'cognitive-disability': defineProfilePreset({
    legibleFonts: 2,
    fontSize: 1,
    lineHeight: 1,
    highlightTitles: 2,
    highlightLinks: 2,
  }),
  // Keyboard / motor — WCAG 2.1.1, 2.4.7. Signature: make focus and targets
  // obvious. Strong focus outlines, a larger cursor, and highlighted links aid
  // keyboard-only and motor-impaired navigation. An aid, not a replacement for
  // a genuinely keyboard-operable site.
  'keyboard-motor': defineProfilePreset({
    focusHighlight: 1,
    bigCursor: 2,
    highlightLinks: 2,
  }),
  // Blind / screen-reader — WCAG 1.1.1, 1.3.1. Signature: hear and parse the
  // page. Click-to-read text-to-speech plus clearer headings, links, and a
  // legible font; pairs with the page-structure navigator.
  'blind-screen-reader': defineProfilePreset({
    readAloud: 1,
    highlightTitles: 2,
    highlightLinks: 2,
    legibleFonts: 2,
  }),
}
