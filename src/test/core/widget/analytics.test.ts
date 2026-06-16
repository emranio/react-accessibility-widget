import { afterEach, describe, expect, it } from 'vitest'
import { AccessibilityWidget } from '../../../core/widget'
import type { WidgetEvent } from '../../../core/types'

let widget: AccessibilityWidget | null = null

afterEach(() => {
  widget?.destroy()
  widget = null
  localStorage.clear()
})

describe('usage analytics (onEvent)', () => {
  it('emits privacy-respecting open/tool/profile/reset/close events', () => {
    const events: WidgetEvent[] = []
    widget = new AccessibilityWidget({ persistence: false, onEvent: e => events.push(e) })
    widget.mount()
    widget.open()
    document.querySelector<HTMLButtonElement>('[data-tool="fontSize"]')!.click()
    document.querySelector<HTMLButtonElement>('[data-profile="dyslexia"]')!.click()
    document.querySelector<HTMLButtonElement>('[data-action="reset"]')!.click()
    widget.close()

    const types = events.map(e => e.type)
    expect(types).toContain('open')
    expect(types).toContain('tool')
    expect(types).toContain('profile')
    expect(types).toContain('reset')
    expect(types).toContain('close')

    expect(events.find(e => e.type === 'tool')).toMatchObject({ tool: 'fontSize', level: 1 })
    expect(events.find(e => e.type === 'profile')).toMatchObject({ profile: 'dyslexia' })
  })

  it('does not throw when no onEvent is provided', () => {
    widget = new AccessibilityWidget({ persistence: false })
    widget.mount()
    widget.open()
    expect(() => document.querySelector<HTMLButtonElement>('[data-tool="fontSize"]')!.click()).not.toThrow()
  })
})
