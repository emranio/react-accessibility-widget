/**
 * Host wrapper management.
 *
 * Page-level effects (font scaling, contrast, colour filters, …) must apply to
 * the host page **without** affecting the widget's own UI. To achieve that, on
 * mount we move every top-level body node into a single wrapper element
 * (`#accessibility-widget-host`) and apply effects to that wrapper instead of
 * to `<body>`. The widget root is deliberately left as a sibling of the
 * wrapper so it is never touched by those effects.
 */

/** Id of the `<style>` element that holds dynamically generated effect CSS. */
const HOST_STYLE_ID = 'accessibility-widget-host-effects'

/** Id of the wrapper element that contains all host-page content. */
export const HOST_WRAPPER_ID = 'accessibility-widget-host'

/**
 * Get (creating if necessary) the shared `<style>` element used to inject
 * dynamically generated effect rules into the document head.
 */
export function ensureHostStyle(): HTMLStyleElement {
  let el = document.getElementById(HOST_STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = HOST_STYLE_ID
    document.head.appendChild(el)
  }
  return el
}

/** Clear the dynamic effect CSS, if the style element exists. */
export function clearHostStyle(): void {
  const host = document.getElementById(HOST_STYLE_ID)
  if (host) host.textContent = ''
}

/**
 * Ensure the host wrapper exists, moving existing body content into it.
 *
 * Idempotent: if the wrapper already exists it is returned untouched. The
 * widget root and any pre-existing wrapper are explicitly **not** moved.
 */
export function ensureHostWrapper(): HTMLDivElement {
  let wrapper = document.getElementById(HOST_WRAPPER_ID) as HTMLDivElement | null
  if (wrapper) return wrapper

  wrapper = document.createElement('div')
  wrapper.id = HOST_WRAPPER_ID
  const body = document.body
  const moved: Node[] = []
  for (const node of Array.from(body.childNodes)) {
    if (node instanceof HTMLElement && (node.classList.contains('accessibility-widget-root') || node.id === HOST_WRAPPER_ID)) {
      continue
    }
    moved.push(node)
  }
  for (const node of moved) wrapper.appendChild(node)
  body.insertBefore(wrapper, body.firstChild)
  return wrapper
}

/**
 * Reverse {@link ensureHostWrapper}: move the wrapper's children back to the
 * body and remove the wrapper. Safe to call when no wrapper exists.
 */
export function unwrapHost(): void {
  const wrapper = document.getElementById(HOST_WRAPPER_ID)
  if (!wrapper) return
  const body = wrapper.parentElement
  if (!body) return
  while (wrapper.firstChild) body.insertBefore(wrapper.firstChild, wrapper)
  wrapper.remove()
}
