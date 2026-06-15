/**
 * Localisation entry point.
 *
 * Exposes the UI strings consumed by the renderers. The widget currently ships
 * English only; multi-language support will layer back on top of this module.
 */
import { en } from './languages/en'
import type { Translations } from './types'

export type { Translations } from './types'

/** The active translation bundle (English). */
export const translations: Translations = en
