import type { TabKey } from "../lib/route";
import MapView from "./MapView";
import AttractionsGrid from "./AttractionsGrid";
import FoodAndWineSection from "./FoodAndWineSection";
import StaysSection from "./StaysSection";
import TipsSection from "./TipsSection";
import ChecklistSection from "./ChecklistSection";
import EmergencySection from "./EmergencySection";
import ServicesSection from "./ServicesSection";
import ItinerarySection from "./ItinerarySection";
import TripStats from "./TripStats";

/** Renders exactly ONE tab view at a time. Heavy views (Map/Leaflet,
 *  image grids) only mount when their tab is active — this is the core
 *  of the "real tabbed experience": no endless scroll, no always-mounted
 *  sections. `registerFocus` is threaded into the Map tab for the
 *  existing map-focus context. */
export default function TabShell({
  tab,
  registerFocus
}: {
  tab: TabKey;
  registerFocus: (fn: (id: string) => void) => void;
}) {
  switch (tab) {
    case "plan":
      return (
        <>
          <ItinerarySection />
          <section className="relative py-12 sm:py-16 bg-cream-100/40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <TripStats />
            </div>
          </section>
        </>
      );
    case "map":
      return (
        <div className="pt-20">
          <MapView registerFocus={registerFocus} />
        </div>
      );
    case "places":
      return (
        <div className="pt-20">
          <AttractionsGrid />
        </div>
      );
    case "food":
      return (
        <div className="pt-20">
          <FoodAndWineSection />
        </div>
      );
    case "stays":
      return (
        <div className="pt-20">
          <StaysSection />
        </div>
      );
    case "tips":
      return (
        <div className="pt-20">
          <TipsSection />
          <ServicesSection />
        </div>
      );
    case "checklist":
      return (
        <div className="pt-20">
          <ChecklistSection />
        </div>
      );
    case "emergency":
      return (
        <div className="pt-20">
          <EmergencySection />
        </div>
      );
  }
}
