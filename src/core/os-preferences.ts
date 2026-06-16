/**
 * OS / browser accessibility preference detection.
 *
 * Respecting the user's existing system settings is a core signal that this is
 * a cooperative assistive tool rather than a hostile overlay. We read the
 * relevant media features and derive *conservative* defaults: reduced-motion
 * and increased-contrast map to the matching tools.
 *
 * We deliberately do **not** force a colour scheme onto the host page from
 * `prefers-color-scheme` — the site owns its own theme, and overriding it is
 * exactly the kind of intrusive behaviour overlay critics object to. The
 * preference is still detected and exposed for callers that want it.
 */
import type { AccessibilityWidgetState } from './types'

/** Snapshot of the relevant OS/browser accessibility media features. */
export interface OsPreferences {
  reducedMotion: boolean
  moreContrast: boolean
  dark: boolean
}

/** Safely evaluate a media query, returning false when unsupported (SSR/tests). */
function matchesQuery(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  try {
    return window.matchMedia(query).matches
  } catch {
    return false
  }
}

/** Read the user's current OS/browser accessibility preferences. */
export function readOsPreferences(): OsPreferences {
  return {
    reducedMotion: matchesQuery('(prefers-reduced-motion: reduce)'),
    moreContrast: matchesQuery('(prefers-contrast: more)'),
    dark: matchesQuery('(prefers-color-scheme: dark)'),
  }
}

/**
 * Conservative tool defaults derived from OS preferences. Applied only on a
 * fresh visit (no persisted state) and never overriding an explicit choice:
 * reduced-motion enables Reduce Animations, increased-contrast enables High
 * Contrast. `prefers-color-scheme` is intentionally not mapped to a host effect.
 */
export function osPreferenceDefaults(prefs: OsPreferences): Partial<AccessibilityWidgetState> {
  const defaults: Partial<AccessibilityWidgetState> = {}
  if (prefs.reducedMotion) defaults.offAnimations = 1
  if (prefs.moreContrast) defaults.highContrast = 1
  return defaults
}
