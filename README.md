# AH DESIGN.md

**One design system for AI-generated enterprise interfaces.**

AH Design is a self-contained, reusable `DESIGN.md` for AI coding agents. This repository includes **AH Design only** — no other brands or imported design systems.

**[Read DESIGN.md](DESIGN.md)** · [Visual preview](preview.html) · [Agent instructions](AGENTS.md)

## Quick start

1. Download [`DESIGN.md`](DESIGN.md) from this private repository (or clone it using your authorized GitHub access).
2. Place the file at the root of the project where your AI agent will work.
3. Ask your agent:

```text
Use DESIGN.md as the only design system for this project.
Follow AH Design colors, typography, layout, components,
responsive rules, and accessibility requirements.
Default to privacy-safe skeletons. Do not invent business data,
navigation routes, or design tokens.
```

No setup, design-tool connection, or MCP server is required to use the single Markdown file.

## AH Design at a glance

| Rule | Reference |
|---|---|
| Primary | `#00008F` |
| Operational background | `#F0F6FF` |
| Card surface | `#FFFFFF` |
| Font | DB Helvethaica X web-first; documented fallback when licensed assets are unavailable |
| Desktop app shell | 200px sidebar, fluid content, 16px gutters |
| Enterprise table | 44px compact rows / 48px comfortable rows |
| Design-only content | Privacy-safe skeleton by default |

**Source of truth:** [`docs/AH_DESIGN_v2.6.md`](docs/AH_DESIGN_v2.6.md). Both the root `DESIGN.md` and [`design-md/ah-design/DESIGN.md`](design-md/ah-design/DESIGN.md) are byte-identical, automatically checked copies. Home-specific rules apply only to their documented scope.

### Optional advanced integration

For AI tools already connected to this private repository, [`AGENTS.md`](AGENTS.md) and [AI Integration](docs/AI_INTEGRATION.md) describe optional GitHub, token/contract and local read-only MCP workflows. You do not need them for the copy-and-use `DESIGN.md` workflow.

The [preview](preview.html) is a static reference, not a production application. No Figma connection, real business data, or unlicensed font files are provided.
