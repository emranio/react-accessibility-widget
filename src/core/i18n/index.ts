/**
 * Localisation entry point.
 *
 * Bundles the per-language translation tables and exposes {@link getTranslations},
 * the single accessor used by the renderers. English is the canonical bundle
 * and the fallback for any unknown language.
 */
import type { Lang } from '../types'
import { ar } from './languages/ar'
import { de } from './languages/de'
import { en } from './languages/en'
import { es } from './languages/es'
import { fr } from './languages/fr'
import { pt } from './languages/pt'
import type { Translations } from './types'

export type { Translations } from './types'

/** Registry of every supported language bundle, keyed by language code. */
const TRANSLATIONS: Record<Lang, Translations> = { en, es, fr, de, pt, ar }

/**
 * Resolve the translation bundle for a language code, falling back to English
 * when the code is unknown.
 */
export function getTranslations(lang: Lang = 'en'): Translations {
  return TRANSLATIONS[lang] ?? en
}
