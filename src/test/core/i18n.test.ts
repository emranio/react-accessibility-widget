import { describe, it, expect } from 'vitest'
import { translations } from '../../core/i18n'

describe('translations', () => {
  it('exposes the English UI strings', () => {
    expect(translations.title).toBe('React Accessibility Widget')
    expect(translations.subtitle).toBe('Accessibility Settings')
    expect(translations.resetAll).toBe('Reset all settings')
  })

  it('has a non-empty value for every required key', () => {
    const keys: Array<keyof typeof translations> = [
      'title', 'subtitle', 'widgetSettings', 'widgetSize', 'smallSize',
      'largeSize', 'widgetPosition', 'leftPosition', 'rightPosition',
      'profiles', 'contentAdjustments', 'colorAdjustments', 'visibilityAdjustments',
      'pageStructure', 'structureHeadings', 'structureLandmarks',
      'structureLinks', 'noStructureItems', 'untitledHeading', 'untitledLink',
      'resetAll', 'close', 'dyslexia', 'seizureSafe',
      'fontSize', 'legibleFonts', 'dyslexiaFriendly', 'textMagnifier', 'bigCursor', 'readingMask',
    ]
    for (const key of keys) {
      expect(translations[key], key).toBeTruthy()
    }
  })
})
