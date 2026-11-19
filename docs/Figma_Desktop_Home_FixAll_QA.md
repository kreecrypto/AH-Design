# AH Design v2.6 — Desktop/Home Fix All QA

**Date:** 2026-11-19  
**Updated contract:** `docs/AH_DESIGN_v2.6.md`  
**Historical audit:** [Figma Desktop/Home Audit](Figma_Desktop_Home_Audit.md)  
**Figma scope:** [Section 3093:148134](https://www.figma.com/design/9AlWhDuwC0XQ09fHWIuNl3/VDO-Agency-Portal?node-id=3093-148134) — normal Home node `3101:118014`, skeleton node `6142:388916`.

## Result

**39/39 automated source-contract checks passed.** Verification included integrity of original v2.6 operational contracts, valid YAML for amended sections, Figma-measured Home values, privacy-mode separation, Home-only scoping and original content-boundary invariants.

- **P1 Skeleton modes:** Section 5.4 separates default `privacy-safe-skeleton` (all business and navigation text withheld) from explicitly supplied, approved **runtime loading** chrome. Figma navigation is *not* permission to copy protected data into a design-only sample.
- **P1 Sidebar:** Home production nav text `DB Helvethaica X 55 Regular / 16px / 24px` is a scoped variant. Table body typography remains 20/28; other navigations await their own Figma evidence.
- **P1 Search:** Home `292×40` with input `200×40`, gap `12`, actions `80×32`. Operational search remains `370×40` with its existing 270px input.
- **P1 Loading tokens:** Home-only runtime loading shapes use `#D4D7DD`, radius `100px`, reference heights `28/18/10px`. Privacy-safe base/highlight tokens `#F7F7F8/#ECEDED` are unchanged.
- **P2 Home-only anatomy:** Section 9.6 documents measured 1440px Home geometry (1240px main, 16px gutter, hero 1240×277, quick-menu 1208×126, annual cards 596×208, personal cards 290×128, support tiles and 323×334 right card), scoped colors, titles and disabled/enabled shadow behavior.

## Regression / non-changes

- Global baseline stays **1280 = 200 sidebar + 1080 main**, fluid on wider viewports.
- Operational table row heights remain **44 / 48px**, control height **40px**, primary DB font mapping unchanged.
- Existing operational/listing design contracts, generic skeleton palette and runtime content boundary are preserved.
- Home measurements were observed **only for Desktop/Home at 1440px**. Tablet/mobile and unrelated screens have not been audited.
- Original **Mock Data HTML demo** was not modified: this release fixes documentation contracts, not a new Figma-matched implementation. Screenshots alone cannot validate live accessibility, responsiveness or product logic.

## Verified content integrity

- Before Git blob SHA: `4cd2cb07a1b9d4f611026ad5579dec08db65b98e`.
- After Git blob SHA: `81badc083ac1ef8bf7f292d189a1a153a02e9f80`.
- GitHub update returned the same after-SHA, confirming that the committed file is byte-identical to the QA'd document.

The locally generated QA file includes the detailed 39 checks and is available separately for download.
