import { afterEach, describe, expect, it } from 'vitest'
import { AccessibilityWidget } from '../../../core/widget'

let widget: AccessibilityWidget | null = null

afterEach(() => {
  widget?.destroy()
  widget = null
  localStorage.clear()
})

function liveRegion(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.accessibility-widget-root [role="status"]')
}

describe('aria-live announcements', () => {
  it('mounts a polite, atomic live region', () => {
    widget = new AccessibilityWidget({ persistence: false })
    widget.mount()
    const region = liveRegion()
    expect(region).not.toBeNull()
    expect(region?.getAttribute('aria-live')).toBe('polite')
    expect(region?.getAttribute('aria-atomic')).toBe('true')
  })

  it('announces a tool level change', () => {
    widget = new AccessibilityWidget({ persistence: false })
    widget.mount()
    widget.open()
    document.querySelector<HTMLButtonElement>('[data-tool="fontSize"]')!.click()
    expect(liveRegion()?.textContent).toContain('level 1')
  })

  it('announces profile apply and reset', () => {
    widget = new AccessibilityWidget({ persistence: false })
    widget.mount()
    widget.open()
    document.querySelector<HTMLButtonElement>('[data-profile="dyslexia"]')!.click()
    expect(liveRegion()?.textContent).toContain('profile applied')
    document.querySelector<HTMLButtonElement>('[data-action="reset"]')!.click()
    expect(liveRegion()?.textContent).toBe('All settings reset')
  })
})
