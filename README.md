# AH DESIGN.md

**One design language. One source of truth. Made for AI coding agents.**

AH Design is a single, reusable enterprise UI design system. Place its `DESIGN.md` in your project's root and let an AI coding agent follow the documented visual language, layout geometry, component states and privacy rules. No library of other brands, no legacy themes, no Figma connection required.

**[Get DESIGN.md](DESIGN.md)** · **[View visual preview](preview.html)** · **[Open the AH Design entry](design-md/ah-design/README.md)** · **[AI integration](docs/AI_INTEGRATION.md)**

> **Privacy first:** for design-only requests, AH Design defaults to **privacy-safe skeletons**, not invented navigation, statuses, customers or business data. A synthetic-data demo is a separate, explicitly requested mode.

---

## The collection

| Design system | Character | Design file | Visual preview |
|:--|:--|:--|:--|
| **AH Design v2.6** | Deep blue `#00008F` · light-blue app canvas `#F0F6FF` · white operational cards · enterprise data density · DB Helvethaica X web-first | [**DESIGN.md**](design-md/ah-design/DESIGN.md) | [**preview.html**](design-md/ah-design/preview.html) |

**Exactly one entry:** `design-md/ah-design/`. This is an AH Design system repository, not a collection of other companies' design languages.

## What is DESIGN.md?

`DESIGN.md` tells AI **how an interface should look and behave**. `AGENTS.md` tells coding agents **how to apply those rules in this repository**.

| File | Role |
|:--|:--|
| [`DESIGN.md`](DESIGN.md) | Drop-in, complete AH visual + UX contract (root entrypoint) |
| [`AGENTS.md`](AGENTS.md) | AI agent workflow, page-specific precedence and safety boundaries |
| [`preview.html`](preview.html) | Self-contained token/component reference catalog; open locally in a browser |
| [`tokens/ah-tokens.css`](tokens/ah-tokens.css) | Generated canonical CSS variables |
| [`tokens/ah-tokens.json`](tokens/ah-tokens.json) | Same tokens in machine-readable JSON |
| [`contracts/components.json`](contracts/components.json) | 19 indexed component contracts, with approved baseline and source anchors |
| [`contracts/page-profiles.json`](contracts/page-profiles.json) | Scoped Home versus Operational rules |
| [`contracts/policies.json`](contracts/policies.json) | Privacy-safe / approved runtime content boundary |

## Use AH Design with any AI coding agent

**1. Copy** [`DESIGN.md`](DESIGN.md) into the root of your own project. Or clone this private repository with your authorized GitHub account.

**2. Give your agent this instruction:**

```text
Use only the AH Design System in DESIGN.md as the source of truth.
Build an accessible, responsive enterprise interface at the documented
1280px operational reference. Reuse --ah-* tokens and component
contracts. Default to privacy-safe skeleton placeholders.
Do not invent business content, navigation, colors, or other design systems.
```

**3. Verify** the output against the specified page type, layout, typography, contrast, interaction states, and 44px mobile effective touch targets.

If you want a synthetic-data prototype rather than a design-only skeleton, request it explicitly and keep fake runtime data outside the design contract.

### Use directly from the private GitHub repo

AI tools with authorized GitHub access can read `DESIGN.md`, `AGENTS.md`, and `design-system.json`. For structured tools, this repo also includes a **local, read-only MCP server** and an Agent Skill. See [AI connection instructions](docs/AI_INTEGRATION.md). Private repository access is required; the files are not exposed as an open unauthenticated API.

## Visual language

| Principle | AH Design rule |
|:--|:--|
| **Color** | `#00008F` primary · `#F0F6FF` app background · `#FFFFFF` card surface |
| **Typography** | DB Helvethaica X web-first, with the documented fallback if licensed font assets are unavailable |
| **Desktop shell** | 1280px reference; 200px sidebar + fluid main content; 16px content gutters |
| **Topbar & controls** | 64px topbar; typically 40px control height |
| **Enterprise table** | 44px header, 44px compact rows / 48px comfortable rows |
| **Scoped Home** | Only where the document explicitly specifies the 1440px Home reference; not global |
| **Default content** | Strict privacy-safe skeleton, no inferred customer, role, route or status data |

**No Dark Mode is presented as part of AH Design** because the existing canonical source does not specify a complete dark-mode contract. The preview is a design reference, not a production application.

## Repository layout

```text
AH-Design/
├── DESIGN.md                       # Copy this into your project
├── README.md
├── AGENTS.md
├── preview.html                    # Open locally
├── design-md/
│   └── ah-design/                  # Only design entry
│       ├── DESIGN.md               # Exact mirror of canonical source
│       ├── README.md
│       └── preview.html
├── docs/
│   └── AH_DESIGN_v2.6.md           # Canonical authoritative source
├── tokens/                         # CSS and JSON generated from canonical source
├── contracts/                      # Machine-readable AI contracts
├── skills/ah-design-system/        # Agent Skill
├── integrations/mcp/               # Local read-only MCP
├── demo/                           # Isolated synthetic-data demo (not the spec)
└── tests/                           # Token / contract / MCP regression
```

### Maintainers — keep copies synchronized

```bash
npm install
npm run design:check
npm run tokens:check
npm run validate
npm test
```

If the canonical document changes, deliberately update its source hashes / approved fixtures as described in [release instructions](docs/RELEASING.md), then run `npm run design:sync` to refresh both public DESIGN.md entrypoints. `design:check` fails CI if either copy differs from the canonical source.

## Provenance and limitations

This repository is **AH Design only**; its canonical system was supplied for this project. Its [reference inspiration for the one-file distribution pattern](https://github.com/VoltAgent/awesome-design-md) does not imply importing any other brand's tokens or prose. The private repo retains its previous source, demo and QA history. Home reference measurements are limited to already documented desktop scope; mobile/tablet parity has not been independently certified. No licensed fonts, real business data, or remote MCP hosting are distributed.

For review notes, see [QA Report](docs/AI_HARDENING_QA_2026-11-19.md) and [Release Guide](docs/RELEASING.md).
