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
        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-coral-500">
          {t("hero_today_day")} {day.dayNumber} {t("hero_of_ten")} · {localizeShortDate(day.date, lang)}
        </div>
        <h1 className="mt-1 text-2xl font-extrabold text-ink-900">{day.title}</h1>
      </div>

      {/* Right now — coral headline card */}
      <div className="rounded-[var(--radius-card)] p-4 text-cream-50 bg-gradient-to-br from-coral-500 to-coral-600">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide opacity-90">
              <MapPin size={14} /> {t("today_now_label")}
            </div>
            <div className="mt-1 text-lg font-extrabold truncate">
              {now ? now.title : day.title}
            </div>
            {now?.time && <div className="mt-1 text-sm opacity-90">{now.time}</div>}
          </div>
          <div className="shrink-0 rounded-xl bg-cream-50/20 px-2 py-1">
            <WeatherStrip variant="glass" />
          </div>
        </div>
      </div>

      {/* Up next — pine practical card */}
      <div className="rounded-[var(--radius-card)] p-4 bg-surface-next">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-pine-600">
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
          className="rounded-pill py-3 text-sm font-bold bg-coral-50 text-coral-700 active:scale-[0.98] transition-transform"
        >
          {t("today_see_full_day")}
        </button>
        <button
          onClick={() => navigateTab("map")}
          className="rounded-pill py-3 text-sm font-bold bg-pine-50 text-pine-700 active:scale-[0.98] transition-transform inline-flex items-center justify-center gap-1.5"
        >
          <Navigation size={14} /> {t("today_open_map")}
        </button>
      </div>
    </div>
  );
}
