/**
 * Standalone IIFE entry.
 *
 * Bundled (via tsup) into `dist/accessibility-widget.global.js` and exposed on
 * `window.AccessibilityWidget`. Including the script auto-mounts the widget from
 * the script tag's `data-*` attributes (or `window.AccessibilityWidgetConfig`);
 * `AccessibilityWidget.init(config)` is available for programmatic control when
 * `data-auto="false"` is set.
 */
import { autoInit } from './embed'

export {
  init,
  destroy,
  getInstance,
  resolveConfig,
  parseConfigFromElement,
  autoInit,
  version,
} from './embed'

autoInit()
