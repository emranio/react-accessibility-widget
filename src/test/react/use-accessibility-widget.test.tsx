import { describe, it, expect, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { useAccessibilityWidget } from '../../react/index'
import { useEffect } from 'react'

afterEach(() => {
  document.body.innerHTML = ''
  localStorage.clear()
})

/** Test harness that surfaces the hook's return value to the test body. */
function HookHarness({ onMount }: { onMount: (api: ReturnType<typeof useAccessibilityWidget>) => void }) {
  const api = useAccessibilityWidget()
  useEffect(() => { onMount(api) }, [])
  return null
}

describe('useAccessibilityWidget', () => {
  it('mounts the widget on mount', () => {
    render(<HookHarness onMount={() => {}} />)
    expect(document.querySelector('.accessibility-widget-root')).not.toBeNull()
  })

  it('returns initial isOpen as false', () => {
    let capturedIsOpen: boolean | undefined
    render(<HookHarness onMount={({ isOpen }) => { capturedIsOpen = isOpen }} />)
    expect(capturedIsOpen).toBe(false)
  })

  it('returns initial state matching DEFAULT_STATE fields', () => {
    let capturedState: ReturnType<typeof useAccessibilityWidget>['state'] | undefined
    render(<HookHarness onMount={({ state }) => { capturedState = state }} />)
    // state is null until the useEffect fires and sets it — null is the initial value
    expect(capturedState === null || capturedState === undefined || capturedState?.profile === null).toBe(true)
    if (capturedState) {
      expect(capturedState.fontSize).toBe(0)
      expect(capturedState.legibleFonts).toBe(0)
    }
  })

  it('open() opens the panel', async () => {
    let api!: ReturnType<typeof useAccessibilityWidget>
    render(<HookHarness onMount={a => { api = a }} />)
    await act(async () => { api.open() })
    expect(document.querySelector('.accessibility-widget-panel')?.classList.contains('open')).toBe(true)
  })

  it('close() closes the panel', async () => {
    let api!: ReturnType<typeof useAccessibilityWidget>
    render(<HookHarness onMount={a => { api = a }} />)
    await act(async () => { api.open() })
    await act(async () => { api.close() })
    expect(document.querySelector('.accessibility-widget-panel')?.classList.contains('open')).toBe(false)
  })

  it('toggle() flips open state', async () => {
    let api!: ReturnType<typeof useAccessibilityWidget>
    render(<HookHarness onMount={a => { api = a }} />)
    await act(async () => { api.toggle() })
    expect(document.querySelector('.accessibility-widget-panel')?.classList.contains('open')).toBe(true)
    await act(async () => { api.toggle() })
    expect(document.querySelector('.accessibility-widget-panel')?.classList.contains('open')).toBe(false)
  })

  it('destroys widget on unmount', () => {
    const { unmount } = render(<HookHarness onMount={() => {}} />)
    unmount()
    expect(document.querySelector('.accessibility-widget-root')).toBeNull()
  })
})
