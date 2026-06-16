/**
 * Simplify effect.
 *
 * When enabled, selecting text in the host page surfaces a small "Simplify"
 * action; activating it runs the selection through a caller-supplied provider
 * (e.g. an LLM endpoint) and shows the rewritten text in a popover. There is no
 * built-in provider — set one via {@link setSimplifyProvider}; with none set the
 * effect is inert (and the tool is hidden in the panel). It never alters the
 * page content, only displays a simpler version.
 */
import { HOST_WRAPPER_ID } from './host'

/** A text → simpler-text provider. */
export type SimplifyProvider = (text: string) => Promise<string>

let provider: SimplifyProvider | null = null

/** Set the provider that powers the Simplify tool. */
export function setSimplifyProvider(fn: SimplifyProvider | null): void {
  provider = fn
}

let upHandler: ((e: MouseEvent) => void) | null = null
let keyHandler: ((e: KeyboardEvent) => void) | null = null
let actionBtn: HTMLButtonElement | null = null
let popover: HTMLDivElement | null = null
let requestSeq = 0

function removeAction(): void {
  if (actionBtn) {
    actionBtn.remove()
    actionBtn = null
  }
}

function closePopover(): void {
  if (popover) {
    popover.remove()
    popover = null
  }
}

function showPopover(x: number, y: number, body: string): void {
  closePopover()
  const el = document.createElement('div')
  el.className = 'accessibility-widget-simplify-popover'
  el.setAttribute('role', 'dialog')
  el.setAttribute('aria-live', 'polite')
  el.setAttribute('aria-label', 'Simplified text')
  Object.assign(el.style, {
    position: 'fixed',
    zIndex: '2147483647',
    maxWidth: '340px',
    background: '#ffffff',
    color: '#0c0c0c',
    border: '1px solid #d4d4d8',
    borderRadius: '8px',
    padding: '12px 34px 12px 14px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
    font: '14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
    left: `${Math.max(8, Math.min(x, (window.innerWidth || 1024) - 360))}px`,
    top: `${y + 14}px`,
  })
  const text = document.createElement('p')
  text.textContent = body
  text.style.margin = '0'
  const close = document.createElement('button')
  close.type = 'button'
  close.textContent = '×'
  close.setAttribute('aria-label', 'Close')
  Object.assign(close.style, {
    position: 'absolute', top: '6px', right: '8px', border: 'none', background: 'none',
    fontSize: '18px', lineHeight: '1', cursor: 'pointer', color: 'inherit',
  })
  close.addEventListener('click', closePopover)
  el.append(text, close)
  document.body.appendChild(el)
  popover = el
}

function showAction(x: number, y: number, text: string): void {
  removeAction()
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'accessibility-widget-simplify-action'
  btn.textContent = '✨ Simplify'
  Object.assign(btn.style, {
    position: 'fixed',
    zIndex: '2147483647',
    background: '#1d4ed8',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '6px 10px',
    font: '13px/1 system-ui, sans-serif',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    left: `${Math.max(8, Math.min(x, (window.innerWidth || 1024) - 120))}px`,
    top: `${y + 10}px`,
  })
  // mousedown would clear the selection before click fires; prevent that.
  btn.addEventListener('mousedown', e => e.preventDefault())
  btn.addEventListener('click', () => {
    removeAction()
    if (!provider) return
    showPopover(x, y, 'Simplifying…')
    const seq = ++requestSeq
    provider(text)
      .then(result => {
        if (seq === requestSeq) showPopover(x, y, result || 'No result.')
      })
      .catch(() => {
        if (seq === requestSeq) showPopover(x, y, 'Could not simplify the selection.')
      })
  })
  document.body.appendChild(btn)
  actionBtn = btn
}

/** Enable select-to-simplify on the host page. No-op without a provider. */
export function enableSimplify(): void {
  if (upHandler || !provider) return
  upHandler = (e: MouseEvent) => {
    const target = e.target as Element | null
    if (target?.closest('.accessibility-widget-root') || target?.closest('.accessibility-widget-simplify-action') || target?.closest('.accessibility-widget-simplify-popover')) return
    const host = document.getElementById(HOST_WRAPPER_ID)
    const text = (window.getSelection?.()?.toString() ?? '').trim()
    if (!host || !text || (target && !host.contains(target))) {
      removeAction()
      return
    }
    showAction(e.clientX, e.clientY, text)
  }
  document.addEventListener('mouseup', upHandler, true)
  keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      removeAction()
      closePopover()
    }
  }
  document.addEventListener('keydown', keyHandler, true)
}

/** Disable simplify and remove its listeners, action, and popover. */
export function disableSimplify(): void {
  if (upHandler) {
    document.removeEventListener('mouseup', upHandler, true)
    upHandler = null
  }
  if (keyHandler) {
    document.removeEventListener('keydown', keyHandler, true)
    keyHandler = null
  }
  requestSeq++
  removeAction()
  closePopover()
}
