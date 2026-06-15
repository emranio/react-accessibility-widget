import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { trapFocus, releaseFocus } from '../../core/keyboard'

beforeEach(() => {
  document.body.innerHTML = ''
})

afterEach(() => {
  releaseFocus()
  document.body.innerHTML = ''
})

describe('trapFocus', () => {
  function buildPanel(...tags: string[]): HTMLDivElement {
    const panel = document.createElement('div')
    for (const tag of tags) {
      const el = document.createElement(tag) as HTMLButtonElement
      el.textContent = tag
      if (tag === 'button') el.type = 'button'
      panel.appendChild(el)
    }
    document.body.appendChild(panel)
    return panel
  }

  it('does not throw when panel has no focusable elements', () => {
    const panel = document.createElement('div')
    document.body.appendChild(panel)
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    expect(() => trapFocus(panel, trigger)).not.toThrow()
  })

  it('closes panel on Escape key', () => {
    const trigger = document.createElement('button')
    trigger.type = 'button'
    document.body.appendChild(trigger)
    let clicked = false
    trigger.addEventListener('click', () => { clicked = true })

    const panel = buildPanel('button', 'button')
    trapFocus(panel, trigger)

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    panel.dispatchEvent(event)
    expect(clicked).toBe(true)
  })

  it('releaseFocus does not throw when no trap is active', () => {
    expect(() => releaseFocus()).not.toThrow()
  })
})
