import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ensureHostWrapper, unwrapHost, clearEffects, HOST_WRAPPER_ID } from '../../../core/effects'

beforeEach(() => {
  document.body.innerHTML = '<p id="content">hello</p>'
})

afterEach(() => {
  clearEffects()
  unwrapHost()
  document.body.innerHTML = ''
})

describe('ensureHostWrapper', () => {
  it('creates the wrapper div in body', () => {
    ensureHostWrapper()
    expect(document.getElementById(HOST_WRAPPER_ID)).not.toBeNull()
  })

  it('moves existing body children into wrapper', () => {
    ensureHostWrapper()
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    expect(wrapper.querySelector('#content')).not.toBeNull()
  })

  it('does not move .accessibility-widget-root elements into wrapper', () => {
    const root = document.createElement('div')
    root.className = 'accessibility-widget-root'
    document.body.appendChild(root)
    ensureHostWrapper()
    expect(document.body.contains(root)).toBe(true)
    expect(document.getElementById(HOST_WRAPPER_ID)!.contains(root)).toBe(false)
  })

  it('is idempotent — calling twice returns same wrapper', () => {
    const a = ensureHostWrapper()
    const b = ensureHostWrapper()
    expect(a).toBe(b)
    expect(document.querySelectorAll(`#${HOST_WRAPPER_ID}`)).toHaveLength(1)
  })
})

describe('unwrapHost', () => {
  it('restores children back to body and removes wrapper', () => {
    ensureHostWrapper()
    unwrapHost()
    expect(document.getElementById(HOST_WRAPPER_ID)).toBeNull()
    expect(document.getElementById('content')).not.toBeNull()
  })

  it('is a no-op when wrapper does not exist', () => {
    expect(() => unwrapHost()).not.toThrow()
  })
})
