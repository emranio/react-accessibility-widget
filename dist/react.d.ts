import * as react from 'react';

/**
 * Shared types and default state for the accessibility widget.
 *
 * This module is the canonical home for the public configuration / state
 * shapes and the {@link DEFAULT_STATE} baseline. It has no runtime dependencies
 * so it can be imported from anywhere in the core without cycles.
 */
/** Panel size preset. Values are case-insensitive at runtime. */
type WidgetSize = 'S' | 's' | 'L' | 'l';
/** Horizontal side the trigger and panel anchor to along the bottom edge. */
type Position = 'right' | 'left';
/** Text-alignment value (`'default'` means "no override"). */
type TextAlignment = 'left' | 'center' | 'right' | 'justify' | 'default';
/** A tool's current level; 0 means off. */
type AdjustmentLevel = 0 | 1 | 2 | 3 | 4;
/** A bundled accessibility profile. */
type AccessibilityProfile = 'seizure-safe' | 'vision-impaired' | 'light-sensitivity' | 'color-blind' | 'dyslexia' | 'adhd-friendly' | 'cognitive-disability' | 'keyboard-motor' | 'blind-screen-reader';
/** Identifier for a panel tool, used to show/hide individual tools via config. */
type ToolKey = 'legibleFonts' | 'highlightTitles' | 'fontSize' | 'textMagnifier' | 'highlightLinks' | 'lineHeight' | 'letterSpacing' | 'textAlignment' | 'darkContrast' | 'lightContrast' | 'highContrast' | 'monochrome' | 'invertColors' | 'colorBlind' | 'readingLens' | 'bigCursor' | 'readingMask' | 'readingGuide' | 'readAloud' | 'dictionary' | 'simplify' | 'virtualKeyboard' | 'focusHighlight' | 'pageStructure' | 'hideImages' | 'offAnimations';
/** A keyboard shortcut definition for toggling the panel. */
interface KeyboardShortcut {
    key: string;
    ctrlKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
    metaKey?: boolean;
}
/** An analytics event emitted by the widget. Carries no personal data. */
interface WidgetEvent {
    type: 'open' | 'close' | 'reset' | 'tool' | 'profile' | 'alignment';
    /** Tool key, for `tool` events. */
    tool?: string;
    /** New level, for `tool` events. */
    level?: number;
    /** Active profile (null when cleared), for `profile` events. */
    profile?: AccessibilityProfile | null;
    /** New alignment, for `alignment` events. */
    alignment?: TextAlignment;
}
/** Configuration accepted by the widget constructor and React props. */
interface AccessibilityWidgetConfig {
    title?: string;
    accentColor?: string;
    position?: Position;
    /** Horizontal distance (px) of the trigger from its anchored edge. Default 20. */
    offsetX?: number;
    /** Vertical distance (px) of the trigger from the bottom edge. Default 20. */
    offsetY?: number;
    size?: WidgetSize;
    theme?: {
        primary?: string;
        background?: string;
        text?: string;
    };
    /** Profiles to hide from the panel (omit to show all). */
    hiddenProfiles?: AccessibilityProfile[];
    /** Tools to hide from the panel (omit to show all). A section with no visible tools is hidden. */
    hiddenTools?: ToolKey[];
    /**
     * Derive conservative defaults from the visitor's OS/browser preferences
     * (reduced-motion → Reduce Animations, increased-contrast → High Contrast) on
     * a fresh visit. Never overrides a persisted or explicit choice. Default true.
     */
    respectOsPreferences?: boolean;
    /** Keyboard shortcut to toggle the panel, or `false` to disable. Default Ctrl+U. */
    shortcut?: KeyboardShortcut | false;
    persistence?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    onReset?: () => void;
    /** Opt-in analytics hook; receives privacy-respecting widget events. */
    onEvent?: (event: WidgetEvent) => void;
    /** Custom dictionary lookup for the Dictionary tool. Defaults to dictionaryapi.dev. */
    dictionaryLookup?: (word: string) => Promise<string | null>;
    /** Provider for the Simplify tool. When omitted, the Simplify tool is hidden. */
    onSimplify?: (text: string) => Promise<string>;
}
/** The complete, persisted runtime state of the widget. */
interface AccessibilityWidgetState {
    profile: AccessibilityProfile | null;
    fontSize: AdjustmentLevel;
    lineHeight: AdjustmentLevel;
    letterSpacing: AdjustmentLevel;
    textAlignment: TextAlignment;
    legibleFonts: AdjustmentLevel;
    highlightTitles: AdjustmentLevel;
    highlightLinks: AdjustmentLevel;
    textMagnifier: AdjustmentLevel;
    readingLens: AdjustmentLevel;
    bigCursor: AdjustmentLevel;
    readingMask: AdjustmentLevel;
    readingGuide: AdjustmentLevel;
    readAloud: AdjustmentLevel;
    dictionary: AdjustmentLevel;
    simplify: AdjustmentLevel;
    virtualKeyboard: AdjustmentLevel;
    focusHighlight: AdjustmentLevel;
    darkContrast: AdjustmentLevel;
    lightContrast: AdjustmentLevel;
    highContrast: AdjustmentLevel;
    colorBlind: AdjustmentLevel;
    monochrome: AdjustmentLevel;
    invertColors: AdjustmentLevel;
    hideImages: AdjustmentLevel;
    offAnimations: AdjustmentLevel;
}

/**
 * Accessibility audit (reporter, not a fixer).
 *
 * {@link auditAccessibility} scans the page for a focused set of common,
 * high-confidence barriers and **reports** them. It deliberately does NOT mutate
 * the DOM, inject ARIA, or claim conformance — automated "remediation" overlays
 * that silently patch the page are the anti-pattern this project avoids. The
 * findings are meant to help an owner fix the real issues in their source.
 *
 * It is conservative: only unambiguous problems are reported, so the output
 * stays trustworthy. It is not a substitute for a full audit or testing with
 * assistive technology.
 */
/** Relative severity of a finding. */
type AuditImpact = 'serious' | 'moderate' | 'minor';
/** A single reported accessibility issue. */
interface AccessibilityIssue {
    /** Stable rule id, e.g. `image-alt`. */
    rule: string;
    impact: AuditImpact;
    /** Human-readable description of the problem. */
    message: string;
    /** A short locator for the offending element (tag + id/first class). */
    selector?: string;
}
/**
 * Audit a document (or a subtree) for common accessibility barriers and return
 * the findings. Never mutates the DOM. Returns an empty array in non-DOM
 * environments.
 */
declare function auditAccessibility(root?: Document | HTMLElement): AccessibilityIssue[];

/** WCAG version a statement can target. */
type WcagVersion = '2.0' | '2.1' | '2.2';
/** WCAG conformance level a statement can target. */
type WcagLevel = 'A' | 'AA' | 'AAA';
/** How conformant the site claims to be. Defaults to `partially`. */
type ConformanceStatus = 'fully' | 'partially' | 'none';
/** Legal/standards frameworks the statement can reference. */
type ComplianceStandard = 'ADA' | 'Section 508' | 'AODA' | 'EN 301 549' | 'EAA';
/** Inputs accepted by {@link generateAccessibilityStatement}. */
interface AccessibilityStatementOptions {
    /** Organisation name (required in spirit; falls back to a neutral phrase). */
    organizationName: string;
    /** Human name of the site, e.g. "Acme Store". Falls back to the URL/org. */
    websiteName?: string;
    /** Canonical site URL. */
    websiteUrl?: string;
    /** Contact email for accessibility feedback. */
    email?: string;
    /** Contact phone for accessibility feedback. */
    phone?: string;
    /** URL of a contact/feedback page. */
    contactUrl?: string;
    /** Postal address for accessibility feedback. */
    postalAddress?: string;
    /** Targeted WCAG version. Default `'2.1'`. */
    wcagVersion?: WcagVersion;
    /** Targeted WCAG level. Default `'AA'`. */
    wcagLevel?: WcagLevel;
    /** Conformance status. Default `'partially'` (the honest default). */
    conformanceStatus?: ConformanceStatus;
    /** Legal frameworks to reference, with accurate WCAG mappings. */
    standards?: ComplianceStandard[];
    /** Measures the organisation takes to support accessibility. */
    measuresTaken?: string[];
    /** Known accessibility limitations the organisation is working to fix. */
    knownLimitations?: string[];
    /** Display name of the accessibility toolbar. Default `'an accessibility toolbar'`. */
    widgetName?: string;
    /** Whether to include the honest "tools on this site" note. Default `true`. */
    mentionWidget?: boolean;
    /** Review date as a display string. Defaults to today's date. */
    date?: string;
}
/** The generated statement in every supported format. */
interface GeneratedAccessibilityStatement {
    /** Document title, e.g. "Accessibility Statement for Acme". */
    title: string;
    /** Accessible HTML fragment (a `<section>` with headings and lists). */
    html: string;
    /** Standalone, valid HTML document wrapping the fragment. */
    htmlDocument: string;
    /** Markdown rendering. */
    markdown: string;
    /** Plain-text rendering. */
    text: string;
}
/**
 * Generate an accessibility statement in all supported formats.
 *
 * @example
 * const { html, markdown } = generateAccessibilityStatement({
 *   organizationName: 'Acme Inc.',
 *   websiteUrl: 'https://acme.example',
 *   email: 'accessibility@acme.example',
 *   standards: ['ADA', 'Section 508'],
 * })
 */
declare function generateAccessibilityStatement(options: AccessibilityStatementOptions): GeneratedAccessibilityStatement;

/** Props for {@link AccessibilityWidget} — identical to the core config. */
type AccessibilityWidgetProps = AccessibilityWidgetConfig;
/** Alias kept for backwards compatibility. */
type ReactAccessibilityWidgetProps = AccessibilityWidgetProps;
/**
 * Declarative React wrapper around the core widget.
 *
 * Renders nothing into the React tree — the widget manages its own DOM under
 * `<body>`. A single core instance is created on mount and destroyed on
 * unmount; prop changes are forwarded to the instance via the relevant setters
 * so the widget updates in place without remounting.
 */
declare function AccessibilityWidget(props: AccessibilityWidgetProps): null;
/** Alias kept for backwards compatibility. */
declare const ReactAccessibilityWidget: typeof AccessibilityWidget;

/**
 * Imperative hook for driving the widget from your own UI.
 *
 * Mounts a core instance on mount (destroyed on unmount) and returns memoised
 * controls plus reactive `state`/`isOpen`. Use this when you want to open,
 * close, reset, or re-theme the widget from a custom button instead of relying
 * on the built-in trigger.
 */
declare function useAccessibilityWidget(config?: AccessibilityWidgetConfig): {
    open: () => void;
    close: () => void;
    toggle: () => void;
    reset: () => void;
    setTitle: (title?: string) => void;
    setAccentColor: (accentColor?: string) => void;
    setTheme: (theme?: AccessibilityWidgetConfig["theme"]) => void;
    state: AccessibilityWidgetState | null;
    isOpen: boolean;
};

/** Props for {@link AccessibilityStatement} — the generator options plus a className. */
interface AccessibilityStatementProps extends AccessibilityStatementOptions {
    /** Optional class applied to the wrapping element. */
    className?: string;
}
/** Render an accessibility statement from the given organisation details. */
declare function AccessibilityStatement({ className, ...options }: AccessibilityStatementProps): react.JSX.Element;

export { type AccessibilityIssue, type AccessibilityProfile, AccessibilityStatement, type AccessibilityStatementOptions, type AccessibilityStatementProps, AccessibilityWidget, type AccessibilityWidgetConfig, type AccessibilityWidgetProps, type AccessibilityWidgetState, type AuditImpact, type ComplianceStandard, type ConformanceStatus, type GeneratedAccessibilityStatement, type KeyboardShortcut, ReactAccessibilityWidget, type ReactAccessibilityWidgetProps, type ToolKey, type WcagLevel, type WcagVersion, type WidgetEvent, auditAccessibility, generateAccessibilityStatement, useAccessibilityWidget };
