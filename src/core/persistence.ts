/**
 * State persistence and normalisation.
 *
 * Widget state is optionally mirrored to `localStorage` so user choices survive
 * reloads. Because stored data is untrusted (it may be stale, hand-edited, or
 * from an older version), it is always run through {@link normalizeState} before
 * use — unknown keys are dropped and values are clamped to valid ranges.
 */
import { LEVEL_TOOLS, TOOL_MAX_LEVELS } from './tool-levels'
import { DEFAULT_STATE, STORAGE_KEY, type AccessibilityWidgetState, type AdjustmentLevel } from './types'

/** The set of valid profile ids, used when validating persisted state. */
const PROFILES: ReadonlySet<string> = new Set<string>([
  'seizure-safe',
  'vision-impaired',
  'light-sensitivity',
  'color-blind',
  'dyslexia',
  'adhd-friendly',
  'cognitive-disability',
  'keyboard-motor',
  'blind-screen-reader',
])

/** The valid text-alignment values, used when validating persisted state. */
const ALIGNMENTS: ReadonlySet<string> = new Set<string>([
  'left',
  'center',
  'right',
  'justify',
])

/**
 * Coerce an unknown stored value into a valid {@link AdjustmentLevel}.
 *
 * Booleans map to on/off (legacy format), nullish/invalid values to 0, and
 * numbers are rounded and clamped into `[1, maxLevel]` (or 0 when ≤ 0).
 */
function normalizeLevel(value: unknown, maxLevel: number): AdjustmentLevel {
  if (value === true) return 1
  if (value === false || value == null) return 0
  if (typeof value === 'number' && Number.isFinite(value)) {
    if (value <= 0) return 0
    return Math.min(maxLevel, Math.max(1, Math.round(value))) as AdjustmentLevel
  }
  return 0
}

/**
 * Build a fully valid state from arbitrary parsed input, falling back to
 * {@link DEFAULT_STATE} for anything missing or invalid.
 */
export function normalizeState(raw: unknown): AccessibilityWidgetState {
  const source = (raw && typeof raw === 'object') ? raw as Record<string, unknown> : {}
  const state: AccessibilityWidgetState = { ...DEFAULT_STATE }

  if (typeof source.profile === 'string' && PROFILES.has(source.profile)) {
    state.profile = source.profile as AccessibilityWidgetState['profile']
  }

  for (const key of LEVEL_TOOLS) {
    state[key] = normalizeLevel(source[key], TOOL_MAX_LEVELS[key])
  }

  if (typeof source.textAlignment === 'string' && ALIGNMENTS.has(source.textAlignment)) {
    state.textAlignment = source.textAlignment as AccessibilityWidgetState['textAlignment']
  }

  return state
}

/**
 * Load persisted state from `localStorage`, or a fresh default state when
 * persistence is disabled, storage is unavailable, or parsing fails.
 */
export function loadState(persistence: boolean): AccessibilityWidgetState {
  if (!persistence) return { ...DEFAULT_STATE }
  if (typeof localStorage === 'undefined') return { ...DEFAULT_STATE }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return normalizeState(JSON.parse(stored))
  } catch {
    // Corrupt or inaccessible storage — fall back to defaults.
  }
  return { ...DEFAULT_STATE }
}

/** Whether persisted widget state currently exists in `localStorage`. */
export function hasPersistedState(persistence: boolean): boolean {
  if (!persistence) return false
  if (typeof localStorage === 'undefined') return false
  try {
    return localStorage.getItem(STORAGE_KEY) != null
  } catch {
    return false
  }
}

/** Persist state to `localStorage`, silently ignoring storage failures. */
export function saveState(persistence: boolean, state: AccessibilityWidgetState): void {
  if (!persistence) return
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Quota exceeded or storage disabled — persistence is best-effort.
  }
}
