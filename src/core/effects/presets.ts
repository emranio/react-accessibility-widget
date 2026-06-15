/**
 * Tunable presets and per-level math shared across the page effects.
 *
 * Each adjustment level maps to a concrete set of values — colours for the
 * contrast modes, geometry for the reading aids, and so on. Keeping these
 * tables in one place makes the visual design easy to tweak without touching
 * the effect logic.
 */

/** Per-level multiplier for the dynamic font-size effect (10% per level). */
export const FONT_STEP = 0.1
/** Per-level addend for the line-height effect. */
export const LH_STEP = 0.15
/** Per-level addend (in `em`) for the letter-spacing effect. */
export const LS_STEP = 0.02

/** Background / text / border colours for each Dark Contrast level. */
export const DARK_CONTRAST_PRESETS = [
  { bg: '#1f2937', text: '#f9fafb', border: '#6b7280' },
  { bg: '#111827', text: '#ffffff', border: '#9ca3af' },
  { bg: '#030712', text: '#ffffff', border: '#d1d5db' },
  { bg: '#000000', text: '#ffffff', border: '#ffffff' },
]

/** Background / text / border colours for each Light Contrast level. */
export const LIGHT_CONTRAST_PRESETS = [
  { bg: '#ffffff', text: '#111827', border: '#d1d5db' },
  { bg: '#f9fafb', text: '#0f172a', border: '#94a3b8' },
  { bg: '#ffffff', text: '#000000', border: '#475569' },
  { bg: '#ffffff', text: '#000000', border: '#000000' },
]

/** Background / text / border colours for each High Contrast level. */
export const HIGH_CONTRAST_PRESETS = [
  { bg: '#111111', text: '#fff7c2', border: '#ffe066' },
  { bg: '#000000', text: '#fff27a', border: '#fff27a' },
  { bg: '#000000', text: '#ffff00', border: '#ffff00' },
  { bg: '#000000', text: '#00ffff', border: '#00ffff' },
]

/** Band height, shade opacity, and edge colour for each Reading Mask level. */
export const READING_MASK_PRESETS = [
  { band: 86, opacity: 0.35, edge: '#2563eb' },
  { band: 116, opacity: 0.45, edge: '#0891b2' },
  { band: 146, opacity: 0.55, edge: '#10b981' },
]

/** Geometry and colours for each Reading Guide level. */
export const READING_GUIDE_PRESETS = [
  { height: 6, border: 2, fill: '#0c0c0c', edge: '#facc15', glow: 'rgba(250,204,21,0.28)' },
]

/**
 * Clamp a 1-based adjustment level to a valid array index.
 *
 * Levels are 1-based in state (level 1 → index 0); values outside the range
 * are clamped to the first/last preset.
 */
export function presetIndex(level: number, length: number): number {
  return Math.max(0, Math.min(level - 1, length - 1))
}

/**
 * Build a `cursor` value (data-URI SVG arrow) for the Big Cursor effect.
 *
 * Higher levels produce a larger pointer with a different accent colour.
 */
export function bigCursorValue(level: number): string {
  const index = presetIndex(level, 3)
  const size = 38 + index * 10
  const hotspot = Math.round(size * 0.16)
  const accent = ['#2563eb', '#0891b2', '#0f766e'][index]
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
      <circle cx="30" cy="31" r="27" fill="${accent}" opacity="0.24"/>
      <path d="M8 5l42 27-20 5 13 18-10 6-13-19-12 16z" fill="#ffffff" stroke="#050505" stroke-width="5" stroke-linejoin="round"/>
      <path d="M8 5l42 27-20 5 13 18-10 6-13-19-12 16z" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>
  `.trim()
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspot} ${hotspot}, auto`
}

/**
 * Resolve the legible font family for a given Legible Fonts level.
 *
 * - Level 1 → OpenDyslexic (the dyslexia-specific typeface).
 * - Level 2 → Atkinson Hyperlegible (maximised character distinction).
 * - Otherwise → `null` (no override).
 */
export function legibleFontFamily(level: number): string | null {
  if (level === 1) return '"Accessibility Widget OpenDyslexic"'
  if (level === 2) return '"Accessibility Widget Atkinson Hyperlegible"'
  return null
}
