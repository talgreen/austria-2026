# Austria 2026 — Tabbed, Area-Coloured Redesign

**Date:** 2026-06-24
**Status:** Approved for planning
**Scope:** Seven related UX/content changes to the existing Vite + React + TypeScript trip-companion app.

---

## 1. Goals

Turn the current single long-scrolling page (nav links that merely `scrollIntoView`) into a **real tabbed experience** where only the active view is mounted, organise the trip around its six **areas** with **tasteful per-area accent colours**, make the **hours of each day genuinely clear** with a vertical timeline, surface the **mid-drive lake stop on day 2**, expose **links for every attraction and town**, show **where we sleep** on every day, and make **Hebrew the default language** with a refined type scale.

Non-goals: no redesign of the AI companion (Gemininio), the quiz, the install/PWA flow, or the underlying data of individual attractions beyond adding links. No new build tooling. No backend.

---

## 2. The Six Areas (the new spine)

A new module `src/data/areas.ts` defines the trip's six **contiguous** segments. Areas are derived from the existing `Day.base` groupings and map 1:1 to the existing `stays.ts` entries. Because Vienna appears at both ends, areas are defined by explicit day ranges (not by `base` name), so the chronological order is preserved.

| id | Display name | Days | Dates | Stay (stays.ts id) | Accent token |
|----|--------------|------|-------|--------------------|--------------|
| `vienna-arrival` | Vienna | 1 | Aug 8 | `stay-vienna-arrival` | `terracotta` |
| `salzburg` | Salzburg | 2–3 | Aug 9–11 | `stay-salzburg` | `olive` |
| `tyrol` | Tyrol · Zillertal | 4–7 | Aug 11–15 | `stay-tyrol` | `lake` |
| `zell` | Zell am See · Pinzgau | 8–12 | Aug 15–20 | `stay-habachklause` | `gold` |
| `werfenweng` | Werfenweng | 13–15 | Aug 20–23 | `stay-gutwenghof` | `sienna` |
| `vienna-finale` | Vienna | 16–19 | Aug 23–26 | `stay-vienna` | `terracotta` |

**Colour assignment.** Uses the five accent families already in `index.css` (`terracotta`, `olive`, `lake`, `gold`, `sienna`). Final mapping: Vienna(arrival)=terracotta, Salzburg=olive, Tyrol=lake, Zell am See=gold, **Werfenweng=sienna**, Vienna(finale)=terracotta. The two Vienna bookends deliberately share the terracotta accent (it is the same city). This gives five visually-distinct colours across six tabs, reading as a clean "start and end in red Vienna" bookend.

**`Area` type (in `areas.ts`):**
```ts
export interface Area {
  id: string;
  name: Loc<string>;          // localized display name
  dayNumbers: number[];       // e.g. [2, 3]
  startDate: string;          // ISO, first day
  endDate: string;            // ISO, last day (checkout-ish)
  nights: number;
  stayId: string;             // -> stays.ts
  accent: AreaAccent;         // "terracotta" | "olive" | "lake" | "gold" | "sienna"
}
```
A small `accentClasses(accent)` helper returns the relevant Tailwind class fragments (text / border / bg-tint / ring / pin colour) so components never hard-code hexes. Helpers `getAreaForDay(dayNumber)` and `getStayForArea(area)` complete the lookup surface.

---

## 3. Real Tabbed Shell (#3) — true view-swapping

**Current:** `App.tsx` mounts every section at once; `Navbar` and `MobileBottomNav` call `scrollIntoView`.

**New:** A `TabKey` union drives a `<TabShell>` that renders **exactly one** view at a time:

```
TabKey = "plan" | "map" | "places" | "food" | "stays" | "tips" | "checklist" | "emergency"
```

- The existing hash router (`src/lib/route.ts`, today `home` | `chapter/:day`) is extended to carry the active tab: `#/<tab>` (e.g. `#/map`), plus the existing `#chapter/:day` for the day detail page. Default route → `plan`. This keeps deep-links and the browser back button working, and survives refresh.
- `App.tsx` becomes: `<Navbar/>` (always) + `<Hero/>` (Plan tab only) + `<TabShell active={tab}/>` + `<MobileBottomNav/>` + always-on `<InstallPrompt/>` / `<Gemininio/>`.
- `TabShell` switches on `tab` and returns only the matching view. `MapView` (Leaflet) and the heavy grids therefore only mount when their tab is opened — the performance win.
- `SectionOrnament` dividers and the always-stacked section layout are removed. `TripStats` moves into the Plan tab footer (or its own tiny "Trip" area within Plan) rather than a global closing section.
- `Navbar` desktop links and `MobileBottomNav` tabs call `setTab(key)` (push hash) instead of scrolling. Active tab is highlighted from the route. The "More" overlay on mobile keeps holding the secondary tabs (Stays/Tips/Lists/Emergency) — selecting one sets the tab and closes the sheet.
- Scroll position resets to top on tab change.

**Component boundaries:** `TabShell` is a pure router→view switch (no data). Each tab view is the existing section component, lightly adapted to stand alone (its own top padding, no reliance on a preceding ornament).

---

## 4. Plan tab grouped by coloured Area (#hybrid + #4)

The Plan tab keeps the horizontal day-carousel (`ItinerarySection` → `TripStrip` + `ChapterCard`), enhanced:

- An **area band** sits above the day strip: the current area's name, dates, nights, and a "Where you sleep" chip, all in the area's accent. It updates as the active day changes.
- `TripStrip` segments are tinted per area (each day pill picks up `getAreaForDay(day).accent`), so the strip reads as coloured area-blocks rather than 19 identical dots. Area boundaries get a subtle divider/label.
- `ChapterCard`'s accent (currently fixed terracotta) becomes the day's **area accent** — left edge, eyebrow, chapter-number.
- Optionally a compact **area quick-jump** row (six colour chips) lets you jump the carousel to the first day of any area. (Nice-to-have; include if cheap.)

Accent application is centralised through `accentClasses()`; no component hard-codes a colour.

---

## 5. Day = Vertical Timeline (#7) — and the day-2 lake stop (#2)

Both `ChapterCard` (compact, in the carousel) and `ChapterDetailPage` (full) render the day as a **vertical time spine**:

- **Header:** a prominent "Leave by `departureTime`" badge when `Day.departureTime` is set; otherwise the day's first `time`.
- **Stops:** each `DayActivity` is a node on the spine showing its `time` (e.g. `18:40`, `Morning`, `10:44`), a tag icon, title, and description. Time chips are visually strong and consistent.
- **Drive connectors:** between stops, when an activity has `rideToNext`, render a connector segment showing the duration + note (e.g. "🚗 3 h 25 · via A1") and `departAt` if present. The first drive of the day uses `Day.rideToFirst`.
- This connector treatment is exactly what makes the **Mondsee lunch stop on Day 2 unmistakable**: it becomes its own labelled node ("🍴 ~12:55 · Lunch by Mondsee") with a drive connector into Salzburg ("🚗 30 min"), instead of being buried in prose. Day 2's `subtitle` and the existing `mondsee` activity already carry the content; the timeline surfaces it. Where the lunch stop lacks an explicit clock time, the timeline shows the relative label ("Lunch") — no fabricated precise times.
- Optional stops keep their muted "Optional" styling as a node variant.

Time formatting is RTL-safe (clock digits stay LTR within an RTL line). A small `<TimelineStop>` and `<DriveConnector>` pair are the new reusable units; `ChapterCard` uses a condensed variant, `ChapterDetailPage` the full one.

---

## 6. Links for every attraction & town (#5)

- Every attraction already has `website` in `attractions.ts` (41/41). Surface it consistently: a small "Official site ↗" link on `AttractionCard`, on each timeline stop that has an `attractionId`, and on the `ChapterDetailPage` attraction blocks.
- Towns/places mentioned in activities that are **not** full attractions (e.g. Mayrhofen, Kitzbühel old town) get an optional `link` field on `DayActivity` (`link?: string`) pointing at the official tourism page, English where the site offers language selection (the data already favours `/en/` URLs).
- All external links open in a new tab with `rel="noopener noreferrer"` and a consistent ↗ affordance.

No new link-fetching pipeline is built; links are added to data by hand using the official tourism/operator sites (several already supplied in the source Excel).

---

## 7. Accommodation per area & day (#6)

- Data already exists in `stays.ts` (6 entries, with `bookingLink`/`website` for the booked ones). Each `Area` references its stay via `stayId`.
- **On each day:** a compact "Where you sleep" strip (stay name + nights + a link when available) appears in the day header / area band, tinted with the area accent. On transit days it reads "→ moving to <next stay>".
- **Stays tab:** regrouped in area order with the area accent on each card; booked vs. "to book" status shown from the existing `warnings`.
- The user will provide more accommodation details later; the structure makes adding/extending a one-line data edit. **Open item to confirm:** the source Excel is inconsistent for Aug 15–20 — its area table names *Hotel Felben* (`felben.at`) while its day grid and the current app both use *Habachklause* (`habachklause.com`). This design keeps **Habachklause** (matches the live data) and flags it for the user to confirm.

---

## 8. Hebrew default + refined type (#1)

- Default language → `he`: change the fallback in `src/lib/i18n.tsx` (`LangContext` default and `readInitialLang`) and `src/lib/lang.ts` as needed, so a first-time visitor with no stored preference lands in Hebrew/RTL. A stored preference still wins.
- Keep the **Rubik (body) + Frank Ruhl Libre (headings)** pairing already loaded; refine it: tune heading weights (Frank Ruhl 500/700/900 used deliberately), body weight/line-height for Hebrew, letter-spacing reset for RTL (Latin `-0.01em` tracking on headings shouldn't apply to Hebrew), and ensure clock digits / Latin proper nouns keep `.font-latin-serif` where needed. No new font files.
- `og:locale` primary can flip to `he_IL` (cosmetic, optional).

---

## 9. Files touched (anticipated)

**New:** `src/data/areas.ts`, `src/lib/accent.ts` (accent→classes), `src/components/TabShell.tsx`, `src/components/AreaBand.tsx`, `src/components/TimelineStop.tsx` (+ `DriveConnector`), `src/components/WhereYouSleep.tsx`.

**Edited:** `App.tsx`, `src/lib/route.ts`, `Navbar.tsx`, `MobileBottomNav.tsx`, `ItinerarySection.tsx`, `TripStrip.tsx`, `ChapterCard.tsx`, `ChapterDetailPage.tsx`, `AttractionCard.tsx`, `StaysSection.tsx`, `MapView.tsx` (pin colours by area), `src/lib/i18n.tsx`, `src/lib/lang.ts`, `src/index.css` (HE type refinements), `src/data/types.ts` (`DayActivity.link`), dict entries for any new labels, plus the `.he` i18n files for new strings.

---

## 10. Testing & verification

- `npm run build` (tsc + vite) passes with no type errors.
- Manual/Playwright smoke per acceptance criterion below, in both `he` (default) and `en`, mobile + desktop widths.

### Acceptance criteria
1. First load (cleared storage) is Hebrew/RTL; switching to EN and back works and persists.
2. Tabs swap views — only the active view is in the DOM (verify Map/Leaflet not mounted on the Plan tab); back button moves between tabs; refresh keeps the tab.
3. Each area's days, tab, card edges and map pins carry the correct accent colour; the six areas are visually distinguishable.
4. Day 2 clearly shows the Mondsee lunch stop as its own timeline node with drive connectors before and after.
5. Every day shows a "Leave by" (where applicable) and a scannable time spine; times are legible and correctly oriented in RTL.
6. Every attraction exposes its official-site link; towns with a `link` show one; all open safely in a new tab.
7. Every day and the Stays tab show the correct accommodation for its area, with links where known.
```
