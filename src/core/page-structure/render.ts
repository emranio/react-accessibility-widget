/**
 * Page-structure dialog renderer.
 *
 * Turns the collected {@link PageStructureData} into the dialog's HTML: a
 * tablist (Headings / Landmarks / Links) and the list of jump targets for the
 * active tab. Item ids and labels are escaped because they originate from the
 * host page.
 */
import { ICONS } from '../icons'
import type { Translations } from '../i18n'
import type { PageStructureData, PageStructureItem, PageStructureTab } from '../types'
import { escapeHtml } from '../utils/html'

/** Localised label for a structure tab. */
function tabLabel(tab: PageStructureTab, t: Translations): string {
  if (tab === 'landmarks') return t.structureLandmarks
  if (tab === 'links') return t.structureLinks
  return t.structureHeadings
}

/** Render the tablist that switches between the three structure views. */
function renderTabs(activeTab: PageStructureTab, t: Translations): string {
  const tabs: PageStructureTab[] = ['headings', 'landmarks', 'links']
  return `
    <div class="accessibility-widget-structure-tabs" role="tablist" aria-label="${escapeHtml(t.pageStructure)}">
      ${tabs.map(tab => `
        <button type="button" class="accessibility-widget-structure-tab" role="tab" data-structure-tab="${tab}" aria-selected="${activeTab === tab}">
          ${escapeHtml(tabLabel(tab, t))}
        </button>
      `).join('')}
    </div>
  `
}

/** Render the leading badge for an item: heading level text or a role icon. */
function renderBadge(tab: PageStructureTab, item: PageStructureItem): string {
  if (tab === 'headings') {
    return `<span class="accessibility-widget-structure-badge accessibility-widget-structure-badge--text">${escapeHtml(item.meta)}</span>`
  }
  const icon = tab === 'links' ? ICONS.structureLink : ICONS.structureLandmark
  return `<span class="accessibility-widget-structure-badge">${icon}</span>`
}

/** Render the list of jump targets for the active tab (or an empty state). */
function renderItems(items: PageStructureItem[], activeTab: PageStructureTab, t: Translations): string {
  if (items.length === 0) {
    return `<div class="accessibility-widget-structure-empty">${escapeHtml(t.noStructureItems)}</div>`
  }

  return items.map(item => `
    <button type="button" class="accessibility-widget-structure-item" data-structure-target="${escapeHtml(item.id)}" style="--accessibility-widget-structure-depth:${item.depth ?? 0}">
      ${renderBadge(activeTab, item)}
      <span class="accessibility-widget-structure-item-label">${escapeHtml(item.label)}</span>
      ${item.external ? `<span class="accessibility-widget-structure-external">${ICONS.structureExternal}</span>` : ''}
    </button>
  `).join('')
}

/** Render the complete Page Structure dialog for the active tab. */
export function renderPageStructureDialog(
  data: PageStructureData,
  activeTab: PageStructureTab,
  t: Translations,
): string {
  const items = data[activeTab]

  return `
    <div class="accessibility-widget-structure-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(t.pageStructure)}">
      <div class="accessibility-widget-structure-header">
        <h2>${escapeHtml(t.pageStructure)}</h2>
        <button type="button" class="accessibility-widget-structure-close" data-structure-action="close" aria-label="${escapeHtml(t.close)}">
          ${ICONS.close}
        </button>
      </div>
      ${renderTabs(activeTab, t)}
      <div class="accessibility-widget-structure-list" role="tabpanel" aria-label="${escapeHtml(tabLabel(activeTab, t))}">
        ${renderItems(items, activeTab, t)}
      </div>
    </div>
  `
}
