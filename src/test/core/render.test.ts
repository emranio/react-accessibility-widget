import { describe, it, expect } from 'vitest'
import { renderPanel } from '../../core/render'
import { freshState } from '../helpers'

describe('renderPanel', () => {
  it('returns a non-empty HTML string', () => {
    const html = renderPanel(freshState(), 'S')
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
  })

  it('includes the header title', () => {
    expect(renderPanel(freshState(), 'S')).toContain('React Accessibility Widget')
  })

  it('renders a custom escaped header title', () => {
    const html = renderPanel(freshState(), 'S', { title: 'Team <Access> & QA' })
    expect(html).toContain('Team &lt;Access&gt; &amp; QA')
    expect(html).not.toContain('Team &lt;Access&gt; &amp; QA menu')
    expect(html).not.toContain('Team <Access> & QA')
  })

  it('includes Accessibility Settings subtitle', () => {
    expect(renderPanel(freshState(), 'S')).toContain('Accessibility Settings')
  })

  it('renders all 7 profile cards', () => {
    const html = renderPanel(freshState(), 'S')
    const profiles = [
      'seizure-safe', 'vision-impaired', 'light-sensitivity', 'color-blind',
      'dyslexia', 'adhd-friendly', 'cognitive-disability',
    ]
    for (const id of profiles) {
      expect(html, `missing profile: ${id}`).toContain(`data-profile="${id}"`)
    }
  })

  it('marks active profile as aria-pressed=true', () => {
    const state = freshState()
    state.profile = 'dyslexia'
    const html = renderPanel(state, 'S')
    expect(html).toContain('data-profile="dyslexia" aria-pressed="true"')
  })

  it('marks inactive profiles as aria-pressed=false', () => {
    const state = freshState()
    state.profile = 'dyslexia'
    const html = renderPanel(state, 'S')
    expect(html).toContain('data-profile="seizure-safe" aria-pressed="false"')
  })

  it('renders all stepper tiles', () => {
    const html = renderPanel(freshState(), 'S')
    expect(html).toContain('data-tool="fontSize"')
    expect(html).toContain('data-tool="lineHeight"')
    expect(html).toContain('data-tool="letterSpacing"')
  })

  it('renders variable level indicators only for multi-level tools', () => {
    const html = renderPanel(freshState(), 'S')
    expect(html).toContain('accessibility-widget-levels')
    expect(html).toContain('data-tool="fontSize" data-level="0" data-max-level="4"')
    expect(html).toContain('data-tool="highlightLinks" data-level="0" data-max-level="2"')
    expect(html).toContain('data-tool="legibleFonts" data-level="0" data-max-level="2"')
    expect(html).toContain('data-tool="textMagnifier" data-level="0" data-max-level="1"')
    expect(html).toContain('data-tool="readingLens" data-level="0" data-max-level="1"')
  })

  it('marks the active level bar for leveled tools', () => {
    const state = freshState()
    state.fontSize = 3
    const html = renderPanel(state, 'S')
    expect(html).toContain('data-tool="fontSize" data-level="3"')
    expect(html).toContain('accessibility-widget-level active')
  })

  it('renders all toggle tiles', () => {
    const html = renderPanel(freshState(), 'S')
    expect(html).toContain('data-tool="legibleFonts"')
    expect(html).toContain('data-tool="highlightTitles"')
    expect(html).toContain('data-tool="highlightLinks"')
    expect(html).toContain('data-tool="textMagnifier"')
    expect(html).toContain('data-tool="readingLens"')
    expect(html).toContain('data-tool="bigCursor"')
    expect(html).toContain('data-tool="readingMask"')
    expect(html).toContain('data-tool="readingGuide"')
    expect(html).toContain('data-tool="pageStructure"')
    expect(html).toContain('Page Structure')
  })

  it('marks active toggle tile as aria-pressed=true', () => {
    const state = freshState()
    state.legibleFonts = 1
    const html = renderPanel(state, 'S')
    expect(html).toContain('data-tool="legibleFonts" data-level="1" data-max-level="2" aria-pressed="true"')
    expect(html).toContain('Dyslexia Friendly')
  })

  it('marks page structure tile active when the dialog is open', () => {
    const html = renderPanel(freshState(), 'S', { pageStructureOpen: true })
    expect(html).toContain('data-tool="pageStructure" data-level="1" data-max-level="1" aria-pressed="true"')
  })

  it('renders the second legible font level with the general label', () => {
    const state = freshState()
    state.legibleFonts = 2
    const html = renderPanel(state, 'S')
    expect(html).toContain('data-tool="legibleFonts" data-level="2" data-max-level="2" aria-pressed="true"')
    expect(html).toContain('Legible Fonts')
  })

  it('renders all color tiles', () => {
    const html = renderPanel(freshState(), 'S')
    expect(html).toContain('Color')
    expect(html).toContain('data-tool="darkContrast"')
    expect(html).toContain('data-tool="lightContrast"')
    expect(html).toContain('data-tool="highContrast"')
    expect(html).toContain('data-tool="monochrome"')
    expect(html).toContain('data-tool="invertColors"')
    expect(html).toContain('data-tool="colorBlind"')
    expect(html).toContain('data-tool="hideImages"')
    expect(html).toContain('data-tool="offAnimations"')
    expect(html).toContain('Reduce Animations')
    expect(html).not.toContain('Off Animations')
    expect(html).toContain('data-tool="monochrome" data-level="0" data-max-level="1"')
    expect(html).toContain('data-tool="invertColors" data-level="0" data-max-level="1"')
    expect(html).toContain('data-tool="hideImages" data-level="0" data-max-level="1"')
    expect(html).toContain('data-tool="offAnimations" data-level="0" data-max-level="1"')
  })

  it('marks active color tile as aria-pressed=true', () => {
    const state = freshState()
    state.darkContrast = 3
    const html = renderPanel(state, 'S')
    expect(html).toContain('data-tool="darkContrast" data-level="3" data-max-level="3" aria-pressed="true"')
  })

  it('renders text alignment as a leveled tool', () => {
    const html = renderPanel(freshState(), 'S')
    expect(html).toContain('data-tool="textAlignment"')
  })

  it('maps alignment states to tool levels', () => {
    const state = freshState()
    state.textAlignment = 'center'
    const html = renderPanel(state, 'S')
    expect(html).toContain('data-tool="textAlignment" data-level="2" data-max-level="4" aria-pressed="true"')
  })

  it('renders a single large size switch', () => {
    const html = renderPanel(freshState(), 'S')
    expect(html).toContain('role="switch"')
    expect(html).toContain('Small')
    expect(html).toContain('Large')
    expect(html).toContain('data-size="L"')
    expect(html).toContain('aria-checked="false"')
  })

  it('marks L size switch as active', () => {
    const html = renderPanel(freshState(), 'L')
    expect(html).toContain('data-size="S"')
    expect(html).toContain('aria-checked="true"')
  })

  it('treats lowercase l size as active large', () => {
    const html = renderPanel(freshState(), 'l')
    expect(html).toContain('data-size="S"')
    expect(html).toContain('aria-checked="true"')
  })

  it('renders a widget position switch', () => {
    const html = renderPanel(freshState(), 'S')
    expect(html).toContain('Widget Position')
    expect(html).toContain('accessibility-widget-position-grid')
    expect(html).toContain('data-position="left"')
    expect(html).toContain('data-position="right"')
    expect(html).toContain('aria-label="Left"')
    expect(html).toContain('aria-label="Right"')
  })

  it('marks left position switch state', () => {
    const html = renderPanel(freshState(), 'S', { position: 'left' })
    expect(html).toContain('data-position="left" aria-pressed="true"')
    expect(html).toContain('data-position="right" aria-pressed="false"')
  })

  it('renders reset button with data-action=reset', () => {
    expect(renderPanel(freshState(), 'S')).toContain('data-action="reset"')
  })

  it('orders tool sections as visibility, color, then content after profiles', () => {
    const html = renderPanel(freshState(), 'S')
    const profiles = html.indexOf('data-section="profiles"')
    const visibility = html.indexOf('data-section="visibility"')
    const color = html.indexOf('data-section="color"')
    const content = html.indexOf('data-section="content"')

    expect(profiles).toBeGreaterThan(-1)
    expect(visibility).toBeGreaterThan(profiles)
    expect(color).toBeGreaterThan(visibility)
    expect(content).toBeGreaterThan(color)
  })

  it('renders close button', () => {
    expect(renderPanel(freshState(), 'S')).toContain('accessibility-widget-close')
  })

  it('does not render page analysis controls', () => {
    const html = renderPanel(freshState(), 'S')
    expect(html).not.toContain('Page Analysis')
  })

  it('renders tooltip text for every profile and widget tool', () => {
    const html = renderPanel(freshState(), 'S')
    const tooltipCount = (html.match(/accessibility-widget-tooltip/g) ?? []).length
    expect(tooltipCount).toBe(32)
    expect(html).toContain('Stops animation, hides images')
    expect(html).toContain('Increases page text size across four levels.')
    expect(html).toContain('Opens a headings, landmarks, and links navigator')
  })
})
