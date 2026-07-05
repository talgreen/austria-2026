import type { TripState } from "../../lib/tripState";
import BeforeTrip from "./BeforeTrip";
import DuringTrip from "./DuringTrip";
import AfterTrip from "./AfterTrip";

/** Pure phase dispatcher — no hooks of its own, so tests can drive it
 *  with a crafted TripState and never touch the clock. */
export function TodayHomeView({ state }: { state: TripState }) {
  if (state.phase === "before") return <BeforeTrip state={state} />;
  if (state.phase === "during") return <DuringTrip state={state} />;
  return <AfterTrip />;
}
