/**
 * Text Magnifier effect.
 *
 * Shows a floating tooltip near the cursor containing an enlarged, readable
 * version of the text under the pointer. Useful for inspecting small labels,
 * dense tables, and form controls.
 */

/** Active `mousemove` handler, or `null` when the effect is disabled. */
let magnifierHandler: ((e: MouseEvent) => void) | null = null
/** The floating tooltip element, or `null` when the effect is disabled. */
let magnifierEl: HTMLDivElement | null = null

/** Collapse whitespace and cap length so the tooltip stays compact. */
function normalizedMagnifierText(text: string): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, 200)
}

/**
 * Recursively gather readable text from a node into `parts`, stopping once
 * enough has been collected. Form controls, images, and `<select>` elements
 * contribute their effective value/label rather than raw DOM text.
 */
function collectMagnifierText(node: Node, parts: string[]): void {
  if (parts.join(' ').length >= 220) return
  if (node.nodeType === Node.TEXT_NODE) {
    const text = normalizedMagnifierText(node.textContent || '')
    if (text) parts.push(text)
    return
  }
  if (!(node instanceof Element)) return
  if (node.matches('script, style, noscript, template')) return
  if (node instanceof HTMLElement && (node.hidden || node.getAttribute('aria-hidden') === 'true')) return

  if (node instanceof HTMLSelectElement) {
    const selected = node.selectedOptions[0] ?? node.options[node.selectedIndex]
    const text = normalizedMagnifierText(selected?.textContent || node.value)
    if (text) parts.push(text)
    return
  }

  if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
    const text = normalizedMagnifierText(node.value || node.placeholder || node.getAttribute('aria-label') || '')
    if (text) parts.push(text)
    return
  }

  if (node instanceof HTMLImageElement) {
    const text = normalizedMagnifierText(node.alt || node.getAttribute('aria-label') || '')
    if (text) parts.push(text)
    return
  }

  for (const child of Array.from(node.childNodes)) collectMagnifierText(child, parts)
}

/**
 * Resolve the best readable text for the element under the cursor, preferring
 * the nearest interactive ancestor (button, link, label, control) so the
 * tooltip reflects what the user is actually pointing at.
 */
function magnifierTextForElement(element: Element): string {
  const target = element.closest('button, a, label, summary, [role="button"], [role="link"], select, input, textarea') ?? element
  const parts: string[] = []
  collectMagnifierText(target, parts)
  return normalizedMagnifierText(parts.join(' '))
}

/** Apply the font size / width / padding for the given magnifier level. */
function updateMagnifierAppearance(level: number): void {
  if (!magnifierEl) return
  const presets = [
    { fontSize: 18, maxWidth: 260, padding: '8px 12px' },
    { fontSize: 20, maxWidth: 300, padding: '10px 14px' },
    { fontSize: 22, maxWidth: 340, padding: '12px 16px' },
  ]
  const preset = presets[Math.max(0, Math.min(level - 1, presets.length - 1))]
  magnifierEl.style.fontSize = `${preset.fontSize}px`
  magnifierEl.style.maxWidth = `${preset.maxWidth}px`
  magnifierEl.style.padding = preset.padding
}

/**
 * Enable the magnifier at the given level, or update its appearance if it is
 * already active.
 */
export function enableMagnifier(level: number): void {
  if (magnifierHandler) {
    updateMagnifierAppearance(level)
    return
  }
  magnifierEl = document.createElement('div')
  magnifierEl.className = 'accessibility-widget-magnify-cursor'
  magnifierEl.style.display = 'none'
  document.body.appendChild(magnifierEl)
  updateMagnifierAppearance(level)

  magnifierHandler = (e: MouseEvent) => {
    if (!magnifierEl) return
    const el = document.elementFromPoint(e.clientX, e.clientY)
    if (!el || el.closest('.accessibility-widget-root') || el.closest('.accessibility-widget-magnify-cursor')) {
      magnifierEl.style.display = 'none'
      return
    }
    const text = magnifierTextForElement(el)
    if (!text) {
      magnifierEl.style.display = 'none'
      return
    }
    magnifierEl.textContent = text
    magnifierEl.style.display = 'block'
    // Keep the tooltip fully inside the viewport, offset from the cursor.
    const rect = magnifierEl.getBoundingClientRect()
    const gap = 16
    const margin = 8
    const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin)
    const maxTop = Math.max(margin, window.innerHeight - rect.height - margin)
    const left = Math.min(Math.max(e.clientX + gap, margin), maxLeft)
    const top = Math.min(Math.max(e.clientY + gap, margin), maxTop)
    magnifierEl.style.left = `${left}px`
    magnifierEl.style.top = `${top}px`
  }
  document.addEventListener('mousemove', magnifierHandler)
}

/** Disable the magnifier and remove its element and listener. */
export function disableMagnifier(): void {
  if (magnifierHandler) {
    document.removeEventListener('mousemove', magnifierHandler)
    magnifierHandler = null
  }
  if (magnifierEl) {
    magnifierEl.remove()
    magnifierEl = null
  }
}
