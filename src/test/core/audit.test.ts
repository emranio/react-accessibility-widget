import { afterEach, describe, expect, it } from 'vitest'
import { auditAccessibility } from '../../core/audit'

afterEach(() => {
  document.body.innerHTML = ''
})

describe('auditAccessibility', () => {
  it('flags images without alt, unlabeled controls, empty controls, and heading skips', () => {
    document.body.innerHTML = `
      <h1>Title</h1>
      <h3>Skipped from h1 to h3</h3>
      <img src="a.png">
      <input type="text" id="email">
      <a href="/x"></a>
      <button></button>
    `
    const rules = auditAccessibility(document.body).map(i => i.rule)
    expect(rules).toContain('image-alt')
    expect(rules).toContain('label')
    expect(rules).toContain('empty-control')
    expect(rules).toContain('heading-order')
  })

  it('does not flag well-formed content', () => {
    document.body.innerHTML = `
      <h1>Title</h1>
      <h2>Section</h2>
      <img src="a.png" alt="A cat">
      <label for="email">Email</label><input type="text" id="email">
      <a href="/x">Home</a>
      <button aria-label="Close">×</button>
    `
    expect(auditAccessibility(document.body)).toHaveLength(0)
  })

  it('ignores the widget’s own UI', () => {
    document.body.innerHTML = `<div class="accessibility-widget-root"><button></button><img src="x.png"></div>`
    expect(auditAccessibility(document.body)).toHaveLength(0)
  })

  it('accepts aria-label / wrapping label as a valid name', () => {
    document.body.innerHTML = `
      <label>Name <input type="text"></label>
      <input type="text" aria-label="Search">
    `
    expect(auditAccessibility(document.body).filter(i => i.rule === 'label')).toHaveLength(0)
  })

  it('never mutates the DOM', () => {
    document.body.innerHTML = `<img src="a.png">`
    const before = document.body.innerHTML
    auditAccessibility(document.body)
    expect(document.body.innerHTML).toBe(before)
  })
})
