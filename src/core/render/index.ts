/**
 * Panel renderer.
 *
 * {@link renderPanel} produces the full inner HTML for the settings panel from
 * the current state. The widget assigns this string to the panel's `innerHTML`
 * on every state change; click handling is delegated by the widget via the
 * `data-*` attributes embedded here.
 *
 * Tools and profiles can be hidden via `hiddenTools` / `hiddenProfiles`; a
 * section whose tools are all hidden is omitted entirely.
 */
import { ICONS } from '../icons'
import { translations } from '../i18n'
import { TEXT_ALIGNMENT_MAX_LEVEL } from '../tool-levels'
import type { AccessibilityProfile, AccessibilityWidgetState, Position, ToolKey, WidgetSize } from '../types'
import { escapeHtml } from '../utils/html'
import {
  adjustmentTile,
  alignmentIcon,
  alignmentLevel,
  legibleFontsTile,
  positionSwitch,
  profileCard,
  sizeSwitch,
  toolTile,
} from './tiles'

export type PanelSectionId = 'settings' | 'profiles' | 'content' | 'color' | 'visibility'

type CollapsedSections = Partial<Record<PanelSectionId, boolean>>

const PROFILE_TOOLTIPS: Record<AccessibilityProfile, string> = {
  'seizure-safe': 'Stops animation, hides images, and applies monochrome to reduce flashing and visual triggers.',
  'vision-impaired': 'Increases text size, adds line height, applies high contrast, and enlarges the cursor.',
  'light-sensitivity': 'Applies a low-glare dark contrast profile and reduces motion.',
  'color-blind': 'Applies the color-blind filter and strengthens link highlighting so meaning is not color-only.',
  dyslexia: 'Uses the dyslexia-friendly font with more spacing and left-aligned text.',
  'adhd-friendly': 'Adds a reading mask, reduces motion, and lightly highlights links for focus.',
  'cognitive-disability': 'Uses a hyperlegible font with clearer headings, links, spacing, and text size.',
  'keyboard-motor': 'Strengthens focus outlines, enlarges the cursor, and highlights links for keyboard and motor navigation.',
  'blind-screen-reader': 'Enables click-to-read text-to-speech with clearer headings, links, and a legible font.',
}

const TOOL_TOOLTIPS = {
  legibleFonts: 'Cycles between the dyslexia-friendly font and Atkinson Hyperlegible.',
  highlightTitles: 'Adds visual emphasis to headings so page structure is easier to scan.',
  fontSize: 'Increases page text size across four levels.',
  textMagnifier: 'Shows a magnified text preview for easier reading.',
  highlightLinks: 'Highlights and underlines links so interactive text is easier to identify.',
  lineHeight: 'Increases line spacing across three levels.',
  letterSpacing: 'Increases character spacing across three levels.',
  textAlignment: 'Cycles text alignment through left, center, right, and justify.',
  darkContrast: 'Applies a dark contrast color treatment.',
  lightContrast: 'Applies a light contrast color treatment.',
  highContrast: 'Applies stronger high-contrast color combinations.',
  monochrome: 'Removes color by applying a monochrome treatment.',
  invertColors: 'Inverts page colors for users who prefer reversed contrast.',
  colorBlind: 'Applies the color-blind visual filter.',
  readingLens: 'Shows a horizontal reading lens that follows the pointer.',
  bigCursor: 'Enlarges the cursor across three levels.',
  readingMask: 'Dims surrounding content and keeps one reading band in focus.',
  readingGuide: 'Adds a guide line that follows the pointer.',
  readAloud: 'Reads page text aloud when you click it (text-to-speech).',
  dictionary: 'Shows the definition of a word when you double-click it.',
  simplify: 'Rewrites the selected text in simpler language.',
  virtualKeyboard: 'Shows an on-screen keyboard for typing without a physical keyboard.',
  focusHighlight: 'Adds a strong outline around the focused element for keyboard navigation.',
  pageStructure: 'Opens a headings, landmarks, and links navigator for the current page.',
  hideImages: 'Hides images and videos from the page.',
  offAnimations: 'Reduces animation and motion effects.',
} as const

function normalizeCollapsedSections(collapsed?: CollapsedSections): Record<PanelSectionId, boolean> {
  return {
    settings: collapsed?.settings ?? true,
    profiles: collapsed?.profiles ?? false,
    content: collapsed?.content ?? false,
    color: collapsed?.color ?? false,
    visibility: collapsed?.visibility ?? false,
  }
}

function sectionCard(id: PanelSectionId, label: string, collapsed: boolean, body: string): string {
  const bodyId = `accessibility-widget-section-${id}`
  return `
    <section class="accessibility-widget-section" data-section="${id}">
      <button type="button" class="accessibility-widget-section-head" data-section-toggle="${id}" aria-expanded="${!collapsed}" aria-controls="${bodyId}">
        <span class="accessibility-widget-section-title">${label}</span>
        <span class="accessibility-widget-section-chevron" aria-hidden="true">${collapsed ? ICONS.chevronDown : ICONS.chevronUp}</span>
      </button>
      <div id="${bodyId}" class="accessibility-widget-section-body"${collapsed ? ' hidden' : ''}>
        ${body}
      </div>
    </section>
  `
}

/** Drop falsy entries (hidden tiles / skipped sections) and concatenate. */
function join(parts: Array<string | false>): string {
  return parts.filter(Boolean).join('')
}

export function renderPanel(
  state: AccessibilityWidgetState,
  size: WidgetSize,
  options: {
    pageStructureOpen?: boolean
    title?: string
    position?: Position
    collapsedSections?: CollapsedSections
    hiddenProfiles?: AccessibilityProfile[]
    hiddenTools?: ToolKey[]
    shortcutLabel?: string | null
    simplifyEnabled?: boolean
  } = {},
): string {
  const t = translations
  const title = escapeHtml(options.title?.trim() || t.title)
  const position = options.position ?? 'right'
  const collapsedSections = normalizeCollapsedSections(options.collapsedSections)

  const PROFILES: Array<{ id: AccessibilityProfile; label: string; icon: string }> = [
    { id: 'seizure-safe',         label: t.seizureSafe,         icon: ICONS.seizure },
    { id: 'vision-impaired',      label: t.visionImpaired,      icon: ICONS.vision },
    { id: 'light-sensitivity',    label: t.lightSensitivity,    icon: ICONS.lightSensitivity },
    { id: 'color-blind',          label: t.colorBlind,          icon: ICONS.colorBlind },
    { id: 'dyslexia',             label: t.dyslexia,            icon: ICONS.dyslexia },
    { id: 'adhd-friendly',        label: t.adhdFriendly,        icon: ICONS.adhd },
    { id: 'cognitive-disability', label: t.cognitiveDisability, icon: ICONS.cognitive },
    { id: 'keyboard-motor',       label: t.keyboardMotor,       icon: ICONS.keyboardMotor },
    { id: 'blind-screen-reader',  label: t.blindScreenReader,   icon: ICONS.blindScreenReader },
  ]

  const hiddenProfiles = new Set<AccessibilityProfile>(options.hiddenProfiles ?? [])
  const hiddenTools = new Set<ToolKey>(options.hiddenTools ?? [])
  const visibleProfiles = PROFILES.filter(p => !hiddenProfiles.has(p.id))
  const show = (key: ToolKey): boolean => !hiddenTools.has(key)
  const simplifyEnabled = options.simplifyEnabled ?? false

  const contentTiles = join([
    show('legibleFonts') && legibleFontsTile(state, t, TOOL_TOOLTIPS.legibleFonts),
    show('highlightTitles') && adjustmentTile(state, 'highlightTitles', ICONS.highlightTitles, t.highlightTitles, TOOL_TOOLTIPS.highlightTitles),
    show('fontSize') && adjustmentTile(state, 'fontSize', ICONS.fontSizing, t.fontSize, TOOL_TOOLTIPS.fontSize),
    show('textMagnifier') && adjustmentTile(state, 'textMagnifier', ICONS.textMagnifier, t.textMagnifier, TOOL_TOOLTIPS.textMagnifier),
    show('highlightLinks') && adjustmentTile(state, 'highlightLinks', ICONS.highlightLinks, t.highlightLinks, TOOL_TOOLTIPS.highlightLinks),
    show('lineHeight') && adjustmentTile(state, 'lineHeight', ICONS.lineHeight, t.lineHeight, TOOL_TOOLTIPS.lineHeight),
    show('letterSpacing') && adjustmentTile(state, 'letterSpacing', ICONS.letterSpacing, t.letterSpacing, TOOL_TOOLTIPS.letterSpacing),
    show('textAlignment') && toolTile({ key: 'textAlignment', icon: alignmentIcon(state.textAlignment), label: t.textAlign, level: alignmentLevel(state.textAlignment), maxLevel: TEXT_ALIGNMENT_MAX_LEVEL, tooltip: TOOL_TOOLTIPS.textAlignment }),
    show('dictionary') && adjustmentTile(state, 'dictionary', ICONS.dictionary, t.dictionary, TOOL_TOOLTIPS.dictionary),
    simplifyEnabled && show('simplify') && adjustmentTile(state, 'simplify', ICONS.simplify, t.simplify, TOOL_TOOLTIPS.simplify),
  ])

  const colorTiles = join([
    show('darkContrast') && adjustmentTile(state, 'darkContrast', ICONS.darkContrast, t.darkContrast, TOOL_TOOLTIPS.darkContrast),
    show('lightContrast') && adjustmentTile(state, 'lightContrast', ICONS.lightContrast, t.lightContrast, TOOL_TOOLTIPS.lightContrast),
    show('highContrast') && adjustmentTile(state, 'highContrast', ICONS.highContrast, t.highContrast, TOOL_TOOLTIPS.highContrast),
    show('monochrome') && adjustmentTile(state, 'monochrome', ICONS.monochrome, t.monochrome, TOOL_TOOLTIPS.monochrome),
    show('invertColors') && adjustmentTile(state, 'invertColors', ICONS.invertColors, t.invertColors, TOOL_TOOLTIPS.invertColors),
    show('colorBlind') && adjustmentTile(state, 'colorBlind', ICONS.colorBlindVisual, t.colorBlind, TOOL_TOOLTIPS.colorBlind),
  ])

  const visibilityTiles = join([
    show('readingLens') && adjustmentTile(state, 'readingLens', ICONS.readingLens, t.readingLens, TOOL_TOOLTIPS.readingLens),
    show('bigCursor') && adjustmentTile(state, 'bigCursor', ICONS.bigCursor, t.bigCursor, TOOL_TOOLTIPS.bigCursor),
    show('readingMask') && adjustmentTile(state, 'readingMask', ICONS.readingMask, t.readingMask, TOOL_TOOLTIPS.readingMask),
    show('readingGuide') && adjustmentTile(state, 'readingGuide', ICONS.readingGuide, t.readingGuide, TOOL_TOOLTIPS.readingGuide),
    show('readAloud') && adjustmentTile(state, 'readAloud', ICONS.readAloud, t.readAloud, TOOL_TOOLTIPS.readAloud),
    show('focusHighlight') && adjustmentTile(state, 'focusHighlight', ICONS.focusHighlight, t.focusHighlight, TOOL_TOOLTIPS.focusHighlight),
    show('virtualKeyboard') && adjustmentTile(state, 'virtualKeyboard', ICONS.virtualKeyboard, t.virtualKeyboard, TOOL_TOOLTIPS.virtualKeyboard),
    show('pageStructure') && toolTile({ key: 'pageStructure', icon: ICONS.pageStructure, label: t.pageStructure, level: options.pageStructureOpen ? 1 : 0, maxLevel: 1, tooltip: TOOL_TOOLTIPS.pageStructure }),
    show('hideImages') && adjustmentTile(state, 'hideImages', ICONS.hideImages, t.hideImages, TOOL_TOOLTIPS.hideImages),
    show('offAnimations') && adjustmentTile(state, 'offAnimations', ICONS.offAnimations, t.offAnimations, TOOL_TOOLTIPS.offAnimations),
  ])

  const sections = join([
    sectionCard('settings', t.widgetSettings, collapsedSections.settings, `
          <div class="accessibility-widget-setting-row">
            <span class="accessibility-widget-setting-label">${t.widgetSize}</span>
            ${sizeSwitch(size, t.widgetSize, t.smallSize, t.largeSize)}
          </div>
          <div class="accessibility-widget-setting-row accessibility-widget-setting-row--stack">
            <span class="accessibility-widget-setting-label">${t.widgetPosition}</span>
            ${positionSwitch(position, t.widgetPosition, t.leftPosition, t.rightPosition)}
          </div>
        `),

    visibleProfiles.length > 0 && sectionCard('profiles', t.profiles, collapsedSections.profiles, `
          <div class="accessibility-widget-grid">
            ${visibleProfiles.map(p => profileCard(p.id, p.label, p.icon, state.profile === p.id, PROFILE_TOOLTIPS[p.id])).join('')}
          </div>
        `),

    visibilityTiles && sectionCard('visibility', t.visibilityAdjustments, collapsedSections.visibility, `
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${visibilityTiles}
          </div>
        `),

    colorTiles && sectionCard('color', t.colorAdjustments, collapsedSections.color, `
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${colorTiles}
          </div>
        `),

    contentTiles && sectionCard('content', t.contentAdjustments, collapsedSections.content, `
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${contentTiles}
          </div>
        `),
  ])

  return `
    <div class="accessibility-widget-header">
      <div class="accessibility-widget-header-left">
        <div class="accessibility-widget-header-icon">${ICONS.wheelchair}</div>
        <div class="accessibility-widget-header-text">
          <div class="accessibility-widget-header-title">
            <span>${title}</span>
          </div>
          ${options.shortcutLabel === null ? '' : `<kbd class="accessibility-widget-header-shortcut">${escapeHtml(options.shortcutLabel ?? 'CTRL + U')}</kbd>`}
          <div class="accessibility-widget-header-sub accessibility-widget-sr-only">${t.subtitle}</div>
        </div>
      </div>
      <div class="accessibility-widget-header-actions">
        <button type="button" class="accessibility-widget-icon-btn accessibility-widget-close" aria-label="${t.close}">${ICONS.close}</button>
      </div>
    </div>

    <div class="accessibility-widget-body">
      <div class="accessibility-widget-body-container">
        ${sections}
      </div>
    </div>

    <div class="accessibility-widget-reset-bar">
      <button type="button" class="accessibility-widget-reset-btn" data-action="reset" aria-label="${t.resetAll}">
        ${ICONS.reset}
        ${t.resetAll}
      </button>
    </div>
  `
}
