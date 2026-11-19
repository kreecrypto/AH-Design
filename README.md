# AH Design v2.6 — Interactive Mock Data Demo

A standalone UX/UI demonstration built **only** from the user-supplied `AH_DESIGN_v2.6(2).zip` (source: `AH_DESIGN_v2.6.md`). No legacy design-system components are imported.

## Run

- **Quick preview:** Open [index.html](index.html) in a browser.
- **Editable source:** Open [demo/index.html](demo/index.html) or serve this repository as a static site.
- The demo contains Dashboard, Listing, Analytics and Create views with clearly fictional data.

## Source of truth

- [AH Design System v2.6](docs/AH_DESIGN_v2.6.md)
- [UX/UI Audit](docs/UXUI_Audit.md)
- [Fix All QA report](docs/QA_Report.md)

## QA status

Audit issues A01–A10 were addressed in the Fixed edition. Previous browser regression reported 51/51 automated checks passing at 9 viewport widths (320–1440 px). Manual screen-reader/device review and licensed DB font assets remain outstanding.

## Important

This is an **interactive synthetic-data demo**. The strict design-only default in AH v2.6 is skeleton-only; this explicit testing example is not a production app. No API/backend/data persistence is included. Changes reset on refresh. No confidential real customer records or unlicensed font binaries are included.

Updated: 2026-11-19.
