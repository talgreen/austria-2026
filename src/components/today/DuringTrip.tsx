import { MapPin, Navigation, ArrowRight } from "lucide-react";
import type { TripState } from "../../lib/tripState";
import { useT } from "../../lib/dict";
import { useLocalizeDay } from "../../data/i18n";
import { navigateTab, navigateChapter } from "../../lib/route";
import { localizeShortDate } from "../../lib/dict";
import { useLang } from "../../lib/i18n";
import WeatherStrip from "../WeatherStrip";

export default function DuringTrip({ state }: { state: Extract<TripState, { phase: "during" }> }) {
  const t = useT();
  const { lang } = useLang();
  const localizeDay = useLocalizeDay();
  const day = localizeDay(state.featured);
  const now = day.activities[0];
  const next = day.activities[1];

  return (
    <div className="mx-auto max-w-lg px-4 pb-8 space-y-3">
      <div className="pt-2">
        <h1 className="text-[32px] font-extrabold tracking-tight leading-[1.05] text-ink-900">{day.title}</h1>
        <span className="mt-2 inline-flex items-center rounded-full bg-terracotta-500 px-3 py-1 text-[12px] font-bold text-cream-50">
          {t("hero_today_day")} {day.dayNumber} {t("hero_of_ten")} · {localizeShortDate(day.date, lang)}
        </span>
      </div>

      {/* Right now — status card: dark header bar + white body */}
      <div className="rounded-[var(--radius-card)] ring-1 ring-cream-300 bg-cream-50 overflow-hidden">
        <div className="status-bar-dark justify-between">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-terracotta-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-terracotta-400" />
            </span>
            {t("today_now_label")}
          </span>
          <span className="shrink-0">
            <WeatherStrip variant="glass" />
          </span>
        </div>
        <div className="px-4 py-4 flex items-start gap-3">
          <MapPin size={18} className="shrink-0 mt-0.5 text-ink-700/70" />
          <div className="min-w-0">
            <div className="text-lg font-extrabold text-ink-900 truncate">
              {now ? now.title : day.title}
            </div>
            {now?.time && <div className="mt-0.5 text-sm text-ink-700/75">{now.time}</div>}
          </div>
        </div>
      </div>

      {/* Up next */}
      <div className="card p-4">
        <div className="flex items-center gap-2 text-[12px] font-bold text-ink-700/70">
          <ArrowRight size={14} className="rtl:scale-x-[-1]" /> {t("today_next_label")}
        </div>
        {next ? (
          <>
            <div className="mt-1 font-bold text-ink-900">{next.title}</div>
            {next.rideToNext?.duration && (
              <div className="mt-1 text-sm text-ink-700/80">
                {t("ride_to_next")} · {next.rideToNext.duration}
              </div>
            )}
          </>
        ) : (
          <div className="mt-1 text-sm text-ink-700/80">{t("today_no_next")}</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigateChapter(day.dayNumber)}
          className="btn-dark active:scale-[0.98]"
        >
          {t("today_see_full_day")}
        </button>
        <button
          onClick={() => navigateTab("map")}
          className="btn-ghost justify-center active:scale-[0.98]"
        >
          <Navigation size={14} /> {t("today_open_map")}
        </button>
      </div>
    </div>
  );
}
