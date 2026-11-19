# AH Design v2.6 vs Figma — Desktop/Home Audit

**Date:** 2026-11-19  
**Mode:** Read-only audit; no Figma or GitHub mutations  
**Figma file:** [VDO Agency Portal](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=3093-148134&m=dev)  
**Figma section:** `3093:148134` — `Desktop/Home` (10,665 × 10,386px), contains several screen/variant/scenario groups  
**Figma reference screens:** [Normal Home `3101:118014`](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=3101-118014&m=dev), [Alternate Home `3103:129970`](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=3103-129970&m=dev), [Loading skeleton `6142:388916`](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=6142-388916&m=dev)  
**Document:** [AH Design System v2.6, main branch](https://github.com/kreecrypto/AH-Design/blob/main/docs/AH_DESIGN_v2.6.md)

## Executive finding

The v2.6 document is a **consistent baseline for the general operational shell**, but it is not a pixel-perfect, comprehensive contract for the linked Figma `Desktop/Home`. The biggest gaps are: (1) real Figma loading skeleton vs deliberately privacy-strict document skeleton, (2) sidebar typography, (3) right-hand search composite sizing, (4) skeleton palette/anatomy, and (5) missing explicit Home-only component geometry. Do not label all differences as production defects: some are policy separations and undocumented Home-specific variants.

## Measurements

| Item | AH Design v2.6 | Figma measured | Conclusion |
|---|---|---|---|
| Desktop width | 1280px baseline, fluid above | 1440px | Compatible: 1440 is `wide` breakpoint, not a mismatch |
| Sidebar | 200px | 200px | **Match** |
| Main pane | 1280 baseline→1080; fluid `viewport-200` | 1240px at 1440 | **Match** |
| Main content gutter | 16px | 16px | **Match** |
| Header height | 64px | 64px | **Match** |
| Search/action composite | 370×40px (input270, actions80; internal gap20) | 292×40px (input200, actions80; gap12) | **Measured deviation**: -78px composite, -70px input, -8px gap |
| Sidebar navigation text | DS §2.4/§19.3 says 20/28 Regular | 16/24 `DB Helvethaica X 55 Regular` | **Measured deviation** |
| Font family and weight names | DB Helvethaica X, 55 Regular, 75 Bd | Same | **Match** |
| Standard section heading | 24/30 Bold | 24/30 `75 Bd` on section titles | **Match** |
| Home hero heading | No explicit Home hero contract; metric-xl 40/46 exists | 40/46 `75 Bd` | Uses existing metric token; Home contract missing |
| Main primary color | `#00008f` | `#00008f` on live-chat/interactive fills | **Match** |
| Primary-soft | `#e2efff` | `#e2efff` on Home summary / card backgrounds | **Match** |
| Loading placeholder fill | DS §5.1 base `#f7f7f8`, highlight `#eceded` | `#d4d7dd` on measured skeleton rectangles | **Measured deviation**; may warrant a separate loading token |
| Loading placeholder radius | DS §5.1 text 6px, title 8px | Several measured placeholder pills radius 100px | **Measured deviation**; distinct Home Loading variant |
| Privacy-safe skeleton semantic text | Replace navigation, page title, labels, icons, selected destination | Figma Loading screen retains navigation names, selected state, section headings/search | **Behavioral/policy mismatch**, not necessarily a production bug |
| Home content anatomy | §9.5 lists Home-only blocks but does not prescribe geometry | Hero 1240×277; quick menu container 1208×126; overview card 596×208; personal card 290×128; product-support tiles ~134×88; right Home card 323×334 | **Coverage gap** — add explicit Home-only geometry/variants |
| Home card shadows | General `--ah-shadow-card` defined, but no Home-specific shadow variant | Personal card has dark-blue shadow; right-side Home card has black drop shadow and 20px blur | **Coverage gap**; avoid applying operational table shadow rules blindly |

## Audit findings / recommended actions

### P1 — Split loading and privacy-safe skeleton modes
- **Evidence:** Figma [Loading skeleton `6142:388916`](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=6142-388916&m=dev) retains readable navigation/header/section chrome, whereas DS §§4–5 require a fully redacted design-only skeleton.
- **Action:** Define `loading-skeleton` (production data-loading state, static navigation may remain) and `privacy-safe-skeleton` (design-only, remove all semantic/product data and navigation identifiers) as separate modes. Preserve the existing privacy defaults.

### P1 — Correct or explicitly variantize sidebar typography
- **Evidence:** Figma nav labels 16px / 24px, regular DB 55; DS §2.4/§19.3 primary sidebar/nav 20px / 28px.
- **Action:** Choose whether the actual sidebar uses a distinct `sidebar-label: 16/24/400` token (recommended for fidelity) while retaining `body-lg: 20/28` for table cells. Do not globally shrink data tables.

### P1 — Reconcile search geometry
- **Evidence:** Figma `desktop/search` instance `I3101:118014;2847:186481;2913:205434;209:540` is 292×40; child input is 200×40 and action area 80×32, with 12px separation. Same composite size in `3101:118014`, `5005:626915`, `3288:294051`.
- **Action:** Define a `home-topbar-search` variant at `292×40 (200+12+80)` or revise the main search contract only after checking operational/listing screens. Avoid overriding existing 370px operational contracts with Home measurements without cross-page verification.

### P1 — Add Home Loading placeholder tokens/geometry
- **Evidence:** Measured Figma skeleton rects `6142:388924`, `6142:388925`, `6142:388926`, `6142:389013`, `6142:389024`: `#d4d7dd` and 100px radius, heights 28, 18, and 10px. DS §5.1 uses `#f7f7f8/#eceded` and text/title radius 6/8px.
- **Action:** Keep privacy-safe tokens unchanged; define an explicit `loading-skeleton` palette and per-slot geometry if fidelity to this Figma state is required.

### P2 — Document Home-specific component contracts
- **Evidence:** DS §9.5 enumerates Home-only sections but lacks sizes or component anatomy. Figma supplies Banner, Shortcut, Annual Overview, Personal Summary, Product Tiles, Announcement and Floating Chat.
- **Action:** Add separate `home-only-layout` section with measured geometry, responsive intent, Home variants (including card background, radius, shadow), and a non-semantic placeholder rule for privacy-safe mode. Do not allow Home-only components to propagate to operational/listing pages.

### P2 — Distinguish text-scale default from Home-specific exceptions
- **Evidence:** Hero text uses 40/46, section headings use 24/30, normal Home metric/card headings include 32/42, while quick menu captions use 16px with 16px line height; the v2.6 generic type contract lacks explicit mapping for several Home slots.
- **Action:** Add slot-specific `home-hero`, `home-metric-title`, `shortcut-label` tokens/variants rather than flattening them to one generic heading or body style.

## What cannot be concluded from this node

- The linked section is `Desktop/Home`, not a complete audit of the entire Figma file. Operational tables, forms, listing filters and all responsive mobile/tablet designs were **not** verified against their own Figma screens here.
- Static Figma cannot prove keyboard/focus behavior, screen-reader behavior, animation implementation or production API/data-binding behavior.
- Real business text and values visible on the Figma design are **not** grounds to relax the Design.md privacy-safe **design-only generation** policy.

## Audit outcome

**General desktop shell: aligned. Figma Home visual fidelity: partially specified, with measurable mismatches and Home variant gaps.** Recommended order: (1) separate skeleton modes, (2) reconcile sidebar/nav typography, (3) add search variant, (4) distinguish skeleton palettes, (5) document the Home-specific contracts, then repeat the audit on operational/listing Figma nodes before touching generic design tokens.

**No files in Figma or GitHub were modified by this audit.**