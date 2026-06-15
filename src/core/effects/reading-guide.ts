/**
 * Reading Guide effect.
 *
 * A high-contrast horizontal rule with a pointer that follows the cursor,
 * giving readers a movable underline to track their place on the line.
 */
import { READING_GUIDE_PRESETS, presetIndex } from './presets'

let readingGuideEl: HTMLDivElement | null = null
let readingGuidePointerEl: HTMLSpanElement | null = null
let readingGuideMoveHandler: ((e: MouseEvent) => void) | null = null
let readingGuideResizeHandler: (() => void) | null = null
let readingGuideX = 0
let readingGuideY = 0
let readingGuideLevel = 1

/** Apply the geometry / colours for the given guide level via CSS variables. */
function updateReadingGuideAppearance(level: number): void {
  if (!readingGuideEl) return
  readingGuideLevel = level
  const preset = READING_GUIDE_PRESETS[presetIndex(level, READING_GUIDE_PRESETS.length)]
  readingGuideEl.dataset.level = String(level)
  readingGuideEl.style.setProperty('--accessibility-widget-reading-guide-height', `${preset.height}px`)
  readingGuideEl.style.setProperty('--accessibility-widget-reading-guide-border', `${preset.border}px`)
  readingGuideEl.style.setProperty('--accessibility-widget-reading-guide-fill', preset.fill)
  readingGuideEl.style.setProperty('--accessibility-widget-reading-guide-edge', preset.edge)
  readingGuideEl.style.setProperty('--accessibility-widget-reading-guide-glow', preset.glow)
}

/** Position the guide rule centred on `y`, with its pointer at `x`. */
function positionReadingGuide(x: number, y: number): void {
  if (!readingGuideEl) return
  const preset = READING_GUIDE_PRESETS[presetIndex(readingGuideLevel, READING_GUIDE_PRESETS.length)]
  const totalHeight = preset.height + preset.border * 2
  const top = Math.max(0, Math.min(window.innerHeight - totalHeight, y - totalHeight / 2))
  readingGuideEl.style.top = `${top}px`
  readingGuideEl.style.setProperty('--accessibility-widget-reading-guide-x', `${x}px`)
}

/**
 * Enable the reading guide at the given level, creating the element and cursor
 * tracking on first call.
 */
export function enableReadingGuide(level: number): void {
  if (!readingGuideEl) {
    readingGuideEl = document.createElement('div')
    readingGuideEl.className = 'accessibility-widget-reading-guide'
    readingGuideEl.setAttribute('aria-hidden', 'true')
    readingGuidePointerEl = document.createElement('span')
    readingGuidePointerEl.className = 'accessibility-widget-reading-guide-pointer'
    readingGuideEl.appendChild(readingGuidePointerEl)
    document.body.appendChild(readingGuideEl)

    readingGuideX = window.innerWidth / 2
    readingGuideY = window.innerHeight / 2
    readingGuideMoveHandler = (e: MouseEvent) => {
      readingGuideX = e.clientX
      readingGuideY = e.clientY
      positionReadingGuide(readingGuideX, readingGuideY)
    }
    readingGuideResizeHandler = () => positionReadingGuide(readingGuideX, readingGuideY)
    document.addEventListener('mousemove', readingGuideMoveHandler, { passive: true })
    window.addEventListener('resize', readingGuideResizeHandler, { passive: true })
  }
  updateReadingGuideAppearance(level)
  positionReadingGuide(readingGuideX, readingGuideY)
}

/** Disable the reading guide and remove its element and listeners. */
export function disableReadingGuide(): void {
  if (readingGuideMoveHandler) {
    document.removeEventListener('mousemove', readingGuideMoveHandler)
    readingGuideMoveHandler = null
  }
  if (readingGuideResizeHandler) {
    window.removeEventListener('resize', readingGuideResizeHandler)
    readingGuideResizeHandler = null
  }
  if (readingGuideEl) {
    readingGuideEl.remove()
    readingGuideEl = null
    readingGuidePointerEl = null
  }
}
