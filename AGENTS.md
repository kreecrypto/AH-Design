# AH Design v2.6 — AI agent instructions

The canonical authority is `docs/AH_DESIGN_v2.6.md`. Always read `design-system.json`, then `contracts/policies.json`, `contracts/layouts.json`, `contracts/components.json` and `tokens/ah-tokens.json` before generating UI. Machine files are indexes, not replacements for the canonical Markdown.

## Mandatory boundaries
- Default to **privacy-safe-skeleton** in design-only output; do not invent readable navigation, routes, business labels, identifiers, statuses, values or product/customer data.
- Runtime Loading Skeleton requires explicitly approved stable chrome. A Figma screenshot is not authorization to copy product data.
- Reuse exact `--ah-*` tokens and DB web-first font policy when licensed assets exist. Never import legacy Design System code.
- Operational baseline: 1280px = 200px Sidebar + fluid 1080px Main; 16px gutters; 64px topbar; Table rows 44/48px.
- Desktop/Home is a scoped 1440px reference: Search 292px, Sidebar 16/24px approved runtime text and Home-only sections. Never apply Home geometry globally.
- Ensure keyboard, contrast, forms, loading states, and 44px mobile effective targets. Do not claim Figma Mobile/Tablet fidelity without separate evidence.
- When global and Home rules appear contradictory, state the unresolved scope; never silently improvise.
- Do not commit private business data, secrets or copyrighted DB font binaries.

## Maintenance
After editing Design.md Section 2.2: run `npm run tokens:sync`, update the source blob SHA in `design-system.json`, and run `npm run validate` + `npm test`. The root `index.html` and `demo/` are synthetic demos, **not** canonical Home implementations.
