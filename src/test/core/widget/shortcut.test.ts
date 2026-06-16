import { afterEach, describe, expect, it } from 'vitest'
import { AccessibilityWidget } from '../../../core/widget'

let widget: AccessibilityWidget | null = null

afterEach(() => {
  widget?.destroy()
  widget = null
  localStorage.clear()
})

function press(key: string, mods: Partial<KeyboardEventInit> = {}) {
  document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...mods }))
}

describe('keyboard shortcut', () => {
  it('toggles the panel with the default Ctrl+U', () => {
    widget = new AccessibilityWidget({ persistence: false })
    widget.mount()
    expect(widget.getIsOpen()).toBe(false)
    press('u', { ctrlKey: true })
    expect(widget.getIsOpen()).toBe(true)
  })

  it('does not toggle without the required modifier', () => {
    widget = new AccessibilityWidget({ persistence: false })
    widget.mount()
    press('u')
    expect(widget.getIsOpen()).toBe(false)
  })

  it('honors a custom shortcut', () => {
    widget = new AccessibilityWidget({ persistence: false, shortcut: { key: 'k', altKey: true } })
    widget.mount()
    press('u', { ctrlKey: true })
    expect(widget.getIsOpen()).toBe(false)
    press('k', { altKey: true })
    expect(widget.getIsOpen()).toBe(true)
  })

  it('can be disabled with shortcut: false', () => {
    widget = new AccessibilityWidget({ persistence: false, shortcut: false })
    widget.mount()
    press('u', { ctrlKey: true })
    expect(widget.getIsOpen()).toBe(false)
  })

  it('renders the shortcut label in the header', () => {
    widget = new AccessibilityWidget({ persistence: false, shortcut: { key: 'k', altKey: true } })
    widget.mount()
    widget.open()
    expect(document.querySelector('.accessibility-widget-header-shortcut')?.textContent).toBe('ALT + K')
  })

  it('hides the header shortcut hint when disabled', () => {
    widget = new AccessibilityWidget({ persistence: false, shortcut: false })
    widget.mount()
    widget.open()
    expect(document.querySelector('.accessibility-widget-header-shortcut')).toBeNull()
  })
})
