/**
 * Accessibility statement generator — public surface.
 *
 * Re-exports the pure {@link generateAccessibilityStatement} function and its
 * types so consumers import from `core/statement` rather than the
 * implementation module.
 */
export {
  generateAccessibilityStatement,
  type AccessibilityStatementOptions,
  type GeneratedAccessibilityStatement,
  type ComplianceStandard,
  type ConformanceStatus,
  type WcagLevel,
  type WcagVersion,
} from './generate'
