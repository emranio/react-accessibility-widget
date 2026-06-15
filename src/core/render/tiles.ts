/**
 * Reusable building blocks for the panel markup: the size switch, profile
 * cards, and the level-aware tool tiles. Each helper returns an HTML string.
 */
import { ICONS } from '../icons'
import type { getTranslations } from '../i18n'
import { TOOL_MAX_LEVELS, type LevelToolKey } from '../tool-levels'
import type { AccessibilityProfile, AccessibilityWidgetState, TextAlignment, WidgetSize } from '../types'

/** Render the S/XL segmented size switch (a `role="switch"` toggle). */
export function sizeSwitch(active: WidgetSize, label: string): string {
  const isXl = active === 'XL'
  const nextSize: WidgetSize = isXl ? 'S' : 'XL'
  return `
    <button type="button" class="accessibility-widget-size-switch" role="switch" data-size="${nextSize}" aria-checked="${isXl}" aria-label="${label}">
      <span class="accessibility-widget-size-switch-track" aria-hidden="true">
        <span class="accessibility-widget-size-switch-option accessibility-widget-size-switch-option--s">S</span>
        <span class="accessibility-widget-size-switch-option accessibility-widget-size-switch-option--l">L</span>
        <span class="accessibility-widget-size-switch-thumb"></span>
      </span>
    </button>
  `
}

/** Render a single accessibility-profile card. */
export function profileCard(id: AccessibilityProfile, label: string, icon: string, active: boolean): string {
  return `
    <button class="accessibility-widget-card" type="button" data-profile="${id}" aria-pressed="${active}">
      <span class="icon">${icon}</span>
      <span class="label">${label}</span>
    </button>
  `
}

/** Render the level-indicator bars for a multi-level tool (none for toggles). */
function levelBars(level: number, maxLevel: number): string {
  if (maxLevel <= 1) return ''
  return `
    <div class="accessibility-widget-levels" aria-hidden="true">
      ${Array.from({ length: maxLevel }, (_, index) => `
        <span class="accessibility-widget-level${index + 1 === level ? ' active' : ''}"></span>
      `).join('')}
    </div>
  `
}

/**
 * Render a tool tile. The `aria-label` communicates the current level (or
 * on/off for toggles) to assistive technology.
 */
export function toolTile(opts: {
  key: string; icon: string; label: string; level: number; maxLevel: number
}): string {
  const { key, icon, label, level, maxLevel } = opts
  const ariaLevel = maxLevel <= 1
    ? (level > 0 ? 'On' : 'Off')
    : (level > 0 ? `Level ${level} of ${maxLevel}` : 'Off')
  return `
    <button class="accessibility-widget-tile" type="button" data-tool="${key}" data-level="${level}" data-max-level="${maxLevel}" aria-pressed="${level > 0}" aria-label="${label}, ${ariaLevel}">
      <span class="icon">${icon}</span>
      <span class="label">${label}</span>
      ${levelBars(level, maxLevel)}
    </button>
  `
}

/** Render a tool tile bound to a numeric state key with a known max level. */
export function adjustmentTile(state: AccessibilityWidgetState, key: LevelToolKey, icon: string, label: string): string {
  return toolTile({ key, icon, label, level: state[key] as number, maxLevel: TOOL_MAX_LEVELS[key] })
}

/**
 * Render the Legible Fonts tile. The tool's first step (level 1) applies the
 * dyslexia-friendly font, so the tile presents as "Dyslexia Friendly" when off
 * or at level 1, and switches to the general "Legible Fonts" label/icon only at
 * level 2 (Atkinson Hyperlegible).
 */
export function legibleFontsTile(state: AccessibilityWidgetState, t: ReturnType<typeof getTranslations>): string {
  const isDyslexiaFriendly = state.legibleFonts <= 1
  return adjustmentTile(
    state,
    'legibleFonts',
    isDyslexiaFriendly ? ICONS.dyslexiaFriendlyFont : ICONS.legibleFonts,
    isDyslexiaFriendly ? t.dyslexiaFriendly : t.legibleFonts,
  )
}

/** Map a text-alignment value to its 1-based tool level (0 = default). */
export function alignmentLevel(active: TextAlignment): number {
  if (active === 'left') return 1
  if (active === 'center') return 2
  if (active === 'right') return 3
  if (active === 'justify') return 4
  return 0
}

/** Pick the icon that reflects the current text alignment. */
export function alignmentIcon(active: TextAlignment): string {
  if (active === 'center') return ICONS.textAlignCenter
  if (active === 'right') return ICONS.textAlignRight
  if (active === 'justify') return ICONS.textAlignJustify
  return ICONS.textAlignLeft
}
