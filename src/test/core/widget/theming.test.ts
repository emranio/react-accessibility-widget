import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { AccessibilityWidget } from '../../../core'

beforeEach(() => {
  document.body.innerHTML = '<p id="page-content">page</p>'
  localStorage.clear()
})

afterEach(() => {
  document.body.innerHTML = ''
  localStorage.clear()
})

describe('Accessibility Widget — branding', () => {
  it('uses a custom title in labels and panel header', () => {
    const a = new AccessibilityWidget({ title: 'Client Access Menu' })
    a.mount()
    expect(document.querySelector<HTMLElement>('.accessibility-widget-root')?.getAttribute('aria-label')).toBe('Client Access Menu')
    expect(document.querySelector<HTMLButtonElement>('.accessibility-widget-trigger')?.getAttribute('aria-label')).toBe('Open Client Access Menu')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-panel')?.getAttribute('aria-label')).toBe('Client Access Menu settings')
    expect(document.querySelector('.accessibility-widget-panel')?.innerHTML).toContain('Client Access Menu')
    a.destroy()
  })

  it('updates title at runtime', () => {
    const a = new AccessibilityWidget({ title: 'Original Menu' })
    a.mount()
    a.setTitle('Updated Menu')
    expect(document.querySelector<HTMLButtonElement>('.accessibility-widget-trigger')?.getAttribute('aria-label')).toBe('Open Updated Menu')
    expect(document.querySelector('.accessibility-widget-panel')?.innerHTML).toContain('Updated Menu')
    a.destroy()
  })

  it('uses accentColor for primary widget variables', () => {
    const a = new AccessibilityWidget({ accentColor: '#0f766e' })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-primary')).toBe('#0f766e')
    expect(root.style.getPropertyValue('--accessibility-widget-header-bg')).toBe('#0f766e')
    a.destroy()
  })

  it('lets accentColor override theme.primary and update at runtime', () => {
    const a = new AccessibilityWidget({ accentColor: '#0f766e', theme: { primary: '#17313f' } })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-primary')).toBe('#0f766e')
    a.setAccentColor('#b45309')
    expect(root.style.getPropertyValue('--accessibility-widget-primary')).toBe('#b45309')
    a.destroy()
  })

  it('falls back to theme.primary when accentColor is cleared', () => {
    const a = new AccessibilityWidget({ accentColor: '#0f766e', theme: { primary: '#17313f' } })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    a.setAccentColor(undefined)
    expect(root.style.getPropertyValue('--accessibility-widget-primary')).toBe('#17313f')
    a.destroy()
  })
})

describe('Accessibility Widget — triggerScheme', () => {
  const TRIGGER_AUTO_BG = 'var(--accessibility-widget-primary)'

  it('explicit triggerScheme="dark" → dark trigger', () => {
    const a = new AccessibilityWidget({ triggerScheme: 'dark' })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-bg')).toBe('#0c0c0c')
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-icon')).toBe('#ffffff')
    a.destroy()
  })

  it('explicit triggerScheme="light" → light trigger', () => {
    const a = new AccessibilityWidget({ triggerScheme: 'light' })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-bg')).toBe('#ffffff')
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-icon')).toBe('#0c0c0c')
    a.destroy()
  })

  it('triggerScheme unset → accent-filled trigger with white icon', () => {
    const a = new AccessibilityWidget()
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-bg')).toBe(TRIGGER_AUTO_BG)
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-icon')).toBe('#ffffff')
    a.destroy()
  })

  it('triggerScheme="auto" explicitly → accent-filled', () => {
    const a = new AccessibilityWidget({ triggerScheme: 'auto' })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-bg')).toBe(TRIGGER_AUTO_BG)
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-icon')).toBe('#ffffff')
    a.destroy()
  })

  it('setTriggerScheme updates trigger styling at runtime', () => {
    const a = new AccessibilityWidget({ triggerScheme: 'light' })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-bg')).toBe('#ffffff')
    a.setTriggerScheme('dark')
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-bg')).toBe('#0c0c0c')
    a.setTriggerScheme('auto')
    expect(root.style.getPropertyValue('--accessibility-widget-trigger-bg')).toBe(TRIGGER_AUTO_BG)
    a.destroy()
  })
})

describe('Accessibility Widget — readable accent foreground (on-primary)', () => {
  it('sets a light foreground for a dark accent', () => {
    const a = new AccessibilityWidget({ accentColor: '#1d4ed8' })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-on-primary')).toBe('#ffffff')
    a.destroy()
  })

  it('sets a dark foreground for a light accent', () => {
    const a = new AccessibilityWidget({ accentColor: '#fde047' })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    expect(root.style.getPropertyValue('--accessibility-widget-on-primary')).toBe('#0c0c0c')
    a.destroy()
  })

  it('clears on-primary when the accent is removed', () => {
    const a = new AccessibilityWidget({ accentColor: '#1d4ed8' })
    a.mount()
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')!
    a.setAccentColor(undefined)
    expect(root.style.getPropertyValue('--accessibility-widget-on-primary')).toBe('')
    a.destroy()
  })
})
