/**
 * React renderer for the accessibility statement.
 *
 * A thin presentational wrapper over {@link generateAccessibilityStatement}: it
 * builds the HTML fragment from the given options and renders it inside a
 * container. The generated markup is fully escaped by the generator, so the use
 * of `dangerouslySetInnerHTML` here is safe.
 *
 * The interactive form for collecting these options lives in the configurator;
 * this component is the render/embed surface (e.g. for an `/accessibility`
 * route).
 */
import {
  generateAccessibilityStatement,
  type AccessibilityStatementOptions,
} from '../core'

/** Props for {@link AccessibilityStatement} — the generator options plus a className. */
export interface AccessibilityStatementProps extends AccessibilityStatementOptions {
  /** Optional class applied to the wrapping element. */
  className?: string
}

/** Render an accessibility statement from the given organisation details. */
export function AccessibilityStatement({ className, ...options }: AccessibilityStatementProps) {
  const { html } = generateAccessibilityStatement(options)
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
