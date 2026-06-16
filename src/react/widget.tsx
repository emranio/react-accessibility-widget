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
    if (props.size) instanceRef.current.setSize(props.size)
  }, [props.size])

  useEffect(() => {
    if (!instanceRef.current) return
    if (props.position) instanceRef.current.setPosition(props.position)
  }, [props.position])

  useEffect(() => {
    if (!instanceRef.current) return
    instanceRef.current.setOffsetX(props.offsetX)
  }, [props.offsetX])

  useEffect(() => {
    if (!instanceRef.current) return
    instanceRef.current.setOffsetY(props.offsetY)
  }, [props.offsetY])

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

  useEffect(() => {
    if (!instanceRef.current) return
    instanceRef.current.setHiddenProfiles(props.hiddenProfiles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(props.hiddenProfiles)])

  useEffect(() => {
    if (!instanceRef.current) return
    instanceRef.current.setHiddenTools(props.hiddenTools)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(props.hiddenTools)])

  return null
}

/** Alias kept for backwards compatibility. */
export const ReactAccessibilityWidget = AccessibilityWidget
