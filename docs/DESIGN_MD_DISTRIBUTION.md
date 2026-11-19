# AH Design — DESIGN.md distribution

The root [`DESIGN.md`](../DESIGN.md) and [`design-md/ah-design/DESIGN.md`](../design-md/ah-design/DESIGN.md) are **byte-for-byte mirrors** of [canonical `docs/AH_DESIGN_v2.6.md`](AH_DESIGN_v2.6.md).

This follows the **single-design** distribution pattern in the public awesome-design-md project: users can copy one Markdown file into their own project and instruct an AI coding agent to follow it. AH Design does not import or publish any of the other brands' designs.

The canonical document remains authoritative. Do not edit the mirrors directly.

```bash
npm run design:sync   # Update mirrors after an approved change to canonical source
npm run design:check  # Fail on any mismatch between canonical and both mirrors
```

The root [`preview.html`](../preview.html) illustrates only existing AH tokens and anonymous component anatomy; it is not a secondary source of design rules. The existing structured AI contracts, privacy policy, and local MCP are optional advanced interfaces.

The Private repository requires authorized access to clone or access via connected AI applications. No Figma connection is required.
