# AH Design v2.6 — UX/UI Audit (Interactive Mock Data)

**Audit date:** 19 Nov 2026 (ICT)  
**Sources reviewed:** User-provided `AH_DESIGN_v2.6(2).zip` (`AH_DESIGN_v2.6.md`, verified identical to extracted copy); `AH_DESIGN_v2.6_MockData_Standalone.html`; implementation `AH_v2.6_MockData_Demo/` including `index.html`, `styles.css`, `app.js`, `mock-data.js`; desktop/mobile screenshots; previous QA JSON.  
**Method:** Static inspection of Design System and implementation, visual examination of provided screenshots, and Chromium/Playwright interaction checks at desktop 1280×900 and mobile 390×844. Existing regression QA data was reviewed for nine widths 320–1440px. Contrast ratios were calculated with WCAG relative luminance. No backend, real-user UAT, or screen-reader manual test performed.

## Decision

**Status: Conditional / Not 100% Design QA Passed.** Baseline App Shell, palette, major typography, KPI/table geometry, and working mock CRUD interactions are present. Accessibility, responsive discoverability, component contract, and data interpretation require remediation. The user-requested synthetic-data mode is a scoped exception to the Design System's default `skeleton-only` design-only privacy contract. The dataset is generated and separated from DS, not real business data.

## Audit matrix

| Area | Result | Evidence |
|---|---|---|
| App Shell | PASS | At 1280px, sidebar 200px, pane 1080px, topbar 64px. |
| Core visual tokens | PARTIAL | Main palette, spacing, typography structure match; fallback font rather than licensed DB font binaries. |
| Dashboard / KPI | PASS with caveats | 4 KPIs; numbers recalculate from 24 mocked records; 7-day chart stays hardcoded. |
| Listing / table | PARTIAL | Semantic table, sorting/filter/pagination and 44px rows; clipping and missing scroll cue. |
| Component fidelity | PARTIAL | Side panel implemented as 400px overlay, DS specifies 320px side-panel anatomy. |
| Interaction | PARTIAL | Sort, details, edit, create, export/reset function; sort loses keyboard focus. |
| Accessibility | FAIL | Off-screen side-panel buttons remain focusable, no dialog focus trap/return, sub-44px mobile targets, insufficient placeholder contrast. |
| Responsive | PARTIAL | No overall horizontal document overflow; table scrolls but not discoverable, small chart labels. |
| UI state completeness | PARTIAL | Empty implemented; required loading/error/restricted components not demonstrated. |
| Skeleton privacy policy | INTENTIONAL EXCEPTION | DS §5 / §23 requires skeleton-only by default, user explicitly requested demo mock data. Don't label demo strict skeleton-compliant. |

## Prioritized findings

### A01 — P0 — Closed detail panel contains invisible keyboard-focusable controls

- **Where:** `index.html` line 58; `app.js` lines 94–99; `styles.css` panel rules ~line 68.
- **Observed:** On open, the panel is an `aside` without modal/dialog focus semantics. It does not trap focus. On close, it is merely translated off-screen and marked `aria-hidden="true"`; the existing `closeDetail`, `detailStatus`, `cancelDetail`, `saveDetail` controls remain in Tab order. Verified by pressing Tab after closing; focus moves through those four invisible controls. Pressing Escape immediately after opening leaves focus on the now-hidden `aside`.
- **Fix:** Model the overlay as a `role="dialog"` with `aria-modal="true"` and accessible title (or native `<dialog>`), trap focus while open, restore focus to the invoking row/button when closed, and set `hidden`/`inert` or unmount content while closed. Apply matching rules to the mobile nav drawer.
- **Acceptance:** No focus enters closed panels; Tab/Shift+Tab remain within open dialog; Escape closes and returns focus to its trigger.

### A02 — P1 — Sorting destroys keyboard focus

- **Where:** `app.js` lines 86–92 and 118.
- **Observed:** Keyboard focus moves from the active sort button to `<body>` after pressing Enter on the sort button, because the entire `mainContent.innerHTML` is replaced.
- **Fix:** Update only the affected table portion or identify/re-focus the activated control after render. Use `aria-sort` to expose active sort and direction on the current `th`.
- **Acceptance:** Focus stays on the same logical sort control and a screen reader can identify ascending/descending sort order.

### A03 — P1 — Side panel anatomy differs from Design System

- **Where:** DS §8.6; `styles.css` panel selector.
- **Observed:** `detail-panel` computed width **400px** desktop; DS specifies **320px** and describes 1fr + 320px operational-panel placement / mobile reflow below content. Current treatment is a full-height overlay drawer.
- **Fix:** Use the documented `320px` component and its card/padding/placement pattern unless the overlay is formally documented as a distinct drawer variant.
- **Acceptance:** Detail components trace to named v2.6 variants; any nonstandard overlay is marked as deliberate deviation with component contract.

### A04 — P1 — Important enterprise table values are truncated

- **Where:** `app.js` lines 54–65; `styles.css` `.data-table`.
- **Observed:** On desktop, one title cell has `scrollWidth=233px` versus `clientWidth=144px`, and the date cell slightly clips (`114px` vs `111px`); header “ความสำคัญ” has `scrollWidth=130px` versus `clientWidth=89px`. Only title cells supply a native `title` hint. On mobile, scrolling is possible (`334px` viewport for `1020px` table), but there is no visible horizontal-scroll affordance.
- **Fix:** Preserve DS table anatomy, provide discoverable `scroll horizontally` cue on mobile, make full field values available on focus/click or accessible tooltip, and use appropriate label abbreviations or width strategy without reducing body type below 20/28.
- **Acceptance:** No loss of information on primary column/headers; table scroll indicated on touch screens; full text available to keyboard users.

### A05 — P1 — Mobile touch targets below 44px contract

- **Where:** DS §13.4; mobile CSS.
- **Observed:** At 390px, filter chip 36px, tab 40px, pager 32px, nav item 32px, menu trigger 36px, primary button 40px.
- **Fix:** Add transparent/invisible hit areas at least 44×44px where feasible while preserving the visual control heights required by the desktop DS.
- **Acceptance:** All primary mobile interactions have at least 44×44px effective touch target, with no overlaps.

### A06 — P1 — Placeholder text contrast below the Design System minimum

- **Where:** DS §18 minimum 4.5:1; `styles.css` `.top-search input::placeholder`.
- **Observed:** `#b2b2b2` placeholder on white is approximately **2.12:1**. The same DS defines a compliant slate text token `#606776`, approximately **5.68:1** on white.
- **Fix:** Use existing `--ah-slate` for meaningful input placeholder/instruction text; retain low-contrast placeholder token only where not conveying text users must read. No new colors necessary.
- **Acceptance:** Informative text reaches minimum 4.5:1 contrast on its actual background.

### A07 — P1 — Trend chart is disconnected from mock records and visually too small on mobile

- **Where:** `app.js` `lineChart()` lines ~70–76; `styles.css` `.chart-wrap`, mobile media rule.
- **Observed:** Chart values are fixed arrays (`done=[5,8,7,12,10,15,14]`, `opened=[7,10,9,14,12,17,16]`) and do not reflect create/status changes or reset. On a ~320px mobile SVG rendering a 640-unit viewBox, 12-unit tick labels render around 6px in screen pixels.
- **Fix:** Generate time-series from a date-aware mock event source, or explicitly label it static sample independent from the live dataset. Maintain legible chart labels via responsive chart recomposition (fewer ticks / CSS-pixel labels / alternate summary).
- **Acceptance:** Chart clearly states its data scope; labels readable on 320–390px; updating demo records cannot be misconstrued as affecting chart when it doesn't.

### A08 — P2 — Form validation labels inconsistent

- **Where:** `app.js` `create()` lines ~84–85.
- **Observed:** `itemDate` has HTML `required` but its visible label “วันที่อัปเดต” has no `*`, despite copy saying all required fields are starred. Default date is hardcoded `2026-11-19` and will become stale.
- **Fix:** Mark date as required or make it truly optional; set default date dynamically. Preserve native validation but include inline errors/feedback if promoted beyond a demo.
- **Acceptance:** Every required field indicated consistently; date default corresponds to current local date at runtime.

### A09 — P2 — Empty/loading/error/restricted state coverage incomplete

- **Where:** DS §14.2–14.3; `app.js` `table()` and `.empty-state` styles.
- **Observed:** Search empty state is implemented, but uses ~32px icon and ~32px vertical padding vs DS 48px icon and 64px vertical spacing. Loading/error/restricted states aren't rendered/tested in the mock version.
- **Fix:** Match empty component anatomy; add demo state toggles to QA-only controls for skeleton-loading, error, and permission-restricted states (without implying backend behavior).
- **Acceptance:** All required states are previewable and follow v2.6 component geometry.

### A10 — P2 — Destructive demo reset lacks a confirmation/undo affordance

- **Where:** `app.js` line 112 and note reset button.
- **Observed:** Reset replaces all user-entered demo records with seed records immediately. No undo/confirm. This is acceptable in a disposable dataset but may surprise reviewers testing creation/editing.
- **Fix:** Add a brief confirm or explicit “reset all edits” message/undo option; keep it a demo-only function.
- **Acceptance:** Users know that new/edited mock records will be discarded.

## What worked

- Main desktop geometry verified as 200px sidebar / 1080px pane / 64px topbar at 1280px.
- 24 synthetic records; Search, Category, Priority, Status filter, Sort, Pagination, Density, Detail/Status edit, Create, CSV export, Reset executed without JS page errors in previous QA.
- No overall horizontal document overflow across nine recorded widths (320, 390, 680, 767, 768, 900, 1024, 1280, 1440).
- Table semantic header/cell structure, `aria-pressed` for filters/tabs, input labels, `Escape` close handler, and explicit synthetic-data notice are positive foundations.
- Earlier mobile Listing screenshot shows part of the drawer while transitioning; code and direct tests confirm navigation closes the drawer. That captured transition is not counted as a persistent open-drawer bug.

## Proposed sequence

1. **Blocker:** A01, A02 — keyboard/focus lifecycle; run screen-reader and keyboard-only regression.
2. **High-impact UX:** A04, A05, A06, A07 — table readability/discoverability, touch area, contrast, responsive chart/data semantics.
3. **Design-System fidelity:** A03, A09 — panel variant contract and required state anatomy.
4. **Polish:** A08, A10 — form requirements/defaults and demo reset behavior.

## Exit criteria

- All P0 closed; no P1 reproducible across Desktop 1280/1440, Tablet 768/900/1024, Mobile 320/390/680/767.
- Keyboard traversal stable after navigation/filter/sort/pagination; dialogs manage focus correctly.
- No invisible keyboard targets; effective touch areas ≥44px on mobile.
- UI text contrast ≥4.5:1; semantic focus and tooltips checked for accessibility.
- No clipped high-priority data without a keyboard-accessible full-value method.
- Any intentional data-mode / overlay component deviations explicitly recorded; no claim of strict skeleton-only compliance for a synthetic-data demo.
- DB font fidelity remains unverified until properly licensed webfont assets are provided; no claim of pixel-perfect DB type matching in fallback environment.

**Scope note:** This is an audit only; the original HTML and source package were not modified.