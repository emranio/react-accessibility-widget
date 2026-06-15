/**
 * The framework-agnostic accessibility widget.
 *
 * {@link AccessibilityWidget} owns the full lifecycle: it injects styles, builds
 * the trigger / overlay / panel / structure-dialog DOM, renders the panel from
 * state, delegates click handling, drives the page effects, and persists state.
 * The React bindings in `src/react` are a thin wrapper around this class.
 */
import { applyEffects, clearEffects, ensureHostWrapper, unwrapHost } from './effects'
import { ICONS } from './icons'
import { getTranslations } from './i18n'
import { releaseFocus, trapFocus } from './keyboard'
import { collectPageStructure, renderPageStructureDialog } from './page-structure'
import { loadState, saveState } from './persistence'
import { PROFILE_PRESETS } from './profiles'
import { renderPanel } from './render'
import { DEFAULT_VARS, STYLE_ID, buildStyles } from './styles'
import { LEVEL_TOOLS, TOOL_MAX_LEVELS, type LevelToolKey } from './tool-levels'
import {
  DEFAULT_STATE,
  type AccessibilityProfile,
  type AccessibilityWidgetConfig,
  type AccessibilityWidgetState,
  type AdjustmentLevel,
  type ColorScheme,
  type Lang,
  type PageStructureTab,
  type TextAlignment,
  type TriggerScheme,
  type WidgetSize,
} from './types'
import { setCssVar } from './utils/css'

/** Colour effects that are mutually exclusive — enabling one clears the rest. */
const COLOR_EXCLUSIVE: Array<keyof AccessibilityWidgetState> = [
  'darkContrast',
  'lightContrast',
  'highContrast',
  'monochrome',
  'invertColors',
]

/** Ordered text-alignment values cycled through by the alignment tool. */
const ALIGNMENT_LEVELS: TextAlignment[] = ['left', 'center', 'right', 'justify']

/** Coerce an arbitrary size value to a supported {@link WidgetSize}. */
function normalizeSize(size: unknown): WidgetSize {
  return size === 'XL' ? 'XL' : 'S'
}

export class AccessibilityWidget {
  private readonly config: AccessibilityWidgetConfig
  private size: WidgetSize
  private lang: Lang
  private scheme: ColorScheme
  private state: AccessibilityWidgetState
  private root: HTMLDivElement | null = null
  private trigger: HTMLButtonElement | null = null
  private overlay: HTMLDivElement | null = null
  private panel: HTMLDivElement | null = null
  private structureDialog: HTMLDivElement | null = null
  private isOpen = false
  private pageStructureOpen = false
  private pageStructureTab: PageStructureTab = 'headings'

  constructor(config: AccessibilityWidgetConfig = {}) {
    this.config = {
      position: 'bottom-right',
      persistence: true,
      lang: 'en',
      colorScheme: 'light',
      ...config,
    }
    this.size = normalizeSize(this.config.size)
    this.lang = this.config.lang ?? 'en'
    this.scheme = this.config.colorScheme ?? 'light'
    this.state = loadState(this.config.persistence!)
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────

  /** Inject styles, wrap the host page, and build/attach the widget DOM. */
  mount(): void {
    if (typeof document === 'undefined') return
    this.injectStyles()

    ensureHostWrapper()

    this.root = document.createElement('div')
    this.root.className = 'accessibility-widget-root'
    this.root.setAttribute('role', 'complementary')
    this.root.dataset.scheme = this.scheme === 'dark' ? 'dark' : 'light'
    this.applyTheme()

    this.trigger = document.createElement('button')
    this.trigger.className = 'accessibility-widget-trigger'
    this.trigger.type = 'button'
    this.trigger.dataset.position = this.config.position!
    this.trigger.setAttribute('aria-expanded', 'false')
    this.trigger.innerHTML = ICONS.trigger
    this.trigger.addEventListener('click', () => this.toggle())

    this.overlay = document.createElement('div')
    this.overlay.className = 'accessibility-widget-overlay'
    this.overlay.addEventListener('click', () => {
      if (this.pageStructureOpen) this.closePageStructure()
      else this.close()
    })

    this.panel = document.createElement('div')
    this.panel.className = 'accessibility-widget-panel'
    this.panel.setAttribute('role', 'dialog')
    this.panel.setAttribute('aria-modal', 'true')
    this.panel.dataset.position = this.config.position!
    this.panel.dataset.size = this.size
    this.panel.addEventListener('click', e => this.handlePanelClick(e))

    this.structureDialog = document.createElement('div')
    this.structureDialog.className = 'accessibility-widget-structure-layer'
    this.structureDialog.hidden = true
    this.structureDialog.addEventListener('click', e => this.handleStructureClick(e))

    this.root.append(this.trigger, this.overlay, this.panel, this.structureDialog)
    // Always append to <body> directly so the widget lives as a sibling
    // of #accessibility-widget-host and is never affected by the effects (font-size,
    // contrast, filters etc) applied to the page content wrapper.
    document.body.appendChild(this.root)

    this.update()
    applyEffects(this.state)
  }

  /** Tear down all DOM, listeners, effects, and the host wrapper. */
  destroy(): void {
    clearEffects()
    unwrapHost()
    releaseFocus()
    if (this.root) {
      this.root.remove()
      this.root = null
    }
    this.trigger = null
    this.overlay = null
    this.panel = null
    this.structureDialog = null
  }

  // ── Open / close ───────────────────────────────────────────────────────

  /** Open the panel and trap focus within it. */
  open(): void {
    this.isOpen = true
    this.trigger?.setAttribute('aria-expanded', 'true')
    this.config.onOpen?.()
    this.update()
    if (this.panel && this.trigger) trapFocus(this.panel, this.trigger)
  }

  /** Close the panel (and the structure dialog) and release focus. */
  close(): void {
    this.isOpen = false
    this.pageStructureOpen = false
    this.trigger?.setAttribute('aria-expanded', 'false')
    this.config.onClose?.()
    releaseFocus()
    this.update()
  }

  /** Toggle the panel open/closed. */
  toggle(): void {
    if (this.isOpen) this.close()
    else this.open()
  }

  /** Reset all settings to defaults, persist, and re-apply effects. */
  reset(): void {
    this.pageStructureOpen = false
    this.state = { ...DEFAULT_STATE }
    this.persist()
    applyEffects(this.state)
    this.config.onReset?.()
    this.update()
  }

  // ── Public accessors ───────────────────────────────────────────────────

  /** A copy of the current widget state. */
  getState(): AccessibilityWidgetState {
    return { ...this.state }
  }

  /** Whether the panel is currently open. */
  getIsOpen(): boolean {
    return this.isOpen
  }

  // ── Runtime configuration setters ──────────────────────────────────────

  /** Change the panel size (S / XL). */
  setSize(size: WidgetSize): void {
    this.size = normalizeSize(size)
    if (this.panel) this.panel.dataset.size = this.size
    this.update()
  }

  /** Change the panel language. */
  setLang(lang: Lang): void {
    this.lang = lang
    this.update()
  }

  /** Override the widget title used in the header and accessible labels. */
  setTitle(title?: string): void {
    this.config.title = title
    this.updateWidgetLabels()
    this.update()
  }

  /** Override the accent colour (takes precedence over `theme.primary`). */
  setAccentColor(accentColor?: string): void {
    this.config.accentColor = accentColor
    this.applyTheme()
  }

  /** Override the lower-level theme (primary / background / text). */
  setTheme(theme?: AccessibilityWidgetConfig['theme']): void {
    this.config.theme = theme
    this.applyTheme()
  }

  /** Change the colour scheme; refreshes the trigger when it tracks 'auto'. */
  setColorScheme(scheme: ColorScheme): void {
    this.scheme = scheme
    this.applyScheme()
    // If trigger is on 'auto' (matches colorScheme), refresh it too so the
    // trigger color follows when colorScheme changes at runtime.
    if ((this.config.triggerScheme ?? 'auto') === 'auto') this.applyTriggerScheme()
  }

  /** Override the trigger button colour preset. */
  setTriggerScheme(scheme: TriggerScheme): void {
    this.config.triggerScheme = scheme
    this.applyTriggerScheme()
  }

  // ── Theming ────────────────────────────────────────────────────────────

  private applyScheme(): void {
    if (!this.root) return
    this.root.dataset.scheme = this.scheme === 'dark' ? 'dark' : 'light'
  }

  private getTitle(): string {
    return this.config.title?.trim() || getTranslations(this.lang).title
  }

  private getTriggerLabel(title: string): string {
    return title.toLowerCase().includes('menu') ? `Open ${title}` : `Open ${title} menu`
  }

  private updateWidgetLabels(): void {
    const title = this.getTitle()
    this.root?.setAttribute('aria-label', title)
    this.trigger?.setAttribute('aria-label', this.getTriggerLabel(title))
    this.panel?.setAttribute('aria-label', `${title} settings`)
  }

  private applyTheme(): void {
    if (!this.root) return
    const accentColor = this.config.accentColor?.trim() || this.config.theme?.primary
    const t = this.config.theme
    setCssVar(this.root, '--accessibility-widget-primary', accentColor)
    setCssVar(this.root, '--accessibility-widget-primary-dark', accentColor)
    setCssVar(this.root, '--accessibility-widget-header-bg', accentColor)
    setCssVar(this.root, '--accessibility-widget-bg', t?.background)
    setCssVar(this.root, '--accessibility-widget-text', t?.text)
    this.applyTriggerScheme()
  }

  private applyTriggerScheme(): void {
    if (!this.root) return
    // Resolution chain:
    //   1. explicit config.triggerScheme other than 'auto' wins
    //   2. 'auto' (or unset) → match this.scheme (the resolved colorScheme,
    //      which itself defaults to 'light' when not passed)
    let resolved: 'dark' | 'light'
    const wanted = this.config.triggerScheme ?? 'auto'
    if (wanted === 'dark' || wanted === 'light') {
      resolved = wanted
    } else {
      resolved = this.scheme === 'dark' ? 'dark' : 'light'
    }
    if (resolved === 'dark') {
      this.root.style.setProperty('--accessibility-widget-trigger-bg', '#0c0c0c')
      this.root.style.setProperty('--accessibility-widget-trigger-icon', '#ffffff')
    } else {
      this.root.style.setProperty('--accessibility-widget-trigger-bg', '#ffffff')
      this.root.style.setProperty('--accessibility-widget-trigger-icon', '#0c0c0c')
    }
  }

  // ── Panel click handling ───────────────────────────────────────────────

  private handlePanelClick(e: MouseEvent): void {
    const target = e.target as HTMLElement
    if (target.closest<HTMLElement>('.accessibility-widget-close')) { this.close(); return }
    if (this.handleActionClick(target)) return
    if (this.handleSizeClick(target)) return
    if (this.handleProfileClick(target)) return
    this.handleToolClick(target)
  }

  private handleActionClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-action]')
    if (!btn) return false
    if (btn.dataset.action === 'reset') this.reset()
    return true
  }

  private handleSizeClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-size]')
    if (!btn || !this.panel?.contains(btn) || !btn.classList.contains('accessibility-widget-size-switch')) return false
    this.setSize(btn.dataset.size as WidgetSize)
    return true
  }

  private handleProfileClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-profile]')
    if (!btn) return false
    this.toggleProfile(btn.dataset.profile as AccessibilityProfile)
    return true
  }

  private handleToolClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-tool]')
    if (!btn) return false
    const key = btn.dataset.tool
    if (key === 'pageStructure') this.togglePageStructure()
    else if (key === 'textAlignment') this.cycleAlignment()
    else if (key && LEVEL_TOOLS.includes(key as LevelToolKey)) this.cycleLevel(key as LevelToolKey)
    return true
  }

  // ── Page structure dialog ──────────────────────────────────────────────

  private handleStructureClick(e: MouseEvent): void {
    const target = e.target as HTMLElement
    if (target.closest<HTMLElement>('[data-structure-action="close"]')) {
      this.closePageStructure()
      return
    }

    const tab = target.closest<HTMLElement>('[data-structure-tab]')
    if (tab) {
      this.pageStructureTab = this.normalizeStructureTab(tab.dataset.structureTab)
      this.update()
      return
    }

    const item = target.closest<HTMLElement>('[data-structure-target]')
    if (item?.dataset.structureTarget) {
      this.jumpToStructureTarget(item.dataset.structureTarget)
    }
  }

  private normalizeStructureTab(tab: string | undefined): PageStructureTab {
    if (tab === 'landmarks' || tab === 'links') return tab
    return 'headings'
  }

  private togglePageStructure(): void {
    if (this.pageStructureOpen) this.closePageStructure()
    else this.openPageStructure()
  }

  private openPageStructure(): void {
    this.pageStructureTab = 'headings'
    this.pageStructureOpen = true
    this.update()
    this.trapStructureFocus()
  }

  private closePageStructure(): void {
    if (!this.pageStructureOpen) return
    this.pageStructureOpen = false
    releaseFocus()
    this.update()
    if (this.isOpen && this.panel && this.trigger) trapFocus(this.panel, this.trigger)
  }

  private trapStructureFocus(): void {
    const closeBtn = this.structureDialog?.querySelector<HTMLElement>('.accessibility-widget-structure-close')
    if (!this.structureDialog || !closeBtn) return
    trapFocus(this.structureDialog, closeBtn, () => this.closePageStructure())
  }

  private jumpToStructureTarget(id: string): void {
    const target = document.querySelector<HTMLElement>(`[data-accessibility-widget-structure-id="${id}"]`)
    if (!target) return
    this.closePageStructure()
    target.scrollIntoView({ block: 'center', behavior: 'smooth' })
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }

  // ── State mutations ────────────────────────────────────────────────────

  private toggleProfile(id: AccessibilityProfile): void {
    if (this.state.profile === id) {
      this.state = { ...DEFAULT_STATE }
    } else {
      const preset = PROFILE_PRESETS[id] ?? {}
      this.state = { ...DEFAULT_STATE, profile: id, ...preset }
    }
    this.commit()
  }

  private cycleLevel(key: LevelToolKey): void {
    const current = this.state[key]
    if (typeof current !== 'number') return
    const maxLevel = TOOL_MAX_LEVELS[key]
    const next = (current >= maxLevel ? 0 : current + 1) as AdjustmentLevel
    if (COLOR_EXCLUSIVE.includes(key) && next > 0) {
      for (const k of COLOR_EXCLUSIVE) {
        if (k !== key) (this.state as unknown as Record<string, unknown>)[k] = 0
      }
    }
    ;(this.state as unknown as Record<string, unknown>)[key] = next
    this.commit()
  }

  private cycleAlignment(): void {
    const currentIndex = ALIGNMENT_LEVELS.indexOf(this.state.textAlignment)
    this.state.textAlignment = ALIGNMENT_LEVELS[(currentIndex + 1) % ALIGNMENT_LEVELS.length]
    this.commit()
  }

  /** Persist, apply effects, and re-render after a state change. */
  private commit(): void {
    this.persist()
    applyEffects(this.state)
    this.update()
  }

  private persist(): void {
    saveState(this.config.persistence!, this.state)
  }

  // ── Rendering ──────────────────────────────────────────────────────────

  private update(): void {
    if (!this.panel) return
    this.updateWidgetLabels()
    this.panel.classList.toggle('open', this.isOpen)
    this.overlay?.classList.toggle('open', this.isOpen)
    const prevScroll = this.panel.querySelector<HTMLElement>('.accessibility-widget-body')?.scrollTop ?? 0
    this.panel.innerHTML = renderPanel(this.state, this.size, this.lang, {
      pageStructureOpen: this.pageStructureOpen,
      title: this.getTitle(),
    })
    const nextBody = this.panel.querySelector<HTMLElement>('.accessibility-widget-body')
    if (nextBody) nextBody.scrollTop = prevScroll
    this.renderStructureDialog()
    this.applyScheme()
  }

  private renderStructureDialog(): void {
    if (!this.structureDialog) return
    this.structureDialog.hidden = !this.pageStructureOpen
    this.structureDialog.classList.toggle('open', this.pageStructureOpen)
    if (!this.pageStructureOpen) {
      this.structureDialog.innerHTML = ''
      return
    }
    const t = getTranslations(this.lang)
    const data = collectPageStructure(t)
    this.structureDialog.innerHTML = renderPageStructureDialog(data, this.pageStructureTab, t, this.lang)
  }

  private injectStyles(): void {
    if (typeof document === 'undefined') return
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = buildStyles(DEFAULT_VARS)
    document.head.appendChild(style)
  }
}
