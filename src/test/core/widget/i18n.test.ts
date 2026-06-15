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

describe('Accessibility Widget — i18n', () => {
  it('renders Spanish labels when lang=es', () => {
    const a = new AccessibilityWidget({ lang: 'es' })
    a.mount()
    a.open()
    expect(document.querySelector('.accessibility-widget-panel')?.innerHTML).toContain('Configuración de Accesibilidad')
    a.destroy()
  })

  it('setLang updates panel language at runtime', () => {
    const a = new AccessibilityWidget({ lang: 'en' })
    a.mount()
    a.open()
    a.setLang('fr')
    expect(document.querySelector('.accessibility-widget-panel')?.innerHTML).toContain("Paramètres d'Accessibilité")
    a.destroy()
  })

  it('renders the localized Light Sensitivity profile label', () => {
    const a = new AccessibilityWidget({ lang: 'de' })
    a.mount()
    a.open()
    expect(document.querySelector('.accessibility-widget-panel')?.innerHTML).toContain('Lichtempfindlichkeit')
    a.destroy()
  })
})
