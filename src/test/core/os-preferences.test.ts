import { afterEach, describe, expect, it } from 'vitest'
import { osPreferenceDefaults, readOsPreferences } from '../../core/os-preferences'

type MqlMap = Record<string, boolean>

function mockMatchMedia(map: MqlMap) {
  window.matchMedia = ((query: string) => ({
    matches: !!map[query],
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false
    },
  })) as unknown as typeof window.matchMedia
}

afterEach(() => {
  mockMatchMedia({})
})

describe('readOsPreferences', () => {
  it('reads reduced-motion, increased-contrast, and color-scheme', () => {
    mockMatchMedia({
      '(prefers-reduced-motion: reduce)': true,
      '(prefers-contrast: more)': true,
      '(prefers-color-scheme: dark)': true,
    })
    expect(readOsPreferences()).toEqual({ reducedMotion: true, moreContrast: true, dark: true })
  })

  it('returns all-false when nothing matches', () => {
    mockMatchMedia({})
    expect(readOsPreferences()).toEqual({ reducedMotion: false, moreContrast: false, dark: false })
  })
})

describe('osPreferenceDefaults', () => {
  it('maps reduced-motion to Reduce Animations', () => {
    expect(osPreferenceDefaults({ reducedMotion: true, moreContrast: false, dark: false })).toEqual({ offAnimations: 1 })
  })

  it('maps increased-contrast to High Contrast', () => {
    expect(osPreferenceDefaults({ reducedMotion: false, moreContrast: true, dark: false })).toEqual({ highContrast: 1 })
  })

  it('does NOT force a host effect from prefers-color-scheme: dark', () => {
    expect(osPreferenceDefaults({ reducedMotion: false, moreContrast: false, dark: true })).toEqual({})
  })
})
