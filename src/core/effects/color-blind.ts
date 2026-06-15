/**
 * Colour-blindness correction filter.
 *
 * The Color Blind effect routes the host page through an SVG `feColorMatrix`
 * filter (a protanopia-oriented matrix) plus saturation/contrast tweaks driven
 * by CSS variables. The filter element is injected lazily and reused.
 */

/** Id of the injected `<svg>` host for the colour-blindness filter. */
const COLOR_BLIND_FILTER_ID = 'accessibility-widget-protanopia-filter'

/**
 * Ensure the protanopia SVG filter exists in the document.
 *
 * Idempotent — the filter is created only once and left in place until
 * {@link removeColorBlindFilter} is called.
 */
export function ensureColorBlindFilter(): void {
  if (document.getElementById(COLOR_BLIND_FILTER_ID)) return
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = COLOR_BLIND_FILTER_ID
  svg.setAttribute('aria-hidden', 'true')
  svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;'
  svg.innerHTML = `
    <defs>
      <filter id="accessibility-widget-protanopia">
        <feColorMatrix type="matrix" values="
          0.567 0.433 0 0 0
          0.558 0.442 0 0 0
          0     0.242 0.758 0 0
          0     0     0 1 0"/>
      </filter>
    </defs>`
  document.body.appendChild(svg)
}

/** Remove the protanopia SVG filter if present. */
export function removeColorBlindFilter(): void {
  document.getElementById(COLOR_BLIND_FILTER_ID)?.remove()
}
