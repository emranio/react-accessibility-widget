import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { disableSimplify, enableSimplify, setSimplifyProvider } from '../../../core/effects/simplify'
import { ensureHostWrapper, unwrapHost } from '../../../core/effects/host'

beforeEach(() => {
  setSimplifyProvider(async (text: string) => `simple: ${text}`)
  ;(window as unknown as { getSelection: () => unknown }).getSelection = () => ({ toString: () => 'complex sentence' })
})

afterEach(() => {
  disableSimplify()
  setSimplifyProvider(null)
  unwrapHost()
  document.body.innerHTML = ''
})

describe('simplify', () => {
  it('offers a Simplify action on selection and shows the result', async () => {
    document.body.innerHTML = '<p id="p">complex sentence</p>'
    ensureHostWrapper()
    enableSimplify()
    document.getElementById('p')!.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: 10, clientY: 10 }))
    const action = document.querySelector<HTMLButtonElement>('.accessibility-widget-simplify-action')
    expect(action).not.toBeNull()
    action!.click()
    await vi.waitFor(() => {
      expect(document.querySelector('.accessibility-widget-simplify-popover')?.textContent).toContain('simple: complex sentence')
    })
  })

  it('does nothing without a provider', () => {
    setSimplifyProvider(null)
    document.body.innerHTML = '<p id="p">x</p>'
    ensureHostWrapper()
    enableSimplify()
    document.getElementById('p')!.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(document.querySelector('.accessibility-widget-simplify-action')).toBeNull()
  })
})
