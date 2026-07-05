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
