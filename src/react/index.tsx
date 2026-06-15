/**
 * React entry point and published package surface.
 *
 * Exposes the declarative {@link AccessibilityWidget} component, the imperative
 * {@link useAccessibilityWidget} hook, and the public config/state types.
 */
export {
  AccessibilityWidget,
  ReactAccessibilityWidget,
  type AccessibilityWidgetProps,
  type ReactAccessibilityWidgetProps,
} from './widget'
export { useAccessibilityWidget } from './use-accessibility-widget'

export type {
  AccessibilityWidgetConfig,
  AccessibilityWidgetState,
} from '../core'
