/**
 * Virtual keyboard effect.
 *
 * When enabled, shows a draggable on-screen QWERTY keyboard. Keys type into the
 * host page's most recently focused text field (`<input>` of a text-like type or
 * `<textarea>`); keys use `mousedown` preventDefault so the field keeps focus and
 * its caret. For motor-impaired and pointer/switch users. Widget-owned overlay,
 * so host effects never touch it.
 */
import { HOST_WRAPPER_ID } from './host'

type TextField = HTMLInputElement | HTMLTextAreaElement

const TEXT_INPUT_TYPES = new Set(['text', 'search', 'email', 'url', 'tel', 'password', 'number', ''])

const ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

let keyboard: HTMLDivElement | null = null
let lastField: TextField | null = null
let focusHandler: ((e: FocusEvent) => void) | null = null
let shiftOn = false

/** Is this a text field we can type into (and not inside the widget)? */
function isTextField(el: EventTarget | null): el is TextField {
  if (el instanceof HTMLTextAreaElement) return !el.closest('.accessibility-widget-root')
  if (el instanceof HTMLInputElement) {
    return TEXT_INPUT_TYPES.has(el.type.toLowerCase()) && !el.closest('.accessibility-widget-root')
  }
  return false
}

/** Insert text at the field's caret and fire an input event. */
function typeInto(field: TextField, text: string): void {
  const start = field.selectionStart ?? field.value.length
  const end = field.selectionEnd ?? field.value.length
  field.value = field.value.slice(0, start) + text + field.value.slice(end)
  const caret = start + text.length
  try {
    field.setSelectionRange(caret, caret)
  } catch {
    // Some input types don't support selection range; ignore.
  }
  field.dispatchEvent(new Event('input', { bubbles: true }))
}

/** Delete the selection, or the character before the caret. */
function backspace(field: TextField): void {
  const start = field.selectionStart ?? field.value.length
  const end = field.selectionEnd ?? field.value.length
  if (start !== end) {
    field.value = field.value.slice(0, start) + field.value.slice(end)
    try { field.setSelectionRange(start, start) } catch { /* ignore */ }
  } else if (start > 0) {
    field.value = field.value.slice(0, start - 1) + field.value.slice(end)
    try { field.setSelectionRange(start - 1, start - 1) } catch { /* ignore */ }
  }
  field.dispatchEvent(new Event('input', { bubbles: true }))
}

function press(value: string): void {
  if (!lastField) return
  if (value === 'Backspace') backspace(lastField)
  else if (value === 'Space') typeInto(lastField, ' ')
  else if (value === 'Enter') {
    if (lastField instanceof HTMLTextAreaElement) typeInto(lastField, '\n')
  } else {
    typeInto(lastField, shiftOn ? value.toUpperCase() : value)
  }
}

function keyButton(label: string, value: string, flex?: number): HTMLButtonElement {
  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'accessibility-widget-vk-key'
  btn.textContent = label
  btn.setAttribute('aria-label', value === 'Space' ? 'Space' : value === 'Backspace' ? 'Backspace' : value)
  Object.assign(btn.style, {
    flex: flex ? String(flex) : '1',
    minWidth: '30px',
    padding: '10px 6px',
    border: '1px solid #d4d4d8',
    borderRadius: '6px',
    background: '#ffffff',
    color: '#0c0c0c',
    font: '14px/1 system-ui, sans-serif',
    cursor: 'pointer',
  })
  // Keep the host field focused (don't let the key steal focus/selection).
  btn.addEventListener('mousedown', e => e.preventDefault())
  btn.addEventListener('click', () => press(value))
  return btn
}

function buildKeyboard(): HTMLDivElement {
  const root = document.createElement('div')
  root.className = 'accessibility-widget-virtual-keyboard'
  root.setAttribute('role', 'group')
  root.setAttribute('aria-label', 'Virtual keyboard')
  Object.assign(root.style, {
    position: 'fixed',
    left: '50%',
    bottom: '16px',
    transform: 'translateX(-50%)',
    zIndex: '2147483647',
    width: 'min(640px, 96vw)',
    background: '#f4f4f5',
    border: '1px solid #d4d4d8',
    borderRadius: '12px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.22)',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  })

  // Drag handle.
  const handle = document.createElement('div')
  handle.setAttribute('aria-hidden', 'true')
  Object.assign(handle.style, {
    height: '6px', width: '48px', borderRadius: '3px', background: '#a1a1aa',
    margin: '0 auto 4px', cursor: 'grab',
  })
  enableDrag(root, handle)
  root.appendChild(handle)

  const makeRow = (keys: HTMLButtonElement[]) => {
    const row = document.createElement('div')
    Object.assign(row.style, { display: 'flex', gap: '6px', justifyContent: 'center' })
    keys.forEach(k => row.appendChild(k))
    return row
  }

  for (const row of ROWS) {
    root.appendChild(makeRow(row.map(k => keyButton(k, k))))
  }

  // Control row: Shift, Space, Backspace, Enter.
  const shiftBtn = keyButton('⇧ Shift', 'Shift', 2)
  shiftBtn.addEventListener('click', () => {
    shiftOn = !shiftOn
    shiftBtn.style.background = shiftOn ? '#1d4ed8' : '#ffffff'
    shiftBtn.style.color = shiftOn ? '#ffffff' : '#0c0c0c'
    shiftBtn.setAttribute('aria-pressed', String(shiftOn))
  })
  shiftBtn.setAttribute('aria-pressed', 'false')
  root.appendChild(makeRow([
    shiftBtn,
    keyButton('Space', 'Space', 6),
    keyButton('⌫', 'Backspace', 2),
    keyButton('Enter', 'Enter', 2),
  ]))

  return root
}

/** Make `el` draggable by `handle`. */
function enableDrag(el: HTMLElement, handle: HTMLElement): void {
  handle.addEventListener('mousedown', down => {
    down.preventDefault()
    const rect = el.getBoundingClientRect()
    const offsetX = down.clientX - rect.left
    const offsetY = down.clientY - rect.top
    const move = (m: MouseEvent) => {
      el.style.left = `${m.clientX - offsetX}px`
      el.style.top = `${m.clientY - offsetY}px`
      el.style.bottom = 'auto'
      el.style.transform = 'none'
    }
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  })
}

/** Show the on-screen keyboard and start tracking the focused field. */
export function enableVirtualKeyboard(): void {
  if (keyboard || typeof document === 'undefined') return
  const host = document.getElementById(HOST_WRAPPER_ID)
  // Seed from the currently active element if it's a field.
  if (isTextField(document.activeElement)) lastField = document.activeElement
  focusHandler = (e: FocusEvent) => {
    if (isTextField(e.target) && (!host || host.contains(e.target))) lastField = e.target
  }
  document.addEventListener('focusin', focusHandler, true)
  keyboard = buildKeyboard()
  document.body.appendChild(keyboard)
}

/** Hide the keyboard and stop tracking focus. */
export function disableVirtualKeyboard(): void {
  if (focusHandler) {
    document.removeEventListener('focusin', focusHandler, true)
    focusHandler = null
  }
  if (keyboard) {
    keyboard.remove()
    keyboard = null
  }
  lastField = null
  shiftOn = false
}
