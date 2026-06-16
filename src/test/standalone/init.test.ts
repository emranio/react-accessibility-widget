import { afterEach, describe, expect, it } from 'vitest'
import {
  destroy,
  getInstance,
  init,
  parseConfigFromElement,
  resolveConfig,
  autoInit,
} from '../../standalone/embed'

interface WidgetGlobal {
  AccessibilityWidgetConfig?: unknown
}

afterEach(() => {
  destroy()
  delete (window as unknown as WidgetGlobal).AccessibilityWidgetConfig
})

describe('parseConfigFromElement', () => {
  it('reads recognised data attributes into a config', () => {
    const el = document.createElement('script')
    el.dataset.title = 'Accessibility'
    el.dataset.accentColor = '#1d4ed8'
    el.dataset.position = 'left'
    el.dataset.size = 'l'
    el.dataset.offsetX = '32'
    el.dataset.offsetY = '24'
    el.dataset.triggerScheme = 'dark'
    el.dataset.persistence = 'false'

    expect(parseConfigFromElement(el)).toEqual({
      title: 'Accessibility',
      accentColor: '#1d4ed8',
      position: 'left',
      size: 'L',
      offsetX: 32,
      offsetY: 24,
      triggerScheme: 'dark',
      persistence: false,
    })
  })

  it('ignores invalid values and returns {} for null', () => {
    const el = document.createElement('script')
    el.dataset.position = 'sideways'
    el.dataset.offsetX = 'not-a-number'
    expect(parseConfigFromElement(el)).toEqual({})
    expect(parseConfigFromElement(null)).toEqual({})
  })
})

describe('resolveConfig', () => {
  it('merges global config with data attributes (attributes win)', () => {
    ;(window as unknown as WidgetGlobal).AccessibilityWidgetConfig = { title: 'Global', size: 'L' }
    const el = document.createElement('script')
    el.dataset.title = 'Attr'
    const { config, auto } = resolveConfig(el)
    expect(config.title).toBe('Attr')
    expect(config.size).toBe('L')
    expect(auto).toBe(true)
  })

  it('reports auto=false when data-auto="false"', () => {
    const el = document.createElement('script')
    el.dataset.auto = 'false'
    expect(resolveConfig(el).auto).toBe(false)
  })
})

describe('init / destroy', () => {
  it('mounts a single widget instance and tears it down', () => {
    const widget = init({ accentColor: '#123456' })
    expect(getInstance()).toBe(widget)
    expect(document.querySelector('.accessibility-widget-root')).not.toBeNull()

    // Idempotent: a second init returns the same instance.
    expect(init({ accentColor: '#000000' })).toBe(widget)

    destroy()
    expect(getInstance()).toBeNull()
    expect(document.querySelector('.accessibility-widget-root')).toBeNull()
  })
})

describe('autoInit', () => {
  it('mounts when not disabled', () => {
    const el = document.createElement('script')
    el.dataset.accentColor = '#abcdef'
    autoInit(el)
    expect(getInstance()).not.toBeNull()
  })

  it('does not mount when data-auto="false"', () => {
    const el = document.createElement('script')
    el.dataset.auto = 'false'
    autoInit(el)
    expect(getInstance()).toBeNull()
  })
})
