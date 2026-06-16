# React Accessibility Widget

`@firefam/react-accessibility-widget` is a lightweight, dependency-light accessibility **toolbar** for the web. It gives visitors a panel of presentation and reading adjustments — font and spacing controls, contrast modes, reading aids, and curated profiles — plus an accessibility-statement generator and a visual configurator. It ships as a React component and as a standalone `<script>` you can drop onto any site.

## What this widget is — and is not

This is an **assistive toolbar**: it lets visitors tailor how your content is presented. It is a genuine convenience for many users, and it can help with several WCAG 2.1 AA success criteria (text resize, text spacing, contrast).

It is **not** a compliance product. An accessibility toolbar does **not**, on its own, make a website conform to WCAG, the ADA, AODA, or Section 508 — conformance is all-or-nothing and depends on the underlying HTML, semantics, keyboard operability, and content. Treat this widget as a complement to real accessibility work (semantic markup, ARIA where needed, keyboard support, and testing with assistive technology), never a substitute for it. We deliberately avoid "instant compliance" claims, and the built-in statement generator uses honest, non-overclaiming language.

## Features

- **7 accessibility profiles** — Seizure Safe, Vision Impaired, Light Sensitivity, Color Blind, Dyslexia, ADHD Friendly, and Cognitive Disability.
- **21 tools** across three groups:
  - **Content** — legible fonts (OpenDyslexic / Atkinson Hyperlegible), highlight titles, font size, text magnifier, highlight links, line height, letter spacing, text alignment.
  - **Color** — dark / light / high contrast, monochrome, invert colors, color-blind filter.
  - **Visibility** — reading lens, big cursor, reading mask, reading guide, page-structure navigator, hide images, reduce animations.
- **Accessibility statement generator** — produce a standards-aligned statement (HTML / Markdown / text) for your site.
- **Standalone `<script>` embed** — a no-React, self-contained build for any site.
- **Visual configurator** — tune the widget and copy a ready-to-paste embed snippet (`npm run dev`, then open `/configurator.html`).
- **Show/hide any tool or profile**, configurable accent color, position, size, and trigger style.
- Accessible by construction: keyboard operable (Ctrl+U), focus-trapped dialog, ARIA roles, and settings persisted to `localStorage`.

## Installation

```bash
npm install @firefam/react-accessibility-widget
```

## Usage

### React

```tsx
import { AccessibilityWidget } from '@firefam/react-accessibility-widget'

export default function App() {
  return (
    <>
      <YourApp />
      <AccessibilityWidget
        title="Accessibility"
        accentColor="#1d4ed8"
        position="right"
        size="S"
        triggerScheme="auto"
      />
    </>
  )
}
```

Hide specific profiles or tools you don't want to offer:

```tsx
<AccessibilityWidget
  accentColor="#1d4ed8"
  hiddenProfiles={['seizure-safe']}
  hiddenTools={['invertColors', 'monochrome']}
/>
```

### Standalone `<script>` (no React)

Use the prebuilt global bundle on any site. Configure it with `data-*` attributes:

```html
<script
  src="https://unpkg.com/@firefam/react-accessibility-widget/dist/accessibility-widget.global.js"
  data-title="Accessibility"
  data-accent-color="#1d4ed8"
  data-position="right"
  data-size="S"></script>
```

For programmatic control, disable auto-mount and call `init()`:

```html
<script src="https://unpkg.com/@firefam/react-accessibility-widget/dist/accessibility-widget.global.js" data-auto="false"></script>
<script>
  AccessibilityWidget.init({ accentColor: '#1d4ed8', hiddenTools: ['invertColors'] })
</script>
```

> The reading fonts load from `/accessibility-widget/fonts/`. Copy the package's `public/accessibility-widget` folder to your site root so the Legible Fonts tool can load custom faces. See `examples/standalone.html`.

### Accessibility statement generator

```ts
import { generateAccessibilityStatement } from '@firefam/react-accessibility-widget'

const { html, markdown, text, htmlDocument } = generateAccessibilityStatement({
  organizationName: 'Acme Inc.',
  websiteUrl: 'https://acme.example',
  email: 'accessibility@acme.example',
  standards: ['ADA', 'Section 508'], // referenced with accurate WCAG mappings
})
```

There is also an `<AccessibilityStatement {...options} />` React component that renders the statement for an `/accessibility` route.

## Standards note

The widget's tools can help with several WCAG 2.1 AA success criteria (e.g. 1.4.4 Resize Text, 1.4.12 Text Spacing, 1.4.3/1.4.6 Contrast). Note that **Section 508 and AODA reference WCAG 2.0 Level AA**, while EN 301 549 / the EAA reference WCAG 2.1 Level AA. The statement generator reflects these mappings. Meeting any of these standards still requires conformance of the underlying site, not just the presence of a toolbar.

## Public API

Common config options:

- `title` — widget title shown in the header and accessible labels.
- `accentColor` — accent color for the header, selected tools, and level indicators.
- `position` — `'left'` or `'right'`.
- `size` — `'S'` or `'L'`.
- `triggerScheme` — `'auto'` (accent fill), `'dark'`, or `'light'`.
- `offsetX` / `offsetY` — trigger distance from its anchored edge (px).
- `hiddenProfiles` / `hiddenTools` — hide specific profiles/tools.
- `persistence` — persist the visitor's settings to `localStorage` (default `true`).
- `theme` — lower-level override for `primary` / `background` / `text` (`accentColor` wins over `theme.primary`).

### Exports

- `AccessibilityWidget` (component) and `ReactAccessibilityWidget` (alias)
- `useAccessibilityWidget` (imperative hook)
- `AccessibilityStatement` (component) and `generateAccessibilityStatement` (function)
- `./standalone` — the no-React global build

## Local development

```bash
npm install
npm run dev          # Vite demo + /configurator.html
npm run dev:lib      # tsup watch build for the library
npm run build        # library build (React + standalone bundles)
npm run build:demo   # static demo build to demo-dist
npm run test
npm run lint
```

## License

MIT
