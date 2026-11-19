# AI Design System — Master

```yaml
version: 2.6
revision: 2026-11-19-home-figma-alignment
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
    9.6 Figma Desktop/Home calibrated variant (1440px wide reference)
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
  --ah-home-hero-bg: #5257f5; /* calibrated Desktop/Home only */
  --ah-home-loading-base: #d4d7dd; /* runtime Home loading only */

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
  --ah-search-width: 370px; /* operational default */
  --ah-home-search-width: 292px;
  --ah-home-search-input-width: 200px;
  --ah-home-search-gap: 12px;
  --ah-search-height: 40px;
  --ah-sidebar-item-height: 32px;
  --ah-home-sidebar-label-size: 16px;
  --ah-home-sidebar-label-line-height: 24px;
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
  --ah-home-loading-pill-radius: var(--ah-radius-full);
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
  --ah-home-right-card-shadow: 0px 4px 20px rgba(0,0,0,0.10);
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
  body-lg:       { size: 20px, weight: 400, lineHeight: 28px }  # primary table/operational content text
  body-md:       { size: 16px, weight: 400, lineHeight: 24px }
  body-sm:       { size: 14px, weight: 400, lineHeight: 20px }
  body-xs:       { size: 12px, weight: 400, lineHeight: 18px }
  button-md:     { size: 16px, weight: 700, lineHeight: 24px }
```

Rules:

- Page titles use `32 / 42 / 700` and primary blue.
- Card and table-section titles use `24 / 30 / 700` and deep ink.
- Primary table cells and default operational navigation use `20 / 28 / 400`; the **explicit Desktop/Home sidebar** uses `16 / 24 / 400` (see Section 4), without changing table typography.
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
  .ah-sidebar-home-label: "16px / 24px / 400" # Home production variant only
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

sidebar-home-production-label:
  font: "{typography.body-md}"
  fontSize: "var(--ah-home-sidebar-label-size)"
  lineHeight: "var(--ah-home-sidebar-label-line-height)"
  fontWeight: 400
  figmaTextStyle: "DB Helvethaica X / 55 Regular"
  scope: "Desktop/Home with explicitly supplied display-safe runtime navigation only"
  otherPageFallback: "Default operational navigation uses 20/28/400 until other Figma screens are validated"
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

## 5.4 Distinct Skeleton Modes — Privacy-safe vs Runtime Loading

These are **different content permissions**, not merely alternate colors. The design-only default remains privacy-safe, regardless of how the production Figma screen looks.

```yaml
skeleton-modes:
  privacy-safe-skeleton:
    default: true
    appliesWhen: "design-only or no explicitly supplied display-safe runtime data"
    chrome: "neutral placeholders; no readable navigation, selected route, page or section title, action name or semantic icon"
    palette: "{skeleton.base} / {skeleton.highlight}"
    geometry: "{skeleton.radiusText} / {skeleton.radiusTitle} / {skeleton.radiusIcon}"
    sourcePrivacy: "Section 5.3 remains mandatory"

  loading-skeleton:
    default: false
    appliesWhen: "actual application loading, with approved static navigation/chrome explicitly bound by runtime"
    chrome: "approved static navigation, active state and stable section headings MAY remain visible"
    loadingSlots: "data-bearing content replaced with neutral shapes; no unapproved business/customer values"
    homeVariant: "Section 9.6; uses the separately measured Figma Home loading appearance"
    fallback: "privacy-safe-skeleton when approved runtime chrome is not available"
```

- **Do not** use the Figma screenshot itself as authorization to copy real navigation labels, financial figures, workflow names or routes into design-only mockups, test fixtures or source code.
- Loading placeholders are `aria-hidden=true` where appropriate; mark loading regions `aria-busy=true` and provide accessible non-sensitive loading status.
- This section changes neither the privacy restrictions in Sections 4–5 nor the runtime content boundary in Section 20.

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
    width: 370px # operational default; Desktop/Home overrides to 292px
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

home-topbar-search:
  scope: "Desktop/Home only; measured at 1440px viewport"
  width: 292px
  height: 40px
  internalGap: 12px
  inputWidth: 200px
  inputHeight: 40px
  actionZoneWidth: 80px
  actionZoneHeight: 32px
  rightAligned: true
  cssWidthToken: "var(--ah-home-search-width)"

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
- Operational search/action composite occupies 370px and stays right aligned; only Desktop/Home uses the measured `home-topbar-search` 292px variant. Do not change Listing/Operational Search until their own Figma screens are audited.
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

filter-select:
  height: 36px
  radius: "{rounded.sm}"
  border: "1px solid {colors.hairline}"
  paddingX: 12px
  background: "{colors.canvas}"
  color: "{colors.ink-deep}"
```

Rules:

- Operational listing pages include the shared filter/search geometry when the layout requires it
- Active chips use primary blue
- Select inputs use subtle borders
- Filter chips must include active and focus states
- “Listing filter bars should not render an additional white container unless explicitly required”
- “Filter chips may sit directly on app background”
- “Avoid double-layer surface effect”

## 8.5 Enterprise Data Table

```yaml
table-enterprise:
  background: "{colors.canvas}"
  radius: "{rounded.lg}"
  shadow: none
  overflow: hidden
  outerPadding: "12px 16px 16px"
  sectionGap: 12px

# Table toolbar/header above tabs and rows
table-toolbar:
  height: 40px
  title:
    fontSize: 24px
    fontWeight: 700
    lineHeight: 30px
    color: "{colors.ink-deep}"
  layoutGap: 8px

table-search-filter:
  width: 344px
  height: 40px
  gap: 16px
  inputWidth: 230px
  buttonHeight: 40px

table-tabs:
  height: 40px
  gap: 8px

table-tab-chip:
  height: 40px
  padding: "4px 12px"
  gap: 8px
  radius: "{rounded.chip}"

# Data grid density variants
table-density-variant:
  default: compact
  variants:
    compact:
      headerHeight: 44px
      rowHeight: 44px
      rowPadding: "8px 16px"
      columnGap: 16px
      bodyFontSize: 20px
      bodyLineHeight: 28px
      bodyWeight: 400
      headerBackground: "{colors.app-bg}"
      rowBackground: "{colors.canvas}"
      alternateRowBackground: "{colors.surface-muted}"
      alternateRow: optional

    comfortable:
      headerHeight: 44px
      rowHeight: 48px
      rowPadding: "8px 16px"
      columnGap: 16px
      bodyFontSize: 20px
      bodyLineHeight: 28px
      bodyWeight: 400
      headerBackground: "{colors.app-bg}"
      rowBackground: "{colors.canvas}"
      alternateRowBackground: "{colors.surface-muted}"
      alternateRow: optional

# Status/source badges inside table rows
table-badge:
  height: 20px
  paddingX: 8px
  radius: "{rounded.rail}"
  fontSize: 14px
  lineHeight: 20px
  fontWeight: 400

# Header label instance
header-table-label:
  height: 28px
  gap: 4px
  sortIcon: allowed
```

### Privacy-safe listing column geometry

Column geometry is design data; semantic column meaning is runtime/product data and must not appear in skeleton-only artifacts.

```yaml
listing-geometry-a:
  column-1: 140px
  column-2: 130px
  column-3: 130px
  column-4: 130px
  column-5: 80px
  column-6: 100px
  column-7: 112px
  column-8: 100px
  gap: 16px

listing-geometry-b:
  column-1: 124px
  column-2: 140px
  column-3: 140px
  column-4: 140px
  column-5: 140px
  column-6: 100px
  column-7: 100px
  column-8: 110px
  column-9: 94px
  gap: 16px
```

### Table rules

- Table card radius = 16px.
- Table card uses `12px 16px 16px` internal padding and 12px vertical section gap.
- Header row = 44px with 8px vertical / 16px horizontal padding.
- Compact body row = 44px; comfortable body row = 48px.
- Primary body cells use DB `20 / 28 / 400`.
- Primary/linked values may use primary blue; ordinary body text uses deep ink/ink.
- Header background uses app background blue (`#f0f6ff`), not dark primary blue.
- Badges are 20px high with 8px horizontal padding and 1000px radius.
- No generic card shadow on the table container.
- Search/filter composite = 344x40 with a 230px input and 40px outline action.
- Tabs remain 40px high with pill chips.
- Use horizontal scrolling rather than shrinking calibrated columns below readable width.

-----

## 8.6 Side Panel

```yaml
side-panel:
  width: 320px
  gap: 16px

side-panel-card:
  background: "{colors.canvas}"
  border: "1px solid {colors.hairline-soft}"
  radius: "{rounded.md}"
  padding: 16px
  shadow: "{shadows.card}"

side-panel-title:
  fontSize: 20px
  fontWeight: 700
  lineHeight: 28px
  color: "{colors.ink-deep}"

side-panel-item:
  background: "{colors.canvas}"
  border: "1px solid {colors.hairline-soft}"
  radius: "{rounded.md}"
  padding: 14px
```

Rules:

- Desktop operational listing pages may use `1fr + 320px` layout when side panel exists
- On tablet/mobile, side panel moves below content

## 8.7 Pagination

```yaml
pagination:
  height: 40px
  gap: 8px
  alignItems: center
  justifyContent: flex-end

pagination-item:
  size: 32px
  radius: "{rounded.sm}"
  border: "1px solid {colors.hairline}"
  background: "{colors.canvas}"
  color: "{colors.ink}"

pagination-item-active:
  background: "{colors.primary}"
  color: "{colors.on-primary}"
  borderColor: "{colors.primary}"
```

Rules:

- Pagination items must include active, hover, focus, and disabled states

## 8.8 Component Variants Registry

```yaml
sidebar:
  variants: [default, compact, drawer]

kpi-card:
  variants: [default, highlight, compact]

enterprise-table:
  features: [sticky-header, loading-state, empty-state, pagination, sorting, row-hover]

filter-bar:
  variants: [listing, dashboard, compact]

modal:
  sizes: [sm, md, lg, full]

form-input:
  variants: [default, error, disabled]
```

## 8.9 Component Reuse Rules

- Never duplicate sidebar markup with different spacing or typography
- Never create page-specific table styles for shared operational listing pages
- Never create page-specific button radius
- Never use decorative gradients, glow effects, or oversized cards
- If a new page needs a list → use `EnterpriseDataTable` first
- If a new page needs filters → use `FilterBar` first
- If a new page needs page actions → use `button-primary` and `button-secondary` first

-----

# 9. Layout System

## 9.1 Page Header Pattern

The calibrated operational screens use the page title inside the 64px topbar/header,
not a separate oversized marketing header block.

```yaml
page-header:
  placement: "inside topbar"
  height: 64px
  padding: 16px
  background: transparent
  title:
    fontSize: 32px
    fontWeight: 700
    lineHeight: 42px
    color: "{colors.primary}"
  contextualChip:
    optional: true
    height: 40px
    radius: "{rounded.chip}"
  rightComposite:
    width: 370px
    height: 40px
```

Rules:

- Operational/listing pages do not add a second 48px page heading below the topbar.
- Section/card titles below the topbar use `24 / 30 / 700`.
- Context chips may sit beside the page title when required.
- Keep title and search/actions vertically centered within the 64px header.

-----

## 9.2 Layout Density & Rhythm

```yaml
density-rhythm:
  mainPaneGutter: 16px
  majorSectionGap: 16px
  cardGap: 8px
  cardPaddingCompact: 12px
  cardPaddingStandard: 16px
  tableInternalGap: 12px
  toolbarGap: 8px
  navigationGroupGap: 24px
```

Rules:

- Operational pages use dense 8/12/16px rhythm.
- Main content blocks sit 16px from main-pane edges.
- Adjacent summary cards commonly use 8px gaps.
- Avoid arbitrary 32–48px whitespace between operational sections.
- Use 24px mainly for navigation grouping, not as the default card gap.

-----

## 9.3 Strict Layout Grid

```yaml
strict-grid:
  desktopBaseline:
    viewport: 1280px
    sidebar: 200px
    mainPane: 1080px
    equation: "200 + 1080 = 1280"
  mainPane:
    width: "calc(100vw - 200px)"
    horizontalGutter: 16px
  innerContentReference:
    width: 1048px
    equation: "1080 - 16 - 16 = 1048"
  tableInnerReference:
    width: 1016px
    equation: "1048 - 16 - 16 = 1016"
```

### Strict layout constraints

- At 1280px desktop: sidebar = 200px and main pane = 1080px.
- Main pane fills remaining width on larger desktops; it is not capped at 1240px.
- Standard page horizontal gutter = 16px.
- Standard full-width content card at the baseline = 1048px.
- A 1048px table card with 16px left/right inner padding yields a 1016px working table width.
- Use Auto Layout / flex/grid relationships; do not hard-code absolute positions for structural page content.

-----

## 9.4 Allowed Shared Sections

These may appear on ANY page:

- Sidebar, Topbar, Page Header, Search
- KPI Cards, Dashboard Cards, Tables, Charts
- Filter Bars, Side Panels, Summary Blocks
- Empty States, Pagination

## 9.5 Forbidden Global Sections

These belong ONLY to Home page. Must NEVER auto-inherit into other pages:

- Hero Banner
- Shortcut Menu
- Qualification Section
- Product-specific side panel
- Floating Live Chat
- Home Announcement Card
- Marketing Cards
- Gradient Summary Blocks

## 9.6 Figma Desktop/Home — Calibrated Home-only Component Contracts

This is a **page-specific 1440px wide reference**, measured from Figma `Desktop/Home`, and must not override the 1280px operational baseline or be auto-inherited by Listing/Form/Table pages. Measurements refer to [screen 3101:118014](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=3101-118014), with [loading screen 6142:388916](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=6142-388916) for skeleton state. **No product names, copy, values, routes or UI data from Figma are part of this contract.**

```yaml
home-desktop-wide-reference:
  referenceViewport: 1440px
  sidebar: 200px
  mainPane: 1240px # 1440 - 200; fluid above/below, never a fixed inner wrapper
  mainPaneBackground: "{colors.canvas}" # observed Home; operational pages retain app-bg
  contentGutter: 16px
  innerContentWidthAt1440: 1208px
  topbar: { height: 64px, searchVariant: home-topbar-search }
  sidebarLabelVariant: sidebar-home-production-label

  heroBanner:
    width: "100% of main pane (1240px at 1440)"
    heightAt1440: 277px
    background: "var(--ah-home-hero-bg)" # solid #5257f5 in inspected instance
    title: "40px / 46px / 700, DB Helvethaica X 75 Bd"
    headerOverlay: "64px header within the Home banner region"
    semantics: "geometry only in privacy-safe-skeleton"

  shortcutMenu:
    container: "1208 x 126px"
    itemReference: "approximately 121 x 80px"
    heading: "24px / 30px / 700"
    itemCaption: "16px / 16px / 400, scoped only to the Home quick-menu slot"
    privacy: "generic placeholder grouping; do not infer or mirror actual menu count or meaning"

  annualOverview:
    section: "1208 x 284px"
    contentCards: "two cards, 596 x 208px each, 16px gap"
    radius: "{rounded.sm}"
    fill: "{colors.primary-soft} with a 30%-opacity white overlay"

  personalSummary:
    section: "1208 x 182px"
    cardReference: "290 x 128px; 16px gaps at 1440px"
    radius: "{rounded.sm}"
    fill: "{colors.primary-soft} with a 30%-opacity white overlay"
    shadow: none # the inspected blue shadow effect exists but visible=false
    title: "32px / 42px / 700 where a metric-card heading is used"

  supportRegion:
    tilesContainer: "861 x 230px"
    sampleTile: "approximately 134 x 88px"
    sampleTileFill: "{colors.primary-soft}"
    sampleTileRadius: "{rounded.sm}"
    rightCard: "323 x 334px, white, radius 12px"
    rightCardShadow: "var(--ah-home-right-card-shadow)" # visible 0 4px 20px rgba(0,0,0,.10)
    columnGap: 24px

  announcement:
    cardReference: "330 x 110px"
    cardRadius: "{rounded.sm}"
    content: "runtime-supplied only"

  floatingChat:
    control: "56 x 56px"
    referenceContainer: "120 x 120px in the inspected screenshot"
    visibility: "Home-only; may vary by scenario"

home-loading-skeleton:
  mode: loading-skeleton # never the default privacy-safe-skeleton
  placeholderFill: "var(--ah-home-loading-base)" # observed #d4d7dd
  pillRadius: "var(--ah-home-loading-pill-radius)" # 100px
  measuredPlaceholderHeights: [28px, 18px, 10px]
  measuredBannerBarWidths: [160px, 286px, 368px]
  navAndSectionChrome: "approved runtime-only; design-only mode must keep these neutral"
```

Home-specific typography maps to existing `metric-xl` (hero), `display-xl` (Home metric titles), `heading-lg` (section title) and `body-md` (sidebar); the 16/16 quick-menu caption is a **slot exception**, not a new global body scale.

**Scope / responsive safeguards:** Values above were **observed only at the 1440px Desktop/Home Figma reference**. Implement using flex/grid and fluid main-pane sizing; for smaller screens follow Section 13 and QA each breakpoint. Do not scale or hardcode this 1440px geometry into mobile/tablet without their own measured reference. Preserve Section 5's privacy-safe placeholders when runtime content has not been explicitly approved. Never apply these Home cards/shadows/hero sections to operational or listing pages.

-----

# 10. Page Type System

```yaml
page-types:
  home:
    density: compact
    useHomeOnlySections: true
    referenceGeometry: "Section 9.6, Desktop/Home at 1440px"
    contentModeInMockup: skeleton-only
    productionLoadingMode: "loading-skeleton only with approved runtime chrome (Section 5.4)"

  operational-dashboard:
    density: compact
    useSummary: true
    useTable: true
    useCharts: optional
    contentModeInMockup: skeleton-only

  operational-listing:
    density: compact
    useFilterBar: true
    useEnterpriseTable: true
    useSummary: optional
    useSidePanel: optional
    contentModeInMockup: skeleton-only

  executive-dashboard:
    density: comfortable
    useCharts: true
    useSummaryCards: true
    useTable: optional
    contentModeInMockup: skeleton-only

  detail-page:
    density: medium
    useSidePanel: optional
    useTable: optional
    contentModeInMockup: skeleton-only
```

All page types inherit Section 5. Page type selection controls **layout only**, never readable mock content.

-----

# 11. Privacy-Safe Layout Contracts

These contracts retain only calibrated geometry. Names, labels, navigation destinations, business semantics, table meanings, and readable values are deliberately excluded.

## 11.1 Listing Layout A

```yaml
listing-layout-a:
  pageType: operational-listing
  contentMode: skeleton-only
  desktopBaseline: "1280 = 200 sidebar + 1080 main pane"

  mustUse:
    - SidebarSkeleton
    - TopbarSkeleton
    - SummaryRowSkeleton
    - EnterpriseDataTableSkeleton
    - TableTabsSkeleton
    - SearchFilterSkeleton

  requiredGeometry:
    topbar: "1080 x 64"
    summaryRow: "1080 wide with 16px side gutters"
    summaryRowInternalWidth: 1048px
    summaryGap: 8px
    card-a: "467px wide, radius 16"
    card-b: "342px wide, radius 16"
    card-c: "223px wide, radius 16"
    tableCard: "1048px wide, radius 16"

  table:
    geometry: listing-geometry-a
    density: compact
    headerHeight: 44px
    rowHeight: 44px
    bodyTypography: "20 / 28 / 400"
    headerContent: skeleton
    bodyContent: skeleton
```

## 11.2 Listing Layout B

```yaml
listing-layout-b:
  pageType: operational-listing
  contentMode: skeleton-only
  desktopBaseline: "1280 = 200 sidebar + 1080 main pane"

  mustUse:
    - SidebarSkeleton
    - TopbarSkeleton
    - SummaryRowSkeleton
    - EnterpriseDataTableSkeleton
    - TableTabsSkeleton
    - SearchFilterSkeleton

  requiredGeometry:
    topbar: "1080 x 64"
    summaryRowInternalWidth: 1048px
    summaryGap: 8px
    card-a: "640px wide, radius 16"
    card-b: "400px wide, radius 16"
    tableCard: "1048px wide, radius 16"

  table:
    geometry: listing-geometry-b
    density: comfortable
    headerHeight: 44px
    rowHeight: 48px
    bodyTypography: "20 / 28 / 400"
    headerContent: skeleton
    bodyContent: skeleton
```

## 11.3 Generic Operational Listing

```yaml
generic-operational-listing:
  pageType: operational-listing
  contentMode: skeleton-only
  mustUse:
    - SidebarSkeleton
    - TopbarSkeleton
    - EnterpriseDataTableSkeleton
  mayUse:
    - SummaryRowSkeleton
    - SearchFilterSkeleton
    - TableTabsSkeleton
    - PaginationSkeleton
    - SidePanelSkeleton
  geometry:
    mainPaneGutter: 16px
    cardRadius: 16px
    tableDensity: compact
```

Rules:

- Layout contracts never authorize readable mock data.
- Preserve calibrated geometry before adding decoration.
- Runtime content must be explicitly supplied and display-safe before replacing skeletons.

-----

# 12. Component Architecture Enforcement

## 12.1 Required Shared Components

```yaml
app-shell:
  includes: [SidebarSkeleton, MainPane]
  rules:
    - "Desktop Sidebar = 200px"
    - "MainPane fills the remaining width"
    - "1280px baseline resolves to 1080px MainPane"

page-header:
  includes: [TitleZone, ContextChip, SearchActionComposite]
  rules:
    - "Lives inside 64px topbar"
    - "Title uses 32 / 42 / 700"
    - "Search/action composite is 370x40 when present"

summary-card:
  rules:
    - "Radius = 16px"
    - "White surface by default"
    - "Internal gap generally 8px"
    - "12px or 16px padding depending on pattern"

accent-card:
  rules:
    - "Radius = 16px"
    - "Only shared card allowed to use primary-to-indigo gradient"
    - "Gradient = #00008f to #4658fc"

operational-listing:
  includes:
    - SearchFilterSkeleton
    - TableTabsSkeleton
    - EnterpriseDataTableSkeleton
  rules:
    - "Table toolbar and filters = 40px control height"
    - "Table header = 44px"
    - "Body row = 44px compact or 48px comfortable"
    - "Body text = 20 / 28 / 400"
```

Component reuse rule:

- Reuse existing component anatomy and variants before inventing a visually similar replacement.
- New components must use the token scale and geometry from Sections 2–9.
- Component-level exceptions must be documented in the component contract, not as arbitrary page CSS.

-----

# 13. Responsive Rules

The calibrated source screens define desktop behavior only. Tablet/mobile behavior below is
an implementation adaptation and MUST preserve the desktop component anatomy and typography hierarchy.

## 13.1 Responsive Sidebar Behavior

```yaml
responsive-sidebar-behavior:
  desktop:
    minWidth: 1280px
    behavior: fixed-full-sidebar
    width: 200px
    skeletonLabels: visible

  tablet:
    minWidth: 768px
    maxWidth: 1279px
    behavior: icon-rail-or-drawer
    preferredWidth: 72px
    skeletonLabels: hidden
    tooltip: forbidden-in-skeleton-mode

  mobile:
    maxWidth: 767px
    behavior: drawer
    defaultState: closed
    overlay: true
    width: 280px
    animation: slide-left
```

## 13.2 Responsive Main Pane

```yaml
responsive-main-pane:
  desktop:
    width: "calc(100vw - 200px)"
    gutter: 16px
  tablet:
    width: "remaining viewport after rail/drawer"
    gutter: 16px
  mobile:
    width: "100vw"
    gutter: 16px
```

## 13.3 Responsive Content

- Summary rows may wrap from multi-column to 2-column and then 1-column.
- Preserve 16px card radius and 8–16px internal spacing.
- Tables use horizontal scrolling before reducing the 20px body typography below the defined scale.
- Search/filter controls may wrap, but remain 40px high.
- Header title remains 32/42 where space permits; on very narrow mobile widths, use the nearest defined heading token rather than arbitrary scaling.

## 13.4 Mobile Interaction Rules

- Drawer overlays content and closes after navigation.
- Touch targets for primary actions should be at least 44px even if the desktop visual button is 40px; add hit-area padding without visually enlarging the control when possible.
- Keep the mobile drawer skeleton-only unless explicit runtime navigation data is supplied.
- Do not force the desktop 1080px main pane onto mobile.
- Horizontal table scroll is preferred over destructive column compression.

-----

# 14. State & Interaction System

## 14.1 Interaction States

```yaml
states-required:
  hover:
    transition: "160ms ease"
    opacity: 0.96
  active:
    transform: "scale(0.99)"
  focus:
    outline: "2px solid {colors.primary}"
    outlineOffset: "2px"
  disabled:
    opacity: 0.5
    cursor: "not-allowed"
    pointerEvents: "none"
```

### Required state coverage

- Buttons: hover, active, focus, disabled
- Filter chips: active, focus
- Sidebar items: hover, active, selected
- Table rows: hover only (no active scale)
- Search input: focus ring without adding border in default state
- Pagination items: active, hover, focus, disabled

## 14.2 Loading / Empty / Error States

```yaml
loading-state:
  scope: "default generic and privacy-safe loading; Home runtime loading variant is in Sections 5.4 and 9.6"
  skeletonRadius: 8px
  shimmerOpacity: 0.12

empty-state:
  iconSize: 48px
  spacing: 16px
  align: center
  paddingY: 64px
  background: "{colors.canvas}"
  title:       { fontSize: 20px, fontWeight: 700, lineHeight: 28px, color: "{colors.ink-deep}" }
  description: { fontSize: 14px, fontWeight: 400, lineHeight: 20px, color: "{colors.slate}", maxWidth: 420px }

error-state:
  border: "1px solid #ffe0e0"
  background: "#fff7f7"
  radius: 12px
```

Rules:

- Prefer skeleton loading over spinner
- Empty states must stay minimal — no illustration-heavy visuals
- Error cards stay compact
- Avoid modal-only errors
- Every listing page must support empty state

## 14.3 Data States Contract

```yaml
data-states:
  loading: skeleton
  success: visible
  empty: empty-state
  error: compact-error-card
  restricted: permission-card
```

Rules:

- Every table must support loading state
- Every operational listing must support empty state
- Permission denied state uses neutral background

## 14.4 Motion System

```yaml
motion:
  durationFast: 120ms
  durationNormal: 180ms
  durationSlow: 260ms
  easingStandard: ease-out
  easingInOut: ease-in-out
```

### Allowed motion

- fade
- slide-up
- slide-left
- subtle scale (scale-soft)
- opacity hover

### Forbidden motion

- bounce
- elastic
- heavy parallax
- distracting animation

### Interaction motion

- Hover: opacity
- Active: scale 0.99
- Focus: subtle transition

-----

# 15. Chart System

```yaml
chart-system:
  chartHeight: 320px
  chartRadius: 12px
  chartPadding: 16px
  chartLegendGap: 12px

chart-colors:
  primary: "#00008f"
  secondary: "#5b8def"
  success: "#17663a"
  warning: "#f2a918"
  critical: "#e3000a"
  neutral: "#dfe7f5"

chart-grid:
  stroke: "#edf1f7"
  strokeWidth: 1

chart-axis:
  fontSize: 12px
  color: "#606776"

chart-tooltip:
  background: "#ffffff"
  border: "1px solid #eceded"
  radius: 12px
  shadow: "0px 4px 8px rgba(150,167,214,0.15)"
```

Rules:

- Charts use white surface
- Avoid gradients
- Avoid colorful dashboards
- Primary blue is the primary data series color
- Use subtle gridlines
- Use compact legends
- Gauge charts: chart center-aligned in the card; supporting numbers below the chart, not inside separate mini cards unless required

-----

# 16. Form System

```yaml
form-input:
  height: 40px
  radius: "{rounded.circle}"
  border: "1px solid {colors.field-border}"
  padding: "8px 12px"
  background: "{colors.canvas}"
  fontSize: 16px
  lineHeight: 24px

form-label:
  fontSize: 16px
  fontWeight: 400
  lineHeight: 24px
  color: "{colors.slate}"

form-search-input:
  height: 40px
  radius: "{rounded.circle}"

form-textarea:
  minHeight: 120px
  radius: 12px
  padding: 12px

form-section:
  gap: 16px
  marginBottom: 24px

form-helper:
  fontSize: 14px
  lineHeight: 20px
  color: "{colors.slate}"

form-error:
  fontSize: 14px
  lineHeight: 20px
  color: "{colors.critical}"
```

Rules:

- Standard single-line controls are 40px high.
- Search/filter fields use pill geometry where the component pattern calls for it.
- Default field border uses `#cccccc`; focus state uses primary blue.
- Avoid input shadows.
- Labels remain visible and semantically associated with inputs.

-----

# 17. Performance Tracking Pattern

Performance-oriented mockups preserve geometry only; metric names, values, targets, labels, and statuses are runtime data and remain skeletonized.

```yaml
performance-tracking-card:
  background: "#ffffff"
  border: "1px solid #eceded"
  radius: 16px
  padding: 14px

performance-progress:
  height: 10px
  radius: 999px
  background: "#eaf1fb"

performance-skeleton:
  label: skeleton
  metric: skeleton
  comparison: skeleton
  progress: neutral-placeholder
  status: unlabeled-pill
```

Rules:

- Do not render readable metric names or values in design-only mode.
- Do not infer target/status terminology.
- Preserve card, progress, and hierarchy geometry with skeleton blocks only.

-----

# 18. Accessibility

```yaml
a11y:
  minimumContrast: "4.5:1"
  focusVisible: true
  keyboardNavigation: required
  semanticHTML: required

focus-ring:
  color: "{colors.primary}"
  width: 2px
  offset: 2px
```

Rules:

- Buttons must be real `<button>` elements
- Inputs require labels
- Interactive icons need accessible names (aria-label)
- Tables must use semantic table elements
- Focus ring uses primary blue, 2px width, 2px offset
- Heading order must be logical
- All controls keyboard accessible

-----

# 19. Implementation Mapping & Anti-Drift

This section defines how the standalone Design System maps into implementation.
No external design file, node, URL, or design-tool reference is required at runtime.
This document is authoritative.

## 19.1 Naming Convention

```yaml
ah-naming:
  componentPattern: "AH / Category / Component"
  pagePattern:      "AH / Pages / Page Name"
  tokenPattern:     "AH / Tokens / Category"
```

## 19.2 Implementation Mapping Rules

- Design section → semantic HTML section/component.
- Auto-layout relationships → CSS flex/grid before absolute positioning.
- Component states/variants → component props or state classes.
- Token names map to canonical CSS variables.
- Shared component contracts override page-local styling.
- Page contracts may specialize layout only where explicitly allowed.

## 19.3 Design Rule Preservation

Preserve:

- DB web-first font priority and the `55 Regular` / `75 Bd` weight mapping.
- 1280 desktop baseline with 200px sidebar and 1080px main pane.
- 16px main-pane gutters.
- 32/42 page title and 24/30 section title hierarchy.
- 20/28 primary table and default operational navigation typography; Desktop/Home production sidebar is explicitly 16/24/400.
- 40px controls/tabs, 44px table header, 44/48px table body rows.
- 16px operational card radius.
- component variants, responsive behavior, interaction states, and sidebar skeleton privacy mode.

## 19.4 Visual Matching Priority

- Prioritize visual conformity to this Design System over generic dashboard conventions.
- Preserve calibrated density before adding whitespace.
- Standard cards are white on the light-blue app background.
- Primary blue is used deliberately for title/selection/action/link emphasis.
- The primary-to-indigo gradient is reserved for the documented accent summary-card variant. Home uses its separately documented solid hero fill (`--ah-home-hero-bg`); do not turn it into a generic page gradient.

## 19.5 Anti-Drift Rules

- No 48px operational page titles.
- No fixed 1240px inner content canvas.
- No 40px sidebar rows; desktop sidebar menu rows are 32px.
- No 56px compact table rows; compact = 44px, comfortable = 48px.
- No 14px primary table body typography; primary cells use 20/28 unless a specific compact subcomponent says otherwise.
- No generic gradients; only the documented accent summary-card gradient exception is allowed. The Home hero has a separate measured solid background token, not a generic gradient.
- No dark-blue table header fill; table header uses app-bg.
- No card shadow on enterprise table containers.
- No alternate font family when approved DB webfont or supported local DB font is available.
- No readable or semantic protected content anywhere in design-only mockups; all data-bearing regions use skeletons.
- Do not invent new radii/colors/shadows outside the token set unless a new contract is explicitly added.

-----

# 20. Runtime Content Boundary

Role names, permission names, team names, visibility rules, navigation destinations, workflow names, and domain content are **runtime/product data**, not design-system content.

```yaml
runtime-content-boundary:
  designOnlyMockup:
    roleData: skeleton-or-absent
    permissionData: skeleton-or-absent
    teamData: skeleton-or-absent
    workflowData: skeleton-or-absent
    navigationData: skeleton-or-absent
  runtimeBinding:
    requiresExplicitDisplaySafeInput: true
    inferFromDesign: false
```

The Design System defines geometry and visual states only. It must never invent or preserve readable role/permission/business content in a privacy-safe mockup.

-----

# 21. AI Design Runtime

## 21.1 Render Pipeline

1. Load tokens
1. Load layout shell
1. Load component registry
1. Resolve explicit runtime visibility only when display-safe runtime data exists
1. Render page contract
1. Apply responsive rules
1. Apply interaction states

## 21.2 Runtime Rules

- All pages must consume token variables only
- Shared components required before custom component creation
- Layout engine uses a 200px desktop sidebar and fluid remaining main pane; 1080px at the 1280px baseline
- Sidebar container locked to 200px; mockup content uses privacy-safe skeleton placeholders
- Enterprise density required

## 21.3 AI Enforcement

- Prevent generic SaaS layouts
- Prevent oversized spacing
- Prevent inconsistent typography
- Prevent mixed KPI styles

-----

# 22. AI Generation Rules

The AI generator must follow these when emitting HTML/React:

1. Default design-only output to **full-data skeleton mode**.
2. Render the 200px `SidebarSkeleton` before the MainPane; never infer navigation content.
3. At 1280px viewport width, MainPane resolves to 1080px; on wider desktop it fills remaining width.
4. Use 16px horizontal main-pane gutters; do not create a fixed 1240px wrapper.
5. Use the DB web-first font policy from Section 2.4.
6. Preserve the typography hierarchy as **skeleton slot heights**: page-title slot 32/42, section-title slot 24/30, body slot 20/28.
7. Topbar = 64px high with 16px padding; right control composite = 370x40 when used.
8. Desktop sidebar skeleton row slot = 32px; generic skeleton groups use 24px separation.
9. Standard operational card radius = 16px.
10. White operational cards sit on `#f0f6ff` app background.
11. The documented accent summary card is the only generic shared gradient surface.
12. Search/filter/button/tab shells use 40px desktop height unless a documented compact variant applies.
13. Enterprise table card uses 16px radius and no shadow.
14. Table header = 44px with `#f0f6ff` background.
15. Compact table row = 44px; comfortable row = 48px.
16. Table badge skeleton = 20px high, 8px horizontal padding, 1000px radius.
17. Reuse calibrated generic column widths when a layout contract provides them.
18. Use existing shared component anatomy before creating replacements.
19. All interactive components require hover, focus, active, and disabled behavior where applicable.
20. In skeleton-only output, replace readable page/card/table/form/chart/button content with neutral skeleton placeholders.
21. In skeleton-only output, do not render real or invented names, values, IDs, dates, financials, phone numbers, statuses, routes, labels, column names, role names, permission names, workflow names, or product terms.
22. Do not leak protected content through hidden text, comments, `data-*`, `id`, class names, `title`, `aria-label`, `alt`, hrefs, JavaScript constants, arrays, or object keys.
23. Use neutral non-semantic icon placeholders when a semantic icon or icon name could expose protected workflow meaning.
24. Readable runtime content may replace skeletons only when explicitly supplied as display-safe input.
25. Do not narrate these rules in generated UI output unless the user asks for an audit.

-----

# 23. Silent Design Application Rule

Apply this DESIGN silently. In design-only/mockup mode every generated page must satisfy:

- `contentMode = skeleton-only`.
- Sidebar = 200px desktop and contains only neutral skeleton placeholders.
- Main pane = remaining viewport width; 1080px at the 1280px baseline.
- Main-pane horizontal gutter = 16px.
- Topbar = transparent, 64px high, 16px padding.
- Readable page title is absent; preserve its 32/42 hierarchy with a skeleton title slot.
- Readable section/card/table titles are absent; preserve 24/30 hierarchy with skeleton bars.
- Search, filter, button, tab, badge, chart, form, and table content are skeletonized.
- Standard desktop control shell = 40px unless a documented compact variant applies.
- Standard operational card radius = 16px.
- Standard cards are white on `#f0f6ff` app background.
- Accent summary gradient is allowed only on the documented accent-card variant; its content is still skeletonized.
- Enterprise table header = 44px with `#f0f6ff` background.
- Enterprise table row = 44px compact or 48px comfortable.
- Enterprise table shadow = none.
- Table header labels and body values are skeletons only.
- Table badge = unlabeled 20px pill skeleton.
- No real or invented product/business/customer/navigation/role/permission data exists anywhere in source or rendered UI.
- Use generic structural names only; no protected meaning in DOM attributes, comments, scripts, or icon names.
- Home-only sections do not auto-inherit into operational pages.
- Keep density operational and compact; do not introduce marketing-style whitespace or hero typography.

-----

# 24. HTML Generation Checklist

Before delivering generated UI, verify:

```yaml
html-generation-checklist:
  privacy:
    - "Full-data skeleton mode is active for design-only output"
    - "No readable page/card/table/form/chart/button business content"
    - "No real or invented personal, product, workflow, status, financial, date, phone, ID, role, permission, navigation, or column data"
    - "No protected content in comments, title, aria-label, alt, id, class names, data attributes, hrefs, or JavaScript constants"
    - "Content-bearing semantic icons are replaced by neutral placeholders when needed"

  font:
    - "DB webfont is attempted before local DB fallback when approved webfont assets exist"
    - "55 Regular maps to weight 400"
    - "75 Bd maps to weight 700"

  shell:
    - "Desktop sidebar width = 200px"
    - "1280px baseline main pane = 1080px"
    - "Main content horizontal gutter = 16px"

  homeVariant:
    - "Apply Section 9.6 only on Home at the 1440px wide reference; other page contracts unchanged"
    - "Home production sidebar uses 16/24 text and Home search uses 292 x 40px with 200px input"
    - "Design-only remains privacy-safe-skeleton; Figma loading visuals only in approved runtime loading mode"
    - "Home loading placeholder is #d4d7dd with 100px pill radius; generic skeleton tokens remain unchanged"
    - "Home-only cards, hero, announcement and live chat never appear on operational/listing pages"

  topbar:
    - "Height = 64px"
    - "Padding = 16px"
    - "Readable title replaced by skeleton title slot"
    - "Right control composite geometry preserved without protected semantics"

  sidebar:
    - "Skeleton-only"
    - "Row slot = 32px; generic group separation = 24px"
    - "No labels/routes/keys/selected destination/semantic navigation icons"

  cards:
    - "Standard operational card radius = 16px"
    - "Standard cards are white"
    - "All labels/values are skeletons"

  controls:
    - "Standard desktop shell height = 40px"
    - "No readable control copy in skeleton mode"

  tables:
    - "Table card radius = 16px"
    - "Table card has no shadow"
    - "Table header = 44px and #f0f6ff"
    - "Compact row = 44px; comfortable row = 48px"
    - "Header labels and body values are skeletons"
    - "Badges are unlabeled 20px skeleton pills"

  drift:
    - "No 1240px fixed inner canvas"
    - "No 48px operational page-title geometry"
    - "No 56px compact rows"
    - "No generic gradient backgrounds"
```

If any required check fails, correct the implementation before delivery.

-----

# 25. AI Correction Rules

When a generated page does not match the design, fix in this order:

1. Layout shell — sidebar, topbar, content width
1. Typography scale
1. Spacing rhythm
1. Table density
1. Colors and borders
1. Interaction states
1. Remove any readable or semantic protected content from design-only mockups immediately
1. Remove any inherited Home-only sections immediately
1. Prefer deleting extra decorative UI over adding more UI
1. Keep output dense, operational, and Design-System-consistent
1. Do not explain these corrections in the generated UI

-----

# 26. Final Design Principle

AI Design UI must feel:

- enterprise
- operational
- compact
- readable
- domain-neutral in design-only skeleton mode
- Design-System-faithful
- not decorative
- not generic SaaS

When in doubt:

- prefer white surfaces
- prefer subtle borders
- prefer compact spacing
- prefer clear hierarchy
- avoid visual noise

-----

# 27. Known Gaps

- The general operational reference remains desktop-first at 1280x768; the additional Desktop/Home profile in Section 9.6 is measured at 1440px only. Tablet/mobile behavior needs independent Figma inspection and QA.
- Some shared components expose additional variants not represented in the calibrated screens; do not infer undocumented visual variants from names alone. Search/sidebar variants for non-Home pages are unchanged pending their own Figma audit.
- Exact image/avatar/content data is runtime product data and remains skeletonized or absent in design-only output.
- Motion timing is normalized by Section 14 because the static reference does not establish animation timing.
- Webfont delivery still depends on approved DB webfont files and valid web-embedding rights.
