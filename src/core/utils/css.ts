/**
 * Small helpers for imperatively driving CSS custom properties on an element.
 */

/**
 * Set or remove a CSS custom property on an element.
 *
 * The value is trimmed; if it is `null`, `undefined`, or empty after trimming
 * the property is **removed** rather than set to an empty string. This keeps
 * inline styles clean and lets callers express "no override" by passing a
 * falsy value.
 *
 * @param el     Target element.
 * @param name   Custom property name, including the leading `--`.
 * @param value  Value to set, or a falsy value to remove the property.
 */
export function setCssVar(el: HTMLElement, name: string, value?: string | null): void {
  const normalized = value?.trim()
  if (normalized) el.style.setProperty(name, normalized)
  else el.style.removeProperty(name)
}
