import { Sunrise, Sun, Sunset, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { DictKey } from "./dict";

/** The four parts of a trip day. Derived from an activity's canonical
 *  English `time` string — both the labeled slots ("Morning") and clock
 *  times ("08:45") resolve to one, so every scheduled stop can be hung
 *  on the morning→evening spine the redesign leads with. */
export type TimeSlot = "morning" | "lunch" | "afternoon" | "evening";

/** Strict matcher for the three *labeled* slots. Used to pair a slot
 *  alternative ("alternativeFor: morning") with the primary stop it swaps
 *  in for — clock times deliberately do NOT match here so alternatives
 *  keep falling back to the end-of-plan bank exactly as before. */
export function slotOfTime(time?: string): "morning" | "afternoon" | "evening" | undefined {
  if (!time) return undefined;
  const s = time.toLowerCase();
  if (s.includes("morning")) return "morning";
  if (s.includes("afternoon")) return "afternoon";
  if (s.includes("evening") || s.includes("night")) return "evening";
  return undefined;
}

/** Broad classifier for *display*: everything `slotOfTime` matches, plus
 *  "Lunch" and clock times ("08:45" → morning, "12:30" → lunch…). Odd
 *  labels ("All day", "Stops nearby") return undefined and render with
 *  their raw label instead of a slot. */
export function displaySlot(time?: string): TimeSlot | undefined {
  if (!time) return undefined;
  const s = time.toLowerCase().trim();
  if (s.includes("lunch")) return "lunch";
  const labeled = slotOfTime(s);
  if (labeled) return labeled;
  const m = /^(\d{1,2}):\d{2}/.exec(s);
  if (m) {
    const h = Number(m[1]);
    if (h < 12) return "morning";
    if (h < 14) return "lunch";
    if (h < 18) return "afternoon";
    return "evening";
  }
  return undefined;
}

/** True for concrete clock times ("08:45") — shown alongside the slot
 *  label so a hard departure hour is never lost to the grouping. */
export function isClockTime(time?: string): boolean {
  return !!time && /^\d{1,2}:\d{2}/.test(time.trim());
}

export interface SlotMeta {
  Icon: LucideIcon;
  /** Localized slot label ("Morning" / "בוקר"). */
  labelKey: DictKey;
  /** Compact label for tight chips — only Hebrew "afternoon" differs. */
  shortLabelKey: DictKey;
  /** Strong text colour for the slot label/icon. */
  text: string;
  /** Soft tinted background for the slot chip/icon disc. */
  bg: string;
}

/** One visual identity per slot, shared by every surface (route cards,
 *  chapter plan, Today screen) so "morning" always looks like morning. */
export const SLOT_META: Record<TimeSlot, SlotMeta> = {
  morning: {
    Icon: Sunrise,
    labelKey: "slot_morning",
    shortLabelKey: "slot_morning",
    text: "text-sienna-600",
    bg: "bg-gold-400/18"
  },
  lunch: {
    Icon: UtensilsCrossed,
    labelKey: "slot_lunch",
    shortLabelKey: "slot_lunch",
    text: "text-olive-700",
    bg: "bg-olive-500/12"
  },
  afternoon: {
    Icon: Sun,
    labelKey: "slot_afternoon",
    shortLabelKey: "slot_afternoon_short",
    text: "text-terracotta-600",
    bg: "bg-terracotta-500/12"
  },
  evening: {
    Icon: Sunset,
    labelKey: "slot_evening",
    shortLabelKey: "slot_evening",
    text: "text-lake-600",
    bg: "bg-lake-500/12"
  }
};
