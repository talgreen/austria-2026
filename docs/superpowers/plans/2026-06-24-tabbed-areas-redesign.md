# Tabbed, Area-Coloured Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single long-scrolling trip app into a true tabbed experience (only the active view mounts), organised around six colour-coded trip areas, with Hebrew as the default language, a vertical day-timeline that surfaces hours and the day-2 lake stop, surfaced links for attractions/towns, and per-area accommodation.

**Architecture:** A new `areas.ts` data spine groups the existing 19 days into 6 contiguous segments, each mapped to a stay and an accent colour. The hash router gains a tab dimension; `App.tsx` becomes a `TabShell` that conditionally renders exactly one section view. Day rendering moves to a reusable vertical-timeline pair. Accent colours flow through one `accent.ts` helper so nothing hard-codes hexes.

**Tech Stack:** Vite 8, React 19, TypeScript ~6, Tailwind v4 (CSS-first `@theme`), framer-motion, react-leaflet, lucide-react.

## Global Constraints

- **No test runner exists.** Verification for every task = `npm run build` (runs `tsc -b` typecheck + `vite build`) passes with zero errors, `npm run lint` passes, plus the task's stated visual check via `npm run dev`. Do NOT add a test framework.
- **i18n:** all user-facing strings go through the dict (`useT`) / `Loc` mechanism; never hard-code a bare English/Hebrew string in a component. New strings get both `en` and `he` values.
- **RTL-safe:** the app runs RTL by default (Hebrew). Use logical CSS (`start`/`end`, `ms-`/`me-`) not `left`/`right`; clock digits and Latin proper nouns stay LTR.
- **Accent colours come only from `accent.ts`.** Components never hard-code `terracotta`/`olive`/etc. for area theming.
- **Palette tokens** (already in `src/index.css`): `terracotta`, `olive`, `lake`, `gold`, `sienna`, plus neutrals `cream`/`ink`. No new colour tokens.
- **Day count is 19** (day numbers 1–19). Area accents: Vienna(arrival)=terracotta, Salzburg=olive, Tyrol=lake, Zell am See=gold, Werfenweng=sienna, Vienna(finale)=terracotta.
- **Commit after each task** with a clear `feat:`/`refactor:` message.

---

## File Structure

**New files:**
- `src/data/areas.ts` — `Area` type, the 6-area array, `getAreaForDay`, `getAreaById`, `getStayForArea`.
- `src/lib/accent.ts` — `AreaAccent` type + `accentClasses(accent)` → class fragments (text/border/bgTint/ring/pinHex/dot).
- `src/components/TabShell.tsx` — switches on the active `TabKey`, renders exactly one view.
- `src/components/AreaBand.tsx` — area header (name, dates, nights, where-you-sleep chip) in the area accent.
- `src/components/Timeline.tsx` — `TimelineStop` + `DriveConnector` (+ `LeaveByBadge`) reusable units.
- `src/components/WhereYouSleep.tsx` — compact stay strip for a day/area.

**Modified files:**
- `src/lib/route.ts` — add tab dimension to the route.
- `src/App.tsx` — tab shell wiring.
- `src/components/Navbar.tsx`, `src/components/MobileBottomNav.tsx` — switch tabs instead of scrolling.
- `src/components/ItinerarySection.tsx`, `src/components/TripStrip.tsx`, `src/components/ChapterCard.tsx`, `src/components/ChapterDetailPage.tsx` — area tinting + timeline.
- `src/components/AttractionCard.tsx`, `src/components/StaysSection.tsx`, `src/components/MapView.tsx` — links / accent pins / regroup.
- `src/lib/i18n.tsx`, `src/lib/lang.ts`, `src/index.css` — Hebrew default + type refinements.
- `src/data/types.ts` — `DayActivity.link?: string`.
- `src/lib/dict.ts` (+ `src/data/i18n/*` if dict pulls from there) — new label strings.

---

## Task 1: Areas data spine + accent helper

**Files:**
- Create: `src/lib/accent.ts`
- Create: `src/data/areas.ts`

**Interfaces:**
- Consumes: `stays` from `src/data/stays.ts`; `itinerary` from `src/data/itinerary.ts`; `Loc` from `src/lib/lang.ts`.
- Produces:
  - `type AreaAccent = "terracotta" | "olive" | "lake" | "gold" | "sienna"`
  - `function accentClasses(a: AreaAccent): { text: string; border: string; bgTint: string; ring: string; dot: string; pinHex: string }`
  - `interface Area { id: string; name: Loc<string>; shortName: Loc<string>; dayNumbers: number[]; startDate: string; endDate: string; nights: number; stayId: string; accent: AreaAccent }`
  - `const areas: Area[]`
  - `function getAreaForDay(dayNumber: number): Area`
  - `function getAreaById(id: string): Area | undefined`
  - `function getStayForArea(area: Area): Stay | undefined`

- [ ] **Step 1: Create `src/lib/accent.ts`**

```ts
/** Per-area accent colours. Names map to the palette tokens already
 *  defined in src/index.css. accentClasses() is the ONLY place that
 *  turns an accent into Tailwind classes / hexes — components never
 *  hard-code a colour for area theming. */
export type AreaAccent = "terracotta" | "olive" | "lake" | "gold" | "sienna";

interface AccentClasses {
  /** Strong text colour, e.g. headings / eyebrows. */
  text: string;
  /** Left/leading border colour for cards & timeline spine. */
  border: string;
  /** Very soft background tint for bands/chips. */
  bgTint: string;
  /** Focus/selected ring. */
  ring: string;
  /** Small filled dot / pill background. */
  dot: string;
  /** Raw hex for Leaflet pin markers (no Tailwind there). */
  pinHex: string;
}

const MAP: Record<AreaAccent, AccentClasses> = {
  terracotta: {
    text: "text-terracotta-600",
    border: "border-terracotta-500",
    bgTint: "bg-terracotta-500/10",
    ring: "ring-terracotta-500/40",
    dot: "bg-terracotta-500",
    pinHex: "#C0392B"
  },
  olive: {
    text: "text-olive-700",
    border: "border-olive-500",
    bgTint: "bg-olive-500/10",
    ring: "ring-olive-500/40",
    dot: "bg-olive-500",
    pinHex: "#2F5E3F"
  },
  lake: {
    text: "text-lake-600",
    border: "border-lake-500",
    bgTint: "bg-lake-500/10",
    ring: "ring-lake-500/40",
    dot: "bg-lake-500",
    pinHex: "#2E8B9E"
  },
  gold: {
    text: "text-sienna-600",
    border: "border-gold-500",
    bgTint: "bg-gold-500/12",
    ring: "ring-gold-500/40",
    dot: "bg-gold-500",
    pinHex: "#B8862C"
  },
  sienna: {
    text: "text-sienna-600",
    border: "border-sienna-500",
    bgTint: "bg-sienna-500/10",
    ring: "ring-sienna-500/40",
    dot: "bg-sienna-500",
    pinHex: "#8B5A2B"
  }
};

export function accentClasses(a: AreaAccent): AccentClasses {
  return MAP[a];
}
```

Note: `bg-sienna-500/10` and `ring-*` rely on Tailwind generating those utilities from the `@theme` tokens. They are in the same families already used across the app, so they compile. `gold` maps its text to `sienna-600` because gold-on-cream text is too light (matches the existing `.pill-gold` choice in index.css).

- [ ] **Step 2: Create `src/data/areas.ts`**

```ts
import type { Stay } from "./types";
import type { Loc } from "../lib/lang";
import type { AreaAccent } from "../lib/accent";
import { stays } from "./stays";

/**
 * The trip's six contiguous AREA segments, in order. Areas are defined by
 * explicit day-number ranges (not by Day.base) because Vienna bookends the
 * trip at both ends and must stay chronologically separate. Each area maps
 * 1:1 to a stay in stays.ts and carries an accent colour (see accent.ts).
 */
export interface Area {
  id: string;
  name: Loc<string>;
  shortName: Loc<string>;
  dayNumbers: number[];
  startDate: string; // ISO of first day
  endDate: string;   // ISO of last day
  nights: number;
  stayId: string;
  accent: AreaAccent;
}

export const areas: Area[] = [
  {
    id: "vienna-arrival",
    name: { en: "Vienna — arrival", he: "וינה — נחיתה" },
    shortName: { en: "Vienna", he: "וינה" },
    dayNumbers: [1],
    startDate: "2026-08-08",
    endDate: "2026-08-09",
    nights: 1,
    stayId: "stay-vienna-arrival",
    accent: "terracotta"
  },
  {
    id: "salzburg",
    name: { en: "Salzburg", he: "זלצבורג" },
    shortName: { en: "Salzburg", he: "זלצבורג" },
    dayNumbers: [2, 3],
    startDate: "2026-08-09",
    endDate: "2026-08-11",
    nights: 2,
    stayId: "stay-salzburg",
    accent: "olive"
  },
  {
    id: "tyrol",
    name: { en: "Tyrol · Zillertal", he: "טירול · צילרטל" },
    shortName: { en: "Tyrol", he: "טירול" },
    dayNumbers: [4, 5, 6, 7],
    startDate: "2026-08-11",
    endDate: "2026-08-15",
    nights: 4,
    stayId: "stay-tyrol",
    accent: "lake"
  },
  {
    id: "zell",
    name: { en: "Zell am See · Pinzgau", he: "צל אם זה · פינצגאו" },
    shortName: { en: "Zell am See", he: "צל אם זה" },
    dayNumbers: [8, 9, 10, 11, 12],
    startDate: "2026-08-15",
    endDate: "2026-08-20",
    nights: 5,
    stayId: "stay-habachklause",
    accent: "gold"
  },
  {
    id: "werfenweng",
    name: { en: "Werfenweng", he: "וורפנונג" },
    shortName: { en: "Werfenweng", he: "וורפנונג" },
    dayNumbers: [13, 14, 15],
    startDate: "2026-08-20",
    endDate: "2026-08-23",
    nights: 3,
    stayId: "stay-gutwenghof",
    accent: "sienna"
  },
  {
    id: "vienna-finale",
    name: { en: "Vienna — finale", he: "וינה — סיום" },
    shortName: { en: "Vienna", he: "וינה" },
    dayNumbers: [16, 17, 18, 19],
    startDate: "2026-08-23",
    endDate: "2026-08-26",
    nights: 3,
    stayId: "stay-vienna",
    accent: "terracotta"
  }
];

export function getAreaForDay(dayNumber: number): Area {
  const found = areas.find(a => a.dayNumbers.includes(dayNumber));
  // Day numbers 1..19 are all covered; fall back to the first area defensively.
  return found ?? areas[0];
}

export function getAreaById(id: string): Area | undefined {
  return areas.find(a => a.id === id);
}

export function getStayForArea(area: Area): Stay | undefined {
  return stays.find(s => s.id === area.stayId);
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run build`
Expected: PASS (no TS errors). If Tailwind warns about an unknown utility, note it — these tokens exist, so it should compile.

- [ ] **Step 4: Sanity check the mapping**

Run: `npm run dev`, then in the browser console paste:
```js
// quick coverage check — every day 1..19 resolves to an area
```
Manually confirm in code review that `dayNumbers` across the 6 areas equal `[1..19]` with no gaps/overlaps. (1; 2,3; 4-7; 8-12; 13-15; 16-19 → 19 days, contiguous.)

- [ ] **Step 5: Commit**

```bash
git add src/lib/accent.ts src/data/areas.ts
git commit -m "feat: add area data spine and accent-colour helper"
```

---

## Task 2: Route gains a tab dimension

**Files:**
- Modify: `src/lib/route.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces:
  - `type TabKey = "plan" | "map" | "places" | "food" | "stays" | "tips" | "checklist" | "emergency"`
  - `type Route = { kind: "tab"; tab: TabKey } | { kind: "chapter"; day: number }`
  - `const TAB_KEYS: TabKey[]`
  - `function navigateTab(tab: TabKey): void`
  - existing `navigateChapter`, `rememberChapter`, `getRememberedChapter`, `useHashRoute` kept.

- [ ] **Step 1: Rewrite the route module**

Replace the contents of `src/lib/route.ts` with:

```ts
import { useEffect, useState } from "react";

export type TabKey =
  | "plan"
  | "map"
  | "places"
  | "food"
  | "stays"
  | "tips"
  | "checklist"
  | "emergency";

export const TAB_KEYS: TabKey[] = [
  "plan",
  "map",
  "places",
  "food",
  "stays",
  "tips",
  "checklist",
  "emergency"
];

export type Route =
  | { kind: "tab"; tab: TabKey }
  | { kind: "chapter"; day: number };

function isTabKey(v: string): v is TabKey {
  return (TAB_KEYS as string[]).includes(v);
}

export function parseHash(hash: string): Route {
  const chapter = hash.match(/^#chapter\/(\d+)$/);
  if (chapter) {
    const day = parseInt(chapter[1], 10);
    if (day >= 1 && day <= 19) return { kind: "chapter", day };
  }
  const tab = hash.match(/^#\/?([a-z]+)$/);
  if (tab && isTabKey(tab[1])) return { kind: "tab", tab: tab[1] };
  return { kind: "tab", tab: "plan" };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window !== "undefined" ? parseHash(window.location.hash) : { kind: "tab", tab: "plan" }
  );
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigateTab(tab: TabKey) {
  window.location.hash = tab === "plan" ? "/plan" : `/${tab}`;
  window.scrollTo({ top: 0 });
}

export function navigateChapter(day: number) {
  window.location.hash = `chapter/${day}`;
}

const REMEMBERED_KEY = "austria:lastChapter";

export function rememberChapter(day: number) {
  try {
    sessionStorage.setItem(REMEMBERED_KEY, String(day));
  } catch {
    /* ignore */
  }
}

export function getRememberedChapter(): number | null {
  try {
    const v = sessionStorage.getItem(REMEMBERED_KEY);
    if (!v) return null;
    const n = parseInt(v, 10);
    return n >= 1 && n <= 19 ? n : null;
  } catch {
    return null;
  }
}
```

Note: `navigateHome` is removed; any caller (e.g. `ChapterDetailPage`'s back button) will be updated in Task 8 to call `navigateTab("plan")`.

- [ ] **Step 2: Find existing callers that will break**

Run: `grep -rn "navigateHome\|route.kind === \"home\"\|kind: \"home\"" src/`
Expected: identifies `App.tsx` and `ChapterDetailPage.tsx` (and possibly `Hero`/`Navbar`). These are fixed in Tasks 3 and 8. Build will fail until then — that is expected; this task's build check is deferred to Task 3.

- [ ] **Step 3: Commit**

```bash
git add src/lib/route.ts
git commit -m "refactor: extend hash route with a tab dimension"
```

---

## Task 3: TabShell + App.tsx tab wiring

**Files:**
- Create: `src/components/TabShell.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `TabKey`, `useHashRoute` from `route.ts`; all section components.
- Produces: `<TabShell tab={TabKey} />` renders exactly one section view.

- [ ] **Step 1: Create `src/components/TabShell.tsx`**

```tsx
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
```

Note: `Services` previously had no nav entry; it is folded into the Tips tab so it keeps a home. Adjust if a reviewer prefers it elsewhere.

- [ ] **Step 2: Rewrite `src/App.tsx`**

```tsx
import { useCallback, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import ChapterDetailPage from "./components/ChapterDetailPage";
import InstallPrompt from "./components/InstallPrompt";
import Gemininio from "./components/Gemininio";
import TabShell from "./components/TabShell";
import { MapFocusContext } from "./lib/mapContext";
import { useHashRoute, navigateTab } from "./lib/route";

export default function App() {
  const focusFnRef = useRef<((id: string) => void) | null>(null);
  const route = useHashRoute();

  const focusOn = useCallback((id: string) => {
    // Switching to the map tab before focusing guarantees the map is mounted.
    navigateTab("map");
    // Defer until MapView has registered its focus fn after mount.
    setTimeout(() => focusFnRef.current?.(id), 350);
  }, []);

  const registerFocus = useCallback((fn: (id: string) => void) => {
    focusFnRef.current = fn;
  }, []);

  if (route.kind === "chapter") {
    return (
      <>
        <ChapterDetailPage dayNumber={route.day} />
        <InstallPrompt />
        <Gemininio />
      </>
    );
  }

  return (
    <MapFocusContext.Provider value={{ focusOn }}>
      <Navbar activeTab={route.tab} />
      {route.tab === "plan" && <Hero />}
      <TabShell tab={route.tab} registerFocus={registerFocus} />
      <Footer />
      <div className="h-20 md:hidden" aria-hidden />
      <MobileBottomNav activeTab={route.tab} />
      <InstallPrompt />
      <Gemininio />
    </MapFocusContext.Provider>
  );
}
```

Note: `Navbar` and `MobileBottomNav` now take an `activeTab` prop (added in Task 4). Until Task 4 lands, TypeScript will error on the unknown prop — implement Task 4 immediately after, or temporarily omit the prop and add it in Task 4. Recommended: do Task 4 in the same sitting and run the build once at the end of Task 4.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx src/components/TabShell.tsx
git commit -m "feat: add TabShell and rewire App to render one tab at a time"
```

---

## Task 4: Navbar + MobileBottomNav switch tabs (not scroll)

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/MobileBottomNav.tsx`

**Interfaces:**
- Consumes: `TabKey`, `navigateTab` from `route.ts`.
- Produces: both components accept `{ activeTab: TabKey }` and call `navigateTab` on click.

- [ ] **Step 1: Update `Navbar.tsx`**

Change the links array to carry `TabKey` ids and switch the handler. Replace the `links` constant and `handleClick`/render with:

```tsx
import { useEffect, useState } from "react";
import { useT, type DictKey } from "../lib/dict";
import LanguageSwitcher from "./LanguageSwitcher";
import { navigateTab, type TabKey } from "../lib/route";

const links: { id: TabKey; key: DictKey }[] = [
  { id: "plan",      key: "nav_plan" },
  { id: "places",    key: "nav_attractions" },
  { id: "food",      key: "nav_food" },
  { id: "map",       key: "nav_map" },
  { id: "stays",     key: "nav_stays" },
  { id: "tips",      key: "nav_tips" },
  { id: "checklist", key: "nav_checklist" },
  { id: "emergency", key: "nav_emergency" }
];

export default function Navbar({ activeTab }: { activeTab: TabKey }) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      dir="ltr"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-50/85 backdrop-blur-md border-b border-cream-300/60 shadow-sm"
          : "bg-cream-50/70 backdrop-blur-sm"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        <button
          onClick={() => navigateTab("plan")}
          className="flex items-baseline gap-2 group min-h-11"
        >
          <span className={`font-serif text-xl sm:text-2xl text-ink-900 group-hover:text-terracotta-600 transition-colors`}>
            {t("brand_short")}
          </span>
          <span className="font-serif italic text-terracotta-600 text-base sm:text-lg">{t("brand_year")}</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => navigateTab(l.id)}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === l.id
                  ? "text-terracotta-600"
                  : "text-ink-700 hover:text-terracotta-600"
              }`}
            >
              {t(l.key)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher onDark={false} />
        </div>
      </div>
    </nav>
  );
}
```

Note: the navbar is no longer transparent-over-hero on every section (only the Plan tab shows the Hero). A light translucent base keeps it readable on all tabs. `onDark` is set to `false` since the bar always has a light base now.

- [ ] **Step 2: Update `MobileBottomNav.tsx`**

Replace the scroll logic with tab switching. Key changes: drop `SECTION_IDS`/`MORE_SECTION_IDS`/scroll listener; the component takes `activeTab`; primary tabs call `navigateTab`; the "More" sheet links call `navigateTab` then close.

```tsx
import { useState } from "react";
import { CalendarDays, Map, Compass, Utensils, MoreHorizontal, Download } from "lucide-react";
import { useT, type DictKey } from "../lib/dict";
import { useLang } from "../lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { canShowInstallOption, triggerInstallPrompt } from "../lib/install";
import { navigateTab, type TabKey } from "../lib/route";

const TABS: { id: TabKey | "more"; key: DictKey; Icon: typeof CalendarDays }[] = [
  { id: "plan",   key: "nav_plan",        Icon: CalendarDays },
  { id: "places", key: "nav_attractions", Icon: Compass },
  { id: "food",   key: "nav_food",        Icon: Utensils },
  { id: "map",    key: "nav_map",         Icon: Map },
  { id: "more",   key: "nav_attractions", Icon: MoreHorizontal }
];

const MORE_LINKS: { id: TabKey; key: DictKey }[] = [
  { id: "stays",     key: "nav_stays" },
  { id: "tips",      key: "nav_tips" },
  { id: "checklist", key: "nav_checklist" },
  { id: "emergency", key: "nav_emergency" }
];

const MORE_LABEL: Record<"en" | "he", string> = { en: "More", he: "עוד" };
const MORE_TAB_IDS = new Set<TabKey>(["stays", "tips", "checklist", "emergency"]);

export default function MobileBottomNav({ activeTab }: { activeTab: TabKey }) {
  const t = useT();
  const { lang } = useLang();
  const [moreOpen, setMoreOpen] = useState(false);
  const [showInstall] = useState<boolean>(() => canShowInstallOption());

  const handleInstallClick = () => {
    setMoreOpen(false);
    triggerInstallPrompt();
  };

  const go = (id: TabKey) => {
    setMoreOpen(false);
    navigateTab(id);
  };

  const activeIsMore = MORE_TAB_IDS.has(activeTab);

  return (
    <>
      {moreOpen && (
        <div
          className="fixed inset-0 z-[8000] bg-ink-900/30 backdrop-blur-sm md:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="absolute bottom-[calc(64px+env(safe-area-inset-bottom))] inset-x-0 bg-cream-50 border-t border-cream-300/70 rounded-t-3xl px-4 pt-3 pb-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-cream-300 rounded-full mx-auto mb-4" />
            <div className="grid grid-cols-2 gap-2">
              {MORE_LINKS.map(l => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="text-start bg-cream-100 hover:bg-cream-200 active:bg-cream-300 transition-colors rounded-xl px-4 py-4 text-base font-medium text-ink-900"
                >
                  {t(l.key)}
                </button>
              ))}
            </div>
            {showInstall && (
              <button
                onClick={handleInstallClick}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 active:bg-terracotta-700 text-cream-50 rounded-xl px-4 py-3 text-sm font-medium shadow-sm shadow-terracotta-700/20 transition-colors"
              >
                <Download size={16} />
                {t("install_menu_label")}
              </button>
            )}
            <div className="mt-3 flex justify-center">
              <LanguageSwitcher variant="minimal" />
            </div>
          </div>
        </div>
      )}

      <nav
        className="fixed bottom-0 inset-x-0 z-[8001] md:hidden bg-cream-50/95 backdrop-blur-md border-t border-cream-300/70 shadow-[0_-4px_24px_rgba(42,31,26,0.08)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5 h-16">
          {TABS.map(({ id, key, Icon }) => {
            const isActive = id === "more" ? activeIsMore : activeTab === id;
            const label = id === "more" ? MORE_LABEL[lang] : t(key);
            return (
              <li key={id}>
                <button
                  onClick={() => (id === "more" ? setMoreOpen(o => !o) : go(id))}
                  className={`w-full h-full flex flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors active:scale-[0.96] ${
                    isActive ? "text-terracotta-600" : "text-ink-700/70"
                  }`}
                >
                  <span className={`w-10 h-7 flex items-center justify-center rounded-full transition-colors ${isActive ? "bg-terracotta-500/12" : ""}`}>
                    <Icon size={18} strokeWidth={isActive ? 2.4 : 1.8} />
                  </span>
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
```

- [ ] **Step 3: Build the whole app (first full green build since Task 2)**

Run: `npm run build`
Expected: PASS. If errors mention `navigateHome` or `kind: "home"`, fix the remaining caller (likely `Hero.tsx` "explore" button → change to `navigateTab("plan")` or remove). Run `grep -rn "navigateHome" src/` and update each.

- [ ] **Step 4: Visual check**

Run: `npm run dev`. Verify: clicking desktop nav items and mobile bottom-nav tabs swaps the view (URL hash changes to `#/map` etc.); the active tab is highlighted; the browser back button moves between tabs; refresh on `#/map` reopens the Map tab. Open DevTools → Elements on the Plan tab and confirm there is **no** `.leaflet-container` in the DOM (Map not mounted).

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/components/MobileBottomNav.tsx src/components/Hero.tsx
git commit -m "feat: nav and bottom-nav switch tabs instead of scrolling"
```

---

## Task 5: Hebrew default + refined type

**Files:**
- Modify: `src/lib/i18n.tsx`
- Modify: `src/index.css`

**Interfaces:** none changed (behavioural default only).

- [ ] **Step 1: Make Hebrew the default in `i18n.tsx`**

In `src/lib/i18n.tsx`, change the two `"en"` defaults to `"he"`:
- `readInitialLang()`: the final `return "en";` becomes `return "he";`
- The `createContext` default `{ lang: "en", ... dir: "ltr" }` becomes `{ lang: "he", ... dir: "rtl" }`.

Resulting `readInitialLang` tail and context:
```tsx
const LangContext = createContext<LangCtxValue>({
  lang: "he",
  setLang: () => {},
  dir: "rtl"
});
```
```tsx
  // ...inside readInitialLang, after the saved-value check:
  return "he";
```

- [ ] **Step 2: Set the initial HTML lang/dir to avoid a flash**

In `index.html`, change `<html lang="en">` to `<html lang="he" dir="rtl">` so first paint is RTL before React hydrates. (The `LangProvider` effect still overrides per stored preference.)

- [ ] **Step 3: Refine Hebrew type in `index.css`**

The `html[dir="rtl"]` block already swaps to Rubik + Frank Ruhl Libre. Add refinements right after that block:

```css
/* Hebrew reads better with a touch more line-height and no Latin
   negative tracking (which crowds Hebrew letterforms). Applied only
   under RTL so the English layout is untouched. */
html[dir="rtl"] body {
  line-height: 1.7;
}
html[dir="rtl"] h1,
html[dir="rtl"] h2,
html[dir="rtl"] h3,
html[dir="rtl"] h4 {
  letter-spacing: 0;
  font-weight: 700;
}
/* Frank Ruhl Libre at display sizes wants its heavier weights to read
   as "editorial"; bump the largest titles to 900. */
html[dir="rtl"] .section-title {
  font-weight: 900;
}
```

- [ ] **Step 4: Build + visual check**

Run: `npm run build` → PASS.
Run: `npm run dev` in a private window (cleared localStorage). Expected: app loads in Hebrew, RTL, with Rubik body + Frank Ruhl headings; switching to EN flips to LTR/Cormorant and persists across refresh; switching back to HE persists.

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n.tsx index.html src/index.css
git commit -m "feat: default to Hebrew (RTL) and refine Hebrew type scale"
```

---

## Task 6: DayActivity.link + the Timeline component pair

**Files:**
- Modify: `src/data/types.ts`
- Create: `src/components/Timeline.tsx`
- Modify: `src/lib/dict.ts` (add labels)

**Interfaces:**
- Consumes: `DayActivity`, `Day` from `types.ts`; `useT` from `dict.ts`; `accentClasses`/`AreaAccent` from `accent.ts`; `getAttraction` from `attractions.ts`.
- Produces:
  - `DayActivity.link?: string`
  - `<LeaveByBadge time={string} accent={AreaAccent} />`
  - `<DriveConnector duration={string} note?={string} departAt?={string} accent={AreaAccent} />`
  - `<TimelineStop activity={DayActivity} accent={AreaAccent} variant="card" | "detail" />`

- [ ] **Step 1: Add the `link` field to `DayActivity`**

In `src/data/types.ts`, inside `interface DayActivity`, add after `attractionId?: string;`:
```ts
  /** Optional official link for a place that is NOT a full attraction
   *  entry (e.g. a town/tourism page). Attractions link via attractionId
   *  → attractions.ts `website`. Prefer an English-language URL. */
  link?: string;
```

- [ ] **Step 2: Add dict labels**

In `src/lib/dict.ts`, add these keys to the dictionary (both `en` and `he`), following the file's existing structure for adding a `DictKey`:
```ts
  leave_by:        { en: "Leave by", he: "יציאה עד" },
  drive_label:     { en: "Drive", he: "נסיעה" },
  official_site:   { en: "Official site", he: "אתר רשמי" },
  optional_label:  { en: "Optional", he: "אופציונלי" },
  where_you_sleep: { en: "Where you sleep", he: "איפה ישנים" },
  moving_to:       { en: "Moving to", he: "עוברים אל" },
  nights_label:    { en: "nights", he: "לילות" },
  night_label:     { en: "night", he: "לילה" },
```
(If any key already exists, skip the duplicate. Confirm `DictKey` is a union derived from the dict object so these become valid keys automatically.)

- [ ] **Step 3: Create `src/components/Timeline.tsx`**

```tsx
import { Car, Clock, ExternalLink, MapPin } from "lucide-react";
import type { DayActivity } from "../data/types";
import { useT } from "../lib/dict";
import { accentClasses, type AreaAccent } from "../lib/accent";
import { getAttraction } from "../data/attractions";

/** A strong "Leave by HH:MM" badge for the top of a day. */
export function LeaveByBadge({ time, accent }: { time: string; accent: AreaAccent }) {
  const t = useT();
  const a = accentClasses(accent);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${a.bgTint} ${a.text}`}>
      <Clock size={15} strokeWidth={2.4} />
      {t("leave_by")} <span className="font-latin-serif tabular-nums">{time}</span>
    </span>
  );
}

/** The connector segment between two stops, showing the drive. */
export function DriveConnector({
  duration,
  note,
  departAt,
  accent
}: {
  duration: string;
  note?: string;
  departAt?: string;
  accent: AreaAccent;
}) {
  const t = useT();
  const a = accentClasses(accent);
  return (
    <div className="flex items-stretch gap-3 py-1 ps-1">
      <div className="flex flex-col items-center w-5">
        <span className={`w-px flex-1 ${a.border} border-s border-dashed opacity-60`} />
      </div>
      <div className="flex items-center gap-2 text-[12px] text-ink-700/80 py-1">
        <Car size={14} className={a.text} />
        <span className="font-medium">{t("drive_label")}</span>
        <span className="font-latin-serif tabular-nums">{duration}</span>
        {note && <span className="text-ink-700/55">· {note}</span>}
        {departAt && (
          <span className="text-ink-700/55">
            · {t("leave_by")} <span className="font-latin-serif tabular-nums">{departAt}</span>
          </span>
        )}
      </div>
    </div>
  );
}

/** A single stop node on the vertical spine. `card` = condensed (carousel),
 *  `detail` = full (chapter page). Surfaces a time chip, tag, title, body,
 *  the official link (from attraction.website or activity.link), and the
 *  Optional badge. */
export function TimelineStop({
  activity,
  accent,
  variant
}: {
  activity: DayActivity;
  accent: AreaAccent;
  variant: "card" | "detail";
}) {
  const t = useT();
  const a = accentClasses(accent);
  const attraction = activity.attractionId ? getAttraction(activity.attractionId) : undefined;
  const link = attraction?.website ?? activity.link;
  const isCompact = variant === "card";

  return (
    <div className="flex gap-3">
      {/* Spine dot */}
      <div className="flex flex-col items-center w-5 pt-1">
        <span className={`w-3 h-3 rounded-full ${a.dot} ring-2 ring-cream-50 shrink-0`} />
        <span className={`w-px flex-1 ${a.border} border-s opacity-25`} />
      </div>
      <div className={`pb-3 ${isCompact ? "" : "pb-5"} min-w-0`}>
        <div className="flex items-center gap-2 flex-wrap">
          {activity.time && (
            <span className={`text-[12px] font-semibold ${a.text}`}>
              <span className="font-latin-serif tabular-nums">{activity.time}</span>
            </span>
          )}
          {activity.optional && (
            <span className="text-[10px] uppercase tracking-wide rounded-full bg-ink-800/8 text-ink-700/70 px-2 py-0.5">
              {t("optional_label")}
            </span>
          )}
        </div>
        <div className={`font-serif text-ink-900 ${isCompact ? "text-base" : "text-lg"} leading-snug ${activity.optional ? "opacity-75" : ""}`}>
          {activity.title}
        </div>
        {!isCompact && (
          <p className="text-[14px] text-ink-700/85 mt-1 leading-relaxed">{activity.description}</p>
        )}
        <div className="flex items-center gap-3 mt-1">
          {attraction && (
            <span className="inline-flex items-center gap-1 text-[12px] text-ink-700/70">
              <MapPin size={12} /> {attraction.name}
            </span>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-[12px] font-medium ${a.text} hover:underline`}
            >
              {t("official_site")} <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
```

Note: confirm `getAttraction(id)` exists in `attractions.ts` (grep it). If the accessor is named differently (e.g. `attractionById`), use that name. If attraction objects expose `name` as a `Loc`, wrap with `useLoc()` — check the type; `POI.name` is `string` per `types.ts`, so direct use is fine.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: PASS. (Components are not yet used; this verifies they compile.)

- [ ] **Step 5: Commit**

```bash
git add src/data/types.ts src/components/Timeline.tsx src/lib/dict.ts
git commit -m "feat: add timeline stop/connector components and activity link field"
```

---

## Task 7: ChapterCard → area accent + condensed timeline (day-2 lake stop visible)

**Files:**
- Modify: `src/components/ChapterCard.tsx`

**Interfaces:**
- Consumes: `getAreaForDay` from `areas.ts`; `accentClasses` from `accent.ts`; `LeaveByBadge`/`DriveConnector`/`TimelineStop` from `Timeline.tsx`.

- [ ] **Step 1: Read the current card**

Run: `sed -n '1,200p' src/components/ChapterCard.tsx` (or open it). Identify where the day's activities/summary currently render and where the fixed terracotta accent is applied.

- [ ] **Step 2: Thread the area accent + render the condensed spine**

In `ChapterCard.tsx`:
1. Import: `import { getAreaForDay } from "../data/areas"; import { accentClasses } from "../lib/accent"; import { LeaveByBadge, DriveConnector, TimelineStop } from "./Timeline";`
2. At the top of the component: `const area = getAreaForDay(day.dayNumber); const a = accentClasses(area.accent);`
3. Replace the fixed accent classes (search the file for `terracotta` usages that represent the card accent — the left edge / eyebrow / chapter number) with `a.border` / `a.text` / `a.dot` as appropriate.
4. Render the condensed timeline in the card body: a `LeaveByBadge` when `day.departureTime` is set, then iterate activities with `TimelineStop variant="card"`, inserting `<DriveConnector>` between stops when an activity has `rideToNext`, and using `day.rideToFirst` before the first stop:

```tsx
{day.departureTime && (
  <div className="mb-2">
    <LeaveByBadge time={day.departureTime} accent={area.accent} />
  </div>
)}
<div className="mt-1">
  {day.rideToFirst && (
    <DriveConnector duration={day.rideToFirst.duration} note={day.rideToFirst.note} accent={area.accent} />
  )}
  {day.activities.map((act, i) => (
    <div key={i}>
      <TimelineStop activity={act} accent={area.accent} variant="card" />
      {act.rideToNext && (
        <DriveConnector
          duration={act.rideToNext.duration}
          note={act.rideToNext.note}
          departAt={act.rideToNext.departAt}
          accent={area.accent}
        />
      )}
    </div>
  ))}
</div>
```

Keep the card's existing lead image, title, subtitle, and "open chapter" affordance. The condensed spine replaces any previous flat list of activity titles.

- [ ] **Step 3: Build + visual check (acceptance criterion #4)**

Run: `npm run build` → PASS.
Run: `npm run dev` → Plan tab → swipe to **Day 2 (Drive west to Salzburg)**. Confirm the card now shows: "Leave by 09:30", a drive connector (3 h 25 · via A1), the **Mondsee lunch stop as its own node**, a 30-min connector, then the Salzburg fortress stop. Confirm Day 2's accent is the Salzburg olive/pine, and Day 4–7 cards are lake-teal, etc.

- [ ] **Step 4: Commit**

```bash
git add src/components/ChapterCard.tsx
git commit -m "feat: area-accented condensed timeline on chapter cards (surfaces day-2 lake stop)"
```

---

## Task 8: ChapterDetailPage → full timeline + accent + links + where-you-sleep

**Files:**
- Modify: `src/components/ChapterDetailPage.tsx`
- Create: `src/components/WhereYouSleep.tsx`

**Interfaces:**
- Consumes: `getAreaForDay`, `getStayForArea` from `areas.ts`; `accentClasses`; Timeline components; `navigateTab` from `route.ts`.
- Produces: `<WhereYouSleep area={Area} variant="band" | "inline" />`.

- [ ] **Step 1: Create `src/components/WhereYouSleep.tsx`**

```tsx
import { BedDouble, ExternalLink } from "lucide-react";
import type { Area } from "../data/areas";
import { getStayForArea } from "../data/areas";
import { accentClasses } from "../lib/accent";
import { useT } from "../lib/dict";
import { useLoc } from "../lib/i18n";

export default function WhereYouSleep({
  area,
  variant = "inline"
}: {
  area: Area;
  variant?: "band" | "inline";
}) {
  const t = useT();
  const loc = useLoc();
  const stay = getStayForArea(area);
  const a = accentClasses(area.accent);
  if (!stay) return null;
  const link = stay.bookingLink ?? stay.website;
  const nightsWord = area.nights === 1 ? t("night_label") : t("nights_label");

  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] ${a.bgTint} ${a.text} ${variant === "band" ? "font-semibold" : "font-medium"}`}>
      <BedDouble size={15} />
      <span className="text-ink-800">{t("where_you_sleep")}:</span>
      <span className="font-semibold text-ink-900">{stay.name}</span>
      <span className="text-ink-700/70">· {area.nights} {nightsWord}</span>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 hover:underline">
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}
```

Note: `loc` is imported for the area name if needed elsewhere; if unused, drop the import to satisfy lint.

- [ ] **Step 2: Wire the detail page**

In `ChapterDetailPage.tsx`:
1. Import the area helpers, `accentClasses`, the Timeline trio, `WhereYouSleep`, and `navigateTab`.
2. `const area = getAreaForDay(dayNumber); const a = accentClasses(area.accent);`
3. Replace any fixed terracotta accent in the header / spine with `a.*`.
4. Add `<WhereYouSleep area={area} variant="band" />` in the day header.
5. Replace the activities rendering with the FULL timeline (same structure as Task 7 but `variant="detail"`, plus `DriveConnector`s and a `LeaveByBadge`).
6. Fix the back button: replace any `navigateHome(...)` call with `navigateTab("plan")`.

- [ ] **Step 3: Build + visual check**

Run: `npm run build` → PASS.
Run: `npm run dev` → open a day chapter (click a card / hash `#chapter/2`). Confirm: full vertical timeline with descriptions, drive connectors, official-site links on attraction stops, the area accent throughout, a "Where you sleep" band, and a working back button to the Plan tab.

- [ ] **Step 4: Commit**

```bash
git add src/components/ChapterDetailPage.tsx src/components/WhereYouSleep.tsx
git commit -m "feat: full day timeline, accent, links and lodging on the chapter detail page"
```

---

## Task 9: Plan tab — area band + area-tinted TripStrip (hybrid)

**Files:**
- Create: `src/components/AreaBand.tsx`
- Modify: `src/components/ItinerarySection.tsx`
- Modify: `src/components/TripStrip.tsx`

**Interfaces:**
- Consumes: `getAreaForDay`, `areas`, `getStayForArea`; `accentClasses`; `WhereYouSleep`.
- Produces: `<AreaBand area={Area} />`.

- [ ] **Step 1: Create `src/components/AreaBand.tsx`**

```tsx
import type { Area } from "../data/areas";
import { accentClasses } from "../lib/accent";
import { useLoc } from "../lib/i18n";
import WhereYouSleep from "./WhereYouSleep";

/** The header strip above the day carousel showing the CURRENT area:
 *  its name, dates and where-you-sleep chip, in the area accent. Updates
 *  as the active day changes. */
export default function AreaBand({ area }: { area: Area }) {
  const loc = useLoc();
  const a = accentClasses(area.accent);
  return (
    <div className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl px-4 py-3 ${a.bgTint}`}>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${a.dot}`} />
        <span className={`font-serif text-lg ${a.text}`}>{loc(area.name)}</span>
      </div>
      <WhereYouSleep area={area} variant="band" />
    </div>
  );
}
```

- [ ] **Step 2: Show the AreaBand in `ItinerarySection.tsx`**

`ItinerarySection` already tracks `activeDay`. Derive the active area and render the band above the carousel (below the sticky `TripStrip`):
```tsx
import { getAreaForDay } from "../data/areas";
import AreaBand from "./AreaBand";
// ...inside the component:
const activeArea = getAreaForDay(activeDay);
// ...in JSX, right after the sticky TripStrip wrapper div:
<div className="max-w-6xl mx-auto px-4 sm:px-6 mt-3">
  <AreaBand area={activeArea} />
</div>
```

- [ ] **Step 3: Tint `TripStrip` segments per area**

In `TripStrip.tsx`, for each day pill compute its area accent and apply the accent dot/active styles:
```tsx
import { getAreaForDay } from "../data/areas";
import { accentClasses } from "../lib/accent";
// ...for each day `d`:
const a = accentClasses(getAreaForDay(d.dayNumber).accent);
// active pill uses a.dot / a.text; inactive uses a muted version.
```
Replace the fixed terracotta active-state with the per-day `a.dot` (active background) and `a.text` (active label). Keep the compact layout and selection behaviour intact. Add a thin area divider/label between the last day of one area and the first of the next (optional but recommended): when `getAreaForDay(d).id !== getAreaForDay(prev).id`, render a small spacer.

- [ ] **Step 4: Build + visual check (acceptance criterion #3)**

Run: `npm run build` → PASS.
Run: `npm run dev` → Plan tab. Confirm: the area band above the strip shows the current area + lodging and changes colour as you swipe across area boundaries (Day 3→4 olive→teal, Day 7→8 teal→gold, etc.); the TripStrip reads as coloured area blocks.

- [ ] **Step 5: Commit**

```bash
git add src/components/AreaBand.tsx src/components/ItinerarySection.tsx src/components/TripStrip.tsx
git commit -m "feat: area band and area-tinted day strip on the Plan tab"
```

---

## Task 10: Surface attraction links + add town links

**Files:**
- Modify: `src/components/AttractionCard.tsx`
- Modify: `src/data/itinerary.ts` (add `link` to a few town activities)

**Interfaces:** uses `DayActivity.link` (Task 6), `POI.website` (existing).

- [ ] **Step 1: Add an official-site link to `AttractionCard.tsx`**

Confirm whether the card already renders `website`. If not, add (near the card's meta/footer), using the existing `.icon-link` style:
```tsx
{poi.website && (
  <a href={poi.website} target="_blank" rel="noopener noreferrer" className="icon-link">
    {t("official_site")} <ExternalLink size={13} />
  </a>
)}
```
Import `ExternalLink` from `lucide-react` and `useT` if not present. (The exact prop name for the attraction is whatever the component already uses — likely `poi`/`attraction`.)

- [ ] **Step 2: Add town links to itinerary activities lacking an attraction**

In `src/data/itinerary.ts`, add a `link` to the plain-town activities so they expose a source. Concrete edits (add the field to these existing activities):
- Day 6 "Lunch in Mayrhofen": `link: "https://www.mayrhofen.at/en/"`
- Day 5 "Kirchberg lake & a Kitzbühel stroll" already has `attractionId` (badesee-kirchberg) — no town link needed.
- Day 16 "Drive to Vienna, settle into the apartment" (Prater mention): `link: "https://www.wien.info/en"`

Add only where there is no `attractionId` already supplying a link. Keep edits minimal and accurate.

- [ ] **Step 3: Build + visual check (acceptance criterion #6)**

Run: `npm run build` → PASS.
Run: `npm run dev` → Places tab: every attraction card shows an "Official site ↗" link opening in a new tab. Plan/Day-6 timeline: the Mayrhofen lunch stop shows a link.

- [ ] **Step 4: Commit**

```bash
git add src/components/AttractionCard.tsx src/data/itinerary.ts
git commit -m "feat: surface official-site links on attractions and town stops"
```

---

## Task 11: Stays tab regrouped by area

**Files:**
- Modify: `src/components/StaysSection.tsx`

**Interfaces:** uses `areas`, `getStayForArea`, `accentClasses`.

- [ ] **Step 1: Render stays in area order with accents**

In `StaysSection.tsx`, iterate `areas` (which is already trip order) and render each area's stay card with the area accent (left border `a.border`, header `a.text`), the dates (`area.startDate`–`area.endDate`), `area.nights`, the existing highlights/warnings, and the booking/website link. Use `getStayForArea(area)` to resolve the stay. This replaces iterating `stays` directly so the cards carry area colour and order.

```tsx
import { areas, getStayForArea } from "../data/areas";
import { accentClasses } from "../lib/accent";
// ...
{areas.map(area => {
  const stay = getStayForArea(area);
  if (!stay) return null;
  const a = accentClasses(area.accent);
  return (
    <div key={area.id} className={`card-paper border-s-4 ${a.border} ...`}>
      {/* header in a.text, dates, nights, highlights, warnings, link */}
    </div>
  );
})}
```
Keep the existing card visuals/markup as much as possible — only add the accent border/header and drive the list from `areas`.

- [ ] **Step 2: Build + visual check (acceptance criterion #7)**

Run: `npm run build` → PASS.
Run: `npm run dev` → Stays tab: six stays in trip order, each tinted with its area colour, correct dates/nights, links present for the booked ones (Tyrol airbnb, Habachklause, Gut Wenghof, Vienna airbnb), "to book" note on Salzburg + Vienna-arrival.

- [ ] **Step 3: Commit**

```bash
git add src/components/StaysSection.tsx
git commit -m "feat: regroup the Stays tab by area with accent colours"
```

---

## Task 12: Map pins coloured by area

**Files:**
- Modify: `src/components/MapView.tsx`

**Interfaces:** uses `getAreaForDay`/`getAreaById` + `accentClasses().pinHex`.

- [ ] **Step 1: Determine each POI's area for pin colour**

In `MapView.tsx`, find where markers are built. For attraction POIs that appear in the itinerary, resolve the area via the day that references them; for a simpler, robust rule, colour pins by the POI's `region`→area is NOT 1:1, so use this approach: build a `Map<attractionId, AreaAccent>` once from `itinerary` (for each day, `getAreaForDay(day.dayNumber).accent` applied to every `activity.attractionId`), and colour each attraction marker with `accentClasses(accent).pinHex`. POIs not in the itinerary (services, etc.) keep their current category colour.

```tsx
import { itinerary } from "../data/itinerary";
import { getAreaForDay } from "../data/areas";
import { accentClasses, type AreaAccent } from "../lib/accent";

const accentByAttraction = new Map<string, AreaAccent>();
for (const day of itinerary) {
  const accent = getAreaForDay(day.dayNumber).accent;
  for (const act of day.activities) {
    if (act.attractionId && !accentByAttraction.has(act.attractionId)) {
      accentByAttraction.set(act.attractionId, accent);
    }
  }
}
// when building an attraction marker icon, use:
//   const accent = accentByAttraction.get(poi.id);
//   const color = accent ? accentClasses(accent).pinHex : <existing category colour>;
```
Apply `color` to the existing custom `divIcon`/marker style (wherever the pin colour is currently set).

- [ ] **Step 2: Build + visual check (acceptance criterion #3 cont.)**

Run: `npm run build` → PASS.
Run: `npm run dev` → Map tab: attraction pins are tinted by area (Salzburg-area pins olive, Tyrol pins teal, etc.). Map still loads and the focus-from-elsewhere flow (`focusOn`) still recenters.

- [ ] **Step 3: Commit**

```bash
git add src/components/MapView.tsx
git commit -m "feat: colour map pins by trip area"
```

---

## Task 13: Final integration pass + acceptance verification

**Files:** none (verification + any small fixes).

- [ ] **Step 1: Full build + lint**

Run: `npm run build && npm run lint`
Expected: both PASS, zero errors. Fix any unused-import / type errors surfaced.

- [ ] **Step 2: Walk every acceptance criterion (both languages, mobile + desktop)**

Run: `npm run dev`. With cleared storage, verify in order:
1. First load is Hebrew/RTL; EN toggle flips and persists; back to HE persists.
2. Tabs swap views; only the active view mounts (no `.leaflet-container` on non-map tabs); back button moves between tabs; refresh keeps the tab.
3. Six areas are colour-distinct on tabs/cards/strip/pins.
4. Day 2 clearly shows the Mondsee stop as its own node with drive connectors.
5. Every day shows "Leave by" (where applicable) + a scannable time spine; times legible in RTL.
6. Every attraction exposes an official-site link; town stops with `link` show one; all open in a new tab.
7. Every day and the Stays tab show the correct area accommodation, with links where known.

Resize to a 390px-wide viewport and repeat the key checks (Plan, Map, a chapter page).

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: final integration polish for tabbed area redesign"
```

---

## Self-Review (completed by author)

**Spec coverage:**
- #1 Hebrew default + font → Task 5. ✓
- #2 Day-2 lake stop → Tasks 6–7 (timeline surfaces Mondsee node) + verified in Task 7/13. ✓
- #3 Real tabbed experience → Tasks 2–4 (route, TabShell, nav). ✓
- #4 Area colours → Task 1 (accent), applied in Tasks 7–12. ✓
- #5 Links → Task 6 (field), Task 10 (surface). ✓
- #6 Accommodation per area/day → Task 8 (WhereYouSleep on day), Task 11 (Stays tab), Task 9 (area band). ✓
- #7 Hours UX → Tasks 6–8 (timeline). ✓
- Hybrid Plan grouping → Task 9. ✓

**Type consistency:** `TabKey`/`Route`/`navigateTab` defined in Task 2 and consumed in Tasks 3–4; `AreaAccent`/`accentClasses` defined in Task 1 and consumed in 6–12; `Area`/`getAreaForDay`/`getStayForArea` defined in Task 1 and consumed in 7–12; `TimelineStop`/`DriveConnector`/`LeaveByBadge` defined in Task 6 and consumed in 7–8; `DayActivity.link` defined in Task 6 and consumed in 6/10. Consistent.

**Open confirmations for the implementer:**
- Verify `getAttraction` is the real accessor name in `attractions.ts` (Task 6 Step 3 note).
- Verify `dict.ts` derives `DictKey` from the dict object so new keys validate (Task 6 Step 2).
- Verify `POI.name` is a plain string (it is, per `types.ts`) — no `useLoc` needed for attraction names.
