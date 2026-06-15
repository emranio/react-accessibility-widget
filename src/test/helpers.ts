import { DEFAULT_STATE, type AccessibilityWidgetState } from '../core/types'

/** A fresh, mutable copy of the default widget state for use in tests. */
export function freshState(): AccessibilityWidgetState {
  return { ...DEFAULT_STATE }
}
