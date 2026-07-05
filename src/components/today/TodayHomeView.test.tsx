import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithLang } from "../../test/renderWithLang";
import { TodayHomeView } from "./TodayHomeView";
import type { TripState } from "../../lib/tripState";
import { itinerary } from "../../data/itinerary";
import { partsFromMs } from "../../lib/tripState";
import { localizeDay } from "../../data/i18n";

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
    // `today` and `featured` are deliberately DIFFERENT days here so this
    // test actually catches a regression where DuringTrip reads
    // `state.today` instead of `state.featured` (which is what it should
    // render — see DuringTrip.tsx).
    const today = itinerary[6]; // Day 7 — the actual calendar day
    const featured = itinerary[5]; // Day 6 — the day being featured (e.g. evening cutoff)
    const state: TripState = {
      phase: "during",
      today,
      tomorrow: itinerary[7],
      featured,
      isFeaturingTomorrow: false,
      dayIndex: 6,
      elapsed: partsFromMs(0),
    };
    renderWithLang(<TodayHomeView state={state} />);
    // renderWithLang defaults to Hebrew, and this day has a Hebrew title
    // override in itinerary.he.ts, so assert against the localized title
    // (same string DuringTrip actually renders via useLocalizeDay). This
    // must be the FEATURED day's title, not today's.
    expect(screen.getByText(localizeDay(featured, "he").title)).toBeInTheDocument();
  });

  it("after phase shows the welcome-back title", () => {
    const state: TripState = { phase: "after" };
    renderWithLang(<TodayHomeView state={state} />);
    expect(screen.getByText("ברוכים השבים")).toBeInTheDocument();
  });
});
