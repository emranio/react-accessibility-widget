/**
 * Keyboard accessibility helpers: focus trapping for the modal panel and the
 * page-structure dialog (Tab cycling + Escape to dismiss).
 */

/** Selector matching the elements considered focusable inside a trap. */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

let trapHandler: ((e: KeyboardEvent) => void) | null = null
let trappedEl: HTMLElement | null = null

/**
 * Trap keyboard focus within `panel`.
 *
 * Tab/Shift+Tab wrap around the focusable elements; Escape invokes `onEscape`
 * if provided, otherwise clicks and refocuses `trigger`. Focus is moved to the
 * first focusable element. Replaces any previously active trap.
 */
export function trapFocus(panel: HTMLElement, trigger: HTMLElement, onEscape?: () => void): void {
  releaseFocus()
  trappedEl = panel

  trapHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      if (onEscape) {
        onEscape()
      } else {
        trigger.click()
        trigger.focus()
      }
      return
    }
    if (e.key !== 'Tab') return

    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      .filter(el => !el.closest('[hidden]') && el.offsetParent !== null)

    if (focusable.length === 0) { e.preventDefault(); return }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  panel.addEventListener('keydown', trapHandler)

  // Move focus to first focusable element in panel
  const first = panel.querySelector<HTMLElement>(FOCUSABLE)
  first?.focus()
}

/** Remove the active focus trap, if any. Safe to call when none is active. */
export function releaseFocus(): void {
  if (trapHandler && trappedEl) trappedEl.removeEventListener('keydown', trapHandler)
  trapHandler = null
  trappedEl = null
}
