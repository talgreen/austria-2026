# Live Trip Companion Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the app shell around an adaptive TODAY home and 5 intent-based nav destinations, restyle it in the "Warm Minimal" (Style C) look, and migrate hosting to Vercel — reusing all existing data and feature components.

**Architecture:** The before/during/after trip engine already lives in `src/lib/tripState.ts`. This redesign re-wires it as the app's front door (`TodayHome`), collapses nine flat tabs into five destinations (Today · Explore · Kids · Map · More), adds a semantic design-token layer to `src/index.css`, and finishes with a GitHub Pages → Vercel migration. No new content, no backend, no map-engine or AI changes.

**Tech Stack:** React 19, TypeScript ~6.0, Vite 8, Tailwind CSS v4 (`@theme` tokens in `index.css`), framer-motion 12, lucide-react. Tests: Vitest + @testing-library/react + jsdom (added in Task 1).

## Global Constraints

- **Bilingual:** every visible string goes through `useT()` against `DICT` in `src/lib/dict.ts` (`t("key")`, `t("key", { n })`). Never hardcode user-facing text. Both `en` and `he` values are required for every new key.
- **RTL:** the app runs `dir="rtl"` in Hebrew (default) and `dir="ltr"` in English. Use logical CSS (`ms-`/`me-`/`ps-`/`pe-`, `text-start`/`text-end`) not `ml-`/`text-left`.
- **Trip window:** `TRIP_START = 2026-08-09`, `TRIP_END = 2026-08-26`; 18 day-chapters, `dayNumber` 1–18. Source of truth is `src/lib/tripState.ts` — do not hardcode dates in components.
- **Deep routes:** the day-detail route `#chapter/N` (N = 1–18) is unchanged. Legacy tab hashes must still resolve.
- **Reuse, don't rebuild:** `MapView`, `AttractionsGrid`, `FoodAndWineSection`, `StaysSection`, `KidsSection`, `Quiz`, `Gemininio`, `ItinerarySection`, `TripStats`, `WeatherStrip`, `LiveCountdown`, and everything in `src/data/*` stay behaviorally unchanged.
- **Style tokens:** new colors are added as Tailwind v4 `@theme` tokens and consumed as utility classes (`bg-coral-500`), never as inline hex.
- **Commits:** one commit per task, conventional-commit style (`feat:`, `refactor:`, `test:`, `chore:`).

## File Structure

**Created:**
- `vitest.config.ts` — test runner config (jsdom env, setup file).
- `src/test/setup.ts` — testing-library/jest-dom matchers + cleanup.
- `src/test/renderWithLang.tsx` — render helper that wraps a UI tree in `LangProvider`.
- `src/lib/route.test.ts` — routing unit tests.
- `src/lib/useTripStateLive.ts` — shared "live trip state" hook (extracted from `Hero`).
- `src/lib/checklistProgress.ts` — shared checklist done-count helper (extracted from `ChecklistSection`).
- `src/lib/checklistProgress.test.ts` — unit tests for the helper.
- `src/components/today/TodayHome.tsx` — live wrapper (hook → view).
- `src/components/today/TodayHomeView.tsx` — pure phase dispatcher (testable).
- `src/components/today/BeforeTrip.tsx` — before-trip home.
- `src/components/today/DuringTrip.tsx` — during-trip home.
- `src/components/today/AfterTrip.tsx` — after-trip home.
- `src/components/today/TodayHomeView.test.tsx` — dispatcher tests.
- `src/components/hubs/ExploreHub.tsx` — Explore landing page (attractions + food).
- `vercel.json` — Vercel SPA/deploy config.

**Modified:**
- `src/lib/route.ts` — add `today`/`explore` tab keys, default to `today`, legacy redirects.
- `src/lib/dict.ts` — new nav + TodayHome + Explore strings.
- `src/index.css` — Style C `@theme` token layer.
- `src/components/ChecklistSection.tsx` — use extracted `checklistProgress` helper.
- `src/components/Hero.tsx` — use extracted `useTripStateLive` (then deleted in Task 9).
- `src/components/MobileBottomNav.tsx` — 5-slot bar + More sheet.
- `src/components/Navbar.tsx` — desktop nav for the new structure.
- `src/components/TabShell.tsx` — render `today` → `TodayHome`, `explore` → `ExploreHub`.
- `src/App.tsx` — drop `Hero`; TodayHome is the default view.
- `vite.config.ts` — `base: "/"` for Vercel.

**Deleted:**
- `src/components/Hero.tsx` — superseded by `TodayHome` (Task 9).

---

### Task 1: Test infrastructure

**Files:**
- Modify: `package.json` (devDependencies + `test` script)
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/test/renderWithLang.tsx`
- Create: `src/lib/smoke.test.ts`

**Interfaces:**
- Produces: `renderWithLang(ui: React.ReactElement): RenderResult` — wraps `ui` in `LangProvider` (defaults to Hebrew, matching the app) for all component tests.
- Produces: `npm test` (Vitest, run-once) and `npm run test:watch`.

- [ ] **Step 1: Install dev dependencies**

Run:
```bash
npm install -D vitest@^3 jsdom@^25 @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14
```
Expected: packages added to `devDependencies`, no peer-dependency errors (React 19 is supported by @testing-library/react 16).

- [ ] **Step 2: Add test scripts to `package.json`**

In the `"scripts"` block add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    css: false,
  },
});
```

- [ ] **Step 4: Create `src/test/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
```

- [ ] **Step 5: Create `src/test/renderWithLang.tsx`**

```tsx
import type { ReactElement } from "react";
import { render, type RenderResult } from "@testing-library/react";
import { LangProvider } from "../lib/i18n";

/** Render a component tree wrapped in the app's language provider.
 *  Defaults to Hebrew (the app default) unless a test sets
 *  localStorage["austria:lang"] = "en" before calling. */
export function renderWithLang(ui: ReactElement): RenderResult {
  return render(<LangProvider>{ui}</LangProvider>);
}
```

- [ ] **Step 6: Create `src/lib/smoke.test.ts`**

```ts
import { describe, it, expect } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 7: Run the tests**

Run: `npm test`
Expected: PASS — 1 test file, 1 test passing.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/test/ src/lib/smoke.test.ts
git commit -m "test: add vitest + testing-library harness"
```

---

### Task 2: Routing — add Today & Explore, default to Today

**Files:**
- Modify: `src/lib/route.ts`
- Create: `src/lib/route.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `TabKey` now includes `"today"` and `"explore"`. `parseHash(hash: string): Route` returns `{ kind: "tab", tab: "today" }` for `""`, `"#/"`, `"#/plan"` (legacy), and any unknown tab. `navigateTab(tab: TabKey)` writes `#/today` for `today`. `TAB_KEYS` includes the two new keys.

- [ ] **Step 1: Write failing tests — `src/lib/route.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { parseHash } from "./route";

describe("parseHash", () => {
  it("defaults empty hash to the today home", () => {
    expect(parseHash("")).toEqual({ kind: "tab", tab: "today" });
  });
  it("routes legacy #/plan to today", () => {
    expect(parseHash("#/plan")).toEqual({ kind: "tab", tab: "today" });
  });
  it("keeps the itinerary reachable via #/itinerary", () => {
    expect(parseHash("#/itinerary")).toEqual({ kind: "tab", tab: "plan" });
  });
  it("resolves the new explore hub", () => {
    expect(parseHash("#/explore")).toEqual({ kind: "tab", tab: "explore" });
  });
  it("still resolves an existing tab", () => {
    expect(parseHash("#/food")).toEqual({ kind: "tab", tab: "food" });
  });
  it("still resolves a chapter deep link", () => {
    expect(parseHash("#chapter/6")).toEqual({ kind: "chapter", day: 6 });
  });
  it("falls back unknown tabs to today", () => {
    expect(parseHash("#/nope")).toEqual({ kind: "tab", tab: "today" });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- route`
Expected: FAIL — `today`/`explore` not valid tab keys; `#/plan` currently returns `tab: "plan"`.

- [ ] **Step 3: Update `src/lib/route.ts`**

Replace the `TabKey` type, `TAB_KEYS`, `parseHash`, and `navigateTab` with:

```ts
export type TabKey =
  | "today"
  | "explore"
  | "plan"
  | "map"
  | "places"
  | "food"
  | "kids"
  | "stays"
  | "tips"
  | "checklist"
  | "emergency";

export const TAB_KEYS: TabKey[] = [
  "today",
  "explore",
  "plan",
  "map",
  "places",
  "food",
  "kids",
  "stays",
  "tips",
  "checklist",
  "emergency"
];

function isTabKey(v: string): v is TabKey {
  return (TAB_KEYS as string[]).includes(v);
}

export function parseHash(hash: string): Route {
  const chapter = hash.match(/^#chapter\/(\d+)$/);
  if (chapter) {
    const day = parseInt(chapter[1], 10);
    if (day >= 1 && day <= 18) return { kind: "chapter", day };
  }
  // Legacy: the old default tab was "plan" (itinerary). It now lives at
  // "#/itinerary"; a bare "#/plan" or "#/" lands on the new Today home.
  const tab = hash.match(/^#\/?([a-z]+)$/);
  if (tab) {
    if (tab[1] === "itinerary") return { kind: "tab", tab: "plan" };
    if (tab[1] === "plan") return { kind: "tab", tab: "today" };
    if (isTabKey(tab[1])) return { kind: "tab", tab: tab[1] };
  }
  return { kind: "tab", tab: "today" };
}
```

Update `navigateTab` so `today` gets a clean hash and `plan` keeps a stable, non-legacy hash:

```ts
export function navigateTab(tab: TabKey) {
  const hash =
    tab === "today" ? "/today" : tab === "plan" ? "/itinerary" : `/${tab}`;
  window.location.hash = hash;
  window.scrollTo({ top: 0 });
}
```

(Leave `useHashRoute`, `navigateChapter`, `rememberChapter`, `getRememberedChapter` unchanged.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- route`
Expected: PASS — all 7 cases.

- [ ] **Step 5: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: errors ONLY in files that switch on `TabKey` and don't yet handle `today`/`explore` (`TabShell.tsx`, and the `nav_*` lookups). These are fixed in later tasks — note them and continue. If any *other* file errors, fix it here.

- [ ] **Step 6: Commit**

```bash
git add src/lib/route.ts src/lib/route.test.ts
git commit -m "feat: route Today home + Explore hub, keep legacy hashes"
```

---

### Task 3: Style C design tokens

**Files:**
- Modify: `src/index.css` (add to the existing `@theme` block)

**Interfaces:**
- Produces: Tailwind utility classes `bg-coral-500`, `text-coral-600`, `bg-pine-500`, etc., plus semantic aliases `bg-now`, `bg-next`, `bg-ambient` and surface tokens `bg-surface`, `bg-surface-next`. Consumed by all Style C components in later tasks.

- [ ] **Step 1: Add the token block**

In `src/index.css`, inside the existing `@theme { … }` block (where `--color-cream-*` etc. live), add:

```css
  /* ---------- Style C — Warm Minimal palette (2026 redesign) ----------
     Coral = "now / urgent", pine = "next / practical", gold = ambient.
     Coral intentionally echoes the Austrian-red terracotta family so the
     app keeps a heritage thread. Named semantically so a future dark
     theme can remap them in one place. */
  --color-coral-50: #FDEEE8;
  --color-coral-100: #FAD9CC;
  --color-coral-400: #EC6A45;
  --color-coral-500: #E4572E;
  --color-coral-600: #C8431F;
  --color-coral-700: #A5361A;
  --color-pine-50: #EAF2ED;
  --color-pine-100: #D6E6DC;
  --color-pine-500: #3B7A57;
  --color-pine-600: #2C6043;
  --color-pine-700: #224B34;

  /* Semantic surfaces + accents (map onto the palette above). */
  --color-surface: #F7F5F2;       /* neutral card */
  --color-surface-next: #F0F4F1;  /* pine-tinted "next/practical" card */
  --color-now: var(--color-coral-500);
  --color-next: var(--color-pine-500);
  --color-ambient: var(--color-gold-500);

  /* Larger radii + roomier touch targets for the app-like feel. */
  --radius-card: 1rem;    /* rounded-2xl-ish, used via rounded-[var(--radius-card)] */
  --radius-pill: 999px;
```

- [ ] **Step 2: Verify the build compiles the tokens**

Run: `npm run build`
Expected: build succeeds. (Tailwind v4 emits utilities for every `--color-*` token, so `bg-coral-500` / `bg-now` are now valid classes.)

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add Style C warm-minimal design tokens"
```

---

### Task 4: Extract shared trip-state hook + checklist progress helper

**Files:**
- Create: `src/lib/useTripStateLive.ts`
- Create: `src/lib/checklistProgress.ts`
- Create: `src/lib/checklistProgress.test.ts`
- Modify: `src/components/Hero.tsx` (import the shared hook)
- Modify: `src/components/ChecklistSection.tsx` (use the shared helper)

**Interfaces:**
- Produces: `useTripStateLive(): TripState` — re-reads `getTripState()` every 30s.
- Produces: `loadChecklistChecked(): Record<string, boolean>` and `countDone(items: { id: string }[], checked: Record<string, boolean>): number` and the exported `CHECKLIST_STORAGE_KEY = "austria-checklist-v1"`.

- [ ] **Step 1: Write failing tests — `src/lib/checklistProgress.test.ts`**

```ts
import { describe, it, expect, beforeEach } from "vitest";
import { loadChecklistChecked, countDone, CHECKLIST_STORAGE_KEY } from "./checklistProgress";

describe("checklistProgress", () => {
  beforeEach(() => localStorage.clear());

  it("returns an empty map when nothing is stored", () => {
    expect(loadChecklistChecked()).toEqual({});
  });
  it("reads the persisted checked map", () => {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify({ a: true, b: false }));
    expect(loadChecklistChecked()).toEqual({ a: true, b: false });
  });
  it("survives corrupt JSON", () => {
    localStorage.setItem(CHECKLIST_STORAGE_KEY, "{not json");
    expect(loadChecklistChecked()).toEqual({});
  });
  it("counts only truthy items present in the list", () => {
    const checked = { a: true, b: false, c: true };
    expect(countDone([{ id: "a" }, { id: "b" }], checked)).toBe(1);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- checklistProgress`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/lib/checklistProgress.ts`**

```ts
/** Persisted checklist "done" state, shared by ChecklistSection (writer)
 *  and the TodayHome before-trip card (reader). Single source of truth
 *  for the storage key + counting so the two never drift. */
export const CHECKLIST_STORAGE_KEY = "austria-checklist-v1";

export function loadChecklistChecked(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function countDone(
  items: { id: string }[],
  checked: Record<string, boolean>
): number {
  return items.filter(i => checked[i.id]).length;
}
```

- [ ] **Step 4: Create `src/lib/useTripStateLive.ts`**

```ts
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
```

- [ ] **Step 5: Refactor `Hero.tsx` to use the shared hook**

In `src/components/Hero.tsx`, delete the local `useTripStateLive` function (lines defining it) and its now-unused imports, and add:
```tsx
import { useTripStateLive } from "../lib/useTripStateLive";
```
The existing `const state = useTripStateLive();` call in `Hero()` stays as-is. Remove the now-unused `useState`/`useEffect` imports only if nothing else in the file uses them (the file still uses `useMemo`, `useCallback`; check before removing).

- [ ] **Step 6: Refactor `ChecklistSection.tsx` to use the helper**

In `src/components/ChecklistSection.tsx`:
- Delete the local `const STORAGE_KEY = "austria-checklist-v1";` and the local `loadChecked` function.
- Import: `import { CHECKLIST_STORAGE_KEY, loadChecklistChecked, countDone } from "../lib/checklistProgress";`
- Replace `useState<...>(() => loadChecked())` with `useState<Record<string, boolean>>(() => loadChecklistChecked())`.
- In `toggle`, replace `localStorage.setItem(STORAGE_KEY, …)` with `localStorage.setItem(CHECKLIST_STORAGE_KEY, …)`.
- Replace the three inline `list.filter(i => checked[i.id]).length` / `bookingChecklist.filter(...)` / `packingChecklist.filter(...)` counts with `countDone(list, checked)`, `countDone(bookingChecklist, checked)`, `countDone(packingChecklist, checked)`.

- [ ] **Step 7: Run tests + typecheck**

Run: `npm test -- checklistProgress && npx tsc -b --noEmit`
Expected: helper tests PASS; typecheck shows only the pre-existing `TabShell`/nav `TabKey` gaps from Task 2.

- [ ] **Step 8: Commit**

```bash
git add src/lib/useTripStateLive.ts src/lib/checklistProgress.ts src/lib/checklistProgress.test.ts src/components/Hero.tsx src/components/ChecklistSection.tsx
git commit -m "refactor: extract shared trip-state hook + checklist progress helper"
```

---

### Task 5: TodayHome — adaptive before/during/after home

**Files:**
- Create: `src/components/today/TodayHome.tsx`
- Create: `src/components/today/TodayHomeView.tsx`
- Create: `src/components/today/BeforeTrip.tsx`
- Create: `src/components/today/DuringTrip.tsx`
- Create: `src/components/today/AfterTrip.tsx`
- Create: `src/components/today/TodayHomeView.test.tsx`
- Modify: `src/lib/dict.ts` (add the TodayHome keys)

**Interfaces:**
- Consumes: `useTripStateLive()` (Task 4); `getTripState`/`TRIP_START`/`TRIP_END`/`TripState` from `tripState`; `LiveCountdown`, `WeatherStrip`; `useLocalizeDay`; `navigateTab`, `navigateChapter`; `loadChecklistChecked`, `countDone`; `bookingChecklist`, `packingChecklist`.
- Produces: `TodayHome` (default export) and `TodayHomeView({ state }: { state: TripState })` (named export, pure, used by TabShell in Task 8 and by tests).

- [ ] **Step 1: Add dictionary keys — `src/lib/dict.ts`**

Add to the `DICT` object (before the closing `} as const;`):
```ts
  /* ---------- TodayHome (2026 redesign) ---------- */
  today_before_eyebrow: { en: "{n} days to go", he: "עוד {n} ימים" },
  today_before_title: { en: "Austria awaits", he: "אוסטריה מחכה" },
  today_departure_label: { en: "Departure", he: "יציאה" },
  today_departure_route: { en: "Tel Aviv → Vienna", he: "תל אביב → וינה" },
  today_departure_note: {
    en: "Land 08:45 · drive departs ~10:00",
    he: "נחיתה 08:45 · יוצאים לדרך ~10:00"
  },
  today_packing_label: { en: "Getting ready", he: "מתכוננים" },
  today_packing_progress: {
    en: "{done} of {total} ready",
    he: "{done} מתוך {total} מוכן"
  },
  today_open_lists: { en: "Open the lists", he: "פתחו את הרשימות" },
  today_day1_preview: { en: "Day 1 · preview", he: "יום 1 · הצצה" },
  today_now_label: { en: "Right now", he: "עכשיו" },
  today_next_label: { en: "Up next", he: "הבא בתור" },
  today_see_full_day: { en: "See the full day", he: "לכל היום" },
  today_open_map: { en: "Open the map", he: "פתחו מפה" },
  today_no_next: { en: "That's the day — enjoy the evening.", he: "זה היום — תיהנו מהערב." },
  today_after_title: { en: "Willkommen zurück", he: "ברוכים השבים" },
  today_after_sub: {
    en: "That summer in Austria · relive the trip",
    he: "אותו קיץ באוסטריה · לחיות את הטיול מחדש"
  },
  today_after_itinerary: { en: "Browse the itinerary", he: "לדפדף במסלול" },
  today_after_quiz: { en: "Play Quizzo", he: "לשחק עם קוויצו" },
```

- [ ] **Step 2: Write failing tests — `src/components/today/TodayHomeView.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithLang } from "../../test/renderWithLang";
import { TodayHomeView } from "./TodayHomeView";
import type { TripState } from "../../lib/tripState";
import { itinerary } from "../../data/itinerary";
import { partsFromMs } from "../../lib/tripState";

describe("TodayHomeView", () => {
  it("before phase shows the countdown eyebrow", () => {
    const state: TripState = {
      phase: "before",
      daysUntil: 34,
      countdown: partsFromMs(34 * 24 * 3600 * 1000),
    };
    renderWithLang(<TodayHomeView state={state} />);
    // Hebrew default: "עוד 34 ימים"
    expect(screen.getByText(/34/)).toBeInTheDocument();
  });

  it("during phase shows the featured day title and the 'now' card", () => {
    const today = itinerary[5]; // Day 6
    const state: TripState = {
      phase: "during",
      today,
      tomorrow: itinerary[6],
      featured: today,
      isFeaturingTomorrow: false,
      dayIndex: 5,
      elapsed: partsFromMs(0),
    };
    renderWithLang(<TodayHomeView state={state} />);
    expect(screen.getByText(today.title)).toBeInTheDocument();
  });

  it("after phase shows the welcome-back title", () => {
    const state: TripState = { phase: "after" };
    renderWithLang(<TodayHomeView state={state} />);
    expect(screen.getByText("ברוכים השבים")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- TodayHomeView`
Expected: FAIL — modules not found.

- [ ] **Step 4: Create `src/components/today/BeforeTrip.tsx`**

```tsx
import { CalendarDays, Plane, ListChecks } from "lucide-react";
import { TRIP_START } from "../../lib/tripState";
import type { TripState } from "../../lib/tripState";
import { useT } from "../../lib/dict";
import { navigateTab, navigateChapter } from "../../lib/route";
import { loadChecklistChecked, countDone } from "../../lib/checklistProgress";
import { bookingChecklist, packingChecklist } from "../../data/checklist";
import LiveCountdown from "../LiveCountdown";
import WeatherStrip from "../WeatherStrip";

export default function BeforeTrip({ state }: { state: Extract<TripState, { phase: "before" }> }) {
  const t = useT();
  const checked = loadChecklistChecked();
  const allItems = [...bookingChecklist, ...packingChecklist];
  const done = countDone(allItems, checked);
  const total = allItems.length;

  return (
    <div className="mx-auto max-w-lg px-4 pb-8 space-y-3">
      <div className="pt-2">
        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-coral-500">
          {t("today_before_eyebrow", { n: state.daysUntil })}
        </div>
        <h1 className="mt-1 text-2xl font-extrabold text-ink-900">
          {t("today_before_title")} ✈️
        </h1>
      </div>

      {/* Departure — the coral "headline" card */}
      <div className="rounded-[var(--radius-card)] p-4 text-cream-50 bg-gradient-to-br from-coral-500 to-coral-600">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide opacity-90">
          <Plane size={14} /> {t("today_departure_label")}
        </div>
        <div className="mt-1 text-lg font-extrabold">{t("today_departure_route")}</div>
        <div className="mt-1 text-sm opacity-90">{t("today_departure_note")}</div>
        <div className="mt-4">
          <LiveCountdown target={TRIP_START} mode="down" size="md" showSeconds={false} />
        </div>
      </div>

      {/* Getting ready — pine "practical" card, taps into the checklist */}
      <button
        onClick={() => navigateTab("checklist")}
        className="w-full text-start rounded-[var(--radius-card)] p-4 bg-surface-next active:scale-[0.99] transition-transform"
      >
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-pine-600">
          <ListChecks size={14} /> {t("today_packing_label")}
        </div>
        <div className="mt-1 font-bold text-ink-900">
          {t("today_packing_progress", { done, total })}
        </div>
        <div className="mt-2 h-2 rounded-pill bg-pine-100 overflow-hidden">
          <div
            className="h-full bg-pine-500 transition-[width] duration-500"
            style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }}
          />
        </div>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigateChapter(1)}
          className="text-start rounded-[var(--radius-card)] p-4 bg-surface active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-coral-500">
            <CalendarDays size={14} /> {t("today_day1_preview")}
          </div>
        </button>
        <div className="rounded-[var(--radius-card)] p-2 bg-surface flex items-center">
          <WeatherStrip variant="paper" />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `src/components/today/DuringTrip.tsx`**

```tsx
import { MapPin, Navigation, ArrowRight } from "lucide-react";
import type { TripState } from "../../lib/tripState";
import { useT } from "../../lib/dict";
import { useLocalizeDay } from "../../data/i18n";
import { navigateTab, navigateChapter } from "../../lib/route";
import { localizeShortDate } from "../../lib/dict";
import { useLang } from "../../lib/i18n";
import WeatherStrip from "../WeatherStrip";

export default function DuringTrip({ state }: { state: Extract<TripState, { phase: "during" }> }) {
  const t = useT();
  const { lang } = useLang();
  const localizeDay = useLocalizeDay();
  const day = localizeDay(state.featured);
  const now = day.activities[0];
  const next = day.activities[1];

  return (
    <div className="mx-auto max-w-lg px-4 pb-8 space-y-3">
      <div className="pt-2">
        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-coral-500">
          {t("hero_today_day")} {day.dayNumber} {t("hero_of_ten")} · {localizeShortDate(day.date, lang)}
        </div>
        <h1 className="mt-1 text-2xl font-extrabold text-ink-900">{day.title}</h1>
      </div>

      {/* Right now — coral headline card */}
      <div className="rounded-[var(--radius-card)] p-4 text-cream-50 bg-gradient-to-br from-coral-500 to-coral-600">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide opacity-90">
              <MapPin size={14} /> {t("today_now_label")}
            </div>
            <div className="mt-1 text-lg font-extrabold truncate">
              {now ? now.title : day.title}
            </div>
            {now?.time && <div className="mt-1 text-sm opacity-90">{now.time}</div>}
          </div>
          <div className="shrink-0 rounded-xl bg-cream-50/20 px-2 py-1">
            <WeatherStrip variant="glass" />
          </div>
        </div>
      </div>

      {/* Up next — pine practical card */}
      <div className="rounded-[var(--radius-card)] p-4 bg-surface-next">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-pine-600">
          <ArrowRight size={14} /> {t("today_next_label")}
        </div>
        {next ? (
          <>
            <div className="mt-1 font-bold text-ink-900">{next.title}</div>
            {next.rideToNext?.duration && (
              <div className="mt-1 text-sm text-ink-700/80">
                {t("ride_to_next")} · {next.rideToNext.duration}
              </div>
            )}
          </>
        ) : (
          <div className="mt-1 text-sm text-ink-700/80">{t("today_no_next")}</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigateChapter(day.dayNumber)}
          className="rounded-pill py-3 text-sm font-bold bg-coral-50 text-coral-700 active:scale-[0.98] transition-transform"
        >
          {t("today_see_full_day")}
        </button>
        <button
          onClick={() => navigateTab("map")}
          className="rounded-pill py-3 text-sm font-bold bg-pine-50 text-pine-700 active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5"
        >
          <Navigation size={14} /> {t("today_open_map")}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create `src/components/today/AfterTrip.tsx`**

```tsx
import { CalendarDays, Sparkles } from "lucide-react";
import { useT } from "../../lib/dict";
import { navigateTab, navigateChapter } from "../../lib/route";

export default function AfterTrip() {
  const t = useT();
  return (
    <div className="mx-auto max-w-lg px-4 pb-8 pt-6 space-y-4 text-center">
      <div className="text-4xl">🎉</div>
      <h1 className="text-3xl font-extrabold text-ink-900">{t("today_after_title")}</h1>
      <p className="text-ink-700/80">{t("today_after_sub")}</p>
      <div className="grid grid-cols-2 gap-3 pt-2 text-start">
        <button
          onClick={() => navigateChapter(1)}
          className="rounded-[var(--radius-card)] p-4 bg-surface active:scale-[0.99] transition-transform"
        >
          <CalendarDays size={16} className="text-coral-500" />
          <div className="mt-2 font-bold text-ink-900">{t("today_after_itinerary")}</div>
        </button>
        <button
          onClick={() => navigateTab("kids")}
          className="rounded-[var(--radius-card)] p-4 bg-surface-next active:scale-[0.99] transition-transform"
        >
          <Sparkles size={16} className="text-pine-600" />
          <div className="mt-2 font-bold text-ink-900">{t("today_after_quiz")}</div>
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create `src/components/today/TodayHomeView.tsx`**

```tsx
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
```

- [ ] **Step 8: Create `src/components/today/TodayHome.tsx`**

```tsx
import { useTripStateLive } from "../../lib/useTripStateLive";
import { TodayHomeView } from "./TodayHomeView";

/** Live wrapper: reads the trip phase (re-checked every 30s) and hands
 *  it to the pure view. This is what the router renders for #/today. */
export default function TodayHome() {
  const state = useTripStateLive();
  return <TodayHomeView state={state} />;
}
```

- [ ] **Step 9: Run tests to verify they pass**

Run: `npm test -- TodayHomeView`
Expected: PASS — all 3 cases.

- [ ] **Step 10: Commit**

```bash
git add src/components/today/ src/lib/dict.ts
git commit -m "feat: adaptive TodayHome (before/during/after)"
```

---

### Task 6: Explore hub

**Files:**
- Create: `src/components/hubs/ExploreHub.tsx`
- Modify: `src/lib/dict.ts` (Explore hub keys)

**Interfaces:**
- Consumes: `navigateTab`, `useT`.
- Produces: `ExploreHub` (default export) — a landing page with two large cards routing to `places` and `food`.

- [ ] **Step 1: Add dictionary keys — `src/lib/dict.ts`**

```ts
  /* ---------- Explore hub (2026 redesign) ---------- */
  explore_eyebrow: { en: "Explore", he: "לגלות" },
  explore_title: { en: "What to see & taste", he: "מה לראות ולטעום" },
  explore_kicker: {
    en: "The places we'll fall for and the food we'll eat",
    he: "המקומות שנתאהב בהם והאוכל שנאכל"
  },
  explore_card_places: { en: "Attractions", he: "אטרקציות" },
  explore_card_places_sub: {
    en: "Lakes, castles, cable cars, caves",
    he: "אגמים, טירות, רכבלים, מערות"
  },
  explore_card_food: { en: "Food & wine", he: "אוכל ויין" },
  explore_card_food_sub: {
    en: "Schnitzel, strudel — and what to drink",
    he: "שניצל, שטרודל — ומה שותים"
  },
```

- [ ] **Step 2: Create `src/components/hubs/ExploreHub.tsx`**

```tsx
import { Compass, UtensilsCrossed, ChevronRight } from "lucide-react";
import { useT, type DictKey } from "../../lib/dict";
import { navigateTab, type TabKey } from "../../lib/route";

const CARDS: {
  tab: TabKey;
  title: DictKey;
  sub: DictKey;
  Icon: typeof Compass;
  tint: string;
  iconColor: string;
}[] = [
  { tab: "places", title: "explore_card_places", sub: "explore_card_places_sub", Icon: Compass, tint: "bg-surface", iconColor: "text-coral-500" },
  { tab: "food", title: "explore_card_food", sub: "explore_card_food_sub", Icon: UtensilsCrossed, tint: "bg-surface-next", iconColor: "text-pine-600" }
];

export default function ExploreHub() {
  const t = useT();
  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-8">
      <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-coral-500">
        {t("explore_eyebrow")}
      </div>
      <h1 className="mt-1 text-2xl font-extrabold text-ink-900">{t("explore_title")}</h1>
      <p className="mt-1 text-ink-700/80">{t("explore_kicker")}</p>

      <div className="mt-5 space-y-3">
        {CARDS.map(({ tab, title, sub, Icon, tint, iconColor }) => (
          <button
            key={tab}
            onClick={() => navigateTab(tab)}
            className={`w-full text-start rounded-[var(--radius-card)] p-4 ${tint} flex items-center gap-4 active:scale-[0.99] transition-transform`}
          >
            <Icon size={28} className={iconColor} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-ink-900">{t(title)}</div>
              <div className="text-sm text-ink-700/75 truncate">{t(sub)}</div>
            </div>
            <ChevronRight size={20} className="text-ink-700/40 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc -b --noEmit`
Expected: only the known `TabShell` gap remains (fixed in Task 7).

- [ ] **Step 4: Commit**

```bash
git add src/components/hubs/ExploreHub.tsx src/lib/dict.ts
git commit -m "feat: Explore hub landing page"
```

---

### Task 7: Wire TabShell + App, delete Hero

**Files:**
- Modify: `src/components/TabShell.tsx`
- Modify: `src/App.tsx`
- Delete: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `TodayHome` (Task 5), `ExploreHub` (Task 6).
- Produces: `#/today` renders `TodayHome`; `#/explore` renders `ExploreHub`; the `plan` tab keeps rendering `ItinerarySection` + `TripStats`; `Hero` is gone.

- [ ] **Step 1: Update `TabShell.tsx`**

Add imports at the top:
```tsx
import TodayHome from "./today/TodayHome";
import ExploreHub from "./hubs/ExploreHub";
```
Add two cases at the start of the `switch (tab)` block (before `case "plan"`):
```tsx
    case "today":
      return <TodayHome />;
    case "explore":
      return (
        <div className="pt-20">
          <ExploreHub />
        </div>
      );
```
(The existing `plan`, `map`, `places`, `food`, `kids`, `stays`, `tips`, `checklist`, `emergency` cases stay unchanged. The `switch` is now exhaustive over the new `TabKey`, clearing the Task 2 typecheck gap.)

- [ ] **Step 2: Update `App.tsx`**

- Remove `import Hero from "./components/Hero";`.
- Remove the line `{route.tab === "plan" && <Hero />}`.
- Add a small top spacer so the fixed navbar doesn't overlap the Today/Explore content (these views don't include the old Hero's built-in top padding). Change the return so the top of the shell reserves navbar height for the `today` tab specifically:

```tsx
  return (
    <MapFocusContext.Provider value={{ focusOn }}>
      <Navbar activeTab={route.tab} />
      {route.tab === "today" && <div className="h-16 sm:h-20" aria-hidden />}
      <TabShell tab={route.tab} registerFocus={registerFocus} />
      <Footer />
      <div className="h-20 md:hidden" aria-hidden />
      <MobileBottomNav activeTab={route.tab} />
      <InstallPrompt />
      <Gemininio />
    </MapFocusContext.Provider>
  );
```
(All other tab views already start with `pt-20`; `today` gets the spacer here instead so `TodayHome` stays a clean, padding-free component.)

- [ ] **Step 3: Delete `Hero.tsx`**

Run: `git rm src/components/Hero.tsx`
Expected: file removed. (Its only consumer was `App.tsx`, updated in Step 2. The reusable `useTripStateLive` was already extracted in Task 4.)

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc -b --noEmit && npm run build`
Expected: PASS, no errors. If tsc reports `buildDayHeroPhotos`/`HERO_PHOTOS` unused-import errors elsewhere, none should exist — Hero was the only user.

- [ ] **Step 5: Manual verification (dev server)**

Run: `npm run dev`, open the printed URL. Verify:
- `#/today` shows the TodayHome. Before the trip (today's real date is before 2026-08-09) it shows the countdown + departure + getting-ready + Day-1 preview.
- `#/explore` shows the two hub cards; tapping each lands on Attractions / Food.
- `#/itinerary` still shows the chapter list; `#chapter/6` still opens Day 6.
- Toggle language (top-right) → the TodayHome flips to RTL Hebrew with translated strings.

- [ ] **Step 6: Commit**

```bash
git add src/components/TabShell.tsx src/App.tsx
git commit -m "feat: render TodayHome + ExploreHub, retire Hero"
```

---

### Task 8: Rebuild the mobile bottom nav

**Files:**
- Modify: `src/components/MobileBottomNav.tsx`
- Modify: `src/lib/dict.ts` (add `nav_today`, `nav_explore`)

**Interfaces:**
- Consumes: `navigateTab`, `TabKey`, `useT`.
- Produces: a 5-slot bar — Today · Explore · Kids · Map · More — where "More" opens a bottom sheet listing Itinerary · Stays · Tips · Lists · Emergency (plus install + language, as today).

- [ ] **Step 1: Add nav dictionary keys — `src/lib/dict.ts`**

In the `/* ---------- Navbar ---------- */` block add:
```ts
  nav_today: { en: "Today", he: "היום" },
  nav_explore: { en: "Explore", he: "לגלות" },
  nav_itinerary: { en: "Itinerary", he: "מסלול" },
```

- [ ] **Step 2: Rewrite the TABS / MORE_LINKS config in `MobileBottomNav.tsx`**

Replace the icon import line and the `TABS` / `MORE_LINKS` / `MORE_TAB_IDS` definitions with:

```tsx
import { CalendarClock, Compass, Baby, Map, MoreHorizontal, Download } from "lucide-react";
```

```tsx
const TABS: { id: TabKey | "more"; key: DictKey; Icon: typeof CalendarClock }[] = [
  { id: "today",   key: "nav_today",   Icon: CalendarClock },
  { id: "explore", key: "nav_explore", Icon: Compass },
  { id: "kids",    key: "nav_kids",    Icon: Baby },
  { id: "map",     key: "nav_map",     Icon: Map },
  { id: "more",    key: "nav_today",   Icon: MoreHorizontal } // label overridden below
];

const MORE_LINKS: { id: TabKey; key: DictKey }[] = [
  { id: "plan",      key: "nav_itinerary" },
  { id: "stays",     key: "nav_stays" },
  { id: "tips",      key: "nav_tips" },
  { id: "checklist", key: "nav_checklist" },
  { id: "emergency", key: "nav_emergency" }
];

const MORE_LABEL: Record<"en" | "he", string> = { en: "More", he: "עוד" };
const MORE_TAB_IDS = new Set<TabKey>(["plan", "stays", "tips", "checklist", "emergency"]);
```

(The rest of the component — the sheet markup, `activeIsMore` logic, install button, `LanguageSwitcher`, and the `grid-cols-5` bar — stays as-is. `food` and `places` are no longer in the sheet because they now live under the Explore hub; the sheet holds only the practical destinations.)

- [ ] **Step 3: Restyle active state to coral (Style C)**

In the bar `<button>` className, change the active color from terracotta to coral so the nav matches the new accent:
- `isActive ? "text-coral-600" : "text-ink-700/70"`
- active pill: `isActive ? "bg-coral-500/12" : ""`

- [ ] **Step 4: Typecheck + build**

Run: `npx tsc -b --noEmit && npm run build`
Expected: PASS.

- [ ] **Step 5: Manual verification (dev server, mobile viewport)**

In the browser devtools device toolbar (narrow width):
- Bottom bar shows exactly 5 slots: Today, Explore, Kids, Map, More.
- Today is highlighted coral on `#/today`.
- Tapping "More" opens the sheet with Itinerary, Stays, Tips, Lists, Emergency + Install + language switch; tapping any entry routes correctly and closes the sheet.
- The "More" slot shows as active (coral) when you're on any of those five sub-pages.

- [ ] **Step 6: Commit**

```bash
git add src/components/MobileBottomNav.tsx src/lib/dict.ts
git commit -m "feat: 5-slot mobile bottom nav with More sheet"
```

---

### Task 9: Rebuild the desktop navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `navigateTab`, `TabKey`, `useT`.
- Produces: desktop top-nav links for the new structure; the brand click goes to `today`.

- [ ] **Step 1: Update the `links` array**

Replace the `links` definition with (desktop has room to show the practical destinations inline — no sheet needed here):
```tsx
const links: { id: TabKey; key: DictKey }[] = [
  { id: "today",     key: "nav_today" },
  { id: "explore",   key: "nav_explore" },
  { id: "kids",      key: "nav_kids" },
  { id: "map",       key: "nav_map" },
  { id: "plan",      key: "nav_itinerary" },
  { id: "stays",     key: "nav_stays" },
  { id: "tips",      key: "nav_tips" },
  { id: "checklist", key: "nav_checklist" },
  { id: "emergency", key: "nav_emergency" }
];
```

- [ ] **Step 2: Point the brand button at Today + restyle active color**

- Change `onClick={() => navigateTab("plan")}` to `onClick={() => navigateTab("today")}`.
- Change the two active/hover `text-terracotta-600` occurrences to `text-coral-600`, and the brand hover `group-hover:text-terracotta-600` to `group-hover:text-coral-600`, and the year accent `text-terracotta-600` to `text-coral-600`.

- [ ] **Step 3: Typecheck + build**

Run: `npx tsc -b --noEmit && npm run build`
Expected: PASS.

- [ ] **Step 4: Manual verification (dev server, desktop width)**

- Top nav shows: Today, Explore, Kids, Map, Itinerary, Stays, Tips, Lists, Emergency.
- Active link is coral; clicking the brand returns to `#/today`.
- Language toggle still works and mirrors the bar in RTL.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: desktop navbar for the redesigned structure"
```

---

### Task 10: Migrate hosting to Vercel

**Files:**
- Modify: `vite.config.ts`
- Create: `vercel.json`
- Modify: `README.md` (deploy section)

**Interfaces:**
- Consumes: nothing in-app.
- Produces: a root-served (`base: "/"`) build with SPA hash routing on Vercel.

- [ ] **Step 1: Set the Vite base to root**

In `vite.config.ts` replace the config with:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vercel serves from the domain root, so no base-path juggling is needed
// (unlike GitHub Pages, which required "/austria-2026/").
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
})
```
Note: `main.tsx` uses `import.meta.env.BASE_URL` for the service-worker URL, which becomes `/` — correct for Vercel. No change needed there.

- [ ] **Step 2: Create `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```
(The app uses hash routing, so no rewrites are required — every path is served by `index.html` at root anyway.)

- [ ] **Step 3: Build locally to confirm root paths**

Run: `npm run build && npm run preview`
Expected: build succeeds; the preview loads at `http://localhost:4173/` with assets referenced from `/assets/...` (not `/austria-2026/assets/...`). Click through Today, Explore, Map, a chapter deep link.

- [ ] **Step 4: Update the README deploy section**

In `README.md`, replace the GitHub Pages deploy note with a short Vercel note:
```markdown
Deployed on **Vercel** (framework preset: Vite). Pushes to `main` deploy to
production; every branch/PR gets a preview URL. Set `VITE_GEMINI_API_KEY` in the
Vercel project's Environment Variables for the in-app Felix chat.
```

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts vercel.json README.md
git commit -m "chore: migrate deploy from GitHub Pages to Vercel"
```

- [ ] **Step 6: Connect Vercel (manual, user-run)**

This step needs the user's Vercel account. In the terminal, run `! npx vercel link` then `! npx vercel --prod` (or connect the GitHub repo at vercel.com → New Project → import `austria-2026`). Set `VITE_GEMINI_API_KEY` in Project Settings → Environment Variables. Confirm the production URL loads and hash routes work, then retire the GitHub Pages deployment.

---

## Self-Review

**1. Spec coverage:**
- Navigation → 5 destinations: Tasks 2, 7, 8, 9. ✓
- Adaptive TODAY home (before/during/after) from `tripState`: Task 5. ✓
- Style C visual system + color-coded cards: Task 3 (tokens) applied in Tasks 5, 6, 8, 9. ✓
- Kids keeps its own slot: Task 8 (`kids` in TABS). ✓
- More sheet retained: Task 8. ✓
- Itinerary reachable from Today AND More: Task 5 (`navigateChapter` links) + Task 8 (sheet `plan`). ✓
- Explore hub (attractions + food): Task 6. ✓
- Reuse unchanged components: honored — only `Hero` is removed (superseded); `WeatherStrip`/`LiveCountdown`/grids/etc. reused as-is. ✓
- Backward-compatible links: Task 2 (`#/plan`→today, `#/itinerary`→plan, unknown→today, `#chapter/N` intact). ✓
- Dark mode deferred but tokens structured for it: Task 3 (semantic `--color-now/next/ambient`). ✓
- Vercel migration: Task 10. ✓

**2. Placeholder scan:** No "TBD"/"handle edge cases"/"similar to". Every code step shows full code. The one intentionally-manual step (Task 10 Step 6) is a user-account action, explicitly marked. ✓

**3. Type consistency:**
- `TabKey` union defined once (Task 2) and consumed identically in TabShell/Navbar/MobileBottomNav. ✓
- `TodayHomeView({ state })` prop type `TripState` matches Task 5's export and the test. ✓
- `loadChecklistChecked` / `countDone` / `CHECKLIST_STORAGE_KEY` names identical across `checklistProgress.ts`, its test, `ChecklistSection.tsx`, and `BeforeTrip.tsx`. ✓
- `useTripStateLive` signature matches Hero's replaced usage and `TodayHome`. ✓
- Dict keys referenced in components (`today_*`, `explore_*`, `nav_today/explore/itinerary`) are all added in Tasks 5/6/8. ✓
