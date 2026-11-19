# AH_DESIGN_v2.6 — Mock Data Fixed / Regression Edition

Source of truth: supplied `AH_DESIGN_v2.6(2).zip`. No old DS or project components are imported.

Run: open `index.html` locally or host this directory with a static file server.

Audit fixes A01–A10: accessible 320px inspector dialog with focus trap/return and hidden state; keyboard sort focus and aria-sort; readable scrollable enterprise table; 44px mobile interactions; placeholder contrast; dataset-bound 7-day trend; current local date + required label; simulated loading/empty/error/restricted states with DS anatomy; reset confirmation.

Notes: This is an explicitly requested **synthetic-data demo**, not the strict skeleton-only default from v2.6. Inspector is a modal detail demo, distinct from the optional inline 1fr+320px operational side-panel. The package does **not** contain licensed DB webfont binaries; same-origin references may be populated by the rights holder. No API, persistence, or backend. Changes reset on refresh. 
