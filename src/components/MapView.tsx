import { useEffect, useImperativeHandle, useMemo, useRef, useState, forwardRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import { Home, Star, Utensils, ShoppingCart, Fuel, Plane, ExternalLink, Maximize2, Route, Sparkles, Grape, Locate } from "lucide-react";
import { attractions } from "../data/attractions";
import { stays } from "../data/stays";
import { services } from "../data/services";
import { wineries } from "../data/wineries";
import type { POI, Category } from "../data/types";
import { itinerary } from "../data/itinerary";
import { getAreaForDay } from "../data/areas";
import { accentClasses, type AreaAccent } from "../lib/accent";
import Section from "./Section";
import NavigateLinks from "./NavigateLinks";
import { useT, type DictKey } from "../lib/dict";
import { useLang } from "../lib/i18n";
import { useLocalizePoi, useLocalizeWinery } from "../data/i18n";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;

/* Build a lookup from attractionId → AreaAccent once at module scope.
   First itinerary occurrence of each attraction wins. */
const accentByAttraction = new Map<string, AreaAccent>();
for (const day of itinerary) {
  const accent = getAreaForDay(day.dayNumber).accent;
  for (const act of day.activities) {
    if (act.attractionId && !accentByAttraction.has(act.attractionId)) {
      accentByAttraction.set(act.attractionId, accent);
    }
  }
}

interface CategoryConfig {
  id: Category;
  labelKey: DictKey;
  color: string;
  bg: string;
  Icon: typeof Home;
}

/* Austrian alpine palette — pine, lake teal, alpine red and warm wood,
   tuned to sit on top of the CartoDB Voyager base without clashing. */
const CATEGORY_CONFIG: Record<Category, CategoryConfig> = {
  stay:        { id: "stay",        labelKey: "cat_stay",        color: "#C0392B", bg: "#C0392B", Icon: Home },         // alpine red
  attraction:  { id: "attraction",  labelKey: "cat_attraction",  color: "#B8862C", bg: "#B8862C", Icon: Star },         // warm gold
  restaurant:  { id: "restaurant",  labelKey: "cat_restaurant",  color: "#2F5E3F", bg: "#2F5E3F", Icon: Utensils },     // pine green
  supermarket: { id: "supermarket", labelKey: "cat_supermarket", color: "#2E8B9E", bg: "#2E8B9E", Icon: ShoppingCart }, // lake teal
  gas:         { id: "gas",         labelKey: "cat_gas",         color: "#8B5A2B", bg: "#8B5A2B", Icon: Fuel },         // timber brown
  airport:     { id: "airport",     labelKey: "cat_airport",     color: "#3D4F65", bg: "#3D4F65", Icon: Plane },        // twilight indigo
  hospital:    { id: "hospital",    labelKey: "cat_hospital",    color: "#8C2E25", bg: "#8C2E25", Icon: Plane },        // deep oxblood
  winery:      { id: "winery",      labelKey: "cat_winery",      color: "#7A2E3F", bg: "#7A2E3F", Icon: Grape }         // deep berry
};

function makeIcon(cat: Category, isHero = false, colorOverride?: string): L.DivIcon {
  const cfg = CATEGORY_CONFIG[cat];
  const pinColor = colorOverride ?? cfg.bg;
  const size = isHero ? 38 : 30;
  const html = `
    <div style="
      position:relative;
      width:${size}px;height:${size}px;
    ">
      <div style="
        position:absolute;inset:0;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:linear-gradient(135deg, ${pinColor} 0%, ${shade(pinColor, -15)} 100%);
        border:2px solid #FBF7EC;
        box-shadow:0 6px 14px rgba(42,31,26,0.4);
        display:flex;align-items:center;justify-content:center;
      ">
        <div style="transform:rotate(45deg);color:#FBF7EC;font-size:${isHero ? 16 : 13}px;line-height:1;font-weight:700;">
          ${categoryGlyph(cat)}
        </div>
      </div>
      ${isHero ? `<div style="position:absolute;top:-6px;right:-6px;width:14px;height:14px;border-radius:50%;background:#FBF7EC;border:2px solid #C0392B;box-shadow:0 2px 4px rgba(0,0,0,0.2);"></div>` : ""}
    </div>`;
  return L.divIcon({
    html,
    className: "austria-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size - 2],
    popupAnchor: [0, -size + 4]
  });
}

function shade(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return "#" + (0x1000000 + (R << 16) + (G << 8) + B).toString(16).slice(1);
}

/* Generous country-wide bounding box for "is the device currently in
   Austria?". Wide enough that the "you are here" dot still snaps when
   the family lands at Vienna airport in the far east, and forgiving at
   the alpine borders. */
const AUSTRIA_BBOX = { south: 46.3, north: 49.1, west: 9.5, east: 17.2 };

function isInAustria(lat: number, lon: number): boolean {
  return (
    lat >= AUSTRIA_BBOX.south &&
    lat <= AUSTRIA_BBOX.north &&
    lon >= AUSTRIA_BBOX.west &&
    lon <= AUSTRIA_BBOX.east
  );
}

/* "You are here" marker — Apple-Maps-style blue dot with a soft pulsing
   ring. The keyframes live in index.css. */
function makeUserLocationIcon(): L.DivIcon {
  const html = `
    <div style="position:relative;width:18px;height:18px;">
      <div style="
        position:absolute;
        top:50%;left:50%;
        width:18px;height:18px;
        margin:-9px 0 0 -9px;
        border-radius:50%;
        background:rgba(58,124,235,0.35);
        animation:user-location-pulse 2.2s ease-out infinite;
        pointer-events:none;
      "></div>
      <div style="
        position:absolute;inset:0;
        border-radius:50%;
        background:#3A7CEB;
        border:3px solid #FBF7EC;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
      "></div>
    </div>`;
  return L.divIcon({
    html,
    className: "austria-user-marker",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10]
  });
}

function categoryGlyph(cat: Category): string {
  switch (cat) {
    case "stay": return "&#8962;";
    case "attraction": return "&#9733;";
    case "restaurant": return "&#127860;";
    case "supermarket": return "&#128722;";
    case "gas": return "&#9981;";
    case "airport": return "&#9992;";
    case "winery": return "&#127815;"; // grapes
    default: return "&#9679;";
  }
}

const AIRPORT_POI: POI = {
  id: "vie",
  name: "Vienna Airport — VIE",
  category: "airport",
  region: "transit",
  description: "Vienna International Airport, Schwechat. Arrival 9 Aug (morning drive); departure 26 Aug 10:10.",
  shortDescription: "Arrival & departure airport.",
  coords: [48.1103, 16.5697]
};

const AIRPORT_POI_HE: POI = {
  ...AIRPORT_POI,
  name: "נמל התעופה וינה — VIE",
  description: "נמל התעופה הבינלאומי של וינה (שווכאט). נסיעה מוינה ב־9.8 בבוקר; המראה ב־26.8 בשעה 10:10.",
  shortDescription: "שדה התעופה — נחיתה והמראה."
};

// The trip's big movements between bases (lat, lon)
type RouteSegment = {
  id: string;
  labelKey: DictKey;
  dayKey: DictKey;
  color: string;
  coords: [number, number][];
};

const ROUTE_SEGMENTS: RouteSegment[] = [
  {
    id: "arrival",
    labelKey: "map_seg_arrival",
    dayKey: "map_seg_arrival_short",
    color: "#C0392B", // alpine red — matches Stays
    coords: [
      AIRPORT_POI.coords,   // VIE
      [48.2082, 16.3738],   // Vienna
      [47.8095, 13.0550],   // Salzburg
      [47.2300, 11.8800]    // Zillertal, Tyrol
    ]
  },
  {
    id: "transfer",
    labelKey: "map_seg_transfer",
    dayKey: "map_seg_transfer_short",
    color: "#B8862C", // gold — matches Attractions
    coords: [
      [47.2300, 11.8800],   // Zillertal
      [47.2465, 12.3210],   // Habachklause (Bramberg)
      [47.3264, 12.8000],   // Zell am See
      [47.4617, 13.2561]    // Werfenweng (Gut Wenghof)
    ]
  },
  {
    id: "departure",
    labelKey: "map_seg_departure",
    dayKey: "map_seg_departure_short",
    color: "#2F5E3F", // pine — matches Restaurants
    coords: [
      [47.4617, 13.2561],   // Werfenweng
      [48.2082, 16.3738],   // Vienna
      AIRPORT_POI.coords    // VIE
    ]
  }
];

interface FlyHandle {
  flyToId: (id: string) => void;
  fitAll: () => void;
  flyToCoords: (coords: [number, number], zoom?: number) => void;
}

const MapController = forwardRef<
  FlyHandle,
  { pois: POI[]; markersRef: React.MutableRefObject<Record<string, L.Marker | null>> }
>(function MapController({ pois, markersRef }, ref) {
  const map = useMap();
  useImperativeHandle(
    ref,
    () => ({
      flyToId: (id: string) => {
        const poi = pois.find(p => p.id === id);
        if (!poi) return;
        map.flyTo(poi.coords, Math.max(map.getZoom(), 12), { duration: 1.0 });
        const m = markersRef.current[id];
        if (m) {
          setTimeout(() => m.openPopup(), 700);
        }
      },
      fitAll: () => {
        if (pois.length === 0) return;
        const bounds = L.latLngBounds(pois.map(p => p.coords));
        map.flyToBounds(bounds, { padding: [40, 40], duration: 1.1, maxZoom: 11 });
      },
      flyToCoords: (coords, zoom = 12) => {
        map.flyTo(coords, Math.max(map.getZoom(), zoom), { duration: 1.0 });
      }
    }),
    [map, pois, markersRef]
  );
  return null;
});

interface Props {
  registerFocus: (fn: (id: string) => void) => void;
}

export default function MapView({ registerFocus }: Props) {
  const t = useT();
  const { lang } = useLang();
  const localizePoi = useLocalizePoi();
  const localizeWinery = useLocalizeWinery();

  /* Wineries live in their own data file (not as POIs) — project the
     ones with coords onto the map under category "winery". The
     appellation doubles as the popup short-description. We localize
     here (rather than via localizePoi) since wineries have their own
     translation dictionary. */
  const wineryPOIs: POI[] = useMemo(
    () =>
      wineries
        .filter(w => w.coords)
        .map(raw => {
          const w = localizeWinery(raw);
          return {
            id: w.id,
            name: w.name,
            category: "winery" as const,
            region: w.region,
            description: w.description,
            shortDescription: w.appellation,
            image: w.image,
            imageCredit: w.imageCredit,
            website: w.website,
            address: w.address,
            coords: w.coords as [number, number]
          };
        }),
    [localizeWinery]
  );

  const allPOIs: POI[] = useMemo(
    () => [...stays, ...attractions, ...services, ...wineryPOIs, AIRPORT_POI],
    [wineryPOIs]
  );
  const localizedPOIs = useMemo(
    () =>
      allPOIs.map(p => {
        if (p.id === "fco") return lang === "he" ? AIRPORT_POI_HE : p;
        return localizePoi(p);
      }),
    [allPOIs, localizePoi, lang]
  );

  // Default-on layers: stays, attractions, airport. Restaurants,
  // supermarkets, gas and wineries are off by default — they're there
  // when you want them but don't crowd the map on first load.
  const [activeCats, setActiveCats] = useState<Set<Category>>(
    new Set<Category>(["stay", "attraction", "airport"])
  );
  const [showRoute, setShowRoute] = useState(true);
  const [showSpokes, setShowSpokes] = useState(true);

  // Geolocation: live "you are here" dot. We use watchPosition so the
  // marker stays current as we drive around during the trip; centering
  // the map on it only happens the first time we detect we're inside
  // Austria (so the pre-trip view from Israel doesn't snap the map away
  // from the Alps).
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [geolocBlocked, setGeolocBlocked] = useState(false);
  const userIcon = useMemo(() => makeUserLocationIcon(), []);
  const hasAutoCentered = useRef(false);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      pos => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude
        ];
        setUserLocation(coords);
        setGeolocBlocked(false);
        if (!hasAutoCentered.current && isInAustria(coords[0], coords[1])) {
          hasAutoCentered.current = true;
          // Small delay so the map has finished its initial render and
          // isn't fighting our flyTo with its own center transition.
          setTimeout(() => flyRef.current?.flyToCoords(coords, 11), 350);
        }
      },
      err => {
        // Permission denied / unavailable / timeout — silently ignore;
        // the map still works, the user-location dot just won't show.
        if (err.code === err.PERMISSION_DENIED) setGeolocBlocked(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const handleLocateClick = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude
        ];
        setUserLocation(coords);
        setGeolocBlocked(false);
        // Manual button still respects the "only auto-centre in Austria"
        // rule — clicking it from Tel Aviv would otherwise zoom out of
        // the trip area, which isn't useful pre-trip.
        if (isInAustria(coords[0], coords[1])) {
          flyRef.current?.flyToCoords(coords, 13);
        }
      },
      err => {
        if (err.code === err.PERMISSION_DENIED) setGeolocBlocked(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  /* Day-trip "spokes": connect each attraction to its NEAREST base stay.
     The trip is a long road loop with several bases hundreds of km apart,
     so a "nearest base" rule keeps each excursion line short and readable
     (instead of one base fanning out across the whole country). Computed
     once from the raw (unlocalized) data — geometry is language-agnostic. */
  const spokes = useMemo(() => {
    const dist2 = (a: [number, number], b: [number, number]) =>
      (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
    const lines: { id: string; from: [number, number]; to: [number, number]; color: string }[] = [];
    for (const a of attractions) {
      let nearest = stays[0];
      for (const s of stays) {
        if (dist2(a.coords, s.coords) < dist2(a.coords, nearest.coords)) nearest = s;
      }
      if (!nearest) continue;
      lines.push({
        id: `spoke-${a.id}`,
        from: nearest.coords,
        to: a.coords,
        // Vienna-area excursions in pine, alpine excursions in gold.
        color: nearest.region === "north" ? "#2F5E3F" : "#B8862C"
      });
    }
    return lines;
  }, []);

  const markersRef = useRef<Record<string, L.Marker | null>>({});
  const flyRef = useRef<FlyHandle>(null);

  useEffect(() => {
    registerFocus((id: string) => {
      const poi = allPOIs.find(p => p.id === id);
      if (poi && !activeCats.has(poi.category)) {
        setActiveCats(prev => new Set(prev).add(poi.category));
      }
      setTimeout(() => {
        flyRef.current?.flyToId(id);
        const el = document.getElementById("map");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    });
  }, [registerFocus, allPOIs, activeCats]);

  const visible = localizedPOIs.filter(p => activeCats.has(p.category));

  const toggle = (c: Category) => {
    setActiveCats(prev => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  return (
    <Section
      id="map"
      eyebrow={t("map_eyebrow")}
      title={t("map_title")}
      kicker={t("map_kicker")}
      intro={t("map_intro")}
    >
      <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto scrollbar-hide mb-3">
        <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
          {(["stay", "attraction", "restaurant", "winery", "supermarket", "gas", "airport"] as Category[]).map(
            c => {
              const cfg = CATEGORY_CONFIG[c];
              const on = activeCats.has(c);
              const Icon = cfg.Icon;
              return (
                <button
                  key={c}
                  onClick={() => toggle(c)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-all whitespace-nowrap min-h-9 ${
                    on
                      ? "text-cream-50 shadow-sm"
                      : "bg-cream-50 text-ink-700 border-cream-300 opacity-60 hover:opacity-100 active:opacity-100"
                  }`}
                  style={
                    on ? { backgroundColor: cfg.color, borderColor: cfg.color } : undefined
                  }
                >
                  <Icon size={13} />
                  {t(cfg.labelKey)}
                  <span
                    className={`text-[10px] ${
                      on ? "text-cream-200" : "text-ink-700/60"
                    }`}
                  >
                    {allPOIs.filter(p => p.category === c).length}
                  </span>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Route ribbon: legend + toggle */}
      <div className="flex items-center justify-between gap-3 mb-3 px-1 flex-wrap">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Static legend — used to hover-highlight the matching route
              polyline on the map, but the spotlight effect was more
              distracting than useful. Now they're just pure legend. */}
          {ROUTE_SEGMENTS.map(seg => (
            <span
              key={seg.id}
              className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] font-medium transition-opacity ${
                showRoute ? "opacity-100" : "opacity-40"
              }`}
            >
              <span
                className="block w-6 h-[3px] rounded-full"
                style={{
                  background: `repeating-linear-gradient(90deg, ${seg.color} 0 4px, transparent 4px 8px)`
                }}
              />
              <span className="text-ink-800">{t(seg.dayKey)}</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSpokes(s => !s)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.16em] font-medium transition-colors min-h-9 text-cream-50 ${
              showSpokes ? "" : "opacity-60 hover:opacity-100"
            }`}
            style={{ backgroundColor: showSpokes ? "#5C7244" : "#5C7244AA" }}
            aria-pressed={showSpokes}
          >
            <Sparkles size={12} /> {showSpokes ? t("map_spokes_on") : t("map_spokes_off")}
          </button>
          <button
            onClick={() => setShowRoute(s => !s)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.16em] font-medium transition-colors min-h-9 text-cream-50 ${
              showRoute ? "" : "opacity-60 hover:opacity-100"
            }`}
            style={{ backgroundColor: showRoute ? "#A23E2A" : "#A23E2AAA" }}
            aria-pressed={showRoute}
          >
            <Route size={12} /> {showRoute ? t("map_route_on") : t("map_route_off")}
          </button>
        </div>
      </div>

      <div className="relative card-paper overflow-hidden -mx-4 sm:mx-0 rounded-none sm:rounded-2xl">
        <MapContainer
          center={[47.7, 14.1]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-[70svh] sm:h-[600px] w-full"
        >
          {/* CartoDB Voyager — warm, editorial off-cream tiles that pair
              nicely with the Tuscan palette. Free for low-traffic personal
              use, no API key required (Stadia's Stamen Watercolor blocks
              non-localhost without an account, which is why we moved off it). */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={20}
          />
          <MapController pois={allPOIs} markersRef={markersRef} ref={flyRef} />

          {/* Day-trip spokes — soft lines from each base to its region's
              attractions. Drawn underneath the main route so they don't
              compete visually. Hidden when attractions or stays are filtered out. */}
          {showSpokes &&
            activeCats.has("attraction") &&
            activeCats.has("stay") &&
            spokes.map(s => (
              <Polyline
                key={s.id}
                positions={[s.from, s.to]}
                pathOptions={{
                  color: s.color,
                  weight: 1.5,
                  opacity: 0.55,
                  dashArray: "2 6",
                  lineCap: "round"
                }}
                interactive={false}
              />
            ))}

          {/* Route polylines — flat styling, no hover spotlight (the
              spotlight added more visual noise than clarity). */}
          {showRoute &&
            ROUTE_SEGMENTS.map(seg => (
              <Polyline
                key={seg.id}
                positions={seg.coords}
                pathOptions={{
                  color: seg.color,
                  weight: 4,
                  opacity: 0.85,
                  dashArray: "10 8",
                  lineCap: "round",
                  lineJoin: "round"
                }}
                interactive={false}
              />
            ))}

          {/* "You are here" — soft pulsing blue dot. Sits above all
              other markers via Leaflet's default z-index handling. */}
          {userLocation && (
            <Marker position={userLocation} icon={userIcon} keyboard={false}>
              <Popup>
                <div className="font-sans p-2">
                  <div className="font-serif text-base text-ink-900 leading-tight">
                    {t("map_you_here")}
                  </div>
                  <div className="text-[11px] text-ink-700/65 mt-0.5">
                    {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
                  </div>
                </div>
              </Popup>
            </Marker>
          )}

          {visible.map(poi => {
            // mark the airport + stays as 'hero' (slightly bigger ringed pin)
            const isHero = poi.category === "stay" || poi.category === "airport";
            // Colour attraction pins by the trip area they belong to.
            const attractionAccent =
              poi.category === "attraction"
                ? accentByAttraction.get(poi.id)
                : undefined;
            const pinColorOverride = attractionAccent
              ? accentClasses(attractionAccent).pinHex
              : undefined;
            return (
              <Marker
                key={poi.id}
                position={poi.coords}
                icon={makeIcon(poi.category, isHero, pinColorOverride)}
                ref={ref => {
                  markersRef.current[poi.id] = ref;
                }}
              >
                <Popup>
                  <div className="font-sans">
                    {poi.image && (
                      <div
                        className="w-full h-28 bg-cream-200 bg-cover bg-center"
                        style={{ backgroundImage: `url(${poi.image})` }}
                      />
                    )}
                    <div className="p-3">
                      <div className="font-serif text-base text-ink-900 leading-tight">
                        {poi.name}
                      </div>
                      {poi.shortDescription && (
                        <p className="text-xs text-ink-700/85 mt-1 leading-snug">
                          {poi.shortDescription}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <NavigateLinks name={poi.name} coords={poi.coords} address={poi.address} size={11} />
                        {poi.website && (
                          <a
                            href={poi.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-olive-600 hover:text-olive-700"
                          >
                            <ExternalLink size={11} /> {t("website")}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Floating Fit-All button */}
        <button
          type="button"
          onClick={() => flyRef.current?.fitAll()}
          aria-label={t("map_zoom_fit")}
          className="absolute top-3 end-3 z-[400] w-10 h-10 rounded-full bg-cream-50/95 backdrop-blur ring-1 ring-cream-300/70 shadow-md hover:bg-terracotta-500 hover:text-cream-50 hover:ring-terracotta-500 transition flex items-center justify-center text-ink-800"
        >
          <Maximize2 size={16} />
        </button>

        {/* Floating Locate-me button — request / refresh user location.
            Lights up blue once we have a fix; greyed-out (but still
            tappable) if permission was denied so the user can retry. */}
        <button
          type="button"
          onClick={handleLocateClick}
          aria-label={t("map_locate_me")}
          aria-pressed={!!userLocation}
          className={`absolute top-[60px] end-3 z-[400] w-10 h-10 rounded-full backdrop-blur ring-1 shadow-md transition flex items-center justify-center ${
            userLocation
              ? "bg-[#3A7CEB] text-cream-50 ring-[#3A7CEB]/60"
              : geolocBlocked
                ? "bg-cream-50/80 text-ink-700/40 ring-cream-300/70"
                : "bg-cream-50/95 text-ink-800 ring-cream-300/70 hover:bg-[#3A7CEB] hover:text-cream-50 hover:ring-[#3A7CEB]/60"
          }`}
        >
          <Locate size={16} strokeWidth={1.9} />
        </button>
      </div>

    </Section>
  );
}
