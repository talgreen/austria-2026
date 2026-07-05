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
      className="relative scroll-mt-20 bg-gradient-to-b from-cream-100/60 to-cream-100/30 pt-20 sm:pt-24 pb-14 sm:pb-20"
    >
      <div className="mx-auto max-w-2xl px-4 mb-6">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink-900 leading-tight">
          {t("route_title")}
        </h1>
        <p className="mt-2 font-serif italic text-terracotta-700/80 text-base">{t("route_kicker")}</p>
      </div>
      <RouteTimeline />
    </section>
  );
}
