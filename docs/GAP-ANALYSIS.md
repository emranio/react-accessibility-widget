# Accessibility Widget — Gap Analysis

**Product analyzed:** `@firefam/react-accessibility-widget` v0.2.5
**Date:** 2026-06-16
**Scope:** What is lacking on this product vs. (a) the CodeCanyon "AccessiWidget" listing, (b) market-leading accessibility overlay/toolbar widgets (accessiBe/accessWidget, UserWay, AudioEye, Recite Me, EqualWeb, plus OSS), and (c) the actual requirements of WCAG 2.1 AA, ADA, AODA, and Section 508.
**Lenses:** Commercial readiness · Real compliance impact · OSS quality.
**Excluded by request:** multi-language / i18n / RTL (being removed from the product).

> **How this was produced.** A multi-agent deep-research run (104 agents) fanned out across 5 search angles, fetched sources, and adversarially verified each claim (2–3 votes). **20 of 25 claims were verified**; the automated synthesis step and 5 standards/AODA verification votes were cut short by a session limit, so the synthesis below was done manually. Findings are tagged by provenance:
>
> - ✅ **Verified by research** (2–3/3 adversarial votes). Cited inline.
> - 🔧 **Verified directly in the source code** (`src/`).
> - ⚠️ **Established context, not re-verified in this run** (verification votes were cut by the session limit).

---

## Executive summary

The engine is solid; the gaps are concentrated in five areas:

1. **No accessibility statement generator** — every serious competitor ships one; it is the most compliance-credible thing a widget can do without touching host DOM.
2. **No visual configurator and no non-React embed** — the product is React/npm-only; the category-defining feature is a visual builder that outputs a copy-paste `<script>` snippet.
3. **No text-to-speech / read-aloud** — a universally expected assistive tool.
4. **Does not respect OS/browser preferences** (`prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`) — it overrides blindly, which is the hallmark of a hostile overlay.
5. **Positioning** — the honest "assistive toolbar, not a compliance guarantee" stance is a genuine differentiator and should be made explicit (competitors that overclaim "instant compliance" are a legal-risk anti-pattern).

---

## 0. Competitive reframe (affects strategy)

The named target is **barely a competitor**: AccessiWidget has **1 sale at $22** ✅ — a brand-new, unproven listing that uses the legally risky "instant compliance" claim.

- The realistic **commercial** benchmark on CodeCanyon is **Readabler — $25, 4,900+ sales, 4.9★ (83 reviews)** ✅.
- The realistic **feature** benchmarks are the SaaS leaders: **accessiBe, Recite Me, UserWay, AudioEye**.

**Implication:** study Readabler for commercial polish and Recite Me for honest positioning. Do **not** copy AccessiWidget's overclaiming.

---

## 1. Your product baseline (what exists today)

**Profiles (7):** Seizure Safe · Vision Impaired · Light Sensitivity · Color Blind · Dyslexia · ADHD Friendly · Cognitive Disability.

**Tools (21), three groups:**
- **Content:** legible fonts (OpenDyslexic + Atkinson Hyperlegible), highlight titles, font size, text magnifier, highlight links, line height, letter spacing, text alignment.
- **Color:** dark contrast, light contrast, high contrast, monochrome, invert colors, color-blind/protanopia filter.
- **Visibility:** reading lens, big cursor, reading mask, reading guide, page-structure navigator (headings/landmarks/links), hide images, reduce animations.

**Widget-level:** ARIA roles, focus trap, keyboard open (Ctrl+U), localStorage persistence, configurable accent color/position/size via React props.

**Keep — these are genuine strengths:** the reading lens/mask/guide trio, full contrast suite, dyslexia fonts, page-structure navigator, focus trap, persistence, and (importantly) **no false "instant compliance" claims**.

---

## 2. Feature comparison matrix (gaps)

| Capability | Your widget | AccessiWidget | Market leaders | Evidence |
|---|---|---|---|---|
| Visual configurator + copy-paste embed | ❌ React props only | ✅ "Live Visual Builder" → Copy HTML | ✅ all | ✅ c1 |
| Non-React / `<script>` embed | ❌ npm/React only | ✅ paste HTML | ✅ all | ✅ c1 |
| Accessibility statement generator | ❌ | ✅ rich-text editor | ✅ accessiBe, Recite Me | ✅ c2, c9 |
| Text-to-speech / read-aloud | ❌ (🔧 none in src) | ✅ TTS | ✅ Recite Me, accessiBe, OSS | ✅ c13, c12, c2 |
| "Blind / Screen-reader" profile | ❌ | — | ✅ accessiBe | ✅ c16 |
| "Keyboard / Motor" profile | ❌ (only Ctrl+U opens) | — | ✅ accessiBe | ✅ c17 |
| Voice control / navigation | ❌ | — | ✅ OSS (16 commands) | ✅ c12 |
| Dictionary / definitions | ❌ | ✅ Wikipedia | ✅ Recite Me | ✅ c2, c14 |
| Virtual keyboard | ❌ | ✅ | ✅ | ✅ c2 |
| Content simplify / summarize | ❌ | — | ✅ Recite Me (AI) | ✅ c14 |
| Automated remediation (alt-text/ARIA injection) | ❌ (🔧 own elements only) | ✅ Auto Alt-Text | ✅ accessiBe (AI ARIA+alt, 24h rescan) | ✅ c2, c8, c18, c10, c11 |
| Compliance reports / monitoring | ❌ | — | ✅ accessiBe (audit, monthly, litigation pack) | ✅ c9 |
| Respect OS prefs (`prefers-reduced-motion`/`-color-scheme`/`-contrast`) | ❌ (🔧 not in src) | — | best practice | 🔧 |
| Live-region announcements (`aria-live`) | ❌ (🔧 1 sr-only label) | — | best practice | 🔧 |
| Custom keyboard shortcuts | ❌ (🔧 hardcoded Ctrl+U) | — | varies | 🔧 |

---

## 3. Compliance mapping — what counts vs. what's cosmetic

**Honest split of the existing 21 tools:**

- **Genuinely assistive (real WCAG 2.1 AA relevance):** font size/zoom (SC 1.4.4), line-height & letter-spacing (SC 1.4.12), contrast modes (SC 1.4.3/1.4.6), legible fonts, reduce-animations (SC 2.3.3), highlight links (SC 1.4.1), page-structure navigator (supports SC 2.4.1).
- **Comfort-only / cosmetic (no SC mapping; won't help in an audit):** reading lens, reading mask, reading guide, big cursor, text magnifier, monochrome, invert. Fine as UX — but **do not market them as "compliance."**

**Capabilities that move the compliance needle — and are missing:**

| Requirement | Standard | Gap |
|---|---|---|
| Public accessibility statement | AODA public-sector plan (⚠️ not re-verified this run); Section 508 / EN 301 549 expect a conformance statement | ❌ No generator |
| Screen-reader operability | WCAG 1.1.1, 4.1.2 (Level A) | ❌ No TTS, no live regions, no remediation |
| Keyboard operability of host page | WCAG 2.1.1 (Level A) | ⚠️ Widget traps focus well, but nothing addresses the host page's keyboard gaps |

**Two corrections that affect marketing copy:**

1. **Section 508 references WCAG 2.0 A/AA, not 2.1** ✅ c19. "Section 508 via WCAG 2.1" is imprecise.
2. **Conformance is all-or-nothing** — failing even one of the 38 applicable success criteria = non-conformant ✅ c20. **No widget can toggle a page into compliance.**

---

## 4. The overlay reality — the biggest positioning gap (and opportunity)

Two camps, drawn from verified evidence:

- **Anti-pattern (avoid):** AccessiWidget claims it makes a site "WCAG 2.1 AA, ADA, AODA, and Section 508 compliant **instantly**" ✅ c3. Combined with the all-or-nothing fact (§3), that claim is false and legally dangerous for whoever ships it.
- **Honest model (adopt):** Recite Me explicitly states *"an assistive toolbar alone does not make a website fully compliant with WCAG, EAA, ADA, or other accessibility standards"* ✅ c15.

⚠️ **Established context (well-documented, not re-verified this run):** the [Overlay Fact Sheet](https://overlayfactsheet.com) (signed by 900+ accessibility professionals), the NFB's 2021 withdrawal of its accessiBe sponsorship, ADA lawsuits filed *against* sites *because* an overlay interfered with assistive tech, and the U.S. DOJ treating WCAG as the de-facto bar without ever endorsing overlays.

**Design implications:**

- ✅ Position as an **"assistive toolbar / preference layer," never a "compliance solution."** Genuine differentiator vs. AccessiWidget.
- 🔧 **Respect OS settings** (`prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`). Currently overridden blindly — fixing this is the #1 "not a hostile overlay" signal.
- 🔧 **Don't fight assistive tech** — audit the 50 `!important` rules and the reading-lens DOM-cloning so they don't strip ARIA or trap screen readers.
- ⚠️ **Be cautious with automated remediation** — most-marketed *and* most-sued. If added, make it conservative and opt-in; never auto-inject fake alt text that hides real problems.

---

## 5. Prioritized roadmap — what's lacking, in build order

Each item tagged by lens: `[Commercial]` `[Compliance]` `[Quality]`.

### P0 — do first (cheap, high-impact, compliance-credible)
1. **Accessibility statement generator** — `[Compliance + Commercial]`. Every serious competitor ships it (c2, c9); most compliance-real feature that doesn't touch host DOM; low effort.
2. **Visual configurator + copy-paste `<script>` embed** — `[Commercial]`. Category-defining feature (c1); unlocks the ~95% of buyers not on React. Today the product is React-only.
3. **Honest positioning pass** — `[Compliance + Commercial]`. Adopt Recite Me's framing (c15); fix the WCAG 2.0-vs-2.1 / Section 508 wording (c19). Zero code, removes legal risk.

### P1 — achievable parity
4. **Text-to-speech / read-aloud** (Web Speech API) — `[Commercial + Compliance]`. Universally expected (c13, c12); browser-native; low cost.
5. **Respect OS preferences** — `[Compliance + Quality]`. Direct code gap (🔧); cheap; defining anti-overlay signal.
6. **`aria-live` announcements on toggle** — `[Quality + Compliance]`. Screen-reader users currently get no feedback (🔧); the widget itself should be exemplary.
7. **Add "Keyboard/Motor" + "Blind/Screen-reader" profiles** — `[Commercial + Compliance]`. The two accessiBe profiles missing here (c16, c17); each depends on #4 and real keyboard work.

### P2 — market parity / nice-to-have
8. Dictionary / definitions (c14, c2) — `[Commercial]`
9. Virtual keyboard (c2) — `[Commercial + Compliance/motor]`
10. Customizable keyboard shortcuts (🔧) — `[Quality + Commercial]`
11. AI content-simplify / summarize (c14) — `[Commercial]`
12. Usage analytics / reporting — `[Commercial]`
13. **Automated remediation** — `[Commercial but controversial]`. Last, and only conservatively (see §4).

---

## Appendix A — Verified research claims (with sources)

> Vote format = (survive votes – refute votes); a claim is killed only with ≥2 refutes. All below survived.

**AccessiWidget (the CodeCanyon listing)** — https://codecanyon.net/item/accessiwidget-wcag-21-aa-ada-compliance-accessibility-widget-with-configurator/62441249
- **c1** (2-1): Ships a visual drag-and-drop configurator ("Interactive Live Visual Builder") — theme color via CSS color-mix, 6 positions, 30+ features across 4 tabs, custom accessibility statement via rich-text editor, then "Copy HTML Code" to paste into a site.
- **c2** (3-0): Includes an accessibility statement generator, a Text-to-Speech engine, a Live Dictionary (Wikipedia), a Virtual Keyboard, and an Auto Alt-Text Fixer (generates missing alt tags from filenames).
- **c3** (3-0): Markets explicit instant-compliance: *"Make your website WCAG 2.1 AA, ADA, AODA, and Section 508 compliant instantly with AccessiWidget Pro."*

**CodeCanyon market** — https://codecanyon.net/search/accessibility
- **c4** (3-0): AccessiWidget is a near-new listing — **1 sale, $22**.
- **c5** (2-1): The dominant paid widget is **Readabler** (WordPress, $25, 4,900+ sales, 4.9/5 from 83 reviews).

**CodeCanyon licensing** — https://codecanyon.net/licenses/terms/regular
- **c6** (3-0): Regular License allows distributing the End Product for free in unlimited copies, but not charging end users (sell only to one client, otherwise Extended License required).
- **c7** (3-0): Paid distribution beyond a single client requires an Extended License.

**accessiBe / accessWidget** — https://accessibe.com/accesswidget · support article on profiles
- **c8** (3-0): Automated AI DOM remediation in an audit/remediate/monitor cycle — injects ARIA + machine-generated alt text, re-scans every 24h, initial remediation ~48h.
- **c9** (3-0): Bundles a personalized accessibility statement, audit/monthly reports, a visual impact report, and a paid Litigation Support Package.
- **c16** (3-0): Ships a **"Blind Users (Screen Reader)"** profile (optimizes screen-reader compatibility + navigation aids).
- **c17** (3-0): Ships a **"Keyboard Navigation (Motor)"** profile for keyboard-only users with motor impairments.
- **c18** (3-0): Auto-generates image alt text via image-recognition.

**Recite Me** — https://reciteme.com/product/assistive-toolbar/
- **c13** (3-0): Built-in text-to-speech reads page text and image alt text aloud; can download content as audio.
- **c14** (3-0): Built-in dictionary + AI content-simplification/summarize.
- **c15** (3-0): Explicitly states an assistive toolbar alone does **not** make a website fully WCAG/EAA/ADA compliant (honest positioning).

**OSS competitors**
- **c10** (3-0): `Jerit-Baiju/a11y-widget` auto-injects missing alt text, fixes heading structure & navigation.
- **c11** (3-0): Same project ships an alt-text auditing tool that reports missing alt attributes.
- **c12** (3-0): `sinanisler/accessibility-widgets` ships TTS (Web Speech API) + hands-free voice control with 16 voice commands.

**Standards** — https://www.section508.gov/develop/applicability-conformance/
- **c19** (3-0): Section 508 (Revised) incorporates **WCAG 2.0 Level A & AA by reference** (not 2.1) for federal electronic content.
- **c20** (3-0): Failing even one of the 38 applicable WCAG success criteria = the page does not conform (all-or-nothing).

### Not verified in this run (session limit cut the votes — treat as unconfirmed)
- AODA (Ontario IASR O. Reg. 191/11): designated public-sector organizations must create, maintain, and publicly post a multi-year accessibility plan, and report annually on progress. *(Aligns with the "accessibility statement effectively required" premise, but the verification votes failed and were not completed.)*
- The overlay-lawsuit specifics, Overlay Fact Sheet signatory count, NFB/accessiBe history, and DOJ stance in §4 are established/widely documented but were not re-verified by discrete votes in this run.

### Refuted / not adopted
- Claims that "a configurator is a baseline expected feature across the whole CodeCanyon category" and that the OSS `sinanisler` widget ships an "extensive configurator UI" / an explicit overlay disclaimer were **refuted** in verification and are therefore not relied upon (the OSS TTS + voice-control claim, c12, did pass and is used).

---

## Appendix B — Code findings (verified directly in `src/`)

| Check | Result | Reference |
|---|---|---|
| Respects OS settings (`prefers-reduced-motion`/`-color-scheme`/`-contrast`) | ❌ None in source (only a test stub) | `src/test/setup.ts:3` |
| Text-to-speech / read-aloud / voice | ❌ None found | — |
| Accessibility statement / conformance report | ❌ None found | — |
| Screen-reader announcements (`aria-live` / `role=status`) | ❌ Only one `sr-only` subtitle | `src/core/render/index.ts:121` |
| Automated remediation into host DOM | ❌ `setAttribute` only on the widget's own root/panel/trigger | `src/core/widget.ts:150` |
| `!important` in injected effect CSS | ⚠️ 50 occurrences | `src/core/styles`, `src/core/effects` |
| Languages | (out of scope — being removed) | `src/core/i18n/` |

---

## Sources

- AccessiWidget (CodeCanyon): https://codecanyon.net/item/accessiwidget-wcag-21-aa-ada-compliance-accessibility-widget-with-configurator/62441249
- CodeCanyon accessibility category: https://codecanyon.net/search/accessibility
- CodeCanyon Regular License: https://codecanyon.net/licenses/terms/regular
- accessiBe accessWidget: https://accessibe.com/accesswidget
- accessiBe profiles (support): https://support.accessibe.com/hc/en-us/articles/29150094493714-What-are-accessibility-profiles-in-accessWidget
- Recite Me assistive toolbar: https://reciteme.com/product/assistive-toolbar/
- Section 508 conformance: https://www.section508.gov/develop/applicability-conformance/
- OSS — sinanisler/accessibility-widgets: https://github.com/sinanisler/accessibility-widgets
- OSS — Jerit-Baiju/a11y-widget: https://github.com/Jerit-Baiju/a11y-widget/
- Overlay Fact Sheet: https://overlayfactsheet.com
- AODA multi-year plan (OHRC example): https://www.ohrc.on.ca/en/our-commitment-service/ohrc-multi-year-aoda-accessibility-plan-2020-21-2025-26
