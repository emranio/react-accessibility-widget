import { useEffect, useRef } from 'react'
import {
  AccessibilityWidget as AccessibilityWidgetCore,
  type AccessibilityWidgetConfig,
} from '../core'

/** Props for {@link AccessibilityWidget} — identical to the core config. */
export type AccessibilityWidgetProps = AccessibilityWidgetConfig
/** Alias kept for backwards compatibility. */
export type ReactAccessibilityWidgetProps = AccessibilityWidgetProps

/**
 * Declarative React wrapper around the core widget.
 *
 * Renders nothing into the React tree — the widget manages its own DOM under
 * `<body>`. A single core instance is created on mount and destroyed on
 * unmount; prop changes are forwarded to the instance via the relevant setters
 * so the widget updates in place without remounting.
 */
export function AccessibilityWidget(props: AccessibilityWidgetProps) {
  const instanceRef = useRef<AccessibilityWidgetCore | null>(null)
  // Hold the latest props so the mount effect reads them without re-running.
  const propsRef = useRef<AccessibilityWidgetProps>(props)
  propsRef.current = props

  useEffect(() => {
    const instance = new AccessibilityWidgetCore(propsRef.current)
    instanceRef.current = instance
    instance.mount()

    return () => {
      instance.destroy()
      instanceRef.current = null
    }
  }, [])

  // Each prop syncs to the live instance through its dedicated setter.
  useEffect(() => {
    if (!instanceRef.current) return
    if (props.colorScheme) instanceRef.current.setColorScheme(props.colorScheme)
  }, [props.colorScheme])

  useEffect(() => {
    if (!instanceRef.current) return
    if (props.lang) instanceRef.current.setLang(props.lang)
  }, [props.lang])

  useEffect(() => {
    if (!instanceRef.current) return
    if (props.size) instanceRef.current.setSize(props.size)
  }, [props.size])

  useEffect(() => {
    if (!instanceRef.current) return
    if (props.triggerScheme) instanceRef.current.setTriggerScheme(props.triggerScheme)
  }, [props.triggerScheme])

  useEffect(() => {
    if (!instanceRef.current) return
    instanceRef.current.setTitle(props.title)
  }, [props.title])

  useEffect(() => {
    if (!instanceRef.current) return
    instanceRef.current.setAccentColor(props.accentColor)
  }, [props.accentColor])

  useEffect(() => {
    if (!instanceRef.current) return
    instanceRef.current.setTheme(props.theme)
  }, [props.theme])

  return null
}

/** Alias kept for backwards compatibility. */
export const ReactAccessibilityWidget = AccessibilityWidget
