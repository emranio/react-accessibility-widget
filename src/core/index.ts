/**
 * Public entry point for the framework-agnostic core.
 *
 * Re-exports the widget class and its public types. Framework bindings (e.g.
 * `src/react`) and consumers should import from here rather than reaching into
 * individual modules.
 */
export { AccessibilityWidget } from './widget'

export { auditAccessibility, type AccessibilityIssue, type AuditImpact } from './audit'

export {
  generateAccessibilityStatement,
  type AccessibilityStatementOptions,
  type GeneratedAccessibilityStatement,
  type ComplianceStandard,
  type ConformanceStatus,
  type WcagLevel,
  type WcagVersion,
} from './statement'

export type {
  AccessibilityProfile,
  AccessibilityWidgetConfig,
  AccessibilityWidgetState,
  PageStructureData,
  PageStructureItem,
  KeyboardShortcut,
  PageStructureTab,
  Position,
  TextAlignment,
  ToolKey,
  WidgetEvent,
  WidgetSize,
} from './types'
