/**
 * HTML escaping helpers.
 *
 * The widget renders its panel and dialogs by building HTML strings and
 * assigning them to `innerHTML`. Any value that originates from user
 * configuration or the host page (titles, link text, headings, …) must be
 * escaped first so it cannot break out of its surrounding markup or inject
 * active content.
 */

/**
 * Escape a string for safe interpolation into HTML **text content** or a
 * double-quoted attribute value.
 *
 * Escapes the five characters that are significant in those contexts:
 * `&`, `<`, `>`, `"`, and `'`. Ampersand is replaced first so the entities
 * introduced for the other characters are not double-escaped.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Escape a string for use inside a double-quoted **attribute** value.
 *
 * A lighter variant of {@link escapeHtml} used when serialising SVG icon
 * attributes, where only `&`, `"`, and `<` need neutralising.
 */
export function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}
