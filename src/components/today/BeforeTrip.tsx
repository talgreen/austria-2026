import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LifeBuoy,
  ListChecks,
  Map,
  Route
} from "lucide-react";
import { TRIP_START } from "../../lib/tripState";
import type { TripState } from "../../lib/tripState";
import { useT, localizeShortDate, localizeWeekday } from "../../lib/dict";
import { useLang } from "../../lib/i18n";
import { navigateTab, navigateChapter, type TabKey } from "../../lib/route";
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
  const firstDay = itinerary[0];
  const lastDay = itinerary[itinerary.length - 1];

  const manageLinks: { tab: TabKey; label: string; Icon: typeof Map }[] = [
    { tab: "checklist", label: t("nav_checklist"), Icon: ListChecks },
    { tab: "plan", label: t("nav_itinerary"), Icon: Route },
    { tab: "map", label: t("nav_map"), Icon: Map },
    { tab: "emergency", label: t("nav_emergency"), Icon: LifeBuoy }
  ];

  return (
    <div className="mx-auto max-w-lg px-4 pb-8">
      <div className="pt-2 pb-4">
        <h1 className="text-[32px] font-extrabold tracking-tight leading-[1.05] text-ink-900">
          {t("today_before_title")}
        </h1>
        <span className="mt-2 inline-flex items-center rounded-full bg-terracotta-500 px-3 py-1 text-[12px] font-bold text-cream-50">
          {t("today_before_eyebrow", { n: state.daysUntil })}
        </span>
      </div>

      {/* Status card — dark header bar + white body, rental-app style */}
      <div className="rounded-[var(--radius-card)] ring-1 ring-cream-300 bg-cream-50 overflow-hidden">
        <div className="status-bar-dark justify-between">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta-400" />
            </span>
            {t("today_departure_label")}
          </span>
          <span className="font-semibold text-cream-50/70 tabular-nums" dir="ltr">
            {localizeShortDate(firstDay.date, lang)} – {localizeShortDate(lastDay.date, lang)}
          </span>
        </div>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[12px] text-ink-700/70">{t("today_departure_label")}</div>
              <div className="text-lg font-extrabold text-ink-900">{t("today_from_city")}</div>
            </div>
            <div className="shrink-0 flex flex-col items-center text-ink-700/70">
              <ArrowRight size={18} className="rtl:scale-x-[-1]" />
              <span className="text-[11px] font-semibold tabular-nums">
                {t("today_trip_days", { n: itinerary.length })}
              </span>
            </div>
            <div className="min-w-0 text-end">
              <div className="text-[12px] text-ink-700/70">{t("today_arrival_label")}</div>
              <div className="text-lg font-extrabold text-ink-900">{t("today_to_city")}</div>
            </div>
          </div>
          <div className="mt-3 text-[12px] text-ink-700/70">{t("today_departure_note")}</div>
          <div className="mt-4 border-t border-cream-300 pt-4">
            <LiveCountdown target={TRIP_START} mode="down" size="md" showSeconds={false} />
          </div>
        </div>
      </div>

      {/* Manage row — circular icon buttons with tiny labels */}
      <div className="mt-5 grid grid-cols-4 gap-2">
        {manageLinks.map(({ tab, label, Icon }) => (
          <button key={tab} onClick={() => navigateTab(tab)} className="flex flex-col items-center gap-1.5">
            <span className="icon-btn-circle">
              <Icon size={20} strokeWidth={2} />
            </span>
            <span className="text-[11px] font-semibold text-ink-800 leading-tight text-center">{label}</span>
          </button>
        ))}
      </div>

      {/* Getting ready — checklist progress */}
      <h2 className="section-title mt-7">{t("today_packing_label")}</h2>
      <button
        onClick={() => navigateTab("checklist")}
        className="mt-3 w-full text-start card p-4 active:bg-cream-200 transition-colors"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="font-bold text-ink-900">
            {t("today_packing_progress", { done, total })}
          </div>
          <Chevron size={16} className="shrink-0 text-ink-700/50" />
        </div>
        <div className="mt-3 h-2 rounded-pill bg-cream-50 overflow-hidden">
          <div
            className="h-full bg-terracotta-500 transition-[width] duration-500"
            style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }}
          />
        </div>
      </button>

      {/* The plan, day by day — one tap from here into any chapter */}
      <div className="mt-7 flex items-baseline justify-between gap-3">
        <h2 className="section-title">{t("today_plan_days_label")}</h2>
        <button
          onClick={() => navigateTab("plan")}
          className="shrink-0 text-[13px] font-bold text-terracotta-600 hover:text-terracotta-700"
        >
          {t("today_full_route")}
        </button>
      </div>
      <div className="mt-3 card overflow-hidden">
        <ol className="divide-y divide-cream-300">
          {itinerary.map(day => {
            const local = localizeDay(day);
            return (
              <li key={day.dayNumber}>
                <button onClick={() => navigateChapter(day.dayNumber)} className="list-row">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-cream-50 text-ink-900 text-[13px] font-bold flex items-center justify-center tabular-nums">
                    {day.dayNumber}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block list-row-title line-clamp-1">{local.title}</span>
                    <span className="block list-row-sub">
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
