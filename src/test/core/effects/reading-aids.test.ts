import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ensureHostWrapper, unwrapHost, applyEffects, clearEffects, HOST_WRAPPER_ID } from '../../../core/effects'
import { freshState } from '../../helpers'

beforeEach(() => {
  document.body.innerHTML = '<p id="content">hello</p>'
  ensureHostWrapper()
})

afterEach(() => {
  clearEffects()
  unwrapHost()
  document.body.innerHTML = ''
  vi.restoreAllMocks()
  const mockedElementFromPoint = (document as unknown as { elementFromPoint?: unknown }).elementFromPoint
  if (vi.isMockFunction(mockedElementFromPoint)) {
    delete (document as unknown as { elementFromPoint?: Document['elementFromPoint'] }).elementFromPoint
  }
  vi.unstubAllGlobals()
})

describe('text magnifier', () => {
  it('normalizes text magnifier content from form controls', () => {
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    wrapper.innerHTML = `
      <section id="controls">
        <label>Position
          <select>
            <option selected>Bottom right</option>
            <option>Bottom left</option>
            <option>Top right</option>
          </select>
        </label>
        <label>Size
          <select>
            <option>Small</option>
            <option selected>Medium</option>
            <option>Large</option>
          </select>
        </label>
      </section>
    `
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: vi.fn(() => wrapper.querySelector('#controls')),
    })

    const state = freshState()
    state.textMagnifier = 1
    applyEffects(state)
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 140, bubbles: true }))

    const magnifierText = document.querySelector('.accessibility-widget-magnify-cursor')?.textContent
    expect(magnifierText).toContain('Position Bottom right Size Medium')
    expect(magnifierText).not.toContain('Bottom rightBottom left')
    expect(magnifierText).not.toContain('SmallMediumLarge')
  })
})

describe('reading lens', () => {
  it('mounts reading lens element when readingLens is true', () => {
    const state = freshState()
    state.readingLens = 1
    applyEffects(state)
    expect(document.querySelector('.accessibility-widget-reading-lens')).not.toBeNull()
    expect(document.querySelector('.accessibility-widget-reading-lens-inner')).not.toBeNull()
  })

  it('removes reading lens element when readingLens turns off', () => {
    const state = freshState()
    state.readingLens = 1
    applyEffects(state)
    state.readingLens = 0
    applyEffects(state)
    expect(document.querySelector('.accessibility-widget-reading-lens')).toBeNull()
  })

  it('does NOT add accessibility-widget-reading-lens class to wrapper (avoids style collision with the lens element)', () => {
    const state = freshState()
    state.readingLens = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)?.classList.contains('accessibility-widget-reading-lens')).toBe(false)
  })

  it('reading lens mirrors live input values into the clone', () => {
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    const input = document.createElement('input')
    input.type = 'text'
    input.defaultValue = ''      // attribute is empty
    wrapper.appendChild(input)
    input.value = 'typed text'   // IDL value differs from attribute

    const state = freshState()
    state.readingLens = 1
    applyEffects(state)

    const lensInput = document.querySelector<HTMLInputElement>('.accessibility-widget-reading-lens-inner input')
    expect(lensInput).not.toBeNull()
    expect(lensInput!.value).toBe('typed text')
  })

  it('reading lens mirrors live <select> selected index into the clone', () => {
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    const select = document.createElement('select')
    select.innerHTML = '<option>a</option><option>b</option><option>c</option>'
    wrapper.appendChild(select)
    select.selectedIndex = 2

    const state = freshState()
    state.readingLens = 1
    applyEffects(state)

    const lensSelect = document.querySelector<HTMLSelectElement>('.accessibility-widget-reading-lens-inner select')
    expect(lensSelect).not.toBeNull()
    expect(lensSelect!.selectedIndex).toBe(2)
  })

  it('keeps the reading lens clone stable while visible', () => {
    vi.stubGlobal('requestAnimationFrame', () => 1)
    vi.stubGlobal('cancelAnimationFrame', () => undefined)

    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    wrapper.innerHTML = '<article><h1>Stable heading</h1><p>Stable lens content</p></article>'

    const state = freshState()
    state.readingLens = 1
    applyEffects(state)

    wrapper.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 140, bubbles: true }))
    const visibleClone = document.querySelector('.accessibility-widget-reading-lens-inner')?.firstElementChild
    expect(visibleClone).not.toBeNull()

    wrapper.dispatchEvent(new MouseEvent('mousemove', { clientX: 124, clientY: 146, bubbles: true }))
    applyEffects(state)

    const cloneAfterMoveAndEffect = document.querySelector('.accessibility-widget-reading-lens-inner')?.firstElementChild
    expect(cloneAfterMoveAndEffect).toBe(visibleClone)
  })

  it('does not reset the reading lens transform during effect commits', () => {
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0)
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', () => undefined)

    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    wrapper.innerHTML = '<article><h1>Stable heading</h1><p>Stable lens content</p></article>'

    const state = freshState()
    state.readingLens = 1
    applyEffects(state)
    wrapper.dispatchEvent(new MouseEvent('mousemove', { clientX: 120, clientY: 140, bubbles: true }))

    const inner = document.querySelector<HTMLElement>('.accessibility-widget-reading-lens-inner')
    expect(inner?.style.transform).toContain('translate3d')
    const transformBeforeEffectCommit = inner?.style.transform

    applyEffects(state)

    expect(document.querySelector<HTMLElement>('.accessibility-widget-reading-lens-inner')?.style.transform).toBe(transformBeforeEffectCommit)
  })
})

describe('reading mask', () => {
  it('mounts reading mask element when readingMask is true', () => {
    const state = freshState()
    state.readingMask = 1
    applyEffects(state)
    expect(document.querySelector('.accessibility-widget-reading-mask')).not.toBeNull()
    expect(document.querySelectorAll('.accessibility-widget-reading-mask-panel')).toHaveLength(2)
  })

  it('removes reading mask element when readingMask turns off', () => {
    const state = freshState()
    state.readingMask = 1
    applyEffects(state)
    state.readingMask = 0
    applyEffects(state)
    expect(document.querySelector('.accessibility-widget-reading-mask')).toBeNull()
  })
})

describe('reading guide', () => {
  it('mounts reading guide element when readingGuide is true', () => {
    const state = freshState()
    state.readingGuide = 1
    applyEffects(state)
    expect(document.querySelector('.accessibility-widget-reading-guide')).not.toBeNull()
    expect(document.querySelector('.accessibility-widget-reading-guide-pointer')).not.toBeNull()
  })

  it('removes reading guide element when readingGuide turns off', () => {
    const state = freshState()
    state.readingGuide = 1
    applyEffects(state)
    state.readingGuide = 0
    applyEffects(state)
    expect(document.querySelector('.accessibility-widget-reading-guide')).toBeNull()
  })
})
