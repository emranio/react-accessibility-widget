import { describe, it, expect, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { AccessibilityWidget } from '../../react/index'

afterEach(() => {
  document.body.innerHTML = ''
  localStorage.clear()
})

describe('AccessibilityWidget', () => {
  it('renders without crashing', () => {
    const { container } = render(<AccessibilityWidget />)
    expect(container).toBeTruthy()
  })

  it('mounts accessibility-widget-root into the container', () => {
    render(<AccessibilityWidget />)
    expect(document.querySelector('.accessibility-widget-root')).not.toBeNull()
  })

  it('injects styles into head', () => {
    render(<AccessibilityWidget />)
    expect(document.getElementById('accessibility-widget-styles')).not.toBeNull()
  })

  it('renders the trigger button', () => {
    render(<AccessibilityWidget />)
    expect(document.querySelector('.accessibility-widget-trigger')).not.toBeNull()
  })

  it('renders the panel', () => {
    render(<AccessibilityWidget />)
    expect(document.querySelector('.accessibility-widget-panel')).not.toBeNull()
  })

  it('unmounting destroys the widget and removes accessibility-widget-root', () => {
    const { unmount } = render(<AccessibilityWidget />)
    unmount()
    expect(document.querySelector('.accessibility-widget-root')).toBeNull()
  })

  it('applies position prop to trigger', () => {
    render(<AccessibilityWidget position="top-left" />)
    const trigger = document.querySelector<HTMLButtonElement>('.accessibility-widget-trigger')
    expect(trigger?.dataset.position).toBe('top-left')
  })

  it('applies size prop to panel', () => {
    render(<AccessibilityWidget size="S" />)
    const panel = document.querySelector<HTMLElement>('.accessibility-widget-panel')
    expect(panel?.dataset.size).toBe('S')
  })

  it('applies colorScheme="dark" to root data-scheme', () => {
    render(<AccessibilityWidget colorScheme="dark" />)
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')
    expect(root?.dataset.scheme).toBe('dark')
  })

  it('applies colorScheme="light" to root data-scheme', () => {
    render(<AccessibilityWidget colorScheme="light" />)
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')
    expect(root?.dataset.scheme).toBe('light')
  })

  it('only one accessibility-widget-root when AccessibilityWidget is rendered once', () => {
    render(<AccessibilityWidget colorScheme="dark" />)
    expect(document.querySelectorAll('.accessibility-widget-root').length).toBe(1)
  })

  it('updates title and accent props at runtime', () => {
    const { rerender } = render(<AccessibilityWidget title="First Menu" accentColor="#0f766e" />)
    expect(document.querySelector('.accessibility-widget-panel')?.innerHTML).toContain('First Menu')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-root')?.style.getPropertyValue('--accessibility-widget-primary')).toBe('#0f766e')

    rerender(<AccessibilityWidget title="Second Menu" accentColor="#b45309" />)

    expect(document.querySelector('.accessibility-widget-panel')?.innerHTML).toContain('Second Menu')
    expect(document.querySelector<HTMLElement>('.accessibility-widget-root')?.style.getPropertyValue('--accessibility-widget-primary')).toBe('#b45309')
  })

  it('updates theme prop at runtime', () => {
    const { rerender } = render(<AccessibilityWidget theme={{ primary: '#17313f', background: '#fffaf3', text: '#17212b' }} />)
    const root = document.querySelector<HTMLElement>('.accessibility-widget-root')
    expect(root?.style.getPropertyValue('--accessibility-widget-primary')).toBe('#17313f')

    rerender(<AccessibilityWidget theme={{ primary: '#1f4d3c', background: '#fbf8f1', text: '#1b241f' }} />)

    expect(root?.style.getPropertyValue('--accessibility-widget-primary')).toBe('#1f4d3c')
    expect(root?.style.getPropertyValue('--accessibility-widget-bg')).toBe('#fbf8f1')
  })
})
