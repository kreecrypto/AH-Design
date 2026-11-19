# AH Design Tokens

`ah-tokens.css` and `ah-tokens.json` are generated from Section 2.2 of `docs/AH_DESIGN_v2.6.md`.

Run `npm run tokens:sync` after approved canonical changes; run `npm run tokens:check` to detect drift. JSON groups are discovery labels only, not new token values. CSS aliases remain unresolved where the source uses `var(...)`. No licensed DB font binaries are included.
