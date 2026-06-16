import { afterEach, describe, expect, it } from 'vitest'
import { applyEffects, clearEffects, ensureHostWrapper, unwrapHost } from '../../core/effects'
import { PROFILE_PRESETS } from '../../core/profiles'
import { DEFAULT_STATE } from '../../core/types'

afterEach(() => {
  clearEffects()
  unwrapHost()
  document.body.innerHTML = ''
})

describe('P1 profiles', () => {
  it('keyboard-motor bundles focus highlight, big cursor, and link highlighting', () => {
    expect(PROFILE_PRESETS['keyboard-motor']).toMatchObject({
      focusHighlight: 1,
      bigCursor: 2,
      highlightLinks: 2,
    })
  })

  it('blind-screen-reader bundles read-aloud and emphasis tools', () => {
    expect(PROFILE_PRESETS['blind-screen-reader']).toMatchObject({
      readAloud: 1,
      highlightTitles: 2,
      highlightLinks: 2,
      legibleFonts: 2,
    })
  })
})

describe('focus highlight effect', () => {
  it('toggles the host effect class with focusHighlight state', () => {
    ensureHostWrapper()
    applyEffects({ ...DEFAULT_STATE, focusHighlight: 1 })
    const host = document.getElementById('accessibility-widget-host')
    expect(host?.classList.contains('accessibility-widget-effect-focus-highlight')).toBe(true)
    applyEffects({ ...DEFAULT_STATE })
    expect(host?.classList.contains('accessibility-widget-effect-focus-highlight')).toBe(false)
  })
})
