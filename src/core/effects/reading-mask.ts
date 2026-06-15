/**
 * Reading Mask effect.
 *
 * Shades the page above and below a clear horizontal band that tracks the
 * cursor, helping readers focus on one line at a time. The band height, shade
 * opacity, and edge colour vary by level.
 */
import { READING_MASK_PRESETS, presetIndex } from './presets'

let readingMaskEl: HTMLDivElement | null = null
let readingMaskTopEl: HTMLDivElement | null = null
let readingMaskBottomEl: HTMLDivElement | null = null
let readingMaskMoveHandler: ((e: MouseEvent) => void) | null = null
let readingMaskResizeHandler: (() => void) | null = null
let readingMaskY = 0
let readingMaskLevel = 1

/** Apply the opacity / edge colour for the given mask level. */
function updateReadingMaskAppearance(level: number): void {
  if (!readingMaskEl) return
  readingMaskLevel = level
  const preset = READING_MASK_PRESETS[presetIndex(level, READING_MASK_PRESETS.length)]
  readingMaskEl.dataset.level = String(level)
  readingMaskEl.style.setProperty('--accessibility-widget-reading-mask-opacity', String(preset.opacity))
  readingMaskEl.style.setProperty('--accessibility-widget-reading-mask-edge', preset.edge)
}

/** Resize the top/bottom shades so the clear band is centred on `y`. */
function positionReadingMask(y: number): void {
  if (!readingMaskTopEl || !readingMaskBottomEl) return
  const preset = READING_MASK_PRESETS[presetIndex(readingMaskLevel, READING_MASK_PRESETS.length)]
  const topHeight = Math.max(0, y - preset.band / 2)
  const bottomTop = Math.min(window.innerHeight, y + preset.band / 2)
  readingMaskTopEl.style.height = `${topHeight}px`
  readingMaskBottomEl.style.top = `${bottomTop}px`
  readingMaskBottomEl.style.height = `${Math.max(0, window.innerHeight - bottomTop)}px`
}

/**
 * Enable the reading mask at the given level, creating the overlay and cursor
 * tracking on first call.
 */
export function enableReadingMask(level: number): void {
  if (!readingMaskEl) {
    readingMaskEl = document.createElement('div')
    readingMaskEl.className = 'accessibility-widget-reading-mask'
    readingMaskEl.setAttribute('aria-hidden', 'true')

    readingMaskTopEl = document.createElement('div')
    readingMaskTopEl.className = 'accessibility-widget-reading-mask-panel accessibility-widget-reading-mask-top'
    readingMaskBottomEl = document.createElement('div')
    readingMaskBottomEl.className = 'accessibility-widget-reading-mask-panel accessibility-widget-reading-mask-bottom'

    readingMaskEl.append(readingMaskTopEl, readingMaskBottomEl)
    document.body.appendChild(readingMaskEl)

    readingMaskY = window.innerHeight / 2
    readingMaskMoveHandler = (e: MouseEvent) => {
      readingMaskY = e.clientY
      positionReadingMask(readingMaskY)
    }
    readingMaskResizeHandler = () => positionReadingMask(readingMaskY)
    document.addEventListener('mousemove', readingMaskMoveHandler, { passive: true })
    window.addEventListener('resize', readingMaskResizeHandler, { passive: true })
  }
  updateReadingMaskAppearance(level)
  positionReadingMask(readingMaskY)
}

/** Disable the reading mask and remove its overlay and listeners. */
export function disableReadingMask(): void {
  if (readingMaskMoveHandler) {
    document.removeEventListener('mousemove', readingMaskMoveHandler)
    readingMaskMoveHandler = null
  }
  if (readingMaskResizeHandler) {
    window.removeEventListener('resize', readingMaskResizeHandler)
    readingMaskResizeHandler = null
  }
  if (readingMaskEl) {
    readingMaskEl.remove()
    readingMaskEl = null
    readingMaskTopEl = null
    readingMaskBottomEl = null
  }
}
