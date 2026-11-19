# AH Design System v2.6 — AI-ready

**[Canonical Design System](docs/AH_DESIGN_v2.6.md)** · [Machine entrypoint](design-system.json) · [AI connection guide](docs/AI_INTEGRATION.md) · Private Repository

This project now provides structured design tokens and contracts for AI tools alongside its existing synthetic HTML demo. AI must have authorized GitHub access, or use the local read-only MCP server. Neither a remote API nor a public hosting endpoint is deployed.

- [AI rules](AGENTS.md) and [Agent Skill](skills/ah-design-system/SKILL.md)
- [Tokens (CSS)](tokens/ah-tokens.css) and [Tokens (JSON)](tokens/ah-tokens.json)
- [Component contracts](contracts/components.json), [Layouts](contracts/layouts.json), [Privacy policy](contracts/policies.json)
- [Local MCP server](integrations/mcp/server.mjs) and [Validation CI](.github/workflows/design-system-validate.yml)

Default generation mode is **privacy-safe-skeleton**. Home-specific measurements are scoped to Desktop/Home only. Unresolved audit gaps remain documented.

---

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

## Figma Desktop/Home alignment (2026-11-19)

The Design System document was corrected against the actual [VDO Agency Portal Desktop/Home Figma](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=3093-148134):

- [Updated Design System v2.6](docs/AH_DESIGN_v2.6.md) — adds Home-specific visual contracts while keeping operational tokens untouched.
- [Baseline Audit](docs/Figma_Desktop_Home_Audit.md) — measurements and the five categories of issues.
- [Fix All QA](docs/Figma_Desktop_Home_FixAll_QA.md) — **39/39** source-contract checks passed.

This was a **documentation-contract fix**; existing Demo HTML is still the operational synthetic-data sample, not a pixel-exact Figma Home implementation. Figma file and other operational/listing screens were not modified.

## QA status

Audit issues A01–A10 were addressed in the Fixed edition. Previous browser regression reported 51/51 automated checks passing at 9 viewport widths (320–1440 px). Manual screen-reader/device review and licensed DB font assets remain outstanding.

## Important

This is an **interactive synthetic-data demo**. The strict design-only default in AH v2.6 is skeleton-only; this explicit testing example is not a production app. No API/backend/data persistence is included. Changes reset on refresh. No confidential real customer records or unlicensed font binaries are included.

Updated: 2026-11-19.
