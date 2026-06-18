import type { Winery } from "./types";

/**
 * This is a young-family alpine road trip, not a wine-tour, so we don't
 * carry a winery list — Austria's drinks (Grüner Veltliner, Almdudler,
 * Stiegl, the Wiener Melange) live in the Food & Drink section as
 * "drink" dishes instead. The export stays an empty array so the map's
 * winery layer and the food section simply render nothing here.
 */
export const wineries: Winery[] = [];

export const wineriesByRegion = (r: "north" | "south") =>
  wineries.filter(w => w.region === r);
