import { tips } from "../data/tips";
import type { Tip } from "../data/types";

/**
 * Map each chapter (1-18) to the tip ids that matter most that day.
 * Tips not mapped to a day still show in the global "Tips" section.
 * Keep it to genuinely situational tips — don't double up advice the
 * day's own dayTips already cover.
 */
const TIP_IDS_PER_DAY: Record<number, string[]> = {
  1: ["car-seats-driving", "vignette", "sunday-closures"],
  4: ["lake-water-cold"],
  5: ["book-ahead-august"],
  7: ["special-toll-roads", "stroller-vs-carrier"],
  8: ["sunday-closures"],
  9: ["alpine-weather"],
  10: ["special-toll-roads"],
  11: ["stroller-vs-carrier", "lake-water-cold"],
  14: ["stroller-vs-carrier"],
  15: ["sunday-closures"],
  17: ["book-ahead-august"]
};

export function tipsForDay(dayNumber: number): Tip[] {
  const ids = TIP_IDS_PER_DAY[dayNumber] ?? [];
  return ids
    .map(id => tips.find(t => t.id === id))
    .filter((t): t is Tip => !!t);
}
