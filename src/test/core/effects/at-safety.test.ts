import { afterEach, describe, expect, it } from 'vitest'
import { disableReadingLens, enableReadingLens } from '../../../core/effects/reading-lens'
import { disableMagnifier, enableMagnifier } from '../../../core/effects/magnifier'

afterEach(() => {
  disableReadingLens()
  disableMagnifier()
})

describe('overlay assistive-technology safety', () => {
  it('reading lens is hidden from AT and removed from the tab order', () => {
    enableReadingLens(1)
    const lens = document.querySelector('.accessibility-widget-reading-lens')
    expect(lens).not.toBeNull()
    expect(lens?.getAttribute('aria-hidden')).toBe('true')
    // inert removes the cloned host subtree from the tab order entirely.
    expect(lens?.hasAttribute('inert')).toBe(true)
  })

  it('text magnifier tooltip is hidden from AT (it duplicates page text)', () => {
    enableMagnifier(1)
    const mag = document.querySelector('.accessibility-widget-magnify-cursor')
    expect(mag).not.toBeNull()
    expect(mag?.getAttribute('aria-hidden')).toBe('true')
  })
})
