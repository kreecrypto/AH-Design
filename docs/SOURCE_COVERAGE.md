# Coverage and Evidence — Repository-only

This record is derived from the existing Design.md and previous audits already committed in this repository. No new Figma connection or measurement was performed.

| Surface | Status | Evidence boundary |
|---|---|---|
| Operational shell, 1280px | Canonical documented contract | Design.md §§3, 6, 9, 11 |
| Desktop/Home, 1440px | Prior documented reference; scoped | Design.md §9.6 and existing historical audit |
| Home Skeleton heights | Nine values from earlier independent audit; documented, not global sizing tokens | Design.md §9.6 / prior audit; no live re-verification |
| Tablet and Mobile | Responsive guidance only; no pixel-parity certification | Design.md §13 |
| Home scenarios outside existing reference | Unverified | Do not infer |
| External AI client connections | SDK smoke test added, hosted results pending | GitHub Actions + client-specific sign-off needed |

Component releases must declare what was actually checked, from which repository source. **Never convert missing geometry into invented pixel values.**
