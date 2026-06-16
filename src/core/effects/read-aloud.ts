/**
 * Read Aloud (text-to-speech) effect.
 *
 * When enabled, clicking text in the host page reads it aloud via the Web Speech
 * API and briefly outlines the spoken element. Toggling the tool off (or
 * clearing effects) cancels any in-progress speech. The effect no-ops where
 * `speechSynthesis` is unavailable, and never touches the widget's own UI.
 */
import { HOST_WRAPPER_ID } from './host'

/** Elements whose text is worth reading on click, nearest-ancestor first. */
const READABLE_SELECTOR =
  'p, li, h1, h2, h3, h4, h5, h6, a, button, label, td, th, caption, blockquote, figcaption, summary, dt, dd, span, div'

let clickHandler: ((e: MouseEvent) => void) | null = null
let highlighted: HTMLElement | null = null

/** Whether the Web Speech API is available in this environment. */
function supported(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.speechSynthesis !== 'undefined' &&
    typeof window.SpeechSynthesisUtterance !== 'undefined'
  )
}

function clearHighlight(): void {
  if (highlighted) {
    highlighted.style.outline = ''
    highlighted.style.outlineOffset = ''
    highlighted = null
  }
}

/** Speak an element's text and outline it until speech ends. */
function speak(element: HTMLElement): void {
  const text = (element.innerText || element.textContent || '').replace(/\s+/g, ' ').trim()
  if (!text) return
  window.speechSynthesis.cancel()
  clearHighlight()
  const utterance = new SpeechSynthesisUtterance(text.slice(0, 4000))
  utterance.onend = clearHighlight
  utterance.onerror = clearHighlight
  highlighted = element
  element.style.outline = '3px solid #2563eb'
  element.style.outlineOffset = '2px'
  window.speechSynthesis.speak(utterance)
}

/** Enable click-to-read on the host page. No-op if unsupported or already on. */
export function enableReadAloud(): void {
  if (clickHandler || !supported()) return
  clickHandler = (e: MouseEvent) => {
    const target = e.target as Element | null
    if (!target || target.closest('.accessibility-widget-root')) return
    const host = document.getElementById(HOST_WRAPPER_ID)
    if (!host || !host.contains(target)) return
    const element = target.closest<HTMLElement>(READABLE_SELECTOR) ?? (target as HTMLElement)
    // Intercept the click so the read action replaces navigation/activation
    // while the tool is on; toggling it off restores normal behaviour.
    e.preventDefault()
    e.stopPropagation()
    speak(element)
  }
  document.addEventListener('click', clickHandler, true)
  if (typeof document !== 'undefined') {
    document.body.classList.add('accessibility-widget-read-aloud-active')
  }
}

/** Disable read-aloud, remove the listener, and cancel any in-progress speech. */
export function disableReadAloud(): void {
  if (clickHandler) {
    document.removeEventListener('click', clickHandler, true)
    clickHandler = null
  }
  if (supported()) window.speechSynthesis.cancel()
  clearHighlight()
  if (typeof document !== 'undefined') {
    document.body.classList.remove('accessibility-widget-read-aloud-active')
  }
}
