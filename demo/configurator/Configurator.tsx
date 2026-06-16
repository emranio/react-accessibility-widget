/**
 * Visual configurator / live builder.
 *
 * Lets a site owner tune the widget (appearance, placement, which profiles and
 * tools are visible) and an accessibility statement, see the real widget update
 * live, and copy a ready-to-paste embed snippet (standalone <script> or React),
 * a JSON config, or the generated statement.
 */
import { useMemo, useState } from 'react'
import { AccessibilityWidget, generateAccessibilityStatement } from '../../src/react'
import type {
  AccessibilityProfile,
  ComplianceStandard,
  ConformanceStatus,
  Position,
  ToolKey,
  TriggerScheme,
  WcagLevel,
  WcagVersion,
  WidgetSize,
} from '../../src/core'

const CDN = 'https://unpkg.com/@firefam/react-accessibility-widget/dist/accessibility-widget.global.js'

const PROFILES: Array<{ id: AccessibilityProfile; label: string }> = [
  { id: 'seizure-safe', label: 'Seizure Safe' },
  { id: 'vision-impaired', label: 'Vision Impaired' },
  { id: 'light-sensitivity', label: 'Light Sensitivity' },
  { id: 'color-blind', label: 'Color Blind' },
  { id: 'dyslexia', label: 'Dyslexia' },
  { id: 'adhd-friendly', label: 'ADHD Friendly' },
  { id: 'cognitive-disability', label: 'Cognitive Disability' },
]

const TOOLS: Array<{ id: ToolKey; label: string; group: 'Content' | 'Color' | 'Visibility' }> = [
  { id: 'legibleFonts', label: 'Legible Fonts', group: 'Content' },
  { id: 'highlightTitles', label: 'Highlight Titles', group: 'Content' },
  { id: 'fontSize', label: 'Font Size', group: 'Content' },
  { id: 'textMagnifier', label: 'Text Magnifier', group: 'Content' },
  { id: 'highlightLinks', label: 'Highlight Links', group: 'Content' },
  { id: 'lineHeight', label: 'Line Height', group: 'Content' },
  { id: 'letterSpacing', label: 'Letter Spacing', group: 'Content' },
  { id: 'textAlignment', label: 'Text Alignment', group: 'Content' },
  { id: 'darkContrast', label: 'Dark Contrast', group: 'Color' },
  { id: 'lightContrast', label: 'Light Contrast', group: 'Color' },
  { id: 'highContrast', label: 'High Contrast', group: 'Color' },
  { id: 'monochrome', label: 'Monochrome', group: 'Color' },
  { id: 'invertColors', label: 'Invert Colors', group: 'Color' },
  { id: 'colorBlind', label: 'Color-Blind Filter', group: 'Color' },
  { id: 'readingLens', label: 'Reading Lens', group: 'Visibility' },
  { id: 'bigCursor', label: 'Big Cursor', group: 'Visibility' },
  { id: 'readingMask', label: 'Reading Mask', group: 'Visibility' },
  { id: 'readingGuide', label: 'Reading Guide', group: 'Visibility' },
  { id: 'pageStructure', label: 'Page Structure', group: 'Visibility' },
  { id: 'hideImages', label: 'Hide Images', group: 'Visibility' },
  { id: 'offAnimations', label: 'Reduce Animations', group: 'Visibility' },
]

const STANDARDS: ComplianceStandard[] = ['ADA', 'Section 508', 'AODA', 'EN 301 549', 'EAA']
const PRESETS = ['#1d4ed8', '#c2410c', '#15803d', '#7c3aed', '#0f766e', '#be123c']

type OutputTab = 'script' | 'react' | 'json' | 'statement'

/** Toggle an id in/out of a list (immutably). */
function toggle<T>(list: T[], id: T): T[] {
  return list.includes(id) ? list.filter(x => x !== id) : [...list, id]
}

/** Escape double quotes for safe display inside a quoted HTML attribute snippet. */
function attr(value: string): string {
  return value.replace(/"/g, '&quot;')
}

export default function Configurator() {
  // Appearance / behavior
  const [title, setTitle] = useState('Accessibility')
  const [accentColor, setAccentColor] = useState('#1d4ed8')
  const [position, setPosition] = useState<Position>('right')
  const [size, setSize] = useState<WidgetSize>('S')
  const [triggerScheme, setTriggerScheme] = useState<TriggerScheme>('auto')
  const [offsetX, setOffsetX] = useState(20)
  const [offsetY, setOffsetY] = useState(20)
  const [persistence, setPersistence] = useState(true)

  // Visible features
  const [hiddenProfiles, setHiddenProfiles] = useState<AccessibilityProfile[]>([])
  const [hiddenTools, setHiddenTools] = useState<ToolKey[]>([])

  // Accessibility statement
  const [organizationName, setOrganizationName] = useState('Acme Inc.')
  const [websiteUrl, setWebsiteUrl] = useState('https://acme.example')
  const [email, setEmail] = useState('accessibility@acme.example')
  const [phone, setPhone] = useState('')
  const [wcagVersion, setWcagVersion] = useState<WcagVersion>('2.1')
  const [wcagLevel, setWcagLevel] = useState<WcagLevel>('AA')
  const [conformanceStatus, setConformanceStatus] = useState<ConformanceStatus>('partially')
  const [standards, setStandards] = useState<ComplianceStandard[]>(['ADA', 'Section 508'])
  const [knownLimitations, setKnownLimitations] = useState('')
  const [mentionWidget, setMentionWidget] = useState(true)

  // UI
  const [tab, setTab] = useState<OutputTab>('script')
  const [copied, setCopied] = useState('')

  const statement = useMemo(
    () =>
      generateAccessibilityStatement({
        organizationName,
        websiteUrl: websiteUrl || undefined,
        email: email || undefined,
        phone: phone || undefined,
        wcagVersion,
        wcagLevel,
        conformanceStatus,
        standards,
        knownLimitations: knownLimitations.split('\n').map(s => s.trim()).filter(Boolean),
        widgetName: title.trim() ? `the ${title.trim()} toolbar` : undefined,
        mentionWidget,
        date: 'this date',
      }),
    [organizationName, websiteUrl, email, phone, wcagVersion, wcagLevel, conformanceStatus, standards, knownLimitations, title, mentionWidget],
  )

  const scriptSnippet = useMemo(() => {
    const dataAttrs = [
      title.trim() && `data-title="${attr(title)}"`,
      `data-accent-color="${accentColor}"`,
      `data-position="${position}"`,
      `data-size="${size}"`,
      offsetX !== 20 && `data-offset-x="${offsetX}"`,
      offsetY !== 20 && `data-offset-y="${offsetY}"`,
      triggerScheme !== 'auto' && `data-trigger-scheme="${triggerScheme}"`,
      !persistence && 'data-persistence="false"',
    ].filter(Boolean).join('\n  ')
    const globalParts: Record<string, unknown> = {}
    if (hiddenProfiles.length) globalParts.hiddenProfiles = hiddenProfiles
    if (hiddenTools.length) globalParts.hiddenTools = hiddenTools
    const globalCfg = Object.keys(globalParts).length
      ? `<script>\n  window.AccessibilityWidgetConfig = ${JSON.stringify(globalParts)};\n</script>\n`
      : ''
    return `${globalCfg}<script\n  src="${CDN}"\n  ${dataAttrs}></script>`
  }, [title, accentColor, position, size, offsetX, offsetY, triggerScheme, persistence, hiddenProfiles, hiddenTools])

  const reactSnippet = useMemo(() => {
    const props = [
      title.trim() && `title="${attr(title)}"`,
      `accentColor="${accentColor}"`,
      `position="${position}"`,
      `size="${size}"`,
      triggerScheme !== 'auto' && `triggerScheme="${triggerScheme}"`,
      offsetX !== 20 && `offsetX={${offsetX}}`,
      offsetY !== 20 && `offsetY={${offsetY}}`,
      !persistence && 'persistence={false}',
      hiddenProfiles.length > 0 && `hiddenProfiles={${JSON.stringify(hiddenProfiles)}}`,
      hiddenTools.length > 0 && `hiddenTools={${JSON.stringify(hiddenTools)}}`,
    ].filter(Boolean).join('\n  ')
    return `import { AccessibilityWidget } from '@firefam/react-accessibility-widget'\n\n<AccessibilityWidget\n  ${props}\n/>`
  }, [title, accentColor, position, size, offsetX, offsetY, triggerScheme, persistence, hiddenProfiles, hiddenTools])

  const jsonSnippet = useMemo(
    () => JSON.stringify(
      { title, accentColor, position, size, triggerScheme, offsetX, offsetY, persistence, hiddenProfiles, hiddenTools },
      null,
      2,
    ),
    [title, accentColor, position, size, triggerScheme, offsetX, offsetY, persistence, hiddenProfiles, hiddenTools],
  )

  function copy(text: string, key: string) {
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(key)
        window.setTimeout(() => setCopied(''), 1500)
      },
      () => {},
    )
  }

  function download(name: string, content: string, type: string) {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function importJson(text: string) {
    let parsed: Record<string, unknown>
    try {
      parsed = JSON.parse(text)
    } catch {
      window.alert('Could not parse JSON.')
      return
    }
    if (typeof parsed.title === 'string') setTitle(parsed.title)
    if (typeof parsed.accentColor === 'string') setAccentColor(parsed.accentColor)
    if (parsed.position === 'left' || parsed.position === 'right') setPosition(parsed.position)
    if (parsed.size === 'S' || parsed.size === 'L') setSize(parsed.size)
    if (parsed.triggerScheme === 'auto' || parsed.triggerScheme === 'dark' || parsed.triggerScheme === 'light') setTriggerScheme(parsed.triggerScheme)
    if (typeof parsed.offsetX === 'number') setOffsetX(parsed.offsetX)
    if (typeof parsed.offsetY === 'number') setOffsetY(parsed.offsetY)
    if (typeof parsed.persistence === 'boolean') setPersistence(parsed.persistence)
    if (Array.isArray(parsed.hiddenProfiles)) setHiddenProfiles(parsed.hiddenProfiles as AccessibilityProfile[])
    if (Array.isArray(parsed.hiddenTools)) setHiddenTools(parsed.hiddenTools as ToolKey[])
  }

  const output =
    tab === 'script' ? scriptSnippet : tab === 'react' ? reactSnippet : tab === 'json' ? jsonSnippet : statement.htmlDocument

  return (
    <div className="cfg" style={{ ['--accent' as string]: accentColor }}>
      {/* ─────────── Controls ─────────── */}
      <aside className="cfg-rail" aria-label="Widget configuration">
        <header className="cfg-head">
          <h1>Accessibility Widget Configurator</h1>
          <p>Tune the widget, then copy the embed code. The live widget is on this page — open it from the floating button.</p>
        </header>

        <section className="cfg-group" aria-labelledby="grp-appearance">
          <h2 id="grp-appearance">Appearance</h2>
          <label className="cfg-field">
            <span>Widget title</span>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Accessibility" />
          </label>

          <div className="cfg-field">
            <span>Accent color</span>
            <div className="cfg-accent">
              <input type="color" aria-label="Accent color" value={accentColor} onChange={e => setAccentColor(e.target.value)} />
              <code>{accentColor}</code>
              <div className="cfg-swatches" role="group" aria-label="Color presets">
                {PRESETS.map(c => (
                  <button key={c} type="button" className="cfg-swatch" style={{ background: c }} aria-label={c} aria-pressed={accentColor === c} onClick={() => setAccentColor(c)} />
                ))}
              </div>
            </div>
          </div>

          <Segmented label="Trigger style" value={triggerScheme} onChange={setTriggerScheme}
            options={[{ id: 'auto', label: 'Auto' }, { id: 'dark', label: 'Dark' }, { id: 'light', label: 'Light' }]} />
          <Segmented label="Panel size" value={size} onChange={setSize}
            options={[{ id: 'S', label: 'Small' }, { id: 'L', label: 'Large' }]} />
          <Segmented label="Position" value={position} onChange={setPosition}
            options={[{ id: 'left', label: 'Left' }, { id: 'right', label: 'Right' }]} />

          <label className="cfg-field">
            <span>Offset X <em>{offsetX}px</em></span>
            <input type="range" min={8} max={64} step={2} value={offsetX} onChange={e => setOffsetX(Number(e.target.value))} />
          </label>
          <label className="cfg-field">
            <span>Offset Y <em>{offsetY}px</em></span>
            <input type="range" min={8} max={64} step={2} value={offsetY} onChange={e => setOffsetY(Number(e.target.value))} />
          </label>
          <label className="cfg-check">
            <input type="checkbox" checked={persistence} onChange={e => setPersistence(e.target.checked)} />
            <span>Remember the visitor's settings (localStorage)</span>
          </label>
        </section>

        <section className="cfg-group" aria-labelledby="grp-features">
          <h2 id="grp-features">Visible features</h2>
          <p className="cfg-hint">Uncheck anything you don't want to offer. A group with nothing checked is hidden entirely.</p>

          <fieldset className="cfg-fieldset">
            <legend>Profiles</legend>
            <div className="cfg-checklist">
              {PROFILES.map(p => (
                <label key={p.id} className="cfg-check">
                  <input type="checkbox" checked={!hiddenProfiles.includes(p.id)} onChange={() => setHiddenProfiles(toggle(hiddenProfiles, p.id))} />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {(['Content', 'Color', 'Visibility'] as const).map(group => (
            <fieldset className="cfg-fieldset" key={group}>
              <legend>{group} tools</legend>
              <div className="cfg-checklist">
                {TOOLS.filter(tl => tl.group === group).map(tl => (
                  <label key={tl.id} className="cfg-check">
                    <input type="checkbox" checked={!hiddenTools.includes(tl.id)} onChange={() => setHiddenTools(toggle(hiddenTools, tl.id))} />
                    <span>{tl.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button type="button" className="cfg-btn cfg-btn--ghost" onClick={() => { setHiddenProfiles([]); setHiddenTools([]) }}>
            Show all features
          </button>
        </section>

        <section className="cfg-group" aria-labelledby="grp-statement">
          <h2 id="grp-statement">Accessibility statement</h2>
          <label className="cfg-field">
            <span>Organization name</span>
            <input type="text" value={organizationName} onChange={e => setOrganizationName(e.target.value)} />
          </label>
          <label className="cfg-field">
            <span>Website URL</span>
            <input type="url" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://example.com" />
          </label>
          <label className="cfg-field">
            <span>Contact email</span>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="accessibility@example.com" />
          </label>
          <label className="cfg-field">
            <span>Contact phone <em>(optional)</em></span>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
          </label>
          <div className="cfg-row">
            <label className="cfg-field">
              <span>WCAG version</span>
              <select value={wcagVersion} onChange={e => setWcagVersion(e.target.value as WcagVersion)}>
                <option value="2.0">2.0</option>
                <option value="2.1">2.1</option>
                <option value="2.2">2.2</option>
              </select>
            </label>
            <label className="cfg-field">
              <span>Level</span>
              <select value={wcagLevel} onChange={e => setWcagLevel(e.target.value as WcagLevel)}>
                <option value="A">A</option>
                <option value="AA">AA</option>
                <option value="AAA">AAA</option>
              </select>
            </label>
            <label className="cfg-field">
              <span>Status</span>
              <select value={conformanceStatus} onChange={e => setConformanceStatus(e.target.value as ConformanceStatus)}>
                <option value="partially">Partially conformant</option>
                <option value="fully">Fully conformant</option>
                <option value="none">Not yet conformant</option>
              </select>
            </label>
          </div>
          <fieldset className="cfg-fieldset">
            <legend>Standards referenced</legend>
            <div className="cfg-checklist">
              {STANDARDS.map(s => (
                <label key={s} className="cfg-check">
                  <input type="checkbox" checked={standards.includes(s)} onChange={() => setStandards(toggle(standards, s))} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="cfg-field">
            <span>Known limitations <em>(one per line, optional)</em></span>
            <textarea rows={3} value={knownLimitations} onChange={e => setKnownLimitations(e.target.value)} placeholder={'Some older PDFs are not tagged\nThird-party maps lack captions'} />
          </label>
          <label className="cfg-check">
            <input type="checkbox" checked={mentionWidget} onChange={e => setMentionWidget(e.target.checked)} />
            <span>Mention the accessibility toolbar (honest, non-overclaiming note)</span>
          </label>
        </section>
      </aside>

      {/* ─────────── Output ─────────── */}
      <main className="cfg-output" aria-label="Generated output">
        <div className="cfg-tabs" role="tablist" aria-label="Output format">
          {([['script', 'Embed (script)'], ['react', 'React'], ['json', 'JSON'], ['statement', 'Statement']] as Array<[OutputTab, string]>).map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className="cfg-tab" onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </div>

        <div className="cfg-actions">
          <button type="button" className="cfg-btn" onClick={() => copy(output, tab)}>
            {copied === tab ? 'Copied ✓' : 'Copy'}
          </button>
          {tab === 'json' && (
            <button type="button" className="cfg-btn cfg-btn--ghost" onClick={() => { const t = window.prompt('Paste a config JSON to import:'); if (t) importJson(t) }}>
              Import JSON…
            </button>
          )}
          {tab === 'statement' && (
            <>
              <button type="button" className="cfg-btn cfg-btn--ghost" onClick={() => copy(statement.markdown, 'stmt-md')}>
                {copied === 'stmt-md' ? 'Copied ✓' : 'Copy Markdown'}
              </button>
              <button type="button" className="cfg-btn cfg-btn--ghost" onClick={() => download('accessibility-statement.html', statement.htmlDocument, 'text/html')}>
                Download .html
              </button>
            </>
          )}
        </div>

        {tab === 'statement' ? (
          <div className="cfg-statement-preview" dangerouslySetInnerHTML={{ __html: statement.html }} />
        ) : (
          <pre className="cfg-code"><code>{output}</code></pre>
        )}

        <p className="cfg-note">
          Heads up: an accessibility toolbar improves the experience for many visitors but does not, on its own, make a
          website conform to WCAG/ADA/AODA/Section 508. Use it alongside real accessibility work, not as a substitute.
        </p>
      </main>

      {/* Live preview — the real widget mounts to the page body. */}
      <AccessibilityWidget
        title={title}
        accentColor={accentColor}
        position={position}
        size={size}
        triggerScheme={triggerScheme}
        offsetX={offsetX}
        offsetY={offsetY}
        persistence={persistence}
        hiddenProfiles={hiddenProfiles}
        hiddenTools={hiddenTools}
      />
    </div>
  )
}

/** Accessible segmented (single-select) control. */
function Segmented<T extends string>({ label, value, options, onChange }: {
  label: string
  value: T
  options: Array<{ id: T; label: string }>
  onChange: (v: T) => void
}) {
  return (
    <div className="cfg-field">
      <span>{label}</span>
      <div className="cfg-seg" role="group" aria-label={label}>
        {options.map(o => (
          <button key={o.id} type="button" className="cfg-seg-btn" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
