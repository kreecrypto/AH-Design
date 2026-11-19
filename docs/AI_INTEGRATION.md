# AI Integration — AH Design System v2.6.1

This is an **authorized private GitHub repository**. No Figma connection, remote design-tool access, or public MCP endpoint is used by this integration.

## 1. GitHub Connector
Connect the AI tool's GitHub integration with read permission to `kreecrypto/AH-Design`. Ask it to read `design-system.json`, `AGENTS.md`, `contracts/policies.json`, `contracts/page-profiles.json`, `contracts/components.json`, `tokens/ah-tokens.json`, and finally `docs/AH_DESIGN_v2.6.md`.

The default output is `privacy-safe-skeleton`; do not infer routes, customer labels, product data, or workflows. No plugin can access this Private repository without authorization.

## 2. Local MCP — Official SDK v2 (preferred)

On a machine that has authorized clone access and Node.js 22+ (Node 20+ runtime supported):

```bash
git clone git@github.com:kreecrypto/AH-Design.git
cd AH-Design
npm install
npm run validate
npm test
npm run mcp
```

Configure an MCP client supporting stdio to run `node /absolute/path/to/AH-Design/integrations/mcp/server-v2.mjs`. This is an **allowlisted, read-only local process**. It uses the official MCP TypeScript SDK v2 `serveStdio` entrypoint, supporting legacy `2025-11-25` initialization and modern `2026-07-28` per-request metadata. The SDK client integration test attempts both eras.

To keep the former zero-dependency legacy server for a client that has not migrated, run `npm run mcp:legacy`. Do not describe the legacy server as modern-compatible.

Available tools: `list_design_assets`, `read_design_asset`, `get_component_contract`, `get_tokens`. Available resources: `ahdesign:///manifest`, `ahdesign:///tokens`, `ahdesign:///components`, `ahdesign:///layouts`, `ahdesign:///policies`, `ahdesign:///pageProfiles`, `ahdesign:///source`, `ahdesign:///agents`, `ahdesign:///integration`.

## 3. Optional supported Agent Skills

AI tools that accept local Agent Skills can read `skills/ah-design-system/SKILL.md`. That file conveys instructions and does **not** grant access or host a service.

## 4. Test / support matrix

| Channel | Implementation | Verification status |
|---|---|---|
| ChatGPT / connected GitHub | Private repository read | Confirmed only for the authorized GitHub integration used to maintain this repository |
| Local MCP (legacy) | `server.mjs` | Existing raw JSON-RPC test |
| Local MCP (MCP SDK v2) | `server-v2.mjs` | CI smoke test added for legacy and modern via official SDK; record a successful workflow before calling it certified |
| Cursor / Claude / other hosts | Any host with stdio support and authorized local files | Client-specific installation and behavior not independently verified |
| Remote MCP | **Not deployed** | Requires explicit approval, private authentication, security review and deployment |

See `docs/REMOTE_MCP_PLAN.md` for a security design, not an active service. Use `docs/RELEASING.md` for quality gates.

## 5. Source precedence and change management

The canonical Design.md takes precedence over derived machine indexes. `contracts/approved-baseline.json` is a versioned freeze of every component/layout/policy/profile field; the validator rejects field drift. To change contracts intentionally, update the canonical source where relevant, release fixture, changelog, and verify tests. Home-specific exception scope comes from Section 9.7. Do not connect to external design tools to fill gaps.

No HTML Demo or sample runtime data is part of the machine Design System. DB font files are not redistributed.
