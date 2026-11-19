# AH Design v2.6 — Fix All / QA Report

**Baseline:** User-supplied `AH_DESIGN_v2.6(2).zip` and the previously audited interactive synthetic-data demo.  
**Outcome:** 51 passing automated browser checks / 0 failing; no uncaught JavaScript page errors.  
**Views:** Dashboard / Listing / Analytics / Create.  
**Responsive widths:** 320, 390, 680, 767, 768, 900, 1024, 1280, 1440 px.

## A01–A10 resolution

| ID | Priority | Resolution |
|---|---|---|
| A01 | P0 | Modal detail inspector has `role=dialog`, `aria-modal`, 320px width, inert/hidden when closed, focus trap, Escape close and trigger focus return. Mobile drawer also traps focus and sets main content inert while open. |
| A02 | P1 | Sort and other main toolbar controls regain logical focus across table re-render; sorted header uses `aria-sort`. |
| A03 | P1 | Detail inspector width is 320px per DS token, documented as a demo modal variant rather than the optional inline desktop operational side panel. |
| A04 | P1 | Expanded enterprise table to preserve 20/28 cell typography and important field readability, sticky first column, horizontal scroll hint/region, full row content via accessible name and detail. |
| A05 | P1 | Mobile interaction target heights at least 44px in tested interactive elements. |
| A06 | P1 | Placeholder uses existing `--ah-slate` token rather than `--ah-placeholder`. |
| A07 | P1 | Seven-day chart sourced from current local-date mock records (record date/status), recomputed on create/edit/reset. Responsive SVG axes with legible typography and readable data scope. |
| A08 | P2 | Required date visibly marked `*`, populated from browser-local current date. Native required validation and invalid outline. |
| A09 | P2 | QA Data State control simulates loading skeleton, empty, error, restricted and success. Empty icon 48px; 64px vertical padding. |
| A10 | P2 | Reset requires native confirmation dialog and supports cancel. |

## Limitations

- Synthetic data is explicitly user-approved for *interactive demo testing*, not compliant with the DS skeleton-only default for an unbound design-only mockup.
- DB font file binaries are not included; the DB-first fallback stack remains defined, pending licensed asset supply.
- No backend / API; changes last only during the current page session and reset on refresh.
- Browser automation is not a substitute for manual screen-reader testing (VoiceOver/NVDA), real-device usability testing, or formal final design signoff.
- Detail inspector is a **modal 320px variant**. A separate inline operational `1fr + 320px` side panel can be built when actual page semantics require it.

## Files

- Standalone HTML (`AH_DESIGN_v2.6_MockData_Fixed_Standalone.html`)
- Source package (`AH_DESIGN_v2.6_MockData_Fixed_Source.zip`)
- QA JSON (`AH_DESIGN_v2.6_MockData_Fixed_QA.json`)
- Visual previews (desktop/mobile and listing).
