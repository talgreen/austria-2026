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
        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-rust-600">
          {t("today_before_eyebrow", { n: state.daysUntil })}
        </div>
        <h1 className="mt-1 font-serif font-black text-4xl leading-[1.05] text-ink-900">
          {t("today_before_title")} ✈️
        </h1>
      </div>

      {/* Departure — warm rust "headline" card with a chunky ledge */}
      <div className="rounded-3xl p-5 text-cream-50 bg-gradient-to-br from-rust-500 to-rust-700 shadow-[0_6px_0_#5c2712]">
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
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-olive-600">
          <ListChecks size={14} /> {t("today_packing_label")}
        </div>
        <div className="mt-1 font-bold text-ink-900">
          {t("today_packing_progress", { done, total })}
        </div>
        <div className="mt-2 h-2 rounded-pill bg-olive-500/15 overflow-hidden">
          <div
            className="h-full bg-olive-500 transition-[width] duration-500"
            style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }}
          />
        </div>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigateChapter(1)}
          className="text-start rounded-3xl p-4 bg-mustard-500 text-ink-900 active:scale-[0.99] transition-transform shadow-[0_4px_0_var(--color-mustard-600)]"
        >
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-rust-700">
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
