/**
 * Standalone embed runtime (no React).
 *
 * The core {@link AccessibilityWidget} renders its own DOM and has no React
 * runtime dependency, so it can be dropped onto any page via a single
 * `<script>` tag. This module exposes the small embed API — config parsing,
 * `init`, `destroy` — with **no import-time side effects** so it can be unit
 * tested. The side-effectful auto-mount lives in `index.ts`, the IIFE entry.
 */
import {
  AccessibilityWidget,
  type AccessibilityWidgetConfig,
  type TriggerScheme,
  type WidgetSize,
} from '../core'

/** Package version, surfaced on the global for diagnostics. Keep in sync with package.json. */
export const version = '0.2.5'

/** Optional global config object read at auto-init: `window.AccessibilityWidgetConfig`. */
interface WidgetGlobal extends Window {
  AccessibilityWidgetConfig?: AccessibilityWidgetConfig
}

/** A single mounted instance (the embed is a singleton per page). */
let instance: AccessibilityWidget | null = null

/** Parse a finite number from an attribute value, or `undefined`. */
function parseNumber(value: string | undefined): number | undefined {
  if (value == null || value.trim() === '') return undefined
  const n = Number(value)
  return Number.isFinite(n) ? n : undefined
}

/**
 * Build a config from a script tag's `data-*` attributes.
 *
 * Recognised: `data-title`, `data-accent-color`, `data-position` (left|right),
 * `data-size` (S|L), `data-offset-x`, `data-offset-y`, `data-trigger-scheme`
 * (auto|dark|light), `data-persistence` (false to disable).
 */
export function parseConfigFromElement(el: Element | null): AccessibilityWidgetConfig {
  if (!el || typeof HTMLElement === 'undefined' || !(el instanceof HTMLElement)) return {}
  const d = el.dataset
  const config: AccessibilityWidgetConfig = {}

  if (d.title != null) config.title = d.title
  if (d.accentColor != null) config.accentColor = d.accentColor
  if (d.position === 'left' || d.position === 'right') config.position = d.position
  if (d.size) {
    const size = d.size.toUpperCase()
    if (size === 'S' || size === 'L') config.size = size as WidgetSize
  }
  const offsetX = parseNumber(d.offsetX)
  if (offsetX != null) config.offsetX = offsetX
  const offsetY = parseNumber(d.offsetY)
  if (offsetY != null) config.offsetY = offsetY
  if (d.triggerScheme === 'auto' || d.triggerScheme === 'dark' || d.triggerScheme === 'light') {
    config.triggerScheme = d.triggerScheme as TriggerScheme
  }
  if (d.persistence != null) config.persistence = d.persistence !== 'false'

  return config
}

/** The resolved config plus whether auto-mounting is enabled. */
export interface ResolvedEmbedConfig {
  config: AccessibilityWidgetConfig
  auto: boolean
}

/**
 * Merge the global config object with the script tag's data attributes.
 * Data attributes take precedence over the global object. Auto-mounting is on
 * unless the script carries `data-auto="false"`.
 */
export function resolveConfig(script: Element | null): ResolvedEmbedConfig {
  const fromAttributes = parseConfigFromElement(script)
  const fromGlobal =
    (typeof window !== 'undefined' && (window as WidgetGlobal).AccessibilityWidgetConfig) || {}
  const config: AccessibilityWidgetConfig = { ...fromGlobal, ...fromAttributes }
  const autoAttr =
    script && typeof HTMLElement !== 'undefined' && script instanceof HTMLElement
      ? script.dataset.auto
      : undefined
  return { config, auto: autoAttr !== 'false' }
}

/** Mount the widget (idempotent: returns the existing instance if already mounted). */
export function init(config: AccessibilityWidgetConfig = {}): AccessibilityWidget {
  if (instance) return instance
  const widget = new AccessibilityWidget(config)
  widget.mount()
  instance = widget
  return widget
}

/** The currently mounted instance, or `null`. */
export function getInstance(): AccessibilityWidget | null {
  return instance
}

/** Destroy the mounted instance, if any. */
export function destroy(): void {
  if (instance) {
    instance.destroy()
    instance = null
  }
}

/**
 * Resolve config from the given script (defaulting to the currently executing
 * one) and mount the widget once the DOM is ready, unless disabled.
 */
export function autoInit(
  script: Element | null = typeof document !== 'undefined' ? document.currentScript : null,
): void {
  if (typeof document === 'undefined') return
  const { config, auto } = resolveConfig(script)
  if (!auto) return
  const run = () => init(config)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true })
  } else {
    run()
  }
}
