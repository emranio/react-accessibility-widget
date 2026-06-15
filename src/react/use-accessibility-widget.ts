import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AccessibilityWidget as AccessibilityWidgetCore,
  type AccessibilityWidgetConfig,
  type AccessibilityWidgetState,
} from '../core'

/**
 * Imperative hook for driving the widget from your own UI.
 *
 * Mounts a core instance on mount (destroyed on unmount) and returns memoised
 * controls plus reactive `state`/`isOpen`. Use this when you want to open,
 * close, reset, or re-theme the widget from a custom button instead of relying
 * on the built-in trigger.
 */
export function useAccessibilityWidget(config: AccessibilityWidgetConfig = {}) {
  const instanceRef = useRef<AccessibilityWidgetCore | null>(null)
  const [state, setState] = useState<AccessibilityWidgetState | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const instance = new AccessibilityWidgetCore(config)
    instanceRef.current = instance
    instance.mount()
    setState(instance.getState())
    return () => {
      instance.destroy()
      instanceRef.current = null
    }
  }, [])

  const open = useCallback(() => {
    instanceRef.current?.open()
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    instanceRef.current?.close()
    setIsOpen(false)
  }, [])

  const toggle = useCallback(() => {
    instanceRef.current?.toggle()
    setIsOpen(prev => !prev)
  }, [])

  const reset = useCallback(() => {
    instanceRef.current?.reset()
    if (instanceRef.current) {
      setState(instanceRef.current.getState())
    }
  }, [])

  const setTitle = useCallback((title?: string) => {
    instanceRef.current?.setTitle(title)
  }, [])

  const setAccentColor = useCallback((accentColor?: string) => {
    instanceRef.current?.setAccentColor(accentColor)
  }, [])

  const setTheme = useCallback((theme?: AccessibilityWidgetConfig['theme']) => {
    instanceRef.current?.setTheme(theme)
  }, [])

  return { open, close, toggle, reset, setTitle, setAccentColor, setTheme, state, isOpen }
}
