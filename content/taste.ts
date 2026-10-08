/* Taste profile per coffee (Davy's note: show people VISUALLY what we sell; refs tokado-coffee, Black & White Roasters).
   Scale 1–5. STATUS: DRAFT — values are my reading of the cup notes in products.ts, NOT a roaster's cupping.
   They must be replaced by the roaster's numbers before this ships; pages show a "仮" badge while draft = true. */
export const tasteDraft = true;
export const tasteAxes = [
  ["acidity", "酸味"],
  ["sweetness", "甘さ"],
  ["body", "コク"],
] as const;
export const taste: Record<string, { acidity: number; sweetness: number; body: number }> = {
  peru: { acidity: 4, sweetness: 3, body: 2 }, // floral · mikan · tea
  "ethiopia-guji": { acidity: 3, sweetness: 5, body: 3 }, // berry · dried fruit · sweet (natural)
  "colombia-huila": { acidity: 3, sweetness: 3, body: 3 }, // citrus · caramel · balanced
  "mexico-chiapas-decaf": { acidity: 2, sweetness: 4, body: 4 }, // sweet potato · brown sugar · gentle acidity
};
