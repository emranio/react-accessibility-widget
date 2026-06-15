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
})

describe('applyEffects — class toggles & dynamic CSS', () => {
  it('toggles accessibility-widget-effect-legible-fonts class and font variables', () => {
    const state = freshState()
    state.legibleFonts = 1
    applyEffects(state)
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    expect(wrapper.classList.contains('accessibility-widget-effect-legible-fonts')).toBe(true)
    expect(wrapper.style.getPropertyValue('--accessibility-widget-legible-font-family')).toBe('"Accessibility Widget OpenDyslexic"')
  })

  it('uses Atkinson Hyperlegible for the second legible font level', () => {
    const state = freshState()
    state.legibleFonts = 2
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.style.getPropertyValue('--accessibility-widget-legible-font-family')).toBe('"Accessibility Widget Atkinson Hyperlegible"')
  })

  it('removes accessibility-widget-effect-legible-fonts when false', () => {
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    wrapper.classList.add('accessibility-widget-effect-legible-fonts')
    applyEffects(freshState())
    expect(wrapper.classList.contains('accessibility-widget-effect-legible-fonts')).toBe(false)
  })

  it('toggles accessibility-widget-effect-highlight-titles', () => {
    const state = freshState()
    state.highlightTitles = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-highlight-titles')).toBe(true)
  })

  it('toggles accessibility-widget-effect-highlight-links', () => {
    const state = freshState()
    state.highlightLinks = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-highlight-links')).toBe(true)
  })

  it('toggles accessibility-widget-effect-dark-contrast', () => {
    const state = freshState()
    state.darkContrast = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-dark-contrast')).toBe(true)
  })

  it('toggles accessibility-widget-effect-light-contrast', () => {
    const state = freshState()
    state.lightContrast = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-light-contrast')).toBe(true)
  })

  it('toggles accessibility-widget-effect-high-contrast', () => {
    const state = freshState()
    state.highContrast = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-high-contrast')).toBe(true)
  })

  it('toggles accessibility-widget-effect-monochrome', () => {
    const state = freshState()
    state.monochrome = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-monochrome')).toBe(true)
  })

  it('toggles accessibility-widget-effect-invert for invertColors', () => {
    const state = freshState()
    state.invertColors = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-invert')).toBe(true)
  })

  it('toggles accessibility-widget-effect-color-blind and injects SVG filter', () => {
    const state = freshState()
    state.colorBlind = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-color-blind')).toBe(true)
    expect(document.getElementById('accessibility-widget-protanopia-filter')).not.toBeNull()
  })

  it('toggles accessibility-widget-effect-hide-images', () => {
    const state = freshState()
    state.hideImages = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-hide-images')).toBe(true)
  })

  it('toggles accessibility-widget-effect-off-animations', () => {
    const state = freshState()
    state.offAnimations = 1
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-off-animations')).toBe(true)
  })

  it('toggles accessibility-widget-effect-dyslexia for dyslexia profile', () => {
    const state = freshState()
    state.profile = 'dyslexia'
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-dyslexia')).toBe(true)
  })

  it('injects dynamic font-size CSS for non-zero fontSize', () => {
    const state = freshState()
    state.fontSize = 2
    applyEffects(state)
    const style = document.getElementById('accessibility-widget-host-effects') as HTMLStyleElement
    expect(style?.textContent).toContain('font-size:')
  })

  it('injects custom cursor CSS for big cursor', () => {
    const state = freshState()
    state.bigCursor = 2
    applyEffects(state)
    const style = document.getElementById('accessibility-widget-host-effects') as HTMLStyleElement
    expect(style?.textContent).toContain('cursor:')
    expect(style?.textContent).toContain('data:image/svg+xml')
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('accessibility-widget-effect-big-cursor')).toBe(true)
  })

  it('does nothing when wrapper is absent', () => {
    unwrapHost()
    expect(() => applyEffects(freshState())).not.toThrow()
  })
})

describe('clearEffects', () => {
  it('removes all accessibility-widget-effect-* classes from wrapper', () => {
    const state = freshState()
    state.legibleFonts = 1
    state.darkContrast = 1
    applyEffects(state)
    clearEffects()
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    const accessibilityWidgetEffectClasses = Array.from(wrapper.classList).filter(c => c.startsWith('accessibility-widget-effect-'))
    expect(accessibilityWidgetEffectClasses).toHaveLength(0)
  })

  it('clears dynamic style content', () => {
    const state = freshState()
    state.fontSize = 3
    applyEffects(state)
    clearEffects()
    const style = document.getElementById('accessibility-widget-host-effects') as HTMLStyleElement
    expect(style?.textContent ?? '').toBe('')
  })

  it('removes the color-blind SVG filter element', () => {
    const state = freshState()
    state.colorBlind = 1
    applyEffects(state)
    clearEffects()
    expect(document.getElementById('accessibility-widget-protanopia-filter')).toBeNull()
  })

  it('removes reading mask and guide overlays', () => {
    const state = freshState()
    state.readingMask = 1
    state.readingGuide = 1
    applyEffects(state)
    clearEffects()
    expect(document.querySelector('.accessibility-widget-reading-mask')).toBeNull()
    expect(document.querySelector('.accessibility-widget-reading-guide')).toBeNull()
  })

  it('is safe to call when nothing was applied', () => {
    expect(() => clearEffects()).not.toThrow()
  })
})
