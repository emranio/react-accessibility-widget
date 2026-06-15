/**
 * Public entry point for the framework-agnostic core.
 *
 * Re-exports the widget class and its public types. Framework bindings (e.g.
 * `src/react`) and consumers should import from here rather than reaching into
 * individual modules.
 */
export { AccessibilityWidget } from './widget'

export type {
  AccessibilityProfile,
  AccessibilityWidgetConfig,
  AccessibilityWidgetState,
  ColorScheme,
  Lang,
  PageStructureData,
  PageStructureItem,
  PageStructureTab,
  Position,
  TextAlignment,
  TriggerScheme,
  WidgetSize,
} from './types'
