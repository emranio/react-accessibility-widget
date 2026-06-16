import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { AccessibilityWidget } from '../../../core'
import { DEFAULT_STATE, STORAGE_KEY, type AccessibilityProfile, type AccessibilityWidgetState } from '../../../core/types'

beforeEach(() => {
  document.body.innerHTML = '<p id="page-content">page</p>'
  localStorage.clear()
})

afterEach(() => {
  document.body.innerHTML = ''
  localStorage.clear()
})

/** Expected full state each profile maps to (state minus profile + defaults).
 *  Must stay in lockstep with PROFILE_PRESETS in src/core/profiles.ts. */
const EXPECTED_PROFILE_PRESETS = {
  'seizure-safe': {
    offAnimations: 1,
    hideImages: 1,
    monochrome: 1,
  },
  'vision-impaired': {
    fontSize: 4,
    lineHeight: 1,
    highContrast: 2,
    bigCursor: 2,
  },
  'light-sensitivity': {
    darkContrast: 2,
    offAnimations: 1,
  },
  'color-blind': {
    colorBlind: 1,
    highlightLinks: 2,
  },
  'dyslexia': {
    legibleFonts: 1,
    lineHeight: 2,
    letterSpacing: 2,
    textAlignment: 'left',
  },
  'adhd-friendly': {
    readingMask: 2,
    offAnimations: 1,
    highlightLinks: 1,
  },
  'cognitive-disability': {
    legibleFonts: 2,
    fontSize: 1,
    lineHeight: 1,
    highlightTitles: 2,
    highlightLinks: 2,
  },
  'keyboard-motor': {
    focusHighlight: 1,
    bigCursor: 2,
    highlightLinks: 2,
  },
  'blind-screen-reader': {
    readAloud: 1,
    highlightTitles: 2,
    highlightLinks: 2,
    legibleFonts: 2,
  },
} satisfies Record<AccessibilityProfile, Partial<AccessibilityWidgetState>>

describe('Accessibility Widget — panel click interactions', () => {
  it('close button closes the panel', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.open()
    const closeBtn = document.querySelector<HTMLButtonElement>('.accessibility-widget-close')!
    closeBtn.click()
    expect(a.getIsOpen()).toBe(false)
    a.destroy()
  })

  it('reset button resets state', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    const resetBtn = panel.querySelector<HTMLButtonElement>('[data-action="reset"]')!
    resetBtn.click()
    expect(a.getState()).toEqual(DEFAULT_STATE)
    a.destroy()
  })

  it('profile button activates profile', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    const profileBtn = panel.querySelector<HTMLButtonElement>('[data-profile="dyslexia"]')!
    profileBtn.click()
    expect(a.getState().profile).toBe('dyslexia')
    a.destroy()
  })

  for (const [profile, preset] of Object.entries(EXPECTED_PROFILE_PRESETS) as Array<[AccessibilityProfile, Partial<AccessibilityWidgetState>]>) {
    it(`maps the ${profile} profile to its full tool preset`, () => {
      const a = new AccessibilityWidget()
      a.mount()
      document.querySelector<HTMLButtonElement>(`.accessibility-widget-panel [data-profile="${profile}"]`)!.click()
      expect(a.getState()).toEqual({ ...DEFAULT_STATE, profile, ...preset })
      a.destroy()
    })
  }

  it('clicking active profile resets to default state', () => {
    const a = new AccessibilityWidget()
    a.mount()
    // Query fresh after each click — panel innerHTML is replaced on state change
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-profile="dyslexia"]')!.click()
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-profile="dyslexia"]')!.click()
    expect(a.getState().profile).toBeNull()
    a.destroy()
  })

  it('legible font tile advances to the first font level', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    panel.querySelector<HTMLButtonElement>('[data-tool="legibleFonts"]')!.click()
    expect(a.getState().legibleFonts).toBe(1)
    a.destroy()
  })

  it('page structure tile opens headings, landmarks, and links tabs', () => {
    document.body.innerHTML = `
      <header><nav aria-label="Main menu"><a href="#intro">Intro link</a></nav></header>
      <main>
        <h1>Demo heading</h1>
        <section aria-label="Feature section"><h2>Feature heading</h2></section>
        <a href="https://example.com" target="_blank">External resource</a>
      </main>
    `
    const a = new AccessibilityWidget()
    a.mount()

    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="pageStructure"]')!.click()
    expect(document.querySelector('.accessibility-widget-structure-dialog')).not.toBeNull()
    expect(document.querySelector('.accessibility-widget-structure-dialog')?.textContent).toContain('Demo heading')
    expect(document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="pageStructure"]')?.getAttribute('aria-pressed')).toBe('true')

    document.querySelector<HTMLButtonElement>('[data-structure-tab="landmarks"]')!.click()
    expect(document.querySelector('.accessibility-widget-structure-dialog')?.textContent).toContain('Main')
    expect(document.querySelector('.accessibility-widget-structure-dialog')?.textContent).toContain('Navigation: Main menu')

    document.querySelector<HTMLButtonElement>('[data-structure-tab="links"]')!.click()
    expect(document.querySelector('.accessibility-widget-structure-dialog')?.textContent).toContain('External resource')

    document.querySelector<HTMLButtonElement>('[data-structure-action="close"]')!.click()
    expect(document.querySelector<HTMLElement>('.accessibility-widget-structure-layer')?.hidden).toBe(true)
    expect(document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="pageStructure"]')?.getAttribute('aria-pressed')).toBe('false')
    a.destroy()
  })

  it('color tile toggles color flag', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    panel.querySelector<HTMLButtonElement>('[data-tool="monochrome"]')!.click()
    expect(a.getState().monochrome).toBe(1)
    a.destroy()
  })

  it('activating a color flag turns off exclusive others', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    panel.querySelector<HTMLButtonElement>('[data-tool="darkContrast"]')!.click()
    panel.querySelector<HTMLButtonElement>('[data-tool="lightContrast"]')!.click()
    const state = a.getState()
    expect(state.lightContrast).toBe(1)
    expect(state.darkContrast).toBe(0)
    a.destroy()
  })

  it('tool click advances a level-based control', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    panel.querySelector<HTMLButtonElement>('[data-tool="fontSize"]')!.click()
    expect(a.getState().fontSize).toBe(1)
    a.destroy()
  })

  it('preserves panel scroll and focused tool after a tool click re-renders', () => {
    const a = new AccessibilityWidget()
    a.mount()
    a.open()

    const body = document.querySelector<HTMLElement>('.accessibility-widget-body')!
    body.scrollTop = 180
    const tile = document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="fontSize"]')!
    tile.focus()
    tile.click()

    const nextBody = document.querySelector<HTMLElement>('.accessibility-widget-body')!
    const nextTile = document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="fontSize"]')!
    expect(nextBody.scrollTop).toBe(180)
    expect(document.activeElement).toBe(nextTile)
    a.destroy()
  })

  it('new visual reading tools advance as level-based controls', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    panel.querySelector<HTMLButtonElement>('[data-tool="bigCursor"]')!.click()
    panel.querySelector<HTMLButtonElement>('[data-tool="readingMask"]')!.click()
    panel.querySelector<HTMLButtonElement>('[data-tool="readingGuide"]')!.click()
    const state = a.getState()
    expect(state.bigCursor).toBe(1)
    expect(state.readingMask).toBe(1)
    expect(state.readingGuide).toBe(1)
    a.destroy()
  })

  it('visual adjustment toggles turn on and off', () => {
    const a = new AccessibilityWidget()
    a.mount()
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="hideImages"]')!.click()
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="offAnimations"]')!.click()
    expect(a.getState().hideImages).toBe(1)
    expect(a.getState().offAnimations).toBe(1)
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="hideImages"]')!.click()
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="offAnimations"]')!.click()
    expect(a.getState().hideImages).toBe(0)
    expect(a.getState().offAnimations).toBe(0)
    a.destroy()
  })

  it('tool click turns off after the configured max level', () => {
    const a = new AccessibilityWidget()
    a.mount()
    for (let i = 0; i < 4; i++) {
      document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="fontSize"]')!.click()
    }
    expect(a.getState().fontSize).toBe(4)
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="fontSize"]')!.click()
    expect(a.getState().fontSize).toBe(0)
    a.destroy()
  })

  it('three-level tools turn off after level 3', () => {
    const a = new AccessibilityWidget()
    a.mount()
    for (let i = 0; i < 3; i++) {
      document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="bigCursor"]')!.click()
    }
    expect(a.getState().bigCursor).toBe(3)
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="bigCursor"]')!.click()
    expect(a.getState().bigCursor).toBe(0)
    a.destroy()
  })

  it('magnifier, lens, monochrome, and invert are toggle-only tools', () => {
    const a = new AccessibilityWidget()
    a.mount()
    for (const tool of ['textMagnifier', 'readingLens', 'monochrome', 'invertColors'] as const) {
      document.querySelector<HTMLButtonElement>(`.accessibility-widget-panel [data-tool="${tool}"]`)!.click()
      expect(a.getState()[tool]).toBe(1)
      document.querySelector<HTMLButtonElement>(`.accessibility-widget-panel [data-tool="${tool}"]`)!.click()
      expect(a.getState()[tool]).toBe(0)
    }
    a.destroy()
  })

  it('two-level tools turn off after level 2', () => {
    const a = new AccessibilityWidget()
    a.mount()
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="legibleFonts"]')!.click()
    expect(a.getState().legibleFonts).toBe(1)
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="legibleFonts"]')!.click()
    expect(a.getState().legibleFonts).toBe(2)
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="legibleFonts"]')!.click()
    expect(a.getState().legibleFonts).toBe(0)
    a.destroy()
  })

  it('alignment tool cycles through the alignment presets', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    panel.querySelector<HTMLButtonElement>('[data-tool="textAlignment"]')!.click()
    expect(a.getState().textAlignment).toBe('left')
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="textAlignment"]')!.click()
    expect(a.getState().textAlignment).toBe('center')
    a.destroy()
  })

  it('alignment tool wraps back to the first level', () => {
    const a = new AccessibilityWidget()
    a.mount()
    for (let i = 0; i < 4; i++) {
      document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="textAlignment"]')!.click()
    }
    expect(a.getState().textAlignment).toBe('justify')
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel [data-tool="textAlignment"]')!.click()
    expect(a.getState().textAlignment).toBe('left')
    a.destroy()
  })

  it('L size switch changes widget size', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    const sizeBtn = panel.querySelector<HTMLButtonElement>('.accessibility-widget-size-switch')!
    sizeBtn.click()
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.dataset.size).toBe('L')
    document.querySelector<HTMLButtonElement>('.accessibility-widget-panel .accessibility-widget-size-switch')!.click()
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.dataset.size).toBe('S')
    a.destroy()
  })

  it('position switch changes widget anchor', () => {
    const a = new AccessibilityWidget({ position: 'right' })
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    const positionBtn = panel.querySelector<HTMLButtonElement>('.accessibility-widget-position-option[data-position="left"]')!
    expect(positionBtn.getAttribute('aria-pressed')).toBe('false')

    positionBtn.click()

    expect(document.querySelector<HTMLElement>('.accessibility-widget-trigger')?.dataset.position).toBe('left')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.dataset.position).toBe('left')
    expect(document.querySelector<HTMLButtonElement>('.accessibility-widget-panel .accessibility-widget-position-option[data-position="left"]')?.getAttribute('aria-pressed')).toBe('true')
    a.destroy()
  })
})

describe('Accessibility Widget — persistence', () => {
  it('saves state to localStorage on change', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    panel.querySelector<HTMLButtonElement>('[data-tool="legibleFonts"]')!.click()
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.legibleFonts).toBe(1)
    a.destroy()
  })

  it('does not write to localStorage when persistence=false', () => {
    const a = new AccessibilityWidget({ persistence: false })
    a.mount()
    const panel = document.querySelector('.accessibility-widget-panel')!
    panel.querySelector<HTMLButtonElement>('[data-tool="legibleFonts"]')!.click()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    a.destroy()
  })
})
