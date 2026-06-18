import type { Winery } from "../types";

/** Hebrew overrides for wineries, keyed by id. No wineries on the Austria
 *  trip, so this overlay is intentionally empty. */
export const wineriesHE: Record<
  string,
  Partial<Pick<Winery, "name" | "description" | "address" | "bookingNote">>
> = {};
