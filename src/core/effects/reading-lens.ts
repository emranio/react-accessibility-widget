/**
 * Reading Lens effect.
 *
 * A circular magnifying lens that follows the cursor and shows a zoomed,
 * live-mirrored copy of the host page beneath it. The page is cloned once into
 * the lens and re-positioned each frame via `transform`, so panning is cheap;
 * the clone is refreshed whenever the lens (re)appears.
 */
import { HOST_WRAPPER_ID } from './host'

let lensDiameter = 220
let lensZoom = 1.8

let lensEl: HTMLDivElement | null = null
let lensInner: HTMLDivElement | null = null
let lensCloneEl: HTMLElement | null = null
let lensMoveHandler: ((e: MouseEvent) => void) | null = null
let lensRafId: number | null = null
let lensTargetX = 0
let lensTargetY = 0
let lensCurX = 0
let lensCurY = 0
let lensVisible = false

/** Apply the diameter / zoom for the given lens level. */
function updateReadingLensAppearance(level: number): void {
  const presets = [
    { diameter: 220, zoom: 1.8 },
    { diameter: 240, zoom: 2.2 },
    { diameter: 260, zoom: 2.75 },
  ]
  const preset = presets[Math.max(0, Math.min(level - 1, presets.length - 1))]
  lensDiameter = preset.diameter
  lensZoom = preset.zoom
  if (!lensEl || !lensInner) return
  lensEl.style.width = `${lensDiameter}px`
  lensEl.style.height = `${lensDiameter}px`
  if (lensVisible) lensRafId ??= requestAnimationFrame(lensFrame)
}

/**
 * Clone the host wrapper into the lens.
 *
 * `cloneNode` copies markup but not live IDL state, so input/textarea values,
 * checkbox/radio checked state, and `<select>` selection are mirrored manually.
 * Interactive widgets and scripts/iframes are stripped from the clone.
 */
function snapshotHostIntoLens(): void {
  if (!lensInner) return
  const host = document.getElementById(HOST_WRAPPER_ID)
  if (!host) return
  const rect = host.getBoundingClientRect()
  lensCloneEl = null
  lensInner.innerHTML = ''
  const clone = host.cloneNode(true) as HTMLElement
  clone.id = ''
  clone.style.position = 'absolute'
  clone.style.top = `${rect.top}px`
  clone.style.left = `${rect.left}px`
  clone.style.width = `${rect.width}px`
  clone.style.pointerEvents = 'none'
  // Strip interactive cloned widgets that would re-mount/clash
  clone.querySelectorAll('.accessibility-widget-root, .accessibility-widget-reading-lens, script, iframe').forEach(n => n.remove())
  // Mirror live input/textarea values onto the clone (cloneNode doesn't
  // copy the IDL value property, only the initial defaultValue attribute).
  const liveInputs = host.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
  const cloneInputs = clone.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
  for (let i = 0; i < liveInputs.length && i < cloneInputs.length; i++) {
    const live = liveInputs[i]
    const dup = cloneInputs[i]
    if (live instanceof HTMLInputElement && dup instanceof HTMLInputElement) {
      dup.value = live.value
      if (live.type === 'checkbox' || live.type === 'radio') dup.checked = live.checked
    } else if (live instanceof HTMLTextAreaElement && dup instanceof HTMLTextAreaElement) {
      dup.value = live.value
    }
  }
  // Same for <select> — cloneNode doesn't preserve the selected option's
  // runtime state.
  const liveSelects = host.querySelectorAll<HTMLSelectElement>('select')
  const cloneSelects = clone.querySelectorAll<HTMLSelectElement>('select')
  for (let i = 0; i < liveSelects.length && i < cloneSelects.length; i++) {
    cloneSelects[i].selectedIndex = liveSelects[i].selectedIndex
  }
  lensCloneEl = clone
  lensInner.appendChild(clone)
}

/** Keep the clone aligned with the live wrapper as the page scrolls/resizes. */
function syncLensClonePosition(): void {
  if (!lensCloneEl) return
  const host = document.getElementById(HOST_WRAPPER_ID)
  if (!host) return
  const rect = host.getBoundingClientRect()
  lensCloneEl.style.top = `${rect.top}px`
  lensCloneEl.style.left = `${rect.left}px`
  lensCloneEl.style.width = `${rect.width}px`
}

/** Position the lens and its zoomed content for the current cursor target. */
function lensFrame(): void {
  lensRafId = null
  if (!lensEl || !lensInner) return
  const lensHalf = lensDiameter / 2
  lensCurX = Math.round(lensTargetX)
  lensCurY = Math.round(lensTargetY)
  syncLensClonePosition()
  lensEl.style.transform = `translate3d(${lensCurX - lensHalf}px, ${lensCurY - lensHalf}px, 0)`
  const tx = lensHalf - lensCurX * lensZoom
  const ty = lensHalf - lensCurY * lensZoom
  lensInner.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${lensZoom})`
}

/**
 * Enable the reading lens at the given level, creating the element and cursor
 * tracking on first call and refreshing the snapshot on re-enable.
 */
export function enableReadingLens(level: number): void {
  updateReadingLensAppearance(level)
  if (lensEl) {
    if (!lensVisible) snapshotHostIntoLens()
    return
  }
  lensEl = document.createElement('div')
  lensEl.className = 'accessibility-widget-reading-lens'
  lensEl.setAttribute('aria-hidden', 'true')
  // `inert` removes the cloned host subtree from the a11y tree AND the tab
  // order. aria-hidden alone hides it from screen readers but leaves cloned
  // links/inputs focusable, creating duplicate tab stops — inert prevents that.
  lensEl.setAttribute('inert', '')
  lensEl.style.display = 'none'
  lensEl.style.left = '0'
  lensEl.style.top = '0'
  lensEl.style.willChange = 'transform'

  lensInner = document.createElement('div')
  lensInner.className = 'accessibility-widget-reading-lens-inner'
  lensInner.style.willChange = 'transform'
  lensEl.appendChild(lensInner)

  document.body.appendChild(lensEl)
  updateReadingLensAppearance(level)
  snapshotHostIntoLens()

  lensMoveHandler = (e: MouseEvent) => {
    if (!lensEl) return
    const target = e.target as Element | null
    if (target?.closest('.accessibility-widget-root')) {
      if (lensVisible) {
        lensEl.style.display = 'none'
        lensVisible = false
      }
      return
    }
    if (!lensVisible) {
      lensEl.style.display = 'block'
      lensTargetX = e.clientX
      lensTargetY = e.clientY
      lensCurX = e.clientX
      lensCurY = e.clientY
      lensVisible = true
      // Lens just became visible; re-snapshot now in case anything
      // changed while it was hidden over the widget UI.
      snapshotHostIntoLens()
    }
    lensTargetX = e.clientX
    lensTargetY = e.clientY
    lensRafId ??= requestAnimationFrame(lensFrame)
  }
  document.addEventListener('mousemove', lensMoveHandler, { passive: true })
}

/** Disable the reading lens and tear down its element, listener, and RAF. */
export function disableReadingLens(): void {
  if (lensMoveHandler) {
    document.removeEventListener('mousemove', lensMoveHandler)
    lensMoveHandler = null
  }
  if (lensRafId !== null) {
    cancelAnimationFrame(lensRafId)
    lensRafId = null
  }
  lensVisible = false
  if (lensEl) {
    lensEl.remove()
    lensEl = null
    lensInner = null
    lensCloneEl = null
  }
}
