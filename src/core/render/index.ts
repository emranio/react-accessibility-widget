/**
 * Panel renderer.
 *
 * {@link renderPanel} produces the full inner HTML for the settings panel from
 * the current state. The widget assigns this string to the panel's `innerHTML`
 * on every state change; click handling is delegated by the widget via the
 * `data-*` attributes embedded here.
 */
import { ICONS } from '../icons'
import { getTranslations } from '../i18n'
import { TEXT_ALIGNMENT_MAX_LEVEL } from '../tool-levels'
import type { AccessibilityProfile, AccessibilityWidgetState, Lang, WidgetSize } from '../types'
import { escapeHtml } from '../utils/html'
import {
  adjustmentTile,
  alignmentIcon,
  alignmentLevel,
  legibleFontsTile,
  profileCard,
  sizeSwitch,
  toolTile,
} from './tiles'

export function renderPanel(
  state: AccessibilityWidgetState,
  size: WidgetSize,
  lang: Lang = 'en',
  options: { pageStructureOpen?: boolean; title?: string } = {},
): string {
  const t = getTranslations(lang)
  const title = escapeHtml(options.title?.trim() || t.title)

  const PROFILES: Array<{ id: AccessibilityProfile; label: string; icon: string }> = [
    { id: 'seizure-safe',         label: t.seizureSafe,         icon: ICONS.seizure },
    { id: 'vision-impaired',      label: t.visionImpaired,      icon: ICONS.vision },
    { id: 'light-sensitivity',    label: t.lightSensitivity,    icon: ICONS.lightSensitivity },
    { id: 'color-blind',          label: t.colorBlind,          icon: ICONS.colorBlind },
    { id: 'dyslexia',             label: t.dyslexia,            icon: ICONS.dyslexia },
    { id: 'adhd-friendly',        label: t.adhdFriendly,        icon: ICONS.adhd },
    { id: 'cognitive-disability', label: t.cognitiveDisability, icon: ICONS.cognitive },
  ]

  // Arabic is the only RTL language currently bundled.
  const dir = lang === 'ar' ? ' dir="rtl"' : ''

  return `
    <div class="accessibility-widget-header"${dir}>
      <div class="accessibility-widget-header-left">
        <div class="accessibility-widget-header-icon">${ICONS.wheelchair}</div>
        <div class="accessibility-widget-header-text">
          <div class="accessibility-widget-header-title">${title}</div>
          <div class="accessibility-widget-header-sub">${t.subtitle}</div>
        </div>
      </div>
      <div class="accessibility-widget-header-actions">
        <button type="button" class="accessibility-widget-icon-btn accessibility-widget-close" aria-label="${t.close}">${ICONS.close}</button>
      </div>
    </div>

    <div class="accessibility-widget-body"${dir}>

      <div class="accessibility-widget-section accessibility-widget-section--compact">
        <div class="accessibility-widget-section-head">
          <span class="accessibility-widget-section-title">${t.widgetSize}</span>
          ${sizeSwitch(size, t.xlSize)}
        </div>
      </div>

      <div class="accessibility-widget-section">
        <div class="accessibility-widget-section-head">
          <span class="accessibility-widget-section-title">${t.profiles}</span>
        </div>
        <div class="accessibility-widget-grid">
          ${PROFILES.map(p => profileCard(p.id, p.label, p.icon, state.profile === p.id)).join('')}
        </div>
      </div>

      <div class="accessibility-widget-section">
        <div class="accessibility-widget-section-head">
          <span class="accessibility-widget-section-title">${t.contentAdjustments}</span>
        </div>
        <div class="accessibility-widget-grid accessibility-widget-grid-3">
          ${legibleFontsTile(state, t)}
          ${adjustmentTile(state, 'highlightTitles', ICONS.highlightTitles,t.highlightTitles)}
          ${adjustmentTile(state, 'fontSize',        ICONS.fontSizing,     t.fontSize)}
          ${adjustmentTile(state, 'textMagnifier',   ICONS.textMagnifier,  t.textMagnifier)}
          ${adjustmentTile(state, 'highlightLinks',  ICONS.highlightLinks, t.highlightLinks)}
          ${adjustmentTile(state, 'readingLens',     ICONS.readingLens,    t.readingLens)}
          ${adjustmentTile(state, 'bigCursor',       ICONS.bigCursor,      t.bigCursor)}
          ${adjustmentTile(state, 'readingMask',     ICONS.readingMask,    t.readingMask)}
          ${adjustmentTile(state, 'readingGuide',    ICONS.readingGuide,   t.readingGuide)}
          ${toolTile({ key: 'pageStructure', icon: ICONS.pageStructure, label: t.pageStructure, level: options.pageStructureOpen ? 1 : 0, maxLevel: 1 })}
          ${adjustmentTile(state, 'lineHeight',      ICONS.lineHeight,     t.lineHeight)}
          ${adjustmentTile(state, 'letterSpacing',   ICONS.letterSpacing,  t.letterSpacing)}
          ${toolTile({ key: 'textAlignment', icon: alignmentIcon(state.textAlignment), label: t.textAlign, level: alignmentLevel(state.textAlignment), maxLevel: TEXT_ALIGNMENT_MAX_LEVEL })}
        </div>
      </div>

      <div class="accessibility-widget-section">
        <div class="accessibility-widget-section-head">
          <span class="accessibility-widget-section-title">${t.colorAdjustments}</span>
        </div>
        <div class="accessibility-widget-grid accessibility-widget-grid-3">
          ${adjustmentTile(state, 'darkContrast', ICONS.darkContrast, t.darkContrast)}
          ${adjustmentTile(state, 'lightContrast', ICONS.lightContrast, t.lightContrast)}
          ${adjustmentTile(state, 'highContrast', ICONS.highContrast, t.highContrast)}
          ${adjustmentTile(state, 'monochrome', ICONS.monochrome, t.monochrome)}
          ${adjustmentTile(state, 'invertColors', ICONS.invertColors, t.invertColors)}
          ${adjustmentTile(state, 'colorBlind', ICONS.colorBlindVisual, t.colorBlind)}
          ${adjustmentTile(state, 'hideImages', ICONS.hideImages, t.hideImages)}
          ${adjustmentTile(state, 'offAnimations', ICONS.offAnimations, t.offAnimations)}
        </div>
      </div>

    </div>

    <div class="accessibility-widget-reset-bar"${dir}>
      <button type="button" class="accessibility-widget-reset-btn" data-action="reset" aria-label="${t.resetAll}">
        ${ICONS.reset}
        ${t.resetAll}
      </button>
    </div>
  `
}
