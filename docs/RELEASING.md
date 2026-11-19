# Design System Release / CI Gates

**Canonical authority**: `docs/AH_DESIGN_v2.6.md`. **No live Figma connection is required** for this repository change workflow.

1. Use an isolated feature branch and PR for future contract changes.
2. Update canonical Markdown first when changing approved design values. Do not use an undocumented external design reference to fill gaps.
3. Update `contracts/components.json`, `contracts/layouts.json`, `contracts/policies.json`, `contracts/page-profiles.json` and the deliberate approved snapshot in `contracts/approved-baseline.json`. Each field is compared recursively; baseline changes require a reviewer and changelog entry.
4. If the canonical source changes, update source SHA in `design-system.json`, `tokens/ah-tokens.json` (via `npm run tokens:sync`), and `contracts/approved-baseline.json`.
5. Run `npm install`, `npm run tokens:check`, `npm run validate`, `npm test`. Test includes the mutation guard and official SDK MCP legacy/modern negotiation.
6. Confirm GitHub Actions `AH Design System validation` conclusion `success` on the release commit. **No success means do not mark production ready.**
7. Configure branch protection manually in repository Settings → Branches or Rulesets to require this check and one approving review. **A workflow or CODEOWNERS file alone does not enforce branch protection**; API settings were not modified here.
8. Record the commit SHA, workflow run URL, deployed client versions (if any) and known limitations in release notes.

## Compatibility and limitations

- Local SDK server is read-only, stdio only. No remote host, OAuth or endpoint is deployed.
- External AI clients and modern SDK tests must be verified in CI/client runtime; source code existing is not proof of a successful handshake.
- `schemas/contracts.schema.json` uses a documented JSON Schema subset that is validated by `scripts/validate.mjs` plus an all-field approved baseline; it is not an independent full JSON Schema engine.
- Unverified page geometry is not a failing privacy condition but cannot be labeled pixel-perfect.
- Licensed fonts are intentionally excluded. Keep Repo Private.
