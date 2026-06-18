import { tips } from "../data/tips";
import type { Tip } from "../data/types";

/**
 * Map each chapter (1-19) to the tip ids that matter most that day.
 * Tips not mapped to a day still show in the global "Tips" section.
 * Keep it to genuinely situational tips — don't double up advice the
 * day's own dayTips already cover.
 */
const TIP_IDS_PER_DAY: Record<number, string[]> = {
  1: ["car-seats-driving"],
  2: ["vignette", "sunday-closures"],
  5: ["lake-water-cold"],
  6: ["book-ahead-august"],
  8: ["special-toll-roads", "stroller-vs-carrier"],
  9: ["sunday-closures"],
  10: ["alpine-weather"],
  11: ["special-toll-roads"],
  12: ["stroller-vs-carrier", "lake-water-cold"],
  15: ["stroller-vs-carrier"],
  16: ["sunday-closures"],
  18: ["book-ahead-august"]
};

export function tipsForDay(dayNumber: number): Tip[] {
  const ids = TIP_IDS_PER_DAY[dayNumber] ?? [];
  return ids
    .map(id => tips.find(t => t.id === id))
    .filter((t): t is Tip => !!t);
}
