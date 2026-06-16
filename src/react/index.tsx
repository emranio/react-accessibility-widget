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
export { AccessibilityStatement, type AccessibilityStatementProps } from './accessibility-statement'
export { generateAccessibilityStatement } from '../core'

export type {
  AccessibilityWidgetConfig,
  AccessibilityWidgetState,
  AccessibilityProfile,
  ToolKey,
  AccessibilityStatementOptions,
  GeneratedAccessibilityStatement,
  ComplianceStandard,
  ConformanceStatus,
  WcagLevel,
  WcagVersion,
} from '../core'
