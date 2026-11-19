# Changelog

## 2.6.1-ai-contract-hardening — 2026-11-19

- Published single-brand root `DESIGN.md` and `design-md/ah-design/DESIGN.md` mirrors, plus a self-contained token/component preview and quick-start README inspired by the drop-in DESIGN.md distribution pattern.
- Added mirror sync/check CI and README/preview regression checks; fixed the privacy-mutation test error message and enabled manual `workflow_dispatch`.


- Scoped Global Operational card/hero rules against the already documented Home contract (§9.7); no live Figma access.
- Added `contracts/page-profiles.json`, `contracts/approved-baseline.json` and JSON Schema subset for AI governance.
- Added full nested Contract Drift detection, 19 anchored source-to-contract checks and mutation tests; removed hard-coded component/token counts from validator.
- Added local MCP TypeScript SDK v2 implementation for legacy/modern stdio clients while preserving prior no-dependency legacy service.
- Added official SDK client smoke test to CI, test failure gate, release checklist, access/remote service policy.
- Recorded the previously audited Home loading placeholder heights as non-global, non-mobile reference observations.
- No remote MCP deployment, no Figma edits, no changes to the Mock Data HTML demo.

## 2.6.0 — 2026-11-19

- Initial 77 tokens / 19 component machine-readable AI integration in Private GitHub; local read-only legacy MCP and baseline CI.
