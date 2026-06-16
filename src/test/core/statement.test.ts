import { describe, expect, it } from 'vitest'
import { generateAccessibilityStatement } from '../../core/statement'

const BASE = {
  organizationName: 'Acme Inc.',
  websiteName: 'the Acme store',
  websiteUrl: 'https://acme.example',
  email: 'accessibility@acme.example',
  date: 'June 16, 2026',
}

describe('generateAccessibilityStatement', () => {
  it('returns all four formats with the org name in the title', () => {
    const out = generateAccessibilityStatement(BASE)
    expect(out.title).toBe('Accessibility Statement for Acme Inc.')
    expect(out.html).toContain('Acme Inc.')
    expect(out.htmlDocument).toContain('<!doctype html>')
    expect(out.markdown.startsWith('# Accessibility Statement for Acme Inc.')).toBe(true)
    expect(out.text).toContain('Accessibility Statement for Acme Inc.')
  })

  it('defaults to WCAG 2.1 Level AA and partial conformance (the honest default)', () => {
    const out = generateAccessibilityStatement(BASE)
    expect(out.text).toContain('WCAG 2.1 Level AA')
    expect(out.text).toContain('partially conformant')
  })

  it('never overclaims compliance', () => {
    const out = generateAccessibilityStatement({ ...BASE, conformanceStatus: 'fully' })
    const all = `${out.html}\n${out.markdown}\n${out.text}`
    expect(all).not.toMatch(/fully compliant/i)
    expect(all).not.toMatch(/100\s*%/)
    expect(all).not.toMatch(/\bcompliant\b/i) // uses "conformant", never "compliant"
    expect(all).not.toMatch(/guarantee/i)
    // 'fully' still uses the W3C "fully conformant" phrasing.
    expect(out.text).toContain('fully conformant')
  })

  it('renders an accessible HTML fragment with headings and a labelled section', () => {
    const out = generateAccessibilityStatement(BASE)
    expect(out.html).toContain('<section class="accessibility-statement" aria-labelledby="accessibility-statement-title">')
    expect(out.html).toContain('<h1 id="accessibility-statement-title">')
    expect(out.html).toContain('<h2>Conformance status</h2>')
  })

  it('renders an email contact as a mailto link', () => {
    const out = generateAccessibilityStatement(BASE)
    expect(out.html).toContain('href="mailto:accessibility@acme.example"')
    expect(out.markdown).toContain('[accessibility@acme.example](mailto:accessibility@acme.example)')
  })

  it('maps referenced standards to accurate WCAG versions', () => {
    const out = generateAccessibilityStatement({ ...BASE, standards: ['Section 508', 'AODA', 'EN 301 549'] })
    expect(out.text).toContain('Section 508')
    expect(out.text).toContain('WCAG 2.0 Level AA') // 508 + AODA reference 2.0
    expect(out.text).toContain('EN 301 549')
  })

  it('includes an honest, non-guaranteeing note about the toolbar by default', () => {
    const out = generateAccessibilityStatement({ ...BASE, widgetName: 'AccessKit' })
    expect(out.text).toContain('AccessKit')
    expect(out.text).toContain('optional enhancement')
    expect(out.text).toContain('do not by themselves make the site conformant')
  })

  it('omits the toolbar note when mentionWidget is false', () => {
    const out = generateAccessibilityStatement({ ...BASE, mentionWidget: false })
    expect(out.text).not.toContain('Accessibility tools on this site')
  })

  it('renders known limitations as a list', () => {
    const out = generateAccessibilityStatement({
      ...BASE,
      knownLimitations: ['Some older PDFs are not tagged', 'Third-party maps lack captions'],
    })
    expect(out.html).toContain('<li>Some older PDFs are not tagged</li>')
    expect(out.markdown).toContain('- Third-party maps lack captions')
  })

  it('escapes HTML in user-supplied values', () => {
    const out = generateAccessibilityStatement({
      ...BASE,
      organizationName: 'Acme <script>alert(1)</script>',
    })
    expect(out.html).not.toContain('<script>alert(1)</script>')
    expect(out.html).toContain('&lt;script&gt;')
  })

  it('falls back gracefully when no contact details are provided', () => {
    const out = generateAccessibilityStatement({ organizationName: 'Solo', date: 'June 16, 2026' })
    expect(out.text).toContain('Please use the contact details published on our website')
  })
})
