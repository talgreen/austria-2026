import { useTripStateLive } from "../../lib/useTripStateLive";
import { TodayHomeView } from "./TodayHomeView";

/** Live wrapper: reads the trip phase (re-checked every 30s) and hands
 *  it to the pure view. This is what the router renders for #/today. */
export default function TodayHome() {
  const state = useTripStateLive();
  return <TodayHomeView state={state} />;
}
