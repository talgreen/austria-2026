import { useT } from "../lib/dict";
import RouteTimeline from "./RouteTimeline";

/** The itinerary tab: a short header over "The Route" — the trip rendered
 *  as a vertical journey spine (see RouteTimeline). Replaces the old
 *  horizontal Roman-numeral chapter strip + swipe carousel. */
export default function ItinerarySection() {
  const t = useT();
  return (
    <section
      id="trip"
      className="relative scroll-mt-20 bg-cream-50 pt-20 sm:pt-24 pb-14 sm:pb-20"
    >
      <div className="mx-auto max-w-2xl px-4 mb-6">
        <h1 className="section-title">
          {t("route_title")}
        </h1>
        <p className="mt-2 text-ink-700/75 text-[14px]">{t("route_kicker")}</p>
      </div>
      <RouteTimeline />
    </section>
  );
}
