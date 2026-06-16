/**
 * Minimal no-op React stand-in for the standalone (no-React) bundle.
 *
 * lucide-react's icon modules import a handful of React APIs to build icon
 * *components* via `createLucideIcon()`. The standalone widget only consumes the
 * raw icon node data (`__iconNode`) and never renders those components, so the
 * standalone tsup target aliases `react` to this stub at build time. That lets
 * the dead component code compile against inert no-ops instead of pulling the
 * entire React runtime (~70 KB) into a drop-in script.
 *
 * These functions are only ever reached at module load (e.g. `forwardRef(...)`,
 * `createContext(...)`), never at render time, so no-ops are safe.
 */
type AnyFn = (...args: unknown[]) => unknown

export const forwardRef = (render: AnyFn): AnyFn => render
export const createElement = (): null => null
export const createContext = (value?: unknown) => ({
  Provider: () => null,
  Consumer: () => null,
  _currentValue: value,
})
export const useContext = (): Record<string, unknown> => ({})
export const useMemo = (factory: AnyFn): unknown => factory()
export const useState = (initial: unknown): [unknown, AnyFn] => [initial, () => {}]
export const useEffect = (): void => {}
export const memo = (component: unknown): unknown => component
export const Fragment = 'fragment'

export default {
  forwardRef,
  createElement,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  memo,
  Fragment,
}
