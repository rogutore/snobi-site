/* The one paper-drip dose the journal counts with: 全日本コーヒー協会「ペーパードリップ式」, 1杯140mL分＝中細挽きの粉12g・
   湯160mL (AJCA_DRIP.url, opened 2026-10-09). An external guide, not a SNöBI recipe; every article that says 12g, a cup
   count or a price per cup reads it from here (SINGLE_SOURCE, 2026-10-11: it was typed in five articles).
   Cup counts round down (100g → 8, 200g → 16); yen per cup rounds to the nearest yen. */
export const AJCA_DRIP = { grams: 12, waterMl: 160, yieldMl: 140, url: "https://coffee.ajca.or.jp/column/4468/" } as const;

/** Whole cups in a bag of `grams` at the AJCA dose, rounded down. */
export const cupsIn = (grams: number) => Math.floor(grams / AJCA_DRIP.grams);

/** Yen per cup for a bag of `grams` sold at `yenPrice`. */
export const cupYen = (yenPrice: number, grams: number) => Math.round((yenPrice * AJCA_DRIP.grams) / grams);

/** The AJCA dose per litre of water, for comparing with SCA's 55 g/L. */
export const gramsPerLitre = Math.round((AJCA_DRIP.grams / AJCA_DRIP.waterMl) * 1000);

/** The note under every per-cup price. */
export const ajcaDripNote = `淹れ方の目安：全日本コーヒー協会のペーパードリップの例では、1杯${AJCA_DRIP.yieldMl}mL分に中細挽きの粉${AJCA_DRIP.grams}g、湯${AJCA_DRIP.waterMl}mL。SNöBIで検証したレシピではなく、一般的な目安です。`;
