import { useState } from 'react'
import { AccessibilityWidget } from '../src/react'
import type { Position, WidgetSize } from '../src/core'

const PKG = '@firefam/react-accessibility-widget'
const REPO = 'https://github.com/firefam/react-accessibility-widget'

/** Accent + surface presets the demo can swap between. */
const THEMES = {
  ember: { primary: '#c2410c', background: '#fffaf3', text: '#1c1917' },
  grove: { primary: '#15803d', background: '#f6fbf6', text: '#14241b' },
  tide: { primary: '#1d4ed8', background: '#f5f8ff', text: '#0f172a' },
  plum: { primary: '#7c3aed', background: '#faf5ff', text: '#1e1b2e' },
} as const

const POSITIONS: Array<{ id: Position; corner: string }> = [
  { id: 'left', corner: '↙' },
  { id: 'right', corner: '↘' },
]

const FEATURES: Array<{ icon: keyof typeof GLYPHS; title: string; body: string }> = [
  { icon: 'profiles', title: '7 Preset Profiles', body: 'Seizure Safe, Vision Impaired, Light Sensitivity, Color Blind, Dyslexia, ADHD Friendly, and Cognitive Disability.' },
  { icon: 'type', title: '8 Content Tools', body: 'Legible fonts, title/link highlighting, font size, text magnifier, line height, letter spacing, and text alignment.' },
  { icon: 'color', title: '6 Color Tools', body: 'Dark, light, and high contrast, plus monochrome, invert colors, and a color-blind visual filter.' },
  { icon: 'reading', title: '7 Visibility Tools', body: 'Reading lens, big cursor, reading mask, reading guide, page structure, hide media, and reduce animations.' },
  { icon: 'i18n', title: 'Keyboard + i18n', body: 'Ctrl+U toggles the panel, with six bundled languages and right-to-left Arabic support.' },
  { icon: 'theme', title: 'Themeable Settings', body: 'Configure title, accent color, panel size, side position, trigger offsets, and theme tokens.' },
]

const METRICS = [
  { value: '7', label: 'Profiles' },
  { value: '21', label: 'Tools' },
  { value: '3', label: 'Tool groups' },
  { value: '6', label: 'Languages' },
]

const TABLE_ROWS = [
  { feature: 'Profiles', result: 'Apply curated bundles of real widget tools', target: 'Fast accommodation presets' },
  { feature: 'Content', result: 'Fonts, scale, spacing, link/title highlights, alignment', target: 'Reading comfort and scannability' },
  { feature: 'Color', result: 'Contrast modes, monochrome, invert, color-blind filter', target: 'Low vision and color perception checks' },
  { feature: 'Visibility', result: 'Lens, mask, guide, cursor, structure, media, motion', target: 'Focus, navigation, and distraction control' },
]

/** Minimal inline line-icons for the feature cards (stroke = currentColor). */
const GLYPHS = {
  profiles: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 6a3 3 0 0 1 0 6" /><path d="M17.5 19a5.5 5.5 0 0 0-3-4.9" /></>,
  type: <><path d="M5 18 11 6l6 12" /><path d="M7.5 13.5h7" /></>,
  color: <><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17" /><path d="M12 12a8.5 8.5 0 0 0 0-8.5" fill="currentColor" stroke="none" /></>,
  reading: <><path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.6" /></>,
  i18n: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.6 2.4 4 5.4 4 8.5s-1.4 6.1-4 8.5c-2.6-2.4-4-5.4-4-8.5s1.4-6.1 4-8.5Z" /></>,
  theme: <><path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-1 2-1.8 0-1.4-1.4-1.6-1.4-2.7 0-.8.7-1.5 1.6-1.5h1.6a4.1 4.1 0 0 0 4.1-4.6C20.7 6 16.8 3.5 12 3.5Z" /><circle cx="8" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" /><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" /></>,
} as const

function Icon({ name }: { name: keyof typeof GLYPHS }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {GLYPHS[name]}
    </svg>
  )
}

/** Abstract SVG used as the hero artwork. */
function heroArt(left: string, right: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 520" role="img" aria-label="Abstract interface composition">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${left}"/><stop offset="100%" stop-color="${right}"/>
        </linearGradient>
      </defs>
      <rect width="720" height="520" rx="32" fill="#ffffff" opacity="0.6"/>
      <rect x="40" y="40" width="640" height="440" rx="26" fill="url(#g)" opacity="0.16"/>
      <rect x="80" y="96" width="300" height="232" rx="22" fill="#ffffff"/>
      <rect x="408" y="84" width="232" height="52" rx="16" fill="#ffffff"/>
      <rect x="408" y="160" width="262" height="18" rx="9" fill="#ffffff" opacity="0.9"/>
      <rect x="408" y="196" width="214" height="18" rx="9" fill="#ffffff" opacity="0.7"/>
      <rect x="408" y="232" width="240" height="18" rx="9" fill="#ffffff" opacity="0.55"/>
      <circle cx="180" cy="212" r="78" fill="url(#g)"/>
      <circle cx="556" cy="352" r="84" fill="url(#g)" opacity="0.4"/>
      <rect x="104" y="356" width="236" height="22" rx="11" fill="#ffffff" opacity="0.9"/>
      <rect x="104" y="394" width="192" height="22" rx="11" fill="#ffffff" opacity="0.7"/>
    </svg>`)}`
}

const IFRAME_DOC = `
  <!doctype html><html lang="en"><body style="margin:0;font-family:Georgia,serif;background:#f4efe7;color:#26221d;display:flex;align-items:center;justify-content:flex-start;height:100%;">
    <div style="box-sizing:border-box;width:100%;padding:20px;text-align:left;"><strong>Embedded preview</strong>
    <p style="margin:8px 0 0;">A mixed-content surface for visual testing.</p></div>
  </body></html>`

/** Segmented control used throughout the config rail. */
function Segmented<T extends string>({ label, value, options, onChange }: {
  label: string
  value: T
  options: Array<{ id: T; label: string }>
  onChange: (v: T) => void
}) {
  return (
    <div className="cfg-field">
      <span className="cfg-label">{label}</span>
      <div className="segmented" role="group" aria-label={label}>
        {options.map(o => (
          <button key={o.id} type="button" className="seg" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [widgetTitle, setWidgetTitle] = useState('Accessibility')
  const [position, setPosition] = useState<Position>('right')
  const [size, setSize] = useState<WidgetSize>('S')
  const [offsetX, setOffsetX] = useState(20)
  const [offsetY, setOffsetY] = useState(20)
  const [themeName, setThemeName] = useState<keyof typeof THEMES>('tide')
  const [accentColor, setAccentColor] = useState<string>(THEMES.tide.primary)
  const [copied, setCopied] = useState(false)

  const widgetTheme = { ...THEMES[themeName], primary: accentColor }

  const snippet = `<AccessibilityWidget
  title="${widgetTitle || 'Accessibility'}"
  accentColor="${accentColor}"
  position="${position}"
  offsetX={${offsetX}}
  offsetY={${offsetY}}
  size="${size}"
/>`

  function copyInstall() {
    navigator.clipboard?.writeText(`npm install ${PKG}`).then(() => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }).catch(() => {})
  }

  return (
    <div className="playground" style={{ ['--demo-accent' as string]: accentColor }}>
      {/* ── Left configuration rail ── */}
      <aside className="config-rail" aria-label="Widget configuration">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="currentColor" /></svg>
          </span>
          <div>
            <p className="brand-name">Accessibility Widget</p>
            <p className="brand-tag">Live playground</p>
          </div>
        </div>

        <div className="cfg-scroll">
          <section className="cfg-group">
            <h2 className="cfg-group-title">Branding</h2>
            <div className="cfg-field">
              <label className="cfg-label" htmlFor="cfg-title">Widget title</label>
              <input id="cfg-title" type="text" value={widgetTitle} placeholder="Accessibility"
                onChange={e => setWidgetTitle(e.target.value)} />
            </div>
            <div className="cfg-field">
              <span className="cfg-label">Accent colour</span>
              <div className="accent-row">
                <input type="color" value={accentColor} aria-label="Accent colour"
                  onInput={e => setAccentColor(e.currentTarget.value)}
                  onChange={e => setAccentColor(e.currentTarget.value)} />
                <code>{accentColor}</code>
                <div className="swatches" role="group" aria-label="Theme presets">
                  {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map(key => (
                    <button key={key} type="button" className="swatch" aria-label={key}
                      aria-pressed={themeName === key && accentColor === THEMES[key].primary}
                      style={{ background: THEMES[key].primary }}
                      onClick={() => { setThemeName(key); setAccentColor(THEMES[key].primary) }} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="cfg-group">
            <h2 className="cfg-group-title">Placement</h2>
            <div className="cfg-field">
              <span className="cfg-label">Trigger position</span>
              <div className="pos-pad" role="group" aria-label="Trigger position">
                {POSITIONS.map(p => (
                  <button key={p.id} type="button" className="pos-cell" data-pos={p.id}
                    aria-pressed={position === p.id} aria-label={p.id}
                    onClick={() => setPosition(p.id)}>
                    <span aria-hidden="true">{p.corner}</span>
                  </button>
                ))}
              </div>
            </div>
            <Segmented label="Panel size" value={size}
              options={[{ id: 'S', label: 'Small' }, { id: 'L', label: 'Large' }]}
              onChange={setSize} />
            <div className="cfg-field">
              <span className="cfg-label">Offset X <span className="cfg-value">{offsetX}px</span></span>
              <input className="slider" type="range" min={8} max={64} step={2} value={offsetX}
                aria-label="Trigger horizontal offset"
                onChange={e => setOffsetX(Number(e.target.value))} />
            </div>
            <div className="cfg-field">
              <span className="cfg-label">Offset Y <span className="cfg-value">{offsetY}px</span></span>
              <input className="slider" type="range" min={8} max={64} step={2} value={offsetY}
                aria-label="Trigger vertical offset"
                onChange={e => setOffsetY(Number(e.target.value))} />
            </div>
          </section>

          <section className="cfg-group">
            <h2 className="cfg-group-title">Current config</h2>
            <pre className="snippet"><code>{snippet}</code></pre>
            <div className="rail-links">
              <a className="rail-link" href={`https://www.npmjs.com/package/${PKG}`} target="_blank" rel="noreferrer">npm</a>
              <a className="rail-link" href={REPO} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </section>
        </div>
      </aside>

      {/* ── Right content ── */}
      <main className="content" id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Drop-in accessibility overlay</p>
            <h1>The accessibility widget your users deserve.</h1>
            <p className="lede">
              One component adds 7 profiles and 21 content, color, and visibility tools to any React app.
              Tune the live widget from the panel on the left, then open it from the floating button to test each tool.
            </p>
            <div className="install">
              <code>npm install {PKG}</code>
              <button type="button" className="copy-btn" onClick={copyInstall}>{copied ? 'Copied ✓' : 'Copy'}</button>
            </div>
            <p className="hero-hint" aria-hidden="true">Open the widget on the <strong>{position}</strong> ↘</p>
          </div>
          <img className="hero-art" src={heroArt(accentColor, THEMES[themeName].text)} alt="" />
        </section>

        <section className="metrics" aria-label="At a glance">
          {METRICS.map(m => (
            <div key={m.label} className="metric">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </section>

        <section className="features" aria-label="Features">
          {FEATURES.map(f => (
            <article key={f.title} className="feature">
              <span className="feature-icon"><Icon name={f.icon} /></span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </section>

        <section className="prose-card">
          <p className="eyebrow">Sample content</p>
          <h2>What is web accessibility?</h2>
          <p>
            Web accessibility means people with disabilities can perceive, understand, navigate, and interact with the
            web. This page is dense on purpose — headings, prose, quotes, a form, a table, and media give the widget
            real content to adjust so you can judge each tool in context.
          </p>
          <blockquote>
            Good accessibility tooling is easier to trust when it can be exercised against content that looks like a real
            product instead of a synthetic sample.
          </blockquote>
          <h3>Reading-level adjustments</h3>
          <p>
            Increase font size, loosen line height and letter spacing, highlight links or titles, switch fonts, or cycle
            text alignment and watch this paragraph re-flow live.
          </p>
          <details>
            <summary>Why keep an intentional test surface on the page?</summary>
            <p>
              Widget behaviour is easier to validate against realistic friction: dense prose, mixed controls, media, and
              compact links give manual visual QA useful targets.
            </p>
          </details>
        </section>

        <div className="split">
          <section className="form-card">
            <p className="eyebrow">Interactive controls</p>
            <h2>Sample form</h2>
            <form className="demo-form" onSubmit={e => e.preventDefault()}>
              <label>Full name
                <input type="text" name="fullName" placeholder="Ari Mason" />
              </label>
              <label>Email address
                <input type="email" name="email" placeholder="ari@example.com" />
              </label>
              <label>Team size
                <select name="teamSize" defaultValue="6-20">
                  <option value="1-5">1–5 people</option>
                  <option value="6-20">6–20 people</option>
                  <option value="21-50">21–50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </label>
              <label>Notes
                <textarea name="notes" rows={3} placeholder="What kind of review are you running?" />
              </label>
              <fieldset className="choice-row">
                <legend>Preferred review path</legend>
                <label><input type="radio" name="path" defaultChecked /> Visual pass</label>
                <label><input type="radio" name="path" /> Reading-aid pass</label>
              </fieldset>
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </section>

          <section className="table-card">
            <p className="eyebrow">Coverage</p>
            <h2>Feature at a glance</h2>
            <table>
              <thead>
                <tr><th scope="col">Feature</th><th scope="col">What it changes</th><th scope="col">Best for</th></tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(r => (
                  <tr key={r.feature}><th scope="row">{r.feature}</th><td>{r.result}</td><td>{r.target}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="media-row">
              <img src={heroArt(THEMES[themeName].text, accentColor)} alt="Decorative abstract composition" />
              <iframe title="Embedded preview" srcDoc={IFRAME_DOC} />
            </div>
          </section>
        </div>

        <section className="quickstart">
          <p className="eyebrow">Quick start</p>
          <h2>Add it in two lines</h2>
          <pre className="code-block"><code>{`import { AccessibilityWidget } from '${PKG}'

export default function App() {
  return (
    <>
      <YourApp />
${snippet.split('\n').map(l => '      ' + l).join('\n')}
    </>
  )
}`}</code></pre>
        </section>

        <footer className="content-footer">
          <span>Built under the firefam organization.</span>
          <a href={REPO} target="_blank" rel="noreferrer">{REPO.replace('https://', '')}</a>
        </footer>
      </main>

      <AccessibilityWidget
        title={widgetTitle}
        accentColor={accentColor}
        position={position}
        offsetX={offsetX}
        offsetY={offsetY}
        size={size}
        theme={widgetTheme}
      />
    </div>
  )
}
