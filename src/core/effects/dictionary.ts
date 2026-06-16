/**
 * Dictionary effect.
 *
 * When enabled, double-clicking a word in the host page looks up its definition
 * and shows it in a small popover. The lookup is pluggable (default:
 * dictionaryapi.dev); set a custom one via {@link setDictionaryLookup}. The
 * popover is a widget-owned overlay (outside the host wrapper) so page effects
 * never touch it.
 */
import { HOST_WRAPPER_ID } from './host'

/** A word → definition resolver. Returns null when no definition is found. */
export type DictionaryLookup = (word: string) => Promise<string | null>

let customLookup: DictionaryLookup | null = null

/** Override the dictionary lookup (e.g. to use your own API). */
export function setDictionaryLookup(lookup: DictionaryLookup | null): void {
  customLookup = lookup
}

/** Default lookup against the free dictionaryapi.dev service. */
async function defaultLookup(word: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
    if (!res.ok) return null
    const data = (await res.json()) as Array<{
      meanings?: Array<{ definitions?: Array<{ definition?: string }> }>
    }>
    return data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? null
  } catch {
    return null
  }
}

let dblClickHandler: ((e: MouseEvent) => void) | null = null
let keyHandler: ((e: KeyboardEvent) => void) | null = null
let popover: HTMLDivElement | null = null
let requestSeq = 0

function closePopover(): void {
  if (popover) {
    popover.remove()
    popover = null
  }
}

function showPopover(x: number, y: number, word: string, body: string): void {
  closePopover()
  const el = document.createElement('div')
  el.className = 'accessibility-widget-dictionary-popover'
  el.setAttribute('role', 'dialog')
  el.setAttribute('aria-live', 'polite')
  el.setAttribute('aria-label', `Definition of ${word}`)
  Object.assign(el.style, {
    position: 'fixed',
    zIndex: '2147483647',
    maxWidth: '300px',
    background: '#ffffff',
    color: '#0c0c0c',
    border: '1px solid #d4d4d8',
    borderRadius: '8px',
    padding: '12px 34px 12px 14px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
    font: '14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    left: `${Math.max(8, Math.min(x, (window.innerWidth || 1024) - 320))}px`,
    top: `${y + 14}px`,
  })
  const title = document.createElement('strong')
  title.textContent = word
  title.style.display = 'block'
  title.style.marginBottom = '4px'
  const text = document.createElement('p')
  text.textContent = body
  text.style.margin = '0'
  const close = document.createElement('button')
  close.type = 'button'
  close.textContent = '×'
  close.setAttribute('aria-label', 'Close definition')
  Object.assign(close.style, {
    position: 'absolute',
    top: '6px',
    right: '8px',
    border: 'none',
    background: 'none',
    fontSize: '18px',
    lineHeight: '1',
    cursor: 'pointer',
    color: 'inherit',
  })
  close.addEventListener('click', closePopover)
  el.append(title, text, close)
  document.body.appendChild(el)
  popover = el
}

/** The first word of the current selection, stripped of punctuation. */
function selectedWord(): string {
  const text = (typeof window !== 'undefined' && window.getSelection?.()?.toString().trim()) || ''
  const first = text.split(/\s+/)[0] ?? ''
  return first.replace(/[^\p{L}\p{N}'-]/gu, '')
}

/** Enable double-click-to-define on the host page. */
export function enableDictionary(): void {
  if (dblClickHandler) return
  dblClickHandler = (e: MouseEvent) => {
    const target = e.target as Element | null
    if (!target || target.closest('.accessibility-widget-root') || target.closest('.accessibility-widget-dictionary-popover')) return
    const host = document.getElementById(HOST_WRAPPER_ID)
    if (!host || !host.contains(target)) return
    const word = selectedWord()
    if (!word) return
    const { clientX: x, clientY: y } = e
    showPopover(x, y, word, 'Looking up…')
    const seq = ++requestSeq
    ;(customLookup ?? defaultLookup)(word)
      .then(def => {
        if (seq === requestSeq) showPopover(x, y, word, def || 'No definition found.')
      })
      .catch(() => {
        if (seq === requestSeq) showPopover(x, y, word, 'No definition found.')
      })
  }
  document.addEventListener('dblclick', dblClickHandler, true)
  keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closePopover()
  }
  document.addEventListener('keydown', keyHandler, true)
}

/** Disable the dictionary and tear down its listeners and popover. */
export function disableDictionary(): void {
  if (dblClickHandler) {
    document.removeEventListener('dblclick', dblClickHandler, true)
    dblClickHandler = null
  }
  if (keyHandler) {
    document.removeEventListener('keydown', keyHandler, true)
    keyHandler = null
  }
  requestSeq++
  closePopover()
}
