/**
 * Stylesheet assembly.
 *
 * The widget injects a single `<style>` element (id {@link STYLE_ID}) once per
 * document. {@link buildStyles} concatenates the themed partials in cascade
 * order — only the token block depends on the supplied {@link StyleVars}; every
 * other partial is static. The dark-scheme overrides come last so they win over
 * the base component rules.
 */
import { controls } from './controls'
import { fonts } from './fonts'
import { hostEffects } from './host-effects'
import { layout } from './layout'
import { readingTools } from './reading-tools'
import { structure } from './structure'
import { theme } from './theme'
import { DEFAULT_VARS, tokens, type StyleVars } from './tokens'

/** Id of the injected `<style>` element holding the widget's CSS. */
export const STYLE_ID = 'accessibility-widget-styles'

export { DEFAULT_VARS } from './tokens'
export type { StyleVars } from './tokens'

/** Build the complete widget stylesheet for the given theme tokens. */
export function buildStyles(vars: StyleVars = DEFAULT_VARS): string {
  return [
    fonts,
    tokens(vars),
    layout,
    controls,
    structure,
    hostEffects,
    readingTools,
    theme,
  ].join('\n')
}
