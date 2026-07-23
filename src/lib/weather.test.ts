import { describe, it, expect } from "vitest";
import { forecastForDay, type TripWeather } from "./weather";
import { getAreaForDay } from "../data/areas";

describe("forecastForDay", () => {
  it("returns null when no weather has loaded", () => {
    expect(forecastForDay(null, { dayNumber: 1, date: "2026-08-09" })).toBeNull();
  });

  it("matches a day to its area's location and date", () => {
    const area = getAreaForDay(1);
    const weather: TripWeather = {
      [area.stayId]: {
        "2026-08-09": { date: "2026-08-09", tMax: 26, tMin: 15, code: 1 }
      }
    };
    const fc = forecastForDay(weather, { dayNumber: 1, date: "2026-08-09" });
    expect(fc).toEqual({ date: "2026-08-09", tMax: 26, tMin: 15, code: 1 });
  });

  it("returns null when the date is outside the forecast window", () => {
    const area = getAreaForDay(1);
    const weather: TripWeather = { [area.stayId]: {} };
    expect(
      forecastForDay(weather, { dayNumber: 1, date: "2026-08-09" })
    ).toBeNull();
  });

  it("does not cross-read another area's forecast for the same date", () => {
    // Day 1 (Salzburg) and a later Vienna day differ by area/stay key.
    const salzburg = getAreaForDay(1);
    const vienna = getAreaForDay(15);
    expect(salzburg.stayId).not.toEqual(vienna.stayId);
    const weather: TripWeather = {
      [vienna.stayId]: {
        "2026-08-09": { date: "2026-08-09", tMax: 30, tMin: 18, code: 3 }
      }
    };
    // Day 1 belongs to Salzburg, so it must not pick up Vienna's row.
    expect(
      forecastForDay(weather, { dayNumber: 1, date: "2026-08-09" })
    ).toBeNull();
  });
});
