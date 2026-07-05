# Austria 2026 — "Live Trip Companion" Redesign

**Date:** 2026-07-05
**Status:** Design approved (pending final spec review)
**Type:** Ground-up UX/UI redesign of the shell, home, and visual system

## Summary

Redesign the Austria 2026 family trip app from a nine-tab reference site into an
adaptive **live trip companion**. The change is concentrated in three layers —
the navigation shell, a new adaptive home, and a fresh visual system — while
reusing all existing data and content/feature components. Also migrate hosting
from GitHub Pages to Vercel.

The work is largely **re-wiring and re-skinning existing logic**: the
before/during/after trip engine already exists in `src/lib/tripState.ts`; today
it feeds a card buried in the Plan tab rather than serving as the app's front
door.

## Motivation

The user reports the app is inconvenient on mobile and web across four
dimensions, all confirmed in scope:

1. **Navigation / finding things** — 9 flat tabs, 5 hidden behind a "More"
   sheet. Hard to know where things live or reach them fast.
2. **In-the-moment usefulness** — it reads as a reference book, not a companion
   that answers "what's happening now / next / where am I."
3. **Readability / density** — cramped layouts, small tap targets, hard to scan.
4. **Look & feel** — dated / generic; wants a fresher, distinctive look.

## Decisions (validated during brainstorming)

| Decision | Choice |
| --- | --- |
| Ambition level | Ground-up rethink around a live-companion model |
| Navigation | 5 intent-based destinations (hybrid of two proposed models) |
| Kids | Keeps its own top-level slot (car-friendly) |
| Overflow | A "More" sheet retained for practical sections |
| Itinerary home | Drill-down from TODAY **and** listed in More (redundant entry) |
| Visual direction | **Style C — Warm Minimal (app-like)**, with a subtle Austrian thread |
| Hosting | **Migrate to Vercel** (independent final step) |
| Dark mode | **Deferred**; tokens structured so it can be added later without rework |

## Information Architecture (the new shell)

```
TODAY     new home — adaptive before/during/after   (default route)
EXPLORE   hub → attractions · food & wine
KIDS      games · quiz · fun pack                    (own slot)
MAP       full interactive map
MORE      itinerary · stays · tips · services · checklist · SOS
```

### Routing (`src/lib/route.ts`)
- `TabKey` gains `"today"`, `"explore"`, and `"more"` (as routable hub views).
- Default route becomes `"today"` (currently `"plan"`).
- Backward compatibility: existing hashes (`#/plan`, `#/food`, `#/stays`, …)
  and `#chapter/N` continue to resolve, so any saved/shared links still work.
  `#/plan` redirects to `#/today`.
- `#chapter/N` day-detail deep pages are unchanged.

### Hubs
`EXPLORE` and `MORE` are **thin landing pages**, not new content: a titled
screen presenting large tappable cards that route to sub-sections built from
existing components. No new data or copy is introduced by the hubs.

- **Explore** → `AttractionsGrid`, `FoodAndWineSection`
- **More** → `ItinerarySection`, `StaysSection`, `TipsSection` + `ServicesSection`,
  `ChecklistSection`, `EmergencySection`

On mobile, `MORE` opens the existing bottom-sheet pattern (retained — the user
liked it); on desktop the navbar expands hubs inline.

## The TODAY Home (centerpiece)

A new `TodayHome` component driven by `getTripState()` from `src/lib/tripState.ts`.
Three states, matching the validated mockups:

- **before** — countdown ("N days to go"), departure card (Tel Aviv → Vienna,
  landing 08:45, drive departs ~10:00), packing-progress bar (reads existing
  checklist data), weather + Day 1 preview.
- **during** — a coral "Right now" card (current/featured stop + today's weather)
  and a green "Up next" card (next stop, drive time, any booking note from the
  itinerary), plus quick links to Map and the full day chapter.
- **after** — a warm "trip complete" recap linking to the itinerary and the quiz.

Reuses `LiveCountdown`, `WeatherStrip`, checklist data, `navigateChapter()`, and
the `featured`/`tomorrow`/20:00-evening-cutoff logic already in `tripState.ts`.

## Visual System (Style C — Warm Minimal)

- Add a design-token layer to `src/index.css` via Tailwind v4 `@theme`:
  - **Primary:** coral accent (intentionally echoes the existing Austrian-red
    `terracotta` family so the app keeps a heritage thread).
  - **Secondary:** pine green (next/practical), gold (ambient/weather).
  - Softer neutrals, larger corner radii, larger touch targets.
- **Color carries meaning** (a core readability lever): coral = now/urgent,
  green = next/practical, gold = ambient info. Users scan by color instead of
  reading every card.
- Tokens are applied centrally so components restyle without per-file edits.
- Bilingual Hebrew/English + RTL support and existing fonts are preserved
  (the recently merged Hebrew font work is not disturbed).
- Token structure anticipates a future dark theme (deferred) — semantic token
  names (e.g. `--surface`, `--accent-now`) rather than raw light-only values.

## Reuse vs. Build

**Reuse unchanged:** everything in `src/data/*`, `MapView`, `AttractionsGrid`,
`FoodAndWineSection`, `StaysSection`, `KidsSection`, `Quiz`/`QuizQuestion`,
`Gemininio` (Felix stays a floating button), `tripState.ts`, `i18n`/`dict`.

**Build or rewrite:**
- `TodayHome` — new adaptive home component (+ before/during/after sub-views).
- Hub landing pages for `Explore` and `More` — new, thin routing layers.
- `MobileBottomNav` — rewrite around the 5 slots (Today · Explore · Kids · Map · More).
- `Navbar` — rewrite for the 5 destinations (desktop expands hubs inline).
- `route.ts` — extend `TabKey`, change default, add redirects.
- `App.tsx` — route wiring for the new shell (`Hero` currently shown only on
  `plan`; replaced by `TodayHome`).
- `src/index.css` — the Style C token layer.

## Hosting Migration (Vercel)

Done as an **independent final step**, after the redesign is verified:
- Add Vercel project config; Vercel auto-detects Vite.
- Set `base` back to `/` (Vercel serves from root — removes the
  `/austria-2026/` base-path juggling in `vite.config.ts`).
- Configure env vars (`VITE_GEMINI_API_KEY`) in Vercel.
- Gain per-change preview URLs. GitHub Pages deploy can be retired once Vercel
  is confirmed working.

## Non-Goals (YAGNI)

- No new data or content.
- No backend.
- No changes to Felix's AI logic or the map engine.
- No dark mode in v1 (structured for, not built).
- No unrelated refactoring beyond the files listed above.

## Verification

- Drive all three trip states by passing a mocked `now` to `getTripState()`
  (the functions already accept a `now` argument).
- Verify each of the 5 nav destinations resolves and renders.
- Verify backward-compatible deep links (`#/plan`→today, `#/food`, `#chapter/6`).
- Verify RTL (Hebrew) and LTR (English) in before and during states.
- Verify the production build (`npm run build`) and a Vercel preview deploy.
```
