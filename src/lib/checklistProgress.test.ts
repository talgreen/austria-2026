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
