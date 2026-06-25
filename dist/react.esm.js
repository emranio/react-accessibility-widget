// src/react/widget.tsx
import { useEffect, useRef } from "react";

// src/core/effects/color-blind.ts
var COLOR_BLIND_FILTER_ID = "accessibility-widget-protanopia-filter";
function ensureColorBlindFilter() {
  if (document.getElementById(COLOR_BLIND_FILTER_ID)) return;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.id = COLOR_BLIND_FILTER_ID;
  svg.setAttribute("aria-hidden", "true");
  svg.style.cssText = "position:absolute;width:0;height:0;pointer-events:none;";
  svg.innerHTML = `
    <defs>
      <filter id="accessibility-widget-protanopia">
        <feColorMatrix type="matrix" values="
          0.567 0.433 0 0 0
          0.558 0.442 0 0 0
          0     0.242 0.758 0 0
          0     0     0 1 0"/>
      </filter>
    </defs>`;
  document.body.appendChild(svg);
}
function removeColorBlindFilter() {
  document.getElementById(COLOR_BLIND_FILTER_ID)?.remove();
}

// src/core/effects/host.ts
var HOST_STYLE_ID = "accessibility-widget-host-effects";
var HOST_WRAPPER_ID = "accessibility-widget-host";
function ensureHostStyle() {
  let el = document.getElementById(HOST_STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = HOST_STYLE_ID;
    document.head.appendChild(el);
  }
  return el;
}
function clearHostStyle() {
  const host = document.getElementById(HOST_STYLE_ID);
  if (host) host.textContent = "";
}
function ensureHostWrapper() {
  let wrapper = document.getElementById(HOST_WRAPPER_ID);
  if (wrapper) return wrapper;
  wrapper = document.createElement("div");
  wrapper.id = HOST_WRAPPER_ID;
  const body = document.body;
  const moved = [];
  for (const node of Array.from(body.childNodes)) {
    if (node instanceof HTMLElement && (node.classList.contains("accessibility-widget-root") || node.id === HOST_WRAPPER_ID)) {
      continue;
    }
    moved.push(node);
  }
  for (const node of moved) wrapper.appendChild(node);
  body.insertBefore(wrapper, body.firstChild);
  return wrapper;
}
function unwrapHost() {
  const wrapper = document.getElementById(HOST_WRAPPER_ID);
  if (!wrapper) return;
  const body = wrapper.parentElement;
  if (!body) return;
  while (wrapper.firstChild) body.insertBefore(wrapper.firstChild, wrapper);
  wrapper.remove();
}

// src/core/effects/presets.ts
var FONT_STEP = 0.1;
var LH_STEP = 0.15;
var LS_STEP = 0.02;
var DARK_CONTRAST_PRESETS = [
  { bg: "#1f2937", text: "#f9fafb", border: "#6b7280" },
  { bg: "#111827", text: "#ffffff", border: "#9ca3af" },
  { bg: "#030712", text: "#ffffff", border: "#d1d5db" },
  { bg: "#000000", text: "#ffffff", border: "#ffffff" }
];
var LIGHT_CONTRAST_PRESETS = [
  { bg: "#ffffff", text: "#111827", border: "#d1d5db" },
  { bg: "#f9fafb", text: "#0f172a", border: "#94a3b8" },
  { bg: "#ffffff", text: "#000000", border: "#475569" },
  { bg: "#ffffff", text: "#000000", border: "#000000" }
];
var HIGH_CONTRAST_PRESETS = [
  { bg: "#111111", text: "#fff7c2", border: "#ffe066" },
  { bg: "#000000", text: "#fff27a", border: "#fff27a" },
  { bg: "#000000", text: "#ffff00", border: "#ffff00" },
  { bg: "#000000", text: "#00ffff", border: "#00ffff" }
];
var READING_MASK_PRESETS = [
  { band: 86, opacity: 0.35, edge: "#2563eb" },
  { band: 116, opacity: 0.45, edge: "#0891b2" },
  { band: 146, opacity: 0.55, edge: "#10b981" }
];
var READING_GUIDE_PRESETS = [
  { height: 6, border: 2, fill: "#0c0c0c", edge: "#facc15", glow: "rgba(250,204,21,0.28)" }
];
function presetIndex(level, length) {
  return Math.max(0, Math.min(level - 1, length - 1));
}
function bigCursorValue(level) {
  const index = presetIndex(level, 3);
  const size = 38 + index * 10;
  const hotspot = Math.round(size * 0.16);
  const accent = ["#2563eb", "#0891b2", "#0f766e"][index];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
      <circle cx="30" cy="31" r="27" fill="${accent}" opacity="0.24"/>
      <path d="M8 5l42 27-20 5 13 18-10 6-13-19-12 16z" fill="#ffffff" stroke="#050505" stroke-width="5" stroke-linejoin="round"/>
      <path d="M8 5l42 27-20 5 13 18-10 6-13-19-12 16z" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linejoin="round"/>
    </svg>
  `.trim();
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspot} ${hotspot}, auto`;
}
function legibleFontFamily(level) {
  if (level === 1) return '"Accessibility Widget OpenDyslexic"';
  if (level === 2) return '"Accessibility Widget Atkinson Hyperlegible"';
  return null;
}

// src/core/effects/dynamic-css.ts
function dynamicCss(state) {
  const rules = [];
  const scope = `#${HOST_WRAPPER_ID}`;
  if (state.fontSize !== 0) {
    const pct = 100 + state.fontSize * FONT_STEP * 100;
    rules.push(`${scope} { font-size: ${pct}% !important; }`);
  }
  if (state.lineHeight !== 0) {
    const lh = 1.5 + state.lineHeight * LH_STEP;
    rules.push(`${scope} * { line-height: ${lh} !important; }`);
  }
  if (state.letterSpacing !== 0) {
    const ls = state.letterSpacing * LS_STEP;
    rules.push(`${scope} * { letter-spacing: ${ls}em !important; }`);
  }
  if (state.textAlignment !== "default") {
    rules.push(`${scope} * { text-align: ${state.textAlignment} !important; }`);
  }
  if (state.bigCursor !== 0) {
    const cursor = bigCursorValue(state.bigCursor);
    rules.push(`html, body, ${scope}, ${scope} *, .accessibility-widget-root, .accessibility-widget-root * { cursor: ${cursor} !important; }`);
  }
  return rules.join("\n");
}

// src/core/effects/magnifier.ts
var magnifierHandler = null;
var magnifierEl = null;
function normalizedMagnifierText(text) {
  return text.replace(/\s+/g, " ").trim().slice(0, 200);
}
function collectMagnifierText(node, parts) {
  if (parts.join(" ").length >= 220) return;
  if (node.nodeType === Node.TEXT_NODE) {
    const text = normalizedMagnifierText(node.textContent || "");
    if (text) parts.push(text);
    return;
  }
  if (!(node instanceof Element)) return;
  if (node.matches("script, style, noscript, template")) return;
  if (node instanceof HTMLElement && (node.hidden || node.getAttribute("aria-hidden") === "true")) return;
  if (node instanceof HTMLSelectElement) {
    const selected = node.selectedOptions[0] ?? node.options[node.selectedIndex];
    const text = normalizedMagnifierText(selected?.textContent || node.value);
    if (text) parts.push(text);
    return;
  }
  if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
    const text = normalizedMagnifierText(node.value || node.placeholder || node.getAttribute("aria-label") || "");
    if (text) parts.push(text);
    return;
  }
  if (node instanceof HTMLImageElement) {
    const text = normalizedMagnifierText(node.alt || node.getAttribute("aria-label") || "");
    if (text) parts.push(text);
    return;
  }
  for (const child of Array.from(node.childNodes)) collectMagnifierText(child, parts);
}
function magnifierTextForElement(element) {
  const target = element.closest('button, a, label, summary, [role="button"], [role="link"], select, input, textarea') ?? element;
  const parts = [];
  collectMagnifierText(target, parts);
  return normalizedMagnifierText(parts.join(" "));
}
function updateMagnifierAppearance(level) {
  if (!magnifierEl) return;
  const presets = [
    { fontSize: 18, maxWidth: 260, padding: "8px 12px" },
    { fontSize: 20, maxWidth: 300, padding: "10px 14px" },
    { fontSize: 22, maxWidth: 340, padding: "12px 16px" }
  ];
  const preset = presets[Math.max(0, Math.min(level - 1, presets.length - 1))];
  magnifierEl.style.fontSize = `${preset.fontSize}px`;
  magnifierEl.style.maxWidth = `${preset.maxWidth}px`;
  magnifierEl.style.padding = preset.padding;
}
function enableMagnifier(level) {
  if (magnifierHandler) {
    updateMagnifierAppearance(level);
    return;
  }
  magnifierEl = document.createElement("div");
  magnifierEl.className = "accessibility-widget-magnify-cursor";
  magnifierEl.setAttribute("aria-hidden", "true");
  magnifierEl.style.display = "none";
  document.body.appendChild(magnifierEl);
  updateMagnifierAppearance(level);
  magnifierHandler = (e) => {
    if (!magnifierEl) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || el.closest(".accessibility-widget-root") || el.closest(".accessibility-widget-magnify-cursor")) {
      magnifierEl.style.display = "none";
      return;
    }
    const text = magnifierTextForElement(el);
    if (!text) {
      magnifierEl.style.display = "none";
      return;
    }
    magnifierEl.textContent = text;
    magnifierEl.style.display = "block";
    const rect = magnifierEl.getBoundingClientRect();
    const gap = 16;
    const margin = 8;
    const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
    const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
    const left = Math.min(Math.max(e.clientX + gap, margin), maxLeft);
    const top = Math.min(Math.max(e.clientY + gap, margin), maxTop);
    magnifierEl.style.left = `${left}px`;
    magnifierEl.style.top = `${top}px`;
  };
  document.addEventListener("mousemove", magnifierHandler);
}
function disableMagnifier() {
  if (magnifierHandler) {
    document.removeEventListener("mousemove", magnifierHandler);
    magnifierHandler = null;
  }
  if (magnifierEl) {
    magnifierEl.remove();
    magnifierEl = null;
  }
}

// src/core/effects/reading-guide.ts
var readingGuideEl = null;
var readingGuidePointerEl = null;
var readingGuideMoveHandler = null;
var readingGuideResizeHandler = null;
var readingGuideX = 0;
var readingGuideY = 0;
var readingGuideLevel = 1;
function updateReadingGuideAppearance(level) {
  if (!readingGuideEl) return;
  readingGuideLevel = level;
  const preset = READING_GUIDE_PRESETS[presetIndex(level, READING_GUIDE_PRESETS.length)];
  readingGuideEl.dataset.level = String(level);
  readingGuideEl.style.setProperty("--accessibility-widget-reading-guide-height", `${preset.height}px`);
  readingGuideEl.style.setProperty("--accessibility-widget-reading-guide-border", `${preset.border}px`);
  readingGuideEl.style.setProperty("--accessibility-widget-reading-guide-fill", preset.fill);
  readingGuideEl.style.setProperty("--accessibility-widget-reading-guide-edge", preset.edge);
  readingGuideEl.style.setProperty("--accessibility-widget-reading-guide-glow", preset.glow);
}
function positionReadingGuide(x, y) {
  if (!readingGuideEl) return;
  const preset = READING_GUIDE_PRESETS[presetIndex(readingGuideLevel, READING_GUIDE_PRESETS.length)];
  const totalHeight = preset.height + preset.border * 2;
  const top = Math.max(0, Math.min(window.innerHeight - totalHeight, y - totalHeight / 2));
  readingGuideEl.style.top = `${top}px`;
  readingGuideEl.style.setProperty("--accessibility-widget-reading-guide-x", `${x}px`);
}
function enableReadingGuide(level) {
  if (!readingGuideEl) {
    readingGuideEl = document.createElement("div");
    readingGuideEl.className = "accessibility-widget-reading-guide";
    readingGuideEl.setAttribute("aria-hidden", "true");
    readingGuidePointerEl = document.createElement("span");
    readingGuidePointerEl.className = "accessibility-widget-reading-guide-pointer";
    readingGuideEl.appendChild(readingGuidePointerEl);
    document.body.appendChild(readingGuideEl);
    readingGuideX = window.innerWidth / 2;
    readingGuideY = window.innerHeight / 2;
    readingGuideMoveHandler = (e) => {
      readingGuideX = e.clientX;
      readingGuideY = e.clientY;
      positionReadingGuide(readingGuideX, readingGuideY);
    };
    readingGuideResizeHandler = () => positionReadingGuide(readingGuideX, readingGuideY);
    document.addEventListener("mousemove", readingGuideMoveHandler, { passive: true });
    window.addEventListener("resize", readingGuideResizeHandler, { passive: true });
  }
  updateReadingGuideAppearance(level);
  positionReadingGuide(readingGuideX, readingGuideY);
}
function disableReadingGuide() {
  if (readingGuideMoveHandler) {
    document.removeEventListener("mousemove", readingGuideMoveHandler);
    readingGuideMoveHandler = null;
  }
  if (readingGuideResizeHandler) {
    window.removeEventListener("resize", readingGuideResizeHandler);
    readingGuideResizeHandler = null;
  }
  if (readingGuideEl) {
    readingGuideEl.remove();
    readingGuideEl = null;
    readingGuidePointerEl = null;
  }
}

// src/core/effects/reading-lens.ts
var lensDiameter = 220;
var lensZoom = 1.8;
var lensEl = null;
var lensInner = null;
var lensCloneEl = null;
var lensMoveHandler = null;
var lensRafId = null;
var lensTargetX = 0;
var lensTargetY = 0;
var lensCurX = 0;
var lensCurY = 0;
var lensVisible = false;
function updateReadingLensAppearance(level) {
  const presets = [
    { diameter: 220, zoom: 1.8 },
    { diameter: 240, zoom: 2.2 },
    { diameter: 260, zoom: 2.75 }
  ];
  const preset = presets[Math.max(0, Math.min(level - 1, presets.length - 1))];
  lensDiameter = preset.diameter;
  lensZoom = preset.zoom;
  if (!lensEl || !lensInner) return;
  lensEl.style.width = `${lensDiameter}px`;
  lensEl.style.height = `${lensDiameter}px`;
  if (lensVisible) lensRafId ?? (lensRafId = requestAnimationFrame(lensFrame));
}
function snapshotHostIntoLens() {
  if (!lensInner) return;
  const host = document.getElementById(HOST_WRAPPER_ID);
  if (!host) return;
  const rect = host.getBoundingClientRect();
  lensCloneEl = null;
  lensInner.innerHTML = "";
  const clone = host.cloneNode(true);
  clone.id = "";
  clone.style.position = "absolute";
  clone.style.top = `${rect.top}px`;
  clone.style.left = `${rect.left}px`;
  clone.style.width = `${rect.width}px`;
  clone.style.pointerEvents = "none";
  clone.querySelectorAll(".accessibility-widget-root, .accessibility-widget-reading-lens, script, iframe").forEach((n) => n.remove());
  const liveInputs = host.querySelectorAll("input, textarea");
  const cloneInputs = clone.querySelectorAll("input, textarea");
  for (let i = 0; i < liveInputs.length && i < cloneInputs.length; i++) {
    const live = liveInputs[i];
    const dup = cloneInputs[i];
    if (live instanceof HTMLInputElement && dup instanceof HTMLInputElement) {
      dup.value = live.value;
      if (live.type === "checkbox" || live.type === "radio") dup.checked = live.checked;
    } else if (live instanceof HTMLTextAreaElement && dup instanceof HTMLTextAreaElement) {
      dup.value = live.value;
    }
  }
  const liveSelects = host.querySelectorAll("select");
  const cloneSelects = clone.querySelectorAll("select");
  for (let i = 0; i < liveSelects.length && i < cloneSelects.length; i++) {
    cloneSelects[i].selectedIndex = liveSelects[i].selectedIndex;
  }
  lensCloneEl = clone;
  lensInner.appendChild(clone);
}
function syncLensClonePosition() {
  if (!lensCloneEl) return;
  const host = document.getElementById(HOST_WRAPPER_ID);
  if (!host) return;
  const rect = host.getBoundingClientRect();
  lensCloneEl.style.top = `${rect.top}px`;
  lensCloneEl.style.left = `${rect.left}px`;
  lensCloneEl.style.width = `${rect.width}px`;
}
function lensFrame() {
  lensRafId = null;
  if (!lensEl || !lensInner) return;
  const lensHalf = lensDiameter / 2;
  lensCurX = Math.round(lensTargetX);
  lensCurY = Math.round(lensTargetY);
  syncLensClonePosition();
  lensEl.style.transform = `translate3d(${lensCurX - lensHalf}px, ${lensCurY - lensHalf}px, 0)`;
  const tx = lensHalf - lensCurX * lensZoom;
  const ty = lensHalf - lensCurY * lensZoom;
  lensInner.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${lensZoom})`;
}
function enableReadingLens(level) {
  updateReadingLensAppearance(level);
  if (lensEl) {
    if (!lensVisible) snapshotHostIntoLens();
    return;
  }
  lensEl = document.createElement("div");
  lensEl.className = "accessibility-widget-reading-lens";
  lensEl.setAttribute("aria-hidden", "true");
  lensEl.setAttribute("inert", "");
  lensEl.style.display = "none";
  lensEl.style.left = "0";
  lensEl.style.top = "0";
  lensEl.style.willChange = "transform";
  lensInner = document.createElement("div");
  lensInner.className = "accessibility-widget-reading-lens-inner";
  lensInner.style.willChange = "transform";
  lensEl.appendChild(lensInner);
  document.body.appendChild(lensEl);
  updateReadingLensAppearance(level);
  snapshotHostIntoLens();
  lensMoveHandler = (e) => {
    if (!lensEl) return;
    const target = e.target;
    if (target?.closest(".accessibility-widget-root")) {
      if (lensVisible) {
        lensEl.style.display = "none";
        lensVisible = false;
      }
      return;
    }
    if (!lensVisible) {
      lensEl.style.display = "block";
      lensTargetX = e.clientX;
      lensTargetY = e.clientY;
      lensCurX = e.clientX;
      lensCurY = e.clientY;
      lensVisible = true;
      snapshotHostIntoLens();
    }
    lensTargetX = e.clientX;
    lensTargetY = e.clientY;
    lensRafId ?? (lensRafId = requestAnimationFrame(lensFrame));
  };
  document.addEventListener("mousemove", lensMoveHandler, { passive: true });
}
function disableReadingLens() {
  if (lensMoveHandler) {
    document.removeEventListener("mousemove", lensMoveHandler);
    lensMoveHandler = null;
  }
  if (lensRafId !== null) {
    cancelAnimationFrame(lensRafId);
    lensRafId = null;
  }
  lensVisible = false;
  if (lensEl) {
    lensEl.remove();
    lensEl = null;
    lensInner = null;
    lensCloneEl = null;
  }
}

// src/core/effects/reading-mask.ts
var readingMaskEl = null;
var readingMaskTopEl = null;
var readingMaskBottomEl = null;
var readingMaskMoveHandler = null;
var readingMaskResizeHandler = null;
var readingMaskY = 0;
var readingMaskLevel = 1;
function updateReadingMaskAppearance(level) {
  if (!readingMaskEl) return;
  readingMaskLevel = level;
  const preset = READING_MASK_PRESETS[presetIndex(level, READING_MASK_PRESETS.length)];
  readingMaskEl.dataset.level = String(level);
  readingMaskEl.style.setProperty("--accessibility-widget-reading-mask-opacity", String(preset.opacity));
  readingMaskEl.style.setProperty("--accessibility-widget-reading-mask-edge", preset.edge);
}
function positionReadingMask(y) {
  if (!readingMaskTopEl || !readingMaskBottomEl) return;
  const preset = READING_MASK_PRESETS[presetIndex(readingMaskLevel, READING_MASK_PRESETS.length)];
  const topHeight = Math.max(0, y - preset.band / 2);
  const bottomTop = Math.min(window.innerHeight, y + preset.band / 2);
  readingMaskTopEl.style.height = `${topHeight}px`;
  readingMaskBottomEl.style.top = `${bottomTop}px`;
  readingMaskBottomEl.style.height = `${Math.max(0, window.innerHeight - bottomTop)}px`;
}
function enableReadingMask(level) {
  if (!readingMaskEl) {
    readingMaskEl = document.createElement("div");
    readingMaskEl.className = "accessibility-widget-reading-mask";
    readingMaskEl.setAttribute("aria-hidden", "true");
    readingMaskTopEl = document.createElement("div");
    readingMaskTopEl.className = "accessibility-widget-reading-mask-panel accessibility-widget-reading-mask-top";
    readingMaskBottomEl = document.createElement("div");
    readingMaskBottomEl.className = "accessibility-widget-reading-mask-panel accessibility-widget-reading-mask-bottom";
    readingMaskEl.append(readingMaskTopEl, readingMaskBottomEl);
    document.body.appendChild(readingMaskEl);
    readingMaskY = window.innerHeight / 2;
    readingMaskMoveHandler = (e) => {
      readingMaskY = e.clientY;
      positionReadingMask(readingMaskY);
    };
    readingMaskResizeHandler = () => positionReadingMask(readingMaskY);
    document.addEventListener("mousemove", readingMaskMoveHandler, { passive: true });
    window.addEventListener("resize", readingMaskResizeHandler, { passive: true });
  }
  updateReadingMaskAppearance(level);
  positionReadingMask(readingMaskY);
}
function disableReadingMask() {
  if (readingMaskMoveHandler) {
    document.removeEventListener("mousemove", readingMaskMoveHandler);
    readingMaskMoveHandler = null;
  }
  if (readingMaskResizeHandler) {
    window.removeEventListener("resize", readingMaskResizeHandler);
    readingMaskResizeHandler = null;
  }
  if (readingMaskEl) {
    readingMaskEl.remove();
    readingMaskEl = null;
    readingMaskTopEl = null;
    readingMaskBottomEl = null;
  }
}

// src/core/effects/read-aloud.ts
var READABLE_SELECTOR = "p, li, h1, h2, h3, h4, h5, h6, a, button, label, td, th, caption, blockquote, figcaption, summary, dt, dd, span, div";
var clickHandler = null;
var highlighted = null;
function supported() {
  return typeof window !== "undefined" && typeof window.speechSynthesis !== "undefined" && typeof window.SpeechSynthesisUtterance !== "undefined";
}
function clearHighlight() {
  if (highlighted) {
    highlighted.style.outline = "";
    highlighted.style.outlineOffset = "";
    highlighted = null;
  }
}
function speak(element) {
  const text = (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim();
  if (!text) return;
  window.speechSynthesis.cancel();
  clearHighlight();
  const utterance = new SpeechSynthesisUtterance(text.slice(0, 4e3));
  utterance.onend = clearHighlight;
  utterance.onerror = clearHighlight;
  highlighted = element;
  element.style.outline = "3px solid #2563eb";
  element.style.outlineOffset = "2px";
  window.speechSynthesis.speak(utterance);
}
function enableReadAloud() {
  if (clickHandler || !supported()) return;
  clickHandler = (e) => {
    const target = e.target;
    if (!target || target.closest(".accessibility-widget-root")) return;
    const host = document.getElementById(HOST_WRAPPER_ID);
    if (!host || !host.contains(target)) return;
    const element = target.closest(READABLE_SELECTOR) ?? target;
    e.preventDefault();
    e.stopPropagation();
    speak(element);
  };
  document.addEventListener("click", clickHandler, true);
  if (typeof document !== "undefined") {
    document.body.classList.add("accessibility-widget-read-aloud-active");
  }
}
function disableReadAloud() {
  if (clickHandler) {
    document.removeEventListener("click", clickHandler, true);
    clickHandler = null;
  }
  if (supported()) window.speechSynthesis.cancel();
  clearHighlight();
  if (typeof document !== "undefined") {
    document.body.classList.remove("accessibility-widget-read-aloud-active");
  }
}

// src/core/effects/dictionary.ts
var customLookup = null;
function setDictionaryLookup(lookup) {
  customLookup = lookup;
}
async function defaultLookup(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? null;
  } catch {
    return null;
  }
}
var dblClickHandler = null;
var keyHandler = null;
var popover = null;
var requestSeq = 0;
function closePopover() {
  if (popover) {
    popover.remove();
    popover = null;
  }
}
function showPopover(x, y, word, body) {
  closePopover();
  const el = document.createElement("div");
  el.className = "accessibility-widget-dictionary-popover";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-label", `Definition of ${word}`);
  Object.assign(el.style, {
    position: "fixed",
    zIndex: "2147483647",
    maxWidth: "300px",
    background: "#ffffff",
    color: "#0c0c0c",
    border: "1px solid #d4d4d8",
    borderRadius: "8px",
    padding: "12px 34px 12px 14px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
    font: "14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    left: `${Math.max(8, Math.min(x, (window.innerWidth || 1024) - 320))}px`,
    top: `${y + 14}px`
  });
  const title = document.createElement("strong");
  title.textContent = word;
  title.style.display = "block";
  title.style.marginBottom = "4px";
  const text = document.createElement("p");
  text.textContent = body;
  text.style.margin = "0";
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "\xD7";
  close.setAttribute("aria-label", "Close definition");
  Object.assign(close.style, {
    position: "absolute",
    top: "6px",
    right: "8px",
    border: "none",
    background: "none",
    fontSize: "18px",
    lineHeight: "1",
    cursor: "pointer",
    color: "inherit"
  });
  close.addEventListener("click", closePopover);
  el.append(title, text, close);
  document.body.appendChild(el);
  popover = el;
}
function selectedWord() {
  const text = typeof window !== "undefined" && window.getSelection?.()?.toString().trim() || "";
  const first = text.split(/\s+/)[0] ?? "";
  return first.replace(/[^\p{L}\p{N}'-]/gu, "");
}
function enableDictionary() {
  if (dblClickHandler) return;
  dblClickHandler = (e) => {
    const target = e.target;
    if (!target || target.closest(".accessibility-widget-root") || target.closest(".accessibility-widget-dictionary-popover")) return;
    const host = document.getElementById(HOST_WRAPPER_ID);
    if (!host || !host.contains(target)) return;
    const word = selectedWord();
    if (!word) return;
    const { clientX: x, clientY: y } = e;
    showPopover(x, y, word, "Looking up\u2026");
    const seq = ++requestSeq;
    (customLookup ?? defaultLookup)(word).then((def) => {
      if (seq === requestSeq) showPopover(x, y, word, def || "No definition found.");
    }).catch(() => {
      if (seq === requestSeq) showPopover(x, y, word, "No definition found.");
    });
  };
  document.addEventListener("dblclick", dblClickHandler, true);
  keyHandler = (e) => {
    if (e.key === "Escape") closePopover();
  };
  document.addEventListener("keydown", keyHandler, true);
}
function disableDictionary() {
  if (dblClickHandler) {
    document.removeEventListener("dblclick", dblClickHandler, true);
    dblClickHandler = null;
  }
  if (keyHandler) {
    document.removeEventListener("keydown", keyHandler, true);
    keyHandler = null;
  }
  requestSeq++;
  closePopover();
}

// src/core/effects/simplify.ts
var provider = null;
function setSimplifyProvider(fn) {
  provider = fn;
}
var upHandler = null;
var keyHandler2 = null;
var actionBtn = null;
var popover2 = null;
var requestSeq2 = 0;
function removeAction() {
  if (actionBtn) {
    actionBtn.remove();
    actionBtn = null;
  }
}
function closePopover2() {
  if (popover2) {
    popover2.remove();
    popover2 = null;
  }
}
function showPopover2(x, y, body) {
  closePopover2();
  const el = document.createElement("div");
  el.className = "accessibility-widget-simplify-popover";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-label", "Simplified text");
  Object.assign(el.style, {
    position: "fixed",
    zIndex: "2147483647",
    maxWidth: "340px",
    background: "#ffffff",
    color: "#0c0c0c",
    border: "1px solid #d4d4d8",
    borderRadius: "8px",
    padding: "12px 34px 12px 14px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
    font: "14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    left: `${Math.max(8, Math.min(x, (window.innerWidth || 1024) - 360))}px`,
    top: `${y + 14}px`
  });
  const text = document.createElement("p");
  text.textContent = body;
  text.style.margin = "0";
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "\xD7";
  close.setAttribute("aria-label", "Close");
  Object.assign(close.style, {
    position: "absolute",
    top: "6px",
    right: "8px",
    border: "none",
    background: "none",
    fontSize: "18px",
    lineHeight: "1",
    cursor: "pointer",
    color: "inherit"
  });
  close.addEventListener("click", closePopover2);
  el.append(text, close);
  document.body.appendChild(el);
  popover2 = el;
}
function showAction(x, y, text) {
  removeAction();
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "accessibility-widget-simplify-action";
  btn.textContent = "\u2728 Simplify";
  Object.assign(btn.style, {
    position: "fixed",
    zIndex: "2147483647",
    background: "#1d4ed8",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    font: "13px/1 system-ui, sans-serif",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    left: `${Math.max(8, Math.min(x, (window.innerWidth || 1024) - 120))}px`,
    top: `${y + 10}px`
  });
  btn.addEventListener("mousedown", (e) => e.preventDefault());
  btn.addEventListener("click", () => {
    removeAction();
    if (!provider) return;
    showPopover2(x, y, "Simplifying\u2026");
    const seq = ++requestSeq2;
    provider(text).then((result) => {
      if (seq === requestSeq2) showPopover2(x, y, result || "No result.");
    }).catch(() => {
      if (seq === requestSeq2) showPopover2(x, y, "Could not simplify the selection.");
    });
  });
  document.body.appendChild(btn);
  actionBtn = btn;
}
function enableSimplify() {
  if (upHandler || !provider) return;
  upHandler = (e) => {
    const target = e.target;
    if (target?.closest(".accessibility-widget-root") || target?.closest(".accessibility-widget-simplify-action") || target?.closest(".accessibility-widget-simplify-popover")) return;
    const host = document.getElementById(HOST_WRAPPER_ID);
    const text = (window.getSelection?.()?.toString() ?? "").trim();
    if (!host || !text || target && !host.contains(target)) {
      removeAction();
      return;
    }
    showAction(e.clientX, e.clientY, text);
  };
  document.addEventListener("mouseup", upHandler, true);
  keyHandler2 = (e) => {
    if (e.key === "Escape") {
      removeAction();
      closePopover2();
    }
  };
  document.addEventListener("keydown", keyHandler2, true);
}
function disableSimplify() {
  if (upHandler) {
    document.removeEventListener("mouseup", upHandler, true);
    upHandler = null;
  }
  if (keyHandler2) {
    document.removeEventListener("keydown", keyHandler2, true);
    keyHandler2 = null;
  }
  requestSeq2++;
  removeAction();
  closePopover2();
}

// src/core/effects/virtual-keyboard.ts
var TEXT_INPUT_TYPES = /* @__PURE__ */ new Set(["text", "search", "email", "url", "tel", "password", "number", ""]);
var ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"]
];
var keyboard = null;
var lastField = null;
var focusHandler = null;
var shiftOn = false;
function isTextField(el) {
  if (el instanceof HTMLTextAreaElement) return !el.closest(".accessibility-widget-root");
  if (el instanceof HTMLInputElement) {
    return TEXT_INPUT_TYPES.has(el.type.toLowerCase()) && !el.closest(".accessibility-widget-root");
  }
  return false;
}
function typeInto(field, text) {
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? field.value.length;
  field.value = field.value.slice(0, start) + text + field.value.slice(end);
  const caret = start + text.length;
  try {
    field.setSelectionRange(caret, caret);
  } catch {
  }
  field.dispatchEvent(new Event("input", { bubbles: true }));
}
function backspace(field) {
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? field.value.length;
  if (start !== end) {
    field.value = field.value.slice(0, start) + field.value.slice(end);
    try {
      field.setSelectionRange(start, start);
    } catch {
    }
  } else if (start > 0) {
    field.value = field.value.slice(0, start - 1) + field.value.slice(end);
    try {
      field.setSelectionRange(start - 1, start - 1);
    } catch {
    }
  }
  field.dispatchEvent(new Event("input", { bubbles: true }));
}
function press(value) {
  if (!lastField) return;
  if (value === "Backspace") backspace(lastField);
  else if (value === "Space") typeInto(lastField, " ");
  else if (value === "Enter") {
    if (lastField instanceof HTMLTextAreaElement) typeInto(lastField, "\n");
  } else {
    typeInto(lastField, shiftOn ? value.toUpperCase() : value);
  }
}
function keyButton(label, value, flex) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "accessibility-widget-vk-key";
  btn.textContent = label;
  btn.setAttribute("aria-label", value === "Space" ? "Space" : value === "Backspace" ? "Backspace" : value);
  Object.assign(btn.style, {
    flex: flex ? String(flex) : "1",
    minWidth: "30px",
    padding: "10px 6px",
    border: "1px solid #d4d4d8",
    borderRadius: "6px",
    background: "#ffffff",
    color: "#0c0c0c",
    font: "14px/1 system-ui, sans-serif",
    cursor: "pointer"
  });
  btn.addEventListener("mousedown", (e) => e.preventDefault());
  btn.addEventListener("click", () => press(value));
  return btn;
}
function buildKeyboard() {
  const root = document.createElement("div");
  root.className = "accessibility-widget-virtual-keyboard";
  root.setAttribute("role", "group");
  root.setAttribute("aria-label", "Virtual keyboard");
  Object.assign(root.style, {
    position: "fixed",
    left: "50%",
    bottom: "16px",
    transform: "translateX(-50%)",
    zIndex: "2147483647",
    width: "min(640px, 96vw)",
    background: "#f4f4f5",
    border: "1px solid #d4d4d8",
    borderRadius: "12px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.22)",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  });
  const handle = document.createElement("div");
  handle.setAttribute("aria-hidden", "true");
  Object.assign(handle.style, {
    height: "6px",
    width: "48px",
    borderRadius: "3px",
    background: "#a1a1aa",
    margin: "0 auto 4px",
    cursor: "grab"
  });
  enableDrag(root, handle);
  root.appendChild(handle);
  const makeRow = (keys) => {
    const row = document.createElement("div");
    Object.assign(row.style, { display: "flex", gap: "6px", justifyContent: "center" });
    keys.forEach((k) => row.appendChild(k));
    return row;
  };
  for (const row of ROWS) {
    root.appendChild(makeRow(row.map((k) => keyButton(k, k))));
  }
  const shiftBtn = keyButton("\u21E7 Shift", "Shift", 2);
  shiftBtn.addEventListener("click", () => {
    shiftOn = !shiftOn;
    shiftBtn.style.background = shiftOn ? "#1d4ed8" : "#ffffff";
    shiftBtn.style.color = shiftOn ? "#ffffff" : "#0c0c0c";
    shiftBtn.setAttribute("aria-pressed", String(shiftOn));
  });
  shiftBtn.setAttribute("aria-pressed", "false");
  root.appendChild(makeRow([
    shiftBtn,
    keyButton("Space", "Space", 6),
    keyButton("\u232B", "Backspace", 2),
    keyButton("Enter", "Enter", 2)
  ]));
  return root;
}
function enableDrag(el, handle) {
  handle.addEventListener("mousedown", (down) => {
    down.preventDefault();
    const rect = el.getBoundingClientRect();
    const offsetX = down.clientX - rect.left;
    const offsetY = down.clientY - rect.top;
    const move = (m) => {
      el.style.left = `${m.clientX - offsetX}px`;
      el.style.top = `${m.clientY - offsetY}px`;
      el.style.bottom = "auto";
      el.style.transform = "none";
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });
}
function enableVirtualKeyboard() {
  if (keyboard || typeof document === "undefined") return;
  const host = document.getElementById(HOST_WRAPPER_ID);
  if (isTextField(document.activeElement)) lastField = document.activeElement;
  focusHandler = (e) => {
    if (isTextField(e.target) && (!host || host.contains(e.target))) lastField = e.target;
  };
  document.addEventListener("focusin", focusHandler, true);
  keyboard = buildKeyboard();
  document.body.appendChild(keyboard);
}
function disableVirtualKeyboard() {
  if (focusHandler) {
    document.removeEventListener("focusin", focusHandler, true);
    focusHandler = null;
  }
  if (keyboard) {
    keyboard.remove();
    keyboard = null;
  }
  lastField = null;
  shiftOn = false;
}

// src/core/utils/css.ts
function setCssVar(el, name, value) {
  const normalized = value?.trim();
  if (normalized) el.style.setProperty(name, normalized);
  else el.style.removeProperty(name);
}

// src/core/effects/wrapper-vars.ts
function syncWrapperVars(wrapper, state) {
  setCssVar(wrapper, "--accessibility-widget-legible-font-family", legibleFontFamily(state.legibleFonts));
  setCssVar(wrapper, "--accessibility-widget-legible-word-spacing", state.legibleFonts > 0 ? `${state.legibleFonts === 1 ? 0.03 : 0.015}em` : null);
  setCssVar(wrapper, "--accessibility-widget-legible-letter-spacing", state.legibleFonts > 0 ? `${state.legibleFonts === 1 ? 0.02 : 5e-3}em` : null);
  setCssVar(wrapper, "--accessibility-widget-title-outline-width", state.highlightTitles > 0 ? `${state.highlightTitles}px` : null);
  setCssVar(wrapper, "--accessibility-widget-title-highlight-alpha", state.highlightTitles > 0 ? `${0.04 + state.highlightTitles * 0.03}` : null);
  setCssVar(wrapper, "--accessibility-widget-link-outline-width", state.highlightLinks > 0 ? `${state.highlightLinks}px` : null);
  setCssVar(wrapper, "--accessibility-widget-link-highlight-alpha", state.highlightLinks > 0 ? `${0.04 + state.highlightLinks * 0.03}` : null);
  setCssVar(wrapper, "--accessibility-widget-link-underline-width", state.highlightLinks > 0 ? `${state.highlightLinks}px` : null);
  const dark = state.darkContrast > 0 ? DARK_CONTRAST_PRESETS[state.darkContrast - 1] : null;
  setCssVar(wrapper, "--accessibility-widget-dark-contrast-bg", dark?.bg ?? null);
  setCssVar(wrapper, "--accessibility-widget-dark-contrast-text", dark?.text ?? null);
  setCssVar(wrapper, "--accessibility-widget-dark-contrast-border", dark?.border ?? null);
  const light = state.lightContrast > 0 ? LIGHT_CONTRAST_PRESETS[state.lightContrast - 1] : null;
  setCssVar(wrapper, "--accessibility-widget-light-contrast-bg", light?.bg ?? null);
  setCssVar(wrapper, "--accessibility-widget-light-contrast-text", light?.text ?? null);
  setCssVar(wrapper, "--accessibility-widget-light-contrast-border", light?.border ?? null);
  const high = state.highContrast > 0 ? HIGH_CONTRAST_PRESETS[state.highContrast - 1] : null;
  setCssVar(wrapper, "--accessibility-widget-high-contrast-bg", high?.bg ?? null);
  setCssVar(wrapper, "--accessibility-widget-high-contrast-text", high?.text ?? null);
  setCssVar(wrapper, "--accessibility-widget-high-contrast-border", high?.border ?? null);
  setCssVar(wrapper, "--accessibility-widget-monochrome-amount", state.monochrome > 0 ? "100%" : null);
  setCssVar(wrapper, "--accessibility-widget-invert-amount", state.invertColors > 0 ? "100%" : null);
  setCssVar(wrapper, "--accessibility-widget-color-blind-saturate", state.colorBlind > 0 ? `${1 - state.colorBlind * 0.1}` : null);
  setCssVar(wrapper, "--accessibility-widget-color-blind-contrast", state.colorBlind > 0 ? `${1 + state.colorBlind * 0.05}` : null);
}

// src/core/effects/index.ts
function effectToggles(state) {
  return [
    ["accessibility-widget-effect-legible-fonts", state.legibleFonts > 0],
    ["accessibility-widget-effect-dyslexia", state.profile === "dyslexia"],
    ["accessibility-widget-effect-highlight-titles", state.highlightTitles > 0],
    ["accessibility-widget-effect-highlight-links", state.highlightLinks > 0],
    ["accessibility-widget-effect-dark-contrast", state.darkContrast > 0],
    ["accessibility-widget-effect-light-contrast", state.lightContrast > 0],
    ["accessibility-widget-effect-high-contrast", state.highContrast > 0],
    ["accessibility-widget-effect-monochrome", state.monochrome > 0],
    ["accessibility-widget-effect-invert", state.invertColors > 0],
    ["accessibility-widget-effect-color-blind", state.colorBlind > 0],
    ["accessibility-widget-effect-hide-images", state.hideImages > 0],
    ["accessibility-widget-effect-off-animations", state.offAnimations > 0],
    ["accessibility-widget-effect-text-magnifier", state.textMagnifier > 0],
    ["accessibility-widget-effect-big-cursor", state.bigCursor > 0],
    ["accessibility-widget-effect-reading-mask-active", state.readingMask > 0],
    ["accessibility-widget-effect-reading-guide-active", state.readingGuide > 0],
    ["accessibility-widget-effect-focus-highlight", state.focusHighlight > 0]
  ];
}
function applyEffects(state) {
  if (typeof document === "undefined") return;
  const wrapper = document.getElementById(HOST_WRAPPER_ID);
  if (!wrapper) return;
  for (const [cls, on] of effectToggles(state)) {
    wrapper.classList.toggle(cls, on);
  }
  syncWrapperVars(wrapper, state);
  if (state.colorBlind > 0) ensureColorBlindFilter();
  ensureHostStyle().textContent = dynamicCss(state);
  if (state.textMagnifier > 0) enableMagnifier(state.textMagnifier);
  else disableMagnifier();
  if (state.readingLens > 0) enableReadingLens(state.readingLens);
  else disableReadingLens();
  if (state.readingMask > 0) enableReadingMask(state.readingMask);
  else disableReadingMask();
  if (state.readingGuide > 0) enableReadingGuide(state.readingGuide);
  else disableReadingGuide();
  if (state.readAloud > 0) enableReadAloud();
  else disableReadAloud();
  if (state.dictionary > 0) enableDictionary();
  else disableDictionary();
  if (state.simplify > 0) enableSimplify();
  else disableSimplify();
  if (state.virtualKeyboard > 0) enableVirtualKeyboard();
  else disableVirtualKeyboard();
}
function clearEffects() {
  if (typeof document === "undefined") return;
  const wrapper = document.getElementById(HOST_WRAPPER_ID);
  if (wrapper) {
    for (const cls of Array.from(wrapper.classList)) {
      if (cls.startsWith("accessibility-widget-effect-")) wrapper.classList.remove(cls);
    }
  }
  clearHostStyle();
  removeColorBlindFilter();
  disableMagnifier();
  disableReadingLens();
  disableReadingMask();
  disableReadingGuide();
  disableReadAloud();
  disableDictionary();
  disableSimplify();
  disableVirtualKeyboard();
}

// src/core/icons.ts
import { __iconNode as aLargeSmallIcon } from "lucide-react/dist/esm/icons/a-large-small.mjs";
import { __iconNode as betweenHorizontalStartIcon } from "lucide-react/dist/esm/icons/between-horizontal-start.mjs";
import { __iconNode as betweenVerticalStartIcon } from "lucide-react/dist/esm/icons/between-vertical-start.mjs";
import { __iconNode as bookOpenTextIcon } from "lucide-react/dist/esm/icons/book-open-text.mjs";
import { __iconNode as brainIcon } from "lucide-react/dist/esm/icons/brain.mjs";
import { __iconNode as chevronDownIcon } from "lucide-react/dist/esm/icons/chevron-down.mjs";
import { __iconNode as chevronUpIcon } from "lucide-react/dist/esm/icons/chevron-up.mjs";
import { __iconNode as circleIcon } from "lucide-react/dist/esm/icons/circle.mjs";
import { __iconNode as circleOffIcon } from "lucide-react/dist/esm/icons/circle-off.mjs";
import { __iconNode as contrastIcon } from "lucide-react/dist/esm/icons/contrast.mjs";
import { __iconNode as eyeIcon } from "lucide-react/dist/esm/icons/eye.mjs";
import { __iconNode as externalLinkIcon } from "lucide-react/dist/esm/icons/external-link.mjs";
import { __iconNode as focusIcon } from "lucide-react/dist/esm/icons/focus.mjs";
import { __iconNode as headingIcon } from "lucide-react/dist/esm/icons/heading.mjs";
import { __iconNode as imageOffIcon } from "lucide-react/dist/esm/icons/image-off.mjs";
import { __iconNode as landmarkIcon } from "lucide-react/dist/esm/icons/landmark.mjs";
import { __iconNode as layersIcon } from "lucide-react/dist/esm/icons/layers.mjs";
import { __iconNode as linkIcon } from "lucide-react/dist/esm/icons/link.mjs";
import { __iconNode as monitorPauseIcon } from "lucide-react/dist/esm/icons/monitor-pause.mjs";
import { __iconNode as moonIcon } from "lucide-react/dist/esm/icons/moon.mjs";
import { __iconNode as mousePointer2Icon } from "lucide-react/dist/esm/icons/mouse-pointer-2.mjs";
import { __iconNode as moveHorizontalIcon } from "lucide-react/dist/esm/icons/move-horizontal.mjs";
import { __iconNode as paletteIcon } from "lucide-react/dist/esm/icons/palette.mjs";
import { __iconNode as rotateCcwIcon } from "lucide-react/dist/esm/icons/rotate-ccw.mjs";
import { __iconNode as rows3Icon } from "lucide-react/dist/esm/icons/rows-3.mjs";
import { __iconNode as scanEyeIcon } from "lucide-react/dist/esm/icons/scan-eye.mjs";
import { __iconNode as sunDimIcon } from "lucide-react/dist/esm/icons/sun-dim.mjs";
import { __iconNode as sunIcon } from "lucide-react/dist/esm/icons/sun.mjs";
import { __iconNode as textAlignCenterIcon } from "lucide-react/dist/esm/icons/text-align-center.mjs";
import { __iconNode as textAlignEndIcon } from "lucide-react/dist/esm/icons/text-align-end.mjs";
import { __iconNode as textAlignJustifyIcon } from "lucide-react/dist/esm/icons/text-align-justify.mjs";
import { __iconNode as textAlignStartIcon } from "lucide-react/dist/esm/icons/text-align-start.mjs";
import { __iconNode as textInitialIcon } from "lucide-react/dist/esm/icons/text-initial.mjs";
import { __iconNode as venetianMaskIcon } from "lucide-react/dist/esm/icons/venetian-mask.mjs";
import { __iconNode as volume2Icon } from "lucide-react/dist/esm/icons/volume-2.mjs";
import { __iconNode as wholeWordIcon } from "lucide-react/dist/esm/icons/whole-word.mjs";
import { __iconNode as xIcon } from "lucide-react/dist/esm/icons/x.mjs";
import { __iconNode as zapIcon } from "lucide-react/dist/esm/icons/zap.mjs";
import { __iconNode as zoomInIcon } from "lucide-react/dist/esm/icons/zoom-in.mjs";
import { __iconNode as earIcon } from "lucide-react/dist/esm/icons/ear.mjs";
import { __iconNode as keyboardIcon } from "lucide-react/dist/esm/icons/keyboard.mjs";
import { __iconNode as bookAIcon } from "lucide-react/dist/esm/icons/book-a.mjs";
import { __iconNode as sparklesIcon } from "lucide-react/dist/esm/icons/sparkles.mjs";
import { __iconNode as squareDashedMousePointerIcon } from "lucide-react/dist/esm/icons/square-dashed-mouse-pointer.mjs";

// src/core/utils/html.ts
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

// src/core/icons.ts
function attrsToString(attrs) {
  return Object.entries(attrs).filter(([name]) => name !== "key").map(([name, value]) => `${name}="${escapeAttr(String(value))}"`).join(" ");
}
var lucideSvg = (node) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${node.map(([tag, attrs]) => `<${tag} ${attrsToString(attrs)}/>`).join("")}</svg>`;
var triggerSvg = () => '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="currentColor"></path></svg>';
var ICONS = {
  trigger: triggerSvg(),
  close: lucideSvg(xIcon),
  reset: lucideSvg(rotateCcwIcon),
  chevronDown: lucideSvg(chevronDownIcon),
  chevronUp: lucideSvg(chevronUpIcon),
  info: '<span class="accessibility-widget-info-glyph">i</span>',
  // Product and profile icons.
  wheelchair: triggerSvg(),
  seizure: lucideSvg(zapIcon),
  vision: lucideSvg(eyeIcon),
  lightSensitivity: lucideSvg(sunDimIcon),
  adhd: lucideSvg(focusIcon),
  cognitive: lucideSvg(brainIcon),
  colorBlind: lucideSvg(paletteIcon),
  dyslexia: lucideSvg(bookOpenTextIcon),
  keyboardMotor: lucideSvg(keyboardIcon),
  blindScreenReader: lucideSvg(earIcon),
  // Content adjustments.
  legibleFonts: lucideSvg(textInitialIcon),
  dyslexiaFriendlyFont: lucideSvg(wholeWordIcon),
  highlightTitles: lucideSvg(headingIcon),
  fontSizing: lucideSvg(aLargeSmallIcon),
  textMagnifier: lucideSvg(zoomInIcon),
  readingLens: lucideSvg(scanEyeIcon),
  bigCursor: lucideSvg(mousePointer2Icon),
  readingMask: lucideSvg(rows3Icon),
  readingGuide: lucideSvg(moveHorizontalIcon),
  readAloud: lucideSvg(volume2Icon),
  dictionary: lucideSvg(bookAIcon),
  simplify: lucideSvg(sparklesIcon),
  virtualKeyboard: lucideSvg(keyboardIcon),
  focusHighlight: lucideSvg(squareDashedMousePointerIcon),
  highlightLinks: lucideSvg(linkIcon),
  lineHeight: lucideSvg(betweenVerticalStartIcon),
  letterSpacing: lucideSvg(betweenHorizontalStartIcon),
  textAlignLeft: lucideSvg(textAlignStartIcon),
  textAlignCenter: lucideSvg(textAlignCenterIcon),
  textAlignRight: lucideSvg(textAlignEndIcon),
  textAlignJustify: lucideSvg(textAlignJustifyIcon),
  pageStructure: lucideSvg(layersIcon),
  structureLandmark: lucideSvg(landmarkIcon),
  structureLink: lucideSvg(linkIcon),
  structureExternal: lucideSvg(externalLinkIcon),
  // Visual adjustments.
  darkContrast: lucideSvg(moonIcon),
  lightContrast: lucideSvg(sunIcon),
  highContrast: lucideSvg(contrastIcon),
  monochrome: lucideSvg(circleIcon),
  invertColors: lucideSvg(circleOffIcon),
  colorBlindVisual: lucideSvg(venetianMaskIcon),
  hideImages: lucideSvg(imageOffIcon),
  offAnimations: lucideSvg(monitorPauseIcon)
};

// src/core/i18n/languages/en.ts
var en = {
  title: "React Accessibility Widget",
  subtitle: "Accessibility Settings",
  widgetSettings: "Settings",
  widgetSize: "Widget Size",
  widgetPosition: "Widget Position",
  smallSize: "Small",
  largeSize: "Large",
  leftPosition: "Left",
  rightPosition: "Right",
  profiles: "Accessibility Profiles",
  contentAdjustments: "Content",
  colorAdjustments: "Color",
  visibilityAdjustments: "Visibility",
  pageStructure: "Page Structure",
  structureHeadings: "Headings",
  structureLandmarks: "Landmarks",
  structureLinks: "Links",
  noStructureItems: "No items found.",
  untitledHeading: "Untitled heading",
  untitledLink: "Untitled link",
  resetAll: "Reset all settings",
  close: "Close accessibility menu",
  seizureSafe: "Seizure Safe",
  visionImpaired: "Vision Impaired",
  lightSensitivity: "Light Sensitivity",
  colorBlind: "Color Blind",
  dyslexia: "Dyslexia",
  adhdFriendly: "ADHD Friendly",
  cognitiveDisability: "Cognitive Disability",
  keyboardMotor: "Keyboard / Motor",
  blindScreenReader: "Screen Reader",
  legibleFonts: "Legible Fonts",
  dyslexiaFriendly: "Dyslexia Friendly",
  highlightTitles: "Highlight Titles",
  fontSize: "Font Size",
  textMagnifier: "Text Magnifier",
  readingLens: "Reading Lens",
  bigCursor: "Big Cursor",
  readingMask: "Reading Mask",
  readingGuide: "Reading Guide",
  readAloud: "Read Aloud",
  dictionary: "Dictionary",
  simplify: "Simplify",
  virtualKeyboard: "Virtual Keyboard",
  focusHighlight: "Focus Highlight",
  highlightLinks: "Highlight Links",
  lineHeight: "Line Height",
  letterSpacing: "Letter Spacing",
  textAlign: "Text Align",
  darkContrast: "Dark Contrast",
  lightContrast: "Light Contrast",
  highContrast: "High Contrast",
  monochrome: "Monochrome",
  invertColors: "Invert Colors",
  hideImages: "Hide Images",
  offAnimations: "Reduce Animations"
};

// src/core/i18n/index.ts
var translations = en;

// src/core/keyboard.ts
var FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
].join(", ");
var trapHandler = null;
var trappedEl = null;
function trapFocus(panel, trigger, onEscape) {
  releaseFocus();
  trappedEl = panel;
  trapHandler = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (onEscape) {
        onEscape();
      } else {
        trigger.click();
        trigger.focus();
      }
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = Array.from(panel.querySelectorAll(FOCUSABLE)).filter((el) => !el.closest("[hidden]") && el.offsetParent !== null);
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }
    const first2 = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first2) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first2.focus();
      }
    }
  };
  panel.addEventListener("keydown", trapHandler);
  const first = panel.querySelector(FOCUSABLE);
  first?.focus();
}
function releaseFocus() {
  if (trapHandler && trappedEl) trappedEl.removeEventListener("keydown", trapHandler);
  trapHandler = null;
  trappedEl = null;
}

// src/core/page-structure/collect.ts
var STRUCTURE_TARGET_ATTR = "data-accessibility-widget-structure-id";
var MAX_ITEMS = 80;
var structureTargetId = 0;
var LANDMARK_SELECTOR = [
  "header",
  "nav",
  "main",
  "footer",
  "aside",
  "section",
  "article",
  "form",
  '[role="banner"]',
  '[role="navigation"]',
  '[role="main"]',
  '[role="contentinfo"]',
  '[role="complementary"]',
  '[role="region"]',
  '[role="search"]',
  '[role="form"]',
  '[role="article"]'
].join(",");
function targetIdFor(el) {
  const existing = el.getAttribute(STRUCTURE_TARGET_ATTR);
  if (existing) return existing;
  const id = `accessibility-widget-structure-${++structureTargetId}`;
  el.setAttribute(STRUCTURE_TARGET_ATTR, id);
  return id;
}
function pageRoot() {
  return document.getElementById("accessibility-widget-host") ?? document.body;
}
function isIgnored(el) {
  return Boolean(el.closest('.accessibility-widget-root, script, style, template, [hidden], [aria-hidden="true"]'));
}
function isVisible(el) {
  if (!(el instanceof HTMLElement)) return false;
  if (isIgnored(el)) return false;
  const style = getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
}
function cleanText(value) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}
function labelledByText(el) {
  const ids = cleanText(el.getAttribute("aria-labelledby")).split(" ").filter(Boolean);
  return ids.map((id) => cleanText(document.getElementById(id)?.textContent)).filter(Boolean).join(" ");
}
function accessibleName(el) {
  return cleanText(el.getAttribute("aria-label")) || labelledByText(el) || cleanText(el.getAttribute("title"));
}
function elementText(el) {
  return accessibleName(el) || cleanText(el.textContent);
}
function linkLabel(el, fallback) {
  return elementText(el) || cleanText(el.href) || fallback;
}
function landmarkKind(el) {
  const role = cleanText(el.getAttribute("role")).toLowerCase();
  if (role === "banner") return "Header";
  if (role === "navigation") return "Navigation";
  if (role === "main") return "Main";
  if (role === "contentinfo") return "Footer";
  if (role === "complementary") return "Aside";
  if (role === "search") return "Search";
  if (role === "form") return "Form";
  if (role === "article") return "Article";
  if (role === "region") return "Section";
  const tag = el.tagName.toLowerCase();
  if (tag === "nav") return "Navigation";
  if (tag === "main") return "Main";
  if (tag === "footer") return "Footer";
  if (tag === "aside") return "Aside";
  return tag.charAt(0).toUpperCase() + tag.slice(1);
}
function firstHeadingText(el) {
  return cleanText(el.querySelector("h1,h2,h3,h4,h5,h6")?.textContent);
}
function landmarkLabel(el) {
  const kind = landmarkKind(el);
  const name = accessibleName(el) || firstHeadingText(el);
  return name ? `${kind}: ${name}` : kind;
}
function landmarkDepth(el, root) {
  let depth = 0;
  let parent = el.parentElement;
  while (parent && parent !== root) {
    if (parent.matches(LANDMARK_SELECTOR) && isVisible(parent)) depth++;
    parent = parent.parentElement;
  }
  return Math.min(depth, 5);
}
function isExternalLink(anchor) {
  if (anchor.target === "_blank") return true;
  try {
    return new URL(anchor.href, location.href).origin !== location.origin;
  } catch {
    return false;
  }
}
function collectPageStructure(t) {
  if (typeof document === "undefined") {
    return { headings: [], landmarks: [], links: [] };
  }
  const root = pageRoot();
  const headings = Array.from(root.querySelectorAll("h1,h2,h3,h4,h5,h6")).filter(isVisible).slice(0, MAX_ITEMS).map((heading) => {
    const level = Number(heading.tagName.slice(1));
    return {
      id: targetIdFor(heading),
      label: elementText(heading) || t.untitledHeading,
      meta: `H${level}`,
      depth: Math.max(0, level - 1)
    };
  });
  const landmarks = Array.from(root.querySelectorAll(LANDMARK_SELECTOR)).filter(isVisible).slice(0, MAX_ITEMS).map((landmark) => ({
    id: targetIdFor(landmark),
    label: landmarkLabel(landmark),
    meta: landmarkKind(landmark),
    depth: landmarkDepth(landmark, root)
  }));
  const links = Array.from(root.querySelectorAll("a[href]")).filter(isVisible).slice(0, MAX_ITEMS).map((anchor) => ({
    id: targetIdFor(anchor),
    label: linkLabel(anchor, t.untitledLink),
    meta: "Link",
    external: isExternalLink(anchor)
  }));
  return { headings, landmarks, links };
}

// src/core/page-structure/render.ts
function tabLabel(tab, t) {
  if (tab === "landmarks") return t.structureLandmarks;
  if (tab === "links") return t.structureLinks;
  return t.structureHeadings;
}
function renderTabs(activeTab, t) {
  const tabs = ["headings", "landmarks", "links"];
  return `
    <div class="accessibility-widget-structure-tabs" role="tablist" aria-label="${escapeHtml(t.pageStructure)}">
      ${tabs.map((tab) => `
        <button type="button" class="accessibility-widget-structure-tab" role="tab" data-structure-tab="${tab}" aria-selected="${activeTab === tab}">
          ${escapeHtml(tabLabel(tab, t))}
        </button>
      `).join("")}
    </div>
  `;
}
function renderBadge(tab, item) {
  if (tab === "headings") {
    return `<span class="accessibility-widget-structure-badge accessibility-widget-structure-badge--text">${escapeHtml(item.meta)}</span>`;
  }
  const icon = tab === "links" ? ICONS.structureLink : ICONS.structureLandmark;
  return `<span class="accessibility-widget-structure-badge">${icon}</span>`;
}
function renderItems(items, activeTab, t) {
  if (items.length === 0) {
    return `<div class="accessibility-widget-structure-empty">${escapeHtml(t.noStructureItems)}</div>`;
  }
  return items.map((item) => `
    <button type="button" class="accessibility-widget-structure-item" data-structure-target="${escapeHtml(item.id)}" style="--accessibility-widget-structure-depth:${item.depth ?? 0}">
      ${renderBadge(activeTab, item)}
      <span class="accessibility-widget-structure-item-label">${escapeHtml(item.label)}</span>
      ${item.external ? `<span class="accessibility-widget-structure-external">${ICONS.structureExternal}</span>` : ""}
    </button>
  `).join("");
}
function renderPageStructureDialog(data, activeTab, t) {
  const items = data[activeTab];
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
  `;
}

// src/core/os-preferences.ts
function matchesQuery(query) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}
function readOsPreferences() {
  return {
    reducedMotion: matchesQuery("(prefers-reduced-motion: reduce)"),
    moreContrast: matchesQuery("(prefers-contrast: more)"),
    dark: matchesQuery("(prefers-color-scheme: dark)")
  };
}
function osPreferenceDefaults(prefs) {
  const defaults = {};
  if (prefs.reducedMotion) defaults.offAnimations = 1;
  if (prefs.moreContrast) defaults.highContrast = 1;
  return defaults;
}

// src/core/tool-levels.ts
var TOOL_MAX_LEVELS = {
  legibleFonts: 2,
  highlightTitles: 2,
  fontSize: 4,
  textMagnifier: 1,
  highlightLinks: 2,
  readingLens: 1,
  bigCursor: 3,
  readingMask: 3,
  readingGuide: 1,
  readAloud: 1,
  dictionary: 1,
  simplify: 1,
  virtualKeyboard: 1,
  focusHighlight: 1,
  lineHeight: 3,
  letterSpacing: 3,
  darkContrast: 3,
  lightContrast: 3,
  highContrast: 3,
  monochrome: 1,
  invertColors: 1,
  colorBlind: 1,
  hideImages: 1,
  offAnimations: 1
};
var LEVEL_TOOLS = Object.keys(TOOL_MAX_LEVELS);
var TEXT_ALIGNMENT_MAX_LEVEL = 4;

// src/core/types.ts
var DEFAULT_STATE = {
  profile: null,
  fontSize: 0,
  lineHeight: 0,
  letterSpacing: 0,
  textAlignment: "default",
  legibleFonts: 0,
  highlightTitles: 0,
  highlightLinks: 0,
  textMagnifier: 0,
  readingLens: 0,
  bigCursor: 0,
  readingMask: 0,
  readingGuide: 0,
  readAloud: 0,
  dictionary: 0,
  simplify: 0,
  virtualKeyboard: 0,
  focusHighlight: 0,
  darkContrast: 0,
  lightContrast: 0,
  highContrast: 0,
  colorBlind: 0,
  monochrome: 0,
  invertColors: 0,
  hideImages: 0,
  offAnimations: 0
};
var STORAGE_KEY = "react-accessibility-widget-state";

// src/core/persistence.ts
var PROFILES = /* @__PURE__ */ new Set([
  "seizure-safe",
  "vision-impaired",
  "light-sensitivity",
  "color-blind",
  "dyslexia",
  "adhd-friendly",
  "cognitive-disability",
  "keyboard-motor",
  "blind-screen-reader"
]);
var ALIGNMENTS = /* @__PURE__ */ new Set([
  "left",
  "center",
  "right",
  "justify"
]);
function normalizeLevel(value, maxLevel) {
  if (value === true) return 1;
  if (value === false || value == null) return 0;
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value <= 0) return 0;
    return Math.min(maxLevel, Math.max(1, Math.round(value)));
  }
  return 0;
}
function normalizeState(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const state = { ...DEFAULT_STATE };
  if (typeof source.profile === "string" && PROFILES.has(source.profile)) {
    state.profile = source.profile;
  }
  for (const key of LEVEL_TOOLS) {
    state[key] = normalizeLevel(source[key], TOOL_MAX_LEVELS[key]);
  }
  if (typeof source.textAlignment === "string" && ALIGNMENTS.has(source.textAlignment)) {
    state.textAlignment = source.textAlignment;
  }
  return state;
}
function loadState(persistence) {
  if (!persistence) return { ...DEFAULT_STATE };
  if (typeof localStorage === "undefined") return { ...DEFAULT_STATE };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return normalizeState(JSON.parse(stored));
  } catch {
  }
  return { ...DEFAULT_STATE };
}
function hasPersistedState(persistence) {
  if (!persistence) return false;
  if (typeof localStorage === "undefined") return false;
  try {
    return localStorage.getItem(STORAGE_KEY) != null;
  } catch {
    return false;
  }
}
function saveState(persistence, state) {
  if (!persistence) return;
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
  }
}

// src/core/profiles.ts
function defineProfilePreset(preset) {
  for (const key of LEVEL_TOOLS) {
    const value = preset[key];
    if (typeof value !== "number") continue;
    const maxLevel = TOOL_MAX_LEVELS[key];
    if (value < 0 || value > maxLevel) {
      throw new Error(`Invalid profile preset: ${key} level ${value} exceeds max ${maxLevel}`);
    }
  }
  return preset;
}
var PROFILE_PRESETS = {
  // Photosensitive epilepsy — WCAG 2.3.1, 2.3.3. Signature: remove the triggers.
  // Stop animation, hide animated/flashing imagery, and desaturate to kill
  // saturated-colour flash energy. Nothing else — this profile is about removal.
  "seizure-safe": defineProfilePreset({
    offAnimations: 1,
    hideImages: 1,
    monochrome: 1
  }),
  // Low vision — WCAG 1.4.3, 1.4.4, 1.4.8. Signature: magnify. Maximum text
  // size with yellow-on-black high contrast and a large cursor so fine print
  // and the pointer stay findable; a little extra line-height for comfort.
  "vision-impaired": defineProfilePreset({
    fontSize: 4,
    lineHeight: 1,
    highContrast: 2,
    bigCursor: 2
  }),
  // Migraine / photophobia — WCAG 1.4.8, 2.3.3. Signature: lower the light.
  // A low-glare near-black scheme cuts luminance and motion is stopped; left
  // deliberately minimal so the page stays otherwise untouched.
  "light-sensitivity": defineProfilePreset({
    darkContrast: 2,
    offAnimations: 1
  }),
  // Colour vision deficiency — WCAG 1.4.1, 1.4.11. Signature: fix the colour.
  // The correction filter improves hue separation and links are conveyed by
  // underline/outline so meaning never rests on colour alone.
  "color-blind": defineProfilePreset({
    colorBlind: 1,
    highlightLinks: 2
  }),
  // Dyslexia — WCAG 1.4.8, 1.4.12. Signature: the reading font. OpenDyslexic
  // with loosened letter-spacing and line-height reduces crowding, and left
  // alignment removes the uneven gaps of justified text.
  "dyslexia": defineProfilePreset({
    legibleFonts: 1,
    lineHeight: 2,
    letterSpacing: 2,
    textAlignment: "left"
  }),
  // ADHD / attention regulation — WCAG 2.3.3. Signature: narrow the focus.
  // A reading mask spotlights one band at a time, motion is stopped to cut the
  // biggest distraction driver, and links get a light highlight as anchors.
  "adhd-friendly": defineProfilePreset({
    readingMask: 2,
    offAnimations: 1,
    highlightLinks: 1
  }),
  // Cognitive / learning difficulties — WCAG 1.4.8, 1.4.1. Signature: clarity
  // and structure. Atkinson Hyperlegible maximises character distinction, a
  // gentle size bump aids reading, and strong title/link highlighting makes
  // page structure unambiguous.
  "cognitive-disability": defineProfilePreset({
    legibleFonts: 2,
    fontSize: 1,
    lineHeight: 1,
    highlightTitles: 2,
    highlightLinks: 2
  }),
  // Keyboard / motor — WCAG 2.1.1, 2.4.7. Signature: make focus and targets
  // obvious. Strong focus outlines, a larger cursor, and highlighted links aid
  // keyboard-only and motor-impaired navigation. An aid, not a replacement for
  // a genuinely keyboard-operable site.
  "keyboard-motor": defineProfilePreset({
    focusHighlight: 1,
    bigCursor: 2,
    highlightLinks: 2
  }),
  // Blind / screen-reader — WCAG 1.1.1, 1.3.1. Signature: hear and parse the
  // page. Click-to-read text-to-speech plus clearer headings, links, and a
  // legible font; pairs with the page-structure navigator.
  "blind-screen-reader": defineProfilePreset({
    readAloud: 1,
    highlightTitles: 2,
    highlightLinks: 2,
    legibleFonts: 2
  })
};

// src/core/render/tiles.ts
function sizeSwitch(active, label, smallLabel, largeLabel) {
  const isLarge = active.toUpperCase() === "L";
  const nextSize = isLarge ? "S" : "L";
  return `
    <button type="button" class="accessibility-widget-size-switch" role="switch" data-size="${nextSize}" aria-checked="${isLarge}" aria-label="${label}">
      <span class="accessibility-widget-size-switch-track" aria-hidden="true">
        <span class="accessibility-widget-size-switch-thumb"></span>
        <span class="accessibility-widget-size-switch-option accessibility-widget-size-switch-option--s">${smallLabel}</span>
        <span class="accessibility-widget-size-switch-option accessibility-widget-size-switch-option--l">${largeLabel}</span>
      </span>
    </button>
  `;
}
function positionSwitch(active, label, leftLabel, rightLabel) {
  return `
    <div class="accessibility-widget-position-grid" role="group" aria-label="${label}">
      <button type="button" class="accessibility-widget-position-option" data-position="left" aria-pressed="${active === "left"}" aria-label="${leftLabel}">
        <span aria-hidden="true">&#8601;</span>
      </button>
      <button type="button" class="accessibility-widget-position-option" data-position="right" aria-pressed="${active === "right"}" aria-label="${rightLabel}">
        <span aria-hidden="true">&#8600;</span>
      </button>
    </div>
  `;
}
function infoTooltip(text) {
  const safeText = escapeHtml(text);
  return `
    <span class="accessibility-widget-info" aria-hidden="true">
      ${ICONS.info}
      <span class="accessibility-widget-tooltip">${safeText}</span>
    </span>
  `;
}
function profileCard(id, label, icon, active, tooltip) {
  return `
    <button class="accessibility-widget-card" type="button" data-profile="${id}" aria-pressed="${active}">
      ${infoTooltip(tooltip)}
      <span class="icon">${icon}</span>
      <span class="label">${label}</span>
    </button>
  `;
}
function levelBars(level, maxLevel) {
  if (maxLevel <= 1) return "";
  return `
    <div class="accessibility-widget-levels" aria-hidden="true">
      ${Array.from({ length: maxLevel }, (_, index) => `
        <span class="accessibility-widget-level${index + 1 === level ? " active" : ""}"></span>
      `).join("")}
    </div>
  `;
}
function toolTile(opts) {
  const { key, icon, label, level, maxLevel, tooltip } = opts;
  const ariaLevel = maxLevel <= 1 ? level > 0 ? "On" : "Off" : level > 0 ? `Level ${level} of ${maxLevel}` : "Off";
  return `
    <button class="accessibility-widget-tile" type="button" data-tool="${key}" data-level="${level}" data-max-level="${maxLevel}" aria-pressed="${level > 0}" aria-label="${label}, ${ariaLevel}">
      ${infoTooltip(tooltip)}
      <span class="icon">${icon}</span>
      <span class="label">${label}</span>
      ${levelBars(level, maxLevel)}
    </button>
  `;
}
function adjustmentTile(state, key, icon, label, tooltip) {
  return toolTile({ key, icon, label, tooltip, level: state[key], maxLevel: TOOL_MAX_LEVELS[key] });
}
function legibleFontsTile(state, t, tooltip) {
  const isDyslexiaFriendly = state.legibleFonts <= 1;
  return adjustmentTile(
    state,
    "legibleFonts",
    isDyslexiaFriendly ? ICONS.dyslexiaFriendlyFont : ICONS.legibleFonts,
    isDyslexiaFriendly ? t.dyslexiaFriendly : t.legibleFonts,
    tooltip
  );
}
function alignmentLevel(active) {
  if (active === "left") return 1;
  if (active === "center") return 2;
  if (active === "right") return 3;
  if (active === "justify") return 4;
  return 0;
}
function alignmentIcon(active) {
  if (active === "center") return ICONS.textAlignCenter;
  if (active === "right") return ICONS.textAlignRight;
  if (active === "justify") return ICONS.textAlignJustify;
  return ICONS.textAlignLeft;
}

// src/core/render/index.ts
var PROFILE_TOOLTIPS = {
  "seizure-safe": "Stops animation, hides images, and applies monochrome to reduce flashing and visual triggers.",
  "vision-impaired": "Increases text size, adds line height, applies high contrast, and enlarges the cursor.",
  "light-sensitivity": "Applies a low-glare dark contrast profile and reduces motion.",
  "color-blind": "Applies the color-blind filter and strengthens link highlighting so meaning is not color-only.",
  dyslexia: "Uses the dyslexia-friendly font with more spacing and left-aligned text.",
  "adhd-friendly": "Adds a reading mask, reduces motion, and lightly highlights links for focus.",
  "cognitive-disability": "Uses a hyperlegible font with clearer headings, links, spacing, and text size.",
  "keyboard-motor": "Strengthens focus outlines, enlarges the cursor, and highlights links for keyboard and motor navigation.",
  "blind-screen-reader": "Enables click-to-read text-to-speech with clearer headings, links, and a legible font."
};
var TOOL_TOOLTIPS = {
  legibleFonts: "Cycles between the dyslexia-friendly font and Atkinson Hyperlegible.",
  highlightTitles: "Adds visual emphasis to headings so page structure is easier to scan.",
  fontSize: "Increases page text size across four levels.",
  textMagnifier: "Shows a magnified text preview for easier reading.",
  highlightLinks: "Highlights and underlines links so interactive text is easier to identify.",
  lineHeight: "Increases line spacing across three levels.",
  letterSpacing: "Increases character spacing across three levels.",
  textAlignment: "Cycles text alignment through left, center, right, and justify.",
  darkContrast: "Applies a dark contrast color treatment.",
  lightContrast: "Applies a light contrast color treatment.",
  highContrast: "Applies stronger high-contrast color combinations.",
  monochrome: "Removes color by applying a monochrome treatment.",
  invertColors: "Inverts page colors for users who prefer reversed contrast.",
  colorBlind: "Applies the color-blind visual filter.",
  readingLens: "Shows a horizontal reading lens that follows the pointer.",
  bigCursor: "Enlarges the cursor across three levels.",
  readingMask: "Dims surrounding content and keeps one reading band in focus.",
  readingGuide: "Adds a guide line that follows the pointer.",
  readAloud: "Reads page text aloud when you click it (text-to-speech).",
  dictionary: "Shows the definition of a word when you double-click it.",
  simplify: "Rewrites the selected text in simpler language.",
  virtualKeyboard: "Shows an on-screen keyboard for typing without a physical keyboard.",
  focusHighlight: "Adds a strong outline around the focused element for keyboard navigation.",
  pageStructure: "Opens a headings, landmarks, and links navigator for the current page.",
  hideImages: "Hides images and videos from the page.",
  offAnimations: "Reduces animation and motion effects."
};
function normalizeCollapsedSections(collapsed) {
  return {
    settings: collapsed?.settings ?? true,
    profiles: collapsed?.profiles ?? false,
    content: collapsed?.content ?? false,
    color: collapsed?.color ?? false,
    visibility: collapsed?.visibility ?? false
  };
}
function sectionCard(id, label, collapsed, body) {
  const bodyId = `accessibility-widget-section-${id}`;
  return `
    <section class="accessibility-widget-section" data-section="${id}">
      <button type="button" class="accessibility-widget-section-head" data-section-toggle="${id}" aria-expanded="${!collapsed}" aria-controls="${bodyId}">
        <span class="accessibility-widget-section-title">${label}</span>
        <span class="accessibility-widget-section-chevron" aria-hidden="true">${collapsed ? ICONS.chevronDown : ICONS.chevronUp}</span>
      </button>
      <div id="${bodyId}" class="accessibility-widget-section-body"${collapsed ? " hidden" : ""}>
        ${body}
      </div>
    </section>
  `;
}
function join(parts) {
  return parts.filter(Boolean).join("");
}
function renderPanel(state, size, options = {}) {
  const t = translations;
  const title = escapeHtml(options.title?.trim() || t.title);
  const position = options.position ?? "right";
  const collapsedSections = normalizeCollapsedSections(options.collapsedSections);
  const PROFILES2 = [
    { id: "seizure-safe", label: t.seizureSafe, icon: ICONS.seizure },
    { id: "vision-impaired", label: t.visionImpaired, icon: ICONS.vision },
    { id: "light-sensitivity", label: t.lightSensitivity, icon: ICONS.lightSensitivity },
    { id: "color-blind", label: t.colorBlind, icon: ICONS.colorBlind },
    { id: "dyslexia", label: t.dyslexia, icon: ICONS.dyslexia },
    { id: "adhd-friendly", label: t.adhdFriendly, icon: ICONS.adhd },
    { id: "cognitive-disability", label: t.cognitiveDisability, icon: ICONS.cognitive },
    { id: "keyboard-motor", label: t.keyboardMotor, icon: ICONS.keyboardMotor },
    { id: "blind-screen-reader", label: t.blindScreenReader, icon: ICONS.blindScreenReader }
  ];
  const hiddenProfiles = new Set(options.hiddenProfiles ?? []);
  const hiddenTools = new Set(options.hiddenTools ?? []);
  const visibleProfiles = PROFILES2.filter((p) => !hiddenProfiles.has(p.id));
  const show = (key) => !hiddenTools.has(key);
  const simplifyEnabled = options.simplifyEnabled ?? false;
  const contentTiles = join([
    show("legibleFonts") && legibleFontsTile(state, t, TOOL_TOOLTIPS.legibleFonts),
    show("highlightTitles") && adjustmentTile(state, "highlightTitles", ICONS.highlightTitles, t.highlightTitles, TOOL_TOOLTIPS.highlightTitles),
    show("fontSize") && adjustmentTile(state, "fontSize", ICONS.fontSizing, t.fontSize, TOOL_TOOLTIPS.fontSize),
    show("textMagnifier") && adjustmentTile(state, "textMagnifier", ICONS.textMagnifier, t.textMagnifier, TOOL_TOOLTIPS.textMagnifier),
    show("highlightLinks") && adjustmentTile(state, "highlightLinks", ICONS.highlightLinks, t.highlightLinks, TOOL_TOOLTIPS.highlightLinks),
    show("lineHeight") && adjustmentTile(state, "lineHeight", ICONS.lineHeight, t.lineHeight, TOOL_TOOLTIPS.lineHeight),
    show("letterSpacing") && adjustmentTile(state, "letterSpacing", ICONS.letterSpacing, t.letterSpacing, TOOL_TOOLTIPS.letterSpacing),
    show("textAlignment") && toolTile({ key: "textAlignment", icon: alignmentIcon(state.textAlignment), label: t.textAlign, level: alignmentLevel(state.textAlignment), maxLevel: TEXT_ALIGNMENT_MAX_LEVEL, tooltip: TOOL_TOOLTIPS.textAlignment }),
    show("dictionary") && adjustmentTile(state, "dictionary", ICONS.dictionary, t.dictionary, TOOL_TOOLTIPS.dictionary),
    simplifyEnabled && show("simplify") && adjustmentTile(state, "simplify", ICONS.simplify, t.simplify, TOOL_TOOLTIPS.simplify)
  ]);
  const colorTiles = join([
    show("darkContrast") && adjustmentTile(state, "darkContrast", ICONS.darkContrast, t.darkContrast, TOOL_TOOLTIPS.darkContrast),
    show("lightContrast") && adjustmentTile(state, "lightContrast", ICONS.lightContrast, t.lightContrast, TOOL_TOOLTIPS.lightContrast),
    show("highContrast") && adjustmentTile(state, "highContrast", ICONS.highContrast, t.highContrast, TOOL_TOOLTIPS.highContrast),
    show("monochrome") && adjustmentTile(state, "monochrome", ICONS.monochrome, t.monochrome, TOOL_TOOLTIPS.monochrome),
    show("invertColors") && adjustmentTile(state, "invertColors", ICONS.invertColors, t.invertColors, TOOL_TOOLTIPS.invertColors),
    show("colorBlind") && adjustmentTile(state, "colorBlind", ICONS.colorBlindVisual, t.colorBlind, TOOL_TOOLTIPS.colorBlind)
  ]);
  const visibilityTiles = join([
    show("readingLens") && adjustmentTile(state, "readingLens", ICONS.readingLens, t.readingLens, TOOL_TOOLTIPS.readingLens),
    show("bigCursor") && adjustmentTile(state, "bigCursor", ICONS.bigCursor, t.bigCursor, TOOL_TOOLTIPS.bigCursor),
    show("readingMask") && adjustmentTile(state, "readingMask", ICONS.readingMask, t.readingMask, TOOL_TOOLTIPS.readingMask),
    show("readingGuide") && adjustmentTile(state, "readingGuide", ICONS.readingGuide, t.readingGuide, TOOL_TOOLTIPS.readingGuide),
    show("readAloud") && adjustmentTile(state, "readAloud", ICONS.readAloud, t.readAloud, TOOL_TOOLTIPS.readAloud),
    show("focusHighlight") && adjustmentTile(state, "focusHighlight", ICONS.focusHighlight, t.focusHighlight, TOOL_TOOLTIPS.focusHighlight),
    show("virtualKeyboard") && adjustmentTile(state, "virtualKeyboard", ICONS.virtualKeyboard, t.virtualKeyboard, TOOL_TOOLTIPS.virtualKeyboard),
    show("pageStructure") && toolTile({ key: "pageStructure", icon: ICONS.pageStructure, label: t.pageStructure, level: options.pageStructureOpen ? 1 : 0, maxLevel: 1, tooltip: TOOL_TOOLTIPS.pageStructure }),
    show("hideImages") && adjustmentTile(state, "hideImages", ICONS.hideImages, t.hideImages, TOOL_TOOLTIPS.hideImages),
    show("offAnimations") && adjustmentTile(state, "offAnimations", ICONS.offAnimations, t.offAnimations, TOOL_TOOLTIPS.offAnimations)
  ]);
  const sections = join([
    sectionCard("settings", t.widgetSettings, collapsedSections.settings, `
          <div class="accessibility-widget-setting-row">
            <span class="accessibility-widget-setting-label">${t.widgetSize}</span>
            ${sizeSwitch(size, t.widgetSize, t.smallSize, t.largeSize)}
          </div>
          <div class="accessibility-widget-setting-row accessibility-widget-setting-row--stack">
            <span class="accessibility-widget-setting-label">${t.widgetPosition}</span>
            ${positionSwitch(position, t.widgetPosition, t.leftPosition, t.rightPosition)}
          </div>
        `),
    visibleProfiles.length > 0 && sectionCard("profiles", t.profiles, collapsedSections.profiles, `
          <div class="accessibility-widget-grid">
            ${visibleProfiles.map((p) => profileCard(p.id, p.label, p.icon, state.profile === p.id, PROFILE_TOOLTIPS[p.id])).join("")}
          </div>
        `),
    visibilityTiles && sectionCard("visibility", t.visibilityAdjustments, collapsedSections.visibility, `
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${visibilityTiles}
          </div>
        `),
    colorTiles && sectionCard("color", t.colorAdjustments, collapsedSections.color, `
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${colorTiles}
          </div>
        `),
    contentTiles && sectionCard("content", t.contentAdjustments, collapsedSections.content, `
          <div class="accessibility-widget-grid accessibility-widget-grid-tools">
            ${contentTiles}
          </div>
        `)
  ]);
  return `
    <div class="accessibility-widget-header">
      <div class="accessibility-widget-header-left">
        <div class="accessibility-widget-header-icon">${ICONS.wheelchair}</div>
        <div class="accessibility-widget-header-text">
          <div class="accessibility-widget-header-title">
            <span>${title}</span>
          </div>
          ${options.shortcutLabel === null ? "" : `<kbd class="accessibility-widget-header-shortcut">${escapeHtml(options.shortcutLabel ?? "CTRL + U")}</kbd>`}
          <div class="accessibility-widget-header-sub accessibility-widget-sr-only">${t.subtitle}</div>
        </div>
      </div>
      <div class="accessibility-widget-header-actions">
        <button type="button" class="accessibility-widget-icon-btn accessibility-widget-close" aria-label="${t.close}">${ICONS.close}</button>
      </div>
    </div>

    <div class="accessibility-widget-body">
      <div class="accessibility-widget-body-container">
        ${sections}
      </div>
    </div>

    <div class="accessibility-widget-reset-bar">
      <button type="button" class="accessibility-widget-reset-btn" data-action="reset" aria-label="${t.resetAll}">
        ${ICONS.reset}
        ${t.resetAll}
      </button>
    </div>
  `;
}

// src/core/styles/controls.ts
var controls = `
/* \u2500\u2500 Size switch \u2500\u2500 */
.accessibility-widget-size-switch {
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  display: inline-flex;
  align-items: center;
  min-height: 0;
  padding: 0;
}
.accessibility-widget-size-switch:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-size-switch-track {
  position: relative;
  width: 150px;
  height: 44px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 5%, #ffffff);
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-text) 8%, #ffffff);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 4px;
}
.accessibility-widget-size-switch-option {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: 14px;
  font-weight: 750;
  line-height: 1;
  letter-spacing: 0;
  color: #111827;
  transition: color 0.25s ease;
}
.accessibility-widget-size-switch-thumb {
  position: absolute;
  z-index: 1;
  left: 4px;
  top: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  border-radius: 999px;
  background: #ffffff;
  border: 2px solid color-mix(in srgb, var(--accessibility-widget-text) 52%, #ffffff);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-thumb {
  transform: translateX(100%);
}
.accessibility-widget-size-switch[aria-checked="false"] .accessibility-widget-size-switch-option--s,
.accessibility-widget-size-switch[aria-checked="true"] .accessibility-widget-size-switch-option--l {
  color: #111827;
}

/* \u2500\u2500 Position grid \u2500\u2500 */
.accessibility-widget-position-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  width: 100%;
}
.accessibility-widget-position-option {
  aspect-ratio: 16 / 7;
  border-radius: 8px;
  border: 1px solid var(--accessibility-widget-border);
  background: color-mix(in srgb, var(--accessibility-widget-text) 4%, #ffffff);
  color: color-mix(in srgb, var(--accessibility-widget-text) 64%, transparent);
  cursor: pointer;
  display: grid;
  font: inherit;
  font-size: 17px;
  line-height: 1;
  padding: 6px;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
.accessibility-widget-position-option[data-position="left"] span { place-self: end start; }
.accessibility-widget-position-option[data-position="right"] span { place-self: end end; }
.accessibility-widget-position-option:hover {
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-position-option:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-position-option[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: color-mix(in srgb, var(--accessibility-widget-primary) 12%, #ffffff);
  color: var(--accessibility-widget-primary);
}

/* \u2500\u2500 Profile cards \u2500\u2500 */
.accessibility-widget-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.accessibility-widget-grid-tools { grid-template-columns: repeat(2, 1fr); }
[data-size="L"] .accessibility-widget-grid-tools {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.accessibility-widget-grid-3 { grid-template-columns: repeat(3, 1fr); }
[data-size="S"] .accessibility-widget-grid-3 { grid-template-columns: repeat(2, 1fr); }
.accessibility-widget-grid > *, .accessibility-widget-grid-3 > *, .accessibility-widget-grid-tools > * { min-width: 0; }

.accessibility-widget-card {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  padding: 14px 12px 13px;
  background: #ffffff;
  cursor: pointer;
  text-align: center;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 104px;
  width: 100%;
}
.accessibility-widget-card:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 3%, #ffffff);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
}
.accessibility-widget-card[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-card[aria-pressed="true"]:hover { background: var(--accessibility-widget-primary); }
.accessibility-widget-card[aria-pressed="true"] .icon {
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-card .icon {
  width: 28px;
  height: 28px;
  color: var(--accessibility-widget-text);
  border: 0;
  border-radius: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease;
}
.accessibility-widget-card:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); }
.accessibility-widget-card .icon svg { width: 19px; height: 19px; }
.accessibility-widget-card .label {
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;
  width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: center;
  color: inherit;
}
.accessibility-widget-info {
  position: absolute;
  top: 13px;
  right: 13px;
  width: 18px;
  height: 18px;
  background: transparent;
  border-radius: 999px;
  color: color-mix(in srgb, var(--accessibility-widget-text) 48%, transparent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  opacity: 0;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}
.accessibility-widget-info-glyph {
  font-size: 11px;
  font-weight: 800;
  font-style: normal;
  line-height: 1;
}
.accessibility-widget-tooltip {
  position: absolute;
  z-index: 8;
  top: calc(100% + 8px);
  right: 0;
  width: 198px;
  max-width: calc(100vw - 48px);
  padding: 8px 10px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--accessibility-widget-panel-bg) 82%, #111827);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
  font-size: 11px;
  font-weight: 650;
  line-height: 1.35;
  text-align: left;
  white-space: normal;
  display: none;
  pointer-events: auto;
  transition: none;
}
.accessibility-widget-tooltip::before {
  content: "";
  position: absolute;
  top: -5px;
  right: 7px;
  width: 10px;
  height: 10px;
  background: inherit;
  transform: rotate(45deg);
}
.accessibility-widget-grid > :nth-child(odd) .accessibility-widget-tooltip {
  left: 0;
  right: auto;
}
.accessibility-widget-grid > :nth-child(odd) .accessibility-widget-tooltip::before {
  left: 7px;
  right: auto;
}
[data-size="L"] .accessibility-widget-grid-tools > * .accessibility-widget-tooltip {
  left: auto;
  right: 0;
}
[data-size="L"] .accessibility-widget-grid-tools > * .accessibility-widget-tooltip::before {
  left: auto;
  right: 7px;
}
[data-size="L"] .accessibility-widget-grid-tools > :nth-child(3n + 1) .accessibility-widget-tooltip {
  left: 0;
  right: auto;
}
[data-size="L"] .accessibility-widget-grid-tools > :nth-child(3n + 1) .accessibility-widget-tooltip::before {
  left: 7px;
  right: auto;
}
.accessibility-widget-card:hover .accessibility-widget-info,
.accessibility-widget-card:focus-visible .accessibility-widget-info,
.accessibility-widget-tile:hover .accessibility-widget-info,
.accessibility-widget-tile:focus-visible .accessibility-widget-info {
  opacity: 1;
  background: var(--accessibility-widget-info-bg);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-card[aria-pressed="true"] .accessibility-widget-info,
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-info {
  opacity: 1;
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #ffffff) 18%, transparent);
  color: var(--accessibility-widget-on-primary, #ffffff);
}
.accessibility-widget-info:hover .accessibility-widget-tooltip {
  display: block;
}

/* \u2500\u2500 Tiles (content & color adjustments) \u2500\u2500 */
.accessibility-widget-tile {
  position: relative;
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  padding: 14px 12px 13px;
  background: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  min-height: 114px;
  width: 100%;
}
.accessibility-widget-tile:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 3%, #ffffff);
  border-color: color-mix(in srgb, var(--accessibility-widget-primary) 45%, var(--accessibility-widget-border));
}
.accessibility-widget-tile[aria-pressed="true"] {
  border-color: var(--accessibility-widget-primary);
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
}
.accessibility-widget-tile[aria-pressed="true"]:hover { background: var(--accessibility-widget-primary); }
.accessibility-widget-tile[aria-pressed="true"] .icon {
  color: var(--accessibility-widget-on-primary, #fff);
  border-color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 48%, transparent);
}
.accessibility-widget-tile .icon {
  width: 40px;
  height: 40px;
  color: var(--accessibility-widget-text);
  border: 1px solid var(--accessibility-widget-border);
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.accessibility-widget-tile:not([aria-pressed="true"]):hover .icon { color: var(--accessibility-widget-primary); }
.accessibility-widget-tile .icon svg { width: 22px; height: 22px; }
.accessibility-widget-tile .label {
  font-size: 13px;
  font-weight: 750;
  line-height: 1.25;
  overflow-wrap: anywhere;
  width: 100%;
  text-align: center;
  color: inherit;
}

/* \u2500\u2500 Level indicator bars (centered under each tile) \u2500\u2500 */
.accessibility-widget-levels {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin-top: 0;
  min-height: 7px;
}
.accessibility-widget-levels span {
  flex: 0 0 16px;
  width: 16px;
  height: 4px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--accessibility-widget-text) 16%, transparent);
  transition: background 0.2s ease, height 0.2s ease;
}
.accessibility-widget-levels span.active {
  height: 7px;
  background: var(--accessibility-widget-primary);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 30%, transparent);
}
.accessibility-widget-tile[aria-pressed="true"] .accessibility-widget-levels span.active {
  background: var(--accessibility-widget-on-primary, #fff);
}

/* \u2500\u2500 Reset bar \u2500\u2500 */
.accessibility-widget-reset-bar {
  padding: 0 12px 10px;
  border-top: 0;
  flex-shrink: 0;
  background: var(--accessibility-widget-panel-bg);
}
.accessibility-widget-reset-btn {
  width: 100%;
  height: 44px;
  border-radius: 999px;
  border: 0;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #ffffff);
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.accessibility-widget-reset-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 90%, #ffffff);
}
.accessibility-widget-reset-btn svg { width: 14px; height: 14px; color: currentColor; }
`;

// src/core/styles/fonts.ts
var fonts = `
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
`;

// src/core/styles/host-effects.ts
var hostEffects = `
/* \u2500\u2500 Applied host effects \u2500\u2500 */
#accessibility-widget-host.accessibility-widget-effect-legible-fonts, #accessibility-widget-host.accessibility-widget-effect-legible-fonts * {
  font-family: var(--accessibility-widget-legible-font-family), Tahoma, Verdana, Arial, sans-serif !important;
  letter-spacing: var(--accessibility-widget-legible-letter-spacing, 0em) !important;
  word-spacing: var(--accessibility-widget-legible-word-spacing, 0em) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dyslexia, #accessibility-widget-host.accessibility-widget-effect-dyslexia * {
  font-family: "Accessibility Widget OpenDyslexic", Tahoma, Verdana, Arial, sans-serif !important;
  letter-spacing: 0.04em !important;
  word-spacing: 0.03em !important;
}
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h1,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h2,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h3,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h4,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h5,
#accessibility-widget-host.accessibility-widget-effect-highlight-titles h6 {
  outline: var(--accessibility-widget-title-outline-width, 2px) solid #f59e0b !important;
  outline-offset: 2px !important;
  background: rgba(245,158,11,var(--accessibility-widget-title-highlight-alpha, 0.07)) !important;
}
#accessibility-widget-host.accessibility-widget-effect-highlight-links a {
  outline: var(--accessibility-widget-link-outline-width, 2px) solid #3b82f6 !important;
  outline-offset: 2px !important;
  background: rgba(59,130,246,var(--accessibility-widget-link-highlight-alpha, 0.07)) !important;
  text-decoration: underline !important;
  text-decoration-thickness: var(--accessibility-widget-link-underline-width, 1px) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dark-contrast {
  background: var(--accessibility-widget-dark-contrast-bg, #000) !important;
  color: var(--accessibility-widget-dark-contrast-text, #fff) !important;
}
#accessibility-widget-host.accessibility-widget-effect-dark-contrast * {
  background-color: transparent !important;
  color: var(--accessibility-widget-dark-contrast-text, #fff) !important;
  border-color: var(--accessibility-widget-dark-contrast-border, #333) !important;
}
#accessibility-widget-host.accessibility-widget-effect-light-contrast {
  background: var(--accessibility-widget-light-contrast-bg, #fff) !important;
  color: var(--accessibility-widget-light-contrast-text, #000) !important;
}
#accessibility-widget-host.accessibility-widget-effect-light-contrast * {
  background-color: transparent !important;
  color: var(--accessibility-widget-light-contrast-text, #000) !important;
  border-color: var(--accessibility-widget-light-contrast-border, #475569) !important;
}
#accessibility-widget-host.accessibility-widget-effect-high-contrast {
  background: var(--accessibility-widget-high-contrast-bg, #000) !important;
  color: var(--accessibility-widget-high-contrast-text, #ff0) !important;
}
#accessibility-widget-host.accessibility-widget-effect-high-contrast * {
  background-color: var(--accessibility-widget-high-contrast-bg, #000) !important;
  color: var(--accessibility-widget-high-contrast-text, #ff0) !important;
  border-color: var(--accessibility-widget-high-contrast-border, #ff0) !important;
}
#accessibility-widget-host.accessibility-widget-effect-monochrome { filter: grayscale(var(--accessibility-widget-monochrome-amount, 100%)) !important; }
#accessibility-widget-host.accessibility-widget-effect-invert { filter: invert(var(--accessibility-widget-invert-amount, 100%)) hue-rotate(180deg) !important; }
#accessibility-widget-host.accessibility-widget-effect-color-blind {
  filter:
    url('#accessibility-widget-protanopia')
    saturate(var(--accessibility-widget-color-blind-saturate, 0.85))
    contrast(var(--accessibility-widget-color-blind-contrast, 1)) !important;
}
#accessibility-widget-host.accessibility-widget-effect-hide-images img,
#accessibility-widget-host.accessibility-widget-effect-hide-images picture {
  visibility: hidden !important;
}
#accessibility-widget-host.accessibility-widget-effect-off-animations,
#accessibility-widget-host.accessibility-widget-effect-off-animations *,
#accessibility-widget-host.accessibility-widget-effect-off-animations *::before,
#accessibility-widget-host.accessibility-widget-effect-off-animations *::after {
  animation-delay: 0s !important;
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  scroll-behavior: auto !important;
  transition-delay: 0s !important;
  transition-duration: 0.001ms !important;
}
#accessibility-widget-host.accessibility-widget-effect-focus-highlight :focus,
#accessibility-widget-host.accessibility-widget-effect-focus-highlight :focus-visible {
  outline: 3px solid #1d4ed8 !important;
  outline-offset: 2px !important;
}
`;

// src/core/styles/layout.ts
var layout = `
.accessibility-widget-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* \u2500\u2500 Trigger \u2500\u2500 */
.accessibility-widget-trigger {
  position: fixed;
  z-index: 2147483646;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: filter 0.2s ease;
}
.accessibility-widget-trigger:hover { filter: brightness(0.93); }
.accessibility-widget-trigger:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accessibility-widget-primary) 55%, transparent);
  outline-offset: 3px;
}
.accessibility-widget-trigger svg { width: 26px; height: 26px; }
.accessibility-widget-trigger[data-position="right"] { right: var(--accessibility-widget-trigger-offset-x, 20px); bottom: var(--accessibility-widget-trigger-offset-y, 20px); }
.accessibility-widget-trigger[data-position="left"]  { left: var(--accessibility-widget-trigger-offset-x, 20px);  bottom: var(--accessibility-widget-trigger-offset-y, 20px); }

/* \u2500\u2500 Overlay \u2500\u2500 */
.accessibility-widget-overlay {
  position: fixed;
  inset: 0;
  background: rgba(9,9,11,0.42);
  z-index: 2147483646;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.accessibility-widget-overlay.open { opacity: 1; pointer-events: auto; }

/* \u2500\u2500 Panel \u2500\u2500 */
.accessibility-widget-panel {
  position: fixed;
  z-index: 2147483647;
  background: var(--accessibility-widget-panel-bg);
  width: 380px;
  max-width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  max-height: 720px;
  border-radius: 22px;
  border: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease;
}
.accessibility-widget-panel.open {
  opacity: 1;
  pointer-events: auto;
}
.accessibility-widget-panel[data-size="S"] { width: 380px; max-height: 720px; }
.accessibility-widget-panel[data-size="L"] { width: 460px; max-height: 920px; }
.accessibility-widget-panel[data-position="right"] { right: 8px; bottom: 8px; }
.accessibility-widget-panel[data-position="left"]  { left: 8px;  bottom: 8px; }
@media (max-width: 480px) {
  .accessibility-widget-panel,
  .accessibility-widget-panel[data-size="S"],
  .accessibility-widget-panel[data-size="L"] {
    width: calc(100vw - 16px);
    height: calc(100vh - 16px);
    max-height: none;
  }
}

/* \u2500\u2500 Header \u2500\u2500 */
.accessibility-widget-header {
  background: var(--accessibility-widget-panel-bg);
  color: var(--accessibility-widget-on-primary, #fff);
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 10px;
}
.accessibility-widget-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.accessibility-widget-header-icon {
  width: 34px;
  height: 34px;
  background: var(--accessibility-widget-primary);
  border: 0;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessibility-widget-header-icon svg { width: 20px; height: 20px; }
.accessibility-widget-header h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
}
.accessibility-widget-header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  min-width: 0;
  max-width: 100%;
}
.accessibility-widget-header-title {
  display: block;
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0;
  color: var(--accessibility-widget-on-primary, #fff);
  line-height: 1.15;
}
.accessibility-widget-header-title span {
  min-width: 0;
  overflow-wrap: anywhere;
}
.accessibility-widget-header-shortcut {
  border: 0;
  padding: 0;
  background: transparent;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 76%, transparent);
  font: inherit;
  font-size: 10px;
  font-weight: 700;
  line-height: 1.1;
  white-space: nowrap;
}
.accessibility-widget-header-sub {
  font-size: 11px;
  color: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 72%, transparent);
  letter-spacing: 0;
  text-transform: uppercase;
  line-height: 1.2;
}
.accessibility-widget-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 7px;
}
.accessibility-widget-icon-btn {
  width: 20px;
  height: 20px;
  padding: 0;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-primary) 10%, #ffffff);
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: background 0.2s ease, color 0.2s ease, transform 0.16s ease;
}
.accessibility-widget-icon-btn:hover {
  background: color-mix(in srgb, var(--accessibility-widget-primary) 7%, #ffffff);
  color: #111827;
  transform: scale(1.04);
}
.accessibility-widget-icon-btn:active {
  transform: scale(0.98);
}
.accessibility-widget-icon-btn svg { width: 12px; height: 12px; }

/* \u2500\u2500 Body \u2500\u2500 */
.accessibility-widget-body {
  flex: 1;
  overflow: hidden;
  margin: 0 12px 10px;
  background: var(--accessibility-widget-panel-bg);
  min-width: 0;
  border-radius: 8px;
}

.accessibility-widget-body-container{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.accessibility-widget-body::-webkit-scrollbar { width: 7px; }
.accessibility-widget-body::-webkit-scrollbar-track { background: transparent; }
.accessibility-widget-body::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 36%, transparent);
  border-radius: 999px;
  border: 2px solid var(--accessibility-widget-panel-bg);
}
.accessibility-widget-body::-webkit-scrollbar-thumb:hover {
  background: color-mix(in srgb, var(--accessibility-widget-on-primary, #fff) 56%, transparent);
}

/* \u2500\u2500 Section \u2500\u2500 */
.accessibility-widget-section {
  padding: 16px;
  background: var(--accessibility-widget-card-bg);
  border: 1px solid color-mix(in srgb, var(--accessibility-widget-border) 88%, #ffffff);
  border-radius: 8px;
  margin: 0 0 16px;
  color: var(--accessibility-widget-text);
}
.accessibility-widget-section:last-child { margin-bottom: 0; }
.accessibility-widget-section-head {
  width: 100%;
  min-height: 44px;
  border: 0;
  border-radius: 8px;
  background: var(--accessibility-widget-section-head-bg);
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
}
.accessibility-widget-section-head:focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 3px;
}
.accessibility-widget-section-title {
  font-size: 13px;
  font-weight: 750;
  letter-spacing: 0;
  text-transform: none;
  color: var(--accessibility-widget-text);
  min-width: 0;
  overflow-wrap: anywhere;
}
.accessibility-widget-section-chevron {
  width: 18px;
  height: 18px;
  color: #111827;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessibility-widget-section-chevron svg { width: 18px; height: 18px; }
.accessibility-widget-section-body {
  padding-top: 16px;
}
.accessibility-widget-section-body[hidden] {
  display: none;
}
.accessibility-widget-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 42px;
}
.accessibility-widget-setting-row + .accessibility-widget-setting-row {
  margin-top: 12px;
}
.accessibility-widget-setting-row--stack {
  align-items: stretch;
  flex-direction: column;
  gap: 8px;
}
.accessibility-widget-setting-label {
  color: var(--accessibility-widget-text);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
}
`;

// src/core/styles/reading-tools.ts
var readingTools = `
.accessibility-widget-magnify-cursor {
  position: fixed;
  box-sizing: border-box;
  pointer-events: none;
  z-index: 2147483645;
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 18px;
  max-width: 280px;
  color: #0c0c0c;
  line-height: 1.4;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

/* \u2500\u2500 Reading lens (circular zoom that follows the cursor) \u2500\u2500 */
.accessibility-widget-reading-lens {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2147483645;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  border: 3px solid #0c0c0c;
  will-change: transform;
  contain: layout paint;
}
.accessibility-widget-reading-lens-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform-origin: 0 0;
  will-change: transform;
}
.accessibility-widget-reading-lens-inner > * {
  margin: 0 !important;
}
.accessibility-widget-reading-lens-inner,
.accessibility-widget-reading-lens-inner *,
.accessibility-widget-reading-lens-inner *::before,
.accessibility-widget-reading-lens-inner *::after {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}

/* \u2500\u2500 Reading mask (clear horizontal band with shaded surroundings) \u2500\u2500 */
.accessibility-widget-reading-mask {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2147483644;
}
.accessibility-widget-reading-mask-panel {
  position: fixed;
  left: 0;
  right: 0;
  background: rgba(0,0,0,var(--accessibility-widget-reading-mask-opacity, 0.45));
}
.accessibility-widget-reading-mask-top {
  top: 0;
  border-bottom: 3px solid var(--accessibility-widget-reading-mask-edge, #10b981);
}
.accessibility-widget-reading-mask-bottom {
  bottom: 0;
  border-top: 3px solid var(--accessibility-widget-reading-mask-edge, #10b981);
}

/* \u2500\u2500 Reading guide (high-contrast rule that follows the cursor) \u2500\u2500 */
.accessibility-widget-reading-guide {
  position: fixed;
  left: 0;
  width: 100vw;
  height: var(--accessibility-widget-reading-guide-height, 8px);
  border: var(--accessibility-widget-reading-guide-border, 3px) solid var(--accessibility-widget-reading-guide-edge, #facc15);
  border-radius: 999px;
  background: var(--accessibility-widget-reading-guide-fill, #0c0c0c);
  pointer-events: none;
  z-index: 2147483645;
}
.accessibility-widget-reading-guide-pointer {
  position: absolute;
  left: var(--accessibility-widget-reading-guide-x, 50vw);
  top: -24px;
  width: 0;
  height: 0;
  transform: translateX(-50%);
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 18px solid var(--accessibility-widget-reading-guide-edge, #facc15);
}
.accessibility-widget-reading-guide-pointer::after {
  content: '';
  position: absolute;
  left: -12px;
  top: 7px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid var(--accessibility-widget-reading-guide-fill, #0c0c0c);
}

.accessibility-widget-root :focus-visible {
  outline: 2px solid var(--accessibility-widget-primary);
  outline-offset: 2px;
}
`;

// src/core/styles/structure.ts
var structure = `
/* \u2500\u2500 Page structure dialog \u2500\u2500 */
.accessibility-widget-structure-layer {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
}
.accessibility-widget-structure-layer[hidden] { display: none; }
.accessibility-widget-structure-dialog {
  position: fixed;
  top: 24px;
  bottom: 24px;
  left: clamp(16px, 5vw, 80px);
  width: min(920px, calc(100vw - 420px));
  min-width: min(640px, calc(100vw - 32px));
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
  border-radius: 16px;
  border: 1px solid var(--accessibility-widget-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
}
.accessibility-widget-structure-header {
  min-height: 62px;
  padding: 14px 22px;
  background: var(--accessibility-widget-primary);
  color: var(--accessibility-widget-on-primary, #fff);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.accessibility-widget-structure-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 650;
  letter-spacing: -0.02em;
}
.accessibility-widget-structure-close {
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
.accessibility-widget-structure-close:hover {
  background: color-mix(in srgb, currentColor 14%, transparent);
}
.accessibility-widget-structure-close svg {
  width: 20px;
  height: 20px;
}
.accessibility-widget-structure-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-bottom: 1px solid var(--accessibility-widget-border);
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-structure-tab {
  min-height: 50px;
  border: 0;
  border-inline-end: 1px solid var(--accessibility-widget-border);
  background: transparent;
  color: var(--accessibility-widget-muted);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 650;
  letter-spacing: 0.01em;
  position: relative;
  transition: background 0.2s ease, color 0.2s ease;
}
.accessibility-widget-structure-tab:last-child { border-inline-end: 0; }
.accessibility-widget-structure-tab:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-structure-tab[aria-selected="true"] {
  background: var(--accessibility-widget-bg);
  color: var(--accessibility-widget-text);
}
.accessibility-widget-structure-tab[aria-selected="true"]::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-list {
  flex: 1;
  overflow: auto;
  padding: 16px;
  background: var(--accessibility-widget-bg);
}
.accessibility-widget-structure-item {
  width: 100%;
  min-height: 42px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--accessibility-widget-text);
  cursor: pointer;
  font: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  margin-inline-start: calc(var(--accessibility-widget-structure-depth, 0) * 22px);
  text-align: left;
  transition: background 0.12s ease, color 0.12s ease;
}
.accessibility-widget-structure-item:hover {
  background: var(--accessibility-widget-surface);
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-badge {
  width: 34px;
  height: 26px;
  border-radius: 7px;
  background: var(--accessibility-widget-surface);
  border: 1px solid var(--accessibility-widget-border);
  color: var(--accessibility-widget-primary);
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.accessibility-widget-structure-badge--text {
  background: var(--accessibility-widget-surface);
  font-size: 11px;
  font-weight: 700;
}
.accessibility-widget-structure-badge svg {
  width: 16px;
  height: 16px;
}
.accessibility-widget-structure-item-label {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 15px;
  line-height: 1.25;
}
.accessibility-widget-structure-external {
  flex: 0 0 auto;
  display: inline-flex;
  color: var(--accessibility-widget-primary);
}
.accessibility-widget-structure-external svg {
  width: 14px;
  height: 14px;
}
.accessibility-widget-structure-empty {
  padding: 28px 12px;
  color: var(--accessibility-widget-muted);
  font-size: 13px;
}

/* \u2500\u2500 Page structure dialog \u2014 small viewports \u2500\u2500 */
@media (max-width: 900px) {
  .accessibility-widget-structure-dialog {
    inset: 12px;
    width: auto;
    min-width: 0;
  }
  .accessibility-widget-structure-header {
    min-height: 64px;
    padding: 14px 18px;
  }
  .accessibility-widget-structure-tab {
    min-height: 46px;
    font-size: 13px;
  }
  .accessibility-widget-structure-list {
    padding: 12px;
  }
  .accessibility-widget-structure-item {
    margin-inline-start: calc(var(--accessibility-widget-structure-depth, 0) * 12px);
  }
  .accessibility-widget-structure-item-label {
    font-size: 14px;
  }
}
`;

// src/core/styles/tokens.ts
var DEFAULT_VARS = {
  primary: "#0c0c0c",
  background: "#ffffff",
  text: "#0c0c0c",
  border: "#e4e4e7",
  muted: "#71717a",
  surface: "#f4f4f5"
};
var tokens = (vars) => `
.accessibility-widget-root {
  --accessibility-widget-primary: ${vars.primary};
  --accessibility-widget-bg: ${vars.background};
  --accessibility-widget-text: ${vars.text};
  --accessibility-widget-border: ${vars.border};
  --accessibility-widget-muted: ${vars.muted};
  --accessibility-widget-surface: ${vars.surface};
  --accessibility-widget-on-primary: #ffffff;
  --accessibility-widget-panel-bg: color-mix(in srgb, var(--accessibility-widget-primary) 24%, #01020f);
  --accessibility-widget-card-bg: color-mix(in srgb, var(--accessibility-widget-bg) 92%, #ffffff);
  --accessibility-widget-section-head-bg: color-mix(in srgb, var(--accessibility-widget-text) 7%, #ffffff);
  --accessibility-widget-info-bg: color-mix(in srgb, var(--accessibility-widget-panel-bg) 9%, #ffffff);
  --accessibility-widget-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--accessibility-widget-text);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}
.accessibility-widget-root *, .accessibility-widget-root *::before, .accessibility-widget-root *::after {
  box-sizing: border-box;
}
`;

// src/core/styles/index.ts
var STYLE_ID = "accessibility-widget-styles";
function buildStyles(vars = DEFAULT_VARS) {
  return [
    fonts,
    tokens(vars),
    layout,
    controls,
    structure,
    hostEffects,
    readingTools
  ].join("\n");
}

// src/core/widget.ts
var COLOR_EXCLUSIVE = [
  "darkContrast",
  "lightContrast",
  "highContrast",
  "monochrome",
  "invertColors"
];
var ALIGNMENT_LEVELS = ["left", "center", "right", "justify"];
var PANEL_SECTION_IDS = ["settings", "profiles", "content", "color", "visibility"];
var PROFILE_LABEL = {
  "seizure-safe": translations.seizureSafe,
  "vision-impaired": translations.visionImpaired,
  "light-sensitivity": translations.lightSensitivity,
  "color-blind": translations.colorBlind,
  dyslexia: translations.dyslexia,
  "adhd-friendly": translations.adhdFriendly,
  "cognitive-disability": translations.cognitiveDisability,
  "keyboard-motor": translations.keyboardMotor,
  "blind-screen-reader": translations.blindScreenReader
};
var DEFAULT_SHORTCUT = { key: "u", ctrlKey: true };
function shortcutLabel(sc) {
  const parts = [];
  if (sc.ctrlKey) parts.push("CTRL");
  if (sc.altKey) parts.push("ALT");
  if (sc.shiftKey) parts.push("SHIFT");
  if (sc.metaKey) parts.push("CMD");
  parts.push(sc.key.toUpperCase());
  return parts.join(" + ");
}
function normalizeSize(size) {
  return typeof size === "string" && size.toUpperCase() === "L" ? "L" : "S";
}
function selectorValue(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
function normalizePosition(position) {
  if (position === "left") return "left";
  return "right";
}
function readableOn(color) {
  const hex = color.trim().replace(/^#/, "");
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    return "#ffffff";
  }
  if ([r, g, b].some((n) => Number.isNaN(n))) return "#ffffff";
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return L > 0.45 ? "#0c0c0c" : "#ffffff";
}
var AccessibilityWidget = class {
  constructor(config = {}) {
    this.root = null;
    this.trigger = null;
    this.overlay = null;
    this.panel = null;
    this.structureDialog = null;
    this.isOpen = false;
    this.pageStructureOpen = false;
    this.pageStructureTab = "headings";
    this.collapsedSections = {
      settings: true,
      profiles: false,
      content: false,
      color: false,
      visibility: false
    };
    this.liveRegion = null;
    this.userInteracted = false;
    this.motionMql = null;
    /** When the visitor hasn't interacted, keep Reduce Animations in sync with the OS. */
    this.handleMotionChange = (e) => {
      if (this.userInteracted || this.state.profile !== null) return;
      const next = e.matches ? 1 : 0;
      if (this.state.offAnimations === next) return;
      this.state = { ...this.state, offAnimations: next };
      this.persist();
      applyEffects(this.state);
      this.update();
    };
    this.shortcutListenerOptions = { capture: true };
    this.handleGlobalShortcut = (e) => {
      const sc = this.resolveShortcut();
      if (!sc) return;
      const matches = e.key.toLowerCase() === sc.key.toLowerCase() && e.ctrlKey === !!sc.ctrlKey && e.altKey === !!sc.altKey && e.shiftKey === !!sc.shiftKey && e.metaKey === !!sc.metaKey;
      if (!matches) return;
      e.preventDefault();
      e.stopPropagation();
      this.toggle();
    };
    this.config = {
      position: "right",
      persistence: true,
      ...config
    };
    this.config.position = normalizePosition(this.config.position);
    this.size = normalizeSize(this.config.size);
    this.state = loadState(this.config.persistence);
    if ((this.config.respectOsPreferences ?? true) && this.state.profile === null && !hasPersistedState(this.config.persistence)) {
      this.state = { ...this.state, ...osPreferenceDefaults(readOsPreferences()) };
    }
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────
  /** Inject styles, wrap the host page, and build/attach the widget DOM. */
  mount() {
    if (typeof document === "undefined") return;
    this.injectStyles();
    ensureHostWrapper();
    this.root = document.createElement("div");
    this.root.className = "accessibility-widget-root";
    this.root.setAttribute("role", "complementary");
    this.applyTheme();
    this.applyOffset();
    this.trigger = document.createElement("button");
    this.trigger.className = "accessibility-widget-trigger";
    this.trigger.type = "button";
    this.trigger.dataset.position = this.config.position;
    this.trigger.setAttribute("aria-expanded", "false");
    this.trigger.innerHTML = ICONS.trigger;
    this.trigger.addEventListener("click", () => this.toggle());
    this.overlay = document.createElement("div");
    this.overlay.className = "accessibility-widget-overlay";
    this.overlay.addEventListener("click", () => {
      if (this.pageStructureOpen) this.closePageStructure();
      else this.close();
    });
    this.panel = document.createElement("div");
    this.panel.className = "accessibility-widget-panel";
    this.panel.setAttribute("role", "dialog");
    this.panel.setAttribute("aria-modal", "true");
    this.panel.dataset.position = this.config.position;
    this.panel.dataset.size = this.size;
    this.panel.addEventListener("click", (e) => this.handlePanelClick(e));
    this.structureDialog = document.createElement("div");
    this.structureDialog.className = "accessibility-widget-structure-layer";
    this.structureDialog.hidden = true;
    this.structureDialog.addEventListener("click", (e) => this.handleStructureClick(e));
    this.liveRegion = document.createElement("div");
    this.liveRegion.className = "accessibility-widget-sr-only";
    this.liveRegion.setAttribute("role", "status");
    this.liveRegion.setAttribute("aria-live", "polite");
    this.liveRegion.setAttribute("aria-atomic", "true");
    this.root.append(this.trigger, this.overlay, this.panel, this.structureDialog, this.liveRegion);
    document.body.appendChild(this.root);
    document.addEventListener("keydown", this.handleGlobalShortcut, this.shortcutListenerOptions);
    if ((this.config.respectOsPreferences ?? true) && typeof window !== "undefined" && typeof window.matchMedia === "function") {
      try {
        this.motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
        this.motionMql.addEventListener?.("change", this.handleMotionChange);
      } catch {
        this.motionMql = null;
      }
    }
    setDictionaryLookup(this.config.dictionaryLookup ?? null);
    setSimplifyProvider(this.config.onSimplify ?? null);
    this.update();
    applyEffects(this.state);
  }
  /** Tear down all DOM, listeners, effects, and the host wrapper. */
  destroy() {
    clearEffects();
    unwrapHost();
    releaseFocus();
    document.removeEventListener("keydown", this.handleGlobalShortcut, this.shortcutListenerOptions);
    this.motionMql?.removeEventListener?.("change", this.handleMotionChange);
    this.motionMql = null;
    if (this.root) {
      this.root.remove();
      this.root = null;
    }
    this.trigger = null;
    this.overlay = null;
    this.panel = null;
    this.structureDialog = null;
    this.liveRegion = null;
  }
  // ── Open / close ───────────────────────────────────────────────────────
  /** Open the panel and trap focus within it. */
  open() {
    this.isOpen = true;
    this.trigger?.setAttribute("aria-expanded", "true");
    this.config.onOpen?.();
    this.emit({ type: "open" });
    this.update();
    if (this.panel && this.trigger) trapFocus(this.panel, this.trigger);
  }
  /** Close the panel (and the structure dialog) and release focus. */
  close() {
    this.isOpen = false;
    this.pageStructureOpen = false;
    this.trigger?.setAttribute("aria-expanded", "false");
    this.config.onClose?.();
    this.emit({ type: "close" });
    releaseFocus();
    this.update();
  }
  /** Toggle the panel open/closed. */
  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }
  /** Reset all settings to defaults, persist, and re-apply effects. */
  reset() {
    const scroll = this.captureScrollPosition();
    const focus = this.capturePanelFocusSelector();
    this.pageStructureOpen = false;
    this.userInteracted = true;
    this.state = { ...DEFAULT_STATE };
    this.persist();
    applyEffects(this.state);
    this.announce("All settings reset");
    this.config.onReset?.();
    this.emit({ type: "reset" });
    this.update(scroll, focus);
  }
  // ── Public accessors ───────────────────────────────────────────────────
  /** A copy of the current widget state. */
  getState() {
    return { ...this.state };
  }
  /** Whether the panel is currently open. */
  getIsOpen() {
    return this.isOpen;
  }
  // ── Runtime configuration setters ──────────────────────────────────────
  /** Change the panel size (S / L). */
  setSize(size) {
    this.size = normalizeSize(size);
    if (this.panel) this.panel.dataset.size = this.size;
    this.update();
  }
  /** Move the trigger and panel to a different horizontal side. */
  setPosition(position) {
    const next = normalizePosition(position);
    this.config.position = next;
    if (this.trigger) this.trigger.dataset.position = next;
    if (this.panel) this.panel.dataset.position = next;
    this.update();
  }
  /** Set the trigger's horizontal distance (px) from its anchored edge. */
  setOffsetX(offset) {
    this.config.offsetX = offset;
    this.applyOffset();
  }
  /** Set the trigger's vertical distance (px) from the bottom edge. */
  setOffsetY(offset) {
    this.config.offsetY = offset;
    this.applyOffset();
  }
  /** Override the widget title used in the header and accessible labels. */
  setTitle(title) {
    this.config.title = title;
    this.updateWidgetLabels();
    this.update();
  }
  /** Override the accent colour (takes precedence over `theme.primary`). */
  setAccentColor(accentColor) {
    this.config.accentColor = accentColor;
    this.applyTheme();
  }
  /** Override the lower-level theme (primary / background / text). */
  setTheme(theme) {
    this.config.theme = theme;
    this.applyTheme();
  }
  /** Set which profiles are hidden from the panel (undefined shows all). */
  setHiddenProfiles(hiddenProfiles) {
    this.config.hiddenProfiles = hiddenProfiles;
    this.update();
  }
  /** Set which tools are hidden from the panel (undefined shows all). */
  setHiddenTools(hiddenTools) {
    this.config.hiddenTools = hiddenTools;
    this.update();
  }
  // ── Theming ────────────────────────────────────────────────────────────
  applyOffset() {
    if (!this.root) return;
    const { offsetX, offsetY } = this.config;
    setCssVar(this.root, "--accessibility-widget-trigger-offset-x", typeof offsetX === "number" ? `${offsetX}px` : void 0);
    setCssVar(this.root, "--accessibility-widget-trigger-offset-y", typeof offsetY === "number" ? `${offsetY}px` : void 0);
  }
  getTitle() {
    return this.config.title?.trim() || translations.title;
  }
  getTriggerLabel(title) {
    return title.toLowerCase().includes("menu") ? `Open ${title}` : `Open ${title} menu`;
  }
  updateWidgetLabels() {
    const title = this.getTitle();
    this.root?.setAttribute("aria-label", title);
    this.trigger?.setAttribute("aria-label", this.getTriggerLabel(title));
    this.panel?.setAttribute("aria-label", `${title} settings`);
  }
  applyTheme() {
    if (!this.root) return;
    const accentColor = this.config.accentColor?.trim() || this.config.theme?.primary;
    const t = this.config.theme;
    setCssVar(this.root, "--accessibility-widget-primary", accentColor);
    setCssVar(this.root, "--accessibility-widget-header-bg", accentColor);
    setCssVar(this.root, "--accessibility-widget-bg", t?.background);
    setCssVar(this.root, "--accessibility-widget-text", t?.text);
    setCssVar(this.root, "--accessibility-widget-on-primary", accentColor ? readableOn(accentColor) : void 0);
  }
  // ── Panel click handling ───────────────────────────────────────────────
  handlePanelClick(e) {
    const target = e.target;
    if (target.closest(".accessibility-widget-close")) {
      this.close();
      return;
    }
    if (this.handleSectionToggleClick(target)) return;
    if (this.handleActionClick(target)) return;
    if (this.handleSizeClick(target)) return;
    if (this.handlePositionClick(target)) return;
    if (this.handleProfileClick(target)) return;
    this.handleToolClick(target);
  }
  handleSectionToggleClick(target) {
    const btn = target.closest("[data-section-toggle]");
    if (!btn) return false;
    const section = btn.dataset.sectionToggle;
    if (!this.isPanelSection(section)) return true;
    this.collapsedSections[section] = !this.collapsedSections[section];
    this.update();
    return true;
  }
  isPanelSection(section) {
    return PANEL_SECTION_IDS.includes(section);
  }
  handleActionClick(target) {
    const btn = target.closest("[data-action]");
    if (!btn) return false;
    if (btn.dataset.action === "reset") this.reset();
    return true;
  }
  handleSizeClick(target) {
    const btn = target.closest("[data-size]");
    if (!btn || !this.panel?.contains(btn) || !btn.classList.contains("accessibility-widget-size-switch")) return false;
    this.setSize(btn.dataset.size);
    return true;
  }
  handlePositionClick(target) {
    const btn = target.closest("[data-position]");
    if (!btn || !this.panel?.contains(btn) || !btn.classList.contains("accessibility-widget-position-option")) return false;
    const position = btn.dataset.position;
    if (position !== "left" && position !== "right") return true;
    this.setPosition(position);
    return true;
  }
  handleProfileClick(target) {
    const btn = target.closest("[data-profile]");
    if (!btn) return false;
    this.toggleProfile(btn.dataset.profile);
    return true;
  }
  handleToolClick(target) {
    const btn = target.closest("[data-tool]");
    if (!btn) return false;
    const key = btn.dataset.tool;
    if (key === "pageStructure") this.togglePageStructure();
    else if (key === "textAlignment") this.cycleAlignment();
    else if (key && LEVEL_TOOLS.includes(key)) this.cycleLevel(key);
    return true;
  }
  // ── Page structure dialog ──────────────────────────────────────────────
  handleStructureClick(e) {
    const target = e.target;
    if (target.closest('[data-structure-action="close"]')) {
      this.closePageStructure();
      return;
    }
    const tab = target.closest("[data-structure-tab]");
    if (tab) {
      this.pageStructureTab = this.normalizeStructureTab(tab.dataset.structureTab);
      this.update();
      return;
    }
    const item = target.closest("[data-structure-target]");
    if (item?.dataset.structureTarget) {
      this.jumpToStructureTarget(item.dataset.structureTarget);
    }
  }
  normalizeStructureTab(tab) {
    if (tab === "landmarks" || tab === "links") return tab;
    return "headings";
  }
  togglePageStructure() {
    if (this.pageStructureOpen) this.closePageStructure();
    else this.openPageStructure();
  }
  openPageStructure() {
    this.pageStructureTab = "headings";
    this.pageStructureOpen = true;
    this.update();
    this.trapStructureFocus();
  }
  closePageStructure() {
    if (!this.pageStructureOpen) return;
    this.pageStructureOpen = false;
    releaseFocus();
    this.update();
    if (this.isOpen && this.panel && this.trigger) trapFocus(this.panel, this.trigger);
  }
  trapStructureFocus() {
    const closeBtn = this.structureDialog?.querySelector(".accessibility-widget-structure-close");
    if (!this.structureDialog || !closeBtn) return;
    trapFocus(this.structureDialog, closeBtn, () => this.closePageStructure());
  }
  jumpToStructureTarget(id) {
    const target = document.querySelector(`[data-accessibility-widget-structure-id="${id}"]`);
    if (!target) return;
    this.closePageStructure();
    target.scrollIntoView({ block: "center", behavior: "smooth" });
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  // ── State mutations ────────────────────────────────────────────────────
  toggleProfile(id) {
    if (this.state.profile === id) {
      this.state = { ...DEFAULT_STATE };
      this.announce("Profiles reset");
    } else {
      const preset = PROFILE_PRESETS[id] ?? {};
      this.state = { ...DEFAULT_STATE, profile: id, ...preset };
      this.announce(`${PROFILE_LABEL[id] ?? id} profile applied`);
    }
    this.emit({ type: "profile", profile: this.state.profile });
    this.commit();
  }
  cycleLevel(key) {
    const current = this.state[key];
    if (typeof current !== "number") return;
    const maxLevel = TOOL_MAX_LEVELS[key];
    const next = current >= maxLevel ? 0 : current + 1;
    if (COLOR_EXCLUSIVE.includes(key) && next > 0) {
      for (const k of COLOR_EXCLUSIVE) {
        if (k !== key) this.state[k] = 0;
      }
    }
    ;
    this.state[key] = next;
    const label = translations[key] ?? key;
    this.announce(maxLevel <= 1 ? `${label} ${next > 0 ? "on" : "off"}` : next > 0 ? `${label}, level ${next} of ${maxLevel}` : `${label} off`);
    this.emit({ type: "tool", tool: key, level: next });
    this.commit();
  }
  cycleAlignment() {
    const currentIndex = ALIGNMENT_LEVELS.indexOf(this.state.textAlignment);
    this.state.textAlignment = ALIGNMENT_LEVELS[(currentIndex + 1) % ALIGNMENT_LEVELS.length];
    this.announce(`Text alignment ${this.state.textAlignment}`);
    this.emit({ type: "alignment", alignment: this.state.textAlignment });
    this.commit();
  }
  /** Persist, apply effects, and re-render after a state change. */
  commit() {
    this.userInteracted = true;
    const scroll = this.captureScrollPosition();
    const focus = this.capturePanelFocusSelector();
    this.persist();
    applyEffects(this.state);
    this.update(scroll, focus);
  }
  persist() {
    saveState(this.config.persistence, this.state);
  }
  /** Announce a change to assistive technology via the polite live region. */
  announce(message) {
    if (this.liveRegion) this.liveRegion.textContent = message;
  }
  /** The active toggle shortcut, or null when disabled. */
  resolveShortcut() {
    const sc = this.config.shortcut;
    if (sc === false) return null;
    return sc ?? DEFAULT_SHORTCUT;
  }
  /** Header label for the active shortcut, or null when disabled. */
  getShortcutLabel() {
    const sc = this.resolveShortcut();
    return sc ? shortcutLabel(sc) : null;
  }
  /** Emit a privacy-respecting analytics event; never throws into the widget. */
  emit(event) {
    try {
      this.config.onEvent?.(event);
    } catch {
    }
  }
  // ── Rendering ──────────────────────────────────────────────────────────
  update(scroll = this.captureScrollPosition(), focusSelector = this.capturePanelFocusSelector()) {
    if (!this.panel) return;
    this.updateWidgetLabels();
    this.panel.classList.toggle("open", this.isOpen);
    this.overlay?.classList.toggle("open", this.isOpen);
    this.panel.innerHTML = renderPanel(this.state, this.size, {
      pageStructureOpen: this.pageStructureOpen,
      title: this.getTitle(),
      position: this.config.position,
      collapsedSections: this.collapsedSections,
      hiddenProfiles: this.config.hiddenProfiles,
      hiddenTools: this.config.hiddenTools,
      shortcutLabel: this.getShortcutLabel(),
      simplifyEnabled: !!this.config.onSimplify
    });
    this.renderStructureDialog();
    this.restorePanelFocus(focusSelector);
    this.restoreScrollPosition(scroll);
  }
  captureScrollPosition() {
    const body = this.panel?.querySelector(".accessibility-widget-body-container");
    return {
      panelBodyLeft: body?.scrollLeft ?? 0,
      panelBodyTop: body?.scrollTop ?? 0,
      windowX: typeof window === "undefined" ? 0 : window.scrollX,
      windowY: typeof window === "undefined" ? 0 : window.scrollY
    };
  }
  restoreScrollPosition(scroll) {
    const restore = () => {
      const body = this.panel?.querySelector(".accessibility-widget-body-container");
      if (body) {
        body.scrollLeft = scroll.panelBodyLeft;
        body.scrollTop = scroll.panelBodyTop;
      }
      this.restoreWindowScroll(scroll.windowX, scroll.windowY);
    };
    restore();
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(restore);
    }
  }
  restoreWindowScroll(x, y) {
    if (typeof window === "undefined") return;
    const currentX = window.scrollX;
    const currentY = window.scrollY;
    if (currentX === x && currentY === y) return;
    if (typeof window.scrollTo === "function") {
      try {
        window.scrollTo(x, y);
        return;
      } catch {
      }
    }
    const scroller = document.scrollingElement;
    if (scroller) {
      scroller.scrollLeft = x;
      scroller.scrollTop = y;
    }
  }
  capturePanelFocusSelector() {
    if (!this.panel || typeof document === "undefined") return null;
    const active = document.activeElement;
    if (!(active instanceof HTMLElement) || !this.panel.contains(active)) return null;
    const tool = active.closest("[data-tool]");
    if (tool && this.panel.contains(tool) && tool.dataset.tool) return `[data-tool="${selectorValue(tool.dataset.tool)}"]`;
    const profile = active.closest("[data-profile]");
    if (profile && this.panel.contains(profile) && profile.dataset.profile) return `[data-profile="${selectorValue(profile.dataset.profile)}"]`;
    const section = active.closest("[data-section-toggle]");
    if (section && this.panel.contains(section) && section.dataset.sectionToggle) return `[data-section-toggle="${selectorValue(section.dataset.sectionToggle)}"]`;
    const position = active.closest(".accessibility-widget-position-option[data-position]");
    if (position && this.panel.contains(position) && position.dataset.position) return `.accessibility-widget-position-option[data-position="${selectorValue(position.dataset.position)}"]`;
    if (active.classList.contains("accessibility-widget-size-switch")) return ".accessibility-widget-size-switch";
    if (active.classList.contains("accessibility-widget-close")) return ".accessibility-widget-close";
    const action = active.closest("[data-action]");
    if (action && this.panel.contains(action) && action.dataset.action) return `[data-action="${selectorValue(action.dataset.action)}"]`;
    return null;
  }
  restorePanelFocus(selector) {
    if (!selector || !this.isOpen || !this.panel) return;
    const target = this.panel.querySelector(selector);
    if (!target) return;
    try {
      target.focus({ preventScroll: true });
    } catch {
      target.focus();
    }
  }
  renderStructureDialog() {
    if (!this.structureDialog) return;
    this.structureDialog.hidden = !this.pageStructureOpen;
    this.structureDialog.classList.toggle("open", this.pageStructureOpen);
    if (!this.pageStructureOpen) {
      this.structureDialog.innerHTML = "";
      return;
    }
    const data = collectPageStructure(translations);
    this.structureDialog.innerHTML = renderPageStructureDialog(data, this.pageStructureTab, translations);
  }
  injectStyles() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = buildStyles(DEFAULT_VARS);
    document.head.appendChild(style);
  }
};

// src/core/audit.ts
function describeElement(el) {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls = typeof el.className === "string" && el.className.trim() ? `.${el.className.trim().split(/\s+/)[0]}` : "";
  return `${tag}${id}${cls}`;
}
function hasAccessibleName(el) {
  if ((el.textContent || "").trim()) return true;
  if (el.getAttribute("aria-label")?.trim()) return true;
  if (el.getAttribute("aria-labelledby")?.trim()) return true;
  if (el.getAttribute("title")?.trim()) return true;
  const img = el.querySelector("img[alt]");
  if (img && (img.getAttribute("alt") || "").trim()) return true;
  return false;
}
function cssEscape(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
  return value.replace(/["\\]/g, "\\$&");
}
function isWidgetOwn(el) {
  return !!el.closest(".accessibility-widget-root");
}
function auditAccessibility(root) {
  const issues = [];
  const target = root ?? (typeof document !== "undefined" ? document : null);
  if (!target) return issues;
  const doc = target instanceof Document ? target : target.ownerDocument ?? document;
  if (target instanceof Document) {
    if (!doc.documentElement.getAttribute("lang")?.trim()) {
      issues.push({ rule: "html-has-lang", impact: "serious", message: "The <html> element has no lang attribute." });
    }
    if (!doc.title.trim()) {
      issues.push({ rule: "document-title", impact: "serious", message: "The document has no <title>." });
    }
  }
  target.querySelectorAll("img").forEach((img) => {
    if (isWidgetOwn(img) || img.closest('[aria-hidden="true"]')) return;
    const role = img.getAttribute("role");
    if (role === "presentation" || role === "none") return;
    if (!img.hasAttribute("alt")) {
      issues.push({ rule: "image-alt", impact: "serious", message: "Image is missing an alt attribute.", selector: describeElement(img) });
    }
  });
  target.querySelectorAll("input, select, textarea").forEach((ctrl) => {
    if (isWidgetOwn(ctrl)) return;
    const type = (ctrl.getAttribute("type") || "").toLowerCase();
    if (ctrl.tagName === "INPUT" && ["hidden", "submit", "button", "reset", "image"].includes(type)) return;
    if (ctrl.getAttribute("aria-label")?.trim() || ctrl.getAttribute("aria-labelledby")?.trim() || ctrl.getAttribute("title")?.trim()) return;
    const id = ctrl.getAttribute("id");
    const hasForLabel = id ? !!doc.querySelector(`label[for="${cssEscape(id)}"]`) : false;
    if (!hasForLabel && !ctrl.closest("label")) {
      issues.push({ rule: "label", impact: "serious", message: "Form control has no associated label.", selector: describeElement(ctrl) });
    }
  });
  target.querySelectorAll("a[href], button").forEach((el) => {
    if (isWidgetOwn(el) || el.closest('[aria-hidden="true"]')) return;
    if (!hasAccessibleName(el)) {
      issues.push({ rule: "empty-control", impact: "serious", message: `<${el.tagName.toLowerCase()}> has no accessible text.`, selector: describeElement(el) });
    }
  });
  let previousLevel = 0;
  target.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    if (isWidgetOwn(heading)) return;
    const level = Number(heading.tagName[1]);
    if (previousLevel && level > previousLevel + 1) {
      issues.push({ rule: "heading-order", impact: "moderate", message: `Heading level skips from h${previousLevel} to h${level}.`, selector: describeElement(heading) });
    }
    previousLevel = level;
  });
  return issues;
}

// src/core/statement/generate.ts
var STANDARD_TEXT = {
  ADA: "the Americans with Disabilities Act (ADA), for which WCAG is the benchmark commonly applied by U.S. courts",
  "Section 508": "Section 508 of the U.S. Rehabilitation Act, which incorporates WCAG 2.0 Level AA",
  AODA: "the Accessibility for Ontarians with Disabilities Act (AODA), whose web requirements are based on WCAG 2.0 Level AA",
  "EN 301 549": "the European standard EN 301 549, which references WCAG 2.1 Level AA",
  EAA: "the European Accessibility Act (EAA), which relies on EN 301 549 (WCAG 2.1 Level AA)"
};
var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
function today() {
  const d = /* @__PURE__ */ new Date();
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
function capitalize(value) {
  return value.length ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}
function joinList(items) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
function conformanceSentence(site, target, status) {
  const subject = capitalize(site);
  if (status === "fully") {
    return `${subject} is fully conformant with ${target}. Fully conformant means that the content fully conforms to the accessibility standard without any exceptions.`;
  }
  if (status === "none") {
    return `${subject} is not yet conformant with ${target}. Not conformant means that the content does not yet conform to the accessibility standard, and we are actively working toward conformance.`;
  }
  return `${subject} is partially conformant with ${target}. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.`;
}
function buildBlocks(options) {
  const org = options.organizationName?.trim() || "our organization";
  const site = options.websiteName?.trim() || options.websiteUrl?.trim() || `the ${org} website`;
  const version = options.wcagVersion ?? "2.1";
  const level = options.wcagLevel ?? "AA";
  const status = options.conformanceStatus ?? "partially";
  const widgetName = options.widgetName?.trim() || "an accessibility toolbar";
  const mentionWidget = options.mentionWidget ?? true;
  const date = options.date?.trim() || today();
  const target = `WCAG ${version} Level ${level}`;
  const title = `Accessibility Statement for ${org}`;
  const blocks = [];
  blocks.push({
    kind: "p",
    text: `${org} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.`
  });
  blocks.push({ kind: "h2", text: "Conformance status" });
  blocks.push({
    kind: "p",
    text: "The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. They define three levels of conformance: Level A, Level AA, and Level AAA."
  });
  blocks.push({ kind: "p", text: conformanceSentence(site, target, status) });
  if (options.standards && options.standards.length > 0) {
    const descriptions = options.standards.map((s) => STANDARD_TEXT[s]).filter(Boolean);
    if (descriptions.length > 0) {
      blocks.push({
        kind: "p",
        text: `We also aim to meet the expectations of ${joinList(descriptions)}.`
      });
    }
  }
  if (mentionWidget) {
    blocks.push({ kind: "h2", text: "Accessibility tools on this site" });
    blocks.push({
      kind: "p",
      text: `${capitalize(site)} provides ${widgetName}, which lets visitors adjust how content is presented \u2014 for example text size, spacing, color contrast, and reading aids. These tools are an optional enhancement: they supplement our accessibility work but do not by themselves make the site conformant, and you do not need them to access our content.`
    });
  }
  if (options.measuresTaken && options.measuresTaken.length > 0) {
    blocks.push({ kind: "h2", text: "Measures to support accessibility" });
    blocks.push({ kind: "ul", items: options.measuresTaken });
  }
  if (options.knownLimitations && options.knownLimitations.length > 0) {
    blocks.push({ kind: "h2", text: "Known limitations" });
    blocks.push({
      kind: "p",
      text: "Despite our efforts, some content may not yet be fully accessible. We are aware of the following limitations and are working to address them:"
    });
    blocks.push({ kind: "ul", items: options.knownLimitations });
  }
  blocks.push({ kind: "h2", text: "Feedback and contact" });
  blocks.push({
    kind: "p",
    text: `We welcome your feedback on the accessibility of ${site}. Please let us know if you encounter accessibility barriers:`
  });
  const contact = [];
  if (options.email?.trim()) {
    const email = options.email.trim();
    contact.push({ label: "Email", value: email, href: `mailto:${email}` });
  }
  if (options.phone?.trim()) {
    const phone = options.phone.trim();
    contact.push({ label: "Phone", value: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}` });
  }
  if (options.contactUrl?.trim()) {
    const url = options.contactUrl.trim();
    contact.push({ label: "Contact page", value: url, href: url });
  }
  if (options.postalAddress?.trim()) {
    contact.push({ label: "Address", value: options.postalAddress.trim() });
  }
  if (contact.length > 0) blocks.push({ kind: "contact", items: contact });
  else blocks.push({ kind: "p", text: "Please use the contact details published on our website to reach us about accessibility." });
  blocks.push({ kind: "p", text: "We try to respond to accessibility feedback promptly." });
  blocks.push({ kind: "h2", text: "Date" });
  blocks.push({ kind: "p", text: `This statement was last reviewed on ${date}.` });
  return { title, blocks };
}
var STATEMENT_TITLE_ID = "accessibility-statement-title";
function renderContactHtml(item) {
  const label = escapeHtml(item.label);
  if (item.href) {
    return `<li>${label}: <a href="${escapeHtml(item.href)}">${escapeHtml(item.value)}</a></li>`;
  }
  return `<li>${label}: ${escapeHtml(item.value)}</li>`;
}
function renderHtmlFragment(title, blocks) {
  const parts = [];
  parts.push(`<section class="accessibility-statement" aria-labelledby="${STATEMENT_TITLE_ID}">`);
  parts.push(`  <h1 id="${STATEMENT_TITLE_ID}">${escapeHtml(title)}</h1>`);
  for (const block of blocks) {
    if (block.kind === "h2") parts.push(`  <h2>${escapeHtml(block.text)}</h2>`);
    else if (block.kind === "p") parts.push(`  <p>${escapeHtml(block.text)}</p>`);
    else if (block.kind === "ul") parts.push(`  <ul>${block.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>`);
    else parts.push(`  <ul class="accessibility-statement-contact">${block.items.map(renderContactHtml).join("")}</ul>`);
  }
  parts.push("</section>");
  return parts.join("\n");
}
function renderHtmlDocument(title, blocks) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
</head>
<body>
${renderHtmlFragment(title, blocks)}
</body>
</html>
`;
}
function renderMarkdown(title, blocks) {
  const lines = [`# ${title}`, ""];
  for (const block of blocks) {
    if (block.kind === "h2") lines.push(`## ${block.text}`, "");
    else if (block.kind === "p") lines.push(block.text, "");
    else if (block.kind === "ul") {
      for (const i of block.items) lines.push(`- ${i}`);
      lines.push("");
    } else {
      for (const c of block.items) lines.push(`- ${c.label}: ${c.href ? `[${c.value}](${c.href})` : c.value}`);
      lines.push("");
    }
  }
  return `${lines.join("\n").trim()}
`;
}
function renderText(title, blocks) {
  const lines = [title, "=".repeat(title.length), ""];
  for (const block of blocks) {
    if (block.kind === "h2") lines.push(block.text, "-".repeat(block.text.length), "");
    else if (block.kind === "p") lines.push(block.text, "");
    else if (block.kind === "ul") {
      for (const i of block.items) lines.push(`- ${i}`);
      lines.push("");
    } else {
      for (const c of block.items) lines.push(`- ${c.label}: ${c.value}`);
      lines.push("");
    }
  }
  return `${lines.join("\n").trim()}
`;
}
function generateAccessibilityStatement(options) {
  const { title, blocks } = buildBlocks(options);
  return {
    title,
    html: renderHtmlFragment(title, blocks),
    htmlDocument: renderHtmlDocument(title, blocks),
    markdown: renderMarkdown(title, blocks),
    text: renderText(title, blocks)
  };
}

// src/react/widget.tsx
function AccessibilityWidget2(props) {
  const instanceRef = useRef(null);
  const propsRef = useRef(props);
  propsRef.current = props;
  useEffect(() => {
    const instance = new AccessibilityWidget(propsRef.current);
    instanceRef.current = instance;
    instance.mount();
    return () => {
      instance.destroy();
      instanceRef.current = null;
    };
  }, []);
  useEffect(() => {
    if (!instanceRef.current) return;
    if (props.size) instanceRef.current.setSize(props.size);
  }, [props.size]);
  useEffect(() => {
    if (!instanceRef.current) return;
    if (props.position) instanceRef.current.setPosition(props.position);
  }, [props.position]);
  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.setOffsetX(props.offsetX);
  }, [props.offsetX]);
  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.setOffsetY(props.offsetY);
  }, [props.offsetY]);
  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.setTitle(props.title);
  }, [props.title]);
  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.setAccentColor(props.accentColor);
  }, [props.accentColor]);
  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.setTheme(props.theme);
  }, [props.theme]);
  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.setHiddenProfiles(props.hiddenProfiles);
  }, [JSON.stringify(props.hiddenProfiles)]);
  useEffect(() => {
    if (!instanceRef.current) return;
    instanceRef.current.setHiddenTools(props.hiddenTools);
  }, [JSON.stringify(props.hiddenTools)]);
  return null;
}
var ReactAccessibilityWidget = AccessibilityWidget2;

// src/react/use-accessibility-widget.ts
import { useCallback, useEffect as useEffect2, useRef as useRef2, useState } from "react";
function useAccessibilityWidget(config = {}) {
  const instanceRef = useRef2(null);
  const [state, setState] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect2(() => {
    const instance = new AccessibilityWidget(config);
    instanceRef.current = instance;
    instance.mount();
    setState(instance.getState());
    return () => {
      instance.destroy();
      instanceRef.current = null;
    };
  }, []);
  const open = useCallback(() => {
    instanceRef.current?.open();
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    instanceRef.current?.close();
    setIsOpen(false);
  }, []);
  const toggle = useCallback(() => {
    instanceRef.current?.toggle();
    setIsOpen((prev) => !prev);
  }, []);
  const reset = useCallback(() => {
    instanceRef.current?.reset();
    if (instanceRef.current) {
      setState(instanceRef.current.getState());
    }
  }, []);
  const setTitle = useCallback((title) => {
    instanceRef.current?.setTitle(title);
  }, []);
  const setAccentColor = useCallback((accentColor) => {
    instanceRef.current?.setAccentColor(accentColor);
  }, []);
  const setTheme = useCallback((theme) => {
    instanceRef.current?.setTheme(theme);
  }, []);
  return { open, close, toggle, reset, setTitle, setAccentColor, setTheme, state, isOpen };
}

// src/react/accessibility-statement.tsx
import { jsx } from "react/jsx-runtime";
function AccessibilityStatement({ className, ...options }) {
  const { html } = generateAccessibilityStatement(options);
  return /* @__PURE__ */ jsx("div", { className, dangerouslySetInnerHTML: { __html: html } });
}
export {
  AccessibilityStatement,
  AccessibilityWidget2 as AccessibilityWidget,
  ReactAccessibilityWidget,
  auditAccessibility,
  generateAccessibilityStatement,
  useAccessibilityWidget
};
//# sourceMappingURL=react.esm.js.map