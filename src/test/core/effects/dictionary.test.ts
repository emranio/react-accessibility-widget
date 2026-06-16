import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { disableDictionary, enableDictionary, setDictionaryLookup } from '../../../core/effects/dictionary'
import { ensureHostWrapper, unwrapHost } from '../../../core/effects/host'

beforeEach(() => {
  setDictionaryLookup(async (word: string) => `definition of ${word}`)
  ;(window as unknown as { getSelection: () => unknown }).getSelection = () => ({ toString: () => 'cat' })
})

afterEach(() => {
  disableDictionary()
  setDictionaryLookup(null)
  unwrapHost()
  document.body.innerHTML = ''
})

describe('dictionary', () => {
  it('shows a definition popover when double-clicking a host word', async () => {
    document.body.innerHTML = '<p id="p">cat</p>'
    ensureHostWrapper()
    enableDictionary()
    document.getElementById('p')!.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, clientX: 10, clientY: 10 }))
    const popover = document.querySelector('.accessibility-widget-dictionary-popover')
    expect(popover).not.toBeNull()
    expect(popover?.textContent).toContain('cat')
    await vi.waitFor(() => {
      expect(document.querySelector('.accessibility-widget-dictionary-popover')?.textContent).toContain('definition of cat')
    })
  })

  it('ignores double-clicks inside the widget UI', () => {
    document.body.innerHTML = '<div class="accessibility-widget-root"><span id="w">cat</span></div>'
    ensureHostWrapper()
    enableDictionary()
    document.getElementById('w')!.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    expect(document.querySelector('.accessibility-widget-dictionary-popover')).toBeNull()
  })
})
