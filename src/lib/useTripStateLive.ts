import { useEffect, useState } from "react";
import { getTripState } from "./tripState";
import type { TripState } from "./tripState";

/** Re-reads the trip phase every 30s so the home/hero flip from
 *  before → during → after (and the 20:00 "today→tomorrow" cutoff)
 *  happen without a manual refresh. */
export function useTripStateLive(): TripState {
  const [state, setState] = useState<TripState>(() => getTripState());
  useEffect(() => {
    const id = window.setInterval(() => setState(getTripState()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return state;
}
