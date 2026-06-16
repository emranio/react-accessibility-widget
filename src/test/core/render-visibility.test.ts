import { describe, expect, it } from 'vitest'
import { renderPanel } from '../../core/render'
import { DEFAULT_STATE } from '../../core/types'

describe('renderPanel visibility', () => {
  it('shows all tools and profiles by default', () => {
    const html = renderPanel(DEFAULT_STATE, 'S', {})
    expect(html).toContain('data-tool="fontSize"')
    expect(html).toContain('data-tool="pageStructure"')
    expect(html).toContain('data-profile="dyslexia"')
  })

  it('hides specified tools but keeps the rest', () => {
    const html = renderPanel(DEFAULT_STATE, 'S', { hiddenTools: ['fontSize', 'darkContrast'] })
    expect(html).not.toContain('data-tool="fontSize"')
    expect(html).not.toContain('data-tool="darkContrast"')
    expect(html).toContain('data-tool="lineHeight"')
  })

  it('hides specified profiles but keeps the rest', () => {
    const html = renderPanel(DEFAULT_STATE, 'S', { hiddenProfiles: ['dyslexia'] })
    expect(html).not.toContain('data-profile="dyslexia"')
    expect(html).toContain('data-profile="seizure-safe"')
  })

  it('omits a section when all of its tools are hidden', () => {
    const html = renderPanel(DEFAULT_STATE, 'S', {
      hiddenTools: ['darkContrast', 'lightContrast', 'highContrast', 'monochrome', 'invertColors', 'colorBlind'],
    })
    expect(html).not.toContain('data-section="color"')
    // other sections remain
    expect(html).toContain('data-section="content"')
  })

  it('omits the profiles section when all profiles are hidden', () => {
    const html = renderPanel(DEFAULT_STATE, 'S', {
      hiddenProfiles: [
        'seizure-safe', 'vision-impaired', 'light-sensitivity', 'color-blind',
        'dyslexia', 'adhd-friendly', 'cognitive-disability', 'keyboard-motor', 'blind-screen-reader',
      ],
    })
    expect(html).not.toContain('data-section="profiles"')
    // settings section is always present
    expect(html).toContain('data-section="settings"')
  })
})
