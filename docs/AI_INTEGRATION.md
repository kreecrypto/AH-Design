# Connect an AI agent to AH Design System

This repository is **private**. An AI needs user-granted GitHub repository access or an authenticated local clone. Do not make the repo public or share a personal access token.

## Option A: AI with a GitHub connector
1. Authorize your AI tool's GitHub connector to read `kreecrypto/AH-Design`.
2. Instruct it to open `design-system.json` and `AGENTS.md`, followed by contracts, tokens, and `docs/AH_DESIGN_v2.6.md`.
3. Example prompt: “Use only AH Design v2.6 from kreecrypto/AH-Design to build a privacy-safe 1280px operational listing. Never invent product data, tokens or old UI.”
4. A private repo cannot be fetched with an unauthenticated raw GitHub URL.

## Option B: Local MCP server for compatible AI clients
On a device with authorized GitHub access and Node.js 20+:

```bash
git clone git@github.com:kreecrypto/AH-Design.git
cd AH-Design
npm run validate
npm test
npm run mcp
```

Example MCP stdio client configuration (replace the absolute local path):

```json
{
  "mcpServers": {
    "ah-design-system": {
      "command": "node",
      "args": ["/absolute/path/to/AH-Design/integrations/mcp/server.mjs"]
    }
  }
}
```

The MCP service is **local stdio**, **read-only**, has no third-party runtime dependencies, and allows only the listed design documents and contracts. Nothing is publicly hosted. Supported tools: `list_design_assets`, `read_design_asset`, `get_component_contract`, `get_tokens`. Resources use `ahdesign:///manifest`, `ahdesign:///components`, `ahdesign:///tokens`, `ahdesign:///policies`, `ahdesign:///layouts`, and `ahdesign:///source`. Client configuration syntax may differ.

## Option C: Agent Skills
Clients supporting Agent Skills can load `skills/ah-design-system/SKILL.md` after being granted source access. It does not by itself connect to GitHub.

## Maintenance and limitations
```bash
npm run tokens:sync  # regenerate exact JSON/CSS from canonical source Section 2.2
npm run validate     # verify no drift
npm test             # MCP integration tests
```
The canonical Markdown wins over derived files; the repository's 1440px Home Figma contract does not certify responsive or other scenarios. The HTML demo uses synthetic data and is not a pixel-exact Figma Home implementation. No API/database/backend is included.
