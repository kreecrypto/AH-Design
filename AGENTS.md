# AH Design System — Agent Instructions

**Source of truth:** `docs/AH_DESIGN_v2.6.md` (v2.6, AI contract hardening revision). Read `design-system.json` and the canonical source before UI work. The rest are read-only indexes; never let a generated file silently override the source.

## Mandatory order

1. Read `contracts/policies.json`, select `privacy-safe-skeleton` unless explicitly approved display-safe runtime data exists.
2. Select `contracts/page-profiles.json` by page type. Desktop/Home is not an Operational Listing.
3. Read `contracts/components.json` and `tokens/ah-tokens.json`, then confirm the detail in the canonical Design.md.
4. Follow Section 9.7 precedence: privacy > explicit page scope > operational defaults > responsive non-invention.
5. Render no inferred readable navigation, customer/product identifiers, statuses, routes, financial values, role/permission copy or unapproved data.
6. Preserve DB web-first font policy when licensed assets exist; otherwise use its documented fallback, never redistribute font files.
7. Check keyboard, focus, contrast, forms, loading/empty/error states and 44px effective mobile touch targets.

## Contract governance

- Never hardcode 77 tokens or 19 components as permanent caps; actual counts are derived from source and approved baseline.
- Changes to machine contracts must be intentional: update `contracts/approved-baseline.json` and `CHANGELOG.md` after source review; run `npm run tokens:sync` if canonical CSS changed and `npm run validate && npm test`.
- Source scope remains Desktop/Home at the existing 1440px reference for Home-specific geometry. Unverified tablet/mobile and scenario variants must not be invented.
- No Figma connection is needed or permitted for this repository-only workflow.
- MCP tools only read explicitly allowed local design assets. Do not create a public endpoint or request credentials.

See `docs/AI_INTEGRATION.md` and `docs/RELEASING.md`.

## Drop-in DESIGN.md distribution

The project root `DESIGN.md` and `design-md/ah-design/DESIGN.md` are **exact mirrors** of the canonical `docs/AH_DESIGN_v2.6.md`. This is the only distributed design language. Agents working in a consumer project may read the root `DESIGN.md` directly; in this repository the canonical `docs/` source controls any update.

The visual-only `preview.html` and `design-md/ah-design/preview.html` are a single AH design reference catalog with anonymous specimens. They are not product mockups and do not grant permission to invent user data.

After changing the canonical Design.md by approved review, run `npm run design:sync` and `npm run design:check`. The CI enforces byte-identical mirrors and includes the privacy-safe default. Keep the repository private unless the owner explicitly chooses otherwise. No Figma connection is required.
