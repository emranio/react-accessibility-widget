/**
 * `@font-face` declarations for the bundled reading fonts: OpenDyslexic (the
 * dyslexia-specific typeface with weighted letterforms) and Atkinson
 * Hyperlegible (maximised character distinction for low vision). The font files
 * are served from `/accessibility-widget/fonts/` — host apps must expose the
 * package's `public` assets at that path for the Legible Fonts effect to load
 * custom faces.
 */
export const fonts = `
@font-face {
  font-family: "Accessibility Widget OpenDyslexic";
  src: url("/accessibility-widget/fonts/opendyslexic-regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget OpenDyslexic";
  src: url("/accessibility-widget/fonts/opendyslexic-bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget Atkinson Hyperlegible";
  src: url("/accessibility-widget/fonts/atkinson-hyperlegible-regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Accessibility Widget Atkinson Hyperlegible";
  src: url("/accessibility-widget/fonts/atkinson-hyperlegible-bold.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
`
