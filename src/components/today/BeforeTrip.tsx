import { ChevronLeft, ChevronRight, ListChecks, Map, Plane } from "lucide-react";
import { TRIP_START } from "../../lib/tripState";
import type { TripState } from "../../lib/tripState";
import { useT, localizeShortDate, localizeWeekday } from "../../lib/dict";
import { useLang } from "../../lib/i18n";
import { navigateTab, navigateChapter } from "../../lib/route";
import { loadChecklistChecked, countDone } from "../../lib/checklistProgress";
import { bookingChecklist, packingChecklist } from "../../data/checklist";
import { itinerary } from "../../data/itinerary";
import { useLocalizeDay } from "../../data/i18n";
import LiveCountdown from "../LiveCountdown";

export default function BeforeTrip({ state }: { state: Extract<TripState, { phase: "before" }> }) {
  const t = useT();
  const { lang } = useLang();
  const localizeDay = useLocalizeDay();
  const checked = loadChecklistChecked();
  const allItems = [...bookingChecklist, ...packingChecklist];
  const done = countDone(allItems, checked);
  const total = allItems.length;
  const Chevron = lang === "he" ? ChevronLeft : ChevronRight;

  return (
    <div className="mx-auto max-w-lg px-4 pb-8 space-y-3">
      <div className="pt-2">
        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-rust-600">
          {t("today_before_eyebrow", { n: state.daysUntil })}
        </div>
        <h1 className="mt-1 font-serif font-black text-4xl leading-[1.05] text-ink-900">
          {t("today_before_title")}
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

      {/* The plan, day by day — the page's real job: one tap from here
          into any chapter. Compact scannable rows, no hero art. */}
      <div className="rounded-[var(--radius-card)] bg-surface overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-rust-600">
            <Map size={14} /> {t("today_plan_days_label")}
          </div>
          <button
            onClick={() => navigateTab("plan")}
            className="text-[12px] font-bold text-rust-600 hover:text-rust-700 underline underline-offset-4 decoration-rust-500/40"
          >
            {t("today_full_route")}
          </button>
        </div>
        <ol className="divide-y divide-cream-300/50">
          {itinerary.map(day => {
            const local = localizeDay(day);
            return (
              <li key={day.dayNumber}>
                <button
                  onClick={() => navigateChapter(day.dayNumber)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-start hover:bg-cream-100/70 active:bg-cream-200/60 transition-colors"
                >
                  <span className="shrink-0 w-8 h-8 rounded-full bg-cream-100 ring-1 ring-cream-300/70 text-ink-900 text-[13px] font-bold flex items-center justify-center tabular-nums">
                    {day.dayNumber}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-ink-900 leading-snug line-clamp-1">
                      {local.title}
                    </span>
                    <span className="block text-[11.5px] text-ink-700/60 leading-snug">
                      {localizeWeekday(day.weekday, lang, true)} · {localizeShortDate(day.date, lang)}
                    </span>
                  </span>
                  <Chevron size={15} className="shrink-0 text-ink-700/40" />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
