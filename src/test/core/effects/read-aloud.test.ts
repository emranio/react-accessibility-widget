import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { disableReadAloud, enableReadAloud } from '../../../core/effects/read-aloud'
import { ensureHostWrapper, unwrapHost } from '../../../core/effects/host'

interface SpeechMock {
  SpeechSynthesisUtterance?: unknown
  speechSynthesis?: unknown
}

let spoken: string[] = []

beforeEach(() => {
  spoken = []
  ;(window as unknown as SpeechMock).SpeechSynthesisUtterance = class {
    text: string
    onend: (() => void) | null = null
    onerror: (() => void) | null = null
    constructor(text: string) {
      this.text = text
    }
  }
  ;(window as unknown as SpeechMock).speechSynthesis = {
    speak: (u: { text: string }) => spoken.push(u.text),
    cancel: () => {},
  }
})

afterEach(() => {
  disableReadAloud()
  unwrapHost()
  document.body.innerHTML = ''
})

describe('read aloud', () => {
  it('speaks the text of a clicked host element', () => {
    document.body.innerHTML = '<p id="para">Hello world</p>'
    ensureHostWrapper()
    enableReadAloud()
    document.getElementById('para')!.click()
    expect(spoken.join(' ')).toContain('Hello world')
  })

  it('ignores clicks inside the widget UI', () => {
    document.body.innerHTML = '<div class="accessibility-widget-root"><button id="w">x</button></div><p>body</p>'
    ensureHostWrapper()
    enableReadAloud()
    document.getElementById('w')!.click()
    expect(spoken).toHaveLength(0)
  })

  it('no-ops cleanly when speechSynthesis is unavailable', () => {
    delete (window as unknown as SpeechMock).speechSynthesis
    expect(() => {
      enableReadAloud()
      disableReadAloud()
    }).not.toThrow()
  })
})
