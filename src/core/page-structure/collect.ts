/**
 * Page-structure collection.
 *
 * Walks the host page to build a navigable inventory of headings, landmarks,
 * and links for the Page Structure dialog. Each collected element is tagged
 * with a stable id so the widget can scroll to and focus it on activation.
 */
import type { Translations } from '../i18n'
import type { PageStructureData, PageStructureItem } from '../types'

/** Attribute used to mark and later locate a jump target on the host page. */
const STRUCTURE_TARGET_ATTR = 'data-accessibility-widget-structure-id'
/** Upper bound on items collected per tab, to keep the dialog responsive. */
const MAX_ITEMS = 80
/** Monotonic counter backing the generated target ids. */
let structureTargetId = 0

/** Elements (by tag or ARIA role) treated as navigable landmarks. */
const LANDMARK_SELECTOR = [
  'header',
  'nav',
  'main',
  'footer',
  'aside',
  'section',
  'article',
  'form',
  '[role="banner"]',
  '[role="navigation"]',
  '[role="main"]',
  '[role="contentinfo"]',
  '[role="complementary"]',
  '[role="region"]',
  '[role="search"]',
  '[role="form"]',
  '[role="article"]',
].join(',')

/** Get an existing target id for an element, or assign a fresh one. */
function targetIdFor(el: Element): string {
  const existing = el.getAttribute(STRUCTURE_TARGET_ATTR)
  if (existing) return existing
  const id = `accessibility-widget-structure-${++structureTargetId}`
  el.setAttribute(STRUCTURE_TARGET_ATTR, id)
  return id
}

/** The scope to scan: the host wrapper if present, otherwise the body. */
function pageRoot(): HTMLElement {
  return document.getElementById('accessibility-widget-host') ?? document.body
}

/** True when an element lives inside the widget UI or other ignored content. */
function isIgnored(el: Element): boolean {
  return Boolean(el.closest('.accessibility-widget-root, script, style, template, [hidden], [aria-hidden="true"]'))
}

/** True when an element is rendered (not display:none / visibility:hidden / ignored). */
function isVisible(el: Element): boolean {
  if (!(el instanceof HTMLElement)) return false
  if (isIgnored(el)) return false
  const style = getComputedStyle(el)
  return style.display !== 'none' && style.visibility !== 'hidden'
}

/** Collapse whitespace and trim. */
function cleanText(value: string | null | undefined): string {
  return (value ?? '').replace(/\s+/g, ' ').trim()
}

/** Resolve the text referenced by an `aria-labelledby` attribute. */
function labelledByText(el: Element): string {
  const ids = cleanText(el.getAttribute('aria-labelledby')).split(' ').filter(Boolean)
  return ids.map(id => cleanText(document.getElementById(id)?.textContent)).filter(Boolean).join(' ')
}

/** Compute an element's accessible name from aria-label / labelledby / title. */
function accessibleName(el: Element): string {
  return cleanText(el.getAttribute('aria-label')) ||
    labelledByText(el) ||
    cleanText(el.getAttribute('title'))
}

/** Accessible name with a fallback to the element's text content. */
function elementText(el: Element): string {
  return accessibleName(el) || cleanText(el.textContent)
}

/** Best label for a link: accessible name, then href, then a fallback. */
function linkLabel(el: HTMLAnchorElement, fallback: string): string {
  return elementText(el) || cleanText(el.href) || fallback
}

/** Human-readable kind for a landmark, derived from its role or tag name. */
function landmarkKind(el: Element): string {
  const role = cleanText(el.getAttribute('role')).toLowerCase()
  if (role === 'banner') return 'Header'
  if (role === 'navigation') return 'Navigation'
  if (role === 'main') return 'Main'
  if (role === 'contentinfo') return 'Footer'
  if (role === 'complementary') return 'Aside'
  if (role === 'search') return 'Search'
  if (role === 'form') return 'Form'
  if (role === 'article') return 'Article'
  if (role === 'region') return 'Section'

  const tag = el.tagName.toLowerCase()
  if (tag === 'nav') return 'Navigation'
  if (tag === 'main') return 'Main'
  if (tag === 'footer') return 'Footer'
  if (tag === 'aside') return 'Aside'
  return tag.charAt(0).toUpperCase() + tag.slice(1)
}

/** Text of the first heading inside an element, if any. */
function firstHeadingText(el: Element): string {
  return cleanText(el.querySelector('h1,h2,h3,h4,h5,h6')?.textContent)
}

/** Label for a landmark: `Kind: Name` when a name is available. */
function landmarkLabel(el: Element): string {
  const kind = landmarkKind(el)
  const name = accessibleName(el) || firstHeadingText(el)
  return name ? `${kind}: ${name}` : kind
}

/** Nesting depth of a landmark relative to the page root (clamped to 5). */
function landmarkDepth(el: Element, root: HTMLElement): number {
  let depth = 0
  let parent = el.parentElement
  while (parent && parent !== root) {
    if (parent.matches(LANDMARK_SELECTOR) && isVisible(parent)) depth++
    parent = parent.parentElement
  }
  return Math.min(depth, 5)
}

/** True when an anchor points to another origin or opens in a new tab. */
function isExternalLink(anchor: HTMLAnchorElement): boolean {
  if (anchor.target === '_blank') return true
  try {
    return new URL(anchor.href, location.href).origin !== location.origin
  } catch {
    return false
  }
}

/**
 * Collect the page's headings, landmarks, and links into a structured,
 * render-ready inventory. Returns empty lists when there is no document (SSR).
 */
export function collectPageStructure(t: Translations): PageStructureData {
  if (typeof document === 'undefined') {
    return { headings: [], landmarks: [], links: [] }
  }

  const root = pageRoot()
  const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h1,h2,h3,h4,h5,h6'))
    .filter(isVisible)
    .slice(0, MAX_ITEMS)
    .map((heading): PageStructureItem => {
      const level = Number(heading.tagName.slice(1))
      return {
        id: targetIdFor(heading),
        label: elementText(heading) || t.untitledHeading,
        meta: `H${level}`,
        depth: Math.max(0, level - 1),
      }
    })

  const landmarks = Array.from(root.querySelectorAll<HTMLElement>(LANDMARK_SELECTOR))
    .filter(isVisible)
    .slice(0, MAX_ITEMS)
    .map((landmark): PageStructureItem => ({
      id: targetIdFor(landmark),
      label: landmarkLabel(landmark),
      meta: landmarkKind(landmark),
      depth: landmarkDepth(landmark, root),
    }))

  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href]'))
    .filter(isVisible)
    .slice(0, MAX_ITEMS)
    .map((anchor): PageStructureItem => ({
      id: targetIdFor(anchor),
      label: linkLabel(anchor, t.untitledLink),
      meta: 'Link',
      external: isExternalLink(anchor),
    }))

  return { headings, landmarks, links }
}
