# AI Design System — Master

```yaml
version: 2.6
name: AI Design System
purpose: Single source of truth for AI-generated AI Design HTML/React UI
scope: Design rules + privacy-safe skeleton rendering rules
authority:
  primary: "This document"
  externalDesignReferenceRequired: false
  mode: "standalone"
exclude:
  - mock data
  - business logic
  - JavaScript runtime logic
  - role permission logic
  - backend data schema
  - readable mock data or production data
  - navigation labels, routes, menu keys, and real hierarchy
  - page titles, card titles, table labels, column names, field labels, button copy, status text, role names, permission names, customer/product identifiers, financial values, dates, phone numbers, and other business content in design-only mockups
```

This file is the **single source of truth** for AI-generated
AI Design UI. It consolidates the previous multi-layer design package
(v0.1 Core, v0.2 Improved, v0.3 Addon, Combined, and the OS modules)
into one clean, non-redundant document. Every rule appears exactly once.

## How to use this file

- Read it once before generating any UI
- Apply the rules silently — do not narrate them in chat output
- Use existing tokens before inventing new styles
- All sections are in one place; jump via the Table of Contents below

## Table of Contents

```
1.  Core Principles
2.  Design Tokens (contract, CSS vars, colors, typography, radius, spacing)
3.  App Shell
4.  Sidebar System
5.  Full Data Skeleton Privacy System
6.  Topbar & Search
7.  Icon System
8.  Shared Components (buttons, KPI, table, filter bar, side panel, pagination)
9.  Layout System (page header, density, strict grid, allowed/forbidden sections)
10. Page Type System
11. Privacy-Safe Layout Contracts
12. Component Architecture Enforcement
13. Responsive Rules (sidebar, grid, breakpoints, mobile)
14. State & Interaction System (hover/focus/active, loading/empty/error, motion)
15. Chart System
16. Form System
17. Performance Tracking Pattern
18. Accessibility
19. Implementation Mapping & Anti-Drift
20. Runtime Content Boundary
21. AI Design Runtime
22. AI Generation Rules
23. Silent Design Application Rule
24. HTML Generation Checklist
25. AI Correction Rules
26. Final Design Principle
27. Known Gaps
Appendix A — Migration Notes from v0.x
```

-----

# Important Rule

The AI must keep these separated and never blindly merge them:

- **Design rules** = visual system (this file)
- **Product logic** = page behavior
- **Mock data** = demo data only
- **Runtime** = implementation flow

-----

# 0. Usage Rule

AI must:

- Read this file before generating any UI
- Apply the rules silently — do not explain or summarize them in chat unless asked
- Use existing tokens before inventing new styles
- Preserve the AI Design enterprise dashboard look
- Never import Home-only sections into other pages
- Treat this file as the complete visual authority; no external design reference is required
- Do not request or depend on external design-tool links to generate compliant UI

-----

# 1. Core Principles

- Desktop-first enterprise dashboard calibrated to a 1280px reference viewport
- KPI-first hierarchy
- Shared layout shell across all pages
- Sidebar-driven navigation
- Primary deep blue used only for interaction emphasis
- Home-only sections MUST NOT appear on other pages

## Visual Fidelity Rules

- Prefer this Design System over generic dashboard styling
- Use compact enterprise spacing
- Avoid oversized typography
- Avoid excessive shadows
- Use white surfaces for operational dashboards
- Maintain dense information hierarchy
- Use subtle borders instead of strong backgrounds
- Avoid generic SaaS dashboard appearance
- Operational pages must feel dense but readable

-----

# 2. Design Tokens

## 2.1 Token Usage Contract

```yaml
token-contract:
  rule: "Every generated UI value must map to a token unless explicitly marked as page-specific"
  cssVariablePrefix: "--ah"
  allowRawValues: false
  allowedRawValues:
    - "#fafbfc"  # enterprise table header only
    - "#fafcff"  # enterprise table hover only
  fallbackBehavior: "If an exact value is not defined, choose the nearest existing token; do not invent new colors, radii, or shadows."
```

## 2.2 CSS Variable Map (canonical)

The layout baseline uses a 1280px desktop viewport with a 200px sidebar and a
1080px main pane. The main pane is fluid above/below the baseline; do not create
a second fixed-width wrapper inside it unless a page contract explicitly requires one.

```css
:root {
  /* Colors */
  --ah-primary: #00008f;
  --ah-primary-deep: #00006f;
  --ah-primary-dark: #000056;
  --ah-primary-soft: #e2efff;
  --ah-primary-gradient-end: #4658fc;

  --ah-canvas: #ffffff;
  --ah-app-bg: #f0f6ff;
  --ah-surface-muted: #f7f7f8;

  --ah-ink-deep: #1a1d21;
  --ah-ink: #434956;
  --ah-slate: #606776;
  --ah-placeholder: #b2b2b2;
  --ah-disabled: #bfc3c9;

  --ah-hairline: #e5e5e5;
  --ah-hairline-soft: #eceded;
  --ah-field-border: #cccccc;
  --ah-neutral-border: #8c93a1;

  --ah-success: #17663a;
  --ah-warning: #f2a918;
  --ah-critical: #e3000a;
  --ah-on-primary: #ffffff;

  /* Badge palette observed in production patterns */
  --ah-badge-coral: #ffb4ce;
  --ah-badge-blue: #74bde8;
  --ah-badge-sunshine: #ffff00;
  --ah-badge-teal: #0f717f;
  --ah-badge-success-bg: #dff8ea;
  --ah-badge-success-ink: #0f4527;
  --ah-badge-cyan-bg: #dbf7fb;

  /* Layout dimensions */
  --ah-reference-desktop-width: 1280px;
  --ah-sidebar-width: 200px;
  --ah-main-pane-reference-width: 1080px;
  --ah-main-pane-width: calc(100vw - var(--ah-sidebar-width));
  --ah-content-gutter: 16px;
  --ah-topbar-height: 64px;
  --ah-search-width: 370px;
  --ah-search-height: 40px;
  --ah-sidebar-item-height: 32px;
  --ah-table-header-height: 44px;
  --ah-table-row-height: 44px;
  --ah-table-row-height-comfortable: 48px;
  --ah-tab-height: 40px;
  --ah-button-md-height: 40px;
  --ah-badge-height: 20px;
  --ah-side-panel-width: 320px;

  /* Radius */
  --ah-radius-xs: 4px;
  --ah-radius-sm: 8px;
  --ah-radius-md: 12px;
  --ah-radius-lg: 16px;
  --ah-radius-full: 100px;
  --ah-radius-pill: 100px;   /* alias */
  --ah-radius-chip: 999px;
  --ah-radius-rail: 1000px;
  --ah-radius-circle: 9999px;

  /* Numeric spacing scale */
  --ah-space-4: 4px;
  --ah-space-8: 8px;
  --ah-space-10: 10px;
  --ah-space-12: 12px;
  --ah-space-16: 16px;
  --ah-space-20: 20px;
  --ah-space-24: 24px;
  --ah-space-32: 32px;

  /* Legacy semantic aliases */
  --ah-space-xs: var(--ah-space-8);
  --ah-space-sm: var(--ah-space-12);
  --ah-space-md: var(--ah-space-16);
  --ah-space-lg: var(--ah-space-24);
  --ah-space-xl: var(--ah-space-32);

  /* Shadows */
  --ah-shadow-card: 0px 4px 8px rgba(150,167,214,0.15);
  --ah-shadow-none: none;
}
```

### Alias policy

Legacy aliases may remain for backward compatibility, but new components should use
the numeric spacing tokens and the explicit component-height tokens above. Alias values
must never diverge from their canonical token.

-----

## 2.3 Colors (semantic mapping)

```yaml
colors:
  primary: "#00008f"
  primary-deep: "#00006f"
  primary-dark: "#000056"
  primary-soft: "#e2efff"
  primary-gradient-end: "#4658fc"
  canvas: "#ffffff"
  app-bg: "#f0f6ff"
  surface-muted: "#f7f7f8"
  ink-deep: "#1a1d21"
  ink: "#434956"
  slate: "#606776"
  placeholder: "#b2b2b2"
  disabled: "#bfc3c9"
  hairline: "#e5e5e5"
  hairline-soft: "#eceded"
  field-border: "#cccccc"
  neutral-border: "#8c93a1"
  success: "#17663a"
  warning: "#f2a918"
  critical: "#e3000a"
  on-primary: "#ffffff"

special-surfaces:
  intelligence-gradient:
    allowed: true
    from: "#00008f"
    to: "#4658fc"
    radius: 16px
    textColor: "#ffffff"
    usage: "accent insight/recommendation card only; no readable label in skeleton mode"
```

Rules:

- Primary blue may be used for page titles, selected states, links, primary actions, and selected/important table values.
- Standard operational cards remain white.
- The intelligence gradient is a controlled exception; do not use it on generic KPI, table, form, or navigation surfaces.
- Table header rows use `app-bg` (`#f0f6ff`) in the calibrated listing pattern.

-----

## 2.4 Typography

### 2.4.1 Font Family — DB Web-First (mandatory)

```yaml
font-family:
  policy: "web-first-with-local-fallback"
  requiredPriority: "self-hosted DB webfont first; local DB font second; fallback fonts last"
  primary: "DB Helvethaica X"
  preferred:
    - "DB Helvethaica X"
    - "DB Helvethaica"
    - "DB Heavent"
  webfont:
    requiredWhenAssetsAvailable: true
    preferredFormat: "woff2"
    fontDisplay: "swap"
    canonicalDirectory: "/assets/fonts/"
    allowedHosting:
      - "same-origin self-hosted assets"
      - "approved first-party CDN or object storage"
    externalThirdPartyFontService: "forbidden unless explicitly approved"
  localFallback:
    enabled: true
    priority: "after self-hosted webfont"
  thaiFallback:
    - "Noto Sans Thai"
    - "Leelawadee UI"
    - "Tahoma"
  systemFallback:
    - "Arial"
    - "sans-serif"
  scope: "all UI text, form controls, tables, buttons, charts, navigation, overlays"
```

Mandatory rules:

- The implementation must **not depend on DB Font being installed on the user's device** when approved webfont assets are available.
- Load the approved **self-hosted DB webfont first**, preferably as `.woff2`.
- If the webfont cannot be loaded, try the supported DB font installed locally.
- Only after both webfont and local DB font are unavailable may the browser use the Thai/system fallback stack.
- Do not silently replace an available DB font with Inter, Roboto, Arial, or another generic UI font.
- Do not fetch DB Font from an unapproved third-party font service. Same-origin assets, approved first-party CDN, or approved object storage are allowed.
- Do not embed or redistribute DB Font files unless the font license permits webfont embedding/distribution.
- Font loading must not change typography tokens, component dimensions, or layout contracts.
- Apply the same font stack to `html`, `body`, `button`, `input`, `select`, `textarea`, table content, SVG text, and UI overlays where supported.

Canonical webfont asset names:

```text
/assets/fonts/DBHelvethaicaX-Regular.woff2
/assets/fonts/DBHelvethaicaX-Medium.woff2
/assets/fonts/DBHelvethaicaX-Bold.woff2
```

Canonical CSS:

```css
@font-face {
  font-family: "DB Helvethaica X";
  src:
    url("/assets/fonts/DBHelvethaicaX-Regular.woff2") format("woff2"),
    local("DB Helvethaica X"),
    local("DB Helvethaica");
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "DB Helvethaica X";
  src:
    url("/assets/fonts/DBHelvethaicaX-Medium.woff2") format("woff2"),
    local("DB Helvethaica X Medium"),
    local("DB Helvethaica Medium");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "DB Helvethaica X";
  src:
    url("/assets/fonts/DBHelvethaicaX-Bold.woff2") format("woff2"),
    local("DB Helvethaica X Bold"),
    local("DB Helvethaica Bold");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}

:root {
  --ah-font-primary: "DB Helvethaica X", "DB Helvethaica", "DB Heavent",
                     "Noto Sans Thai", "Leelawadee UI", Tahoma, Arial, sans-serif;
}

html,
body,
button,
input,
select,
textarea {
  font-family: var(--ah-font-primary);
}
```

Implementation behavior:

1. Web deployment with approved `.woff2` assets → use the self-hosted DB webfont.
2. Missing/blocked webfont asset → fall back to locally installed DB Font.
3. DB Font unavailable → fall back to the defined Thai/system stack.
4. Never change the typography scale to compensate for a missing font.

### 2.4.2 Typography Scale

The canonical DB styles map as follows:

```yaml
font-style-map:
  "55 Regular": 400
  "75 Bd": 700
```

Use only the following primary scale unless a component contract explicitly defines an exception:

```yaml
typography:
  metric-xl:     { size: 40px, weight: 700, lineHeight: 46px }
  display-xl:    { size: 32px, weight: 700, lineHeight: 42px }  # page title
  heading-lg:    { size: 24px, weight: 700, lineHeight: 30px }  # card/section title
  heading-md:    { size: 20px, weight: 700, lineHeight: 28px }
  body-lg:       { size: 20px, weight: 400, lineHeight: 28px }  # primary table/nav/content text
  body-md:       { size: 16px, weight: 400, lineHeight: 24px }
  body-sm:       { size: 14px, weight: 400, lineHeight: 20px }
  body-xs:       { size: 12px, weight: 400, lineHeight: 18px }
  button-md:     { size: 16px, weight: 700, lineHeight: 24px }
```

Rules:

- Page titles use `32 / 42 / 700` and primary blue.
- Card and table-section titles use `24 / 30 / 700` and deep ink.
- Primary table cells and sidebar menu labels use `20 / 28 / 400`.
- Small badges use `14 / 20 / 400` unless the badge component variant specifies otherwise.
- Do not restore presentation-scale 48px headings for operational screens.

### Typography utility classes

```yaml
typography-classes:
  .ah-metric-xl:  "40px / 46px / 700"
  .ah-display-xl: "32px / 42px / 700"
  .ah-heading-lg: "24px / 30px / 700"
  .ah-heading-md: "20px / 28px / 700"
  .ah-body-lg:    "20px / 28px / 400"
  .ah-body-md:    "16px / 24px / 400"
  .ah-body-sm:    "14px / 20px / 400"
  .ah-body-xs:    "12px / 18px / 400"
  .ah-button-md:  "16px / 24px / 700"
```

## 2.5 Radius / Spacing / Shadows / Breakpoints

```yaml
rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  full: 100px
  chip: 999px
  rail: 1000px
  circle: 9999px

spacing:
  "4": 4px
  "8": 8px
  "10": 10px
  "12": 12px
  "16": 16px
  "20": 20px
  "24": 24px
  "32": 32px

shadows:
  card: "0px 4px 8px rgba(150,167,214,0.15)"
  none: "none"

breakpoints:
  wide: 1440px
  desktop: 1280px
  tablet: 1024px
  mobile: 768px
```

Spacing rules:

- Component internals primarily use 4 / 8 / 12 / 16.
- Navigation grouping uses 24.
- 10px is allowed for icon/menu/component gaps where specified.
- 20px is allowed for search composition and other explicitly calibrated gaps.
- 32px is reserved for larger container padding or page-level separation.

-----

# 3. App Shell

```yaml
app-shell:
  referenceViewportWidth: 1280px
  sidebarWidth: 200px
  mainPaneReferenceWidth: 1080px
  mainPaneWidth: "calc(100vw - 200px)"
  contentGutter: 16px
  minHeight: 100vh
  background: "{colors.canvas}"
  mainContentBackground: "{colors.app-bg}"

  rules:
    - "At the 1280px desktop baseline: 200px sidebar + 1080px main pane"
    - "Main pane fills all remaining viewport width; do not add a 1240px fixed inner wrapper"
    - "Primary content sections use 16px horizontal gutters inside the main pane"
    - "Sidebar remains a white surface"
    - "Topbar is transparent over the main pane"
```

## Rules

- Sidebar width MUST remain 200px on desktop.
- At 1280px viewport width, the main pane MUST resolve to 1080px.
- Main pane width is fluid at wider desktop sizes.
- Main content background uses `#f0f6ff` for the calibrated operational/listing pages.
- Primary white cards sit directly on the app background with 16px page gutters.
- Do not create an extra centered desktop canvas that shrinks the main pane.

-----

# 4. Sidebar System

The sidebar keeps the calibrated shell geometry. In design-only output it follows the global Full Data Skeleton Privacy System in Section 5 and exposes no readable navigation or product content.

## Sidebar Geometry

```yaml
sidebar:
  width: 200px
  background: "{colors.canvas}"
  shadow: "{shadows.card}"

sidebar-header:
  height: 64px
  padding: 16px

sidebar-item-slot:
  height: 32px
  paddingRight: 12px
  iconGap: 10px

sidebar-group-stack:
  gap: 24px
```

## Sidebar Skeleton Privacy Mode — Mandatory for Mockups

```yaml
sidebar-content-policy:
  mockupMode: "skeleton-only"
  appliesWhen:
    - "UI is generated from this Design System alone"
    - "navigation data has not been explicitly provided and approved for display"
    - "demo, review, handoff, or prototype output must avoid product-data leakage"

  forbiddenInMockup:
    - "real navigation labels"
    - "real routes or URLs"
    - "menu keys or internal identifiers"
    - "real navigation hierarchy or item counts derived from product data"
    - "semantic navigation icons that reveal menu meaning"
    - "selected route, selected menu label, or active destination"

  allowedInMockup:
    - "neutral skeleton bars"
    - "neutral geometric icon placeholders"
    - "generic placeholder grouping used only to demonstrate spacing"

  runtimeBinding:
    rule: "Real navigation content may be injected only by the explicit runtime/product-data layer. It must not be inferred from this document."
```

## Sidebar Skeleton Anatomy

```yaml
sidebar-skeleton:
  headerPlaceholder:
    height: 20px
    width: 92px
    radius: 8px

  groupPlaceholder:
    title:
      height: 14px
      widthRange: "64px–96px"
      radius: 7px
    gapToItems: 8px

  itemPlaceholder:
    height: 32px
    icon:
      size: 18px
      radius: 4px
    label:
      height: 12px
      widthRange: "84px–124px"
      radius: 6px
    gap: 10px

  grouping:
    placeholderGroups: "2–3 generic groups"
    placeholderRowsPerGroup: "3–4 generic rows"
    rule: "Placeholder counts MUST be generic and MUST NOT mirror the actual navigation hierarchy or route count."

  visual:
    base: "{colors.surface-muted}"
    highlight: "{colors.hairline-soft}"
    animation: shimmer

  interaction:
    selectedState: disabled
    rowLinks: disabled
    semanticIcons: disabled

  accessibility:
    skeletonContent: "aria-hidden=true"
    containerLabel: "Navigation placeholder"
```

## Production Selected Item Style

The production runtime may use this state **only after explicit navigation data is bound**. It MUST NOT appear in skeleton-only mockups.

```yaml
sidebar-selected-production-only:
  background: "{colors.primary}"
  text: "{colors.on-primary}"
  radius: "0 1000px 1000px 0"
```

## Sidebar Constraints

- Desktop sidebar width = 200px.
- Desktop placeholder row slot = 32px.
- Group separation = 24px.
- Skeleton placeholders must never contain readable navigation text.
- Skeleton placeholders must never contain `href`, route strings, menu keys, or business/navigation identifiers.
- Do not infer a selected item in mockup mode.
- Do not use real menu icons in mockup mode; use neutral placeholder blocks.
- Sidebar content may scroll vertically when viewport height is constrained.
- Real navigation content is outside the scope of this Design System and must come from an explicitly supplied runtime data source.

-----

# 5. Full Data Skeleton Privacy System

This Design System defaults to **full data skeleton mode** for every design-only mockup, review artifact, prototype, or generated HTML/React output when explicit display-safe runtime content has not been supplied.

The goal is to preserve visual fidelity while ensuring the artifact and its source code do not reveal readable product, customer, navigation, role, workflow, or business data.

```yaml
full-data-skeleton-policy:
  defaultMode: skeleton-only
  dataSafeByDefault: true
  contentSource: none

  appliesTo:
    - sidebar navigation
    - page title and subtitle
    - breadcrumbs and context chips
    - card and section titles
    - KPI labels and values
    - table toolbar title
    - table tabs
    - table header labels
    - table body values
    - badges and statuses
    - form labels, values, helper text, and validation copy
    - chart legends, labels, values, and annotations
    - button text and action labels
    - search placeholder text
    - pagination labels or counts
    - role names and permission labels
    - customer, product, policy, application, campaign, financial, date, phone, and identifier data

  forbiddenInSkeletonMode:
    - readable business or product copy
    - mock names or realistic personal data
    - real or invented financial values
    - dates, phone numbers, emails, IDs, policy/application numbers
    - navigation labels, routes, hrefs, menu keys, or selected destinations
    - semantic column names or field names
    - semantic status labels or badge text
    - role names, team names, permission labels, or visibility rules
    - hidden content that exposes the above through comments, data attributes, IDs, class names, aria-labels, titles, or script constants
    - semantic icons whose glyph/name reveals protected content when a neutral placeholder can communicate geometry

  allowedInSkeletonMode:
    - neutral skeleton bars and blocks
    - neutral geometric icon placeholders
    - generic width variants such as short/medium/wide
    - geometry-only component names such as column-1, card-a, control-a
    - generic accessibility text such as "Loading interface" or "Placeholder control"

  runtimeBinding:
    rule: "Readable content may be injected only from an explicitly supplied display-safe runtime/product-data source. Never infer content from page geometry or from this document."
```

## 5.1 Skeleton Visual Tokens

```yaml
skeleton:
  base: "{colors.surface-muted}"
  highlight: "{colors.hairline-soft}"
  radiusText: 6px
  radiusTitle: 8px
  radiusIcon: 4px
  shimmerDuration: 1600ms
  animation: shimmer

skeleton-widths:
  xs: 44px
  sm: 72px
  md: 96px
  lg: 124px
  xl: 168px
  fluid: "60%–88% of available slot"
```

## 5.2 Skeleton Anatomy Rules

- Preserve the real component's **height, padding, gap, radius, alignment, and responsive behavior**.
- Replace readable text with neutral bars sized to demonstrate hierarchy only.
- Replace data-bearing icons with neutral square/circle placeholders when their semantic glyph could expose context.
- Table header cells use skeleton bars; never render real column names in design-only output.
- Table body cells use varied skeleton widths that are generic and not derived from actual values.
- Badges render as unlabeled 20px pill skeletons.
- Forms render field shells and neutral label/value skeletons; no real placeholder text.
- Charts render axes/series geometry only; legends and values are skeletonized.
- Buttons may preserve button geometry but text is replaced with a centered skeleton bar; do not infer action wording.
- Topbar controls may preserve geometry but should not reveal search, notification, profile, or workflow meaning through readable copy or semantic icon names in privacy-strict artifacts.

## 5.3 Source-Code Privacy Rules

```yaml
source-privacy:
  html:
    forbidReadableProtectedContent: true
    forbidSemanticDataAttributes: true
    forbidBusinessComments: true
    forbidProtectedHrefValues: true
    preferGenericClassNamesForContentSlots: true
  react:
    forbidHardcodedMockData: true
    skeletonPropsOnlyUntilRuntimeBinding: true
  accessibility:
    skeletonRegions: "aria-hidden=true where appropriate"
    loadingContainer: "aria-busy=true"
    genericLabelsOnly: true
```

- Do not hide protected copy with CSS; remove it from the DOM/source entirely.
- Do not place protected content in `title`, `aria-label`, `alt`, `data-*`, comments, JavaScript arrays, object keys, IDs, or class names.
- Generic structural terms such as `sidebar`, `table`, `card`, `row`, `column-1`, and `placeholder` are allowed.

-----

# 6. Topbar & Search

```yaml
topbar:
  height: 64px
  padding: 16px
  background: transparent
  borderBottom: none

topbar-layout:
  width: "100% of main pane"
  referenceWidth: 1080px
  gap: 24px
  alignItems: center
  titleZone:
    flex: 1
    gap: 16px
  rightZone:
    width: 370px
    component: desktop-search

topbar-context-title:
  enabled: true
  fontSize: 32px
  lineHeight: 42px
  fontWeight: 700
  color: "{colors.primary}"

search-composite:
  width: 370px
  height: 40px
  internalGap: 20px
  inputWidth: 270px
  actionZoneWidth: 80px

search-control:
  height: 40px
  borderColor: "{colors.field-border}"
  radius: "{rounded.circle}"
```

Topbar rules:

- In skeleton-only mockup mode, replace the readable page title, context chip text, search text, and right-side action semantics with neutral skeleton placeholders while preserving the same geometry.
- Do not store protected topbar copy in DOM attributes, comments, IDs, data attributes, or JavaScript constants.

- Topbar is a 64px transparent frame with 16px padding.
- Page title is part of the topbar/header area and uses `32 / 42 / 700` in primary blue.
- At the 1280px baseline the topbar spans the full 1080px main pane.
- Search/action composite occupies 370px and stays right aligned.
- Do not create a separate white header band behind the topbar.
- Do not replace the compact 32px page title with a 48px marketing heading.
- Notification/profile controls live inside the right-side composite when the page uses them.
- Search fields use 40px controls and the approved field border treatment.

-----

# 7. Icon System

```yaml
icon-system:
  style: outline
  strokeWidth: 1.8
  defaultSize: 18px
  color: currentColor
  activeColor: "{colors.on-primary}"

icon-library:
  preferred:
    - lucide
    - heroicons
    - phosphor-light

icon-rendering:
  type: svg
  stroke: currentColor
  fill: none
  strokeLinecap: round
  strokeLinejoin: round

icon-alignment:
  sidebar:
    size: 18px
    gap: 10px

  topbar:
    size: 20px

  table-action:
    size: 18px

sidebar-icon:  { size: 18px, color: currentColor }
table-icon:    { size: 16px, color: currentColor }
action-icon:   { size: 20px, color: currentColor }
```

Rules:

- In full skeleton mode, use neutral non-semantic icon placeholders for content-bearing actions; do not expose protected workflow meaning through icon names or glyphs.
- Use outline SVG icons only for explicitly supplied display-safe runtime UI
- No emoji icons in production UI
- Icons inherit text color via `currentColor
- “Do not render placeholder square icons”
- “All production UI must use real SVG icons”
- “Prefer outline enterprise icon style”
- “Icons must visually match Design System density”
- “Sidebar icons should feel lightweight and operational”

-----

# 8. Shared Components

## 8.1 Buttons

```yaml
button-shape:
  radius: "{rounded.full}"
  gap: 4px

button-md:
  height: 40px
  padding: "6px 16px"
  font: "{typography.button-md}"

button-xss-primary:
  height: 28px
  padding: "4px 8px"

button-xs-ghost:
  height: 24px
  padding: "0"

button-xss-ghost:
  height: 20px
  padding: "0"

button-primary:
  background: "{colors.primary}"
  border: "1px solid {colors.primary}"
  color: "{colors.on-primary}"

button-outline:
  background: transparent
  border: "1px solid {colors.primary}"
  color: "{colors.primary}"

button-ghost:
  background: transparent
  border: none
  color: "{colors.primary}"
```

Rules:

- Primary and outline medium buttons use 40px height and `6px 16px` padding.
- Compact primary CTA may use 28px height and `4px 8px` padding.
- Ghost actions may use 24px or 20px compact variants.
- Buttons always use the 100px pill radius.
- All variants require hover, active, focus, and disabled states.

-----

## 8.2 KPI Cards

```yaml
kpi-grid:
  columns: 4
  gap: 16px
  marginBottom: 24px

kpi-layout:
  gap: 6px

kpi-card:
  minHeight: 92px
  height: auto
  background: "{colors.canvas}"
  border: "1px solid {colors.hairline-soft}"
  radius: "{rounded.sm}"
  padding: "24px 32px 28px"
  shadow: none

kpi-title:   { fontSize: 16px, fontWeight: 700, lineHeight: 24px, color: "{colors.ink}" }
kpi-value:   { fontSize: 30px, fontWeight: 700, lineHeight: 34px, color: "{colors.primary}" }
kpi-note:    { fontSize: 14px, fontWeight: 700, lineHeight: 20px, color: "{colors.slate}" }
```

Rules:

- “KPI card must use min-height instead of fixed height when large values are used”
- “KPI card requires sufficient bottom padding”
- “KPI note must never visually touch the bottom edge”
- “Operational KPI cards should feel balanced vertically”
- Operational dashboard KPI cards use white background
- Primary value may use primary blue
- Avoid colorful KPI cards unless explicitly marked as highlight
- “Operational KPI cards should feel compact and information-dense”
- “Avoid oversized presentation-style KPI cards”
- “Reduce empty vertical space inside KPI cards”
- “KPI cards should visually align with enterprise dashboard density”

## 8.3 Dashboard Card

```yaml
card-dashboard:
  background: "{colors.canvas}"
  border: "1px solid {colors.hairline-soft}"
  radius: "{rounded.md}"
  padding: "16px"
```

## 8.4 Filter Bar

```yaml
filter-bar:
  background: transparent
  border: none
  radius: 0
  padding: 0
  shadow: none
  marginBottom: 16px
  alignItems: center
  justifyContent: space-between
  gap: 16px

filter-layout:
  gap: 8px
  alignItems: center
  flexWrap: wrap

filter-chip:
  height: 36px
  paddingX: 16px
  radius: "{rounded.circle}"
  fontSize: 14px
  fontWeight: 700
  background: "{colors.canvas}"
  border: "1px solid {colors.hairline}"
  color: "{colors.ink}"

filter-chip-active:
  background: "{colors.primary}"
  color: "{colors.on-primary}"
  borderColor: "{colors.primary}"
