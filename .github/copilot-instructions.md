# AH Design — AI Code Instructions

Read [AGENTS.md](../AGENTS.md) and [docs/AH_DESIGN_v2.6.md](../docs/AH_DESIGN_v2.6.md) first.

1. Select [Privacy Policy](../contracts/policies.json) and [Page Profile](../contracts/page-profiles.json) before styling any page.
2. Only use [canonical tokens](../tokens/ah-tokens.json) and [indexed components](../contracts/components.json). Section 9.7 of Design.md handles Home vs Operational precedence.
3. Design-only rendering is privacy-safe-skeleton, not fabricated business data. Do not use old Design Systems or infer external design measurements.
4. Contract changes require an approved snapshot update, [Changelog](../CHANGELOG.md), `npm run validate` and `npm test`.
5. The Repository is Private; no Figma connection, remote MCP or secrets are necessary for code generation.
