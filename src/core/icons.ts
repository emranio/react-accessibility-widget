/**
 * Icon registry.
 *
 * The widget ships self-contained SVG markup so it has no runtime dependency on
 * a React icon component. Lucide icons are imported as raw node descriptors
 * (`__iconNode`) and serialised to SVG strings by {@link lucideSvg}; the trigger
 * mark is hand-authored. {@link ICONS} is the single map consumed by the
 * renderers.
 */
import { __iconNode as aLargeSmallIcon } from 'lucide-react/dist/esm/icons/a-large-small.mjs'
import { __iconNode as betweenHorizontalStartIcon } from 'lucide-react/dist/esm/icons/between-horizontal-start.mjs'
import { __iconNode as betweenVerticalStartIcon } from 'lucide-react/dist/esm/icons/between-vertical-start.mjs'
import { __iconNode as bookOpenTextIcon } from 'lucide-react/dist/esm/icons/book-open-text.mjs'
import { __iconNode as brainIcon } from 'lucide-react/dist/esm/icons/brain.mjs'
import { __iconNode as chevronDownIcon } from 'lucide-react/dist/esm/icons/chevron-down.mjs'
import { __iconNode as chevronUpIcon } from 'lucide-react/dist/esm/icons/chevron-up.mjs'
import { __iconNode as circleIcon } from 'lucide-react/dist/esm/icons/circle.mjs'
import { __iconNode as circleOffIcon } from 'lucide-react/dist/esm/icons/circle-off.mjs'
import { __iconNode as contrastIcon } from 'lucide-react/dist/esm/icons/contrast.mjs'
import { __iconNode as eyeIcon } from 'lucide-react/dist/esm/icons/eye.mjs'
import { __iconNode as externalLinkIcon } from 'lucide-react/dist/esm/icons/external-link.mjs'
import { __iconNode as focusIcon } from 'lucide-react/dist/esm/icons/focus.mjs'
import { __iconNode as headingIcon } from 'lucide-react/dist/esm/icons/heading.mjs'
import { __iconNode as imageOffIcon } from 'lucide-react/dist/esm/icons/image-off.mjs'
import { __iconNode as landmarkIcon } from 'lucide-react/dist/esm/icons/landmark.mjs'
import { __iconNode as layersIcon } from 'lucide-react/dist/esm/icons/layers.mjs'
import { __iconNode as linkIcon } from 'lucide-react/dist/esm/icons/link.mjs'
import { __iconNode as monitorPauseIcon } from 'lucide-react/dist/esm/icons/monitor-pause.mjs'
import { __iconNode as moonIcon } from 'lucide-react/dist/esm/icons/moon.mjs'
import { __iconNode as mousePointer2Icon } from 'lucide-react/dist/esm/icons/mouse-pointer-2.mjs'
import { __iconNode as moveHorizontalIcon } from 'lucide-react/dist/esm/icons/move-horizontal.mjs'
import { __iconNode as paletteIcon } from 'lucide-react/dist/esm/icons/palette.mjs'
import { __iconNode as rotateCcwIcon } from 'lucide-react/dist/esm/icons/rotate-ccw.mjs'
import { __iconNode as rows3Icon } from 'lucide-react/dist/esm/icons/rows-3.mjs'
import { __iconNode as scanEyeIcon } from 'lucide-react/dist/esm/icons/scan-eye.mjs'
import { __iconNode as sunDimIcon } from 'lucide-react/dist/esm/icons/sun-dim.mjs'
import { __iconNode as sunIcon } from 'lucide-react/dist/esm/icons/sun.mjs'
import { __iconNode as textAlignCenterIcon } from 'lucide-react/dist/esm/icons/text-align-center.mjs'
import { __iconNode as textAlignEndIcon } from 'lucide-react/dist/esm/icons/text-align-end.mjs'
import { __iconNode as textAlignJustifyIcon } from 'lucide-react/dist/esm/icons/text-align-justify.mjs'
import { __iconNode as textAlignStartIcon } from 'lucide-react/dist/esm/icons/text-align-start.mjs'
import { __iconNode as textInitialIcon } from 'lucide-react/dist/esm/icons/text-initial.mjs'
import { __iconNode as venetianMaskIcon } from 'lucide-react/dist/esm/icons/venetian-mask.mjs'
import { __iconNode as volume2Icon } from 'lucide-react/dist/esm/icons/volume-2.mjs'
import { __iconNode as wholeWordIcon } from 'lucide-react/dist/esm/icons/whole-word.mjs'
import { __iconNode as xIcon } from 'lucide-react/dist/esm/icons/x.mjs'
import { __iconNode as zapIcon } from 'lucide-react/dist/esm/icons/zap.mjs'
import { __iconNode as zoomInIcon } from 'lucide-react/dist/esm/icons/zoom-in.mjs'
import { __iconNode as earIcon } from 'lucide-react/dist/esm/icons/ear.mjs'
import { __iconNode as keyboardIcon } from 'lucide-react/dist/esm/icons/keyboard.mjs'
import { __iconNode as squareDashedMousePointerIcon } from 'lucide-react/dist/esm/icons/square-dashed-mouse-pointer.mjs'

import { escapeAttr } from './utils/html'

type LucideIconNode = Array<[tag: string, attrs: Record<string, string>]>

/** Serialise a node's attributes to a string, skipping React's `key`. */
function attrsToString(attrs: Record<string, string>): string {
  return Object.entries(attrs)
    .filter(([name]) => name !== 'key')
    .map(([name, value]) => `${name}="${escapeAttr(String(value))}"`)
    .join(' ')
}

/** Serialise a Lucide icon node to a standalone, `currentColor`-aware SVG string. */
const lucideSvg = (node: LucideIconNode): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${node
    .map(([tag, attrs]) => `<${tag} ${attrsToString(attrs)}/>`)
    .join('')}</svg>`

/**
 * The accessibility mark used for the trigger and panel header. A single path
 * draws the outer ring plus the person, so no separate ring element is needed.
 * `fill` is bound to `currentColor` so it follows the trigger / header colour.
 */
const triggerSvg = (): string =>
  '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="currentColor"></path></svg>'

export const ICONS = {
  trigger: triggerSvg(),
  close: lucideSvg(xIcon),
  reset: lucideSvg(rotateCcwIcon),
  chevronDown: lucideSvg(chevronDownIcon),
  chevronUp: lucideSvg(chevronUpIcon),
  info: '<span class="accessibility-widget-info-glyph">i</span>',

  // Product and profile icons.
  wheelchair: triggerSvg(),
  seizure: lucideSvg(zapIcon),
  vision: lucideSvg(eyeIcon),
  lightSensitivity: lucideSvg(sunDimIcon),
  adhd: lucideSvg(focusIcon),
  cognitive: lucideSvg(brainIcon),
  colorBlind: lucideSvg(paletteIcon),
  dyslexia: lucideSvg(bookOpenTextIcon),
  keyboardMotor: lucideSvg(keyboardIcon),
  blindScreenReader: lucideSvg(earIcon),

  // Content adjustments.
  legibleFonts: lucideSvg(textInitialIcon),
  dyslexiaFriendlyFont: lucideSvg(wholeWordIcon),
  highlightTitles: lucideSvg(headingIcon),
  fontSizing: lucideSvg(aLargeSmallIcon),
  textMagnifier: lucideSvg(zoomInIcon),
  readingLens: lucideSvg(scanEyeIcon),
  bigCursor: lucideSvg(mousePointer2Icon),
  readingMask: lucideSvg(rows3Icon),
  readingGuide: lucideSvg(moveHorizontalIcon),
  readAloud: lucideSvg(volume2Icon),
  focusHighlight: lucideSvg(squareDashedMousePointerIcon),
  highlightLinks: lucideSvg(linkIcon),
  lineHeight: lucideSvg(betweenVerticalStartIcon),
  letterSpacing: lucideSvg(betweenHorizontalStartIcon),
  textAlignLeft: lucideSvg(textAlignStartIcon),
  textAlignCenter: lucideSvg(textAlignCenterIcon),
  textAlignRight: lucideSvg(textAlignEndIcon),
  textAlignJustify: lucideSvg(textAlignJustifyIcon),
  pageStructure: lucideSvg(layersIcon),
  structureLandmark: lucideSvg(landmarkIcon),
  structureLink: lucideSvg(linkIcon),
  structureExternal: lucideSvg(externalLinkIcon),

  // Visual adjustments.
  darkContrast: lucideSvg(moonIcon),
  lightContrast: lucideSvg(sunIcon),
  highContrast: lucideSvg(contrastIcon),
  monochrome: lucideSvg(circleIcon),
  invertColors: lucideSvg(circleOffIcon),
  colorBlindVisual: lucideSvg(venetianMaskIcon),
  hideImages: lucideSvg(imageOffIcon),
  offAnimations: lucideSvg(monitorPauseIcon),
}
