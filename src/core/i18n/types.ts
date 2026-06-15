/**
 * Shape of a complete translation bundle.
 *
 * Every supported language must provide a value for each key. The keys are
 * grouped by where they surface in the UI (header, sections, profiles, content
 * tools, colour tools, …) to keep the per-language files easy to scan.
 */
export interface Translations {
  // Header & chrome
  title: string
  subtitle: string
  widgetSettings: string
  widgetSize: string
  widgetPosition: string
  smallSize: string
  largeSize: string
  leftPosition: string
  rightPosition: string
  profiles: string
  contentAdjustments: string
  colorAdjustments: string
  visibilityAdjustments: string
  pageStructure: string
  structureHeadings: string
  structureLandmarks: string
  structureLinks: string
  noStructureItems: string
  untitledHeading: string
  untitledLink: string
  resetAll: string
  close: string
  // Profiles
  seizureSafe: string
  visionImpaired: string
  lightSensitivity: string
  colorBlind: string
  dyslexia: string
  adhdFriendly: string
  cognitiveDisability: string
  // Content adjustments
  legibleFonts: string
  dyslexiaFriendly: string
  highlightTitles: string
  fontSize: string
  textMagnifier: string
  readingLens: string
  bigCursor: string
  readingMask: string
  readingGuide: string
  highlightLinks: string
  lineHeight: string
  letterSpacing: string
  textAlign: string
  // Colour adjustments
  darkContrast: string
  lightContrast: string
  highContrast: string
  monochrome: string
  invertColors: string
  hideImages: string
  offAnimations: string
}
