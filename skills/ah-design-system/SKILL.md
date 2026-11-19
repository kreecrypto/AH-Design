---
name: ah-design-system
description: Apply AH Design v2.6 tokens, accessible enterprise dashboard component contracts, scoped Desktop/Home geometry and privacy-safe skeleton rendering to HTML/React UI.
---

# AH Design System

1. Read `design-system.json` and `AGENTS.md`.
2. Read `contracts/policies.json` before showing any content. The default is privacy-safe-skeleton.
3. Read `contracts/components.json`, `contracts/layouts.json` and `tokens/ah-tokens.json`.
4. Confirm final detail in the canonical `docs/AH_DESIGN_v2.6.md`.
5. Use `--ah-*` CSS variables and existing component contracts. Never use a parallel theme or infer real navigation/product data.
6. For Desktop/Home only, use 1440px Figma-calibrated variants; do not propagate to Operational Listing.
7. Respect known audit gaps, and validate using `npm run validate` and `npm test` in an authorized local clone.

This skill is an instruction layer, not a permission bypass or public data API. See `docs/AI_INTEGRATION.md`.
