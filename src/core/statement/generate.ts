/**
 * Accessibility statement generator.
 *
 * Produces a standards-aligned accessibility statement in three formats (HTML
 * fragment, full HTML document, Markdown, and plain text) from a small set of
 * organisation details. The wording follows the structure of the W3C
 * accessibility statement template and is deliberately *honest*: the default
 * conformance status is "partially conformant", the language never claims a
 * site is "fully compliant" or "100% compliant", and any mention of the
 * accessibility toolbar frames it as an optional enhancement rather than a
 * compliance guarantee.
 *
 * The generator is pure and framework-agnostic so it can be used from the core,
 * the React bindings, the standalone build, or the configurator.
 */
import { escapeHtml } from '../utils/html'

/** WCAG version a statement can target. */
export type WcagVersion = '2.0' | '2.1' | '2.2'
/** WCAG conformance level a statement can target. */
export type WcagLevel = 'A' | 'AA' | 'AAA'
/** How conformant the site claims to be. Defaults to `partially`. */
export type ConformanceStatus = 'fully' | 'partially' | 'none'
/** Legal/standards frameworks the statement can reference. */
export type ComplianceStandard = 'ADA' | 'Section 508' | 'AODA' | 'EN 301 549' | 'EAA'

/** Inputs accepted by {@link generateAccessibilityStatement}. */
export interface AccessibilityStatementOptions {
  /** Organisation name (required in spirit; falls back to a neutral phrase). */
  organizationName: string
  /** Human name of the site, e.g. "Acme Store". Falls back to the URL/org. */
  websiteName?: string
  /** Canonical site URL. */
  websiteUrl?: string
  /** Contact email for accessibility feedback. */
  email?: string
  /** Contact phone for accessibility feedback. */
  phone?: string
  /** URL of a contact/feedback page. */
  contactUrl?: string
  /** Postal address for accessibility feedback. */
  postalAddress?: string
  /** Targeted WCAG version. Default `'2.1'`. */
  wcagVersion?: WcagVersion
  /** Targeted WCAG level. Default `'AA'`. */
  wcagLevel?: WcagLevel
  /** Conformance status. Default `'partially'` (the honest default). */
  conformanceStatus?: ConformanceStatus
  /** Legal frameworks to reference, with accurate WCAG mappings. */
  standards?: ComplianceStandard[]
  /** Measures the organisation takes to support accessibility. */
  measuresTaken?: string[]
  /** Known accessibility limitations the organisation is working to fix. */
  knownLimitations?: string[]
  /** Display name of the accessibility toolbar. Default `'an accessibility toolbar'`. */
  widgetName?: string
  /** Whether to include the honest "tools on this site" note. Default `true`. */
  mentionWidget?: boolean
  /** Review date as a display string. Defaults to today's date. */
  date?: string
}

/** The generated statement in every supported format. */
export interface GeneratedAccessibilityStatement {
  /** Document title, e.g. "Accessibility Statement for Acme". */
  title: string
  /** Accessible HTML fragment (a `<section>` with headings and lists). */
  html: string
  /** Standalone, valid HTML document wrapping the fragment. */
  htmlDocument: string
  /** Markdown rendering. */
  markdown: string
  /** Plain-text rendering. */
  text: string
}

/** A single contact line (email, phone, …). */
interface ContactItem {
  label: string
  value: string
  href?: string
}

/** Internal block model rendered to each output format. */
type Block =
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'contact'; items: ContactItem[] }

/** Accurate, non-overclaiming descriptions of each referenced framework. */
const STANDARD_TEXT: Record<ComplianceStandard, string> = {
  ADA: 'the Americans with Disabilities Act (ADA), for which WCAG is the benchmark commonly applied by U.S. courts',
  'Section 508': 'Section 508 of the U.S. Rehabilitation Act, which incorporates WCAG 2.0 Level AA',
  AODA: 'the Accessibility for Ontarians with Disabilities Act (AODA), whose web requirements are based on WCAG 2.0 Level AA',
  'EN 301 549': 'the European standard EN 301 549, which references WCAG 2.1 Level AA',
  EAA: 'the European Accessibility Act (EAA), which relies on EN 301 549 (WCAG 2.1 Level AA)',
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Today's date formatted as "June 16, 2026". */
function today(): string {
  const d = new Date()
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

/** Capitalise the first character of a string. */
function capitalize(value: string): string {
  return value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value
}

/** Join a list into prose: "a", "a and b", or "a, b, and c". */
function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

/** The conformance-status sentence, using W3C phrasing (never "compliant"). */
function conformanceSentence(site: string, target: string, status: ConformanceStatus): string {
  const subject = capitalize(site)
  if (status === 'fully') {
    return `${subject} is fully conformant with ${target}. Fully conformant means that the content fully conforms to the accessibility standard without any exceptions.`
  }
  if (status === 'none') {
    return `${subject} is not yet conformant with ${target}. Not conformant means that the content does not yet conform to the accessibility standard, and we are actively working toward conformance.`
  }
  return `${subject} is partially conformant with ${target}. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.`
}

/** Build the ordered block model from the options. */
function buildBlocks(options: AccessibilityStatementOptions): { title: string; blocks: Block[] } {
  const org = options.organizationName?.trim() || 'our organization'
  const site = options.websiteName?.trim() || options.websiteUrl?.trim() || `the ${org} website`
  const version = options.wcagVersion ?? '2.1'
  const level = options.wcagLevel ?? 'AA'
  const status = options.conformanceStatus ?? 'partially'
  const widgetName = options.widgetName?.trim() || 'an accessibility toolbar'
  const mentionWidget = options.mentionWidget ?? true
  const date = options.date?.trim() || today()
  const target = `WCAG ${version} Level ${level}`
  const title = `Accessibility Statement for ${org}`

  const blocks: Block[] = []

  blocks.push({
    kind: 'p',
    text: `${org} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.`,
  })

  blocks.push({ kind: 'h2', text: 'Conformance status' })
  blocks.push({
    kind: 'p',
    text: 'The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. They define three levels of conformance: Level A, Level AA, and Level AAA.',
  })
  blocks.push({ kind: 'p', text: conformanceSentence(site, target, status) })

  if (options.standards && options.standards.length > 0) {
    const descriptions = options.standards.map(s => STANDARD_TEXT[s]).filter(Boolean)
    if (descriptions.length > 0) {
      blocks.push({
        kind: 'p',
        text: `We also aim to meet the expectations of ${joinList(descriptions)}.`,
      })
    }
  }

  if (mentionWidget) {
    blocks.push({ kind: 'h2', text: 'Accessibility tools on this site' })
    blocks.push({
      kind: 'p',
      text: `${capitalize(site)} provides ${widgetName}, which lets visitors adjust how content is presented — for example text size, spacing, color contrast, and reading aids. These tools are an optional enhancement: they supplement our accessibility work but do not by themselves make the site conformant, and you do not need them to access our content.`,
    })
  }

  if (options.measuresTaken && options.measuresTaken.length > 0) {
    blocks.push({ kind: 'h2', text: 'Measures to support accessibility' })
    blocks.push({ kind: 'ul', items: options.measuresTaken })
  }

  if (options.knownLimitations && options.knownLimitations.length > 0) {
    blocks.push({ kind: 'h2', text: 'Known limitations' })
    blocks.push({
      kind: 'p',
      text: 'Despite our efforts, some content may not yet be fully accessible. We are aware of the following limitations and are working to address them:',
    })
    blocks.push({ kind: 'ul', items: options.knownLimitations })
  }

  blocks.push({ kind: 'h2', text: 'Feedback and contact' })
  blocks.push({
    kind: 'p',
    text: `We welcome your feedback on the accessibility of ${site}. Please let us know if you encounter accessibility barriers:`,
  })
  const contact: ContactItem[] = []
  if (options.email?.trim()) {
    const email = options.email.trim()
    contact.push({ label: 'Email', value: email, href: `mailto:${email}` })
  }
  if (options.phone?.trim()) {
    const phone = options.phone.trim()
    contact.push({ label: 'Phone', value: phone, href: `tel:${phone.replace(/[^+\d]/g, '')}` })
  }
  if (options.contactUrl?.trim()) {
    const url = options.contactUrl.trim()
    contact.push({ label: 'Contact page', value: url, href: url })
  }
  if (options.postalAddress?.trim()) {
    contact.push({ label: 'Address', value: options.postalAddress.trim() })
  }
  if (contact.length > 0) blocks.push({ kind: 'contact', items: contact })
  else blocks.push({ kind: 'p', text: 'Please use the contact details published on our website to reach us about accessibility.' })
  blocks.push({ kind: 'p', text: 'We try to respond to accessibility feedback promptly.' })

  blocks.push({ kind: 'h2', text: 'Date' })
  blocks.push({ kind: 'p', text: `This statement was last reviewed on ${date}.` })

  return { title, blocks }
}

const STATEMENT_TITLE_ID = 'accessibility-statement-title'

function renderContactHtml(item: ContactItem): string {
  const label = escapeHtml(item.label)
  if (item.href) {
    return `<li>${label}: <a href="${escapeHtml(item.href)}">${escapeHtml(item.value)}</a></li>`
  }
  return `<li>${label}: ${escapeHtml(item.value)}</li>`
}

/** Render the block model to an accessible HTML fragment. */
function renderHtmlFragment(title: string, blocks: Block[]): string {
  const parts: string[] = []
  parts.push(`<section class="accessibility-statement" aria-labelledby="${STATEMENT_TITLE_ID}">`)
  parts.push(`  <h1 id="${STATEMENT_TITLE_ID}">${escapeHtml(title)}</h1>`)
  for (const block of blocks) {
    if (block.kind === 'h2') parts.push(`  <h2>${escapeHtml(block.text)}</h2>`)
    else if (block.kind === 'p') parts.push(`  <p>${escapeHtml(block.text)}</p>`)
    else if (block.kind === 'ul') parts.push(`  <ul>${block.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`)
    else parts.push(`  <ul class="accessibility-statement-contact">${block.items.map(renderContactHtml).join('')}</ul>`)
  }
  parts.push('</section>')
  return parts.join('\n')
}

/** Wrap the fragment in a standalone, valid HTML document. */
function renderHtmlDocument(title: string, blocks: Block[]): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
</head>
<body>
${renderHtmlFragment(title, blocks)}
</body>
</html>
`
}

/** Render the block model to Markdown. */
function renderMarkdown(title: string, blocks: Block[]): string {
  const lines: string[] = [`# ${title}`, '']
  for (const block of blocks) {
    if (block.kind === 'h2') lines.push(`## ${block.text}`, '')
    else if (block.kind === 'p') lines.push(block.text, '')
    else if (block.kind === 'ul') { for (const i of block.items) lines.push(`- ${i}`); lines.push('') }
    else { for (const c of block.items) lines.push(`- ${c.label}: ${c.href ? `[${c.value}](${c.href})` : c.value}`); lines.push('') }
  }
  return `${lines.join('\n').trim()}\n`
}

/** Render the block model to plain text. */
function renderText(title: string, blocks: Block[]): string {
  const lines: string[] = [title, '='.repeat(title.length), '']
  for (const block of blocks) {
    if (block.kind === 'h2') lines.push(block.text, '-'.repeat(block.text.length), '')
    else if (block.kind === 'p') lines.push(block.text, '')
    else if (block.kind === 'ul') { for (const i of block.items) lines.push(`- ${i}`); lines.push('') }
    else { for (const c of block.items) lines.push(`- ${c.label}: ${c.value}`); lines.push('') }
  }
  return `${lines.join('\n').trim()}\n`
}

/**
 * Generate an accessibility statement in all supported formats.
 *
 * @example
 * const { html, markdown } = generateAccessibilityStatement({
 *   organizationName: 'Acme Inc.',
 *   websiteUrl: 'https://acme.example',
 *   email: 'accessibility@acme.example',
 *   standards: ['ADA', 'Section 508'],
 * })
 */
export function generateAccessibilityStatement(
  options: AccessibilityStatementOptions,
): GeneratedAccessibilityStatement {
  const { title, blocks } = buildBlocks(options)
  return {
    title,
    html: renderHtmlFragment(title, blocks),
    htmlDocument: renderHtmlDocument(title, blocks),
    markdown: renderMarkdown(title, blocks),
    text: renderText(title, blocks),
  }
}
