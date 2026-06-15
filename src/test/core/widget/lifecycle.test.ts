import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { AccessibilityWidget } from '../../../core'
import { DEFAULT_STATE, STORAGE_KEY } from '../../../core/types'
import { HOST_WRAPPER_ID } from '../../../core/effects'

beforeEach(() => {
  document.body.innerHTML = '<p id="page-content">page</p>'
  localStorage.clear()
})

afterEach(() => {
  document.body.innerHTML = ''
  localStorage.clear()
})

describe('Accessibility Widget — constructor', () => {
  it('applies defaults when no config provided', () => {
    const a = new AccessibilityWidget()
    expect(a.getState()).toEqual(DEFAULT_STATE)
    a.destroy()
  })

  it('loads persisted state from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULT_STATE, fontSize: 3 }))
    const a = new AccessibilityWidget()
    expect(a.getState().fontSize).toBe(3)
    a.destroy()
  })

  it('ignores localStorage when persistence is false', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULT_STATE, fontSize: 5 }))
    const a = new AccessibilityWidget({ persistence: false })
    expect(a.getState().fontSize).toBe(0)
    a.destroy()
  })

  it('uses default size S', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector<HTMLElement>('.accessibility-widget-panel')
    expect(panel?.dataset.size).toBe('S')
    a.destroy()
  })

  it('respects custom size', () => {
    const a = new AccessibilityWidget({ size: 'L' })
    a.mount()
    const panel = document.querySelector<HTMLElement>('.accessibility-widget-panel')
    expect(panel?.dataset.size).toBe('L')
    a.destroy()
  })

  it('normalizes lowercase custom size', () => {
    const a = new AccessibilityWidget({ size: 'l' })
    a.mount()
    const panel = document.querySelector<HTMLElement>('.accessibility-widget-panel')
    expect(panel?.dataset.size).toBe('L')
    a.destroy()
  })
})

describe('Accessibility Widget — mount / destroy', () => {
  it('appends accessibility-widget-root to body', () => {
    const a = new AccessibilityWidget()
    a.mount()
    expect(document.querySelector('.accessibility-widget-root')).not.toBeNull()
    a.destroy()
  })

  it('uses the custom trigger icon', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const icon = document.querySelector<SVGSVGElement>('.accessibility-widget-trigger svg')
    expect(icon?.getAttribute('viewBox')).toBe('0 0 32 32')
    expect(icon?.getAttribute('fill')).toBe('currentColor')
    expect(icon?.querySelector('path')).not.toBeNull()
    a.destroy()
  })

  it('creates host wrapper when no target given', () => {
    const a = new AccessibilityWidget()
    a.mount()
    expect(document.getElementById(HOST_WRAPPER_ID)).not.toBeNull()
    a.destroy()
  })

  it('always creates host wrapper so effects work when the page already has extra containers', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const a = new AccessibilityWidget()
    a.mount()
    expect(document.getElementById(HOST_WRAPPER_ID)).not.toBeNull()
    a.destroy()
  })

  it('injects the styles tag into head', () => {
    const a = new AccessibilityWidget()
    a.mount()
    expect(document.getElementById('accessibility-widget-styles')).not.toBeNull()
    a.destroy()
  })

  it('removes accessibility-widget-root on destroy', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.destroy()
    expect(document.querySelector('.accessibility-widget-root')).toBeNull()
  })

  it('removes host wrapper on destroy', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.destroy()
    expect(document.getElementById(HOST_WRAPPER_ID)).toBeNull()
  })
})

describe('Accessibility Widget — open / close / toggle', () => {
  it('panel does not have .open class initially', () => {
    const a = new AccessibilityWidget()
    a.mount()
    expect(document.querySelector('.accessibility-widget-panel')?.classList.contains('open')).toBe(false)
    a.destroy()
  })

  it('open() adds .open class to panel', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.open()
    expect(document.querySelector('.accessibility-widget-panel')?.classList.contains('open')).toBe(true)
    a.destroy()
  })

  it('close() removes .open class from panel', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.open()
    a.close()
    expect(document.querySelector('.accessibility-widget-panel')?.classList.contains('open')).toBe(false)
    a.destroy()
  })

  it('toggle() flips open state', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.toggle()
    expect(a.getIsOpen()).toBe(true)
    a.toggle()
    expect(a.getIsOpen()).toBe(false)
    a.destroy()
  })

  it('Ctrl+U toggles the panel and prevents the browser shortcut', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const event = new KeyboardEvent('keydown', {
      key: 'u',
      code: 'KeyU',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    })

    const dispatched = document.dispatchEvent(event)

    expect(dispatched).toBe(false)
    expect(event.defaultPrevented).toBe(true)
    expect(a.getIsOpen()).toBe(true)
    a.destroy()
  })

  it('calls onOpen callback', () => {
    const onOpen = vi.fn()
    const a = new AccessibilityWidget({ onOpen })
    a.mount()
    a.open()
    expect(onOpen).toHaveBeenCalledOnce()
    a.destroy()
  })

  it('calls onClose callback', () => {
    const onClose = vi.fn()
    const a = new AccessibilityWidget({ onClose })
    a.mount()
    a.open()
    a.close()
    expect(onClose).toHaveBeenCalledOnce()
    a.destroy()
  })
})

describe('Accessibility Widget — reset', () => {
  it('resets state to defaults', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULT_STATE, fontSize: 5, legibleFonts: 2 }))
    const a = new AccessibilityWidget()
    a.mount()
    a.reset()
    expect(a.getState()).toEqual(DEFAULT_STATE)
    a.destroy()
  })

  it('calls onReset callback', () => {
    const onReset = vi.fn()
    const a = new AccessibilityWidget({ onReset })
    a.mount()
    a.reset()
    expect(onReset).toHaveBeenCalledOnce()
    a.destroy()
  })

  it('clears persisted state', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.reset()
    const stored = localStorage.getItem(STORAGE_KEY)
    expect(stored ? JSON.parse(stored) : {}).toEqual(DEFAULT_STATE)
    a.destroy()
  })
})

describe('Accessibility Widget — setSize', () => {
  it('updates panel data-size attribute', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.setSize('S')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.dataset.size).toBe('S')
    a.setSize('L')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.dataset.size).toBe('L')
    a.setSize('s')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.dataset.size).toBe('S')
    a.setSize('l')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.dataset.size).toBe('L')
    a.destroy()
  })
})

describe('Accessibility Widget — setPosition / setOffset', () => {
  it('setPosition moves both trigger and panel', () => {
    const a = new AccessibilityWidget({ position: 'right' })
    a.mount()
    a.setPosition('left')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-trigger')?.dataset.position).toBe('left')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.dataset.position).toBe('left')
    a.destroy()
  })

  it('applies offsetX / offsetY from config on mount', () => {
    const a = new AccessibilityWidget({ offsetX: 16, offsetY: 40 })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')
    expect(root?.style.getPropertyValue('--accessibility-widget-trigger-offset-x')).toBe('16px')
    expect(root?.style.getPropertyValue('--accessibility-widget-trigger-offset-y')).toBe('40px')
    a.destroy()
  })

  it('setOffsetX / setOffsetY update (and clear) the offset variables', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')
    a.setOffsetX(28)
    a.setOffsetY(12)
    expect(root?.style.getPropertyValue('--accessibility-widget-trigger-offset-x')).toBe('28px')
    expect(root?.style.getPropertyValue('--accessibility-widget-trigger-offset-y')).toBe('12px')
    a.setOffsetX(undefined)
    expect(root?.style.getPropertyValue('--accessibility-widget-trigger-offset-x')).toBe('')
    a.destroy()
  })
})
