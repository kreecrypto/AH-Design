---
name: ah-design-system
description: Apply AH Design v2.6.1 canonical tokens, approved page/component contracts, privacy-safe skeletons, and accessible HTML/React patterns without external design-tool access.
---

# AH Design System

1. Read `design-system.json`, `AGENTS.md`, then canonical `docs/AH_DESIGN_v2.6.md`.
2. Consult `contracts/policies.json` and `contracts/page-profiles.json`; choose page type and safe content mode first.
3. Apply `contracts/components.json`, `contracts/layouts.json`, `tokens/ah-tokens.json`, honoring Section 9.7's precedence.
4. Use DB web-first font policy and existing `--ah-*` tokens; do not invent new tokens, data, navigation, permissions or pixel values.
5. Check keyboard, focus, contrast and 44px mobile effective targets.
6. Validate semantic contract drift against `contracts/approved-baseline.json`. Run `npm run validate` and `npm test` for local changes.

Known boundaries: Home-specific figures apply only to documented desktop scope; tablet/mobile pixel parity and other scenarios remain unverified. This skill provides instructions, not access permissions or an MCP deployment.
