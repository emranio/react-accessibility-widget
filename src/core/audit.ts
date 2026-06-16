/**
 * Accessibility audit (reporter, not a fixer).
 *
 * {@link auditAccessibility} scans the page for a focused set of common,
 * high-confidence barriers and **reports** them. It deliberately does NOT mutate
 * the DOM, inject ARIA, or claim conformance — automated "remediation" overlays
 * that silently patch the page are the anti-pattern this project avoids. The
 * findings are meant to help an owner fix the real issues in their source.
 *
 * It is conservative: only unambiguous problems are reported, so the output
 * stays trustworthy. It is not a substitute for a full audit or testing with
 * assistive technology.
 */

/** Relative severity of a finding. */
export type AuditImpact = 'serious' | 'moderate' | 'minor'

/** A single reported accessibility issue. */
export interface AccessibilityIssue {
  /** Stable rule id, e.g. `image-alt`. */
  rule: string
  impact: AuditImpact
  /** Human-readable description of the problem. */
  message: string
  /** A short locator for the offending element (tag + id/first class). */
  selector?: string
}

/** A short, human-readable locator for an element. */
function describeElement(el: Element): string {
  const tag = el.tagName.toLowerCase()
  const id = el.id ? `#${el.id}` : ''
  const cls =
    typeof el.className === 'string' && el.className.trim()
      ? `.${el.className.trim().split(/\s+/)[0]}`
      : ''
  return `${tag}${id}${cls}`
}

/** Whether an element carries any accessible name (text, aria, title, or image alt). */
function hasAccessibleName(el: Element): boolean {
  if ((el.textContent || '').trim()) return true
  if (el.getAttribute('aria-label')?.trim()) return true
  if (el.getAttribute('aria-labelledby')?.trim()) return true
  if (el.getAttribute('title')?.trim()) return true
  const img = el.querySelector('img[alt]')
  if (img && (img.getAttribute('alt') || '').trim()) return true
  return false
}

/** Escape a value for use in an attribute selector. */
function cssEscape(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(value)
  return value.replace(/["\\]/g, '\\$&')
}

/** Ignore the widget's own UI when auditing the host page. */
function isWidgetOwn(el: Element): boolean {
  return !!el.closest('.accessibility-widget-root')
}

/**
 * Audit a document (or a subtree) for common accessibility barriers and return
 * the findings. Never mutates the DOM. Returns an empty array in non-DOM
 * environments.
 */
export function auditAccessibility(root?: Document | HTMLElement): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = []
  const target = root ?? (typeof document !== 'undefined' ? document : null)
  if (!target) return issues
  const doc = target instanceof Document ? target : target.ownerDocument ?? document

  // Document-level checks (only when auditing a whole document).
  if (target instanceof Document) {
    if (!doc.documentElement.getAttribute('lang')?.trim()) {
      issues.push({ rule: 'html-has-lang', impact: 'serious', message: 'The <html> element has no lang attribute.' })
    }
    if (!doc.title.trim()) {
      issues.push({ rule: 'document-title', impact: 'serious', message: 'The document has no <title>.' })
    }
  }

  // Images missing an alt attribute.
  target.querySelectorAll('img').forEach(img => {
    if (isWidgetOwn(img) || img.closest('[aria-hidden="true"]')) return
    const role = img.getAttribute('role')
    if (role === 'presentation' || role === 'none') return
    if (!img.hasAttribute('alt')) {
      issues.push({ rule: 'image-alt', impact: 'serious', message: 'Image is missing an alt attribute.', selector: describeElement(img) })
    }
  })

  // Form controls without an associated label.
  target.querySelectorAll('input, select, textarea').forEach(ctrl => {
    if (isWidgetOwn(ctrl)) return
    const type = (ctrl.getAttribute('type') || '').toLowerCase()
    if (ctrl.tagName === 'INPUT' && ['hidden', 'submit', 'button', 'reset', 'image'].includes(type)) return
    if (ctrl.getAttribute('aria-label')?.trim() || ctrl.getAttribute('aria-labelledby')?.trim() || ctrl.getAttribute('title')?.trim()) return
    const id = ctrl.getAttribute('id')
    const hasForLabel = id ? !!doc.querySelector(`label[for="${cssEscape(id)}"]`) : false
    if (!hasForLabel && !ctrl.closest('label')) {
      issues.push({ rule: 'label', impact: 'serious', message: 'Form control has no associated label.', selector: describeElement(ctrl) })
    }
  })

  // Links and buttons with no accessible text.
  target.querySelectorAll('a[href], button').forEach(el => {
    if (isWidgetOwn(el) || el.closest('[aria-hidden="true"]')) return
    if (!hasAccessibleName(el)) {
      issues.push({ rule: 'empty-control', impact: 'serious', message: `<${el.tagName.toLowerCase()}> has no accessible text.`, selector: describeElement(el) })
    }
  })

  // Heading levels that skip (e.g. h2 → h4).
  let previousLevel = 0
  target.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    if (isWidgetOwn(heading)) return
    const level = Number(heading.tagName[1])
    if (previousLevel && level > previousLevel + 1) {
      issues.push({ rule: 'heading-order', impact: 'moderate', message: `Heading level skips from h${previousLevel} to h${level}.`, selector: describeElement(heading) })
    }
    previousLevel = level
  })

  return issues
}
