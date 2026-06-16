import { afterEach, describe, expect, it } from 'vitest'
import { disableVirtualKeyboard, enableVirtualKeyboard } from '../../../core/effects/virtual-keyboard'
import { ensureHostWrapper, unwrapHost } from '../../../core/effects/host'

afterEach(() => {
  disableVirtualKeyboard()
  unwrapHost()
  document.body.innerHTML = ''
})

function key(label: 'aria' | 'text', value: string): HTMLButtonElement {
  const keys = [...document.querySelectorAll<HTMLButtonElement>('.accessibility-widget-vk-key')]
  const found = keys.find(b => (label === 'aria' ? b.getAttribute('aria-label') === value : b.textContent === value))
  if (!found) throw new Error(`key not found: ${value}`)
  return found
}

describe('virtual keyboard', () => {
  it('types into, spaces, and backspaces the focused field', () => {
    document.body.innerHTML = '<input id="f" type="text">'
    ensureHostWrapper()
    const field = document.getElementById('f') as HTMLInputElement
    field.focus()
    enableVirtualKeyboard()
    expect(document.querySelector('.accessibility-widget-virtual-keyboard')).not.toBeNull()

    key('text', 'a').click()
    expect(field.value).toBe('a')
    key('aria', 'Space').click()
    expect(field.value).toBe('a ')
    key('aria', 'Backspace').click()
    expect(field.value).toBe('a')
  })

  it('removes the keyboard on disable', () => {
    ensureHostWrapper()
    enableVirtualKeyboard()
    disableVirtualKeyboard()
    expect(document.querySelector('.accessibility-widget-virtual-keyboard')).toBeNull()
  })
})
